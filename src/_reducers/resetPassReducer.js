import { resetConstants } from '../_constants';

/**
 * resetPass
 *
 * @package                SafeHealth
 * @subpackage             resetPass
 * @category               Reducers
 * @DateOfCreation         15 May 2018
 * @ShortDescription       This is responsible for all state related to User Reset Password
 */
export function resetPass(state = {submitted: false}, action) {
  switch (action.type) {
    case resetConstants.RESET_REQUEST:
      return {
        submitted: true
      };
    case resetConstants.RESET_SUCCESS:
      return {
        submitted: false
      };
    case resetConstants.RESET_FAILURE:
      return {
        submitted: true,
        errorMsg : action.error
      };
    default:
      return state
  }
}
