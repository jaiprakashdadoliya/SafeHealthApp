/**
 * manageStaffValidator
 *
 * @package                SafeHealth
 * @subpackage             manageStaffValidator
 * @category               Validator
 * @DateOfCreation         28 May 2018
 * @ShortDescription       This is responsible for doctor staff validation rules
 */
import validator from 'validator';
import { utilityHelper } from '../_helpers';

export const manageStaffValidator = {
    isStaffValid,
};

/**
* @DateOfCreation        28 May 2018
* @ShortDescription      This function is responsible to validate doctor staff data
* @param                 JSON jsonObj
* @return                JSON jsonObj
*/
function isStaffValid(that) {
    const { detail }    = that.state.staff;
    const { validate }  = that.state.staff;
    const adhaarRegex   = /^\d{12}$/;
    const passwordReg   = /^.*(?=.{3,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\d\X])(?=.*[!@$#%]).*$/; //numeric
    const validationState = {};

    if (validator.isEmpty(validator.trim(detail.user_firstname))) {
        validationState.user_firstname = {
            isValid : false,
            message : 'Staff first name is required.'
        }
    }

    if (validator.isEmpty(validator.trim(detail.user_lastname))) {
        validationState.user_lastname = {
            isValid : false,
            message : 'Staff last name is required.'
        }
    }

    if (validator.isEmpty(validator.trim(detail.user_gender_id))) {
        validationState.user_gender_id = {
            isValid : false,
            message : 'Staff gender is required.'
        }
    }

    if (validator.isEmpty(validator.trim(detail.user_mobile))) {
        validationState.user_mobile = {
            isValid : false,
            message : 'Staff mobile number is required.'
        }
    }else if (!validator.isMobilePhone(validator.trim(detail.user_country_code +''+ detail.user_mobile), 'any')) {        
        validationState.user_mobile = {
            isValid: false,
            message: 'Please enter a valid 10 digits mobile number.'
        }
    }else if (!validator.isNumeric(validator.trim(detail.user_mobile)) || (validator.trim(detail.user_mobile).length != 10)) {
        validationState.user_mobile = {
            isValid : false,
            message : 'Please enter a valid 10 digits mobile number.'
        }
    }

    if (validator.isEmpty(validator.trim(detail.user_type_id))) {
        validationState.user_type_id = {
            isValid : false,
            message : 'Staff role is required.'
        }
    }

    if (validator.isEmpty(validator.trim(detail.user_email))) {        
      validationState.user_email = {
            isValid: false,
            message: 'Email is required.'
        }
    }else if(validator.trim(detail.user_email) != ''){ 
        if (!validator.isEmail(validator.trim(detail.user_email))) {        
          validationState.user_email = {
                isValid: false,
                message: 'Please enter valid email address.'
            }
        }
    }

    if (validator.isEmpty(validator.trim(detail.user_password))) {        
      validationState.user_password = {
            isValid: false,
            message: 'Password is required.'
        }
    } else if(!passwordReg.test(validator.trim(detail.user_password))){
        validationState.user_password = {
            isValid: false,
            message: 'Password must have a minimum of 6 characters and contain at least one alphabetic character, one number and one special character.'
        }  
    } else if(!validator.isByteLength(validator.trim(detail.user_password), {min:6})){
        validationState.user_password = {
            isValid: false,
            message: 'Password must have a minimum of 6 characters and contain at least one alphabetic character, one number and one special character.'
        }
    }

    if (validator.isEmpty(validator.trim(detail.user_adhaar_number))) {        
        validationState.user_adhaar_number = {
            isValid: false,
            message: 'Aadhaar card number is required.'
        }
    }else if(!adhaarRegex.test(validator.trim(detail.user_adhaar_number))){
        validationState.user_adhaar_number = {
            isValid: false,
            message: 'Please enter a valid 12 digits aadhaar card number.'
        }
    }

    if(!utilityHelper.isObjectEmpty(validationState)) {
        that.setState({
            staff : {
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