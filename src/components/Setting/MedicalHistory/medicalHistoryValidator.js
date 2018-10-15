/**
 * medicalHistoryValidator
 *
 * @package                SafeHealth
 * @subpackage             medicalHistoryValidator
 * @category               Validator
 * @DateOfCreation         15 May 2018
 * @ShortDescription       This is responsible for doctor disease validation rules
 */

import validator from 'validator';
import { utilityHelper } from './../../../_helpers';

export const medicalHistoryValidator = {
    isDiseaseValid,
};


/**
* @DateOfCreation        15 May 2018
* @ShortDescription      This function is responsible to validate doctor disease data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function isDiseaseValid(that) {
    const { detail, validate } = that.state.disease;
    const validationState = {};
    const numericReg = /^[0-9]*$/; //numeric
    const alphaNumericReg = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i; //alphanumeric
    if (validator.isEmpty(validator.trim(detail.disease_name))) {
      validationState.disease_name = {
            isValid: false,
            message: 'Disease name is required.'
        }
    }
    if(!utilityHelper.isObjectEmpty(validationState)){
        that.setState({
            disease: {
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