/**
 * RegisterContainer
 *
 * @package                SafeHealth
 * @subpackage             RegisterContainer
 * @category               Container Component
 * @DateOfCreation         11 May 2018
 * @ShortDescription       This component is reponsible for logic in registration
 */

import React from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {Register} from "./Register";
import { doctorRegistrationActions } from '../../_actions';
import { doctorRegistrationValidator } from '../../_validator';
import { configConstants } from '../../_constants';

class RegisterContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registration: {
                doctor: {
                    user_firstname: '',
                    user_lastname: '',
                    user_gender: '',
                    user_mobile: '',
                    user_email: '',
                    user_password:'',
                    user_adhaar_number: '',
                    user_otp:'',
                    user_country_code:'91',
                    send_otp:'',
                    user_type:''
                },
                doctorValidate: {
                    user_firstname: {isValid: true, message: ''},
                    user_lastname: {isValid: true, message: ''},
                    user_gender: {isValid: true, message: ''},
                    user_mobile: {isValid: true, message: ''},
                    user_email: {isValid: true, message: ''},
                    user_password:{isValid: true, message: ''},
                    user_adhaar_number:{isValid: true, message: ''},
                    user_otp:{isValid: true, message: ''},
                    user_country_code:{isValid: true, message: ''},
                }
            }
        };

        const { dispatch } = this.props;
        dispatch(doctorRegistrationActions.resetRegisteration());

        this.handleChange = this.handleChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.handleSendOTPSubmit = this.handleSendOTPSubmit.bind(this);
        this.handleRegistrationSubmit = this.handleRegistrationSubmit.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.handleCountryCodeChange = this.handleCountryCodeChange.bind(this);
        this.handleReSendOTPSubmit = this.handleReSendOTPSubmit.bind(this);
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.registrationDone){
            if (!this.props.popup) {
              this.props.history.push('/login');
            }else{
                setTimeout(function () {
                    this.props.registerHideHandle();
                }.bind(this), 1500);
            }
        }
    }

    /**
    * @DateOfCreation        11 May 2018
    * @ShortDescription      This function is responsible to handle changes in input state
    * @param                 Event Object
    * @return                Nothing
    */
    handleChange(event) {
        const { name, value } = event.target;
        const { doctor, doctorValidate } = this.state.registration;
        this.setState({
            registration: {
                doctorValidate:{
                    ...doctorValidate,
                    [name]: {
                        isValid: true,
                        message: ''
                    }
                },
                doctor: {
                    ...doctor,
                    send_otp:'y',
                    [name]: value
                }
            }
        });
    }

    /**
    * @DateOfCreation        11 May 2018
    * @ShortDescription      This function is responsible to handle changes in gender state
    * @param                 Event Object
    * @return                Nothing
    */
    handleGenderChange(selectedOption) {
        const { doctor, doctorValidate } = this.state.registration;
        this.setState({
            registration: {
                doctorValidate:{
                    ...doctorValidate,
                    user_gender: {
                        isValid: true,
                        message: ''
                    }
                },
                doctor: {
                    ...doctor,
                    send_otp:'y',
                    user_gender:selectedOption.value
                }
            }
        });
    }

    /**
    * @DateOfCreation        11 May 2018
    * @ShortDescription      This function is responsible to handle changes in country code state
    * @param                 Event Object
    * @return                Nothing
    */
    handleCountryCodeChange(selectedOption) {
        const { doctor, doctorValidate } = this.state.registration;
        this.setState({
            registration: {
                doctorValidate:{
                    ...doctorValidate,
                },
                doctor: {
                    ...doctor,
                    send_otp:'y',
                    user_country_code:selectedOption.value
                }
            }
        } );
    }

    /**
    * @DateOfCreation        11 May 2018
    * @ShortDescription      This function is responsible to send otp
    * @return                Nothing
    */
    handleSendOTPSubmit() {
        if(this.props.sendingotp){
            return false;
        }
        if(doctorRegistrationValidator.isDoctorValid(this)){
            const { dispatch } = this.props;
            const { doctor } = this.state.registration;
            var isotpsentReq = false;
            dispatch(doctorRegistrationActions.sendOTP(doctor, isotpsentReq));
        }
    }
    
    /**
    * @DateOfCreation        24 May 2018
    * @ShortDescription      This function is responsible to re send otp
    * @return                Nothing
    */
    handleReSendOTPSubmit() {
        if(this.props.sendingotp){
            return false;
        }
        
        const { doctor, doctorValidate } = this.state.registration;
        this.setState({
            registration: {
                doctorValidate:{
                    ...doctorValidate
                },
                doctor: {
                    ...doctor,
                    send_otp:'y'
                }
            }
        },function(){
            if(doctorRegistrationValidator.isDoctorValid(this)){
                const { dispatch } = this.props;
                const { doctor } = this.state.registration;
                var isotpsentReq = true;
                dispatch(doctorRegistrationActions.sendOTP(doctor, isotpsentReq));
            }            
        }.bind(this));
        
        
    }

    /**
    * @DateOfCreation        11 May 2018
    * @ShortDescription      This function is responsible to registration request
    * @return                Nothing
    */
    handleRegistrationSubmit() {
        var userType = '';
        if(this.props.user_type){
           userType = this.props.user_type;
        }else{
           userType = configConstants.USER_TYPE_DOCTOR;
        }
        if(this.props.sendingRegReq){
            return false;
        }
        if(doctorRegistrationValidator.isOTPValid(this)){
            const { dispatch } = this.props;
            const { doctor,doctorValidate } = this.state.registration;

            this.setState({
                registration: {
                    doctorValidate:{
                        ...doctorValidate,
                    },
                    doctor: {
                        ...doctor,
                        send_otp:'n',
                        user_type : userType
                    }
                }
            }, function () {
                 const { doctor } = this.state.registration;
                 dispatch(doctorRegistrationActions.registrationSubmit(doctor));
            });
        }
    }

    /**
    * @DateOfCreation        11 May 2018
    * @ShortDescription      This function is responsible to render registration form
    * @return                View
    */
    render() {
        return (
            <div >
                <Register
                    isotpsent = {this.props.isotpsent}
                    errorMsg = {this.props.errorMsg}
                    successMsg = {this.props.successMsg}
                    sendingotp = {this.props.sendingotp}
                    sendingRegReq = {this.props.sendingRegReq}
                    handleGenderChange ={this.handleGenderChange}
                    handleSendOTPSubmit = {this.handleSendOTPSubmit}
                    handleReSendOTPSubmit = {this.handleReSendOTPSubmit}
                    handleRegistrationSubmit = {this.handleRegistrationSubmit}
                    handleCountryCodeChange = {this.handleCountryCodeChange}
                    handleChange={this.handleChange}
                    payload = {this.state.registration}
                    popup   = {this.props.popup}
                    userType = {this.props.user_type}
                    registrationDone = {this.props.registrationDone}
                    openLoginPopup = {this.props.openLoginPopup}

                />
            </div>
        );
    }
}

/**
* @DateOfCreation        11 May 2018
* @ShortDescription      This function is responsible to map store state to props
* @return                View
*/
function mapStateToProps(state) {
    const { isotpsent, errorMsg, successMsg, registrationDone, sendingotp, sendingRegReq } = state.doctorRegistration;
    return {
        isotpsent,
        sendingotp,
        sendingRegReq,
        registrationDone,
        errorMsg,
        successMsg
    };
}

const connectedRegisterContainer = connect(mapStateToProps)(RegisterContainer);
export { connectedRegisterContainer as RegisterContainer };
