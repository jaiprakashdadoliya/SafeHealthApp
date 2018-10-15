import { headerConstants } from '../_constants';
/**
 * headerReducer
 *
 * @package                SafeHealth
 * @subpackage             headerReducer
 * @category               Reducers
 * @DateOfCreation         22 May 2018
 * @ShortDescription       This is responsible for all state related to Header actions
 */
export function headerReducer(state = {isLogoutDone: false}, action) {
  switch (action.type) {
    case headerConstants.LOGOUT_SUCCESS:
      return { 
      	isLogoutDone : true, 
      	successMsg : action.success 
      };
    case headerConstants.LOGOUT_FAILURE:
      return { 
      	isLogoutDone : false, 
      	errorMsg : action.error 
      };  
    default:
      return state
  }
}
