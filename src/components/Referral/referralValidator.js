/**
 * referralValidator
 *
 * @package                SafeHealth
 * @subpackage             referralValidator
 * @category               Validator
 * @DateOfCreation         15 May 2018
 * @ShortDescription       This is responsible for doctor appointment Category validation rules
 */

import validator from 'validator';
import { utilityHelper } from '../../_helpers';

export const referralValidator = {
    isReferralValid,
};


/**
* @DateOfCreation        15 May 2018
* @ShortDescription      This function is responsible to validate doctor referral data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function isReferralValid(that) {
    const { detail, validate } = that.state.referral;
    const validationState = {};
    if (validator.isEmpty(validator.trim(detail.doc_ref_name))) {
      validationState.doc_ref_name = {
            isValid: false,
            message: 'Doctor name is required.'
        }
    }
     if(!utilityHelper.isObjectEmpty(validationState)){
        that.setState({
            referral: {
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