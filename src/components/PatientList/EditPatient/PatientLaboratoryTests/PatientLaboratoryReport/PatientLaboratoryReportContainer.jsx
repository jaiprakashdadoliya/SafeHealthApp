import React from "react";
import { connect } from 'react-redux';
import { headerActions, staticDataActions } from '../../../../../_actions';
import { configConstants } from '../../../../../_constants';
import { utilityHelper } from '../../../../../_helpers';
import { confirmAlert } from 'react-confirm-alert';
import Loadable from 'react-loadable';
import { Loading } from './../../../../../global';
import formConfig from './PatientLaboratoryReportConfig';
import moment from 'moment';
import {patientLaboratoryReportActions} from './patientLaboratoryReportActions';

const PatientLaboratoryReport = Loadable({
    loader: () => import('./PatientLaboratoryReport').then(object => object.PatientLaboratoryReport),
    loading: Loading
});
const PatientLaboratoryTemplates = Loadable({
    loader: () => import('./PatientLaboratoryTemplates').then(object => object.PatientLaboratoryTemplates),
    loading: Loading
});


class PatientLaboratoryReportContainer extends React.Component {
	constructor(props, context) {
    	super(props, context);
    	this.optionLoad = true;
    	const {patId,visitId} = this.props;
        this.defaultState = {
            patient : {
                FormShow   : false,
                patientDetail :''
            },
            pages               : 0,
            pat_id              : '',
            filtered            : [],
            filterAll           : '',
            formConfig          : formConfig,
            fxMultiAddFormTitle : '',
            labTemplate         : '',
            labTemplateValidate:  {isValid: true, message: ''},
        }; 
    	    this.state                         = this.defaultState;
            this.boundForm                     = undefined;
    	    this.showHandle     			   = this.showHandle.bind(this);
    	    this.editHideHandle 			   = this.editHideHandle.bind(this);
            this.deleteData                    = this.deleteData.bind(this);
	        this.handleSubmit                  = this.handleSubmit.bind(this);
            this.tableSearch                   = this.tableSearch.bind(this);
            this.getTableList        		   = this.getTableList.bind(this);
            this.getGridConfig                 = this.getGridConfig.bind(this);
            this.handleBoundFormUpdate         = this.handleBoundFormUpdate.bind(this);
            this.getFxMultiAddFormExtraConfig  = this.getFxMultiAddFormExtraConfig.bind(this);
            this.showLabReport                 = this.showLabReport.bind(this);

  	}

  	/**
    * @DateOfCreation        06 July 2018
    * @ShortDescription      This function is responsible to get grid config
    * @return                JSON Object
    * @param                 Nothing
    */
    getGridConfig(){
        var gridCol = [
                {
                    Header: "Procedure/Test Name",
                    headerClassName: 'grid-header',
                    accessor: "lab_report_name",
                    filterMethod: (filter, row) => {
                        return row[filter.id].includes(filter.value)
                    },

                },
                {
                    Header: "Uploaded Date & Time",
                    accessor: "created_at",
                    className : "dataCellClass",
                    headerClassName: 'grid-header',
                    filterable  : false,
                    Cell: (props) => {return <span>{moment(props.original.created_at).format('DD/MM/YYYY HH:mm:SS')}</span>}
                },
                {
                    Header: "Report File",
                    headerClassName: 'grid-header-action',
                    filterable  : false,
                    Cell: row => (
                        <div>
                            {row.original.lab_report_file == null ? 
                                <a href='javascript:void(0)' onClick={this.showHandle.bind(null, row.original)} className="yellow btn table-btn">Upload Report</a> : 
                                <React.Fragment>
                                    <a target="_ild" href={configConstants.API_BASE_PATH + 'visit/laboratoryreport/download/'+row.original.lr_id}  className="yellow btn table-btn">Download</a>
                                    <a target="_ild" href={configConstants.API_BASE_PATH + 'visit/laboratoryreport/view/'+row.original.lr_id+'/view'}  className="green btn table-btn">View</a>
                                </React.Fragment>
                            }
                        </div>
                    )
                },
                {
                    Header: "Action",
                    headerClassName: 'grid-header-action text-center',
                    filterable  : false,
                    className :"text-center",
                    Cell: row => (
                        <div>
                            <a href="javascript:void(0)" className="red btn table-btn"  onClick={this.deleteData.bind(null,row.original.lr_id)}>Delete</a>
                        </div>
                    )
                }
            ];

        if(this.props.user_type == configConstants.USER_TYPE_PATIENT){
            gridCol.splice(3, 1);
        }

        const gridData = {
            noDataText : "Laboratory Report not found !!",
            columns : gridCol,
            data                    : this.props.patientLaboratoryReportData.result,
            minRows                 : 0,
            defaultPageSize         : 5,
            className               : "table table-bordered responsive",
            defaultFilterMethod     : (filter, row) =>String(row[filter.id]) === filter.value,
            filtered                : this.state.filtered,
            pages                   : this.props.patientLaboratoryReportData.pages,
            showPagination          : true,
            showPaginationTop       : true,
            showPaginationBottom    : false,
            pageSizeOptions         : [5,10,25,50,100],
            Sorted:true,
            manual:true, // Identify Server Side Pagination
            onFetchData : (state, instance) => {
                this.getTableList(state.page, state.pageSize, state.sorted, state.filtered)
            }
        }
        return gridData;
    }

