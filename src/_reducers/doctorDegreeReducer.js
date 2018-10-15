import { doctorDegreeConstants } from '../_constants';
import { configConstants } from '../_constants';
/**
 * doctorDegreeReducer
 *
 * @package                SafeHealth
 * @subpackage             doctorDegreeReducer
 * @category               Reducers
 * @DateOfCreation         31 May 2018
 * @ShortDescription       This is responsible for all state related to Doctor degrees
 */

//Initial State on load state and intial action with their type
const initialState = {
  degrees: [],
  sendingRequest: false,
  afterUpdate: false,
  loader: false,
  addSuccessMessage: false,
  editSuccessMessage: false,
  deleteSuccessMessage:false,
  detail:{}
};

export function doctorDegree(state = initialState, action) {
  switch (action.type) {
    case doctorDegreeConstants.DR_DEG_REQUEST:
      return  { 
                ...state,
                sendingRequest: false, 
                loader: true,
              };
    case doctorDegreeConstants.DR_DEG_SUCCESS:
      return  { 
                ...state,
                sendingRequest: true, 
                loader: false,
                degrees:action.degrees.result,
                pages: action.degrees.pages
              };
    case doctorDegreeConstants.DR_DEG_FAILURE:
      return  { 
                ...state,
                sendingRequest: false,
                loader: false, 
                errorMsg : action.errorMsg
              };

    case doctorDegreeConstants.DR_DEG_EDIT_SUCCESS:
      return  { 
                ...state,
                afterUpdate: true,
                sendingRequest: true, 
                editSuccessMessage : action.successMsg.message,
                detail:action.successMsg.detail,
                degrees:action.successMsg.degrees
              };
    case doctorDegreeConstants.DR_DEG_EDIT_FAILURE:
      return  { 
                ...state,
                sendingRequest: false, 
                errorMsg : action.errorMsg
              };
    case doctorDegreeConstants.DR_DEG_ADD_SUCCESS:
      return  { 
                ...state,
                sendingRequest: true, 
                addSuccessMessage : action.successMsg.message,
                degrees: [...state.degrees, action.successMsg.detail],
                
              };
    case doctorDegreeConstants.DR_DEG_ADD_FAILURE:
      return  { 
                ...state,
                sendingRequest: false, 
                errorMsg : action.errorMsg
              };
    case doctorDegreeConstants.DR_DEG_REMOVE_SUCCESS:
      return  { 
                ...state,
                sendingRequest: true, 
                deleteSuccessMessage : action.successMsg.message,
                degrees:action.successMsg.degrees,
                
              };
    case doctorDegreeConstants.DR_DEG_REMOVE_FAILURE:
      return  { 
                ...state,
                sendingRequest: false, 
                errorMsg : action.errorMsg
              };
    case configConstants.UNAUTHENTICATE:
      return {
            ...state,
            isUserNotValid : true,
            errorMsg       : false
          };  
    case doctorDegreeConstants.DR_DEG_RESET_STATE:
      return {
                ...state,
                sendingRequest: false,
                errorMsg       : false,
                addSuccessMessage : false,
                editSuccessMessage: false,
                deleteSuccessMessage: false,
                afterUpdate: false,
             };
    default:
      return state
  }
}