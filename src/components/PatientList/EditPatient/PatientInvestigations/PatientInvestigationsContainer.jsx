import React from "react";
import { connect } from 'react-redux';
import Loadable from 'react-loadable'; 
import { Loading } from '../../../../global';
import { utilityHelper } from '../../../../_helpers';
import { headerActions } from '../../../../_actions';
import { patientInvestigationsActions } from './patientInvestigationsActions';

const PatientInvestigations = Loadable({
    loader: () => import('./PatientInvestigations' /* webpackChunkName = "PatientInvestigations" */).then(object => object.PatientInvestigations),
    loading: Loading
});

class PatientInvestigationsContainer extends React.Component {
	constructor(props){
        super(props);
        this.spirometryContainerRef                 = React.createRef();   
        this.sleepStudyContainerRef                 = React.createRef();   
        this.investigationReportContainerRef        = React.createRef();   
        
        this.submitInvestigationsStatus             = this.submitInvestigationsStatus.bind(this);
        this.changeValue                            = this.changeValue.bind(this);
        this.state={};
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to final information send
    * @return                Redirect
    */
    submitInvestigationsStatus() {
        const { patId, visitId } = this.props;
        let spirometry          = this.spirometryContainerRef.current.getSpirometryData();
        let sleepStudy          = this.sleepStudyContainerRef.current.getSleepStudyData();
        let investigationReport = this.investigationReportContainerRef.current.getInvestigationReportData();
        
        
        let extraData = {};
        extraData['pat_id'] = patId;
        extraData['visit_id'] = visitId;
        let finalData = {};
        finalData = utilityHelper.mergeMultipleObject([spirometry,extraData, sleepStudy, investigationReport]);
        if (finalData) {
            const { dispatch,patId, visitId } = this.props;
            dispatch(patientInvestigationsActions.submitRequest(finalData));
            // scroll to div top
            document.getElementById('investigationsTitle').scrollIntoView(); 
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
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to props update hook event
    * @return                Redirect
    */
    componentWillReceiveProps(props) {
        const { dispatch, patId, visitId} = this.props;
        
        if(props.isUpdateDone){
            setTimeout(function(){
                dispatch(patientInvestigationsActions.resetState());

                let extraData = {};
                extraData['pat_id'] = patId;
                extraData['visit_id'] = visitId;
                extraData['form_type'] = ['spirometries-fector', 'spirometries-table-fector', 'sleep_study_form', 'investigation_report_form'];
                dispatch(patientInvestigationsActions.getListRecord(extraData));
            },2000);
        }
        /*if(props.fetchedInvestigationsData){
            var state = this.state;
            var formConfig = props.patientInvestigationsData.InvestigationFector;
            var fields = formConfig['fields'];
            var handlers = formConfig['handlers'];
            var handler = formConfig['handlerData'];
            var handlerName = formConfig['handlerName'];
            for(var fc in formConfig['fields']){
                var fieldName = fields[fc]['name'];
                if(handlers.hasOwnProperty(fieldName+'_handle') && handler[fieldName] === 'changeValue'){
                    handlers[fieldName+'_handle'] = this.changeValue;
                    state[handlerName[fieldName]] = fieldName;
                    state[fieldName] = fields[fc]['value'];
                }                   
            }
            props.patientInvestigationsData['InvestigationFector'] = formConfig;
        }*/
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get all form information
    * @return                Redirect
    */
    componentWillMount() {
        const { dispatch, patId, visitId} = this.props;
        let extraData = {};
        extraData['pat_id'] = patId;
        extraData['visit_id'] = visitId;
        extraData['form_type'] = ['spirometries-fector', 'spirometries-table-fector', 'sleep_study_form', 'investigation_report_form'];
        dispatch(patientInvestigationsActions.getListRecord(extraData));
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to change handel value
    * @return                Redirect
    */
    changeValue(event,formName){
        let datas ={};
        var fieldName = event.target.name;
        var fieldValue = event.target.value;
        var state = this.state;
        state[fieldName] = fieldValue;
        var weight = state[state['weight']];
        var height = state[state['height']];
        var bmi = utilityHelper.calCulateBMI(weight,height);

        datas[fieldName] = fieldValue;
        this.investigationsContainerRef.current.handleSetData(datas);

        let datav ={};
        datav[state['bmi']] = bmi;
        this.investigationsContainerRef.current.handleSetData(datav);
    }

    render() {
        if(this.props.fetchedInvestigationsData){
            return (
                <div>
                    <PatientInvestigations 
                        visitFormData                               = {this.props.patientInvestigationsData}
                        visitDatafetched                            = {this.props.fetchedInvestigationsData}
                        submitted                                   = {this.props.submitted}
                        successMessage                              = {this.props.successMessage}
                        errorMsg                                    = {this.props.errorMsg}
                        isUpdateDone                                = {this.props.isUpdateDone}
                        patId                                       = {this.props.patId}
                        visit_id                                    = {this.props.visitId}
                        user_type                                   = {this.props.user_type}
                        spirometryContainerRef                      = {this.spirometryContainerRef}
                        sleepStudyContainerRef                      = {this.sleepStudyContainerRef}
                        investigationReportContainerRef             = {this.investigationReportContainerRef}
                        submitInvestigationsStatus                  = {this.submitInvestigationsStatus}
                    />
                </div>
            );
        }else{
            return (<Loading />);
        }
    }
}

/**
 * @DateOfCreation        22 June 2018
 * @ShortDescription      This function is responsible to map store state to props
 * @return                View
 */
function mapStateToProps(state) {
    const { submitted, successMessage, errorMsg,isUserNotValid,fetchedInvestigationsData,isUpdateDone, patientInvestigationsData} = state.patientInvestigations;

    return {
        submitted, 
        successMessage, 
        errorMsg,
        isUserNotValid, 
        fetchedInvestigationsData,
        isUpdateDone,
        patientInvestigationsData,
        user_type:state.session.user.user_type
    };
}

const connectedPatientInvestigationsContainer = connect(mapStateToProps)(PatientInvestigationsContainer);
export { connectedPatientInvestigationsContainer as PatientInvestigationsContainer };
