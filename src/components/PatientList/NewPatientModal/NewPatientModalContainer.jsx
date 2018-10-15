import React from "react";
import { NewPatientModal } from "./NewPatientModal";
import formConfig from "./NewPatientConfig";
import { connect } from 'react-redux';
import { regionActions, newPatientActions, headerActions, patientProfileAction, staticDataActions } from '../../../_actions';
import { newPatientValidator } from '../../../_validator';
import { utilityHelper } from '../../../_helpers';
import { configConstants } from '../../../_constants';
import moment from 'moment';


class NewPatientModalContainer extends React.Component {
    constructor(props) {  
        super(props);
        this.defaultState = {
            formConfig: formConfig,
        }; 
        this.state = this.defaultState;
        this.boundForm = undefined;
        this.gridRefreshDone = true;
        this.countryDataCall = true;
        this.isStateSet      = false;
        this.stateLoad      = true;
        this.citiesLoad      = true;
        this.referralsLoad = true;
        this.patientGroupsLoad = true;
        this.optionLoad = true;

        this.handleClose              = this.handleClose.bind(this);
        this.submitPatient            = this.submitPatient.bind(this);
        this.handleBoundFormUpdate    = this.handleBoundFormUpdate.bind(this);
        this.getStateByCountry        = this.getStateByCountry.bind(this);
        this.getCityByState           = this.getCityByState.bind(this);
        this.showHideOtherCity        = this.showHideOtherCity.bind(this);  
    
    }

    /**
     * @DateOfCreation        14 june 2018
     * @ShortDescription      This function is responsible to handle the close event of add modal
     * @return                Nothing
     */
    handleClose() {
      const { handlers,data } = this.state.formConfig;
      let state = this.state;
      this.props.newPatientModalHideHandle();
      this.gridRefreshDone = true;
    }
    
    /**
     * @DateOfCreation        14 june 2018
     * @ShortDescription      This function is responsible to get stae list
     * @return                Nothing
     */
    getStateByCountry(id){
        const { dispatch } = this.props;
        dispatch(regionActions.getStates(id));
    }
    
    /**
     * @DateOfCreation        14 june 2018
     * @ShortDescription      This function is responsible to get city list
     * @return                Nothing
     */
    getCityByState(id){
        const { dispatch } = this.props;
        dispatch(regionActions.getCities(id));
    } 

    /**
     * @DateOfCreation        14 june 2018
     * @ShortDescription      This function is responsible to submit fx form data
     * @return                Nothing
     */
    submitPatient() {
        if(this.boundForm){
            let data = this.boundForm.getData();
            if (data) {
                const { dispatch } = this.props;
                dispatch(newPatientActions.newPatientSubmit(data));
            } 
        }
    }

