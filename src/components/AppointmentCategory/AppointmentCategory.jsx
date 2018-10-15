import React from "react";
import { Redirect } from 'react-router-dom';
import axios from "axios"; 
import Select from 'react-select';
import ReactTable from "react-table";
import { confirmAlert } from 'react-confirm-alert'; // Import
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { headerActions } from '../../_actions';
import { appointmentCategoryActions }  from './appointmentCategoryActions';
import { configConstants } from './../../_constants';
import { AppointmentCategoryEdit } from './AppointmentCategoryEdit';
import { appointmentCategoryValidator } from './appointmentCategoryValidator';
/**
 * AppointmentCategory
 *
 * @package                SafeHealth
 * @subpackage             AppointmentCategory
 * @category               Container Component
 * @DateOfCreation         21 August 2018
 * @ShortDescription       This component is reponsible for AppointmentCategory
 */
class AppointmentCategory extends React.Component {
    constructor(props, context) {
    super(props, context);
    this.appointmentCategoryEditShowHandle = this.appointmentCategoryEditShowHandle.bind(this);
    this.appointmentCategoryEditHideHandle = this.appointmentCategoryEditHideHandle.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.appointmentCategoryDeleteHandle = this.appointmentCategoryDeleteHandle.bind(this);
    this.getAppointmentCategoryList = this.getAppointmentCategoryList.bind(this);
    this.appointmentCategorySearch = this.appointmentCategorySearch.bind(this);
    this.state = {
      appointmentCategoryShow: false,
      appointmentCategory:this.initialState,
      editappointmentCategory: this.initialState,
      filtered: [],
      filterAll: ''
    };
  }

  /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to handle load membership list
   * @return                Nothing
   */
  getAppointmentCategoryList(page, pageSize, sorted, filtered){
    const { dispatch } = this.props;
    dispatch(appointmentCategoryActions.getList(page, pageSize, sorted, filtered));
  }


