/**
 * doctorRegistrationValidator
 *
 * @package                SafeHealth
 * @subpackage             doctorRegistrationValidator
 * @category               Validator
 * @DateOfCreation         15 May 2018
 * @ShortDescription       This is responsible for doctor registraiton validation rules
 */

import { doctorRegistrationConstants } from '../_constants';
import validator from 'validator';
import { utilityHelper } from '../_helpers';

export const doctorRegistrationValidator = {
    isDoctorValid,
    isOTPValid
};


/**
* @DateOfCreation        15 May 2018
* @ShortDescription      This function is responsible to validate doctor data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function isDoctorValid(that) {
    const { doctor } = that.state.registration;
    const { doctorValidate } = that.state.registration;
    const validationState = {};
    const adhaarRegex = /^\d{12}$/;
    const passwordReg = /^.*(?=.{3,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\d\X])(?=.*[!@$#%]).*$/; //numeric

    if (validator.isEmpty(validator.trim(doctor.user_firstname))) {        
      validationState.user_firstname = {
            isValid: false,
            message: 'First name is required.'
        }
    }
    
    if (validator.isEmpty(validator.trim(doctor.user_lastname))) {        
      validationState.user_lastname = {
            isValid: false,
            message: 'Last name is required.'
        }
    }
    
    if (validator.isEmpty(validator.trim(doctor.user_gender))) {        
      validationState.user_gender = {
            isValid: false,
            message: 'Gender is required.'
        }
    }
    
    if (validator.isEmpty(validator.trim(doctor.user_mobile))) {
        validationState.user_mobile = {
            isValid : false,
            message : 'Mobile number is required.'
        }
    }else if (!validator.isMobilePhone(validator.trim(doctor.user_country_code +''+ doctor.user_mobile), 'any')) {        
      validationState.user_mobile = {
            isValid: false,
            message: 'Please enter a valid 10 digits mobile number.'
        }
    }else if (!validator.isNumeric(validator.trim(doctor.user_mobile)) || (validator.trim(doctor.user_mobile).length != 10)) {
        validationState.user_mobile = {
            isValid : false,
            message : 'Please enter a valid 10 digits mobile number.'
        }
    }

    if (validator.isEmpty(validator.trim(doctor.user_email))) {        
      validationState.user_email = {
            isValid: false,
            message: 'Email is required.'
        }
    }else if(validator.trim(doctor.user_email) != ''){ 
        if (!validator.isEmail(validator.trim(doctor.user_email))) {        
          validationState.user_email = {
                isValid: false,
                message: 'Please enter valid email address.'
            }
        }
    }
    
    if (validator.isEmpty(validator.trim(doctor.user_password))) {        
      validationState.user_password = {
            isValid: false,
            message: 'Password is required.'
        }
    } else if(!passwordReg.test(validator.trim(doctor.user_password))){
        validationState.user_password = {
            isValid: false,
            message: 'Password must have a minimum of 6 characters and contain at least one alphabetic character, one number and one special character.'
        }  
    } else if(!validator.isByteLength(validator.trim(doctor.user_password), {min:6})){
        validationState.user_password = {
            isValid: false,
            message: 'Password must have a minimum of 6 characters and contain at least one alphabetic character, one number and one special character.'
        }
    }

    if (validator.isEmpty(validator.trim(doctor.user_adhaar_number))) {        
        validationState.user_adhaar_number = {
            isValid: false,
            message: 'Aadhaar card number is required.'
        }
    }else if(!adhaarRegex.test(validator.trim(doctor.user_adhaar_number))){
        validationState.user_adhaar_number = {
            isValid: false,
            message: 'Please enter a valid 12 digits aadhaar card number.'
        }
    }
    if(!utilityHelper.isObjectEmpty(validationState)){
        that.setState({
            registration: {
                doctor: {
                    ...doctor
                },
                doctorValidate:{
                    ...doctorValidate,
                    ...validationState
                }
            }
        });
        return false;
    }else{
        return true;
    }
}


/**
* @DateOfCreation        15 May 2018
* @ShortDescription      This function is responsible to validate otp
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function isOTPValid(that){
    const { doctor } = that.state.registration;
    const { doctorValidate } = that.state.registration;
    const validationState = {};
    if (validator.isEmpty(validator.trim(doctor.user_otp))) {        
      validationState.user_otp = {
            isValid: false,
            message: 'OTP is required.'
        }
    }
    
    
    if(!utilityHelper.isObjectEmpty(validationState)){
        that.setState({
            registration: {
                doctor: {
                    ...doctor
                },
                doctorValidate:{
                    ...doctorValidate,
                    ...validationState
                }
            }
        });
        return false;
    }else{
        return true;
    }
}