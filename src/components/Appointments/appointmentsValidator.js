/**
 * appointmentsValidator
 *
 * @package                SafeHealth
 * @subpackage             appointmentsValidator
 * @category               Validator
 * @DateOfCreation         28 May 2018
 * @ShortDescription       This is responsible for doctor appointments validation rules
 */
import validator from 'validator';
import { utilityHelper } from '../../_helpers';

export const appointmentsValidator = {
    isAppointmentValid,
};

/**
* @DateOfCreation        28 May 2018
* @ShortDescription      This function is responsible to validate doctor appointments data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function isAppointmentValid(that) {
    const { detail } = that.state.appointment;
    const { validate } = that.state.appointment;
    const validationState = {};
    if (validator.isEmpty(validator.trim(String(detail.pat_id)))) {
        validationState.pat_id = {
            isValid : false,
            message : 'Patient name is required.'
        }
    }
    if (validator.isEmpty(validator.trim(String(detail.booking_reason)))) {
        validationState.booking_reason = {
            isValid : false,
            message : 'Booking reason is required.'
        }
    }
/*
    if (validator.isEmpty(validator.trim(String(detail.booking_date)))) {
        validationState.booking_date = {
            isValid : false,
            message : 'Appointment date is required.'
        }
    }*/
    
    if (validator.isEmpty(validator.trim(String(detail.clinic_id)))) {
        validationState.clinic_id = {
            isValid : false,
            message : 'Clinic name is required.'
        }
    }
    if (validator.isEmpty(validator.trim(String(detail.booking_time)))) {
        validationState.booking_time = {
            isValid : false,
            message : 'Appointment Time is required.'
        }
    }
    if(!utilityHelper.isObjectEmpty(validationState)) {
        that.setState({
            appointment : {
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