import React from "react";
import { Redirect } from 'react-router-dom';
import axios from "axios"; 
import { connect } from 'react-redux';
import { headerActions } from '../../_actions';
import { searchAction } from './searchAction';
import { Search } from "./Search";
import { configConstants } from '../../_constants';
import { searchConstants } from './searchConstants';
import { WebsiteHeaderContainer } from '../WebsiteHeader';
import Geocode from "react-geocode";


/**
 * SearchContainer
 *
 * @package                SafeHealth
 * @subpackage             SearchContainer
 * @category               Container Component
 * @DateOfCreation         17 July 2018
 * @ShortDescription       This component is reponsible for Search
 */
class SearchContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city_id           : '',
            city_name         : '',
            search            : '',
            typing            : false,
            typingTimeout     : 0 ,
            citiesLoading     : false,
            specialityLoading : false,
            currentlat        : '',
            currentlng        : '',
            currentAddress    : '',
        };
        this.handleInputChange    = this.handleInputChange.bind(this);
        this.handleSuggestionClick = this.handleSuggestionClick.bind(this);
        this.handleCitySearchClick = this.handleCitySearchClick.bind(this);
        this.handleSpecialityClick = this.handleSpecialityClick.bind(this);
        this.getLocation           = this.getLocation.bind(this);
        this.successCallback       = this.successCallback.bind(this);
        this.errorCallback         = this.errorCallback.bind(this);
        this.callSpecailityAfterDetect = false;
    }
    
    /* @DateOfCreation       13 August 2018
    * @ShortDescription      This function is responsible catch the click event of detect button
    * @return                Nothing
    */
    getLocation(){
        navigator.geolocation.getCurrentPosition(this.successCallback, this.errorCallback);
    }
    /* @DateOfCreation       13 August 2018
    * @ShortDescription      This function is responsible catch the success state of detect location
    * @return                Nothing
    */
    successCallback(position) {
        var lat = String(position.coords.latitude);
        var lng = String(position.coords.longitude);
        var currentlat = lat.replace('.',',');
        var currentlng = lng.replace('.',',');
        const { dispatch }   = this.props;
        Geocode.fromLatLng(lat, lng).then(
            response => {
                const address   = response.results[0].formatted_address;
                const city_name = response.results[0].address_components[4].long_name; 
                this.setState({ 
                    "city_name"     : city_name,
                    "currentlat"    : currentlat,
                    "currentlng"    : currentlng,
                    "currentAddress": address,
                    "city_name"     : city_name,
                    "citiesLoading" : false,
                },function(){
                    dispatch(searchAction.getSearchCityResult(city_name));  
                });
            },
            error => {
                console.error(error);
            }
        );
    }

    /* @DateOfCreation       13 August 2018
    * @ShortDescription      This function is responsible catch the failer state of detect location
    * @return                Nothing
    */
    errorCallback(){
        alert("Not able to detect current location");
    }

    /* @DateOfCreation       13 August 2018
    * @ShortDescription      This function is responsible to updated State
    * @return                Nothing
    */
    componentWillReceiveProps(props) {
        const { dispatch }   = this.props;
        if(props.cityResultFetched && props.cityResult.length == 1){
            this.setState({
                "city_id" : props.cityResult[0].city_id
            },function(){
                    dispatch(searchAction.getSearchSpecialityResult(this.state.city_id, ''));
                });
        }
        if(props.specialityResultFetched && props.cityResult.length > 0){
            this.setState({
                "specialityLoading" : true
            });
        }
    }
    /**
    * @DateOfCreation        18 july 2018
    * @ShortDescription      This function is responsible to handle the on change event
    * @return                Nothing
    */
    handleInputChange(event) {
        const self = this;
        if (self.state.typingTimeout) {
            clearTimeout(self.state.typingTimeout);
        }
        const { name, value }  = event.target;
        const { dispatch }   = self.props;
        
        this.setState({
             [name]: value,
             typing: false,
             typingTimeout: setTimeout(function () {
                if (name == "city_name") {
                    dispatch(searchAction.getSearchCityResult(value));  
                }
                if(name == "search"){
                    dispatch(searchAction.getSearchSpecialityResult(self.state.city_id, value))
                }
            }, configConstants.WAIT_INTERVAL)
        });
    }

    /**
    * @DateOfCreation        18 july 2018
    * @ShortDescription      This function is responsible to handle the on click
    * @return                Nothing
    */
    handleSuggestionClick(cityId,cityName) {
        const {dispatch} = this.props;
        this.setState( 
            { "city_id"   : cityId,
              "city_name" : cityName,
              "citiesLoading" : false,
              "specialityLoading" :true 
            }
        );
        dispatch(searchAction.getSearchSpecialityResult(cityId))
    }

    /**
    * @DateOfCreation        18 july 2018
    * @ShortDescription      This function is responsible to handle the on click
    * @return                Nothing
    */
    handleSpecialityClick(result, searchType){
        var city = '';
        let search = this.state.search;

        switch(searchType) {
            case searchConstants.SPECIALISATION:
            case searchConstants.SEARCH_ALL:
                if(result != null){
                    this.setState( 
                        { "search"   : result.spl_name, 
                          "specialityLoading" : false
                        }
                    );
                    if(this.state.currentlat != '' && this.state.currentlng != ''){
                        this.props.history.push('/doctorlisting/'+result.spl_id+'/'+this.state.city_id+'/0/0/'+this.state.currentlat+'/'+this.state.currentlng);
                    }else{
                        this.props.history.push('/doctorlisting/'+result.spl_id+'/'+this.state.city_id);
                    }
                }else{
                    if(this.state.city_id){
                        city = this.state.city_id;
                    }else{
                        city = this.state.city_name;
                    }
                 }
            break;

            case searchConstants.SERVICES:
                this.props.history.push('/doctorlisting/'+result.spl_id+'/'+this.state.city_id+'/'+result.srv_id);
            break;

            case searchConstants.COMMON_NAME:
                this.props.history.push('/doctorlisting/'+result.spl_id+'/'+this.state.city_id+'/0/'+result.doc_spl_tag_id);
            break;

            case searchConstants.DOCTOR:
            case searchConstants.CLINIC:
                let doc_slug = result.doc_slug
                this.props.history.push('/bookappointments/'+doc_slug);
            break;
        }

    }

    /**
    * @DateOfCreation        18 july 2018
    * @ShortDescription      This function is responsible to handle the on click
    * @return                Nothing
    */
    handleCitySearchClick(event) {
        const {dispatch} = this.props;
        this.setState({'citiesLoading' : true})
        dispatch(searchAction.getSearchCityResult(event.target.value))
        dispatch(searchAction.updateState());
    }
    
    /**
    * @DateOfCreation        18 july 2018
    * @ShortDescription      This function is responsible for render HTML
    * @return                Nothing
    */
    render() {
        return (
               <div className="page-container">
                <div className="wrap-inner-content">
                <WebsiteHeaderContainer 
                    history={this.props.history}
                />
                <Search
                    payload                 = {this.state}
                    cityResult              = {this.props.cityResult}
                    specialityResult        = {this.props.specialityResult}
                    clinicResult            = {this.props.clinicResult}
                    tagResult               = {this.props.tagResult}
                    doctorsResult           = {this.props.doctorsResult}
                    servicesResult          = {this.props.servicesResult}
                    handleInputChange       = {this.handleInputChange}
                    handleSuggestionClick   = {this.handleSuggestionClick}
                    handleCitySearchClick   = {this.handleCitySearchClick}
                    handleSpecialityClick   = {this.handleSpecialityClick}
                    currentLocation         = {this.props.currentLocation}
                    getLocation             = {this.getLocation}
                    fetchCurrentLocation    = {this.props.fetchCurrentLocation}
                />
            </div>
            </div>
        );
    }
}

/**
* @DateOfCreation        12 July 2018
* @ShortDescription      This function is responsible to connect store to props
* @return                View
*/
function mapStateToProps(state) {
    const {  servicesResult, specialityResultFetched, cityResultFetched, fetchCurrentLocation, currentLocation, tagResult, cityResult, specialityResult, doctorsResult, clinicResult } = state.search;
    return {
        servicesResult,
        specialityResultFetched,
        cityResultFetched,
        fetchCurrentLocation,
        currentLocation,
        cityResult,
        specialityResult,
        clinicResult,
        doctorsResult,
        tagResult
    };
}

// Connection with State 
const connectedSearchContainer = connect(mapStateToProps)(SearchContainer);
export { connectedSearchContainer as SearchContainer }; 