  /**
   * @DateOfCreation        22 Aug 2018
   * @ShortDescription      This function is responsible to set initail state
   * @return                Nothing
   */
  get initialState(){
    return {
      detail:{
          appointment_cat_id       : '',
          appointment_cat_name     : ''
        },
        validate:{
          appointment_cat_id     : { isValid:true,message:''},
          appointment_cat_name   : { isValid:true,message:''}
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
    const { detail,validate } = this.state.appointmentCategory;
    this.setState({
        appointmentCategory: {
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
    const { detail, validate }  = this.state.appointmentCategory;
    this.setState({
        appointmentCategory : {
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
  appointmentCategoryEditShowHandle(index) {
      var categoryData = this.props.appointmentCategoryList[index];
      const { detail,validate } = this.state.editappointmentCategory;
      this.setState({
        editappointmentCategory:{
          detail:{
          ...detail,
            appointment_cat_id      : categoryData.appointment_cat_id,
            appointment_cat_name    : categoryData.appointment_cat_name
          },
          validate:{
            ...validate
          }
        }
      });
      this.setState({ appointmentCategoryShow: true });
  }

  /**
   * @DateOfCreation        22 Aug 2018
   * @ShortDescription      This function is responsible to save appointment category information
   * @return                Nothing
   */
  handleSave(){
    if(appointmentCategoryValidator.isCategoryValid(this)){ 
      const { detail } = this.state.appointmentCategory;
      const { dispatch } = this.props;
      dispatch(appointmentCategoryActions.doSave(detail));
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
        this.setState({appointmentCategory:this.initialState});
        const { dispatch }  = this.props;
        dispatch(appointmentCategoryActions.resetState());
      }.bind(this), 1500);
    }else if(nextProps.addErrorMsg && nextProps.activeKey){ 
      setTimeout(function() { 
        const { dispatch }  = this.props;
        dispatch(appointmentCategoryActions.resetState());
      }.bind(this), 1500);      
    }
  }

  /**
   * @DateOfCreation        22 Aug 2018
   * @ShortDescription      This function is responsible to hide edit model
   * @param                 List index Object
   * @return                Nothing
   */
  appointmentCategoryEditHideHandle() {
    this.setState({ appointmentCategoryShow: false });
  }

  /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to handle delete appointment category request
   * @param int appointmentCategoryId appointment category id of perticular appointment
   * @return                Nothing
   */
  appointmentCategoryDeleteHandle(appointmentCategoryId){
     confirmAlert({
      title: 'Delete Appointment Category',
      message: 'Are you sure you want to delete this category?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            const { dispatch } = this.props;
            dispatch(appointmentCategoryActions.doDelete(appointmentCategoryId, this.props.appointmentCategoryList));  
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
   * @ShortDescription      This function is responsible to handle load filtered appointment category list
   * @return                Nothing
   */
    appointmentCategorySearch(event){
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
        <AppointmentCategoryEdit
           appointmentCategoryShow = {this.state.appointmentCategoryShow}
           appointmentCategoryEditHideHandle = {this.appointmentCategoryEditHideHandle}
           appointmentCategory = { this.state.editappointmentCategory.detail}
           appointmentCategoryList = {this.props.appointmentCategoryList}
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
            <h4>Appointment Category</h4>
        </div>
          <div className="col-md-3">
              <div className="form-group">
                  <div className={this.state.appointmentCategory.validate.appointment_cat_name.isValid ? 'form-group' : 'form-group has-error'}>
                      <input className="form-control" type="text" name="appointment_cat_name" id="appointment_cat_name" onChange={this.handleChange} value={this.state.appointmentCategory.detail.appointment_cat_name} />
                      <span className="help-block">{this.state.appointmentCategory.validate.appointment_cat_name.message}</span>
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
                  onChange={this.appointmentCategorySearch}
                  className="table-search-input"
                />
               </div>
              <ReactTable
                       noDataText="No appointment category found !!"
                       data={this.props.appointmentCategoryList}
                       filterable
                       defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                       filtered={this.state.filtered}
                       columns={[
                             {  
                                Header      : "Appointment Category",
                                accessor    : "appointment_cat_name",
                                className   : "dataCellClass",
                                filterable  : false,
                                filterMethod: (filter, row) => {
                                  return row[filter.id].includes(filter.value);
                                }
                             },
                             {
                               Header: 'Actions',
                               accessor  : "appointment_cat_id",
                               filterable  : false,
                               className :"actionCellClass",
                               Cell: row => <div>
                                              <a href="javascript:void(0);" onClick={this.appointmentCategoryEditShowHandle.bind(null,row.index)} className="green btn table-btn">Edit</a>
                                              <a href="javascript:void(0)" onClick={this.appointmentCategoryDeleteHandle.bind(null,row.value)} className="red btn table-btn">Delete</a>
                                          </div>
                              }
                            ]}
                        defaultSorted={[
                            {
                                id: "appointment_cat_name",
                                desc: true
                            } 
                        ]}
                        defaultPageSize= {configConstants.PAGE_SIZE}
                        minRows= {this.props.appointmentCategoryList.length}
                        className="table table-bordered responsive"
                        loading={this.props.loader}
                        filterable
                        Sorted
                        pages={this.props.pages}
                        showPagination={true}
                        showPaginationTop={true}
                        showPaginationBottom={false}
                        pageSizeOptions={[1, 2, 3, 4, 5, 6]}
                        manual // For server side pagination
                        onFetchData={(state, instance) => {
                            this.getAppointmentCategoryList(state.page, state.pageSize, state.sorted, state.filtered);
                        }}
                     />  
            </div>
      </div>
    );
  }
}
/**
 * @DateOfCreation        22 May 2018
 * @ShortDescription      connect state to props on reducer and get state for appointment category 
 * @return                appointment category detail 
 */
function mapStateToProps(state) {
  const { pages,isUserNotValid, appointmentCategoryList, addSuccessMessage, deleteErrorMsg, addErrorMsg,loader} = state.appointmentCategory;
    return {
      pages,
      isUserNotValid,
      appointmentCategoryList,
      addSuccessMessage,
      deleteErrorMsg,
      addErrorMsg,
      loader
  };
}
const connectedAppointmentCategory = connect(mapStateToProps)(AppointmentCategory);
export { connectedAppointmentCategory as AppointmentCategory };