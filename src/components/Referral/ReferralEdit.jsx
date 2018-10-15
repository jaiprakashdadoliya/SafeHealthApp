import React from "react";
import { Redirect } from 'react-router-dom';
import Select from 'react-select';
import ReactTable from "react-table";
import { connect } from 'react-redux';
import { Button, Modal, Alert } from 'react-bootstrap';
import { headerActions } from '../../_actions';
import { referralActions }  from './referralActions';
import { configConstants } from '../../_constants';
import { referralValidator } from './referralValidator';

/**
 * Referral
 *
 * @package                SafeHealth
 * @subpackage             Referral
 * @category               Container Component
 * @DateOfCreation         21 August 2018
 * @ShortDescription       This component is reponsible for Referral
 */
class ReferralEdit extends React.Component {
    constructor(props, context) {
    super(props, context);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.state = {
      referral : {
          detail: {
            doc_ref_name     : '',
            doc_ref_mobile   : ''
          },
          validate:{
            doc_ref_name     : {isValid:true, message: ''},
            doc_ref_mobile   : {isValid:true, message: ''}
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
    this.props.referralEditHideHandle();
    const { dispatch }  = this.props;
    dispatch(referralActions.resetState());
  }

  /**
   * @DateOfCreation        22 August 2018
   * @ShortDescription      This function is responsible to submit edit form
   * @return                Nothing
   */
  handleSubmit() {
    if(referralValidator.isReferralValid(this)){ 
      const { detail } = this.state.referral;
      const { dispatch } = this.props;
      dispatch(referralActions.doUpdate(detail,this.props.referralList));
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
    const { detail,validate } = this.state.referral;
    this.setState({
        referral: {
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
    const { detail, validate }  = this.state.referral;
    this.setState({
        referral : {
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
    var referralDetail={};
    if(nextProps.updatedData){ //updated props
      referralDetail = nextProps.updatedData;
    }else if(nextProps.referral){ //inital props
      referralDetail = nextProps.referral;
    } 

    for(var k in referralDetail){
     this.state.referral.detail[k]=referralDetail[k] != null ? referralDetail[k] : '';
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
            <Modal show={this.props.referralShow} onHide={this.handleClose}  backdrop="static" keyboard={false}>
              <Modal.Header closeButton>
                <Modal.Title>Edit referral doctor</Modal.Title>
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
                        <div className={this.state.referral.validate.doc_ref_name.isValid ? 'form-group' : 'form-group has-error'}>
                            <input className="form-control" type="text" name="doc_ref_name" id="doc_ref_name" onChange={this.handleChange} value={this.state.referral.detail.doc_ref_name}/>
                            <label className="control-label">Doctor Name</label>
                            <span className="help-block">{this.state.referral.validate.doc_ref_name.message}</span>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className={this.state.referral.validate.doc_ref_mobile.isValid ? 'form-group' : 'form-group has-error'}>
                            <input className="form-control" type="text" name="doc_ref_mobile" id="doc_ref_mobile" onChange={this.handleChange} value={this.state.referral.detail.doc_ref_mobile}/>
                            <label className="control-label">Contact Number</label>
                            <span className="help-block">{this.state.referral.validate.doc_ref_mobile.message}</span>
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
    const { isUserNotValid, sendingRequest, editSuccessMessage, updatedData,referralList,editErrorMsg} = state.referral;
   
    return {
        isUserNotValid,
        sendingRequest,
        editSuccessMessage,
        updatedData,
        referralList,
        editErrorMsg
        
    };
}
const connectedReferralEdit = connect(mapStateToProps)(ReferralEdit);
export { connectedReferralEdit as ReferralEdit };

