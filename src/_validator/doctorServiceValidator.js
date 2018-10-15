/**
 * doctorServiceValidator
 *
 * @package                SafeHealth
 * @subpackage             doctorServiceValidator
 * @category               Validator
 * @DateOfCreation         15 May 2018
 * @ShortDescription       This is responsible for doctor service validation rules
 */

import validator from 'validator';
import { utilityHelper } from '../_helpers';

export const doctorServiceValidator = {
    isServiceValid,
};


/**
* @DateOfCreation        15 May 2018
* @ShortDescription      This function is responsible to validate doctor service data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function isServiceValid(that) {
    const { detail, validate } = that.state.service;
    const validationState = {};
    const numericReg = /^[0-9]*$/; //numeric
    const alphaNumericReg = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i; //alphanumeric
    if (validator.isEmpty(validator.trim(detail.srv_name))) {
      validationState.srv_name = {
            isValid: false,
            message: 'Service name is required.'
        }
    }
    if (validator.isEmpty(validator.trim(detail.srv_cost))) {
        validationState.srv_cost = {
            isValid: false,
            message: 'Service cost is required.'
        }
    }else if(!numericReg.test(validator.trim(detail.srv_cost))){
        validationState.srv_cost = {
            isValid: false,
            message: 'Service cost is numeric.'
        }
    }
    if (validator.isEmpty(validator.trim(detail.srv_duration))) {
        validationState.srv_duration = {
            isValid: false,
            message: 'Service duration is required.'
        }
    }else if(!numericReg.test(validator.trim(detail.srv_duration))){
        validationState.srv_duration = {
            isValid: false,
            message: 'Service duration is numeric.'
        }
    }
    if (validator.isEmpty(validator.trim(detail.srv_unit))) {
        validationState.srv_unit = {
            isValid: false,
            message: 'Service duration unit is required.'
        }
    }
    if(!utilityHelper.isObjectEmpty(validationState)){
        that.setState({
            service: {
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