/**
 * updatePatientProfileValidator
 *
 * @package                ILD INDAIA REGISTERY
 * @subpackage             updatePatientProfileValidator
 * @category               Validator
 * @DateOfCreation         15 JUNE 2018
 * @ShortDescription       This is responsible for new patient validation rules
 */
import validator from 'validator';
import { utilityHelper } from '../_helpers';

export const updatePatientProfileValidator = {
    isUpdateProfileValid
};

/**
* @DateOfCreation        18 May 2018
* @ShortDescription      This function is responsible to validate Experience data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function isUpdateProfileValid(that) {
    const { profile } = that.state.patient;
    const { profileValidate } = that.state.patient;
    const validationState = {};

    if (validator.isEmpty(validator.trim(profile.user_gender))) { 
        validationState.user_gender = {
            isValid: false,
            message: 'Patient gender is required'
        }
    }

    if (validator.isEmpty(validator.trim(profile.user_email))) {
         validationState.user_email = {
            isValid: false,
            message: 'Patient email is required'
        }
    }

    if(validator.trim(profile.user_email) != ''){ 
        if (!validator.isEmail(profile.user_email)) {
            validationState.user_email = {
                isValid: false,
                message: 'Please enter valid email address.'
            }
        }
    }

    if (validator.isEmpty(validator.trim(profile.user_mobile))) {
        validationState.user_mobile = {
            isValid: false,
            message: 'Patient mobile number is required'
        }
    }

    if (validator.isEmpty(validator.trim(profile.pat_address_line1))) {
        validationState.pat_address_line1 = {
            isValid: false,
            message: 'Patient address line1 is required'
        }
    }

    if (validator.isEmpty(validator.trim(profile.city_id))) {
        validationState.city_id = {
            isValid: false,
            message: 'Patient city is required'
        }
    }

    if (validator.isEmpty(validator.trim(profile.state_id))) {
        validationState.state_id = {
            isValid: false,
            message: 'Patient state is required'
        }
    }

    if (validator.isEmpty(validator.trim(profile.pat_title))) {
        validationState.pat_title = {
            isValid: false,
            message: 'Patient title is required'
        }
    } 

    if ((profile.pat_dob === null)) {
        validationState.pat_dob = {
            isValid: false,
            message: 'Patient DOB is required'
        }
    } 
   
    if(!utilityHelper.isObjectEmpty(validationState)){
        that.setState({
            patient: {
                profile: {
                    ...profile
                },
                profileValidate:{
                    ...profileValidate,
                    ...validationState
                }
            }
        });
        return false;
    }else{
        return true;
    }
}