    /**
    * @DateOfCreation        06 July 2018
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
                            <h4>Reports</h4>    
                        </div>
                        {this.props.user_type != configConstants.USER_TYPE_PATIENT ?
                            <div className="col-md-6 col-sm-12 text-right">
                                <button className="btn text-btn green" onClick={this.showHandle.bind(null, '')}>Add New</button>
                            </div> : ''
                        }
                    </div>
                )
            },
            cssClasses:{}
        }
        
        return extraConfig;
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
     * @ShortDescription      This function is responsible hide edit modal
     * @param                 Event Object
     * @return                Nothing
     */
    editHideHandle() {
        const {dispatch} = this.props;
        dispatch(patientLaboratoryReportActions.resetState());
        const {FormShow}  = this.state.patient;
        let state  = this.state;

                 this.setState({
                 	...state,
	            patient : {
	                FormShow : false
	            }
        });
    }

    /**
        * @DateOfCreation        14 june 2018
        * @ShortDescription      This function is responsible show edit modal
        * @param                 Event Object
        * @return                Nothing
        */
	showHandle(patientDetail) { 
		this.optionLoad = true;
            const {FormShow}  = this.state.patient;
            
            //set edit detail
            var formConfig = this.state.formConfig;
            var fields = formConfig['fields'];
            const {patId,visitId} = this.props;
            var fromTitle = '';
            if(patientDetail != ''){
                fromTitle = 'Edit Laboratory Report';
                for(var fc in fields){
                    var fieldName = fields[fc]['name'];
                    var valueData = patientDetail[fieldName] === null ? '' : patientDetail[fieldName];
                    fields[fc]['value'] = fields[fc]['type'] ==='customcheckbox' ? [String(valueData)] : valueData;

                    if(fieldName == 'lab_report_file'){
                        fields[fc]['showOnForm'] = true;
                    } else {
                        fields[fc]['clearFix'] = false;
                    }
                }
            }else{
                fromTitle = 'Add New Laboratory Report';
                for(var fc in fields){
                    var fieldName = fields[fc]['name'];
                    if(fieldName == 'pat_id'){
                        fields[fc]['value'] = patId;
                    }else if(fieldName == 'visit_id'){
                        fields[fc]['value'] = visitId;
                    }else{
                        fields[fc]['value'] = fields[fc]['type'] ==='customcheckbox' ? [''] : '';
                    }
                    
                    if(fieldName == 'lab_report_file'){
                        fields[fc]['showOnForm'] = false;
                    }
                    if(fieldName == 'lab_report_name'){
                        fields[fc]['clearFix']   = true;
                    }
                }
            }
            
            let state  = this.state;
            this.setState({
				...state,
                patient : {
                    FormShow : true,
                    patientDetail:patientDetail
                },
                formConfig:formConfig,
                fxMultiAddFormTitle:fromTitle
            });
	}

   /**
    * @DateOfCreation        06 July 2018
    * @ShortDescription      This function is responsible to 
    * @return                JSON Object
    * @param                 Nothing
    */
    getTableList(page, pageSize, sorted, filtered){
        const { dispatch, patId, visitId } = this.props;
        dispatch(patientLaboratoryReportActions.getTablelist(patId, visitId, page, pageSize, sorted, filtered));
    }

    /**
     * @DateOfCreation        29 June 2018
     * @ShortDescription      This function is responsible to filter symptom list
     * @return                Nothing
     */
    tableSearch(event){ 
        let state  = this.state;
        const { value } = event.target;
        const filterAll = value;
        const filtered = [{ id: 'all', value: filterAll }];
        this.setState({ ...state,filterAll, filtered });
    }

