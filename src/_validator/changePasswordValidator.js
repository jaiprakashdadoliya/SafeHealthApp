/**
 * changePasswordValidator
 *
 * @package                SafeHealth
 * @subpackage             changePasswordValidator
 * @category               Validator
 * @DateOfCreation         15 May 2018
 * @ShortDescription       This is responsible for reset doctor password validation rules
 */

import validator from 'validator';
import { utilityHelper } from '../_helpers';

export const changePasswordValidator = {
    isPasswordValid,
};


/**
* @DateOfCreation        15 May 2018
* @ShortDescription      This function is responsible to validate doctor password data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function isPasswordValid(that) {
    const { detail, validate } = that.state.password;
    const validationState = {};
    const passwordReg = /^.*(?=.{3,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\d\X])(?=.*[!@$#%]).*$/; //numeric
    if (validator.isEmpty(validator.trim(detail.user_old_password))) {        
      validationState.user_old_password = {
            isValid: false,
            message: 'Old password is required.'
        }
    }
    if (validator.isEmpty(validator.trim(detail.user_password))) {        
        validationState.user_password = {
            isValid: false,
            message: 'New password is required.'
        }
    }else if(!passwordReg.test(validator.trim(detail.user_password))){
        validationState.user_password = {
            isValid: false,
            message: 'Password must have a minimum of 6 characters and contain at least one alphabetic character, one number and one special character.'
        }  
    }else if(!validator.isByteLength(validator.trim(detail.user_password), {min:6})){
        validationState.user_password = {
            isValid: false,
            message: 'Password must have a minimum of 6 characters and contain at least one alphabetic character, one number and one special character.'
        }
    }
    if (validator.isEmpty(validator.trim(detail.user_confirm_password))) {        
        validationState.user_confirm_password = {
            isValid: false,
            message: 'Confirm password is required.'
        }
    }

    if (validator.trim(detail.user_password) != validator.trim(detail.user_confirm_password)) {        
        validationState.user_password = {
            isValid: false,
            message: 'New password and confirm password doesn`t match.'
        }
    }

    if(!utilityHelper.isObjectEmpty(validationState)){
        that.setState({
            password: {
                detail: {
                    ...detail
                },
                validate:{
                    ...validate,
                    ...validationState
                }
            }
        });
        return false;
    }else{
        return true;
    }
}