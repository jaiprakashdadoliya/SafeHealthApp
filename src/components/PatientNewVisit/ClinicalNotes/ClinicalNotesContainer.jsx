import React from "react";
import { connect } from 'react-redux';
import Loadable from 'react-loadable'; 
import { Loading } from '../../../global';
import { clinicalNotesActions } from './clinicalNotesActions';
import { utilityHelper } from '../../../_helpers';
import { headerActions } from '../../../_actions';
import { confirmAlert } from 'react-confirm-alert';
import formConfig from "./NewClinicalNotesConfig";
import {configConstants} from '../../../_constants';

const ClinicalNotes = Loadable({
    loader: () => import('./ClinicalNotes' /* webpackChunkName = "ClinicalNotes" */).then(object => object.ClinicalNotes),
    loading: Loading
});

class ClinicalNotesContainer extends React.Component {
	constructor(props){
		super(props);

        this.submitClinicalNotesData    = this.submitClinicalNotesData.bind(this);
        this.handleBoundFormUpdate      = this.handleBoundFormUpdate.bind(this);
        this.isReload = true;
        this.state = {
            formConfig : formConfig,
            pages      : 0,
            filtered   : [],
            filterAll  : ''
        };
	}

    /**
     * @DateOfCreation        21 Aug 2018
     * @ShortDescription      This function is responsible to get the list of Clinical Notes from API
     * @return                Nothing
     */
    componentWillMount() {
        const { dispatch,visitId,patId } = this.props;
            
        if(visitId && patId){
            dispatch(clinicalNotesActions.getClinicalNotesList(visitId, patId));
        }
    }

    /**
     * @DateOfCreation        21 Aug 2018
     * @ShortDescription      This function is responsible to get patient Clinical notes
     * @param                 Event Object
     * @return                Nothing
     */
    componentWillReceiveProps(props){
        const { dispatch, visitId, patId } = this.props;
       
        const { data } = this.state.formConfig;
        const { formConfig } = this.state;

        var formConfigEdit = formConfig;
        var fields = formConfigEdit['fields'];
        var fieldVal = [];
        if(props.user_type == configConstants.USER_TYPE_DOCTOR){
            if(this.isReload && props.clinicalNotesList != '' && props.clinicalNotesList != null ){
                
                for(var fc in fields){
                    var fieldName = fields[fc]['name'];
            
                    if(fields[fc]['type'] == 'tags'){
                        fields[fc]['value'] = props.clinicalNotesList[fieldName];
                        fieldVal = fields[fc]['value'];
                    }else{
                        fields[fc]['value'] = props.clinicalNotesList[fieldName];                        
                    }
                }
                
                this.boundForm.setFieldData({clinical_notes: fieldVal});
                this.isReload = false;
            } else {
                fieldVal = [];
                for(var fc in fields){
                    var fieldName = fields[fc]['name'];
            
                    if(fields[fc]['type'] == 'tags'){
                        fields[fc]['value'] = [];
                        fieldVal = [];
                    }
                }

                this.boundForm.setFieldData({clinical_notes: fieldVal});
            }
        }
 
        if(props.isUpdateDone && visitId && patId){
            setTimeout(function(){
                dispatch(clinicalNotesActions.getClinicalNotesList(visitId, patId));
                dispatch(clinicalNotesActions.resetState());
                this.isReload = true;
            }.bind(this),2000);
        }
    }

    /**
     * @DateOfCreation        21 Aug 2018
     * @ShortDescription      This function is responsible to fx form input state data
     * @return                Redirect
     */
    handleBoundFormUpdate(data){
        this.boundForm = data;
    }

    /**
    * @DateOfCreation        21 Aug 2018
    * @ShortDescription      This function is responsible to handle submit Clinical notes data
    * @return                Redirect
    */
    submitClinicalNotesData(){
        const { dispatch, patId, visitId } = this.props;

        let data                = this.boundForm.getData();
        let extraData           = {};
        extraData['pat_id']     = patId;
        extraData['visit_id']   = visitId;

        let clinicalData = utilityHelper.mergeMultipleObject([data, extraData]);
        dispatch(clinicalNotesActions.clinicalNotesSubmit(clinicalData));        
    }

    render() {
        return (
            <div >
                <ClinicalNotes 
                    user_type               = { this.props.user_type }
                    successMessage          = { this.props.successMessage }
                    errorMsg                = { this.props.errorMsg }
                    isUpdateDone            = { this.props.isUpdateDone }
                    handleBoundFormUpdate   = { this.handleBoundFormUpdate }
                    submitClinicalNotesData = { this.submitClinicalNotesData }
                    formConfig              = { this.state.formConfig }
                    clinicalNotesList       = { this.props.clinicalNotesList}
                    isClinicalDataFetched   = { this.props.isClinicalDataFetched}
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
    const { sendingRequest, successMessage, errorMsg, isUserNotValid, isUpdateDone, isClinicalDataFetched, clinicalNotesData, clinicalNotesList } = state.clinicalNotes;
    return {
        successMessage,
        errorMsg,
        clinicalNotesList,
        isUpdateDone,
        user_type:state.session.user.user_type,
        isClinicalDataFetched
    };
}

// Connection with State 
const connectedClinicalNotesContainer = connect(mapStateToProps)(ClinicalNotesContainer);
export { connectedClinicalNotesContainer as ClinicalNotesContainer };