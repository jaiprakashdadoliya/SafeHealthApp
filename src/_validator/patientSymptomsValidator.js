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

export const patientSymptomsValidator = {
    isPatientSymptomsValid
};


/**
* @DateOfCreation        18 May 2018
* @ShortDescription      This function is responsible to validate Experience data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function isPatientSymptomsValid(that) {
    const { symptom } = that.state.patient;
    const { symptomValidate } = that.state.patient;
    const validationState = {};

    if (validator.isEmpty(validator.trim(symptom.symptom_name))) {        
        validationState.symptom_name = {
            isValid: false,
            message: 'Symptom name  is required'
        }
    }
    if (typeof symptom.since_date === 'object' && symptom.since_date === null ) {        
        validationState.since_date = {
            isValid: false,
            message: 'Since date is required'
        }
    }else if(typeof symptom.since_date !== 'object' &&  (symptom.since_date === null || symptom.since_date === '')){
        validationState.since_date = {
            isValid: false,
            message: 'Since date is required'
        }

    }

       
    if(!utilityHelper.isObjectEmpty(validationState)){
        that.setState({
            patient: {
                symptom: {
                    ...symptom
                },
                symptomValidate:{
                    ...symptomValidate,
                    ...validationState
                }
            }
        });
        return false;
    }else{
        return true;
    }
}