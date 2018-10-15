import React from "react";
import { connect } from 'react-redux';
import moment from 'moment';
import { patientSymptomsActions, headerActions } from '../../../../_actions';
import { configConstants } from '../../../../_constants';
import { utilityHelper } from '../../../../_helpers';
import { patientSymptomsValidator } from '../../../../_validator';
import { confirmAlert } from 'react-confirm-alert';
import Loadable from 'react-loadable';
import { Loading } from './../../../../global';
import formConfig from './PatientSymptopmsConfig';

const PatientSymptoms = Loadable({
    loader: () => import('./PatientSymptoms' /* webpackChunkName = "PatientSymptoms" */).then(object => object.PatientSymptoms),
    loading: Loading
});

/**
* @DateOfCreation        06 july 2018
* @ShortDescription      This is responsible to genrate symptom grid
*/
class PatientSymptomsContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        const {patId,visitId} = this.props;
        this.defaultState = {
            patient : {
                symptomsFormShow   : false,
                patientSymptomsDetail :''
            },
            pages               : 0,
            pat_id              : '',
            filtered            : [],
            filterAll           : '',
            symptomFormConfig   : formConfig,
            fxMultiAddFormTitle : ''
        }; 
            this.state                         = this.defaultState;
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
            this.autoCompleteHendler           = this.autoCompleteHendler.bind(this);
            this.autoCompleteListBlank         = this.autoCompleteListBlank.bind(this);
            this.autoCompleteListFill          = this.autoCompleteListFill.bind(this);
            this.submitHopiTestStatus          = this.submitHopiTestStatus.bind(this);
            this.PatientCoughContainerRef      = React.createRef();
            this.PatientExpectorationContainerRef = React.createRef();
            this.PatientHemoptysisContainerRef = React.createRef();
            this.PatientDyspnoeaContainerRef   = React.createRef();
            this.PatientWheezeContainerRef     = React.createRef();
            this.PatientChestPainContainerRef  = React.createRef();
            this.PatientFeverContainerRef      = React.createRef();
            this.PatientWeightLossContainerRef = React.createRef();
            this.PatientOtherSymptomsContainerRef = React.createRef();



    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to final information send
    * @return                Redirect
    */
    submitHopiTestStatus() {
        const { patId, visitId } = this.props;
        let CoughData = this.PatientCoughContainerRef.current.getCoughData();
        let ExpectorationData = this.PatientExpectorationContainerRef.current.getExpectorationData();
        let HemoptysisData = this.PatientHemoptysisContainerRef.current.getHemoptysisData();
        let DyspnoeaData = this.PatientDyspnoeaContainerRef.current.getDyspnoeaData();
        let WheezeData = this.PatientWheezeContainerRef.current.getWheezeData();
        let ChestPainData = this.PatientChestPainContainerRef.current.getChestPainData();
        let FeverData = this.PatientFeverContainerRef.current.getFeverData();
        let WeightLossData = this.PatientWeightLossContainerRef.current.getWeightLossData();
        let OtherSymptomsData = this.PatientOtherSymptomsContainerRef.current.getOtherSymptomsData();
        let extraData = {};
        extraData['pat_id'] = patId;
        extraData['visit_id'] = visitId;
        let finalData = {};
        finalData = utilityHelper.mergeMultipleObject([CoughData, ExpectorationData, HemoptysisData, DyspnoeaData, WheezeData, ChestPainData, FeverData, WeightLossData, OtherSymptomsData, extraData]);
        if (finalData) {
            const { dispatch,patId, visitId } = this.props;
            dispatch(patientSymptomsActions.getPatientHavePatientSubmit(finalData));
            // scroll to div top
            //document.getElementById('laboratoryTestTitle').scrollIntoView(); 
        }
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
                        Header: "Name",
                        headerClassName: 'grid-header',
                        accessor: "symptom_name"
                    },
                    {
                        Header: "Since",
                        accessor: "since_date",
                        className : "dataCellClass",
                        headerClassName: 'grid-header',
                        filterMethod: (filter, row) => {
                            return row[filter.id].includes(filter.value)
                        },
                        Cell: (props) => {return <span>{moment(props.value).format('DD/MM/YYYY')}</span>}
                    },
                    {
                        Header: "Comment",
                        accessor: "comment",
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
                                <div className={this.props.user_type == configConstants.USER_TYPE_PATIENT ? 'hide' : ''}>
                                    <a href="javascript:void(0);" onClick={this.patientSymptomsShowHandle.bind(null, row.original)} className="green btn table-btn">Edit</a>
                                    <a href="javascript:void(0)" className="red btn table-btn"  onClick={this.patientDeleteSymptoms.bind(null,row.original.visit_symptom_id)}>Delete</a>
                                </div>
                            )
                    }
                ];

            if(this.props.user_type == configConstants.USER_TYPE_PATIENT){
                gridCol.splice(3, 1);
            }
            
            const gridData = {
                noDataText : "Present Complaints not found !!",
                columns : gridCol,
                    data                    : this.props.patientSymptomsData.result,
                    minRows                 : 0,
                    defaultPageSize         : 3,
                    className               : "table table-bordered responsive",
                    defaultFilterMethod     : (filter, row) =>String(row[filter.id]) === filter.value,
                    filtered                : this.state.filtered,
                    pages                   : this.props.patientSymptomsData.pages,
                    showPagination          : true,
                    showPaginationTop       : true,
                    showPaginationBottom    : false,
                    showPageSizeOptions     : false,
                    pageSizeOptions         : [3,10,25,50,100],
                    Sorted:true,
                    manual:true, // Identify Server Side Pagination
                    onFetchData : (state, instance) => {
                        this.getPatientSymptomsList(state.page, state.pageSize, state.sorted, state.filtered)
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
                                <h3>Present Complaints</h3>    
                            </div>
                            {this.props.user_type != configConstants.USER_TYPE_PATIENT ?
                                <div className="col-md-6 col-sm-12 text-right">
                                    <button className="btn text-btn green" onClick={this.patientSymptomsShowHandle.bind(null, '')}>Add New</button>
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
            const {symptomsFormShow}  = this.state.patient;
            
            //set edit detail
            var formConfig = this.state.symptomFormConfig;
            var fields = formConfig['fields'];
            const {patId,visitId} = this.props;
            var fromTitle = '';
            if(patientSymptom != ''){
                fromTitle = 'Edit Present Complaints';
                for(var fc in fields){
                    var fieldName = fields[fc]['name'];
                    fields[fc]['value'] = patientSymptom[fieldName];
                }
            }else{
                fromTitle = 'Add Present Complaints';
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
                    symptomsFormShow : true,
                    patientSymptomsDetail:patientSymptom
                },
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
        this.autoCompleteListBlank();
        const {symptomsFormShow}  = this.state.patient;
                 this.setState({
            patient : {
                symptomsFormShow : false
            }
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
            label: 'Yes',
            onClick: () => {
              const { dispatch } = this.props;
              dispatch(patientSymptomsActions.symptomsDelete(visit_symptom_id));
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
     * @DateOfCreation        14 june 2018
     * @ShortDescription      This function is responsible to get Symptoms option data
     * @param                 Event Object
     * @return                Nothing
     */
    componentWillMount(){
        const { dispatch } = this.props;
        // Set state
        const { handlers } = this.state.symptomFormConfig;
        const { symptomFormConfig } = this.state;
        let state           = this.state;
        this.setState({
            ...state,
                symptomFormConfig:{
                    ...symptomFormConfig,
                    handlers:{
                        ...handlers,
                        symptom_name_handle:this.autoCompleteHendler 
                    }
                }
            },function() {
                const { dispatch, patId, visitId} = this.props;
                let patDetails = {};
                patDetails['pat_id'] = patId;
                patDetails['visit_id'] = visitId;
                dispatch(patientSymptomsActions.getPatientHavePatientRecord(patDetails));
            }
        );
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
            dispatch(patientSymptomsActions.getSymptomslist(patId, visitId, 0, 3, '', ''));
        }

        if(props.isInsertDone){
           this.setState(this.defaultState);
           this.autoCompleteListBlank();
            setTimeout(function(){
                dispatch(patientSymptomsActions.resetState());
            },2000);
        }
        
        //set patientSymptomsOptionData
        if(props.fetchSymptomsOptionData && props.patientSymptomsOptionData.length > 0){
            let symptomsOpt = utilityHelper.getPatientSymptomsOption(props.patientSymptomsOptionData);
            this.autoCompleteListFill(symptomsOpt);
        }else if(!props.fetchSymptomsOptionData){
            this.autoCompleteListBlank();
        }

        //reset state
        if(!props.isUpdatedDone && !props.fetchSymptomsOptionData){
            setTimeout(function() {
                dispatch(patientSymptomsActions.resetState());
            },1000);
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
                if(this.props.symptomsType !== undefined){
                    let extraData = {};
                    extraData['symptom_show_type'] = this.props.symptomsType;
                    correctSymptom = utilityHelper.mergeMultipleObject([correctSymptom,extraData]);
                }
                if(correctSymptom.visit_symptom_id == ""){
                    dispatch(patientSymptomsActions.patientSymptomsSubmit(correctSymptom));
                }else{
                    dispatch(patientSymptomsActions.patientSymptomsUpdateSubmit(correctSymptom));
                }
            }
       }
    }

    /**
     * @DateOfCreation        14 june 2018
     * @ShortDescription      This function is responsible to get Symptoms option data by user search
     * @param                 Event Object
     * @return                Nothing
     */
    autoCompleteHendler(value,demo){
        const { dispatch } = this.props;
        if(value!=null && value!=undefined && value!=''){
            let extraData = {}
            extraData['value'] = value;
            dispatch(patientSymptomsActions.getSymptomsOptionlistBySearch(extraData));
        }else{
            this.autoCompleteListBlank();
        }
    }

    /**
     * @DateOfCreation        14 june 2018
     * @ShortDescription      This function is responsible to get Symptoms option list data blank set
     * @param                 Event Object
     * @return                Nothing
     */
    autoCompleteListBlank(){
        const { data } = this.state.symptomFormConfig;
        const { symptomFormConfig } = this.state;
        this.setState({
            symptomFormConfig:{
                ...symptomFormConfig,
                data:{
                    ...data,
                    symptom_name_data:[]
                }
            }
        });
    }

    /**
     * @DateOfCreation        14 june 2018
     * @ShortDescription      This function is responsible to get Symptoms option list data set on state
     * @param                 Event Object
     * @return                Nothing
     */
    autoCompleteListFill(listData){
        const { data } = this.state.symptomFormConfig;
        const { symptomFormConfig } = this.state;
        this.setState({
            symptomFormConfig:{
                ...symptomFormConfig,
                data:{
                    ...data,
                    symptom_name_data:listData
                }
            }
        });
    }

    render() {
        return (
            <div >
                <PatientSymptoms
                        patientEditSymptomsHideHandle = {this.patientEditSymptomsHideHandle}                    
                        symptomSearch                 = {this.symptomSearch}
                        filterAll                     = { this.state.filterAll }
                        gridData                      = {this.getGridConfig()}
                        symptomsFormShow              = {this.state.patient.symptomsFormShow}
                        symptomFormConfig             = {this.state.symptomFormConfig}
                        handleBoundFormUpdate         = {this.handleBoundFormUpdate}
                        handleSubmit                  = {this.handleSubmit}
                        fxMultiAddFormExtraConfig     = {this.getFxMultiAddFormExtraConfig()}
                        fxMultiAddFormTitle           = {this.state.fxMultiAddFormTitle}
                        successMsg                    = {this.props.successMsg}
                        errorMsg                      = {this.props.errorMsg}
                        submitted                     = {this.props.submitted}
                        patId                         = {this.props.patId}
                        visitId                       = {this.props.visitId}
                        generalCheckupShow            = {this.props.generalCheckupShow}
                        user_type                     = {this.props.user_type}
                        PatientCoughContainerRef      = {this.PatientCoughContainerRef}
                        PatientExpectorationContainerRef = {this.PatientExpectorationContainerRef}
                        PatientHemoptysisContainerRef = {this.PatientHemoptysisContainerRef}
                        PatientDyspnoeaContainerRef   = {this.PatientDyspnoeaContainerRef}
                        PatientWheezeContainerRef     = {this.PatientWheezeContainerRef}
                        PatientChestPainContainerRef  = {this.PatientChestPainContainerRef}
                        PatientFeverContainerRef      = {this.PatientFeverContainerRef}
                        PatientWeightLossContainerRef   = {this.PatientWeightLossContainerRef}
                        PatientOtherSymptomsContainerRef= {this.PatientOtherSymptomsContainerRef}
                        historyOfPatientData          = {this.props.historyOfPatientData}
                        fetchHistoryOfPatientData     = {this.props.fetchHistoryOfPatientData}
                        submitHopiTestStatus          = {this.submitHopiTestStatus}
                        isUpdatedDone                 = {this.props.isUpdatedDone}
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
    const { isUserNotValid,isInsertDone, submitted, successMsg, errorMsg, patientSymptomsOptionData,patientSymptomsData,dataGridRefresh, pages,fetchSymptomsOptionData, historyOfPatientData,fetchHistoryOfPatientData,isUpdatedDone} = state.patientSymptoms;
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
        user_type:state.session.user.user_type,
        fetchSymptomsOptionData,
        historyOfPatientData,
        fetchHistoryOfPatientData,
        isUpdatedDone,
    };
}

// Connection with State
const connectedPatientSymptomsContainer = connect(mapStateToProps)(PatientSymptomsContainer);
export { connectedPatientSymptomsContainer as PatientSymptomsContainer };
