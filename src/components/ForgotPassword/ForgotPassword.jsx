import React from "react";
import { Link } from 'react-router-dom';
import { Alert, bsStyle } from 'react-bootstrap';
import { configConstants } from '../../_constants';

/**
 * ForgotPassword
 *
 * @package                SafeHealth
 * @subpackage             ForgotPassword
 * @category               Presentational Component
 * @DateOfCreation         16 May 2018
 * @ShortDescription       This component is reponsible to show the Forgot password form
 */
export const ForgotPassword = (props) => {
return (
	<div className="page-container">
        <div className="main-content">
            <div className="col-md-4 col-md-offset-4 login">
                <div className="before-login">
                    <div className="login-logo text-center">
                    <img src={require("../../assets/images/login-logo.png")} />
                </div>
                    <h1 className="text-center">Forgot Password <span>RxHealth</span></h1>
                    <small className="text-center">Enter your details below</small>

                    {/* Show server side Success message */}
                    {props.successMsg &&
                        <Alert bsStyle="success">
                            {props.successMsg}
                        </Alert>
                    }

                    {/* Show server side Error message */}
                    {props.errorMsg &&
                        <Alert bsStyle="danger">
                            {props.errorMsg}
                        </Alert>
                    }
                    <div className="feilds-box">
                        <div className={props.payload.userValidate.user_username.isValid ? 'form-group' : 'form-group has-error'}>
                            <input
                                type="text"
                                name="user_username"
                                onChange={props.handleInputChange}
                                value={props.user_username}
                                className="form-control"
                            />
                            <label className="control-label">Email/Mobile</label>
                            <span className="help-block">{props.payload.userValidate.user_username.message}</span>
                        </div>
                        <div className="row">
                            <div className="col-md-8">
                              <div className="signup">
                                <p><Link to={'/'}>Don't have an account?</Link></p>
                                <p><Link to={'/'}>Sign In?</Link></p>
                              </div>
                            </div>
                            <div className="col-md-4 text-right">
                            	<a href="javascript:void(0);"  disabled={props.submitted ? 'disabled' : ''} className="btn green text-btn" onClick={props.handleForgotSubmit}>{props.submitted ? 'Sending..' : 'Submit'}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        );
    }
