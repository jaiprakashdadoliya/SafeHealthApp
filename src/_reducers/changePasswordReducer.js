import { changePasswordConstants,configConstants } from '../_constants';
/**
 * changePassword
 *
 * @package                SafeHealth
 * @subpackage             changePassword
 * @category               Reducers
 * @DateOfCreation         15 May 2018
 * @ShortDescription       This is responsible for all state related to User Change Password
 */
//Initial State on load state and intial action with their type
const initialState = {
  successMsg: false,
  errorMsg:false,
  isUserNotValid:false,
};
export function changePassword(state = initialState, action) {
  switch (action.type) {
    case changePasswordConstants.PASSWORD_SUCCESS:
      return {
        successMsg : action.success
      };
    case changePasswordConstants.PASSWORD_FAILURE:
      return {
        errorMsg : action.error
      };
    case configConstants.UNAUTHENTICATE:
      return {
            ...state,
            isUserNotValid : true,
            errorMsg       : false
          };
    case changePasswordConstants.PASSWORD_RESET:
      return {
                ...state,
                successMsg : false,
                errorMsg   : false,
             };
    default:
      return state
  }
}