    /**
     * @DateOfCreation        14 june 2018
     * @ShortDescription      This function is responsible to get the list of specialisation from API
     * @return                Nothing
     */
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(regionActions.getCountry());
        dispatch(newPatientActions.getReferralDoctor());
        dispatch(newPatientActions.getPatientGroups());
        dispatch(staticDataActions.getStaticData());
        // Set state
        const { handlers } = this.state.formConfig;
        const { formConfig } = this.state;
        this.setState({
                formConfig:{
                    ...formConfig,
                    handlers:{
                        ...handlers,
                        country_id_handle:this.getStateByCountry,
                        state_id_handle:this.getCityByState,
                        city_id_handle:this.showHideOtherCity
                    }
                }
            }
        );
    }
    
     /**
     * @DateOfCreation        17 july 2018
     * @ShortDescription      This function is responsible to show hide other city field
     * @return                Nothing
     */
    showHideOtherCity(cityid, cityName){
        const { formConfig, handlers } = this.state;
        var fields = formConfig['fields'];
        for(var fc in fields){
            var fieldName = fields[fc]['name'];
            if(fieldName == 'pat_other_city'){
                if(cityName == configConstants.OTHER_CITY_MATCH){
                    fields[fc]['showOnForm'] = true;
                }else{
                    fields[fc]['showOnForm'] = false;
                }
            }                   
        }
        
        this.setState({
                formConfig:{
                    ...formConfig,
                    ...handlers
                }
            }
        );
    }
    
     /**
     * @DateOfCreation        14 june 2018
     * @ShortDescription      This function is responsible to set country,state,city data
     * @return                Nothing
     */
    componentWillReceiveProps(nextProps) {

        
        //set country
        if(nextProps.country && this.countryDataCall){
            let countryData = utilityHelper.getCountry(nextProps.country,'country_id','country_name');
            const { data } = this.state.formConfig;
            const { formConfig } = this.state;
            let countryId = '';
            countryId  = countryData[0].hasOwnProperty('value') ? countryData[0].value : '' ;
            if(countryId!=''){
                this.countryDataCall = false;
                this.getStateByCountry(countryId);
            }
            var formConfigAdd = formConfig;
            var fields = formConfigAdd['fields'];
            for(var fc in fields){
                var fieldName = fields[fc]['name'];
                if(fieldName == 'country_id'){
                    fields[fc]['value'] = countryId;
                }
            }

            this.setState({
                    formConfig:{
                        ...formConfig,
                        fields:fields,
                        data:{
                            ...data,
                            country_id_data:countryData
                        }
                    }
                });

            
        }
        // set states
        if(nextProps.states && this.stateLoad){
            this.stateLoad = false;
            let stateData = utilityHelper.getDataConvertToOptionType(nextProps.states,'name','id');
            const { data } = this.state.formConfig;
            const { formConfig } = this.state;
            this.setState({
                    formConfig:{
                        ...formConfig,
                        data:{
                            ...data,
                            state_id_data:stateData
                        }
                    }
                }
            ,function(){
                this.isStateSet = true;
            });
                        
        }
        
        // set cities
        if(nextProps.cities && this.isStateSet){
            this.citiesLoad = false;
            let cityData = utilityHelper.getDataConvertToOptionType(nextProps.cities,'name','id');
            const { data } = this.state.formConfig;
            const { formConfig } = this.state;
            this.setState({
                    formConfig:{
                        ...formConfig,
                        data:{
                            ...data,
                            city_id_data:cityData
                        }
                    }
                }
            );            
        }

        if(nextProps.staticDatafetched && this.optionLoad) {
            this.optionLoad = false;
            let titles = utilityHelper.getDataConvertToOptionType(nextProps.staticData.title,'value','id');
            let genders = utilityHelper.getDataConvertToOptionType(nextProps.staticData.gender,'value','id');
            const { data } = this.state.formConfig;
            const { formConfig } = this.state;
            this.setState({
                    formConfig:{
                        ...formConfig,
                        data:{
                            ...data,
                            pat_title_data:titles,
                            user_gender_data:genders
                        }
                    }
                });
        }
        // set referral doctor
        if(nextProps.patientGroups && nextProps.isPatientGroupsFetchDone && this.patientGroupsLoad){
            this.patientGroupsLoad = false;
            let patientGroupsData = utilityHelper.getDataConvertToOptionType(nextProps.patientGroups,'pat_group_name','pat_group_id');
            const { data }  = this.state.formConfig;
            const { formConfig } = this.state;
            this.setState({
                formConfig:{
                    ...formConfig,
                    data:{
                        ...data,
                        pat_group_name_data:patientGroupsData
                    }
                }
            });
        }
        if(nextProps.referralDoctor && nextProps.isReferralDoctorFetchDone && this.referralsLoad){
            this.referralsLoad = false;
            let referralData = utilityHelper.getDataConvertToOptionType(nextProps.referralDoctor,'doc_ref_name','doc_ref_id');
            const { data } = this.state.formConfig;
            const { formConfig } = this.state;
            this.setState({
                formConfig:{
                    ...formConfig,
                    data:{
                        ...data,
                        doc_ref_name_data:referralData
                    }
                }
            });
        }
        
        const { dispatch } = this.props;
        if(nextProps.gridRefresh && this.gridRefreshDone){
            dispatch(patientProfileAction.getPatientList(0, 10, null, null));
            this.gridRefreshDone = false;
        }
        if(nextProps.isInsertDone){
            setTimeout(function(){
            dispatch(newPatientActions.resetState());
            this.handleClose();
         }.bind(this),800);
        }
    } 
    
     /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data
    * @return                Redirect
    */
    handleBoundFormUpdate(data){
        this.boundForm = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to redirect unauthorise users
    * @return                Redirect
    */
    componentDidUpdate(){
        const { dispatch }  = this.props;
        if(this.props.isUserNotValid){
           dispatch(headerActions.logout());
        }
    }

    render() {
        return (
            <div >
                <NewPatientModal
                    newPatientModalShow     = {this.props.newPatientModalShow}
                    handleClose             = {this.handleClose}
                    submitPatient           = {this.submitPatient}
                    formConfig              = {this.state.formConfig}
                    handleBoundFormUpdate   = {this.handleBoundFormUpdate}
                    errorMsg                = {this.props.errorMsg}
                    successMsg              = {this.props.successMsg}
                    isInsertDone            = {this.props.isInsertDone}
                    
                />
            </div>
        );
    }
}

/**
 * @DateOfCreation        31 May 2018
 * @ShortDescription      This function is responsible to connect store to props
 * @return                View
 */
function mapStateToProps(state) {
    const { country, cities, states } = state.region;
    const { staticData, staticDatafetched } = state.staticData;
    const { successMsg, errorMsg, isInsertDone, gridRefresh, referralDoctor, isReferralDoctorFetchDone, isPatientGroupsFetchDone, patientGroups } = state.newPatient;
    return {
        successMsg,
        errorMsg,
        country,
        states,
        cities,
        isInsertDone,
        gridRefresh,
        referralDoctor,
        isReferralDoctorFetchDone, 
        isPatientGroupsFetchDone,
        patientGroups,
        staticData,
        staticDatafetched
    };
}

// Connection with State 
const connectedNewPatientModalContainer = connect(mapStateToProps)(NewPatientModalContainer);
export { connectedNewPatientModalContainer as NewPatientModalContainer };
