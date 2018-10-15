import { doctorProfileConstants,configConstants } from '../_constants';

/**
 * doctorProfile
 *
 * @package                SafeHealth
 * @subpackage             doctorProfile
 * @category               Reducers
 * @DateOfCreation         16 May 2018
 * @ShortDescription       This is responsible for all state related to Doctor profile
 */
//Initial State on load state and intial action with their type
const initialState = {
  sendingRequest: false,
  successMessage: false,
  errorMsg:false,
  isUserNotValid:false,
  fetchRequest:false
};
export function doctorProfile(state = initialState, action) {
  switch (action.type) {
    case doctorProfileConstants.LOGGED_IN:
      return {
      	errorMsg: true
      };
    case doctorProfileConstants.LOGGED_OUT:
      return {
      	errorMsg: false
      };
    case doctorProfileConstants.DR_PROFILE_EDIT_SUCCESS:
      return  { 
                ...state,
                sendingRequest: true, 
                successMessage : action.detail.message,
                updatedDetail: action.detail.newDetail
              };
    case doctorProfileConstants.DR_PROFILE_EDIT_FAILURE:
      return  { 
                ...state,
                sendingRequest: false, 
                errorMsg : action.errorMsg
              };
    case doctorProfileConstants.DR_PROFILE_DETAIL_REQUEST:
      return  { 
                ...state,
                fetchRequest  : true, 
              };
    case doctorProfileConstants.DR_PROFILE_DETAIL_SUCCESS:
      return  { 
                 ...state,
                fetchRequest      : false, 
                loadView          : true,
                profileDetail     : action.detail
              };
    case doctorProfileConstants.DR_PROFILE_DETAIL_FAILURE:
      return  { 
                ...state,
                fetchRequest    : false,
                errorMsg        : action.errorMsg
              };
    case doctorProfileConstants.STATES_REQUEST:
      return  { 
                ...state,
                sendingRequest  : true, 
                loader          : true
              };
    case doctorProfileConstants.STATES_SUCCESS:
      return  { 
                ...state,
                sendingRequest  : false, 
                loader          : false,
                states          : action.states
              };
    case doctorProfileConstants.STATES_FAILURE:
      return  { 
                ...state,
                sendingRequest  : false,
                loader          : false, 
                errorMsg        : action.errorMsg
              };
    case doctorProfileConstants.CITIES_REQUEST:
      return  { 
                ...state,
                sendingRequest  : true, 
                loader          : true,
                state_id        : action.state_id
              };
    case doctorProfileConstants.CITIES_SUCCESS:
      return  { 
                ...state,
                sendingRequest  : false, 
                loader          : false,
                cities      : action.cities
              };
    case doctorProfileConstants.CITIES_FAILURE:
      return  { 
                ...state,
                sendingRequest  : false,
                loader          : false, 
                errorMsg        : action.errorMsg
              };
    case doctorProfileConstants.DR_PROFILE_UPDATE_SUCCESS:
      return  { 
                ...state,
                sendingRequest  : false, 
                loader          : false,
                successMessage  : action.successMsg.message,
                doc_profile_img : action.successMsg.doc_profile_img
              };
    case doctorProfileConstants.DR_PROFILE_UPDATE_FAILURE:
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
    case doctorProfileConstants.DR_PROFILE_RESET_STATE:
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
