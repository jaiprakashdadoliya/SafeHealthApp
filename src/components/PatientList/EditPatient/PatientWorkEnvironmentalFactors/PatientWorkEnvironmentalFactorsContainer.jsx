import React from "react";
import { connect } from 'react-redux';
import { headerActions, staticDataActions } from '../../../../_actions';
import { utilityHelper } from '../../../../_helpers';
import { confirmAlert } from 'react-confirm-alert';
import Loadable from 'react-loadable';
import { Loading } from './../../../../global';
import formConfig from './PatientWorkEnvironmentalFactorsConfig';
import {patientWorkEnvironmentActions} from './patientWorkEnvironmentActions';
import { configConstants } from '../../../../_constants';

const PatientWorkEnvironmentalFactors = Loadable({
    loader: () => import('./PatientWorkEnvironmentalFactors' /* webpackChunkName = "PatientWorkEnvironmentalFactors" */).then(object => object.PatientWorkEnvironmentalFactors),
    loading: Loading
});

class PatientWorkEnvironmentalFactorsContainer extends React.Component {
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

  	}

  	/**
    * @DateOfCreation        06 July 2018
    * @ShortDescription      This function is responsible to get grid config
    * @return                JSON Object
    * @param                 Nothing
    */
    getGridConfig(){
        const gridData = {
            noDataText : "Work Environmental Factors not found !!",
            columns : [
                        {
                            Header: "Occupation",
                            headerClassName: 'grid-header',
                            accessor: "wef_occupation",
                            filterMethod: (filter, row) => {
                                return row[filter.id].includes(filter.value)
                            },
                        },
                        {
                            Header: "Years worked (from-to)",
                            accessor: "wef_worked_from_month",
                            className : "dataCellClass",
                            headerClassName: 'grid-header',
                            filterable  : false,
                            Cell: row => (
                            	<div>
                                   {row.original.wef_worked_from_month}/{row.original.wef_worked_from_year} - {row.original.wef_worked_to_month}/{row.original.wef_worked_to_year}
                                </div>
                                )
                        },
                        {
                            Header: "Exposures",
                            accessor: "wef_exposures",
                            headerClassName: 'grid-header',
                            filterMethod: (filter, row) => {
                                return row[filter.id].includes(filter.value)
                            },
                        },
                        {
                            Header: "Action",
                            headerClassName: 'grid-header-action',
                            filterable  : false,
                                className :"text-center",
                                Cell: row => (
                                    <div>
                                        <a href="javascript:void(0);" onClick={this.showHandle.bind(null, row.original)} className="green btn table-btn">Edit</a>
                                        <a href="javascript:void(0)" className="red btn table-btn"  onClick={this.deleteData.bind(null,row.original.wef_id)}>Delete</a>
                                    </div>
                                )
                        }
                    ],
                data                    : this.props.patientWorkEnvironmentData.result,
                minRows                 : 0,
                defaultPageSize         : 5,
                className               : "table table-bordered responsive",
                defaultFilterMethod     : (filter, row) =>String(row[filter.id]) === filter.value,
                filtered                : this.state.filtered,
                pages                   : this.props.patientWorkEnvironmentData.pages,
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
                            <h3>Work Environment Factors</h3>    
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
        dispatch(patientWorkEnvironmentActions.resetState());
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
                fromTitle = 'Edit Work Environmental';
                for(var fc in fields){
                    var fieldName = fields[fc]['name'];
                    var valueData = patientDetail[fieldName] === null ? '' : patientDetail[fieldName];
                    fields[fc]['value'] = fields[fc]['type'] ==='customcheckbox' ? [String(valueData)] : valueData;
                }
            }else{
                fromTitle = 'Add New Work Environmental';
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
        dispatch(patientWorkEnvironmentActions.getTablelist(patId, visitId, page, pageSize, sorted, filtered));
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
    deleteData(wef_id){
        confirmAlert({
          title: 'Work Environment',
          message: <div className="alert-message">Are you sure you want to delete this work environment?</div>,
          buttons: [
          {
            label: 'Yes',
            onClick: () => {
              const { dispatch } = this.props;
              dispatch(patientWorkEnvironmentActions.getDeleteRequest(wef_id));
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
                dispatch(patientWorkEnvironmentActions.submitRequest(submitData));
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
            dispatch(patientWorkEnvironmentActions.getTablelist(patId, visitId, 0, 5, '', ''));
        }

        if(props.isInsertDone){
           //this.setState(this.defaultState);
            setTimeout(function(){
                dispatch(patientWorkEnvironmentActions.resetState());
                this.editHideHandle();
            }.bind(this),500);
        }
        
        //set patientSymptomsOptionData
        if(props.staticDatafetched && this.optionLoad){
        	this.optionLoad = false;
            let monthOpt = utilityHelper.getDataConvertToOptionType(props.staticData.month,'value','id');
            let yesNoOpt = utilityHelper.getDataConvertToOptionType(props.staticData.yes_no_option,'value','id');
            let yearOpt = utilityHelper.getDataConvertToOptionType(props.staticData.work_environment_year_option,'value','id');
            const { data } = this.state.formConfig;
            const { formConfig } = this.state;
            this.setState({
                    formConfig:{
                        ...formConfig,
                        data:{
                            ...data,
                            wef_worked_from_month_data:monthOpt,
                            wef_worked_to_month_data:monthOpt,
                            wef_is_working_location_outside_data:yesNoOpt,
                            wef_is_smoky_dust_data:yesNoOpt,
                            wef_use_of_protective_masks_data:yesNoOpt,
                            wef_worked_from_year_data:yearOpt,
                            wef_worked_to_year_data:yearOpt,
                        }
                    }
                });
        }
    }
    
    render() {
        return (
            <div >
                <PatientWorkEnvironmentalFactors
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
    const { isUserNotValid,isInsertDone, submitted, successMsg, errorMsg, patientWorkEnvironmentData,dataGridRefresh, pages } = state.patientWorkEnvironment;
    return {
    	staticData,
    	staticDatafetched,
        isInsertDone,
        submitted,
        successMsg,
        errorMsg,
        patientWorkEnvironmentData,
        dataGridRefresh,
        isUserNotValid,
        pages,
    };
}

const connectedPatientWorkEnvironmentalFactorsContainer = connect(mapStateToProps)(PatientWorkEnvironmentalFactorsContainer);
export { connectedPatientWorkEnvironmentalFactorsContainer as PatientWorkEnvironmentalFactorsContainer };

