import React from "react";
import { connect } from 'react-redux';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import Loadable from 'react-loadable';

import { patientSymptomsActions, headerActions } from '../../_actions';
import { utilityHelper } from '../../_helpers';
import { Loading } from '../../global';
//import {formConfig} from './PatientSymptopmsConfig';


const FxManager = Loadable({
    loader: () => import('./FxManager' /* webpackChunkName = "FxManager" */).then(object => object.FxManager),
    loading: Loading
});

/**
* @DateOfCreation        06 july 2018
* @ShortDescription      This is responsible to genrate symptom grid
*/
class FxManagerContainer extends React.Component {
	constructor(props, context) {
    	super(props, context);
    	const {patId,visitId} = this.props;
        this.defaultState = {
            symptomsFormShow   : false,
            patientSymptomsDetail :'',
            pages               : 0,
            pat_id              : '',
            filtered            : [],
            filterAll           : '',
            symptomFormConfig   : this.props.formConfig.formBuilderConfig,
            fxMultiAddFormTitle : ''
        }; 
    	    this.state                         = this.defaultState;
            this.isActionAdded                 = false;
            this.boundForm                     = undefined;
    	    this.patientSymptomsShowHandle     = this.patientSymptomsShowHandle.bind(this);
    	    this.patientEditSymptomsHideHandle = this.patientEditSymptomsHideHandle.bind(this);
	    
            this.handleSubmit                  = this.handleSubmit.bind(this);
            this.patientDeleteSymptoms         = this.patientDeleteSymptoms.bind(this);
            this.symptomSearch                 = this.symptomSearch.bind(this);
            this.getPatientSymptomsList        = this.getPatientSymptomsList.bind(this);
            this.getGridConfig                 = this.getGridConfig.bind(this);
            this.handleBoundFormUpdate         = this.handleBoundFormUpdate.bind(this);
            this.getFxMultiAddFormExtraConfig  = this.getFxMultiAddFormExtraConfig.bind(this);

  	}
        
        /**
        * @DateOfCreation        06 July 2018
        * @ShortDescription      This function is responsible to get grid config
        * @return                JSON Object
        * @param                 Nothing
        */
        getGridConfig(){            
            var gdata = this.props.formConfig.gridData;
            gdata['data'] = this.props.patientSymptomsData.result;
            gdata['pages'] = this.props.patientSymptomsData.pages;
            gdata['filtered'] = this.state.filtered;
            gdata['onFetchData'] = (state, instance) => {
                    this.getPatientSymptomsList(state.page, state.pageSize, state.sorted, state.filtered)
                }
            if(!this.isActionAdded && (this.props.formConfig.extraConfig.showEditButton || this.props.formConfig.extraConfig.showDeleteButton)){
                gdata['columns'].push({
                    Header: this.props.formConfig.extraConfig.actionHeaderTitle? this.props.formConfig.extraConfig.actionHeaderTitle : 'Action',
                    headerClassName: this.props.formConfig.extraConfig.cssClasses.actionHeaderClass,
                    filterable  : false,
                    className :this.props.formConfig.extraConfig.cssClasses.actionColumnClass,
                    Cell: row => (
                        <div>
                            {this.props.formConfig.extraConfig.showEditButton && 
                            <a href="javascript:void(0);" onClick={this.patientSymptomsShowHandle.bind(null, row.original)} className={this.props.formConfig.extraConfig.cssClasses.editButtonClass}>Edit</a>}
                            {this.props.formConfig.extraConfig.showDeleteButton && 
                            <a href="javascript:void(0)" className={this.props.formConfig.extraConfig.cssClasses.deleteButtonClass}  onClick={this.patientDeleteSymptoms.bind(null,row.original.visit_symptom_id)}>Delete</a>}
                        </div>
                    )
                });
                
                this.isActionAdded = true;
            }
            
            return gdata;
        }
        
