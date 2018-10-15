/**
 * doctorProfileValidator
 *
 * @package                SafeHealth
 * @subpackage             doctorProfileValidator
 * @category               Validator
 * @DateOfCreation         15 May 2018
 * @ShortDescription       This is responsible for user validation rules
 */

import validator from 'validator';
import { utilityHelper } from '../_helpers';

export const doctorProfileValidator = {
    isDoctorValid,
};


/**
* @DateOfCreation        15 May 2018
* @ShortDescription      This function is responsible to validate user data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function isDoctorValid(that) {
    const { detail, validate } = that.state.user;
    const validationState = {};
    const numericReg = /^[0-9]*$/; //numeric
    if (validator.isEmpty(validator.trim(String(detail.user_firstname)))) {
      validationState.user_firstname = {
            isValid: false,
            message: 'First name is required.'
        }
    }
    if (validator.isEmpty(validator.trim(String(detail.user_lastname)))) {
      validationState.user_lastname = {
            isValid: false,
            message: 'Last name is required.'
        }
    }
    if (validator.isEmpty(validator.trim(String(detail.doc_consult_fee)))) {        
        validationState.doc_consult_fee = {
            isValid: false,
            message: 'Consult fee is required.'
        }
    }else if(!numericReg.test(validator.trim(String(detail.doc_consult_fee)))){
        validationState.doc_consult_fee = {
            isValid: false,
            message: 'Consult fee is numeric only.'
        }  
    }
    if (validator.isEmpty(validator.trim(String(detail.doc_consult_fee)))) {        
        validationState.doc_consult_fee = {
            isValid: false,
            message: 'Consult fee is required.'
        }
    }else if(!numericReg.test(validator.trim(String(detail.doc_consult_fee)))){
        validationState.doc_consult_fee = {
            isValid: false,
            message: 'Consult fee is numeric only.'
        }  
    }
    if (validator.isEmpty(validator.trim(String(detail.user_mobile)))) {        
        validationState.user_mobile = {
            isValid: false,
            message: 'Mobile number is required.'
        }
    }else if(!numericReg.test(validator.trim(String(detail.user_mobile)))){
        validationState.user_mobile = {
            isValid: false,
            message: 'Mobile number is numeric only.'
        }  
    }
    if (validator.isEmpty(validator.trim(String(detail.doc_address_line1)))) {
        validationState.doc_address_line1 = {
            isValid: false,
            message: 'Address Line 1 is required.'
        }
    }
    if (validator.isEmpty(validator.trim(String(detail.city_id)))) {
        validationState.city_id = {
            isValid: false,
            message: 'City is required.'
        }
    }
    if (validator.isEmpty(validator.trim(String(detail.state_id)))) {
        validationState.state_id = {
            isValid: false,
            message: 'State is required.'
        }
    }
    if (validator.isEmpty(validator.trim(String(detail.doc_reg_num)))) {
        validationState.doc_reg_num = {
            isValid: false,
            message: 'Registration number required.'
        }
    }
   
    if(!utilityHelper.isObjectEmpty(validationState)){
        that.setState({
            user: {
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