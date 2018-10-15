/**
 * doctorReviewValidator
 *
 * @package                SafeHealth
 * @subpackage             doctorReviewValidator
 * @category               Validator
 * @DateOfCreation         15 May 2018
 * @ShortDescription       This is responsible for doctor appointment Category validation rules
 */

import validator from 'validator';
import { utilityHelper } from '../../../_helpers';

export const doctorReviewValidator = {
    isReviewValid,
};


/**
* @DateOfCreation        15 May 2018
* @ShortDescription      This function is responsible to validate doctor referral data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function isReviewValid(that) {
    const { rating, validate } = that.state.review;
    const validationState = {};
    if (validator.isEmpty(validator.trim(String(rating.comment)))) {
      validationState.comment = {
            isValid: false,
            message: 'Comment is required.'
        }
    }
     if(!utilityHelper.isObjectEmpty(validationState)){
        that.setState({
            review: {
                rating: {
                    ...rating
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