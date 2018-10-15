import { loginConstants } from '../_constants';
/**
 * userLogin
 *
 * @package                SafeHealth
 * @subpackage             userLogin
 * @category               Reducers
 * @DateOfCreation         10 May 2018
 * @ShortDescription       This is responsible for all state related to User login
 */
export function userLogin(state = {submitted: false}, action) {
  switch (action.type) {
    case loginConstants.LOGIN_REQUEST:
      return { 
        submitted: true 
      };
    case loginConstants.LOGIN_SUCCESS:
      return { 
        submitted: false, 
        isLoginDone : true
      };
    case loginConstants.LOGIN_FAILURE:
      return { 
        submitted: false, 
        errorMsg : action.error
      };
    case loginConstants.LOGOUT_SUCCESS:
      return { 
        submitted: false, 
        isLogoutDone : true, 
        successMsg : action.success 
      };
    case loginConstants.LOGOUT_FAILURE:
      return { 
        submitted: false, 
        isLogoutDone : false, 
        errorMsg : action.error 
      };
    case loginConstants.LOGIN_UPDATE_STATE:
      return {
        ...state,
        errorMsg      : false,
        submitted     : false
      }    
    default:
      return state
  }

}
