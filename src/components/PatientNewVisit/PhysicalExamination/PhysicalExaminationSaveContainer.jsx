import React from "react";
import { connect } from 'react-redux';
import Loadable from 'react-loadable'; 
import { Loading } from '../../../global';
import { utilityHelper } from '../../../_helpers';
import { headerActions } from '../../../_actions';
import { physicalExaminationSaveActions } from './physicalExaminationSaveActions';

const PhysicalExaminationSave = Loadable({
    loader: () => import('./PhysicalExaminationSave' /* webpackChunkName = "PhysicalExaminationSave" */).then(object => object.PhysicalExaminationSave),
    loading: Loading
});

class PhysicalExaminationSaveContainer extends React.Component {
	constructor(props){
        super(props);
        this.boundFormPhysicalExamination       = undefined; 
        this.PhysicalExaminationContainerRef    = React.createRef();
        this.submitPhysicalExaminationStatus    = this.submitPhysicalExaminationStatus.bind(this);
        this.changeValue                        = this.changeValue.bind(this);
        this.showHide                           = this.showHide.bind(this);
        this.showHideTriggers                   = [];
        this.state  = {
            formConfig : '',
        };

    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to final information send
    * @return                Redirect
    */
    submitPhysicalExaminationStatus() {
        const { patId, visitId } = this.props;
        let PhysicalExamination = this.PhysicalExaminationContainerRef.current.getPhysicalExaminationData();
        let extraData = {};
        extraData['pat_id'] = patId;
        extraData['visit_id'] = visitId;
        let finalData = {};
        finalData = utilityHelper.mergeMultipleObject([PhysicalExamination,extraData]);
        if (finalData) {
            const { dispatch,patId, visitId } = this.props;
            dispatch(physicalExaminationSaveActions.submitRequest(finalData));
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
    * @ShortDescription      This function is responsible to props update hook event
    * @return                Redirect
    */
    componentWillReceiveProps(props) {
        const { dispatch, patId, visitId} = this.props;
        
        if(props.isUpdateDone){
            setTimeout(function(){
                dispatch(physicalExaminationSaveActions.resetState());

                let extraData = {};
                extraData['pat_id'] = patId;
                extraData['visit_id'] = visitId;
                extraData['form_type'] = 'physical-examination-form-fector';
                dispatch(physicalExaminationSaveActions.getListRecord(extraData));
            },2000);
        }
        if(props.fetchedphysicalExaminationData){
            var state = this.state;
            var formConfig = props.patientphysicalExaminationData.VisitsPhysicalExaminationFormFector;
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
            props.patientphysicalExaminationData.VisitsPhysicalExaminationFormFector = formConfig;
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

        let datav ={};
        datav[state['bmi']] = bmi;
        this.PhysicalExaminationContainerRef.current.handleSetData(datav);
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
        extraData['form_type'] = 'physical-examination-form-fector';
        dispatch(physicalExaminationSaveActions.getListRecord(extraData));
    }

    render() {
        if(this.props.fetchedphysicalExaminationData){
            return (
                <div >
                    <PhysicalExaminationSave 
                        physicalExaminationFormData         = {this.props.patientphysicalExaminationData.VisitsPhysicalExaminationFormFector}
                        visitDatafetched                    = {this.props.fetchedphysicalExaminationData}
                        submitted                           = {this.props.submitted}
                        successMessage                      = {this.props.successMessage}
                        errorMsg                            = {this.props.errorMsg}
                        isUpdateDone                        = {this.props.isUpdateDone}
                        patId                               = {this.props.patId}
                        visit_id                            = {this.props.visitId}
                        submitPhysicalExaminationStatus     = {this.submitPhysicalExaminationStatus}
                        PhysicalExaminationContainerRef     = {this.PhysicalExaminationContainerRef}
                        user_type                           = {this.props.user_type}
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
    const { submitted, successMessage, errorMsg,isUserNotValid,fetchedphysicalExaminationData,isUpdateDone, patientphysicalExaminationData} = state.physicalExaminationSave;

    return {
        submitted, 
        successMessage, 
        errorMsg,
        isUserNotValid, 
        fetchedphysicalExaminationData,
        isUpdateDone,
        patientphysicalExaminationData,
        user_type:state.session.user.user_type
    };
}

const connectedPhysicalExaminationSaveContainer = connect(mapStateToProps)(PhysicalExaminationSaveContainer);
export { connectedPhysicalExaminationSaveContainer as PhysicalExaminationSaveContainer };
