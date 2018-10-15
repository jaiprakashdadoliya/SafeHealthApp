import React from "react";
import { connect } from 'react-redux';
import { headerActions, staticDataActions } from '../../../_actions';
import { configConstants } from '../../../_constants';
import { utilityHelper } from '../../../_helpers';
import { confirmAlert } from 'react-confirm-alert';
import Loadable from 'react-loadable';
import { Loading } from '../../../global';
import formConfig from './CheckupTypeConfig';
import moment from 'moment';
import {checkupTypeActions} from './checkupTypeActions';

const CheckupType = Loadable({
    loader: () => import('./CheckupType' /* webpackChunkName = "CheckupType" */).then(object => object.CheckupType),
    loading: Loading
});

class CheckupTypeContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
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
    * @DateOfCreation        04 Oct 2018
    * @ShortDescription      This function is responsible to get grid config
    * @return                JSON Object
    * @param                 Nothing
    */
    getGridConfig(){
        var gridCol = [
                {
                    Header: "Checkup Type",
                    headerClassName: 'grid-header',
                    accessor: "checkup_type",
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
                            <a href="javascript:void(0)" className="red btn table-btn"  onClick={this.deleteData.bind(null,row.original.checkup_type_id)}>Delete</a>
                        </div>
                    )
                }
            ];

        if(this.props.user_type == configConstants.USER_TYPE_PATIENT){
            gridCol.splice(3, 1);
        }

        const gridData = {
            noDataText : "Checkup Type not found !!",
            columns : gridCol,
            data                    : this.props.checkupTypeData.result,
            minRows                 : 0,
            defaultPageSize         : 5,
            className               : "table table-bordered responsive",
            defaultFilterMethod     : (filter, row) =>String(row[filter.id]) === filter.value,
            filtered                : this.state.filtered,
            pages                   : this.props.checkupTypeData.pages,
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
    * @DateOfCreation        04 Oct 2018
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
                            <h4>Checkup Type</h4>    
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
    * @DateOfCreation        04 Oct 2018
    * @ShortDescription      This function is responsible to update FxForm ref object
    * @return                JSON Object
    * @param                 Nothing
    */
    handleBoundFormUpdate(data){
        this.boundForm = data;
    }

    /**
     * @DateOfCreation        04 Oct 2018
     * @ShortDescription      This function is responsible hide edit modal
     * @param                 Event Object
     * @return                Nothing
     */
    editHideHandle() {
        const {dispatch} = this.props;
        dispatch(checkupTypeActions.resetState());
        const {formShow}  = this.state;
        let state  = this.state;

                 this.setState({
                    ...state,
                    formShow : false
        });
    }

    /**
        * @DateOfCreation        04 Oct 2018
        * @ShortDescription      This function is responsible show edit modal
        * @param                 Event Object
        * @return                Nothing
        */
    showHandle(formDetail) { 
        const {dispatch} = this.props;
        const {formShow}  = this.state;
            
            //set edit detail
            var formConfig = this.state.formConfig;
            var fields = formConfig['fields'];
            var fromTitle = '';
            if(formDetail != ''){
                fromTitle = 'Edit Checkup Type';
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
                fromTitle = 'Add New Checkup Type';
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
    * @DateOfCreation        04 Oct 2018
    * @ShortDescription      This function is responsible to init table api call
    * @return                JSON Object
    * @param                 Nothing
    */
    getTableList(page, pageSize, sorted, filtered){
        const { dispatch} = this.props;
        dispatch(checkupTypeActions.getTablelist(page, pageSize, sorted, filtered));
    }

    /**
     * @DateOfCreation        04 Oct 2018
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
     * @DateOfCreation        04 Oct 2018
     * @ShortDescription      This function is responsible delete checkup type confirm alert
     * @param                 Event Object
     * @return                Nothing
     */
    deleteData(checkup_type_id){
        let formDetail = {};
        formDetail['checkup_type_id'] = checkup_type_id;
        confirmAlert({
          title: 'Checkup Type',
          message: <div className="alert-message">Are you sure you want to delete this checkup type?</div>,
          buttons: [
          {
            label: 'Yes',
            onClick: () => {
              const { dispatch } = this.props;
              dispatch(checkupTypeActions.getDeleteRequest(formDetail));
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
     * @DateOfCreation        04 Oct 2018
     * @ShortDescription      This function is responsible to handle submit form data
     * @param                 Event Object
     * @return                Nothing
     */
    handleSubmit() {
        if(this.boundForm){
            const { dispatch } = this.props;
            let submitData = this.boundForm.getData();

            if(submitData){
                dispatch(checkupTypeActions.submitRequest(submitData));
            }
       }
    }

    /**
     * @DateOfCreation        04 Oct 2018
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
            dispatch(checkupTypeActions.getTablelist(0, 5, '', ''));
        }

        if(props.isInsertDone){
            setTimeout(function(){
                this.editHideHandle();
                dispatch(checkupTypeActions.resetState());
            }.bind(this),2000);
        }
    }
    
    render() {
        return (
            <div >
                <CheckupType
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
    const { isUserNotValid,isInsertDone, submitted, successMsg, errorMsg, checkupTypeData,dataGridRefresh, pages, optionData, fetchOptionData } = state.checkupType;
    return {
    	staticData,
    	staticDatafetched,
        isInsertDone,
        submitted,
        successMsg,
        errorMsg,
        checkupTypeData,
        dataGridRefresh,
        isUserNotValid,
        pages,
        optionData,
        fetchOptionData,
        user_type:state.session.user.user_type
    };
}

const connectedCheckupTypeContainer = connect(mapStateToProps)(CheckupTypeContainer);
export { connectedCheckupTypeContainer as CheckupTypeContainer };

