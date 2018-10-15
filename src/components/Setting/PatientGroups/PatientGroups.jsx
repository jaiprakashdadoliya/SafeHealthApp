import React from "react";
import { Redirect } from 'react-router-dom';
import axios from "axios"; 
import Select from 'react-select';
import ReactTable from "react-table";
import { confirmAlert } from 'react-confirm-alert'; // Import
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { headerActions } from '../../../_actions';
import { patientGroupsActions }  from './patientGroupsActions';
import { configConstants } from './../../../_constants';
import { PatientGroupsEdit } from './PatientGroupsEdit';
import { patientGroupsValidator } from './patientGroupsValidator';
/**
 * PatientGroups
 *
 * @package                SafeHealth
 * @subpackage             PatientGroups
 * @category               Container Component
 * @DateOfCreation         21 August 2018
 * @ShortDescription       This component is reponsible for PatientGroups
 */
class PatientGroups extends React.Component {
    constructor(props, context) {
    super(props, context);
    this.patientGroupEditShowHandle = this.patientGroupEditShowHandle.bind(this);
    this.patientGroupEditHideHandle = this.patientGroupEditHideHandle.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.patientGroupDeleteHandle = this.patientGroupDeleteHandle.bind(this);
    this.getPatientGroupsList = this.getPatientGroupsList.bind(this);
    this.patientGroupsSearch = this.patientGroupsSearch.bind(this);
    this.state = {
      patientGroupShow: false,
      patientGroup:this.initialState,
      editpatientGroup: this.initialState,
      filtered: [],
      filterAll: ''
    };
  }

  /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to handle load membership list
   * @return                Nothing
   */
  getPatientGroupsList(page, pageSize, sorted, filtered){
    const { dispatch } = this.props;
    dispatch(patientGroupsActions.getList(page, pageSize, sorted, filtered));
  }


  /**
   * @DateOfCreation        22 Aug 2018
   * @ShortDescription      This function is responsible to set initail state
   * @return                Nothing
   */
  get initialState(){
    return {
      detail:{
          pat_group_id       : '',
          pat_group_name     : ''
        },
        validate:{
          pat_group_id     : { isValid:true,message:''},
          pat_group_name   : { isValid:true,message:''}
        }
    }
  }

   /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to set state for onchange on view page
   *                        so we can type in form.
   * @return                Nothing
   */
  handleChange(event) { 
    const { name, value } = event.target;
    const { detail,validate } = this.state.patientGroup;
    this.setState({
        patientGroup: {
            validate:{
                ...validate,
                [name]: {
                    isValid: true,
                    message: ''
                }
            },
            detail: {
                ...detail,
                [name]: value
            }
        }
    });
  }
  
 /**
  * @DateOfCreation        22 Aug 2018
  * @ShortDescription      This function is responsible to handle changes in Select state
  * @param                 selectOption and form name
  * @return                Nothing
  */
  handleSelectChange(selectedOption, name) {
    const { detail, validate }  = this.state.patientGroup;
    this.setState({
        patientGroup : {
            detail : {
                ...detail,
                [name]: selectedOption.value
            },
            validate:{
                ...validate,
                [name]: {
                    isValid: true,
                    message: ''
                }
            },
        }
    });
  }
  
  /**
   * @DateOfCreation        22 Aug 2018
   * @ShortDescription      This function is responsible to show edit model with value
   * @param                 List index Object
   * @return                Nothing
   */
  patientGroupEditShowHandle(index) {
      var groupData = this.props.patientGroupsList[index];
      const { detail,validate } = this.state.editpatientGroup;
      this.setState({
        editpatientGroup:{
          detail:{
          ...detail,
            pat_group_id      : groupData.pat_group_id,
            pat_group_name    : groupData.pat_group_name
          },
          validate:{
            ...validate
          }
        }
      });
      this.setState({ patientGroupShow: true });
  }

  /**
   * @DateOfCreation        22 Aug 2018
   * @ShortDescription      This function is responsible to save patient group information
   * @return                Nothing
   */
  handleSave(){
    if(patientGroupsValidator.isGroupValid(this)){ 
      const { detail } = this.state.patientGroup;
      const { dispatch } = this.props;
      dispatch(patientGroupsActions.doSave(detail));
    } 
  }

  /**
   * @DateOfCreation        22 Aug 2018
   * @ShortDescription      This function is responsible to check props and reset state, activeKey come 
                            from setting
   * @param                 List index Object
   * @return                Nothing
   */
  componentWillReceiveProps(nextProps){
    if((nextProps.addSuccessMessage || nextProps.deleteErrorMsg) && nextProps.activeKey){
      setTimeout(function() { 
        this.setState({patientGroup:this.initialState});
        const { dispatch }  = this.props;
        dispatch(patientGroupsActions.resetState());
      }.bind(this), 1500);
    }else if(nextProps.addErrorMsg && nextProps.activeKey){ 
      setTimeout(function() { 
        const { dispatch }  = this.props;
        dispatch(patientGroupsActions.resetState());
      }.bind(this), 1500);      
    }
  }

  /**
   * @DateOfCreation        22 Aug 2018
   * @ShortDescription      This function is responsible to hide edit model
   * @param                 List index Object
   * @return                Nothing
   */
  patientGroupEditHideHandle() {
    this.setState({ patientGroupShow: false });
  }

