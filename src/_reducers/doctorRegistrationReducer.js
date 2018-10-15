/**
 * doctorRegistration
 *
 * @package                SafeHealth
 * @subpackage             doctorRegistration
 * @category               Reducers
 * @DateOfCreation         11 May 2018
 * @ShortDescription       This is responsible for all state related to doctor registration
 */

import { doctorRegistrationConstants } from '../_constants';

export function doctorRegistration(state = {}, action) {
  switch (action.type) {
    case doctorRegistrationConstants.DR_OTP_REQUEST:
      return { sendingotp: true, isotpsent: action.isotpsent, successMsg:''};
    case doctorRegistrationConstants.DR_OTP_SUCCESS:
      return { isotpsent: true, sendingotp:false, successMsg: action.successMsg};
    case doctorRegistrationConstants.DR_OTP_FAILURE:
      return { isotpsent: action.isotpsent, errorMsg : action.errorMsg, sendingotp:false};
    case doctorRegistrationConstants.DR_REG_REQUEST:
      return { sendingRegReq: true, isotpsent:true, successMsg:'' };
    case doctorRegistrationConstants.DR_REG_SUCCESS:
      return { registrationDone: true, isotpsent:true, sendingRegReq: false};
    case doctorRegistrationConstants.DR_REG_FAILURE:
      return { registrationDone: false,isotpsent:true, errorMsg : action.errorMsg, sendingRegReq: false};
    case doctorRegistrationConstants.CLICK_DR_REGISTER:
      return { isotpsent: false, sendingotp:false};
    default:
      return state
  }
}
