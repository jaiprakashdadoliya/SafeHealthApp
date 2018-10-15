import React from "react";
import { connect } from 'react-redux';
import moment from 'moment';
import { headerActions } from '../../../../_actions';
import { configConstants } from '../../../../_constants';
import { utilityHelper } from '../../../../_helpers';
import { patientSymptomsValidator } from '../../../../_validator';
import { confirmAlert } from 'react-confirm-alert';
import Loadable from 'react-loadable';
import { Loading } from './../../../../global';
import vaccinationHistoryFormConfig from './PatientVaccinationHistoryConfig';
import {patientVaccinationHistoryActions} from './patientVaccinationHistoryActions';

const PatientVaccinationHistory = Loadable({
    loader: () => import('./PatientVaccinationHistory' /* webpackChunkName = "PatientVaccinationHistory" */).then(object => object.PatientVaccinationHistory),
    loading: Loading
});

/**
* @DateOfCreation        21 Sept 2018
* @ShortDescription      This is responsible to generate vaccination history grid
*/
class PatientVaccinationHistoryContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        const {patId,visitId} = this.props;
        this.defaultState = {
            patient : {
                vaccinationHistoryFormShow   : false,
                patientVaccinationHistoryDetail :''
            },
            pages               : 0,
            pat_id              : '',
            filtered            : [],
            filterAll           : '',
            fxMultiAddFormTitle : '',
            vaccinationHistoryFormConfig : vaccinationHistoryFormConfig,
        }; 

        this.state                         = this.defaultState;
        this.boundForm                     = undefined;
        this.handleBoundFormUpdate         = this.handleBoundFormUpdate.bind(this);
        this.handleSubmit                  = this.handleSubmit.bind(this);
        
        this.patientVaccinationHistoryShowHandle     = this.patientVaccinationHistoryShowHandle.bind(this);
        this.patientEditVaccinationHistoryHideHandle = this.patientEditVaccinationHistoryHideHandle.bind(this);
        this.patientDeleteVaccinationHistory         = this.patientDeleteVaccinationHistory.bind(this);
    
        this.getVaccinationHistoryList     = this.getVaccinationHistoryList.bind(this);
        this.getGridConfig                 = this.getGridConfig.bind(this);
        this.getFxMultiAddFormExtraConfig  = this.getFxMultiAddFormExtraConfig.bind(this);
    }

    /**
    * @DateOfCreation        21 Sept 2018
    * @ShortDescription      This function is responsible to get grid config
    * @return                JSON Object
    * @param                 Nothing
    */
    getGridConfig(){
        var gridCol = [
            {
                Header: "Name of Vaccine",
                headerClassName: 'grid-header',
                accessor: "vaccine_name"
            },
            {
                Header: "Date of Vaccination",
                accessor: "vaccine_date",
                className : "dataCellClass",
                headerClassName: 'grid-header',
                filterMethod: (filter, row) => {
                    return row[filter.id].includes(filter.value)
                },
                Cell: (props) => {return <span>{moment(props.value).format('DD/MM/YYYY')}</span>}
            },
            {
                Header: "Action",
                headerClassName: 'grid-header-action',
                filterable  : false,
                    className :"text-center",
                    Cell: row => (
                        <div className={this.props.user_type == configConstants.USER_TYPE_PATIENT ? 'hide' : ''}>
                            <a href="javascript:void(0);" onClick={this.patientVaccinationHistoryShowHandle.bind(null, row.original)} className="green btn table-btn">Edit</a>
                            <a href="javascript:void(0)" className="red btn table-btn"  onClick={this.patientDeleteVaccinationHistory.bind(null,row.original.vaccination_id)}>Delete</a>
                        </div>
                    )
            }
        ];

        if(this.props.user_type == configConstants.USER_TYPE_PATIENT){
            gridCol.splice(2, 1);
        }
            
        const gridData = {
            noDataText : "Vaccination History not found !!",
            columns : gridCol,
                data                    : this.props.patientVaccinationHistoryData.result,
                minRows                 : 0,
                defaultPageSize         : 10,
                className               : "table table-bordered responsive",
                defaultFilterMethod     : (filter, row) =>String(row[filter.id]) === filter.value,
                filtered                : this.state.filtered,
                pages                   : this.props.patientVaccinationHistoryData.pages,
                showPagination          : true,
                showPaginationTop       : true,
                showPaginationBottom    : false,
                showPageSizeOptions     : false,
                pageSizeOptions         : [10,25,50,100],
                Sorted:true,
                manual:true, // Identify Server Side Pagination
                onFetchData : (state, instance) => {
                    this.getVaccinationHistoryList(state.page, state.pageSize, state.sorted, state.filtered)
                }
        }
        return gridData;
    }
        
    /**
    * @DateOfCreation        21 Sept 2018
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
                            <h3>Vaccination History</h3>    
                        </div>
                        {this.props.user_type != configConstants.USER_TYPE_PATIENT ?
                            <div className="col-md-6 col-sm-12 text-right">
                                <button className="btn text-btn green" onClick={this.patientVaccinationHistoryShowHandle.bind(null, '')}>Add New</button>
                            </div> : '' }

                    </div>
                )
            },
            cssClasses:{},
            formSaveRequestBtnText: configConstants.BUTTON_PLEASE_WAIT
        }
        
        return extraConfig;
    }
        
    /**
    * @DateOfCreation        21 Sept 2018
    * @ShortDescription      This function is responsible to update FxForm ref object
    * @return                JSON Object
    * @param                 Nothing
    */
    handleBoundFormUpdate(data){
        this.boundForm = data;
    }

    /**
     * @DateOfCreation        21 Sept 2018
     * @ShortDescription      This function is responsible show edit modal
     * @param                 Event Object
     * @return                Nothing
     */
    patientVaccinationHistoryShowHandle(patientVaccinationHistory) { 
        const {vaccinationHistoryFormShow}  = this.state.patient;
        
        //set edit detail
        var vaccinationHistory = this.state.vaccinationHistoryFormConfig;
        var fields = vaccinationHistory['fields'];
        const {patId,visitId} = this.props;
        var fromTitle = '';
        if(patientVaccinationHistory != ''){
            fromTitle = 'Edit Vaccination History';
            for(var fc in fields){
                var fieldName = fields[fc]['name'];
                fields[fc]['value'] = patientVaccinationHistory[fieldName];
            }
        }else{
            fromTitle = 'Add Vaccination History';
            for(var fc in fields){
                var fieldName = fields[fc]['name'];
                if(fieldName == 'pat_id'){
                    fields[fc]['value'] = patId;
                }else{
                    fields[fc]['value'] = '';
                }                
            }
        }
        
        this.setState({
            patient : {
                vaccinationHistoryFormShow : true,
                patientVaccinationHistoryDetail:patientVaccinationHistory
            },
            vaccinationHistoryFormConfig : vaccinationHistory,
            fxMultiAddFormTitle          : fromTitle
        });
    }
        
    /**
     * @DateOfCreation        21 Sept 2018
     * @ShortDescription      This function is responsible hide edit modal
     * @param                 Event Object
     * @return                Nothing
     */
    patientEditVaccinationHistoryHideHandle() {
        const {dispatch} = this.props;
        dispatch(patientVaccinationHistoryActions.resetState());
        const {vaccinationHistoryFormShow}  = this.state.patient;
        this.setState({
            patient : {
                vaccinationHistoryFormShow : false
            }
        });
    }

    /**
     * @DateOfCreation        21 Sept 2018
     * @ShortDescription      This function is responsible delete Vaccination History confirm alert
     * @param                 Event Object
     * @return                Nothing
     */
    patientDeleteVaccinationHistory(vaccination_history_id){
        confirmAlert({
          title: 'Vaccination History',
          message: 'Are you sure you want to delete this visit Vaccination History?',
          buttons: [
          {
            label: 'Yes',
            onClick: () => {
              const { dispatch } = this.props;
              dispatch(patientVaccinationHistoryActions.deleteVaccinationHistory(vaccination_history_id));
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
     * @DateOfCreation        21 Sept 2018
     * @ShortDescription      This function is responsible to get vaccination history option data
     * @param                 Event Object
     * @return                Nothing
     */
    componentWillMount(){
        const { dispatch } = this.props;
    }

    /**
    * @DateOfCreation        21 Sept 2018
    * @ShortDescription      This function is responsible to redirect unauthorize users
    * @return                Redirect
    */
    componentDidUpdate(){
        const { dispatch }  = this.props;
        if(this.props.isUserNotValid){
           dispatch(headerActions.logout());
        }
    }

    /**
    * @DateOfCreation        21 Sept 2018
    * @ShortDescription      This function is responsible to props update hook event
    * @return                Redirect
    */
    componentWillReceiveProps(props) {
        const { dispatch, patId, visitId } = this.props;
        if(props.dataGridRefresh){
            dispatch(patientVaccinationHistoryActions.getVaccinationHistoryList(patId, visitId, 0, 10, '', ''));
        }

        if(props.isInsertDone){
           this.setState(this.defaultState);
            setTimeout(function(){
                dispatch(patientVaccinationHistoryActions.resetState());
            },2000);
        }

        //reset state
        if(!props.isUpdatedDone){
            setTimeout(function() {
                dispatch(patientVaccinationHistoryActions.resetState());
            },1000);
        }
    }

    /**
    * @DateOfCreation        21 Sept 2018
    * @ShortDescription      This function is responsible to get vaccination history list
    * @return                JSON Object
    * @param                 Nothing
    */
    getVaccinationHistoryList(page, pageSize, sorted, filtered){
        const { dispatch, patId, visitId } = this.props;
        dispatch(patientVaccinationHistoryActions.getVaccinationHistoryList(patId, visitId, page, pageSize, sorted, filtered));
    }

    /**
     * @DateOfCreation        21 Sept 2018
     * @ShortDescription      This function is responsible to handle submit form data
     * @param                 Event Object
     * @return                Nothing
     */
    handleSubmit() {
        if(this.boundForm){
            const { dispatch, patId, visitId } = this.props;
            let data = this.boundForm.getData();
            
            let extraData = {};
            extraData['pat_id']     = patId;
            extraData['visit_id']   = visitId;
            
            if(data){
                dispatch(patientVaccinationHistoryActions.vaccinationHistorySubmit(utilityHelper.mergeMultipleObject([data, extraData])));                
            }            
       }
    }

    render() {
        return (
            <div >
                <PatientVaccinationHistory
                        patientEditVaccinationHistoryHideHandle = {this.patientEditVaccinationHistoryHideHandle}                    
                        filterAll                     = { this.state.filterAll }
                        gridData                      = {this.getGridConfig()}
                        vaccinationHistoryFormShow    = {this.state.patient.vaccinationHistoryFormShow}
                        symptomFormConfig             = {this.state.symptomFormConfig}
                        handleBoundFormUpdate         = {this.handleBoundFormUpdate}
                        handleSubmit                  = {this.handleSubmit}
                        fxMultiAddFormExtraConfig     = {this.getFxMultiAddFormExtraConfig()}
                        fxMultiAddFormTitle           = {this.state.fxMultiAddFormTitle}
                        vaccinationHistoryFormConfig  = {this.state.vaccinationHistoryFormConfig}
                        successMsg                    = {this.props.successMsg}
                        errorMsg                      = {this.props.errorMsg}
                        submitted                     = {this.props.submitted}
                        patId                         = {this.props.patId}
                        visitId                       = {this.props.visitId}
                        generalCheckupShow            = {this.props.generalCheckupShow}
                        user_type                     = {this.props.user_type}
                />
            </div>
        );
    }
}

/**
 * @DateOfCreation        21 Sept 2018
 * @ShortDescription      This function is responsible to connect store to props
 * @return                View
 */
function mapStateToProps(state) {
    const { isUserNotValid, isInsertDone, submitted, successMsg, errorMsg, patientVaccinationHistoryData, dataGridRefresh, pages, sendingRequest} = state.patientVaccinationHistory;
    return {
        isInsertDone,
        submitted,
        successMsg,
        errorMsg,
        patientVaccinationHistoryData,
        dataGridRefresh,
        isUserNotValid,
        pages,
        user_type:state.session.user.user_type
    };
}

// Connection with State
const connectedPatientVaccinationHistoryContainer = connect(mapStateToProps)(PatientVaccinationHistoryContainer);
export { connectedPatientVaccinationHistoryContainer as PatientVaccinationHistoryContainer };
