import React from "react";
import { connect } from 'react-redux';
import Loadable from 'react-loadable'; 
import { Loading } from '../../../global';
import { utilityHelper } from '../../../_helpers';
import { headerActions } from '../../../_actions';
import { configConstants } from './../../../_constants';
import { VitalsSaveFromInitialVisitActions } from './VitalsSaveFromInitialVisitActions';

const VitalsSaveFromInitialVisit = Loadable({
    loader: () => import('./VitalsSaveFromInitialVisit' /* webpackChunkName = "VitalsSaveFromInitialVisit" */).then(object => object.VitalsSaveFromInitialVisit),
    loading: Loading
});

class VitalsSaveFromInitialVisitContainer extends React.Component {
	constructor(props){
        super(props);
        this.boundFormVitals       = undefined;     
        this.vitalsContainerRef    = React.createRef();   
        this.submitVitals          = this.submitVitals.bind(this);
        this.changeValue                        = this.changeValue.bind(this);
        this.state                 = {};
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to final information send
    * @return                Redirect
    */
    submitVitals() {
        const { patId, visitId } = this.props;
        let vitals               = this.vitalsContainerRef.current.getVitalsData();
        let extraData            = {};
        extraData['pat_id']      = patId;
        extraData['visit_id']    = visitId;
        extraData['submitted_from'] = configConstants.SUBMITTED_FROM_INITIAL_VISIT;
        let finalData            = {};

        finalData = utilityHelper.mergeMultipleObject([vitals, extraData]);
        if (finalData) {
            const { dispatch,patId, visitId } = this.props;
            dispatch(VitalsSaveFromInitialVisitActions.submitRequest(finalData));
            // scroll to div top
            document.getElementById('physicalExaminationTitle').scrollIntoView(); 
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
    * @ShortDescription      This function is responsible to get all form information
    * @return                Redirect
    */
    componentWillMount() {
        const { dispatch, patId, visitId} = this.props;
        let extraData = {};
        extraData['pat_id'] = patId;
        extraData['visit_id'] = visitId;
        extraData['form_type'] = ['vitals-form-fector', 'vitals-Weight-form-fector'];
        
        dispatch(VitalsSaveFromInitialVisitActions.getListRecords(extraData));
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
        datas[fieldName] = fieldValue;
        this.vitalsContainerRef.current.handleSetData(datas);
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to props update hook event
    * @return                Redirect
    */
    componentWillReceiveProps(props) {
        const { dispatch} = this.props;
        
        if(props.fetchedVitalsData){
            var state = this.state;
            var formConfig = props.patientVitalsData.VisitsVitalsFormFector;
            var fields = formConfig['fields'];
            var handlers = formConfig['handlers'];
            var handler = formConfig['handlerData'];
            var handlerName = formConfig['handlerName'];
            for(var fc in formConfig['fields']){
                var fieldName = fields[fc]['name'];
                if(handlers.hasOwnProperty(fieldName+'_handle')){
                    handlers[fieldName+'_handle'] = this.changeValue;
                    state[handlerName[fieldName]] = fieldName;
                    state[fieldName] = fields[fc]['value'];
                }                   
            }
            props.patientVitalsData['VisitsVitalsFormFector'] = formConfig;
        }

        if(props.isUpdateDone){
            setTimeout(function(){
                dispatch(VitalsSaveFromInitialVisitActions.resetState());
            }.bind(this),2000);
        }
    }

    render() {
        if(this.props.fetchedVitalsData){
            return (
                <div >
                    <VitalsSaveFromInitialVisit 
                        VisitsVitalsFormFector = {this.props.patientVitalsData.VisitsVitalsFormFector}
                        visitDatafetched       = {this.props.fetchedVitalsData}
                        submitted              = {this.props.submitted}
                        successMessage         = {this.props.successMessage}
                        errorMsg               = {this.props.errorMsg}
                        isUpdateDone           = {this.props.isUpdateDone}
                        patId                  = {this.props.patId}
                        visit_id               = {this.props.visitId}
                        submitVitals           = {this.submitVitals}
                        vitalsContainerRef     = {this.vitalsContainerRef}                     
                        user_type              = {this.props.user_type}
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
    const { submitted, successMessage, errorMsg, isUserNotValid, fetchedVitalsData, isUpdateDone, patientVitalsData} = state.vitalsSaveFromInitialVisit;
    
    return {
        submitted, 
        successMessage, 
        errorMsg,
        isUserNotValid, 
        fetchedVitalsData,
        isUpdateDone,
        patientVitalsData,
        user_type:state.session.user.user_type
    };
}

const connectedVitalsSaveFromInitialVisitContainer = connect(mapStateToProps)(VitalsSaveFromInitialVisitContainer);
export { connectedVitalsSaveFromInitialVisitContainer as VitalsSaveFromInitialVisitContainer };
