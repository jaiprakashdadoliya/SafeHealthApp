/**
 * forgotPasswordValidator
 *
 * @package                ILD India Registry
 * @subpackage             forgotPasswordValidator
 * @category               Validator
 * @DateOfCreation         24 May 2018
 * @ShortDescription       This is responsible for forgot Password validation rules
 */

import validator from 'validator';
import { utilityHelper } from '../_helpers';

export const forgotPasswordValidator = {
    isForgotPasswordValid
};


/**
* @DateOfCreation        24 May 2018
* @ShortDescription      This function is responsible to validate forgot data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function isForgotPasswordValid(that) {
    const { user } = that.state.forgotPassword;
    const { userValidate } = that.state.forgotPassword;
    const validationState = {};

    // Check the input is number or email
    if (validator.isEmpty(validator.trim(user.user_username))) {        
      validationState.user_username = {
            isValid: false,
            message: 'Email/mobile is required.'
        }
    } else if (!validator.isInt(validator.trim(user.user_username))) {
        if(!validator.isEmail(validator.trim(user.user_username))){
            validationState.user_username = {
                isValid: false,
                message: 'Please enter a valid email/mobile.'
            }
        }     
    }
    else{
       if (user.user_username.length != 10) {
           validationState.user_username = {
                isValid: false,
                message: 'Please enter a valid email/mobile.'
            } 
       }
    }   
    
    if(!utilityHelper.isObjectEmpty(validationState)){
        that.setState({
            forgotPassword: {
                user: {
                    ...user
                },
                userValidate:{
                    ...userValidate,
                    ...validationState
                }
            }
        });
        return false;
    }else{
        return true;
    }
}

