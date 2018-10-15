/**
 * consentFormsValidator
 *
 * @package                SafeHealth
 * @subpackage             consentFormsValidator
 * @category               Validator
 * @DateOfCreation         15 May 2018
 * @ShortDescription       This is responsible for doctor consentForm validation rules
 */

import validator from 'validator';
import { utilityHelper } from './../../../_helpers';

export const consentFormsValidator = {
    isConsentFormValid,
};


/**
* @DateOfCreation        15 May 2018
* @ShortDescription      This function is responsible to validate doctor consentForm data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function isConsentFormValid(that) {
    const { detail, validate } = that.state.consentForm;
    const validationState = {};
    const numericReg = /^[0-9]*$/; //numeric
    const alphaNumericReg = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i; //alphanumeric
    if (validator.isEmpty(validator.trim(detail.consent_form_title))) {
      validationState.consent_form_title = {
            isValid: false,
            message: 'Form title is required.'
        }
    }
    if (validator.isEmpty(validator.trim(detail.consent_form_content))) {
      validationState.consent_form_content = {
            isValid: false,
            message: 'Form content is required.'
        }
    }
    if(!utilityHelper.isObjectEmpty(validationState)){
        that.setState({
            consentForm: {
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