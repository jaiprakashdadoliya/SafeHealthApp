import React from "react";
import { connect } from 'react-redux';
import Loadable from 'react-loadable'; 
import { Loading } from '../../global';
import { staticDataActions, visitDataActions,headerActions } from '../../_actions';
import { utilityHelper } from '../../_helpers';
import { dataConstants } from '../../_constants';
import { PatientNewVisit } from './PatientNewVisit';
import windowSize from 'react-window-size';
import {nextVisitScheduleActions} from './NextVisitSchedule/nextVisitScheduleActions';
class PatientNewVisitContainer extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.submitNewVisitForm = this.submitNewVisitForm.bind(this);

        this.VisitStatusContainerRef            = React.createRef();
        this.DeathInfoContainerRef              = React.createRef();
        this.HospitalizationContainerRef        = React.createRef();
        this.ChangesInContainerRef              = React.createRef();
        this.VitalsContainerRef                 = React.createRef();
        this.PhysicalExaminationContainerRef    = React.createRef();
        this.TreatmentRequirementContainerRef   = React.createRef();
        this.DiagnosisContainerRef              = React.createRef();
        this.InvestigationContainerRef          = React.createRef();
        this.SpirometryContainerRef             = React.createRef();
        this.SixMinutWalkTestContainerRef       = React.createRef();
        this.TreatmentContainerRef              = React.createRef();
        this.changeValue                        = this.changeValue.bind(this);
        this.state = {activeTab : 1};
        this.handleTabSelect = this.handleTabSelect.bind(this);
        this.components = true;
        this.visitNumber = true;
    }


    /**
     * @DateOfCreation        3 July 2018
     * @ShortDescription      This function is responsible to get all static data
     * @return                Nothing
     */
    componentWillMount() {
        const { dispatch } = this.props;
        let patId = this.props.match.params.patId;
        let visitId = this.props.match.params.visitId;
        this.components = true;
        dispatch(visitDataActions.getStaticForm(patId, visitId));
    }

     /*
     * This function is using for set state according to active tab
     */
    handleTabSelect(activeTab) {
        this.setState({ activeTab });
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to final information send
    * @return                Redirect
    */
    submitNewVisitForm(visitStatus) {
        const { dispatch } = this.props;

        if(visitStatus == dataConstants.VISIT_REDIRECT_TYPE_CANCEL){
            this.props.history.push('/patientallvisit/'+this.props.match.params.patId);
            return false;
        }
        
        // let visitStatusData         = this.VisitStatusContainerRef.current.getVisitsData();
        // let deathInfoData           = this.DeathInfoContainerRef.current.getDeathInfoData();
        // let hospitalizationData     = this.HospitalizationContainerRef.current.getHospitalizationData();
        // let changesInData           = this.ChangesInContainerRef.current.getChangesInData();
        // let vitalsData              = this.VitalsContainerRef.current.getVitalsData();
        // let physicalExaminationData = this.PhysicalExaminationContainerRef.current.getPhysicalExaminationData();
        // let treatmentRequirementData= this.TreatmentRequirementContainerRef.current.getTreatmentRequirementData();
        // let diagnosisData           = this.DiagnosisContainerRef.current.getDiagnosisData();
        // let investigationData       = this.InvestigationContainerRef.current.getInvestigationData();
        // let spirometryData          = this.SpirometryContainerRef.current.getSpirometryData();
        // let sixMWTData              = this.SixMinutWalkTestContainerRef.current.get6MWTData();
        // let treatmentData           = this.TreatmentContainerRef.current.getTreatmentData();
        
        let extraData               = {};
        extraData['pat_id']         = this.props.match.params.patId;
        extraData['visit_id']       = this.props.match.params.visitId;
        extraData['booking_id']     = this.props.match.params.bookingId;
        extraData['visit_status']   = visitStatus;
                
        let finalData = {};
        // finalData = utilityHelper.mergeMultipleObject([visitStatusData, deathInfoData, hospitalizationData, changesInData, vitalsData, physicalExaminationData, treatmentRequirementData, diagnosisData, investigationData, spirometryData, sixMWTData, extraData, treatmentData]);
        // finalData = utilityHelper.mergeMultipleObject([physicalExaminationData, diagnosisData, investigationData]);

        this.setState({
            visitStatus : visitStatus
        });
      
        if (finalData) {
            const { dispatch } = this.props;
            dispatch(visitDataActions.newVisitFormSubmit(extraData));
        }
    
    }


    /**
     * @DateOfCreation        11 July 2018
     * @ShortDescription      This function is responsible to update state after getting records from api
     * @param                 Event Object
     * @return                Nothing 
     */
    componentWillReceiveProps(props){
        const { dispatch } = this.props;
        if(props.isUpdateDone){
            if(this.state.visitStatus == dataConstants.VISIT_REDIRECT_TYPE_FINISH || this.state.visitStatus == dataConstants.VISIT_REDIRECT_TYPE_CANCEL){
                dispatch(visitDataActions.resetState(visitStatus));
                var data = [];
                var extraData = {'pat_id' : this.props.match.params.patId, 'visit_id' : this.props.match.params.visitId, 'timing_id' : dataConstants.NEXT_VISIT};
                dispatch(nextVisitScheduleActions.nextVisitScheduleSubmitAction(utilityHelper.mergeMultipleObject([data, extraData])));
                if(props.match.params.bookingId != undefined){ 
                    this.props.history.push('/appointments');
                }else{
                    this.props.history.push('/patientallvisit/'+props.match.params.patId);
                }   
            }

            var visitStatus = this.state.visitStatus;
        }

        if(props.visitDatafetched){
            var state = this.state;
            var formConfig = props.visitData.VisitsPhysicalExaminationFormFector;
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
            props.visitData['VisitsPhysicalExaminationFormFector'] = formConfig;

            var formConfig = props.visitData.InvestigationFector;
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
            props.visitData['InvestigationFector'] = formConfig;


            var formConfig = props.visitData.VisitsVitalsFormFector;
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
            props.visitData['VisitsVitalsFormFector'] = formConfig;
        }
        if(props.visitDatafetched && this.visitNumber){
           dispatch(visitDataActions.getVisitComponents(props.match.params.visitId, props.visitData.PatientInformation.visit_number));
           this.visitNumber = false;
        }
        if(props.visitComponentsfetched && props.visitComponentsData.length > 0 && this.components){
            this.setState(
                    { activeTab : props.visitComponentsData[0].visit_cmp_order }
                );
        }
        if(props.visitComponentsfetched && props.visitComponentsData.length >= 0){
            this.components = false;
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
        this.PhysicalExaminationContainerRef.current.handleSetData(datas);
        this.InvestigationContainerRef.current.handleSetData(datas);
        this.VitalsContainerRef.current.handleSetData(datas);

        let datav ={};
        datav[state['bmi']] = bmi;
        this.PhysicalExaminationContainerRef.current.handleSetData(datav);
        this.InvestigationContainerRef.current.handleSetData(datav);
        this.VitalsContainerRef.current.handleSetData(datav);
    } 

    render() {
        if (this.props.visitDatafetched && !this.components) {
            return (
                <div>
                    <PatientNewVisit
                        payload                         = {this.state}  
                        handleTabSelect                 = {this.handleTabSelect}
                        windowHeight                    = {this.props.windowHeight}
                        staticData                      = {this.props.staticData}
                        staticDatafetched               = {this.props.staticDatafetched}
                        visitData                       = {this.props.visitData}
                        visitDatafetched                = {this.props.visitDatafetched}
                        submitNewVisitForm              = {this.submitNewVisitForm}
                        visitStatusContainerRef         = {this.VisitStatusContainerRef}
                        deathInfoContainerRef           = {this.DeathInfoContainerRef}
                        HospitalizationContainerRef     = {this.HospitalizationContainerRef}
                        changesInContainerRef           = {this.ChangesInContainerRef}
                        vitalsContainerRef              = {this.VitalsContainerRef}
                        physicalExaminationContainerRef = {this.PhysicalExaminationContainerRef}
                        treatmentRequirementContainerRef= {this.TreatmentRequirementContainerRef}
                        diagnosisContainerRef           = {this.DiagnosisContainerRef}
                        investigationContainerRef       = {this.InvestigationContainerRef}
                        spirometryContainerRef          = {this.SpirometryContainerRef}
                        sixMinutWalkTestContainerRef    = {this.SixMinutWalkTestContainerRef}
                        treatmentContainerRef           = {this.TreatmentContainerRef}
                        patId                           = {this.props.match.params.patId}
                        visitId                         = {this.props.match.params.visitId}
                        successMessage                  = {this.props.successMessage}
                        errorMsg                        = {this.props.errorMsg}
                        submitted                       = {this.props.submitted}
                        isUpdateDone                    = {this.props.isUpdateDone}
                        user_type                       = {this.props.user_type}
                        visitComponentsData             = {this.props.visitComponentsData}
                        visitComponentsfetched          = {this.props.visitComponentsfetched}
                    />
                </div>
            );
        } else {
            return ( <div className="showbox">
                        <div className="loader">
                            <svg className="circular" viewBox="25 25 50 50">
                              <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
                            </svg>
                        </div>
                    </div>);
        }
    }
}

/**
 * @DateOfCreation        18 June 2018
 * @ShortDescription      This function is responsible to map store state to props
 * @return                View
 */
function mapStateToProps(state) {
    const { staticData, staticDatafetched } = state.staticData;
    const { visitComponentsfetched,visitComponentsData, visitData, visitDatafetched, successMessage, isUpdateDone, submitted, errorMsg, isUserNotValid} = state.visit;
   
    return {
        staticData,
        staticDatafetched,
        visitData, 
        visitDatafetched,
        successMessage,
        isUpdateDone,
        submitted,
        errorMsg,
        visitComponentsData,
        visitComponentsfetched,
        isUserNotValid,
        user_type:state.session.user.user_type
    };

}

const connectedPatientNewVisitContainer = connect(mapStateToProps)(PatientNewVisitContainer);
export { connectedPatientNewVisitContainer as PatientNewVisitContainer };
