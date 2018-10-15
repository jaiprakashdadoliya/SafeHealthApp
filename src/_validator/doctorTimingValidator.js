/**
 * doctorTimingValidator
 *
 * @package                SafeHealth
 * @subpackage             doctorTimingValidator
 * @category               Validator
 * @DateOfCreation         18 May 2018
 * @ShortDescription       This is responsible for Doctor timing validation rules
 */

import { doctorTimingConstants } from '../_constants';
import validator from 'validator';
import { utilityHelper } from '../_helpers';

export const doctorTimingValidator = {
    isTimingValid
};


/**
* @DateOfCreation        18 May 2018
* @ShortDescription      This function is responsible to validate Timing data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function isTimingValid(that) {
    const { timing } = that.state.doctor;
    const { timingValidate } = that.state.doctor;
    const validationState = {};
    let clinic_id = timing.clinic_id.toString();
    if (validator.isEmpty(validator.trim(timing.week_day))) {        
      validationState.week_day = {
            isValid: false,
            message: 'Please select weekday'
        }
    }

     if (validator.isEmpty(validator.trim(timing.start_time)) && timing.start_time != 'off') {        
      validationState.start_time = {
            isValid: false,
            message: 'Start Time is required'
        }
    }

    if (validator.isEmpty(validator.trim(timing.end_time)) && timing.end_time != 'off') {        
        validationState.end_time = {
            isValid: false,
            message: 'End Time is required'
        } 
    }else if(timing.end_time != 'Off' && timing.end_time <= timing.start_time){
        validationState.end_time = {
            isValid: false,
            message: 'End Time must be greater than Start Time'
        }
    }
    if (validator.isEmpty(validator.trim(clinic_id)) && clinic_id != 'off') {        

        validationState.clinic_id = {
            isValid: false,
            message: 'Clinic is required'
        } 
    }

    if(!utilityHelper.isObjectEmpty(validationState)){
        that.setState({
            doctor: {
                timing: {
                    ...timing
                },
                timingValidate:{
                    ...timingValidate,
                    ...validationState
                }
            }
        });
        return false;
    }else{
        return true;
    }
}

