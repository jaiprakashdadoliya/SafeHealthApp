import React from "react";
import { Button, Modal, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import Select from 'react-select';
import { utilityHelper } from '../../../_helpers';
import { headerActions } from '../../../_actions';
import { consentFormsActions } from './consentFormsActions';
import { consentFormsValidator } from './consentFormsValidator';
import { configConstants, dataConstants } from './../../../_constants';
/**
 * ConsentFormsSave
 *
 * @package                SafeHealth
 * @subpackage             ConsentFormsSave
 * @category               Container Component
 * @DateOfCreation         12 June 2018
 * @ShortDescription       This component is reponsible for edit consentForm
 */
class ConsentFormsSave extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = this.initialState;
    this.pdfPath = "doctor/consentForm/generatePdf/";
  }

  get initialState() {
    return {
      consentForm : {
        detail: {
          consent_form_id      : '',
          consent_form_title   : '',
          consent_form_content : dataConstants.CONSENT_FORMS_DEFAULT_CONTENT,
        },
        validate:{
          consent_form_title   : {isValid:true, message: ''}, 
          consent_form_content : {isValid:true, message: ''},
        }
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
   * @ShortDescription      This function is responsible to submit edit form
   * @return                Nothing
   */
  handleSubmit() {
    if(consentFormsValidator.isConsentFormValid(this)){ 
      const { detail } = this.state.consentForm;
      const { dispatch } = this.props;
      dispatch(consentFormsActions.consentFormSave(detail,this.props.consentForms));
    }
  }

  handleClose() {
    const { dispatch }  = this.props;
    dispatch(consentFormsActions.resetState());
    this.props.consentFormsSaveHideHandle();
    this.setState(this.initialState);
  }

  /**
   * @DateOfCreation        12 June 2018
   * @ShortDescription      This function is responsible to set state for onchange on view page
   *                         so we can type in form.
   * @return                Nothing
   */
  handleChange(event) { 
    const { name, value } = event.target;
    const { detail,validate } = this.state.consentForm;
    this.setState({
        consentForm: {
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
   * @ShortDescription      This function is responsible to set edit detail in form
   * @param                 nextProps Object
   * @return                Nothing
   */
  componentWillReceiveProps(nextProps){
    var consentFormDetail={};
    if(nextProps.updatedData){ //updated props
      consentFormDetail = nextProps.updatedData;
    }else if(nextProps.consentFormData){ //inital props
      consentFormDetail = nextProps.consentFormData;
    } 
    if(consentFormDetail.consent_form_id && !nextProps.sendingRequest) {
      for(var k in consentFormDetail){
        this.state.consentForm.detail[k]= consentFormDetail[k] != null ? String(consentFormDetail[k]) : '';
      }
    }else{
        this.setState(this.initialState);
    }

    if(nextProps.successMessage){
      setTimeout(function() { 
        this.handleClose();
      }.bind(this), 1500);
    }    
  }
    render() {
        return (
          <div>
            <Modal show={this.props.consentFormsSaveShow} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{this.props.title}</Modal.Title>
              </Modal.Header>
              
              { this.props.successMessage &&                     
                <Alert bsStyle="success">
                  { this.props.successMessage }
                </Alert>
              }
              { this.props.errorMsg &&                      
                <Alert bsStyle="danger">
                  { this.props.errorMsg }
                </Alert>
              }
              <Modal.Body>
                <div className="row">
                    <div className="col-md-12">
                        <div className={this.state.consentForm.validate.consent_form_title.isValid ? 'form-group' : 'form-group has-error'}>
                            <input className="form-control" type="text" name="consent_form_title" id="consent_form_title" onChange={this.handleChange} value={this.state.consentForm.detail.consent_form_title}/>
                            <label className="control-label">Form Title</label>
                            <span className="help-block">{this.state.consentForm.validate.consent_form_title.message}</span>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className={this.state.consentForm.validate.consent_form_content.isValid ? 'form-group' : 'form-group has-error'}>
                            <textarea className="form-control" value={this.state.consentForm.detail.consent_form_content}  name="consent_form_content" onChange={ this.handleChange } rows='20'></textarea>
                            <label className="control-label">Content</label>
                            <span className="help-block">{this.state.consentForm.validate.consent_form_content.message}</span>
                        </div>
                    </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <a href={configConstants.API_BASE_PATH+this.pdfPath+this.state.consentForm.detail.consent_form_id} className="btn text-btn green float-left" target="_blank">Generate PDF</a>
                <Button className="btn text-btn red" onClick={this.handleClose}>Close</Button>
                <Button className="btn text-btn green" onClick={this.handleSubmit}  disabled={this.props.successMessage ? true : false}>Save</Button>
              </Modal.Footer>
            </Modal>
          </div>
        );
      }
}

/**
 * @DateOfCreation        12 June 2018
 * @ShortDescription      connect state to props on reducer and get state for edit consentForm
 * @return                consentForm detail
 */
function mapStateToProps(state) {
    const { isUserNotValid, sendingRequest, successMessage, updatedData,errorMsg} = state.consentForms;
    return {
        isUserNotValid,
        sendingRequest,
        successMessage,
        updatedData,
        errorMsg
        
    };
}
const connectedConsentFormsSave = connect(mapStateToProps)(ConsentFormsSave);
export { connectedConsentFormsSave as ConsentFormsSave };

