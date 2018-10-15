import React from "react";
import { connect } from 'react-redux';
import { staticDataActions, patientGeneralCheckupAction,headerActions } from '../../../../_actions';
import { utilityHelper } from '../../../../_helpers';
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../global';

const PatientGeneralCheckup = Loadable({
    loader: () => import('./PatientGeneralCheckup' /* webpackChunkName = "PatientGeneralCheckup" */).then(object => object.PatientGeneralCheckup),
    loading: Loading
});

class PatientGeneralCheckupContainer extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = { 
            visit_id :  String(props.visitId),
            pat_id   :  String(props.patId)
        };
        this.handleCheckboxChange   = this.handleCheckboxChange.bind(this);
        this.handleInputChange      = this.handleInputChange.bind(this);
        this.handleSelectChange     = this.handleSelectChange.bind(this);
        this.handleSubmit           = this.handleSubmit.bind(this);
        this.isGeneralCheckupUpdated= false;
    }

    /**
     * @DateOfCreation        14 june 2018
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
     * @DateOfCreation        14 june 2018
     * @ShortDescription      This function is responsible to handle changes in Select state
     * @param                 Event Object
     * @return                Nothing
     */
    handleSelectChange(selectedOption, name) {
        let state = this.state; 

        this.setState({
            ...state,
            [name] : selectedOption.value
        });
    }
    
    /**
     * @DateOfCreation        14 june 2018
     * @ShortDescription      This function is responsible to handle changes in Checkbox state
     * @param                 Event Object
     * @return                Nothing
     */
    handleCheckboxChange(events, name) {
        let state = this.state; 

        this.setState({
            ...state,
            [name] : utilityHelper.getArrayDifference(this.state[name], events)
        });
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get all form information
    * @return                Redirect
    */
    componentWillMount(){
        const { dispatch }  = this.props;
        dispatch(patientGeneralCheckupAction.getPatientGeneralCheckupRecord(this.props.visitId, this.props.patId));

        if (!this.props.staticDatafetched) {                
            dispatch(staticDataActions.getStaticData());
        }
    }

    

    /**
     * @DateOfCreation        25 june 2018
     * @ShortDescription      This function is responsible to update state after getting records from api
     * @param                 Event Object
     * @return                Nothing
     */
    componentWillReceiveProps(props){
        const { result }   = props.patientGeneralCheckupData;
        const { dispatch } = this.props;

        if(!this.isGeneralCheckupUpdated) { 
            if(typeof props.patientGeneralCheckupData === 'object' && props.patientGeneralCheckupData.hasOwnProperty('result')){
                let defaultStateIsHappend = props.patientGeneralCheckupData.result.map(checkFactor => {                
                    let name = checkFactor.key_name; // Checkbox unique name
                    return name;
                });

                let setStateToObj  = utilityHelper.arrayValueToObjectKey(defaultStateIsHappend, result, 'is_happend_');
                this.setState(setStateToObj);
            }
        }

        if(props.isUpdateDone){
            this.setState(this.defaultState);
            setTimeout(function(){
                dispatch(patientGeneralCheckupAction.resetState());
            },3000);
        }
    }

    /**
    * @DateOfCreation        25 June 2018
    * @ShortDescription      This function is responsible to Submit the Edit Patient Profile form
    * @return                Nothing
    */
    handleSubmit() {
        const { dispatch }  = this.props;
        let state           = this.state; 

        this.setState({
            ...state,
            visitId :  String(this.props.visitId),
            pat_id  :  String(this.props.patId)
        });

        let checkupData = this.state;

        dispatch(patientGeneralCheckupAction.generalCheckupInsertUpdate(checkupData));
        this.isGeneralCheckupUpdated = true;

        document.getElementById('generalCheckupTitle').scrollIntoView(); // scroll to div top
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
        if(typeof this.props.patientGeneralCheckupData !== undefined && this.props.patientGeneralCheckupData.hasOwnProperty('result') && this.props.staticDatafetched){

            return (
                <div >
                    <PatientGeneralCheckup 
                        staticData                  = {this.props.staticData}
                        staticDatafetched           = {this.props.staticDatafetched}
                        handleSubmit                = {this.handleSubmit}
                        handleCheckboxChange        = {this.handleCheckboxChange}
                        handleInputChange           = {this.handleInputChange}
                        handleSelectChange          = {this.handleSelectChange}
                        state                       = {this.state}
                        patientGeneralCheckupData   = {this.props.patientGeneralCheckupData}
                        isUpdateDone                = {this.props.isUpdateDone}
                        successMessage              = {this.props.successMessage}
                        errorMsg                    = {this.props.errorMsg}
                        submitted                   = {this.props.submitted}
                        user_type                   = {this.props.user_type}
                    />
                </div>
            );
        }else{
            return (
                <div></div>
            );
        }
    }
}

/**
 * @DateOfCreation        22 June 2018
 * @ShortDescription      This function is responsible to map store state to props
 * @return                View
 */
function mapStateToProps(state) {
    const { staticData, staticDatafetched } = state.staticData;
    const { patientGeneralCheckupData, isUpdateDone, successMessage, errorMsg,isUserNotValid,submitted } = state.generalCheckup;

    return {
        staticData,
        patientGeneralCheckupData,
        isUpdateDone, 
        successMessage, 
        errorMsg,
        staticDatafetched,
        isUserNotValid,
        submitted,
        user_type:state.session.user.user_type
    };
}

const connectedPatientGeneralCheckupContainer = connect(mapStateToProps)(PatientGeneralCheckupContainer);
export { connectedPatientGeneralCheckupContainer as PatientGeneralCheckupContainer };