  /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to handle delete patient group request
   * @param int patientGroupId patient group id of perticular group
   * @return                Nothing
   */
  patientGroupDeleteHandle(patientGroupId){
     confirmAlert({
      title: 'Patient Group delete',
      message: 'Are you sure you want to delete this group?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            const { dispatch } = this.props;
            dispatch(patientGroupsActions.doDelete(patientGroupId, this.props.patientGroupsList));  
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
   * @DateOfCreation        26 June 2018
   * @ShortDescription      This function is responsible to handle load filtered patient group list
   * @return                Nothing
   */
    patientGroupsSearch(event){
      const { value } = event.target;
      const filterAll = value;
      const filtered = [{ id: 'all', value: filterAll }];
      this.setState({ filterAll, filtered });
    }

    /**
    * @DateOfCreation        18 july 2018
    * @ShortDescription      This function is responsible for render HTML
    * @return                Nothing
    */
    render() {
    return(
      <div>
        <PatientGroupsEdit
           patientGroupShow = {this.state.patientGroupShow}
           patientGroupEditHideHandle = {this.patientGroupEditHideHandle}
           patientGroup = { this.state.editpatientGroup.detail}
           patientGroupsList = {this.props.patientGroupsList}
        />
       { this.props.addSuccessMessage &&                     
          <Alert bsStyle="success">
            { this.props.addSuccessMessage }
          </Alert>
        }
        { this.props.deleteErrorMsg &&                      
          <Alert bsStyle="danger">
            { this.props.deleteErrorMsg }
          </Alert>
        }
        { this.props.addErrorMsg &&                      
          <Alert bsStyle="danger">
            { this.props.addErrorMsg }
          </Alert>
        }
        <div className="col-md-12">
            <h4>Patient Groups</h4>
        </div>
          <div className="col-md-3">
              <div className="form-group">
                  <div className={this.state.patientGroup.validate.pat_group_name.isValid ? 'form-group' : 'form-group has-error'}>
                      <input className="form-control" type="text" name="pat_group_name" id="pat_group_name" onChange={this.handleChange} value={this.state.patientGroup.detail.pat_group_name} />
                      <span className="help-block">{this.state.patientGroup.validate.pat_group_name.message}</span>
                  </div>
              </div>
          </div>
          <div className="col-md-2 text-left">
              <div className="form-group">
                  <button className="green btn table-btn" id="dr_pass_change" onClick={this.handleSave}  disabled={this.props.editSuccessMessage ? true : false}>Add</button>
              </div>
          </div>
          <hr/>
          <div className="table-wrap tabel-responsive col-md-12">
              <div className="table-search">
                Search: <input 
                  value={this.state.filterAll}
                  onChange={this.patientGroupsSearch}
                  className="table-search-input"
                />
               </div>
              <ReactTable
                       noDataText="No patient group found !!"
                       data={this.props.patientGroupsList}
                       filterable
                       defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                       filtered={this.state.filtered}
                       columns={[
                             {  
                                Header      : "Patient Group",
                                accessor    : "pat_group_name",
                                className   : "dataCellClass",
                                filterable  : false,
                                filterMethod: (filter, row) => {
                                  return row[filter.id].includes(filter.value);
                                }
                             },
                             {
                               Header: 'Actions',
                               accessor  : "pat_group_id",
                               filterable  : false,
                               className :"actionCellClass",
                               Cell: row => <div>
                                              <a href="javascript:void(0);" onClick={this.patientGroupEditShowHandle.bind(null,row.index)} className="green btn table-btn">Edit</a>
                                              <a href="javascript:void(0)" onClick={this.patientGroupDeleteHandle.bind(null,row.value)} className="red btn table-btn">Delete</a>
                                          </div>
                              }
                            ]}
                        defaultSorted={[
                            {
                                id: "pat_group_name",
                                desc: true
                            } 
                        ]}
                        defaultPageSize= {configConstants.PAGE_SIZE}
                        minRows= {this.props.patientGroupsList.length}
                        className="table table-bordered responsive"
                        loading={this.props.loader}
                        filterable
                        Sorted
                        pages={this.props.pages}
                        showPagination={true}
                        showPaginationTop={true}
                        showPaginationBottom={false}
                        pageSizeOptions={[10,20,50,100]}
                        manual // For server side pagination
                        onFetchData={(state, instance) => {
                            this.getPatientGroupsList(state.page, state.pageSize, state.sorted, state.filtered);
                        }}
                     />  
            </div>
      </div>
    );
  }
}
/**
 * @DateOfCreation        22 May 2018
 * @ShortDescription      connect state to props on reducer and get state for patient group 
 * @return                patient group detail 
 */
function mapStateToProps(state) {
  const { pages,isUserNotValid, patientGroupsList, addSuccessMessage, deleteErrorMsg, addErrorMsg,loader} = state.patientGroups;
    return {
      pages,
      isUserNotValid,
      patientGroupsList,
      addSuccessMessage,
      deleteErrorMsg,
      addErrorMsg,
      loader
  };
}
const connectedPatientGroups = connect(mapStateToProps)(PatientGroups);
export { connectedPatientGroups as PatientGroups };