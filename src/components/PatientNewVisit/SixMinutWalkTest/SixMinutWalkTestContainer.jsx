import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from '../../../global';
import { utilityHelper } from '../../../_helpers';

const SixMinutWalkTest = Loadable({
    loader: () => import('./SixMinutWalkTest' /* webpackChunkName = "SixMinutWalkTest" */).then(object => object.SixMinutWalkTest),
    loading: Loading
});

export class SixMinutWalkTestContainer extends React.Component {
	constructor(props){
		super(props);

        this.boundForm6MWT               = undefined;
        this.handleBoundForm6MWTUpdate   = this.handleBoundForm6MWTUpdate.bind(this);
        this.handleInputChange           = this.handleInputChange.bind(this);
        this.get6MWTData                 = this.get6MWTData.bind(this);
        this.state  = {};
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundForm6MWTUpdate(data){
        this.boundForm6MWT = data;
    }

    /**
     * @DateOfCreation        9 July 2018
     * @ShortDescription      This function is responsible to retun state to parent component
     * @param                 Event Object
     * @return                Nothing
     */
     get6MWTTableData() {
         return this.state;
     }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
     get6MWTData() {
         if(this.handleBoundForm6MWTUpdate){
            let data          = this.boundForm6MWT.getData();
            let dataTable     = this.get6MWTTableData();
            if (data && dataTable) {
                return utilityHelper.mergeMultipleObject([data, dataTable]);
            } 
        }
    }

    /**
     * @DateOfCreation        9 July 2018
     * @ShortDescription      This function is responsible to handle changes in input state
     * @param                 Event Object
     * @return                Nothing
     */
     handleInputChange(event) {
        let state = this.state; 
        const { name, value } = event.target;

        this.setState({
            ...state,
            [name] : value
        });
    }

    /**
     * @DateOfCreation        9 July 2018
     * @ShortDescription      This function is responsible to set state from api data get
     * @param                 Event Object
     * @return                Nothing
     */
     componentWillMount(){
        const { dispatch, sixMinutWalkTestTableFormData } = this.props;

        if(typeof sixMinutWalkTestTableFormData === 'object'){
            let defaultState = {};
            
            this.props.sixMinutWalkTestTableFormData.map(tableFectorDetails => { 
                let sixmwtFectorValue1 = 'sixmwt_fector_value_'+tableFectorDetails.sixmwt_fector_type_key_1;
                let sixmwtFectorValue2 = 'sixmwt_fector_value_'+tableFectorDetails.sixmwt_fector_type_key_2;
                
                let sixmwtBeforeSixmwt1 = 'sixmwt_before_sixmwt_'+tableFectorDetails.sixmwt_fector_type_key_1;
                let sixmwtBeforeSixmwt2 = 'sixmwt_before_sixmwt_'+tableFectorDetails.sixmwt_fector_type_key_2;
                
                let sixmwtAfterSixmwt1 = 'sixmwt_after_sixmwt_'+tableFectorDetails.sixmwt_fector_type_key_1;
                let sixmwtAfterSixmwt2 = 'sixmwt_after_sixmwt_'+tableFectorDetails.sixmwt_fector_type_key_2;

                defaultState[sixmwtFectorValue1]  = tableFectorDetails[sixmwtFectorValue1];
                defaultState[sixmwtFectorValue2]  = tableFectorDetails[sixmwtFectorValue2];
                defaultState[sixmwtBeforeSixmwt1] = tableFectorDetails[sixmwtBeforeSixmwt1];
                defaultState[sixmwtBeforeSixmwt2] = tableFectorDetails[sixmwtBeforeSixmwt2];
                defaultState[sixmwtAfterSixmwt1]  = tableFectorDetails[sixmwtAfterSixmwt1];
                defaultState[sixmwtAfterSixmwt2]  = tableFectorDetails[sixmwtAfterSixmwt2];
            });
            this.setState(defaultState);
        }
    }

        render() {
            if(this.props.visitDatafetched){
                return (
                <div >
                <SixMinutWalkTest 
                sixMinutWalkTestFormData      = {this.props.sixMinutWalkTestFormData}
                sixMinutWalkTestTableFormData = {this.props.sixMinutWalkTestTableFormData}
                visitDatafetched              = {this.props.visitDatafetched}
                handleBoundForm6MWTUpdate     = {this.handleBoundForm6MWTUpdate}
                handleInputChange             = {this.handleInputChange}
                state                         = {this.state}
                get6MWTData                   = {this.get6MWTData}
                />
                </div>
                );            
            } else {
                return (<div></div>);
            }
        }
    }