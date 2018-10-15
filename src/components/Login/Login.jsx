import React from "react";
import { Link } from 'react-router-dom';
import { Alert, bsStyle } from 'react-bootstrap';

/**
 * Login
 *
 * @package                SafeHealth
 * @subpackage             Login
 * @category               Presentational Component
 * @DateOfCreation         09 May 2018
 * @ShortDescription       This component is reponsible to show the login form
 */
export const Login = (props) => {
    return (
        <div className="page-container">
            <div className={props.popup ? 'col-md-12 patient-login' : 'col-md-4 col-md-offset-4 login'}>
                <div className="before-login">
                    <div className="login-logo text-center">
                    <img src={require("../../assets/images/front-end-logo.png")} />
                    <small className="text-center">Enter your details below</small>
                    </div>
                    <div className="feilds-box">
                    {/* Show server side Error message */}
                    {props.errorMsg &&
                        <Alert bsStyle="danger">
                          {props.errorMsg}
                        </Alert>
                    } 
                    {props.isLoginDone && props.popup &&
                            <Alert bsStyle="success">
                              Login  successfully!!
                            </Alert>
                        }
                        <div className={props.payload.userValidate.user_username.isValid ? 'form-group' : 'form-group has-error'}>
                            <input  type="text" 
                                    name="user_username"
                                    onChange={props.handleInputChange}
                                    onKeyPress={props.handleEnterPressSubmit}
                                    value={props.payload.user_username}
                                    className="form-control" />
                            <label className="control-label">Email/Mobile</label>
                            <span className="help-block">{props.payload.userValidate.user_username.message}</span>

                        </div>
                        <div className={props.payload.userValidate.user_password.isValid ? 'form-group password-field' : 'form-group password-field has-error'}>
                            <input  type="password"
                                    name="user_password"
                                    onChange={props.handleInputChange}
                                    onKeyPress={props.handleEnterPressSubmit}
                                    placeholder="*******"
                                    className="form-control"  
                                    />
                            <label className="control-label">Password</label>
                            <span className="help-block">{props.payload.userValidate.user_password.message}</span>
                        </div>                                
                        <div className="row">
                            <div className="col-md-8">
                                <p className="forgot-password">
                                    <Link to={'/forgotpassword'}>Forgot Password?</Link>
                                </p>
                                
                                <p className="signup">
                                    {!props.popup ? <Link to={'/register'}>Don't have an account?</Link> : <a href="javascript:void(0)" onClick={ props.openRegisterPopup } > Don't have an account?</a>
                                    }
                                </p>
                            </div>
                            <div className="col-md-4 text-right">
                                <a href="javascript:void(0);" disabled={props.submitted ? 'disabled' : ''}  className="btn green text-btn" 
                                    onClick={props.handleLoginSubmit}>{props.submitted ? 'Sending..' : 'Sign In'}</a>                                                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
