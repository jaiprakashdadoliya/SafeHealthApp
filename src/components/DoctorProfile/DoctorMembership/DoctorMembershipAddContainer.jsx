/**
 * DoctorMembershipAddContainer
 *
 * @package                SafeHealth
 * @subpackage             DoctorMembershipAddContainer
 * @category               Container Component
 * @DateOfCreation         11 May 2018
 * @ShortDescription       This component is reponsible for add membership
 */
import React from "react";
import { connect } from 'react-redux';
import { utilityHelper } from '../../../_helpers';
import {Button, Modal} from 'react-bootstrap';
import {doctorMembershipActions, headerActions} from '../../../_actions';
import {DoctorMembershipAdd} from './DoctorMembershipAdd';
import {doctorMembershipValidator} from '../../../_validator';


class DoctorMembershipAddContainer extends React.Component 
{
  /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      Contructor is responsible to function declaration and define intial state
   * @param                 props
   * @return                Nothing
   */
  constructor(props, context) {
    super(props, context);
    this.state = this.initialState;
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
 }

  /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to set initial state
   * @return                Nothing
   */
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
      this.setState(this.initialState);
      if(nextProps.addSuccessMessage){
          setTimeout(function() { 
              this.handleClose();
          }.bind(this), 2000);
      }
  }
  /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to handle close add membership model
   * @return                Nothing
   */
  handleClose() {
    const { dispatch }  = this.props;
    dispatch(doctorMembershipActions.resetState());
    this.setState(this.initialState);  
    this.props.membershipAddHideHandle();
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
   * @ShortDescription      This function is responsible to save membership detail.
   * @return                Nothing
   */ 
  handleSave() {
    if(doctorMembershipValidator.isMembershipValid(this)){
      const { detail } = this.state.membership;
      const { dispatch } = this.props;    
      dispatch(doctorMembershipActions.membershipSave(detail));
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
   * @ShortDescription      This function is responsible to include add membersip view.
   * @return                Nothing
   */ 
  render() {
      return(
        <div>
          <DoctorMembershipAdd
            handleChange={this.handleChange}
            membershipAddShow = {this.props.membershipAddShow}
            payload = {this.state.membership}
            handleClose = {this.handleClose}
            handleSelectChange = {this.handleSelectChange}
            handleSave = {this.handleSave}
            addSuccessMessage = { this.props.addSuccessMessage }
            sendingRequest = { this.props.sendingRequest}
            errorMsg = { this.props.errorMsg }
          />
        </div>
      );
    }
  }


/**
 * @DateOfCreation        22 May 2018
 * @ShortDescription      connect state to props on reducer and get state for add membership
 * @param Object state    All the state has come from reducer
 * @return  object        membership list, sending request message and success message
 */
function mapStateToProps(state) {
  const { isUserNotValid,addSuccessMessage,sendingRequest, membership,errorMsg } = state.doctorMembership;
  return {
        isUserNotValid,
        addSuccessMessage,
        sendingRequest,
        membership,
        errorMsg
    };
}

const connectedDoctorMembershipAddContainer = connect(mapStateToProps)(DoctorMembershipAddContainer);
export { connectedDoctorMembershipAddContainer as DoctorMembershipAddContainer }; 