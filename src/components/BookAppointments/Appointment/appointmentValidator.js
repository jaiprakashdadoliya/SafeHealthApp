/**
 * appointmentValidator
 *
 * @package                SafeHealth
 * @subpackage             appointmentValidator
 * @category               Validator
 * @DateOfCreation         19 July 2018
 * @ShortDescription       This is responsible for doctor appointment validation rules
 */
import validator from 'validator';
import { utilityHelper } from '../../../_helpers';

export const appointmentValidator = {
    isAppointmentValid,
};

/**
* @DateOfCreation        19 July 2018
* @ShortDescription      This function is responsible to validate doctor appointment data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function isAppointmentValid(that,step) {
    const { detail } = that.state.appointment;
    const { validate } = that.state.appointment;
    const validationState = {};
    if(step == 1){
        let bookingReason = String(detail.booking_reason);
        if (validator.isEmpty(validator.trim(bookingReason))) {
            validationState.booking_reason = {
                isValid : false,
                message : 'Reason for appointment is required.'
            }
        }
    }else if(step == 2){
        if (!detail.payment_mode) {
            validationState.payment_mode = {
                isValid : false,
                message : 'Payment mode is required.'
            }
        }
        if (!detail.is_profile_visible) {
            validationState.is_profile_visible = {
                isValid : false,
                message : 'This check is required.'
            }
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