import { medicalHistoryConstants } from './medicalHistoryConstants';
import { configConstants } from './../../../_constants';
/**
 * medicalHistoryReducer
 *
 * @package                SafeHealth
 * @subpackage             medicalHistoryReducer
 * @category               Reducers
 * @DateOfCreation         17 May 2018
 * @ShortDescription       This is responsible for all state related to Doctor disease
 */

//Initial State on load state and intial action with their type
const initialState = {
  diseases: [],
  sendingRequest: false,
  afterUpdate: false,
  loader: false,
  addSuccessMessage: false,
  editSuccessMessage: false,
  deleteSuccessMessage:false,
  isUserNotValid:false,
  detail:{}
};

export function medicalHistoryDoctor(state = initialState, action) {
  switch (action.type) {
    case medicalHistoryConstants.DR_MH_REQUEST:
      return  { 
                ...state,
                sendingRequest  : true, 
                loader          : true,
              };
    case medicalHistoryConstants.DR_MH_SUCCESS:
      return  { 
                ...state,
                sendingRequest  : false, 
                loader          : false,
                diseases        : action.diseases.result,
                pages           : action.diseases.pages
              };
    case medicalHistoryConstants.DR_MH_FAILURE:
      return  { 
                ...state,
                sendingRequest  : false,
                loader          : false, 
                errorMsg        : action.errorMsg
              };          
    case medicalHistoryConstants.DR_MH_EDIT_SUCCESS:
      return  { 
                ...state,
                afterUpdate     : true,
                sendingRequest  : false, 
                editSuccessMessage : action.successMsg.message,
                updatedData     : action.successMsg.detail,
                diseases        : action.successMsg.disease
              };
    case medicalHistoryConstants.DR_MH_EDIT_FAILURE:
      return  { 
                ...state,
                sendingRequest  : false, 
                editErrorMsg        : action.errorMsg
              };
    case medicalHistoryConstants.DR_MH_ADD_REQUEST:
      return  { 
                ...state,
                sendingRequest  : true,
              };
    case medicalHistoryConstants.DR_MH_ADD_SUCCESS:
      return  { 
                ...state,
                sendingRequest  : false, 
                addSuccessMessage : action.successMsg.message,
                diseases        : [...state.diseases]                
              };
    case medicalHistoryConstants.DR_MH_ADD_FAILURE:
      return  { 
                ...state,
                sendingRequest  : false, 
                addErrorMsg     : action.errorMsg
              };
    case medicalHistoryConstants.DR_MH_REMOVE_REQUEST:
      return  { 
                 ...state,
                sendingRequest  : true,
              };
    case medicalHistoryConstants.DR_MH_REMOVE_SUCCESS:
      return  { 
                ...state,
                sendingRequest  : false, 
                deleteSuccessMessage : action.successMsg.message,
                diseases        : action.successMsg.disease,
              };
    case medicalHistoryConstants.DR_MH_REMOVE_FAILURE:
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
    case medicalHistoryConstants.DR_MH_RESET_STATE:
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