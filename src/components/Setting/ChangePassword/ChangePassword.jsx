import React from "react";
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { changePasswordValidator } from '../../../_validator';
import { changePasswordActions, headerActions } from '../../../_actions';
import { SideMenu } from '../../SideMenu';
import { HeaderContainer } from '../../Header';


/**
 * ChangePassword
 *
 * @package                SafeHealth
 * @subpackage             ChangePassword
 * @category               Component
 * @DateOfCreation         12 June 2018
 * @ShortDescription       This component is reponsible for change password
 */
class ChangePassword extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = this.initialState;
  }

  /**
   * @DateOfCreation        12 June 2018
   * @ShortDescription      This function is responsible to initialise state.
   * @return                Nothing
   */
  get initialState(){
    return {
      password : {
        detail : {
          user_old_password : '',
          user_password : '',
          user_confirm_password : '',
        },
        validate : {
          user_old_password : { isValid : true, message : '' },
          user_password : { isValid : true, message : '' },
          user_confirm_password : { isValid : true, message : '' },
        }
      }
    };
  }

  /**
   * @DateOfCreation        12 June 2018
   * @ShortDescription      This function is responsible to set state for onchange on view page
   *                         so we can type in form.
   * @return                Nothing
   */
  handleChange(event) { 
    const { name, value } = event.target;
    const { detail,validate } = this.state.password;
    this.setState({
        password: {
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
   * @ShortDescription      This function is responsible to submit password
   * @return                Nothing
   */
  handleSubmit(){
   if(changePasswordValidator.isPasswordValid(this)){ 
      const { detail } = this.state.password;
      const { dispatch } = this.props;
      dispatch(changePasswordActions.passwordUpdate(detail));
    }
  }

  /**
   * @DateOfCreation        12 June 2018
   * @ShortDescription      This function is responsible to reset form value and reset state.
   * @return                Nothing
   */
  handleReset(){
    this.setState(this.initialState);
  }

  /**
   * @DateOfCreation        12 June 2018
   * @ShortDescription      This function is responsible to reset state.
   * @return                Nothing
   */
  componentWillReceiveProps(nextProps){
    this.setState(this.initialState);
    if(nextProps.successMsg){
        setTimeout(function() { 
          const { dispatch }  = this.props;
          dispatch(changePasswordActions.resetState());
        }.bind(this), 2000);
    }

   }

  render() {
    return(
    <div className="page-container">
      <SideMenu/>
      <div className="main-content right-sidebar-remove">
       <HeaderContainer/>
        <div className="main-content">
          <div className="wrap-inner-content">
              <div className="col-md-12 rrp">
                <div className="inner-content">
                  <div className="table-wrap appointment-page">
                    {this.props.successMsg &&                     
                      <Alert bsStyle="success">
                        { this.props.successMsg }
                      </Alert>
                    }

                    {this.props.errorMsg &&                      
                        <Alert bsStyle="danger">
                          { this.props.errorMsg }
                        </Alert>
                    }
                    <div className="clearfix">
                        <div className="col-md-4">
                            <div className={this.state.password.validate.user_old_password.isValid ? 'form-group' : 'form-group has-error'}>
                                <input className="form-control" type="password" name="user_old_password" placeholder="********" onChange={this.handleChange} value={this.state.password.detail.user_old_password}/>
                                <label className="control-label">Old password</label>
                                <span className="help-block">{this.state.password.validate.user_old_password.message}</span>
                            </div>
                        </div>
                    </div>
                    <div className="clearfix">
                        <div className="col-md-4">
                            <div className={this.state.password.validate.user_password.isValid ? 'form-group' : 'form-group has-error'}>
                                <input className="form-control" type="password" name="user_password" placeholder="********" onChange={this.handleChange} value={this.state.password.detail.user_password}/>
                                <label className="control-label">New password</label>
                                <span className="help-block">{this.state.password.validate.user_password.message}</span>
                            </div>
                        </div>
                    </div>
                    <div className="clearfix">
                        <div className="col-md-4">
                            <div className={this.state.password.validate.user_confirm_password.isValid ? 'form-group' : 'form-group has-error'}>
                                <input className="form-control" type="password" name="user_confirm_password" placeholder="********" onChange={this.handleChange}  value={this.state.password.detail.user_confirm_password}/>
                                <label className="control-label">Confirm password</label>
                                <span className="help-block">{this.state.password.validate.user_confirm_password.message}</span>
                              </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <button className="yellow btn text-btn" id="dr_pass_reset" onClick={this.handleReset}>Reset</button>
                            <button className="green btn text-btn"  disabled={this.props.successMsg ? true : false}  onClick={this.handleSubmit}>Change</button>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
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
  const { isUserNotValid, successMsg, errorMsg } = state.changePassword;  
  return {
      isUserNotValid,
      successMsg,
      errorMsg  
  };
}
const connectedChangePassword = connect(mapStateToProps)(ChangePassword);
export { connectedChangePassword as ChangePassword };