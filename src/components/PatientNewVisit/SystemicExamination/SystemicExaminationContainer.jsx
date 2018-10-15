import React from "react";
import { connect } from 'react-redux';
import Loadable from 'react-loadable'; 
import { Loading } from '../../../global';
import { utilityHelper } from '../../../_helpers';
import { headerActions } from '../../../_actions';
import { systemicExaminationActions } from './systemicExaminationActions';

const SystemicExamination = Loadable({
    loader: () => import('./SystemicExamination' /* webpackChunkName = "SystemicExamination" */).then(object => object.SystemicExamination),
    loading: Loading
});

class SystemicExaminationContainer extends React.Component {
	constructor(props, context) {
        super(props, context);
        this.boundForm                      = undefined;
        this.handleBoundFormUpdate          = this.handleBoundFormUpdate.bind(this);
        this.submitSystemicExamination      = this.submitSystemicExamination.bind(this);
        this.RespiratorySystemContainerRef  = React.createRef();
        this.showHide                       = this.showHide.bind(this);
        this.state                          = {};
        this.showHideTriggers               = [];
        this.state  = {
            formConfig : '',
        };
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to final information send
    * @return                Redirect
    */
    submitSystemicExamination() {
        const { patId, visitId } = this.props;
        let RespiratorySystemData = this.RespiratorySystemContainerRef.current.getRespiratorySystemData();
        let extraData = {};
        extraData['pat_id'] = patId;
        extraData['visit_id'] = visitId;
        let finalData = {};
        finalData = utilityHelper.mergeMultipleObject([ RespiratorySystemData, extraData]);
        if (finalData) {
            const { dispatch,patId, visitId } = this.props;
            dispatch(systemicExaminationActions.submitRequest(finalData));
            // scroll to div top
            //document.getElementById('laboratoryTestTitle').scrollIntoView(); 
        }
    }
        
    /**
     * @DateOfCreation        14 june 2018
     * @ShortDescription      This function is responsible to get Symptoms option data
     * @param                 Event Object
     * @return                Nothing
     */
    componentWillMount(){
        const { dispatch, patId, visitId} = this.props;
        let patDetails = {};
        patDetails['pat_id'] = patId;
        patDetails['visit_id'] = visitId;
        dispatch(systemicExaminationActions.getSystemicExaminationRecord(patDetails));
    }    
    
        
    /**
    * @DateOfCreation        06 July 2018
    * @ShortDescription      This function is responsible to update FxForm ref object
    * @return                JSON Object
    * @param                 Nothing
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

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to props update hook event
    * @return                Redirect
    */
    componentWillReceiveProps(props) {
        const { dispatch, patId, visitId } = this.props;
        //reset state
        if(props.isUpdateDone){
            setTimeout(function() {
                dispatch(systemicExaminationActions.resetState());
                let patDetails = {};
                patDetails['pat_id'] = patId;
                patDetails['visit_id'] = visitId;
                dispatch(systemicExaminationActions.getSystemicExaminationRecord(patDetails));
            },2000);
        }
        if(props.fetchedSystemicExaminationData){
            var state = this.state;
            var formConfig = props.patientSystemicExaminationData.form_1;
            var fields = formConfig['fields'];
            var handlers = formConfig['handlers'];
            var handler = formConfig['handlerData'];
            var handlerName = formConfig['handlerName'];
            for(var fc in formConfig['fields']){
                var fieldName = fields[fc]['name'];
                var fieldTriggerName = fields[fc]['fieldName'];
                if(handlers.hasOwnProperty(fieldName+'_handle') && handlers[fieldName+'_handle'] == 'changeValue'){
                    handlers[fieldName+'_handle'] = this.changeValue;
                    state[handlerName[fieldName]] = fieldName;
                    state[fieldName] = fields[fc]['value'];
                }
                if(handlers.hasOwnProperty(fieldName+'_handle') && handlers[fieldName+'_handle'] == 'showHide'){
                    handlers[fieldName+'_handle'] = this.showHide;
                    this.showHideTriggers[fieldTriggerName] = false
                    if(fields[fc]['value'] !== null && fields[fc]['value'] != ''){
                        state[handlerName[fieldName]] = fieldName;
                        state[fieldName] = fields[fc]['value'];
                        if(fields[fc]['value'].indexOf("1") >= 0){
                            this.showHideTriggers[fieldTriggerName] = true;
                        }else{
                            this.showHideTriggers[fieldTriggerName] = false
                        }
                    }
                }

                if(fields[fc]['showHideTrigger'] != ''){
                    fields[fc]['showOnForm'] = this.showHideTriggers[fields[fc]['showHideTrigger']];
                }
            }
            props.patientSystemicExaminationData.form_1 = formConfig;
            this.setState({
                formConfig: formConfig
            });
        }
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to change handel value
    * @return                Redirect
    */
    showHide(event,fieldName){
        const { formConfig } = this.state;
        var fields = formConfig['fields'];
        for(var fc in fields){
            var showHideTrigger = fields[fc]['showHideTrigger'];
            if(showHideTrigger == fieldName){
            
                if(event.indexOf("1") >= 0){
                    fields[fc]['showOnForm'] = true;
                }else{
                    fields[fc]['showOnForm'] = false;
                }
            }
        }
        this.setState({
                formConfig:{
                    ...formConfig,
                    fields : fields,
                }
            }
        );
    }

    render() {
        return (
            <div >
                <SystemicExamination
                    successMsg                    = {this.props.successMsg}
                    errorMsg                      = {this.props.errorMsg}
                    submitted                     = {this.props.submitted}
                    patId                         = {this.props.patId}
                    visitId                       = {this.props.visitId}
                    user_type                     = {this.props.user_type}
                    RespiratorySystemContainerRef= {this.RespiratorySystemContainerRef}
                    patientSystemicExaminationData= {this.props.patientSystemicExaminationData.form_1}
                    fetchedSystemicExaminationData= {this.props.fetchedSystemicExaminationData}
                    submitSystemicExamination     = {this.submitSystemicExamination}
                    isUpdateDone                  = {this.props.isUpdateDone}
                />
            </div>
        );
    }
}

/**
 * @DateOfCreation        19 June 2018
 * @ShortDescription      This function is responsible to connect store to props
 * @return                View
 */
function mapStateToProps(state) {
    const { isUserNotValid,isInsertDone, submitted, successMsg, errorMsg, patientSymptomsOptionData,dataGridRefresh, pages,fetchSymptomsOptionData, patientSystemicExaminationData,fetchedSystemicExaminationData,isUpdateDone} = state.systemicExamination;
    return {
        isInsertDone,
        submitted,
        successMsg,
        errorMsg,
        patientSymptomsOptionData,
        dataGridRefresh,
        isUserNotValid,
        pages,
        user_type:state.session.user.user_type,
        fetchSymptomsOptionData,
        patientSystemicExaminationData,
        fetchedSystemicExaminationData,
        isUpdateDone,
    };
}

// Connection with State
const connectedSystemicExaminationContainer = connect(mapStateToProps)(SystemicExaminationContainer);
export { connectedSystemicExaminationContainer as SystemicExaminationContainer };

