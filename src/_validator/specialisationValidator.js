/**
 * specialisationValidator
 *
 * @package                SafeHealth
 * @subpackage             specialisationValidator
 * @category               Validator
 * @DateOfCreation         18 May 2018
 * @ShortDescription       This is responsible for Doctor specialization validation rules
 */

import { doctorSpecialisationConstants } from '../_constants';
import validator from 'validator';
import { utilityHelper } from '../_helpers';

export const specialisationValidator = {
    isSpecialisationValid
};


/**
* @DateOfCreation        31 May 2018
* @ShortDescription      This function is responsible to validate specialisation data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function isSpecialisationValid(that) {
    const { specialisation } = that.state.doctor;
    const { specialisationValidate } = that.state.doctor;
    const validationState = {};

    if (validator.isEmpty(validator.trim(specialisation.spl_id))) {        
      validationState.spl_id = {
            isValid: false,
            message: 'specialisation name is required'
        }
    }

    if(!utilityHelper.isObjectEmpty(validationState)){
        that.setState({
            doctor: {
                specialisation: {
                    ...specialisation
                },
                specialisationValidate:{
                    ...specialisationValidate,
                    ...validationState
                }
            }
        });
        return false;
    }else{
        return true;
    }
}

