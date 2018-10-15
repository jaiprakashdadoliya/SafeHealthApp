/**
 * doctorDegreeValidator
 *
 * @package                SafeHealth
 * @subpackage             doctorDegreeValidator
 * @category               Validator
 * @DateOfCreation         31 May 2018
 * @ShortDescription       This is responsible for doctor degree validation rules
 */

import validator from 'validator';
import { utilityHelper } from '../_helpers';

export const doctorDegreeValidator = {
    isDegreeValid,
};


/**
* @DateOfCreation        15 May 2018
* @ShortDescription      This function is responsible to validate doctor degree data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function isDegreeValid(that) {
    const { detail, validate } = that.state.degree;
    const validationState = {};
    if (validator.isEmpty(validator.trim(detail.doc_deg_name))) {
      validationState.doc_deg_name = {
            isValid: false,
            message: 'Degree name is required.'
        }
    }
    if (validator.isEmpty(validator.trim(detail.doc_deg_passing_year))) {
      validationState.doc_deg_passing_year = {
            isValid: false,
            message: 'Degree joining year is required.'
        }
    }
    if (validator.isEmpty(validator.trim(detail.doc_deg_institute))) {
        validationState.doc_deg_institute = {
            isValid: false,
            message: 'Institute name is required.'
        }
    }
    if(!utilityHelper.isObjectEmpty(validationState)){
        that.setState({
            degree: {
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