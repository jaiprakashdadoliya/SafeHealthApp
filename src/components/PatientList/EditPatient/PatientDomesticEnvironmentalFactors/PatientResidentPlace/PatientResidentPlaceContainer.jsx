import React from "react";
import { connect } from 'react-redux';
import { headerActions, staticDataActions } from '../../../../../_actions';
import { utilityHelper } from '../../../../../_helpers';
import { confirmAlert } from 'react-confirm-alert';
import Loadable from 'react-loadable';
import { Loading } from './../../../../../global';
import formConfig from './PatientResidentPlaceConfig';
import moment from 'moment';
import {patientResidentPlaceActions} from './patientResidentPlaceActions';
import { configConstants } from '../../../../../_constants';

const PatientResidentPlace = Loadable({
    loader: () => import('./PatientResidentPlace' /* webpackChunkName = "PatientResidentPlace" */).then(object => object.PatientResidentPlace),
    loading: Loading
});

class PatientResidentPlaceContainer extends React.Component {
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
            noDataText : "Place of residence not found !!",
            columns : [
                        {
                            Header: "Place of residence",
                            headerClassName: 'grid-header',
                            accessor: "residence_value",
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
                                        <a href="javascript:void(0)" className="red btn table-btn"  onClick={this.deleteData.bind(null,row.original.pr_id)}>Delete</a>
                                    </div>
                                )
                        }
                    ],
                data                    : this.props.patientResidentPlaceData.result,
                minRows                 : 0,
                defaultPageSize         : 5,
                className               : "table table-bordered responsive",
                defaultFilterMethod     : (filter, row) =>String(row[filter.id]) === filter.value,
                filtered                : this.state.filtered,
                pages                   : this.props.patientResidentPlaceData.pages,
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
                        <div className="col-md-6 col-sm-12" id="ResidentPlaceTitle">
                            <h3>Place Of Residence</h3>    
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
        dispatch(patientResidentPlaceActions.resetState());
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
                fromTitle = 'Edit Place of Residence';
                for(var fc in fields){
                    var fieldName = fields[fc]['name'];
                    var valueData = patientDetail[fieldName] === null ? '' : patientDetail[fieldName];
                    fields[fc]['value'] = fields[fc]['type'] ==='customcheckbox' ? [String(valueData)] : valueData;
                }
            }else{
                fromTitle = 'Add New Place of Residence';
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
        dispatch(patientResidentPlaceActions.getTablelist(patId, visitId, page, pageSize, sorted, filtered));
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
    deleteData(pr_id){
        let patientDetail = {};
        patientDetail['pr_id'] = pr_id;
        confirmAlert({
          title: 'Place of Residence',
          message: <div className="alert-message">Are you sure you want to delete this residence?</div>,
          buttons: [
          {
            label: 'Yes',
            onClick: () => {
              const { dispatch } = this.props;
              dispatch(patientResidentPlaceActions.getDeleteRequest(patientDetail));
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
                dispatch(patientResidentPlaceActions.submitRequest(submitData));
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
            dispatch(patientResidentPlaceActions.getTablelist(patId, visitId, 0, 5, '', ''));
        }

        if(props.isInsertDone){
           //this.setState(this.defaultState);
            setTimeout(function(){
                this.editHideHandle();
                dispatch(patientResidentPlaceActions.resetState());
            }.bind(this),500);
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
                            ...data
                            
                        }
                    }
                });
        }
    }
    
    render() {
        return (
            <div >
                <PatientResidentPlace
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
    const { isUserNotValid,isInsertDone, submitted, successMsg, errorMsg, patientResidentPlaceData,dataGridRefresh, pages } = state.patientResidentPlace;
    return {
    	staticData,
    	staticDatafetched,
        isInsertDone,
        submitted,
        successMsg,
        errorMsg,
        patientResidentPlaceData,
        dataGridRefresh,
        isUserNotValid,
        pages,
    };
}

const connectedPatientResidentPlaceContainer = connect(mapStateToProps)(PatientResidentPlaceContainer);
export { connectedPatientResidentPlaceContainer as PatientResidentPlaceContainer };