    /**
     * @DateOfCreation        14 june 2018
     * @ShortDescription      This function is responsible delete symptom confirm alert
     * @param                 Event Object
     * @return                Nothing
     */
    deleteData(lr_id){
        let patientDetail = {};
        patientDetail['lr_id'] = lr_id;
        confirmAlert({
          title: 'Laboratory Report',
          message: <div className="alert-message">Are you sure you want to delete this laboratory report?</div>,
          buttons: [
          {
            label: 'Yes',
            onClick: () => {
              const { dispatch } = this.props;
              dispatch(patientLaboratoryReportActions.getDeleteRequest(patientDetail));
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
     * @DateOfCreation        06 july 2018
     * @ShortDescription      This function is responsible to handle submit form data
     * @param                 Event Object
     * @return                Nothing
     */
    handleSubmit() {
        if(this.boundForm){
            const { dispatch } = this.props;
            let submitData = this.boundForm.getData();

            if(submitData){
                dispatch(patientLaboratoryReportActions.submitRequest(submitData));
            }
       }
    }

    /**
     * @DateOfCreation        14 june 2018
     * @ShortDescription      This function is responsible to get Symptoms option data
     * @param                 Event Object
     * @return                Nothing
     */

    componentWillMount(){
        const { dispatch } = this.props;
        if (!this.props.staticDatafetched) {                
        	dispatch(staticDataActions.getStaticData());
    	}
        //dispatch(patientLaboratoryReportActions.getLabtemplates());
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to redirect unauthorizes users
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
            dispatch(patientLaboratoryReportActions.getTablelist(patId, visitId, 0, 5, '', ''));
        }

        if(props.isInsertDone){
           //this.setState(this.defaultState);
            setTimeout(function(){
                this.editHideHandle();
                dispatch(patientLaboratoryReportActions.resetState());
            }.bind(this),2000);
        }
        
        //set patientSymptomsOptionData
        if(props.staticDatafetched && this.optionLoad){
        	this.optionLoad = false;
            let doseUnitOpt = utilityHelper.getDataConvertToOptionType(props.staticData.dose_measurement_Type,'value','id');
            const { data } = this.state.formConfig;
            const { formConfig } = this.state;
            this.setState({
                    formConfig:{
                        ...formConfig,
                        data:{
                            ...data,
                            medicine_dose_unit_data:doseUnitOpt,
                            
                        }
                    }
                });
        }
    }

    showLabReport(){
        const {patId, visitId, dispatch} = this.props;
        dispatch(patientLaboratoryReportActions.showLabReport(patId,visitId));
    }

    render() {
        return (
            <div>
               {/* <PatientLaboratoryTemplates
                        labTemplate                   = {this.state.labTemplate}
                        labTemplateValidate          = {this.state.labTemplateValidate}
                        labTemplatesFetched          = {this.props.labTemplatesFetched} 
                        labTemplatesData             = {this.props.labTemplatesData}
                        handleSelectChange           = {this.handleSelectChange}
                        showLabReport                = {this.showLabReport}
                />*/}
                <PatientLaboratoryReport
  						editHideHandle 				  = {this.editHideHandle}                	
                        tableSearch                   = {this.tableSearch}
                        filterAll                     = { this.state.filterAll }
                        gridData                      = {this.getGridConfig()}
                        FormShow              		  = {this.state.patient.FormShow}
                        formConfig             		  = {this.state.formConfig}
                        handleBoundFormUpdate         = {this.handleBoundFormUpdate}
                        handleSubmit    	          = {this.handleSubmit}
                        fxMultiAddFormExtraConfig     = {this.getFxMultiAddFormExtraConfig()}
                        fxMultiAddFormTitle           = {this.state.fxMultiAddFormTitle}
                        successMsg      	          = {this.props.successMsg}
                        errorMsg                      = {this.props.errorMsg}
                	    user_type      	  	          = {this.props.user_type}
                       

                 />
            </div>
        );
    }
}

/**
 * @DateOfCreation        22 June 2018
 * @ShortDescription      This function is responsible to map store state to props
 * @return                View
 */
function mapStateToProps(state) {
    const { staticData, staticDatafetched } = state.staticData;
    const { isUserNotValid,isInsertDone,labTemplatesFetched, labTemplatesData, submitted, successMsg, errorMsg, patientLaboratoryReportData,dataGridRefresh, pages } = state.patientLaboratoryReport;
    return {
    	staticData,
    	staticDatafetched,
        isInsertDone,
        submitted,
        successMsg,
        labTemplatesFetched, 
        labTemplatesData,
        errorMsg,
        patientLaboratoryReportData,
        dataGridRefresh,
        isUserNotValid,
        pages,
        user_type:state.session.user.user_type
    };
}

const connectedPatientLaboratoryReportContainer = connect(mapStateToProps)(PatientLaboratoryReportContainer);
export { connectedPatientLaboratoryReportContainer as PatientLaboratoryReportContainer };

