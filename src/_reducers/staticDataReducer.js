import { staticDataConstants,configConstants } from '../_constants';

/**
 * staticData
 *
 * @package                ILD INDIA
 * @subpackage             staticData
 * @category               Reducers
 * @DateOfCreation         22 June 2018
 * @ShortDescription       This is responsible for all state related to staticData
 */
//Initial State on load state and intial action with their type
const initialState = {
  errorMsg:false,
  staticDatafetched:false,
  isUserNotValid:false,
  staticData : []
};
export function staticData(state = initialState, action) {
  switch (action.type) {
    case staticDataConstants.STATIC_DATA_REQUEST:
        return {
            ...state,
            errorMsg  : false,
        };
    case staticDataConstants.STATIC_DATA_FAILURE:
        return {
            ...state,
            errorMsg        : action.errorMsg,
            staticDatafetched  : false,
        };
    case staticDataConstants.STATIC_DATA_SUCCESS:
        return {
            ...state,
            staticData         : action.result,
            staticDatafetched  : true,
        };
    case configConstants.UNAUTHENTICATE:
        return {
            ...state,
            isUserNotValid : true,
            errorMsg       : false,
            staticDatafetched  : false,
        };
    default:
      return {
            ...state
      }
  }
}