        /**
        * @DateOfCreation        06 July 2018
        * @ShortDescription      This function is responsible to get form extra config
        * @return                JSON Object
        * @param                 Nothing
        */
        getFxMultiAddFormExtraConfig(){
            var gridExtraConfig = this.props.formConfig.extraConfig;
            gridExtraConfig['viewHeader'] = () => {
                    return (
                        <div className="row">
                            <div className="col-md-6 col-sm-12" id="medicalHistoryTitle">
                                <h3>Symptoms</h3>    
                            </div>
                            <div className="col-md-6 col-sm-12 text-right">
                                <button className="btn text-btn green" onClick={this.patientSymptomsShowHandle.bind(null, '')}>Add New</button>
                            </div>
                        </div>
                    )
                }             
            return gridExtraConfig;
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
        * @DateOfCreation        14 june 2018
        * @ShortDescription      This function is responsible show edit modal
        * @param                 Event Object
        * @return                Nothing
        */
	patientSymptomsShowHandle(patientSymptom) { 
            //set edit detail
            var formConfig = this.state.symptomFormConfig;
            var fields = formConfig['fields'];
            const {patId,visitId} = this.props;
            var fromTitle = '';
            if(patientSymptom != ''){
                fromTitle = 'Edit Symptoms';
                for(var fc in fields){
                    var fieldName = fields[fc]['name'];
                    fields[fc]['value'] = patientSymptom[fieldName];
                }
            }else{
                fromTitle = 'Add Symptoms';
                for(var fc in fields){
                    var fieldName = fields[fc]['name'];
                    if(fieldName == 'pat_id'){
                        fields[fc]['value'] = patId;
                    }else if(fieldName == 'visit_id'){
                        fields[fc]['value'] = visitId;
                    }else{
                        fields[fc]['value'] = '';
                    }                    
                }
            }
            let oldstate = this.state;
            this.setState({
                ...oldstate,
                symptomsFormShow : true,
                patientSymptomsDetail:patientSymptom,
                symptomFormConfig:formConfig,
                fxMultiAddFormTitle:fromTitle
            });
	}
        
    /**
     * @DateOfCreation        14 june 2018
     * @ShortDescription      This function is responsible hide edit modal
     * @param                 Event Object
     * @return                Nothing
     */
    patientEditSymptomsHideHandle() {
        const {dispatch} = this.props;
        dispatch(patientSymptomsActions.resetState());
        this.setState({
            symptomsFormShow : false
        });
    }

    /**
     * @DateOfCreation        14 june 2018
     * @ShortDescription      This function is responsible delete symptom confirm alert
     * @param                 Event Object
     * @return                Nothing
     */
    patientDeleteSymptoms(visit_symptom_id){
        confirmAlert({
          title: 'Visit Symptoms',
          message: <div className="alert-message">Are you sure you want to delete this visit symptom?</div>,
          buttons: [
          {
            label: <div className='btn red table-btn'>Yes</div>,
            onClick: () => {
              const { dispatch } = this.props;
              dispatch(patientSymptomsActions.symptomsDelete(visit_symptom_id));
            }
          },
          {
            label: <div className='btn default table-btn'>No</div>,
            onClick: () => {return false;}
          }
          ]
      })
    }

    /**
     * @DateOfCreation        14 june 2018
     * @ShortDescription      This function is responsible to get Symptoms option data
     * @param                 Event Object
     * @return                Nothing
     */

    componentWillMount(){
            const { dispatch } = this.props;
            dispatch(patientSymptomsActions.getSymptomsOptionlist());
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
        if(props.dataGridRefresh){
            dispatch(patientSymptomsActions.getSymptomslist(patId, visitId, 0, 5, '', ''));
            dispatch(patientSymptomsActions.getSymptomsOptionlist());
        }

        if(props.isInsertDone){
           this.setState(this.defaultState);
            setTimeout(function(){
                dispatch(patientSymptomsActions.resetState());
            },2000);
        }
        
        //set patientSymptomsOptionData
        if(props.patientSymptomsOptionData){
            let symptomsOpt = utilityHelper.getPatientSymptomsOption(props.patientSymptomsOptionData);
            const { data } = this.state.symptomFormConfig;
            const { symptomFormConfig } = this.state;
            this.setState({
                    symptomFormConfig:{
                        ...symptomFormConfig,
                        data:{
                            ...data,
                            symptom_name_data:symptomsOpt
                        }
                    }
                });
        }
    }

    /**
     * @DateOfCreation        29 June 2018
     * @ShortDescription      This function is responsible to filter symptom list
     * @return                Nothing
     */
    symptomSearch(event){ 
        const { value } = event.target;
        const filterAll = value;
        const filtered = [{ id: 'all', value: filterAll }];
        this.setState({ filterAll, filtered });
    }

    /**
    * @DateOfCreation        06 July 2018
    * @ShortDescription      This function is responsible to 
    * @return                JSON Object
    * @param                 Nothing
    */
    getPatientSymptomsList(page, pageSize, sorted, filtered){
        const { dispatch, patId, visitId } = this.props;
        dispatch(patientSymptomsActions.getSymptomslist(patId, visitId, page, pageSize, sorted, filtered));
    }

    /**
     * @DateOfCreation        06 july 2018
     * @ShortDescription      This function is responsible to handle submit form data
     * @param                 Event Object
     * @return                Nothing
     */
    handleSubmit() {
        if(this.boundForm){
            const { dispatch } = this.props;
            let correctSymptom = this.boundForm.getData();

            if(correctSymptom){
                if(correctSymptom.visit_symptom_id == ""){
                    dispatch(patientSymptomsActions.patientSymptomsSubmit(correctSymptom));
                }else{
                    dispatch(patientSymptomsActions.patientSymptomsUpdateSubmit(correctSymptom));
                }
            }
       }
    }

    render() {
        return (
            <div>
                <FxManager
                        patientEditSymptomsHideHandle = {this.patientEditSymptomsHideHandle}                	
                        symptomSearch                 = {this.symptomSearch}
                        filterAll                     = {this.state.filterAll}
                        gridData                      = {this.getGridConfig()}
                        symptomsFormShow              = {this.state.symptomsFormShow}
                        symptomFormConfig             = {this.state.symptomFormConfig}
                        handleBoundFormUpdate         = {this.handleBoundFormUpdate}
                        handleSubmit    	      = {this.handleSubmit}
                        fxMultiAddFormExtraConfig     = {this.getFxMultiAddFormExtraConfig()}
                        fxMultiAddFormTitle           = {this.state.fxMultiAddFormTitle}
                        successMsg      	      = {this.props.successMsg}
                	errorMsg      	              = {this.props.errorMsg}
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
    const { isUserNotValid,isInsertDone, submitted, successMsg, errorMsg, patientSymptomsOptionData,patientSymptomsData,dataGridRefresh, pages } = state.patientSymptoms;
    return {
        isInsertDone,
        submitted,
        successMsg,
        errorMsg,
        patientSymptomsOptionData,
        patientSymptomsData,
        dataGridRefresh,
        isUserNotValid,
        pages,
    };
}

// Connection with State
const connectedPatientSymptomsContainer = connect(mapStateToProps)(FxManagerContainer);
export { connectedPatientSymptomsContainer as FxManagerContainer };
