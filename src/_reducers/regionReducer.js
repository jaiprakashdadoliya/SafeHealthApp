import { regionConstants,configConstants } from '../_constants';

/**
 * region
 *
 * @package                ILD INDIA
 * @subpackage             region
 * @category               Reducers
 * @DateOfCreation         15 June 2018
 * @ShortDescription       This is responsible for all state related to region
 */
//Initial State on load state and intial action with their type
const initialState = {
  sendingRequest: false,
  successMessage: false,
  errorMsg:false,
  isUserNotValid:false
};
export function region(state = initialState, action) {
  switch (action.type) {
    case regionConstants.COUNTRY_REQUEST:
        return {
            ...state,
            sendingRequest  : true
        };
    case regionConstants.COUNTRY_FAILURE:
        return {
            ...state,
            sendingRequest  : false,
            errorMsg        : action.errorMsg
        };
    case regionConstants.COUNTRY_SUCCESS:
        return {
            ...state,
            sendingRequest  : false,
            country         : action.country
        };
    case regionConstants.STATES_REQUEST:
        return  { 
            ...state,
            sendingRequest  : true, 
            loader          : true
        };
    case regionConstants.STATES_SUCCESS:
        return  { 
            ...state,
            sendingRequest  : false, 
            loader          : false,
            states      : action.states
        };
    case regionConstants.STATES_FAILURE:
        return  { 
            ...state,
            sendingRequest  : false,
            loader          : false, 
            errorMsg        : action.errorMsg
        };
    case regionConstants.CITIES_REQUEST:
        return  { 
            ...state,
            sendingRequest  : true, 
            loader          : true,
            state_id        : action.state_id
        };
    case regionConstants.CITIES_SUCCESS:
        return  { 
            ...state,
            sendingRequest  : false, 
            loader          : false,
            cities      : action.cities
        };
    case regionConstants.CITIES_FAILURE:
        return  { 
            ...state,
            sendingRequest  : false,
            loader          : false, 
            errorMsg        : action.errorMsg
        };
    case configConstants.UNAUTHENTICATE:
        return {
            ...state,
            isUserNotValid : true,
            errorMsg       : false
        };
    case regionConstants.RESET_STATE:
        return {
            ...state,
            sendingRequest  : false,
            errorMsg        : false,
            successMessage  : false,
        };
    case regionConstants.RESET_CITY:
        return {
            ...state,
            sendingRequest  : false,
            errorMsg        : false,
            successMessage  : false,
        };
    default:
      return state
  }
}
