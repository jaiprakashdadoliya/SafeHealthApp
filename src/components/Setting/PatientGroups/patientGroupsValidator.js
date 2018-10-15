/**
 * patientGroupsValidator
 *
 * @package                SafeHealth
 * @subpackage             patientGroupsValidator
 * @category               Validator
 * @DateOfCreation         15 May 2018
 * @ShortDescription       This is responsible for doctor Patient Group validation rules
 */

import validator from 'validator';
import { utilityHelper } from '../../../_helpers';

export const patientGroupsValidator = {
    isGroupValid,
};


/**
* @DateOfCreation        15 May 2018
* @ShortDescription      This function is responsible to validate doctor service data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function isGroupValid(that) {
    const { detail, validate } = that.state.patientGroup;
    const validationState = {};
    if (validator.isEmpty(validator.trim(detail.pat_group_name))) {
      validationState.pat_group_name = {
            isValid: false,
            message: 'Group Name is required.'
        }
    }
     if(!utilityHelper.isObjectEmpty(validationState)){
        that.setState({
            patientGroup: {
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