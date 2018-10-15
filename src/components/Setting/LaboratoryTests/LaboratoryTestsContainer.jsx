import React from "react";
import { connect } from 'react-redux';
import { headerActions, staticDataActions } from '../../../_actions';
import { configConstants } from '../../../_constants';
import { utilityHelper } from '../../../_helpers';
import { confirmAlert } from 'react-confirm-alert';
import Loadable from 'react-loadable';
import { Loading } from '../../../global';
import formConfig from './LaboratoryTestsConfig';
import moment from 'moment';
import {laboratoryTestsActions} from './laboratoryTestsActions';

const LaboratoryTests = Loadable({
    loader: () => import('./LaboratoryTests' /* webpackChunkName = "LaboratoryTests" */).then(object => object.LaboratoryTests),
    loading: Loading
});

class LaboratoryTestsContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.optionLoad   = true;
        this.optionLoad   = true;
        this.defaultState = {
            formDetail          :'',
            formShow            : false,
            pages               : 0,
            pat_id              : '',
            filtered            : [],
            filterAll           : '',
            formConfig   : formConfig,
            fxMultiAddFormTitle : ''
        }; 
            this.state                         = this.defaultState;
            this.boundForm                     = undefined;
            this.showHandle                    = this.showHandle.bind(this);
            this.editHideHandle                = this.editHideHandle.bind(this);
            this.deleteData                    = this.deleteData.bind(this);
        
            this.handleSubmit                  = this.handleSubmit.bind(this);
            this.tableSearch                   = this.tableSearch.bind(this);
            this.getTableList                  = this.getTableList.bind(this);
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
        var gridCol = [
                {
                    Header: "Laboratory Test Name",
                    headerClassName: 'grid-header',
                    accessor: "mlt_name",
                    filterMethod: (filter, row) => {
                        return row[filter.id].includes(filter.value)
                    },

                },
                {
                    Header: "Action",
                    headerClassName: 'grid-header-action text-center',
                    filterable  : false,
                    className :"text-center",
                    Cell: row => (
                        <div>
                            <a href="javascript:void(0)" className="btn table-btn green"  onClick={this.showHandle.bind(null, row.original)}>Edit</a>
                            <a href="javascript:void(0)" className="red btn table-btn"  onClick={this.deleteData.bind(null,row.original.lab_test_relation_id)}>Delete</a>
                        </div>
                    )
                }
            ];

        if(this.props.user_type == configConstants.USER_TYPE_PATIENT){
            gridCol.splice(3, 1);
        }

        const gridData = {
            noDataText : "Laboratory Tests not found !!",
            columns : gridCol,
            data                    : this.props.laboratoryTestsData.result,
            minRows                 : 0,
            defaultPageSize         : 5,
            className               : "table table-bordered responsive",
            defaultFilterMethod     : (filter, row) =>String(row[filter.id]) === filter.value,
            filtered                : this.state.filtered,
            pages                   : this.props.laboratoryTestsData.pages,
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
                            <h4>Laboratory Tests</h4>    
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
        dispatch(laboratoryTestsActions.resetState());
        const {formShow}  = this.state;
        let state  = this.state;

                 this.setState({
                    ...state,
                    formShow : false
        });
    }

    /**
        * @DateOfCreation        14 june 2018
        * @ShortDescription      This function is responsible show edit modal
        * @param                 Event Object
        * @return                Nothing
        */
    showHandle(formDetail) { 
        const {dispatch} = this.props;
        dispatch(laboratoryTestsActions.getOptionlist());
        this.optionLoad = true;
            const {formShow}  = this.state;
            
            //set edit detail
            var formConfig = this.state.formConfig;
            var fields = formConfig['fields'];
            var fromTitle = '';
            if(formDetail != ''){
                fromTitle = 'Edit Laboratory Test';
                for(var fc in fields){
                    var fieldName = fields[fc]['name'];
                    var valueData = formDetail[fieldName] === null ? '' : formDetail[fieldName];
                    if(fields[fc]['type'] ==='tags'){
                        fields[fc]['value'] = (valueData =='' || valueData == null )? [] : typeof valueData =='object' ? valueData : JSON.parse(valueData);
                    }else{
                    fields[fc]['value'] = fields[fc]['type'] ==='customcheckbox' ? [String(valueData)] : valueData;
                    }
                }
            }else{
                fromTitle = 'Add New Laboratory Test';
                for(var fc in fields){
                    var fieldName = fields[fc]['name'];
                    if(fields[fc]['type'] ==='tags'){
                        fields[fc]['value'] = [];
                    }else{
                        fields[fc]['value'] = fields[fc]['type'] ==='customcheckbox' ? [''] : '';
                    }
                }
            }
            
            let state  = this.state;
            this.setState({
                ...state,
                formShow : true,
                formDetail:formDetail,
                formConfig:formConfig,
                fxMultiAddFormTitle:fromTitle
            });
    }

   /**
    * @DateOfCreation        06 July 2018
    * @ShortDescription      This function is responsible to init table api call
    * @return                JSON Object
    * @param                 Nothing
    */
    getTableList(page, pageSize, sorted, filtered){
        const { dispatch} = this.props;
        dispatch(laboratoryTestsActions.getTablelist(page, pageSize, sorted, filtered));
    }

    /**
     * @DateOfCreation        29 June 2018
     * @ShortDescription      This function is responsible to filter table list
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
     * @ShortDescription      This function is responsible delete lab test confirm alert
     * @param                 Event Object
     * @return                Nothing
     */
    deleteData(lab_test_relation_id){
        let formDetail = {};
        formDetail['lab_test_relation_id'] = lab_test_relation_id;
        confirmAlert({
          title: 'Laboratory Test',
          message: <div className="alert-message">Are you sure you want to delete this lab test?</div>,
          buttons: [
          {
            label: 'Yes',
            onClick: () => {
              const { dispatch } = this.props;
              dispatch(laboratoryTestsActions.getDeleteRequest(formDetail));
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
                dispatch(laboratoryTestsActions.submitRequest(submitData));
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
        const { dispatch } = this.props;
        if(props.dataGridRefresh){
            dispatch(laboratoryTestsActions.getTablelist(0, 5, '', ''));
        }

        if(props.isInsertDone){
            setTimeout(function(){
                this.editHideHandle();
                dispatch(laboratoryTestsActions.resetState());
            }.bind(this),2000);
        }
        if(props.fetchOptionData && this.optionLoad){
            this.optionLoad = false;
            const { data } = this.state.formConfig;
            const { formConfig } = this.state;
            let mltOpt = utilityHelper.getDataConvertToOptionType(props.optionData.mlt_name,'mlt_name','lab_test_relation_id');
            this.setState({
                    formConfig:{
                        ...formConfig,
                        data:{
                            ...data,
                            mlt_name_data:mltOpt,
                        }
                    }
                });
        }
    }
    
    render() {
        return (
            <div >
                <LaboratoryTests
  						editHideHandle 				  = {this.editHideHandle}                	
                        tableSearch                   = {this.tableSearch}
                        filterAll                     = { this.state.filterAll }
                        gridData                      = {this.getGridConfig()}
                        FormShow              		  = {this.state.formShow}
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
 * @DateOfCreation        07 Aug 2018
 * @ShortDescription      This function is responsible to map store state to props
 * @return                View
 */
function mapStateToProps(state) {
    const { staticData, staticDatafetched } = state.staticData;
    const { isUserNotValid,isInsertDone, submitted, successMsg, errorMsg, laboratoryTestsData,dataGridRefresh, pages, optionData, fetchOptionData } = state.laboratoryTests;
    return {
    	staticData,
    	staticDatafetched,
        isInsertDone,
        submitted,
        successMsg,
        errorMsg,
        laboratoryTestsData,
        dataGridRefresh,
        isUserNotValid,
        pages,
        optionData,
        fetchOptionData,
        user_type:state.session.user.user_type
    };
}

const connectedLaboratoryTestsContainer = connect(mapStateToProps)(LaboratoryTestsContainer);
export { connectedLaboratoryTestsContainer as LaboratoryTestsContainer };

