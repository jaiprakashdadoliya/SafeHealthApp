/**
 * doctorMembershipValidator
 *
 * @package                SafeHealth
 * @subpackage             doctorMembershipValidator
 * @category               Validator
 * @DateOfCreation         15 May 2018
 * @ShortDescription       This is responsible for doctor membership validation rules
 */

import validator from 'validator';
import { utilityHelper } from '../_helpers';

export const doctorMembershipValidator = {
    isMembershipValid,
};


/**
* @DateOfCreation        15 May 2018
* @ShortDescription      This function is responsible to validate doctor membership data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function isMembershipValid(that) {
    const { detail, validate } = that.state.membership;
    const validationState = {};
    const numericReg = /^[0-9]*$/; //numeric
    const alphaNumericReg = /(([a-z]+[0-9])|([A-Z]+[0-9])|([0-9]+[a-z])|([0-9]+[A-Z])|([0-9]+[a-z]+[A-Z])|([a-z]+[0-9]+[A-Z])|([a-z]+[A-Z]+[0-9])|([a-z][0-9]+[0-9])|([A-Z][0-9]+[0-9])|([0-9]+[0-9]+[A-Z])|([0-9]+[0-9]+[a-z]))+$/i; //alphanumeric

    if (validator.isEmpty(validator.trim(detail.doc_mem_name))) {        
      validationState.doc_mem_name = {
            isValid: false,
            message: 'Membership name is required.'
        }
    }
    if (validator.isEmpty(validator.trim(detail.doc_mem_year))) {        
      validationState.doc_mem_year = {
            isValid: false,
            message: 'Membership joining year is required.'
        }
    }
    if (validator.isEmpty(validator.trim(detail.doc_mem_no))) {        
        validationState.doc_mem_no = {
            isValid: false,
            message: 'Membership number is required.'
        }
    }else if(!alphaNumericReg.test(validator.trim(detail.doc_mem_no))){
        validationState.doc_mem_no = {
            isValid: false,
            message: 'Membership number is alpha numeric only.'
        }  
    }    
    if(!utilityHelper.isObjectEmpty(validationState)){
        that.setState({
            membership: {
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
