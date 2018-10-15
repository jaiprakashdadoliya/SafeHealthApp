import React from "react";
import { connect } from 'react-redux';
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../global';
import { updatePatientProfileValidator } from '../../../../_validator';
import { regionActions, patientProfileAction, staticDataActions,headerActions, newPatientActions } from '../../../../_actions';
import { configConstants,patientProfileConstants } from '../../../../_constants';
import { utilityHelper } from '../../../../_helpers';
import { PatientProfileImage } from "./PatientProfileImage";
import moment from 'moment';
import patientProfileFormConfig from './PatientProfileConfig';

const PatientProfile = Loadable({
    loader: () => import('./PatientProfile').then(object => object.PatientProfile),
    loading: Loading
});
class PatientProfileContainer extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.defaultState = {
            patient: {
                profile: {
                    pat_profile_img :  '',
                },
            },
            patientProfileFormConfig    : patientProfileFormConfig,
            basicInfoImageShow          : false,
            profileImage                : '',
            validationMsg               : '',
            patId                       : ''
        }; 
        this.state = this.defaultState;
        this.last_pat_id = '';

         // Bind the events to the current class
        this.boundForm                  = undefined;
        this.handleBoundFormUpdate      = this.handleBoundFormUpdate.bind(this);

        this.handleSubmit               = this.handleSubmit.bind(this);
        this._onChange                  = this._onChange.bind(this);
        this.basicInfoImageShowHandle   = this.basicInfoImageShowHandle.bind(this);
        this.basicInfoImageHideHandle   = this.basicInfoImageHideHandle.bind(this);
        this.handleClose                = this.handleClose.bind(this);
        this.showHideOtherCity          = this.showHideOtherCity.bind(this);
        this.getStateByCountry          = this.getStateByCountry.bind(this);
        this.getCityByState             = this.getCityByState.bind(this);
        this.manageNumberOfChildrenShowHide = this.manageNumberOfChildrenShowHide.bind(this);

        this.isProfileDataSet = false;
        this.isTitleSet       = false;
        this.isCountryLoad    = false;
        this.stateLoad        = true;
        this.isStateSet       = false;
        this.citiesLoad       = false;
        this.showNumChildField= false;
        this.patientGroupsLoad= true;
        this.referralsLoad    = true;
    }

    /**
    * @DateOfCreation        18 Sept 2018
    * @ShortDescription      This function is responsible to fx form input state data
    * @return                Redirect
    */
    handleBoundFormUpdate(data){
        this.boundForm = data;
    }

    /**
     * @DateOfCreation        18 Sept 2018
     * @ShortDescription      This function is responsible to show hide other city field
     * @return                Nothing
     */
    showHideOtherCity(cityid, cityName){
        const { patientProfileFormConfig, handlers } = this.state;
        var fields = patientProfileFormConfig['fields'];
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
                patientProfileFormConfig:{
                    ...patientProfileFormConfig,
                    ...handlers
                }
            }
        );
    }

    /**
     * @DateOfCreation        18 Sept 2018
     * @ShortDescription      This function is responsible to get stae list
     * @return                Nothing
     */
    getStateByCountry(id){
        const { dispatch } = this.props;
        dispatch(regionActions.getStates(id));
    }
    
    /**
     * @DateOfCreation        18 Sept 2018
     * @ShortDescription      This function is responsible to get city list
     * @return                Nothing
     */
    getCityByState(id){
        const { dispatch } = this.props;
        dispatch(regionActions.getCities(id));
    } 

    /**
     * @DateOfCreation        11 May 2018
     * @ShortDescription      This function is responsible to get all media data
     * @return                Nothing
     */
    componentWillMount() {
        const { dispatch, patId } = this.props;
        dispatch(regionActions.getCountry());

        dispatch(newPatientActions.getReferralDoctor());
        dispatch(newPatientActions.getPatientGroups());

        //dispatch(patientProfileAction.patientProfileRequest(patId));

        if (!this.props.staticDatafetched) {                
            dispatch(staticDataActions.getStaticData());
        }

        // Set state
        const { handlers } = this.state.patientProfileFormConfig;
        const { patientProfileFormConfig } = this.state;
        this.setState({
                patientProfileFormConfig:{
                    ...patientProfileFormConfig,
                    handlers:{
                        ...handlers,
                        country_id_handle:this.getStateByCountry,
                        state_id_handle:this.getCityByState,
                        city_id_handle:this.showHideOtherCity,
                        pat_marital_status_handle:this.manageNumberOfChildrenShowHide
                    }
                }
            }
        );
    }

    /**
     * @DateOfCreation        18 Sept 2018
     * @ShortDescription      This function is responsible to show / hide text box
     * @return                Redirect
     */
    manageNumberOfChildrenShowHide(value){
        var patientProfileFormConfig = this.state.patientProfileFormConfig;
        var fields  = patientProfileFormConfig['fields'];
        for(var fc in fields){
            let showOnForm = false;
            var fieldName = fields[fc]['name'];
            if(fieldName == 'pat_number_of_children'){
                if(value.indexOf("1") >= 0){
                    fields[fc]['showOnForm'] = true;
                    showOnForm = true;
                }else{
                    fields[fc]['showOnForm'] = false;
                    showOnForm = false;
                }
            } 
        }
        
        this.setState({
            patientProfileFormConfig:{
                ...patientProfileFormConfig
            }
        });
    }

    /**
     * @DateOfCreation        18 June 2018
     * @ShortDescription      This function is responsible to updated State
     * @return                Nothing
     */
    componentWillReceiveProps(props) {

        const { dispatch } = this.props;
        const { profile, profileValidate }  = this.state.patient;
        var patientProfileFormConfig        = this.state.patientProfileFormConfig;
        var patientProfileFormFields        = patientProfileFormConfig['fields'];
        
        if(!props.patientProfileRequest){
            this.isProfileDataSet = false;
        }

        if(props.patientProfileRequest && !this.isProfileDataSet){
            this.isProfileDataSet = true;
            for(var fc in patientProfileFormFields){
                var fieldName = patientProfileFormFields[fc]['name'];

                patientProfileFormFields[fc]['value'] = props.patient[fieldName]; 
                if(fieldName == 'pat_marital_status'){
                    if(patientProfileFormFields[fc]['value'] !== null && patientProfileFormFields[fc]['value'] != ''){
                        if(patientProfileFormFields[fc]['value'].indexOf("1") >= 0){
                            this.showNumChildField = true;
                        }else{
                            this.showNumChildField = false;
                        }
                    }
                }

                if(fieldName == 'pat_number_of_children'){
                    patientProfileFormFields[fc]['showOnForm'] = this.showNumChildField;
                }

                let temp={};
                if(patientProfileFormFields[fc]['type'] != 'date'){
                    temp[fieldName] = props.patient[fieldName];
                } else {
                    if(props.patient[fieldName] != ''){
                        temp[fieldName] = moment(props.patient[fieldName]);
                    }else{
                        temp[fieldName] = props.patient[fieldName];
                    }
                }     
                this.boundForm.setFieldData(temp);
            }

            this.setState({
                patientProfileFormConfig : patientProfileFormConfig,
                patient:{
                    profile:{
                        ...profile,
                        pat_profile_img : props.patient.pat_profile_img
                    }
                }
            }, function(){
                dispatch(regionActions.getCities(props.patient.state_id)); 
                dispatch(regionActions.getStates(props.patient.country_id));
            });

           
        }

        /*updated profile image*/
        if(props.pat_profile_img){
            utilityHelper.setPatientProfileImage(props.pat_profile_img);

            const { profile, profileValidate}  = this.state.patient;
            this.setState({
                patient:{
                    profile:{
                        ...profile,
                        pat_profile_img : props.pat_profile_img
                    },profileValidate:{
                        ...profileValidate
                    }
                }
            });
        }

        if(props.country != undefined && !this.isCountryLoad){
            const { data }  = this.state.patientProfileFormConfig;
                const { patientProfileFormConfig } = this.state;
                let countryData = utilityHelper.getDataConvertToOptionType(props.country, 'value', 'id');
                this.setState({
                        patientProfileFormConfig:{
                            ...patientProfileFormConfig,
                            data:{
                                ...data,
                                country_id_data:countryData,
                            }
                        }
                    }
                ,function(){
                    this.isCountryLoad = true;
                });
        }

        // set states
        if(props.states != undefined && this.stateLoad){
            let stateData = utilityHelper.getDataConvertToOptionType(props.states,'name','id');
            const { data } = this.state.patientProfileFormConfig;
            const { patientProfileFormConfig } = this.state;
            this.setState({
                patientProfileFormConfig:{
                    ...patientProfileFormConfig,
                    data:{
                        ...data,
                        state_id_data:stateData
                    }
                }
            }, function(){
                this.isStateSet = true;       
                this.stateLoad = false;
            }); 
        }

        // set cities
        if(props.cities != undefined && this.isStateSet){
            this.citiesLoad = false;
            let cityData = utilityHelper.getDataConvertToOptionType(props.cities,'name','id');
            const { data } = this.state.patientProfileFormConfig;
            const { patientProfileFormConfig } = this.state;
            this.setState({
                patientProfileFormConfig:{
                    ...patientProfileFormConfig,
                    data:{
                        ...data,
                        city_id_data:cityData
                    }
                }
            }, function(){
                this.stateLoad=true;
            });            
        }

        // set referral doctor
        if(props.patientGroups && props.isPatientGroupsFetchDone && this.patientGroupsLoad){
            this.patientGroupsLoad = false;
            let patientGroupsData = utilityHelper.getDataConvertToOptionType(props.patientGroups,'pat_group_name','pat_group_id');
            const { data }  = this.state.patientProfileFormConfig;
            const { patientProfileFormConfig } = this.state;
            this.setState({
                patientProfileFormConfig:{
                    ...patientProfileFormConfig,
                    data:{
                        ...data,
                        pat_group_name_data:patientGroupsData
                    }
                }
            });
        }
        if(props.referralDoctor && props.isReferralDoctorFetchDone && this.referralsLoad){
            this.referralsLoad = false;
            let referralData = utilityHelper.getDataConvertToOptionType(props.referralDoctor,'doc_ref_name','doc_ref_id');
            const { data } = this.state.patientProfileFormConfig;
            const { patientProfileFormConfig } = this.state;
            this.setState({
                patientProfileFormConfig:{
                    ...patientProfileFormConfig,
                    data:{
                        ...data,
                        doc_ref_name_data:referralData
                    }
                }
            });
        }

        if(props.isUpdateDone || props.errorMsg){
            setTimeout(function(){
                dispatch(patientProfileAction.resetState());
            },3000);
        } 
    }

    /**
    * @DateOfCreation        2 aug 2018
    * @ShortDescription      This function is responsible to handle close profile image
    * @return                Nothing
    */
    handleClose() {
        const { dispatch }  = this.props;
        dispatch(patientProfileAction.resetState());
        this.basicInfoImageHideHandle();
    }

    /**
    * @DateOfCreation        18 June 2018
    * @ShortDescription      This function is responsible to Submit the Edit Patient Profile form
    * @return                Nothing
    */
    handleSubmit() {
        const { dispatch } = this.props;
        
        if(this.boundForm){
            let data = this.boundForm.getData();

            //Call the action function with dispatch
            if(data){
                dispatch(patientProfileAction.profileUpdate(data));                
            }
        }
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

    /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to handle preview image
   * @return                Nothing
   */
    _onChange(event){
        const { patId } = this.props;

        const { profile,profileValidate } = this.state.patient;
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            var imageSize = event.target.files[0].size;
            if(imageSize > 2097152){
               this.setState({
                  profileImage:'',
                  validationMsg: patientProfileConstants.PATIENT_IMG_SIZE_VALID_MSG,
                  patId:''
                })
            } else {
              var Extension = event.target.files[0].type.split('/')[1];
              var ExtensionArray = ["gif","png","jpeg","jpg"];
              if (ExtensionArray.indexOf(Extension) > 0) {
                  reader.onload = (e) => {
                   this.setState({
                      profileImage : e.target.result,
                      validationMsg: '',
                      patId: this.props.patId
                   })
                  };
              } else {
                this.setState({
                  profileImage:'',
                  validationMsg: patientProfileConstants.PATIENT_IMG_TYPE_VALID_MSG,
                  patId:''
                })
              }
            }
        }
        this.basicInfoImageShowHandle();
    }

    /**
    * @DateOfCreation        29 May 2018
    * @ShortDescription      This function is responsible to handle show profile model
    * @return                Nothing
    */
    basicInfoImageShowHandle() {
        this.setState({ basicInfoImageShow: true });
    }

    /**
    * @DateOfCreation        29 May 2018
    * @ShortDescription      This function is responsible to handle close profile model
    * @return                Nothing
    */
    basicInfoImageHideHandle() {
        this.setState({ basicInfoImageShow: false });
    }

    render() {        
        return(
            <section>
                <PatientProfileImage
                    basicInfoImageShow       = {this.state.basicInfoImageShow}
                    basicInfoImageHideHandle = {this.basicInfoImageHideHandle}
                    profileImageUrl          = {this.state.profileImage}
                    validationMsg            = {this.state.validationMsg}
                    patId                    = {this.props.patId}
                    successMessage           = {this.props.successMessage}
                />
                <PatientProfile
                    patient                     = {this.state.patient}
                    errorMessage                = {this.props.errorMsg}
                    successMessage              = {this.props.successMessage}
                    handleSubmit                = {this.handleSubmit}
                    isUpdateDone                = {this.props.isUpdateDone}
                    staticData                  = {this.props.staticData}
                    _onChange                   = {this._onChange}
                    sendingRequest              = {this.props.sendingRequest}
                    patientProfileUpdatedData   = {this.props.patientUpdatedData}
                    patientProfileFormConfig    = {this.state.patientProfileFormConfig}
                    handleBoundFormUpdate       = {this.handleBoundFormUpdate}
                />
            </section>
        );
    }
}

/**
 * @DateOfCreation        18 June 2018
 * @ShortDescription      This function is responsible to map store state to props
 * @return                View
 */
function mapStateToProps(state) {
    
    const { patientProfileRequest,submitted, patient, successMessage, isUserNotValid, patientUpdatedData, isUpdateDone, errorMsg,pat_profile_img,sendingRequest} = state.patientProfile;
    const { referralDoctor, isReferralDoctorFetchDone, isPatientGroupsFetchDone, patientGroups } = state.newPatient;
    const { country, states, cities } = state.region;
    const { staticData,staticDatafetched } = state.staticData;
    return {
        patient,
        successMessage, 
        country,
        states,
        cities, 
        submitted,
        isUpdateDone,
        patientUpdatedData,
        errorMsg,
        staticData,
        staticDatafetched,
        patientProfileRequest,
        pat_profile_img,
        sendingRequest,
        referralDoctor, 
        isReferralDoctorFetchDone, 
        isPatientGroupsFetchDone, 
        patientGroups
    };

}

const connectedPatientProfileContainer = connect(mapStateToProps)(PatientProfileContainer);
export { connectedPatientProfileContainer as PatientProfileContainer };
 



 
