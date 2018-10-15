/**
 * experienceValidator
 *
 * @package                SafeHealth
 * @subpackage             experienceValidator
 * @category               Validator
 * @DateOfCreation         18 May 2018
 * @ShortDescription       This is responsible for Doctor experience validation rules
 */

import { doctorExperienceConstants } from '../_constants';
import validator from 'validator';
import { utilityHelper } from '../_helpers';

export const experienceValidator = {
    isExperienceValid
};


/**
* @DateOfCreation        18 May 2018
* @ShortDescription      This function is responsible to validate Experience data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function isExperienceValid(that) {
    const { experience } = that.state.doctor;
    const { experienceValidate } = that.state.doctor;
    const validationState = {};

    if (validator.isEmpty(validator.trim(experience.doc_exp_organisation_name))) {        
      validationState.doc_exp_organisation_name = {
            isValid: false,
            message: 'Organisation name is required'
        }
    }

    if (validator.isEmpty(validator.trim(experience.doc_exp_designation))) {        
      validationState.doc_exp_designation = {
            isValid: false,
            message: 'Designation is required'
        }
    }

    if (validator.isEmpty(validator.trim(experience.doc_exp_start_year))) {        
      validationState.doc_exp_start_year = {
            isValid: false,
            message: 'Start year is required'
        }
    }

    if (validator.isEmpty(validator.trim(experience.doc_exp_start_month))) {        
      validationState.doc_exp_start_month = {
            isValid: false,
            message: 'Start month is required'
        }
    }

    if (validator.isEmpty(validator.trim(experience.doc_exp_end_year))) {        
      validationState.doc_exp_end_year = {
            isValid: false,
            message: 'End year is required'
        }
    }

    if (validator.isEmpty(validator.trim(experience.doc_exp_end_month))) {        
      validationState.doc_exp_end_month = {
            isValid: false,
            message: 'Start month is required'
        }
    }

    if (validator.isEmpty(validator.trim(experience.doc_exp_organisation_type))) {        
      validationState.doc_exp_organisation_type = {
            isValid: false,
            message: 'Organisation type is required'
        }
    }
   
    if(!utilityHelper.isObjectEmpty(validationState)){
        that.setState({
            doctor: {
                experience: {
                    ...experience
                },
                experienceValidate:{
                    ...experienceValidate,
                    ...validationState
                }
            }
        });
        return false;
    }else{
        return true;
    }
}

