import React from "react";
import { Redirect } from 'react-router-dom';
import axios from "axios"; 
import Select from 'react-select';
import ReactTable from "react-table";
import { connect } from 'react-redux';
import { Button, Modal, Alert } from 'react-bootstrap';
import { headerActions } from '../../_actions';
import { appointmentCategoryActions }  from './appointmentCategoryActions';
import { configConstants } from '../../_constants';
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
class AppointmentCategoryEdit extends React.Component {
    constructor(props, context) {
    super(props, context);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.state = {
      appointmentCategory : {
          detail: {
            appointment_cat_name     : ''
          },
          validate:{
            appointment_cat_name     : {isValid:true, message: ''}
          }
      }
    }
  }

  /**
   * @DateOfCreation        22 August 2018
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
   * @DateOfCreation        22 August 2018
   * @ShortDescription      This function is responsible to close edit model
   * @return                Nothing
   */
  handleClose() {
    this.props.appointmentCategoryEditHideHandle();
    const { dispatch }  = this.props;
    dispatch(appointmentCategoryActions.resetState());
  }

  /**
   * @DateOfCreation        22 August 2018
   * @ShortDescription      This function is responsible to submit edit form
   * @return                Nothing
   */
  handleSubmit() {
    if(appointmentCategoryValidator.isCategoryValid(this)){ 
      const { detail } = this.state.appointmentCategory;
      const { dispatch } = this.props;
      dispatch(appointmentCategoryActions.doUpdate(detail,this.props.appointmentCategoryList));
    }
  }

  /**
   * @DateOfCreation        22 August 2018
   * @ShortDescription      This function is responsible to set state for onchange on view page
   *                         so we can type in form.
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
   * @DateOfCreation        22 August 2018
   * @ShortDescription      This function is responsible to handle changes in Select state
   * @param                 Event Object
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
   * @DateOfCreation        22 August 2018
   * @ShortDescription      This function is responsible to set edit detail in form
   * @param                 nextProps Object
   * @return                Nothing
   */
  componentWillReceiveProps(nextProps){
    var appointmentDetail={};
    if(nextProps.updatedData){ //updated props
      appointmentDetail = nextProps.updatedData;
    }else if(nextProps.appointmentCategory){ //inital props
      appointmentDetail = nextProps.appointmentCategory;
    } 

    for(var k in appointmentDetail){
     this.state.appointmentCategory.detail[k]=appointmentDetail[k] != null ? appointmentDetail[k] : '';
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
            <Modal show={this.props.appointmentCategoryShow} onHide={this.handleClose}  backdrop="static" keyboard={false}>
              <Modal.Header closeButton>
                <Modal.Title>Edit appointment category</Modal.Title>
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
                        <div className={this.state.appointmentCategory.validate.appointment_cat_name.isValid ? 'form-group' : 'form-group has-error'}>
                            <input className="form-control" type="text" name="appointment_cat_name" id="appointment_cat_name" onChange={this.handleChange} value={this.state.appointmentCategory.detail.appointment_cat_name}/>
                            <label className="control-label">Appointment category</label>
                            <span className="help-block">{this.state.appointmentCategory.validate.appointment_cat_name.message}</span>
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
 * @DateOfCreation        22 August 2018
 * @ShortDescription      connect state to props on reducer and get state for edit service
 * @return                service detail
 */
function mapStateToProps(state) {
    const { isUserNotValid, sendingRequest, editSuccessMessage, updatedData,appointmentCategoryList,editErrorMsg} = state.appointmentCategory;
   
    return {
        isUserNotValid,
        sendingRequest,
        editSuccessMessage,
        updatedData,
        appointmentCategoryList,
        editErrorMsg
        
    };
}
const connectedAppointmentCategoryEdit = connect(mapStateToProps)(AppointmentCategoryEdit);
export { connectedAppointmentCategoryEdit as AppointmentCategoryEdit };

