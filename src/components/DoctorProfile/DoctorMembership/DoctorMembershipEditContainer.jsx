/**
 * DoctorMembershipEditContainer
 *
 * @package                SafeHealth
 * @subpackage             DoctorMembershipEditContainer
 * @category               Container Component
 * @DateOfCreation         11 May 2018
 * @ShortDescription       This component is reponsible for edit membership
 */
import React from "react";
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { utilityHelper } from '../../../_helpers';
import { DoctorMembershipEdit } from './DoctorMembershipEdit';
import { doctorMembershipActions, headerActions } from '../../../_actions';
import { doctorMembershipValidator } from '../../../_validator';

class DoctorMembershipEditContainer extends React.Component 
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
      membership : {
        detail:{
          'doc_mem_name': '',
          'doc_mem_year': '',
          'doc_mem_no': ''
        },
        validate:{
          doc_mem_name: {isValid:true, message: ''},
          doc_mem_year: {isValid:true, message: ''},
          doc_mem_no: {isValid:true, message: ''}
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
        membership : {
          detail:{
            'doc_mem_id':  nextProps.detail.doc_mem_id,
            'doc_mem_name': nextProps.detail.doc_mem_name,
            'doc_mem_year': String(nextProps.detail.doc_mem_year),
            'doc_mem_no': String(nextProps.detail.doc_mem_no),
          },
          validate:{
            doc_mem_name: {isValid:true, message: ''},
            doc_mem_year: {isValid:true, message: ''},
            doc_mem_no: {isValid:true, message: ''}
          }
        }
      })
    }else{
      this.setState({
        membership : {
          detail:{
            'doc_mem_id':  nextProps.membershipEditDetail.doc_mem_id,
            'doc_mem_name': nextProps.membershipEditDetail.doc_mem_name,
            'doc_mem_year': String(nextProps.membershipEditDetail.doc_mem_year),
            'doc_mem_no': String(nextProps.membershipEditDetail.doc_mem_no),
          },
          validate:{
            doc_mem_name: {isValid:true, message: ''},
            doc_mem_year: {isValid:true, message: ''},
            doc_mem_no: {isValid:true, message: ''}
          }
        }
      })
    }
  
    if(nextProps.editSuccessMessage && nextProps.afterUpdate){
          setTimeout(function() { 
            this.handleClose();
        }.bind(this), 2000);
    }
  }

  /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to handle close edit membership model
   * @return                Nothing
   */
  handleClose() {
    const { dispatch }  = this.props;
    dispatch(doctorMembershipActions.resetState());
    this.props.membershipEditHideHandle();
  }
  /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to set state for onchange on view page
   *                         so we can type in form.
   * @return                Nothing
   */
  handleChange(event) {     
    const { name, value } = event.target;
    const { detail,validate } = this.state.membership;
    this.setState({
        membership: {
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
        const { detail, validate }  = this.state.membership;
        this.setState({
            membership : {
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
   * @ShortDescription      This function is responsible to update membership detail.
   * @return                Nothing
   */ 
  handleSubmit(){
   if(doctorMembershipValidator.isMembershipValid(this)){
      const { detail } = this.state.membership;
      const { dispatch } = this.props;
      dispatch(doctorMembershipActions.membershipUpdate(detail,this.props.membership));
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
   * @ShortDescription      This function is responsible to include edit membersip view.
   * @return                Nothing
   */ 
  render() { 
    return(
      <div>
        <DoctorMembershipEdit
          handleChange    = {this.handleChange}
          handleSelectChange = {this.handleSelectChange}
          payload         = {this.state.membership}
          handleClose     = {this.handleClose}
          handleSubmit    = {this.handleSubmit}
          editMessage     = {this.props.editSuccessMessage}
          sendingRequest  = { this.props.sendingRequest }
          errorMsg        = { this.props.errorMsg }
          membershipEditShow = {this.props.membershipEditShow}
        />
      </div>
    );
  }
}

/**
 * @DateOfCreation        22 May 2018
 * @ShortDescription      connect state to props on reducer and get state for add membership
 * @param Object state    All the state has come from reducer, based on after update we can set state in edit and update mode
 * @return  object        membership list, sending request message, after update  and success message
 */
function mapStateToProps(state) {
  const { isUserNotValid,editSuccessMessage,sendingRequest,afterUpdate,detail,membership,errorMsg } = state.doctorMembership;
  return {
      isUserNotValid,
      editSuccessMessage,
      sendingRequest,
      afterUpdate,
      detail,
      membership,
      errorMsg
  };
}
const connectedDoctorMembershipEditContainer = connect(mapStateToProps)(DoctorMembershipEditContainer);
export { connectedDoctorMembershipEditContainer as DoctorMembershipEditContainer }; 