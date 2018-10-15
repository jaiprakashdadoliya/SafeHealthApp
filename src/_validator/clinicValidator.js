/**
 * clinicValidator
 *
 * @package                SafeHealth
 * @subpackage             clinicValidator
 * @category               Validator
 * @DateOfCreation         10 July 2018
 * @ShortDescription       This is responsible for doctor clinic validation rules
 */
import validator from 'validator';
import { utilityHelper } from '../_helpers';

export const clinicValidator = {
    isClinicValid,
};

/**
* @DateOfCreation        10 July 2018
* @ShortDescription      This function is responsible to validate doctor clinic data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function isClinicValid(that) {
    const { detail } = that.state.clinic;
    const { validate } = that.state.clinic;
    const validationState = {};
    if (validator.isEmpty(validator.trim(detail.clinic_name))) {
        validationState.clinic_name = {
            isValid : false,
            message : 'Clinic name is required.'
        }
    }
    if (validator.isEmpty(validator.trim(detail.clinic_phone))) {
        validationState.clinic_phone = {
            isValid : false,
            message : 'Clinic phone is required.'
        }
    }else if (!validator.isNumeric(validator.trim(detail.clinic_phone))) {
        validationState.clinic_phone = {
            isValid : false,
            message : 'Please enter a valid phone number.'
        }
    }
    if (validator.isEmpty(validator.trim(detail.clinic_address_line1))) {
        validationState.clinic_address_line1 = {
            isValid : false,
            message : 'Clinic address is required.'
        }
    }
    if (validator.isEmpty(validator.trim(detail.clinic_landmark))) {
        validationState.clinic_landmark = {
            isValid : false,
            message : 'Clinic landmark is required.'
        }
    }
    if (validator.isEmpty(validator.trim(detail.clinic_pincode))) {
        validationState.clinic_pincode = {
            isValid : false,
            message : 'Clinic pincode is required.'
        }
    }
    if(!utilityHelper.isObjectEmpty(validationState)) {
        that.setState({
            clinic : {
                detail : {
                    ...detail
                },
                validate : {
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