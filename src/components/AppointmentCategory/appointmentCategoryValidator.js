/**
 * appointmentCategoryValidator
 *
 * @package                SafeHealth
 * @subpackage             appointmentCategoryValidator
 * @category               Validator
 * @DateOfCreation         15 May 2018
 * @ShortDescription       This is responsible for doctor appointment Category validation rules
 */

import validator from 'validator';
import { utilityHelper } from '../../_helpers';

export const appointmentCategoryValidator = {
    isCategoryValid,
};


/**
* @DateOfCreation        15 May 2018
* @ShortDescription      This function is responsible to validate doctor service data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function isCategoryValid(that) {
    const { detail, validate } = that.state.appointmentCategory;
    const validationState = {};
    if (validator.isEmpty(validator.trim(detail.appointment_cat_name))) {
      validationState.appointment_cat_name = {
            isValid: false,
            message: 'Appointment Category is required.'
        }
    }
     if(!utilityHelper.isObjectEmpty(validationState)){
        that.setState({
            appointmentCategory: {
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