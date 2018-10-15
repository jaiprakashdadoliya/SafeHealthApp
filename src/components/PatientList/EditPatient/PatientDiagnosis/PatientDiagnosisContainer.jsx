import React from "react";
import { connect } from 'react-redux';
import moment from 'moment';
import { headerActions, visitDataActions } from '../../../../_actions';
import { patientDiagnosisActions } from './patientDiagnosisActions';
import { configConstants } from '../../../../_constants';
import { utilityHelper } from '../../../../_helpers';
import { confirmAlert } from 'react-confirm-alert';
import Loadable from 'react-loadable';
import { Loading } from './../../../../global';
import formConfig from './PatientDiagnosisConfig';

const PatientDiagnosis = Loadable({
    loader: () => import('./PatientDiagnosis' /* webpackChunkName = "PatientDiagnosis" */).then(object => object.PatientDiagnosis),
    loading: Loading
});

/**
* @DateOfCreation        07 Aug 2018
* @ShortDescription      This is responsible to generate Diagnosis grid
*/
class PatientDiagnosisContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        const {patId,visitId} = this.props;
        this.defaultState = {
            patient : {
                diagnosisFormShow   : false,
                patientDiagnosisDetail :''
            },
            pages               : 0,
            pat_id              : '',
            filtered            : [],
            filterAll           : '',
            diagnosisFormConfig   : formConfig,
            fxMultiAddFormTitle : ''
        }; 

        this.state                          = this.defaultState;
        this.boundForm                      = undefined;
        this.boundGerdForm                  = undefined;
        this.boundCtdForm                   = undefined;
        this.boundPulmonaryForm             = undefined;
        this.patientDiagnosisShowHandle     = this.patientDiagnosisShowHandle.bind(this);
        this.patientEditDiagnosisHideHandle = this.patientEditDiagnosisHideHandle.bind(this);    
        this.handleSubmit                   = this.handleSubmit.bind(this);
        this.handleDiagnosisFactorSubmit    = this.handleDiagnosisFactorSubmit.bind(this);
        this.deletePatientDiagnosis         = this.deletePatientDiagnosis.bind(this);
        this.patientDeleteDiagnosis         = this.patientDeleteDiagnosis.bind(this);
        this.diagnosisSearch                = this.diagnosisSearch.bind(this);
        this.getPatientDiagnosisList        = this.getPatientDiagnosisList.bind(this);
        this.getGridConfig                  = this.getGridConfig.bind(this);
        this.handleBoundFormUpdate          = this.handleBoundFormUpdate.bind(this);
        this.handleBoundGerdFormUpdate      = this.handleBoundGerdFormUpdate.bind(this);
        this.handleBoundCtdFormUpdate       = this.handleBoundCtdFormUpdate.bind(this);
        this.handleBoundPulmonaryFormUpdate = this.handleBoundPulmonaryFormUpdate.bind(this);
        this.getFxMultiAddFormExtraConfig   = this.getFxMultiAddFormExtraConfig.bind(this);

    }
        
    /**
    * @DateOfCreation        08 Aug 2018
    * @ShortDescription      This function is responsible to get grid config
    * @return                JSON Object
    * @param                 Nothing
    */
    getGridConfig(){
        var gridCols = [
                        {
                            Header: "Disease/Disorder",
                            headerClassName: 'grid-header',
                            accessor: "disease_name",
                            filterMethod: (filter, row) => {
                                return row[filter.id].includes(filter.value)
                            },
                        },
                        {
                            Header: "Date of Diagnosis",
                            accessor: "date_of_diagnosis",
                            className : "dataCellClass",
                            headerClassName: 'grid-header',
                            filterMethod: (filter, row) => {
                                return row[filter.id].includes(filter.value)
                            },
                            Cell: (props) => {return <span>{(props.value != '' && props.value != undefined && props.value != null) ? moment(props.value).format('DD/MM/YYYY') : ''}</span>}                            
                        },
                        {
                            Header: "End Date of Diagnosis",
                            accessor: "diagnosis_end_date",
                            className : "dataCellClass",
                            headerClassName: 'grid-header',
                            filterMethod: (filter, row) => {
                                return row[filter.id].includes(filter.value)
                            },
                            Cell: (props) => {return <span>{(props.value != '' && props.value != undefined && props.value != null) ? moment(props.value).format('DD/MM/YYYY') : ''}</span>}                            
                        },
                        {
                            Header: "Action",
                            headerClassName: 'grid-header-action text-center',
                            sortable: false,
                            filterable: false,
                            className :"text-center",
                            Cell: row => (
                                <div>
                                    <a href="javascript:void(0);" onClick={this.patientDiagnosisShowHandle.bind(null, row.original)} className="green btn table-btn">Edit</a>
                                    <a href="javascript:void(0)" className="red btn table-btn" onClick={this.deletePatientDiagnosis.bind(null,row.original.visit_diagnosis_id)} >Delete</a>
                                </div>
                            )
                        }
                    ];

        if(this.props.user_type == configConstants.USER_TYPE_PATIENT){
            gridCols.splice(3, 1);
        }           
        const gridData = {
            noDataText              : "Diagnosis not found !!",
            columns                 : gridCols,
            data                    : this.props.patientDiagnosisData,
            minRows                 : 0,
            defaultPageSize         : 3,
            className               : "table table-bordered responsive",
            defaultFilterMethod     : (filter, row) =>String(row[filter.id]) === filter.value,
            filtered                : this.state.filtered,
            pages                   : this.props.pages,
            showPagination          : true,
            showPaginationTop       : true,
            showPaginationBottom    : false,
            showPageSizeOptions     : false,
            pageSizeOptions         : [3,10,25,50,100],
            Sorted:true,
            manual:true, // Identify Server Side Pagination
            onFetchData : (state, instance) => {
                this.getPatientDiagnosisList(state.page, state.pageSize, state.sorted, state.filtered)
            }
        }
        return gridData;
    }
    
    /**
    * @DateOfCreation        08 Aug 2018
    * @ShortDescription      This function is responsible to get form extra config
    * @return                JSON Object
    * @param                 Nothing
    */
    getFxMultiAddFormExtraConfig(){
        const extraConfig = {
            viewHeader: () => {
                return (
                    <div className="row">
                        <div className="col-md-6 col-sm-12" id="medicalHistoryTitle">
                            <h3>Diagnosis</h3>    
                        </div>
                        <div className="col-md-6 col-sm-12 text-right">
                            {this.props.user_type != configConstants.USER_TYPE_PATIENT ? 
                                <button className="btn text-btn green" onClick={this.patientDiagnosisShowHandle.bind(null, '')}>Add New</button>
                                : ''
                            }
                        </div>
                    </div>
                )
            },
            cssClasses:{},
            formSaveRequestBtnText: configConstants.BUTTON_PLEASE_WAIT
        }
        
        return extraConfig;
    }
    
    /**
    * @DateOfCreation        08 Aug 2018
    * @ShortDescription      This function is responsible to update FxForm ref object
    * @return                JSON Object
    * @param                 Nothing
    */
    handleBoundFormUpdate(data){
        this.boundForm = data;
    }

    /**
    * @DateOfCreation        08 Aug 2018
    * @ShortDescription      This function is responsible to update FxForm ref object
    * @return                JSON Object
    * @param                 Nothing
    */
    handleBoundGerdFormUpdate(data){
        this.boundGerdForm = data;
    }

    /**
    * @DateOfCreation        08 Aug 2018
    * @ShortDescription      This function is responsible to update FxForm ref object
    * @return                JSON Object
    * @param                 Nothing
    */
    handleBoundCtdFormUpdate(data){
        this.boundCtdForm = data;
    }

    /**
    * @DateOfCreation        08 Aug 2018
    * @ShortDescription      This function is responsible to update FxForm ref object
    * @return                JSON Object
    * @param                 Nothing
    */
    handleBoundPulmonaryFormUpdate(data){
        this.boundPulmonaryForm = data;
    }

    /**
    * @DateOfCreation        08 Aug 2018
    * @ShortDescription      This function is responsible show edit modal
    * @param                 Event Object
    * @return                Nothing
    */
    patientDiagnosisShowHandle(patientSymptom) { 
        const {diagnosisFormShow}  = this.state.patient;
        
        //set edit detail
        var formConfig = this.state.diagnosisFormConfig;
        var fields = formConfig['fields'];
        const {patId,visitId} = this.props;
        var fromTitle = '';
        if(patientSymptom != ''){
            fromTitle = 'Edit Diagnosis';
            for(var fc in fields){
                var fieldName = fields[fc]['name'];
                fields[fc]['value'] = patientSymptom[fieldName];
            }
        }else{
            fromTitle = 'Add Diagnosis';
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
        
        this.setState({
            patient : {
                diagnosisFormShow : true,
                patientDiagnosisDetail:patientSymptom
            },
            diagnosisFormConfig:formConfig,
            fxMultiAddFormTitle:fromTitle
        });
    }
        
    /**
     * @DateOfCreation        08 Aug 2018
     * @ShortDescription      This function is responsible hide edit modal
     * @param                 Event Object
     * @return                Nothing
     */
    patientEditDiagnosisHideHandle() {
        const {dispatch} = this.props;
        //dispatch(patientDiagnosisActions.resetState());
        const {diagnosisFormShow}  = this.state.patient;
                 this.setState({
            patient : {
                diagnosisFormShow : false
            }
        });
    }

    /**
     * @DateOfCreation        08 Aug 2018
     * @ShortDescription      This function is responsible delete symptom confirm alert
     * @param                 Event Object
     * @return                Nothing
     */
    patientDeleteDiagnosis(visit_symptom_id){
        confirmAlert({
          title: 'Visit Diagnosis',
          message: <div className="alert-message">Are you sure you want to delete this visit symptom?</div>,
          buttons: [
          {
            label: <div className='btn red table-btn'>Yes</div>,
            onClick: () => {
              const { dispatch } = this.props;
              //dispatch(patientDiagnosisActions.DiagnosisDelete(visit_symptom_id));
            }
          },
          {
            label: 'No',
            onClick: () => {return false;}
          }
          ]
      })
    }

    /**
     * @DateOfCreation        08 Aug 2018
     * @ShortDescription      This function is responsible to get Diagnosis option data
     * @param                 Event Object
     * @return                Nothing
     */
    componentWillMount(){
        const { dispatch, patId, visitId } = this.props;
        dispatch(patientDiagnosisActions.getDiagnosisOptionListAction());

        // if (!this.props.visitDatafetched) { 
            let extraData = {};
            extraData['pat_id'] = patId;
            extraData['visit_id'] = visitId;
            extraData['form_type'] = ['patient-disease-gerd-form-factor', 'patient-disease-ctd-form-factor', 'patient-disease-pulmonary-form-factor'];
            dispatch(patientDiagnosisActions.getDiagnosisFormAction(extraData));               
        // }
    }

    /**
    * @DateOfCreation        08 Aug 2018
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
    * @DateOfCreation        08 Aug 2018
    * @ShortDescription      This function is responsible to props update hook event
    * @return                Redirect
    */
    componentWillReceiveProps(props) {
        const { dispatch, patId, visitId } = this.props;
        if(props.dataGridRefresh){
            dispatch(patientDiagnosisActions.getDiagnosisListAction(patId, visitId, 0, 3, '', ''));
            dispatch(patientDiagnosisActions.getDiagnosisOptionListAction());
        }

        if(props.isInsertDone || props.isFactorDataInsertDone){
            setTimeout(function(){
                this.setState(this.defaultState);
                dispatch(patientDiagnosisActions.resetState());
            }.bind(this),2000);
        }

        if(props.errorMsg){
             setTimeout(function(){
                dispatch(patientDiagnosisActions.resetState());
            }.bind(this),2000);
        }
        
        //set patientDiagnosisOptionData
        if(props.patientDiagnosisOptionData){
            let DiagnosisOpt = utilityHelper.getPatientDiagnosisOption(props.patientDiagnosisOptionData);
            const { data } = this.state.diagnosisFormConfig;
            const { diagnosisFormConfig } = this.state;
            this.setState({
                    diagnosisFormConfig:{
                        ...diagnosisFormConfig,
                        data:{
                            ...data,
                            disease_name_data:DiagnosisOpt
                        }
                    }
                });
        }
    }

    /**
     * @DateOfCreation        08 Aug 2018
     * @ShortDescription      This function is responsible to filter symptom list
     * @return                Nothing
     */
    diagnosisSearch(event){ 
        const { value } = event.target;
        const filterAll = value;
        const filtered = [{ id: 'all', value: filterAll }];
        this.setState({ filterAll, filtered });
    }

    /**
    * @DateOfCreation        08 Aug 2018
    * @ShortDescription      This function is responsible to 
    * @return                JSON Object
    * @param                 Nothing
    */
    getPatientDiagnosisList(page, pageSize, sorted, filtered){
        const { dispatch, patId, visitId } = this.props;
        dispatch(patientDiagnosisActions.getDiagnosisListAction(patId, visitId, page, pageSize, sorted, filtered));
    }

    /**
     * @DateOfCreation        08 Aug 2018
     * @ShortDescription      This function is responsible to handle submit form data
     * @param                 Event Object
     * @return                Nothing
     */
    handleSubmit() {
        if(this.boundForm){
            const { dispatch, patId, visitId } = this.props;
            let diagnosisData = this.boundForm.getData();
            
            if(diagnosisData){
                var visit_diagnosis_id = this.state.patient.patientDiagnosisDetail.visit_diagnosis_id;
                if(visit_diagnosis_id == undefined){
                    visit_diagnosis_id = '';
                }
                let extraData = {'pat_id': patId, 'visit_id': visitId, 'visit_diagnosis_id': visit_diagnosis_id};
                dispatch(patientDiagnosisActions.patientDiagnosisSubmitAction(utilityHelper.mergeMultipleObject([diagnosisData, extraData]) ));
            }
       }
    }

    /**
     * @DateOfCreation        08 Aug 2018
     * @ShortDescription      This function is responsible to handle submit form data
     * @param                 Event Object
     * @return                Nothing
     */
    handleDiagnosisFactorSubmit() {
        if(this.boundGerdForm && this.boundCtdForm && this.boundPulmonaryForm){
            const { dispatch, patId, visitId } = this.props;
            let diagnosisGerdData       = this.boundGerdForm.getData();
            let diagnosisCtdData        = this.boundCtdForm.getData();
            let diagnosisPulmonaryData  = this.boundPulmonaryForm.getData();
        
            let extraData = {'pat_id': patId, 'visit_id': visitId};
            dispatch(patientDiagnosisActions.patientDiagnosisFactorSubmitAction(utilityHelper.mergeMultipleObject([extraData, diagnosisGerdData, diagnosisCtdData, diagnosisPulmonaryData]) ));

            // scroll to div top
            document.getElementById('diagnosis-top-div').scrollIntoView(); 
        }
    }

    /**
     * @DateOfCreation        08 Aug 2018
     * @ShortDescription      This function is responsible delete diagnosis data
     * @param                 Event Object
     * @return                Nothing
     */
    deletePatientDiagnosis(visit_diagnosis_id){
        confirmAlert({
          title: 'Diagnosis',
          message: <div className="alert-message">Are you sure you want to delete this diagnosis record?</div>,
          buttons: [
          {
            label: 'Yes',
            onClick: () => {
              const { dispatch } = this.props;
              dispatch(patientDiagnosisActions.diagnosisDelete(visit_diagnosis_id));
            }
          },
          {
            label: 'No',
            onClick: () => {return false;}
          }
          ]
      })
    }

    render() {
        if(this.props.fetchedFormData){
            return (
                <div >
                    <PatientDiagnosis
                            patientEditDiagnosisHideHandle  = {this.patientEditDiagnosisHideHandle}                    
                            diagnosisSearch                 = {this.diagnosisSearch}
                            filterAll                       = { this.state.filterAll }
                            gridData                        = {this.getGridConfig()}
                            diagnosisFormShow               = {this.state.patient.diagnosisFormShow}
                            diagnosisFormConfig             = {this.state.diagnosisFormConfig}
                            handleBoundFormUpdate           = {this.handleBoundFormUpdate}
                            handleBoundGerdFormUpdate       = {this.handleBoundGerdFormUpdate}
                            handleBoundCtdFormUpdate        = {this.handleBoundCtdFormUpdate}
                            handleBoundPulmonaryFormUpdate  = {this.handleBoundPulmonaryFormUpdate}
                            handleSubmit                    = {this.handleSubmit}
                            handleDiagnosisFactorSubmit     = {this.handleDiagnosisFactorSubmit}
                            fxMultiAddFormExtraConfig       = {this.getFxMultiAddFormExtraConfig()}
                            fxMultiAddFormTitle             = {this.state.fxMultiAddFormTitle}
                            successMsg                      = {this.props.successMsg}
                            errorMsg                        = {this.props.errorMsg}
                            submitted                       = {this.props.submitted}
                            patId                           = {this.props.patId}
                            visitId                         = {this.props.visitId}
                            generalCheckupShow              = {this.props.generalCheckupShow}
                            diagnosisFormData               = {this.props.diagnosisFormData}
                            isFactorDataInsertDone          = {this.props.isFactorDataInsertDone}
                            user_type                       = { this.props.user_type }
                    />
                </div>
            );
        }else{
            return (<div></div>);
        }
    }
}

/**
 * @DateOfCreation        19 June 2018
 * @ShortDescription      This function is responsible to connect store to props
 * @return                View
 */
function mapStateToProps(state) {
    const { isUserNotValid,isInsertDone, submitted, successMsg, errorMsg, patientDiagnosisOptionData, patientDiagnosisData, dataGridRefresh, pages, diagnosisFormData, fetchedFormData, isFactorDataInsertDone } = state.patientDiagnosis;

    return {
        isInsertDone,
        submitted,
        successMsg,
        errorMsg,
        patientDiagnosisOptionData,
        patientDiagnosisData,
        dataGridRefresh,
        isUserNotValid,
        pages,
        diagnosisFormData,
        fetchedFormData,
        isFactorDataInsertDone,
        user_type:state.session.user.user_type
    };
}

// Connection with State
const connectedPatientDiagnosisContainer = connect(mapStateToProps)(PatientDiagnosisContainer);
export { connectedPatientDiagnosisContainer as PatientDiagnosisContainer };
