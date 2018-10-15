import React from "react";
import { connect } from 'react-redux';
import { headerActions, staticDataActions } from '../../../../_actions';
import { utilityHelper } from '../../../../_helpers';
import { confirmAlert } from 'react-confirm-alert';
import Loadable from 'react-loadable';
import { Loading } from './../../../../global';
import formConfig from './PatientMedicalHistoryConfig';
import moment from 'moment';
import {patientMedicalHistoryActions} from './patientMedicalHistoryActions';
import {medicationActions} from '../../../PatientNewVisit/Medications/medicationActions';
import { configConstants } from '../../../../_constants';

const PatientMedicalHistory = Loadable({
    loader: () => import('./PatientMedicalHistory' /* webpackChunkName = "PatientMedicalHistory" */).then(object => object.PatientMedicalHistory),
    loading: Loading
});

class PatientMedicalHistoryContainer extends React.Component {
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
            formConfig   : formConfig,
            fxMultiAddFormTitle : ''
        }; 
	    this.state                         = this.defaultState;
        this.boundForm                     = undefined;
	    this.showHandle     			   = this.showHandle.bind(this);
	    this.editHideHandle 			   = this.editHideHandle.bind(this);
        this.deleteData         		   = this.deleteData.bind(this);
    
        this.handleSubmit                  = this.handleSubmit.bind(this);
        this.tableSearch                   = this.tableSearch.bind(this);
        this.getTableList        		   = this.getTableList.bind(this);
        this.getGridConfig                 = this.getGridConfig.bind(this);
        this.handleBoundFormUpdate         = this.handleBoundFormUpdate.bind(this);
        this.getFxMultiAddFormExtraConfig  = this.getFxMultiAddFormExtraConfig.bind(this);
        this.getMedicineDataByMedicine     = this.getMedicineDataByMedicine.bind(this);
        this.medicineAutoCompleteHandler   = this.medicineAutoCompleteHandler.bind(this);
        this.searchMedicine                = this.searchMedicine.bind(this);
        this.autoCompleteListBlank         = this.autoCompleteListBlank.bind(this);
        this.setUnitFetch                  = false;
  	}

  	/**
    * @DateOfCreation        06 July 2018
    * @ShortDescription      This function is responsible to get grid config
    * @return                JSON Object
    * @param                 Nothing
    */
    getGridConfig(){
        const gridData = {
            noDataText : "Medicine history not found !!",
            columns : [
                        {
                            Header: "Medicine Name",
                            headerClassName: 'grid-header',
                            accessor: "medicine_name",
                            filterMethod: (filter, row) => {
                                return row[filter.id].includes(filter.value)
                            },

                        },
                        {
                            Header: "Start Date",
                            accessor: "medicine_start_date",
                            className : "dataCellClass",
                            headerClassName: 'grid-header',
                            filterable  : false,
                            Cell: (props) => {return <span>{moment(props.value).format('DD/MM/YYYY')}</span>}
                        },
                        {
                            Header: "End Date",
                            accessor: "medicine_end_date",
                            className : "dataCellClass",
                            headerClassName: 'grid-header',
                            filterable  : false,
                            Cell: (props) => {return <span>{ props.value != '' ? moment(props.value).format('DD/MM/YYYY') : ''}</span>}
                        },
                        {
                            Header: "Dose",
                            accessor: "medicine_dose",
                            headerClassName: 'grid-header',
                            filterable  : false,
                            Cell: row => (
                                    <div>
                                        {row.original.medicine_dose} {row.original.drug_dose_unit_name}
                                    </div>
                                )
                        },
                        {
                            Header: "Action",
                            headerClassName: 'grid-header-action',
                            filterable  : false,
                                className :"text-center",
                                Cell: row => (
                                    <div>
                                        <a href="javascript:void(0);" onClick={this.showHandle.bind(null, row.original)} className="green btn table-btn">Edit</a>
                                        <a href="javascript:void(0)" className="red btn table-btn"  onClick={this.deleteData.bind(null,row.original.pmh_id)}>Delete</a>
                                    </div>
                                )
                        }
                    ],
                data                    : this.props.patientMedicalHistoryData.result,
                minRows                 : 0,
                defaultPageSize         : 5,
                className               : "table table-bordered responsive",
                defaultFilterMethod     : (filter, row) =>String(row[filter.id]) === filter.value,
                filtered                : this.state.filtered,
                pages                   : this.props.patientMedicalHistoryData.pages,
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
                            <h3>Medication History</h3>    
                        </div>
                        <div className="col-md-6 col-sm-12 text-right">
                            <button className="btn text-btn green" onClick={this.showHandle.bind(null, '')}>Add New</button>
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
        dispatch(patientMedicalHistoryActions.resetState());
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
                fromTitle = 'Edit Medicine History';
                for(var fc in fields){
                    var fieldName = fields[fc]['name'];
                    var valueData = patientDetail[fieldName] === null ? '' : patientDetail[fieldName];
                    fields[fc]['value'] = fields[fc]['type'] ==='customcheckbox' ? [String(valueData)] : valueData;
                }
            }else{
                fromTitle = 'Add New Medicine History';
                for(var fc in fields){
                    var fieldName = fields[fc]['name'];
                    if(fieldName == 'pat_id'){
                        fields[fc]['value'] = patId;
                    }else if(fieldName == 'visit_id'){
                        fields[fc]['value'] = visitId;
                    }else{
                        fields[fc]['value'] = fields[fc]['type'] ==='customcheckbox' ? [''] : '';
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
        dispatch(patientMedicalHistoryActions.getTablelist(patId, visitId, page, pageSize, sorted, filtered));
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
    deleteData(pmh_id){
        let patientDetail = {};
        patientDetail['pmh_id'] = pmh_id;
        confirmAlert({
          title: 'Medicine History',
          message: <div className="alert-message">Are you sure you want to delete this medicine history?</div>,
          buttons: [
          {
            label: 'Yes',
            onClick: () => {
              const { dispatch } = this.props;
              dispatch(patientMedicalHistoryActions.getDeleteRequest(patientDetail));
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
                dispatch(patientMedicalHistoryActions.submitRequest(submitData));
            }
       }
    }

    /**
     * @DateOfCreation        26 Sept 2018
     * @ShortDescription      This function is responsible to call medicine details API
     * @return                Nothing
     */
    getMedicineDataByMedicine(medicineId, medicineName){
        if(medicineId){
            const { dispatch } = this.props;
       
            let extraData               = {};
            extraData['medicine_id']    = medicineId;                    
            let medicineData = utilityHelper.mergeMultipleObject([extraData]);
            dispatch(medicationActions.getMedicineDataAction(medicineData)); 
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
        dispatch(medicationActions.getMedicineList()); 
        dispatch(medicationActions.getMedicinelistBySearch({'medicine_name' : ''}));

        // Set state
        const { handlers } = this.state.formConfig;
        const { formConfig } = this.state;
        this.setState({
            formConfig:{
                ...formConfig,
                handlers:{
                    ...handlers,
                    medicine_name_runtime_multiple_handle:this.getMedicineDataByMedicine,
                    medicine_name_handle:this.medicineAutoCompleteHandler
                }
            }
        });
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
            dispatch(patientMedicalHistoryActions.getTablelist(patId, visitId, 0, 5, '', ''));
        }

        // Medicine List by search
        if(props.medicineDataBySearch){
            const { data } = this.state.formConfig;
            const { formConfig } = this.state;
            let medicineOptionData = utilityHelper.getMedicineOption(props.medicineDataBySearch);
                        
            this.setState({
                formConfig:{
                    ...formConfig,
                    data:{
                        ...data,
                        medicine_name_data:medicineOptionData
                    }
                }
            }, function(){
                this.setUnitFetch = true;
            });
        }

        if(props.isInsertDone){
           //this.setState(this.defaultState);
            setTimeout(function(){
                this.editHideHandle();
                dispatch(patientMedicalHistoryActions.resetState());
            }.bind(this),1500);
        }
        
        const { data } = this.state.formConfig;
        const { formConfig } = this.state;
        var fields = formConfig['fields'];
        if(props.isSearchDone){

            // Set medicine details auto fill in medicine popup
            if(props.medicineData != '' ){
                
                var fieldVal = [];
                if(props.medicineData.medicine_data != ''){
                    for(var fc in fields){
                        var fieldName = fields[fc]['name'];

                        if(fieldName == 'medicine_instractions'){
                            fields[fc]['value'] = props.medicineData.medicine_data[fieldName];
                            fieldVal = fields[fc]['value'];
                        } 

                        if(fieldName == 'medicine_dose_unit'){
                            fields[fc]['value'] = props.medicineData.medicine_data['drug_dose_unit_id'];
                            this.boundForm.setFieldData({medicine_dose_unit: fields[fc]['value']});
                        } 
                    }

                    if(fieldVal !='' || fieldVal != null){
                        fieldVal = fieldVal!='' && fieldVal!=null ? fieldVal :[];
                        
                       if(this.boundForm !=null && typeof this.boundForm == 'object'){
                            this.boundForm.setFieldData({medicine_instractions: fieldVal});                        
                        }
                    }
                }else{
                    for(var fc in fields){
                        var fieldName = fields[fc]['name'];

                        if(fieldName == 'medicine_instractions'){
                            fields[fc]['value'] = [];
                        } 

                        if(fieldName == 'medicine_dose_unit'){
                            fields[fc]['value'] = ''; 
                            this.boundForm.setFieldData({medicine_dose_unit: ''}); 
                        }
                    }
                    
                    if((fieldVal !='' || fieldVal != null) && props.medicationEditData ==''){
                        this.boundForm.setFieldData({medicine_instractions: []});
                    }
                }
                this.isReload = false;
            }
        }

        // Medicine Unit
        if(props.isUnitFetched && this.setUnitFetch){
            const { data } = this.state.formConfig;
            const { formConfig } = this.state;
            let drugTypeOptions = utilityHelper.getDataConvertToOptionType(props.medicineList.dose_unit,'drug_dose_unit_name','drug_dose_unit_id');
            this.setState({
                formConfig:{
                    ...formConfig,
                    data:{
                        ...data,
                        medicine_dose_unit_data:drugTypeOptions                        
                    }
                }
            }, function(){
                this.setUnitFetch = false;
            });
        }
    }

    /**
     * @DateOfCreation        26 Sept 2018
     * @ShortDescription      This function is responsible to get medicine name by search
     * @return                Nothing
     */
    medicineAutoCompleteHandler(value, fiendName){
        const { dispatch } = this.props;
        if(value!=null && value!=undefined && value!=''){
            this.searchMedicine(value);
        }else{
            this.autoCompleteListBlank();
        }
    }

    /**
     * @DateOfCreation        26 Sept 2018
     * @ShortDescription      This function is responsible to get medicine option list data blank set
     * @param                 Event Object
     * @return                Nothing
     */
    autoCompleteListBlank(){
        const { data } = this.state.formConfig;
        const { formConfig } = this.state;        
    }

    /**
     * @DateOfCreation        26 Sept 2018
     * @ShortDescription      This function is responsible to handle search medication data
     * @return                Redirect
     */
    searchMedicine(medicine){
        if(typeof medicine == 'object'){
            medicine = medicine.target.value;
        }

        const { dispatch } = this.props;
        let extraData = {}
        extraData['medicine_name'] = medicine;
        dispatch(medicationActions.getMedicinelistBySearch(extraData));      
    }    
    
    render() {
        return (
            <div >
                <PatientMedicalHistory
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
            	    submitted      	  	          = {this.props.submitted}
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
    const { isUserNotValid,isInsertDone, submitted, successMsg, errorMsg, patientMedicalHistoryData,dataGridRefresh, pages } = state.patientMedicalHistory;
    const { medicineList, medicineDataBySearch, isSearchDone, medicineData, isUnitFetched } = state.Medications;
    return {
        medicineList,
        medicineDataBySearch, 
        isSearchDone, 
        medicineData,
    	staticData,
    	staticDatafetched,
        isInsertDone,
        submitted,
        successMsg,
        errorMsg,
        patientMedicalHistoryData,
        dataGridRefresh,
        isUserNotValid,
        pages,
        isUnitFetched
    };
}

const connectedPatientMedicalHistoryContainer = connect(mapStateToProps)(PatientMedicalHistoryContainer);
export { connectedPatientMedicalHistoryContainer as PatientMedicalHistoryContainer };

