/**
 * doctorAwardsValidator
 *
 * @package                SafeHealth
 * @subpackage             doctorAwardsValidator
 * @category               Validator
 * @DateOfCreation         28 May 2018
 * @ShortDescription       This is responsible for doctor awards validation rules
 */
import validator from 'validator';
import { utilityHelper } from '../_helpers';

export const doctorAwardsValidator = {
    isAwardValid,
};

/**
* @DateOfCreation        28 May 2018
* @ShortDescription      This function is responsible to validate doctor awards data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function isAwardValid(that) {
    const { detail } = that.state.award;
    const { validate } = that.state.award;
    const validationState = {};
    if (validator.isEmpty(validator.trim(detail.doc_award_name))) {
        validationState.doc_award_name = {
            isValid : false,
            message : 'Award name is required.'
        }
    }
    if (validator.isEmpty(validator.trim(detail.doc_award_year))) {
        validationState.doc_award_year = {
            isValid : false,
            message : 'Award year is required.'
        }
    }
    if(!utilityHelper.isObjectEmpty(validationState)) {
        that.setState({
            award : {
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