/**
 * DoctorEducationDegreeEditContainer
 *
 * @package                SafeHealth
 * @subpackage             DoctorEducationDegreeEditContainer
 * @category               Container Component
 * @DateOfCreation         31 May 2018
 * @ShortDescription       This component is reponsible for edit education degree
 */
import React from "react";
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { utilityHelper } from '../../../_helpers';

import { DoctorEducationDegreeEdit } from './DoctorEducationDegreeEdit';
import { doctorDegreeActions, headerActions, doctorProfileActions } from '../../../_actions';
import { doctorDegreeValidator } from '../../../_validator';

class DoctorEducationDegreeEditContainer extends React.Component
{
  /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      Contructor is responsible to function declaration and define intial state with validation
   * @param                 props
   * @return                Nothing
   */
  constructor(props, context) {
    super(props, context);
    this.state = this.initialState;
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  get initialState()  {
    return {
      degree : {
          detail:{
              'doc_deg_name': '',
              'doc_deg_passing_year': '',
              'doc_deg_institute': ''
          },
          validate:{
              doc_deg_name: {isValid:true, message: ''},
              doc_deg_passing_year: {isValid:true, message: ''},
              doc_deg_institute: {isValid:true, message: ''}
          }
      }
    }
  }

  /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to set props in state on view page
   *                        and after update again set state.
   * @param Object props    get props for edit mode
   * @return                Nothing
   */
  componentWillReceiveProps(nextProps){
    if(nextProps.afterUpdate){
      this.setState({
        degree : {
          detail:{
            'doc_deg_id':  nextProps.detail.doc_deg_id,
            'doc_deg_name': nextProps.detail.doc_deg_name,
            'doc_deg_passing_year': String(nextProps.detail.doc_deg_passing_year),
            'doc_deg_institute': String(nextProps.detail.doc_deg_institute),
          },
          validate:{
              doc_deg_name: {isValid:true, message: ''},
              doc_deg_passing_year: {isValid:true, message: ''},
              doc_deg_institute: {isValid:true, message: ''}
          }
        }
      })
    }else{
      this.setState({
          degree : {
          detail:{
            'doc_deg_id':  nextProps.degreeEditDetail.doc_deg_id,
            'doc_deg_name': nextProps.degreeEditDetail.doc_deg_name,
            'doc_deg_passing_year': String(nextProps.degreeEditDetail.doc_deg_passing_year),
            'doc_deg_institute': String(nextProps.degreeEditDetail.doc_deg_institute),
          },
          validate:{
              doc_deg_name: {isValid:true, message: ''},
              doc_deg_passing_year: {isValid:true, message: ''},
              doc_deg_institute: {isValid:true, message: ''}
          }
        }
      })
    }
      if(nextProps.editSuccessMessage){
          setTimeout(function() {
              this.handleClose();
          }.bind(this), 2000);
      }
  }

  /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to handle close edit degree model
   * @return                Nothing
   */
  handleClose() {
    const { dispatch }  = this.props;
    dispatch(doctorDegreeActions.resetState());
    this.props.refreshDoctorProfile();
    this.props.degreeEditHideHandle();
  }
  /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to set state for onchange on view page
   *                         so we can type in form.
   * @return                Nothing
   */
  handleChange(event) {
    const { name, value } = event.target;
    const { detail,validate } = this.state.degree;
    this.setState({
        degree: {
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
    * @DateOfCreation        24 May 2018
    * @ShortDescription      This function is responsible to handle changes in Select state
    * @param                 Event Object
    * @return                Nothing
    */
    handleSelectChange(selectedOption, name) {
        const { detail, validate }  = this.state.degree;
        this.setState({
            degree : {
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
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to update degree detail.
   * @return                Nothing
   */
  handleSubmit(){
   if(doctorDegreeValidator.isDegreeValid(this)){
      const { detail } = this.state.degree;
      const { dispatch } = this.props;
      dispatch(doctorDegreeActions.degreeUpdate(detail,this.props.degrees));
    }
  }

   /**
    * @DateOfCreation        29 May 2018
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
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to include edit degree view.
   * @return                Nothing
   */
  render() {
    return(
      <div>
        <DoctorEducationDegreeEdit
          handleChange={this.handleChange}
          payload = {this.state.degree}
          degreeEditShow = {this.props.degreeEditShow}
          handleClose = {this.handleClose}
          handleSubmit = {this.handleSubmit}
          editMessage = {this.props.editSuccessMessage}
          sendingRequest = { this.props.sendingRequest }
          errorMsg = { this.props.errorMsg }
          handleSelectChange = {this.handleSelectChange}
        />
      </div>
    );
  }
}

/**
 * @DateOfCreation        22 May 2018
 * @ShortDescription      connect state to props on reducer and get state for add degree
 * @param Object state    All the state has come from reducer, based on after update we can set state in edit and update mode
 * @return  object        degree list, sending request message, after update  and success message
 */
function mapStateToProps(state) {
  const { isUserNotValid,editSuccessMessage,sendingRequest,afterUpdate,detail, degrees,errorMsg } = state.doctorDegree;
  return {
      isUserNotValid,
      editSuccessMessage,
      sendingRequest,
      afterUpdate,
      detail,
      degrees,
      errorMsg
  };
}
const connectedDoctorEducationDegreeEditContainer = connect(mapStateToProps)(DoctorEducationDegreeEditContainer);
export { connectedDoctorEducationDegreeEditContainer as DoctorEducationDegreeEditContainer };