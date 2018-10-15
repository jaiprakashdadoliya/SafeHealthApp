/**
 * Register
 *
 * @package                SafeHealth
 * @subpackage             Register
 * @category               Presentational Component
 * @DateOfCreation         11 May 2018
 * @ShortDescription       This component is responsible to render doctor registration form
 */

import React from "react";
import { Link } from 'react-router-dom';
import { Alert, bsStyle } from 'react-bootstrap';
import Select from 'react-select';
import { configConstants } from '../../_constants';

export const Register = (props) => {
    var type = '';
    switch(props.userType){
        case configConstants.USER_TYPE_PATIENT:
         type = 'Patient';
         break;
        case configConstants.USER_TYPE_LAB_MANAGER:
         type = 'Laboratory';
         break;
        default:
         type = 'Doctor';
    }
  return(
    <div className="main-content">
        <div className={props.popup ? 'col-md-12 patient-login' : 'col-md-6 col-md-offset-3 login'}>
            <div className="before-login">
                <div className="register-logo text-center">
                    <img src={require("../../assets/images/front-end-logo.png")}/>
                </div>
                <h1 className="text-center">Sign up to <span>RxHealth</span> for {type}</h1>
                <small className="text-center">Enter your details below</small>
                <div>

                    <div className={props.isotpsent ? 'sh-hidden feilds-box' : 'feilds-box'} >
                        {props.errorMsg &&
                            <Alert bsStyle="danger">
                              {props.errorMsg}
                            </Alert>
                        }
                        <div className="row">
                            <div className="col-md-6">
                                <div className={props.payload.doctorValidate.user_firstname.isValid ? 'form-group' : 'form-group has-error'} >
                                    <input type="text" name="user_firstname" onChange={props.handleChange} value={props.payload.doctor.user_firstname} className="form-control" />
                                    <label className="control-label">First Name</label>
                                    <span className="help-block">{props.payload.doctorValidate.user_firstname.message}</span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={props.payload.doctorValidate.user_lastname.isValid ? 'form-group' : 'form-group has-error'}>
                                    <input type="text" name="user_lastname" onChange={props.handleChange} value={props.payload.doctor.user_lastname} className="form-control" />
                                    <label className="control-label">Last Name</label>
                                    <span className="help-block">{props.payload.doctorValidate.user_lastname.message}</span>
                                </div>
                            </div>
                            </div>
                            <div className="row">
                            <div className="col-md-6">
                                <div className={props.payload.doctorValidate.user_gender.isValid ? 'form-group' : 'form-group has-error'}>
                                    <Select
                                        name="user_gender"
                                        className="custom-select"
                                        value={props.payload.doctor.user_gender}
                                        clearable={false}
                                        searchable={false}
                                        placeholder="Select Gender"
                                        onChange={props.handleGenderChange}
                                        options={[
                                          { value: '1', label: 'Male' },
                                          { value: '2', label: 'Female' },
                                          { value: '3', label: 'Transgender' },
                                        ]}
                                      />
                                    <label className="control-label">Gender</label>
                                    <span className="help-block">{props.payload.doctorValidate.user_gender.message}</span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={props.payload.doctorValidate.user_mobile.isValid ? 'form-group' : 'form-group has-error'}>
                                    <label className="control-label">Mobile Number</label>
                                    <div className="row">
                                        <div className="col-xs-3 col-md-3 rpr">
                                            <div className="form-group">
                                                <Select
                                                    name="user_country_code"
                                                    className="custom-select country-code"
                                                    onChange={props.handleCountryCodeChange}
                                                    clearable={false}
                                                    searchable={false}
                                                    value={props.payload.doctor.user_country_code}
                                                    options={[
                                                        { value: '91', label: '+91'}
                                                    ]}
                                                    />
                                            </div>
                                        </div>

                                        <div className="col-xs-9 col-md-9 rpl">                                            
                                            <input type="text" name="user_mobile" onChange={props.handleChange} value={props.payload.doctor.user_mobile} className="form-control" />
                                            <span className="text-right col-md-12 rpl rpr">(OTP will send on this number)</span>
                                        </div>
                                    </div>
                                    <span className="help-block">{props.payload.doctorValidate.user_mobile.message}</span>                                        
                                </div>
                            </div>
                            </div>
                            <div className="row">
                            <div className="col-md-6">
                                <div className={props.payload.doctorValidate.user_email.isValid ? 'form-group' : 'form-group has-error'}>
                                    <input type="text" name="user_email" onChange={props.handleChange} value={props.payload.doctor.user_email} className="form-control" />
                                    <label className="control-label">Email</label>
                                    <span className="help-block">{props.payload.doctorValidate.user_email.message}</span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={props.payload.doctorValidate.user_password.isValid ? 'form-group' : 'form-group has-error'}>
                                    <input type="password" name="user_password" onChange={props.handleChange} value={props.payload.doctor.user_password} className="form-control" placeholder="********"/>
                                    <label className="control-label">Password</label>
                                    <span className="help-block">{props.payload.doctorValidate.user_password.message}</span>
                                </div>
                            </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className={props.payload.doctorValidate.user_adhaar_number.isValid ? 'form-group' : 'form-group has-error'} >
                                        <input type="text" name="user_adhaar_number" onChange={props.handleChange} value={props.payload.doctor.user_adhaar_number} className="form-control" />
                                        <label className="control-label">Aadhaar Card Number</label>
                                        <span className="help-block">{props.payload.doctorValidate.user_adhaar_number.message}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                            <div className="col-md-6">
                                <div className="signup">
                                     {!props.popup ?
                                        <Link to={'/login'}>Already have an account?</Link>: <a href="javascript:void(0)" onClick={ props.openLoginPopup } > Already have an account?</a>

                                     }
                                </div>
                            </div>
                            <div className="col-md-6 text-right">
                                <a href="javascript:void(0);" className="btn green text-btn" disabled={props.sendingotp ? 'disabled' : ''} onClick={props.handleSendOTPSubmit}> {props.sendingotp ? 'Wait...' : 'Send OTP'}</a>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className={props.isotpsent ?  'feilds-box' : 'sh-hidden feilds-box'}>
                        {props.errorMsg &&
                            <Alert bsStyle="danger">
                              {props.errorMsg}
                            </Alert>
                        }

                        {props.successMsg &&
                            <Alert bsStyle="success">
                              {props.successMsg}
                            </Alert>
                        }
                        {props.registrationDone &&
                            <Alert bsStyle="success">
                              Registration completed successfully!!
                            </Alert>
                        }
                        <div className="row">
                            <div className="col-md-12">
                                <div className={props.payload.doctorValidate.user_otp.isValid ? 'form-group' : 'form-group has-error'}>
                                    <input type="password" name="user_otp" onChange={props.handleChange} value={props.payload.doctor.user_otp} className="form-control" placeholder="******"/>
                                    <label className="control-label">Enter your OTP</label>
                                    <span className="help-block">{props.payload.doctorValidate.user_otp.message}</span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="signup">
                                    <a href='javascript:void(0)' disabled={props.sendingotp ? 'disabled' : ''} onClick={props.handleReSendOTPSubmit}> {props.sendingotp ? 'Wait...' : 'Resend OTP'}</a>
                                </div>
                            </div>
                            <div className="col-md-6 text-right">
                                <a href="javascript:void(0);" className="btn green text-btn" disabled={props.registrationDone || props.sendingRegReq ? 'disabled' : ''} onClick={props.handleRegistrationSubmit}>{props.sendingRegReq ? 'Wait...' : 'Submit'}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
}
