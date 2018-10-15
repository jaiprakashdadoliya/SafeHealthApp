import React from "react";
import { Alert, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert'; // Import
import ReactTable from "react-table";
import "react-table/react-table.css";
import Select from 'react-select';
import { ManageServicesEdit } from "./ManageServicesEdit";
import { configConstants } from './../../../_constants';
import { doctorServiceActions } from './../../../_actions';
import { doctorServiceValidator } from './../../../_validator';
/**
 * ManageServices
 *
 * @package                SafeHealth
 * @subpackage             ManageServices
 * @category               Container Component
 * @DateOfCreation         11 May 2018
 * @ShortDescription       This component is reponsible for add service and show service
 */
class ManageServices extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.manageServicesEditShowHandle = this.manageServicesEditShowHandle.bind(this);
    this.manageServicesEditHideHandle = this.manageServicesEditHideHandle.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.serviceDeleteHandle = this.serviceDeleteHandle.bind(this);
    this.getServicesList = this.getServicesList.bind(this);
    this.serviceSearch = this.serviceSearch.bind(this);
    this.state = {
      manageServicesShow: false,
      service:this.initialState,
      editService: this.initialState,
      filtered: [],
      filterAll: ''
    };
  }

  /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to handle load membership list
   * @return                Nothing
   */
  getServicesList(page, pageSize, sorted, filtered){
    const { dispatch } = this.props;
    dispatch(doctorServiceActions.serviceList(page, pageSize, sorted, filtered));
  }


  /**
   * @DateOfCreation        10 June 2018
   * @ShortDescription      This function is responsible to set initail state
   * @return                Nothing
   */
  get initialState(){
    return {
      detail:{
          srv_id       : '',
          srv_name     : '',
          srv_cost     : '',
          srv_duration : '',
          srv_unit     : ''
        },
        validate:{
          srv_name     : { isValid:true,message:''},
          srv_cost     : { isValid:true,message:''},
          srv_duration : { isValid:true,message:''},
          srv_unit     : { isValid:true,message:''},
        }
    }
  }

    /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to set state for onchange on view page
   *                         so we can type in form.
   * @return                Nothing
   */
  handleChange(event) { 
    const { name, value } = event.target;
    const { detail,validate } = this.state.service;
    this.setState({
        service: {
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
  * @DateOfCreation        10 june 2018
  * @ShortDescription      This function is responsible to handle changes in Select state
  * @param                 selectOption and form name
  * @return                Nothing
  */
  handleSelectChange(selectedOption, name) {
    const { detail, validate }  = this.state.service;
    this.setState({
        service : {
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
   * @DateOfCreation        10 june 2018
   * @ShortDescription      This function is responsible to show edit model with value
   * @param                 List index Object
   * @return                Nothing
   */
  manageServicesEditShowHandle(index) {
      var srvData = this.props.services[index];
      const { detail,validate } = this.state.editService;
      this.setState({
        editService:{
          detail:{
          ...detail,
            srv_id      : srvData.srv_id,
            srv_name    : srvData.srv_name,
            srv_cost    : String(srvData.srv_cost),
            srv_duration: String(srvData.srv_duration),
            srv_unit    : srvData.srv_unit    
          },
          validate:{
            ...validate
          }
        }
      });
      this.setState({ manageServicesShow: true });
  }

  /**
   * @DateOfCreation        10 june 2018
   * @ShortDescription      This function is responsible to save service information
   * @return                Nothing
   */
  handleSave(){
    if(doctorServiceValidator.isServiceValid(this)){ 
      const { detail } = this.state.service;
      const { dispatch } = this.props;
      dispatch(doctorServiceActions.serviceSave(detail,this.props.services));
    } 
  }

  /**
   * @DateOfCreation        10 june 2018
   * @ShortDescription      This function is responsible to check props and reset state, activeKey come 
                            from setting
   * @param                 List index Object
   * @return                Nothing
   */
  componentWillReceiveProps(nextProps){
    if((nextProps.addSuccessMessage || nextProps.deleteErrorMsg) && nextProps.activeKey){
      setTimeout(function() { 
        this.setState({service:this.initialState});
        const { dispatch }  = this.props;
        dispatch(doctorServiceActions.resetState());
      }.bind(this), 1500);
    }else if(nextProps.addErrorMsg && nextProps.activeKey){ 
      setTimeout(function() { 
        const { dispatch }  = this.props;
        dispatch(doctorServiceActions.resetState());
      }.bind(this), 1500);      
    }
  }

  /**
   * @DateOfCreation        10 june 2018
   * @ShortDescription      This function is responsible to hide edit model
   * @param                 List index Object
   * @return                Nothing
   */
  manageServicesEditHideHandle() {
    this.setState({ manageServicesShow: false });
  }

  /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to handle delete service request
   * @param int serviceId service id of perticular doctor
   * @return                Nothing
   */
  serviceDeleteHandle(serviceId){
     confirmAlert({
      title: 'Service delete',
      message: 'Are you sure you want to delete this service?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            const { dispatch } = this.props;
            dispatch(doctorServiceActions.serviceDelete(serviceId, this.props.services));  
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
   * @ShortDescription      This function is responsible to handle load filtered service list
   * @return                Nothing
   */
    serviceSearch(event){
      const { value } = event.target;
      const filterAll = value;
      const filtered = [{ id: 'all', value: filterAll }];
      this.setState({ filterAll, filtered });
    }


  render() {
    return(
      <div>
        <ManageServicesEdit
           manageServicesShow = {this.state.manageServicesShow}
           manageServicesEditHideHandle = {this.manageServicesEditHideHandle}
           serviceData = { this.state.editService.detail}
           services = {this.props.services}
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
            <h4>Services</h4>
        </div>
          <div className="col-md-3">
              <div className="form-group">
                  <div className={this.state.service.validate.srv_name.isValid ? 'form-group' : 'form-group has-error'}>
                      <input className="form-control" type="text" name="srv_name" id="service_name" onChange={this.handleChange} value={this.state.service.detail.srv_name}/>
                      <label className="control-label">Service Name</label>
                      <span className="help-block">{this.state.service.validate.srv_name.message}</span>
                  </div>
              </div>
          </div>
          <div className="col-md-3">
              <div className={this.state.service.validate.srv_cost.isValid ? 'form-group' : 'form-group has-error'}>
                  <input className="form-control" type="text" name="srv_cost" id="service_cost" onChange={ this.handleChange } value={this.state.service.detail.srv_cost}/>
                  <label className="control-label">Service Cost (INR)</label>
                  <span className="help-block">{this.state.service.validate.srv_cost.message}</span>
              </div>
          </div>
          <div className="col-md-2">
              <div className={this.state.service.validate.srv_duration.isValid ? 'form-group' : 'form-group has-error'}>
                <input className="form-control" type="text" name="srv_duration" id="service_duration" onChange={ this.handleChange } value={this.state.service.detail.srv_duration}/>
                <label className="control-label">Service Duration</label>
                <span className="help-block">{this.state.service.validate.srv_duration.message}</span>
              </div>
          </div>
          <div className="col-md-2">
              <div className={this.state.service.validate.srv_unit.isValid ? 'form-group' : 'form-group has-error'}>
                <Select
                name="srv_unit"
                className="custom-select"
                value = {this.state.service.detail.srv_unit}
                clearable={false}
                placeholder="Select Unit"
                onChange={(value, name) => this.handleSelectChange(value, 'srv_unit')}
                options={[
                    { value: '1', label: 'Minute(s)' },
                    { value: '2', label: 'Hours(s)' }
                  ]}
                />
                <label className="control-label">Service Duration Unit</label>
                <span className="help-block">{this.state.service.validate.srv_unit.message}</span>
              </div>
          </div>
          <div className="col-md-2 text-left">
              <div className="form-group">
                  <button className="green btn table-btn margin-top-25" id="dr_pass_change" onClick={this.handleSave}  disabled={this.props.editSuccessMessage ? true : false}>Add</button>
              </div>
          </div>
        <hr/>
          <div className="table-wrap tabel-responsive col-md-12">
              <div className="table-search">
                Search: <input 
                  value={this.state.filterAll}
                  onChange={this.serviceSearch}
                  className="table-search-input"
                />
               </div>
              <ReactTable
                       noDataText="No Service found !!"
                       data={this.props.services}
                       filterable
                       defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                       filtered={this.state.filtered}
                       columns={[
                             {  
                                Header      : "Service Name",
                                accessor    : "srv_name",
                                className   : "dataCellClass",
                                filterable  : false,
                                filterMethod: (filter, row) => {
                                  return row[filter.id].includes(filter.value);
                                }
                             },
                             {
                               Header: "Service Cost (INR)",
                               accessor: "srv_cost",
                               className : "dataCellClass",
                               filterable  : false,
                               filterMethod: (filter, row) => {
                                  return row[filter.id].includes(filter.value);
                                }
                             },
                             {
                               Header    : "Service Duration",
                               accessor  : "srv_duration",
                               className : "dataCellClass",
                               filterable  : false,
                               filterMethod: (filter, row) => {
                                  return row[filter.id].includes(filter.value);
                                },
                                Cell : row => <div>{row.original.srv_duration} {row.original.srv_unit==1 ? 'Miniute' : 'Hour'}</div>
                             },
                             {
                               Header: 'Actions',
                               accessor  : "srv_id",
                               filterable  : false,
                               className :"actionCellClass",
                               Cell: row => <div>
                                                    <a href="javascript:void(0);" onClick={this.manageServicesEditShowHandle.bind(null,row.index)} className="green btn table-btn">Edit</a>
                                                    <a href="javascript:void(0)" onClick={this.serviceDeleteHandle.bind(null,row.value)} className="red btn table-btn">Delete</a>
                                                </div>
                              }
                            ]}
                        defaultSorted={[
                            {
                                id: "srv_name",
                                desc: true
                            } 
                        ]}
                        defaultPageSize= {configConstants.PAGE_SIZE}
                        minRows= {this.props.services.length}
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
                            this.getServicesList(state.page, state.pageSize, state.sorted, state.filtered);
                        }}
                     />  
            </div>
      </div>
    );
  }
}
/**
 * @DateOfCreation        22 May 2018
 * @ShortDescription      connect state to props on reducer and get state for service 
 * @return                service detail 
 */
function mapStateToProps(state) {
  const { pages,isUserNotValid, services, addSuccessMessage, deleteErrorMsg, addErrorMsg,loader} = state.doctorService;
  return {
      pages,
      isUserNotValid,
      services,
      addSuccessMessage,
      deleteErrorMsg,
      addErrorMsg,
      loader
  };
}
const connectedManageServices = connect(mapStateToProps)(ManageServices);
export { connectedManageServices as ManageServices };