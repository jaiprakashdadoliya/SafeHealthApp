import React from "react";
import { connect } from 'react-redux';
import { headerActions, staticDataActions, patientProfileAction } from '../../../../_actions';
import { utilityHelper } from '../../../../_helpers';
import { confirmAlert } from 'react-confirm-alert';
import Loadable from 'react-loadable';
import { Loading } from './../../../../global';
import formConfig from './PatientAllergiesConfig';
import moment from 'moment';
import {patientAllergiesActions} from './patientAllergiesActions';
import {medicationActions} from '../../../PatientNewVisit/Medications/medicationActions';
import { configConstants } from '../../../../_constants';

const PatientAllergies = Loadable({
    loader: () => import('./PatientAllergies' /* webpackChunkName = "PatientMedicalHistory" */).then(object => object.PatientAllergies),
    loading: Loading
});

class PatientAllergiesContainer extends React.Component {
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
            fxMultiAddFormTitle : '',
            historyData : [],
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
            this.submitAllergiesHistory        = this.submitAllergiesHistory.bind(this);
            this.AllergiesHistoryContainerRef  = React.createRef();
            this.getSubAllergiesByParent       = this.getSubAllergiesByParent.bind(this);

  	}

  	/**
    * @DateOfCreation        06 July 2018
    * @ShortDescription      This function is responsible to get grid config
    * @return                JSON Object
    * @param                 Nothing
    */
    getGridConfig(){
        const gridData = {
            noDataText : "Allergies not found !!",
            columns : [
                        {
                            Header: "Allergy Name",
                            headerClassName: 'grid-header',
                            accessor: "allergy_type_value",
                            filterMethod: (filter, row) => {
                                return row[filter.id].includes(filter.value)
                            },

                        },
                        {
                            Header: "Status",
                            accessor: "status_value",
                            className : "dataCellClass",
                            headerClassName: 'grid-header',
                            filterable  : false,
                            Cell: (props) => {return <span>{props.value}</span>}
                        },
                        {
                            Header: "Onset",
                            accessor: "onset",
                            className : "dataCellClass",
                            headerClassName: 'grid-header',
                            filterable  : false,
                            Cell: row => (
                                    <div>
                                        {row.original.onset} {row.original.onset_time_value}
                                    </div>
                                )
                        },
                        {
                            Header: "Added by",
                            accessor: "user_firstname",
                            headerClassName: 'grid-header',
                            filterable  : false,
                            Cell: row => (
                                    <div>
                                        {row.original.user_firstname} {row.original.user_lastname}
                                    </div>
                                )
                        },
                        {
                            Header: "Added At",
                            accessor: "created_at",
                            headerClassName: 'grid-header',
                            filterable  : false,
                            Cell: (props) => {return <span>{moment(props.value).format('DD/MM/YYYY')}</span>}
                        },
                        {
                            Header: "Action",
                            headerClassName: 'grid-header-action',
                            filterable  : false,
                                className :"text-center",
                                Cell: row => (
                                    <div>
                                        <a href="javascript:void(0);" onClick={this.showHandle.bind(null, row.original)} className="green btn table-btn">Edit</a>
                                        <a href="javascript:void(0)" className="red btn table-btn"  onClick={this.deleteData.bind(null,row.original.pat_alg_id)}>Delete</a>
                                    </div>
                                )
                        }
                    ],
                data                    : this.props.patientAllergiesData.result,
                minRows                 : 0,
                defaultPageSize         : 5,
                className               : "table table-bordered responsive",
                defaultFilterMethod     : (filter, row) =>String(row[filter.id]) === filter.value,
                filtered                : this.state.filtered,
                pages                   : this.props.patientAllergiesData.pages,
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
                        <div className="col-md-6 col-sm-12" id="AllergiesTitle">
                            <h3>Allergies</h3>    
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
        dispatch(patientAllergiesActions.resetState());
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
        var formConfig  = this.state.formConfig;
        var data        = this.state.formConfig;
        var fields      = formConfig['fields'];
        var fromTitle   = '';
        let parentAllergyType = '';
        const {patId,visitId} = this.props;
        if(patientDetail != ''){
            fromTitle = 'Edit Allergies';
            for(var fc in fields){
                var fieldName = fields[fc]['name'];
                var valueData = patientDetail[fieldName] === null ? '' : patientDetail[fieldName];
                fields[fc]['value'] = fields[fc]['type'] ==='customcheckbox' ? [String(valueData)] : valueData;
            }

            // SET ALLERGIES
            parentAllergyType = patientDetail['parent_allergy_type'];
            // this.getSubAllergiesByParent(patientDetail['parent_allergy_type']);           
            
        }else{
            fromTitle = 'Add New Allergies';
            for(var fc in fields){
                var fieldName = fields[fc]['name'];
                if(fieldName == 'pat_id'){
                    fields[fc]['value'] = patId;
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

        // SET allergies by patent allergy id
        if(parentAllergyType != ''){
            this.getSubAllergiesByParent(parentAllergyType);
        }
	}

   /**
    * @DateOfCreation        06 July 2018
    * @ShortDescription      This function is responsible to 
    * @return                JSON Object
    * @param                 Nothing
    */
    getTableList(page, pageSize, sorted, filtered){
        const { dispatch, patId, visitId } = this.props;
        dispatch(patientAllergiesActions.getTablelist(patId, visitId, page, pageSize, sorted, filtered));
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
    deleteData(pat_alg_id){
        let patientDetail = {};
        patientDetail['pat_alg_id'] = pat_alg_id;
        confirmAlert({
          title: 'Allergies',
          message: <div className="alert-message">Are you sure you want to delete this Allergy?</div>,
          buttons: [
          {
            label: 'Yes',
            onClick: () => {
              const { dispatch } = this.props;
              dispatch(patientAllergiesActions.getDeleteRequest(patientDetail));
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
     * @DateOfCreation        9 Oct 2018
     * @ShortDescription      This function is responsible to filter child allergies by parent allergies
     * @return                Nothing 
     */
    getSubAllergiesByParent(id){
        let childAllergies = this.props.staticData.allergies.group_child;
        let allergiesList  = utilityHelper.getDataConvertToOptionType(childAllergies[id], 'allergy_name', 'allergy_id');
        
        const { data }       = this.state.formConfig;
        const { formConfig } = this.state;

        this.setState({
            formConfig:{
                ...formConfig,
                data:{
                    ...data,
                    allergy_type_data : allergiesList,
                }
            }
        });
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
                dispatch(patientAllergiesActions.submitRequest(submitData));
            }
        }
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to final information send
    * @return                Redirect
    */
    submitAllergiesHistory() {
        const { patId, visitId } = this.props;
        let AllergiesData = this.AllergiesHistoryContainerRef.current.getAllergiesData();
        let extraData = {};
        extraData['pat_id'] = patId;
        extraData['visit_id'] = visitId;
        let finalData = {};
        finalData = utilityHelper.mergeMultipleObject([AllergiesData, extraData]);
        if (finalData) {
            const { dispatch,patId, visitId } = this.props;
            dispatch(patientAllergiesActions.getAllergiesHistorySubmit(finalData));
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

    componentDidMount(){
        const { dispatch, patId, visitId} = this.props;
        let patDetails = {};
        patDetails['pat_id'] = patId;
        patDetails['visit_id'] = visitId;
        if (!this.props.staticDatafetched) {                
        	dispatch(staticDataActions.getStaticData());
        }
            dispatch(patientAllergiesActions.getAllergiesHistoryRecord(patDetails));
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
            dispatch(patientAllergiesActions.getTablelist(patId, visitId, 0, 5, '', ''));
            dispatch(patientProfileAction.patientProfileRequest(patId));
        }

        //set patientSymptomsOptionData
        if(props.staticDatafetched && this.optionLoad){
            this.optionLoad             = false;
            let onset_time              = utilityHelper.getDataConvertToOptionType(props.staticData.checkup_duration,'value','id');
            let allergiesList           = utilityHelper.getDataConvertToOptionType(props.staticData.allergies.group_parent, 'allergy_name', 'allergy_id');
            let activeInactiveOpt       = utilityHelper.getDataConvertToOptionType(props.staticData.active_inactive_option,'value','id');
            const { data, handlers }    = this.state.formConfig;
            const { formConfig }        = this.state;
            this.setState({
                    formConfig:{
                        ...formConfig,
                        data:{
                            ...data,
                            onset_time_data          : onset_time,
                            parent_allergy_type_data : allergiesList,
                            status_data              : activeInactiveOpt
                        },
                        handlers:{
                            ...handlers,
                            parent_allergy_type_handle : this.getSubAllergiesByParent,
                        }
                    }
                });
        }

        if(props.isInsertDone){
           //this.setState(this.defaultState);
            setTimeout(function(){
                this.editHideHandle();
                dispatch(patientAllergiesActions.resetState());
            }.bind(this),1000);
        }

        if(props.isUpdatedDone){
            setTimeout(function(){
                dispatch(patientAllergiesActions.resetState());
            }.bind(this),1000);
        }

        const { historyData } = this.state;

        if(props.historyData){
            this.setState({
                ...historyData,
                historyData: props.historyData
            });
        }
    }
    
    render() {
        return (
            <div >
                <PatientAllergies
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
                        isUpdatedDone                 = {this.props.isUpdatedDone}
                        errorMsg                      = {this.props.errorMsg}
                	    submitted      	  	          = {this.props.submitted}
                        AllergiesHistoryContainerRef  = {this.AllergiesHistoryContainerRef}
                        historyData                   = {this.state.historyData}
                        submitAllergiesHistory        = {this.submitAllergiesHistory}

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
    const { isUserNotValid,isInsertDone, isUpdatedDone, submitted, successMsg, errorMsg, patientAllergiesData,dataGridRefresh, pages,historyData } = state.patientAllergies;
    return {
        staticData,
    	staticDatafetched,
        isInsertDone,
        isUpdatedDone,
        submitted,
        successMsg,
        errorMsg,
        patientAllergiesData,
        dataGridRefresh,
        isUserNotValid,
        pages,
        historyData
    };
}

const connectedPatientAllergiesContainer = connect(mapStateToProps)(PatientAllergiesContainer);
export { connectedPatientAllergiesContainer as PatientAllergiesContainer };

