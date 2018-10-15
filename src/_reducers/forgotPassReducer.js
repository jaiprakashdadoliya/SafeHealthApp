import { forgotConstants } from '../_constants';
/**
 * forgotPass
 *
 * @package                SafeHealth
 * @subpackage             forgotPass
 * @category               Reducers
 * @DateOfCreation         15 May 2018
 * @ShortDescription       This is responsible for all state related to User Forgot Password
 */
export function forgotPass(state = {}, action) {
  switch (action.type) {
    case forgotConstants.FORGOT_REQUEST:
      return { 
          submitted: true 
      };
    case forgotConstants.FORGOT_SUCCESS:
      return {
        successMsg : action.success
      };
    case forgotConstants.FORGOT_FAILURE:
      return {
        errorMsg : action.error
      };
    case forgotConstants.FORGOT_UPDATE_STATE:
        return {
            ...state,
            errorMsg      : false,
            submitted     : false
        }  
    default:
      return state
  }
}
