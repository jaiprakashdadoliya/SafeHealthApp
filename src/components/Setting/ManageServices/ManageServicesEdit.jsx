import React from "react";
import { Button, Modal, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import Select from 'react-select';
import { utilityHelper } from '../../../_helpers';
import { doctorServiceActions, headerActions } from '../../../_actions';
import { doctorServiceValidator } from '../../../_validator';
/**
 * ManageServicesEdit
 *
 * @package                SafeHealth
 * @subpackage             ManageServicesEdit
 * @category               Container Component
 * @DateOfCreation         12 June 2018
 * @ShortDescription       This component is reponsible for edit service
 */
class ManageServicesEdit extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.state = {
      service : this.intialState
    }
  }

  get intialState(){
    return{
      detail: {
        srv_name     : '',
        srv_cost     : '',
        srv_duration : '',
        srv_unit     : ''
      },
      validate:{
        srv_name     : {isValid:true, message: ''},
        srv_cost     : {isValid:true, message: ''}, 
        srv_duration : {isValid:true, message: ''},
        srv_unit     : {isValid:true, message: ''},
      }
    }
  } 

  /**
   * @DateOfCreation        12 june 2018
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
   * @DateOfCreation        12 June 2018
   * @ShortDescription      This function is responsible to close edit model
   * @return                Nothing
   */
  handleClose() {
    const { service } = this.state;
    this.props.manageServicesEditHideHandle();
    const { dispatch }  = this.props;
    dispatch(doctorServiceActions.resetState());
    this.setState({
      service : this.intialState
    })
  }

  /**
   * @DateOfCreation        12 June 2018
   * @ShortDescription      This function is responsible to submit edit form
   * @return                Nothing
   */
  handleSubmit() {
    if(doctorServiceValidator.isServiceValid(this)){ 
      const { detail } = this.state.service;
      const { dispatch } = this.props;
      dispatch(doctorServiceActions.serviceUpdate(detail,this.props.services));
    }
  }

  /**
   * @DateOfCreation        12 June 2018
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
   * @DateOfCreation        12 June 2018
   * @ShortDescription      This function is responsible to handle changes in Select state
   * @param                 Event Object
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
   * @DateOfCreation        12 June 2018
   * @ShortDescription      This function is responsible to set edit detail in form
   * @param                 nextProps Object
   * @return                Nothing
   */
  componentWillReceiveProps(nextProps){
    var serviceDetail={};
    if(nextProps.updatedData && this.props.editSuccessMessage){ //updated props
      serviceDetail = nextProps.updatedData;
    }else if(nextProps.serviceData && !this.props.editSuccessMessage){ //inital props
      serviceDetail = nextProps.serviceData;
    }   

    for(var k in serviceDetail){
     this.state.service.detail[k]= serviceDetail[k] != null ? String(serviceDetail[k]) : '';
    }

    if(nextProps.editSuccessMessage){
      setTimeout(function() { 
        this.handleClose();
      }.bind(this), 1500);
    }    
  }
    render() {
        return (
          <div>
            <Modal show={this.props.manageServicesShow} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Service</Modal.Title>
              </Modal.Header>
              { this.props.editSuccessMessage &&                     
                <Alert bsStyle="success">
                  { this.props.editSuccessMessage }
                </Alert>
              }

               { this.props.editErrorMsg &&                      
                    <Alert bsStyle="danger">
                      { this.props.editErrorMsg }
                    </Alert>
                }
              <Modal.Body>
                <div className="row">
                    <div className="col-md-6">
                        <div className={this.state.service.validate.srv_name.isValid ? 'form-group' : 'form-group has-error'}>
                            <input className="form-control" type="text" name="srv_name" id="service_name" onChange={this.handleChange} value={this.state.service.detail.srv_name}/>
                            <label className="control-label">Service Name</label>
                            <span className="help-block">{this.state.service.validate.srv_name.message}</span>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className={this.state.service.validate.srv_cost.isValid ? 'form-group' : 'form-group has-error'}>
                            <input className="form-control" type="text" name="srv_cost" id="service_cost" onChange={ this.handleChange } value={this.state.service.detail.srv_cost}/>
                            <label className="control-label">Service Cost (INR)</label>
                            <span className="help-block">{this.state.service.validate.srv_cost.message}</span>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className={this.state.service.validate.srv_duration.isValid ? 'form-group' : 'form-group has-error'}>
                            <input className="form-control" type="text" name="srv_duration" id="service_duration" onChange={ this.handleChange } value={this.state.service.detail.srv_duration}/>
                            <label className="control-label">Service Duration</label>
                            <span className="help-block">{this.state.service.validate.srv_duration.message}</span>
                          </div>
                    </div>
                    <div className="col-md-6">
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
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button className="btn text-btn red" onClick={this.handleClose}>Close</Button>
                <Button className="btn text-btn green" onClick={this.handleSubmit}  disabled={this.props.editSuccessMessage ? true : false}>Save</Button>
              </Modal.Footer>
            </Modal>
          </div>
        );
      }
}

/**
 * @DateOfCreation        12 June 2018
 * @ShortDescription      connect state to props on reducer and get state for edit service
 * @return                service detail
 */
function mapStateToProps(state) {
    const { isUserNotValid, sendingRequest, editSuccessMessage, updatedData,services,editErrorMsg} = state.doctorService;
   
    return {
        isUserNotValid,
        sendingRequest,
        editSuccessMessage,
        updatedData,
        services,
        editErrorMsg
        
    };
}
const connectedManageServicesEdit = connect(mapStateToProps)(ManageServicesEdit);
export { connectedManageServicesEdit as ManageServicesEdit };

