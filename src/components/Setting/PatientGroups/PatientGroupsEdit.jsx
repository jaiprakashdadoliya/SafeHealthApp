import React from "react";
import { Redirect } from 'react-router-dom';
import axios from "axios"; 
import Select from 'react-select';
import ReactTable from "react-table";
import { connect } from 'react-redux';
import { Button, Modal, Alert } from 'react-bootstrap';
import { headerActions } from '../../../_actions';
import { patientGroupsActions }  from './patientGroupsActions';
import { configConstants } from '../../../_constants';
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
class PatientGroupsEdit extends React.Component {
    constructor(props, context) {
    super(props, context);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      patientGroup : {
          detail: {
            pat_group_name     : ''
          },
          validate:{
            pat_group_name     : {isValid:true, message: ''}
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
    this.props.patientGroupEditHideHandle();
    const { dispatch }  = this.props;
    dispatch(patientGroupsActions.resetState());
  }

  /**
   * @DateOfCreation        22 August 2018
   * @ShortDescription      This function is responsible to submit edit form
   * @return                Nothing
   */
  handleSubmit() {
    if(patientGroupsValidator.isGroupValid(this)){ 
      const { detail } = this.state.patientGroup;
      const { dispatch } = this.props;
      dispatch(patientGroupsActions.doUpdate(detail,this.props.patientGroupsList));
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
   * @DateOfCreation        22 August 2018
   * @ShortDescription      This function is responsible to set edit detail in form
   * @param                 nextProps Object
   * @return                Nothing
   */
  componentWillReceiveProps(nextProps){
    var groupDetail={};
    if(nextProps.updatedData){ //updated props
      groupDetail = nextProps.updatedData;
    }else if(nextProps.patientGroup){ //inital props
      groupDetail = nextProps.patientGroup;
    } 

    for(var k in groupDetail){
     this.state.patientGroup.detail[k]=groupDetail[k] != null ? groupDetail[k] : '';
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
            <Modal show={this.props.patientGroupShow} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Edit patient group</Modal.Title>
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
                        <div className={this.state.patientGroup.validate.pat_group_name.isValid ? 'form-group' : 'form-group has-error'}>
                            <input className="form-control" type="text" name="pat_group_name" id="pat_group_name" onChange={this.handleChange} value={this.state.patientGroup.detail.pat_group_name}/>
                            <label className="control-label">Group name</label>
                            <span className="help-block">{this.state.patientGroup.validate.pat_group_name.message}</span>
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
    const { isUserNotValid, sendingRequest, editSuccessMessage, updatedData,patientGroupsList,editErrorMsg} = state.patientGroups;
   
    return {
        isUserNotValid,
        sendingRequest,
        editSuccessMessage,
        updatedData,
        patientGroupsList,
        editErrorMsg
        
    };
}
const connectedPatientGroupsEdit = connect(mapStateToProps)(PatientGroupsEdit);
export { connectedPatientGroupsEdit as PatientGroupsEdit };

