import { doctorServiceConstants } from '../_constants';
import { configConstants } from '../_constants';
/**
 * doctorServiceReducer
 *
 * @package                SafeHealth
 * @subpackage             doctorServiceReducer
 * @category               Reducers
 * @DateOfCreation         17 May 2018
 * @ShortDescription       This is responsible for all state related to Doctor service
 */

//Initial State on load state and intial action with their type
const initialState = {
  services: [],
  sendingRequest: false,
  afterUpdate: false,
  loader: false,
  addSuccessMessage: false,
  editSuccessMessage: false,
  deleteSuccessMessage:false,
  isUserNotValid:false,
  detail:{}
};

export function doctorService(state = initialState, action) {
  switch (action.type) {
    case doctorServiceConstants.DR_SRV_REQUEST:
      return  { 
                ...state,
                sendingRequest  : true, 
                loader          : true,
              };
    case doctorServiceConstants.DR_SRV_SUCCESS:
      return  { 
                ...state,
                sendingRequest  : false, 
                loader          : false,
                services        : action.services.result,
                pages           : action.services.pages
              };
    case doctorServiceConstants.DR_SRV_FAILURE:
      return  { 
                ...state,
                sendingRequest  : false,
                loader          : false, 
                errorMsg        : action.errorMsg
              };          
    case doctorServiceConstants.DR_SRV_EDIT_SUCCESS:
      return  { 
                ...state,
                afterUpdate     : true,
                sendingRequest  : false, 
                editSuccessMessage : action.successMsg.message,
                updatedData     : action.successMsg.detail,
                services        : action.successMsg.service
              };
    case doctorServiceConstants.DR_SRV_EDIT_FAILURE:
      return  { 
                ...state,
                sendingRequest  : false, 
                editErrorMsg        : action.errorMsg
              };
    case doctorServiceConstants.DR_SRV_ADD_REQUEST:
      return  { 
                ...state,
                sendingRequest  : true,
              };
    case doctorServiceConstants.DR_SRV_ADD_SUCCESS:
      return  { 
                ...state,
                sendingRequest  : false, 
                addSuccessMessage : action.successMsg.message,
                services        : [...state.services, action.successMsg.detail]                
              };
    case doctorServiceConstants.DR_SRV_ADD_FAILURE:
      return  { 
                ...state,
                sendingRequest  : false, 
                addErrorMsg     : action.errorMsg
              };
    case doctorServiceConstants.DR_SRV_REMOVE_REQUEST:
      return  { 
                 ...state,
                sendingRequest  : true,
              };
    case doctorServiceConstants.DR_SRV_REMOVE_SUCCESS:
      return  { 
                ...state,
                sendingRequest  : false, 
                deleteSuccessMessage : action.successMsg.message,
                services        : action.successMsg.service,
              };
    case doctorServiceConstants.DR_SRV_REMOVE_FAILURE:
      return  { 
                ...state,
                sendingRequest  : false, 
                deleteErrorMsg  : action.errorMsg
              };
    case configConstants.UNAUTHENTICATE:
      return {
                ...state,
                isUserNotValid  : true,
                errorMsg        : false
            };  
    case doctorServiceConstants.DR_SRV_RESET_STATE:
      return {
                ...state,
                editErrorMsg         : false,
                addErrorMsg          : false,
                addSuccessMessage    : false,
                editSuccessMessage   : false,
                deleteSuccessMessage : false,
                deleteErrorMsg       : false
             };
    default:
      return state
  }
}