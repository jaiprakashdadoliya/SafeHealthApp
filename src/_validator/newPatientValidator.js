/**
 * newPatientValidator
 *
 * @package                ILD INDAIA REGISTERY
 * @subpackage             newPatientValidator
 * @category               Validator
 * @DateOfCreation         15 JUNE 2018
 * @ShortDescription       This is responsible for new patient validation rules
 */
import validator from 'validator';
import { utilityHelper } from '../_helpers';

export const newPatientValidator = {
    isNewPatientValid,
    isUpdateProfileValid
};


/**
* @DateOfCreation        18 May 2018
* @ShortDescription      This function is responsible to validate Experience data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function isNewPatientValid(that) {
    const { patientUser } = that.state.patient;
    const { patientValidate } = that.state.patient;
    const validationState = {};

   /* if (validator.isEmpty(validator.trim(patientUser.pat_recruitment_date))) {        
        validationState.pat_recruitment_date = {
            isValid: false,
            message: 'Patient Date of Recruitment is required'
        }
    }*/
    if (validator.isEmpty(validator.trim(patientUser.pat_gender))) {        
        validationState.pat_gender = {
            isValid: false,
            message: 'Patient gender is required'
        }
    }

    if (validator.isEmpty(validator.trim(patientUser.pat_email))) {        
         validationState.pat_email = {
            isValid: false,
            message: 'Patient email is required'
        }
    }

    if(validator.trim(patientUser.pat_email) != ''){ 
        if (!validator.isEmail(validator.trim(patientUser.pat_email))) {        
            validationState.pat_email = {
                isValid: false,
                message: 'Please enter valid email address.'
            }
        }
    }

    if (validator.isEmpty(validator.trim(patientUser.pat_mobile_num))) {        
        validationState.pat_mobile_num = {
            isValid: false,
            message: 'Patient mobile number is required'
        }
    }

    if(!utilityHelper.isObjectEmpty(validationState)){
        that.setState({
            patient: {
                patientUser: {
                    ...patientUser
                },
                patientValidate:{
                    ...patientValidate,
                    ...validationState
                }
            }
        });
        return false;
    }else{
        return true;
    }
}

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

    if (validator.isEmpty(validator.trim(profile.pat_gender))) { 
        validationState.pat_gender = {
            isValid: false,
            message: 'Patient gender is required'
        }
    }

    if (validator.isEmpty(validator.trim(profile.pat_email))) {        
         validationState.pat_email = {
            isValid: false,
            message: 'Patient email is required'
        }
    }

    if(validator.trim(profile.pat_email) != ''){ 
        if (!validator.isEmail(validator.trim(profile.pat_email))) {        
            validationState.pat_email = {
                isValid: false,
                message: 'Please enter valid email address.'
            }
        }
    }

    if (validator.isEmpty(validator.trim(profile.pat_mobile_num))) {        
        validationState.pat_mobile_num = {
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

    if (validator.isEmpty(validator.trim(profile.country_id))) {        
        validationState.country_id = {
            isValid: false,
            message: 'Patient country is required'
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