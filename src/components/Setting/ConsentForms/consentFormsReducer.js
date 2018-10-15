import { consentFormsConstants } from './consentFormsConstants';
import { configConstants } from './../../../_constants';
/**
 * consentFormsReducer
 *
 * @package                SafeHealth
 * @subpackage             consentFormsReducer
 * @category               Reducers
 * @DateOfCreation         17 May 2018
 * @ShortDescription       This is responsible for all state related to Doctor consentForm
 */

//Initial State on load state and intial action with their type
const initialState = {
  consentForms: [],
  sendingRequest: false,
  afterUpdate: false,
  loader: false,
  successMessage: false,
  deleteSuccessMessage:false,
  isUserNotValid:false,
  detail:{}
};

export function consentForms(state = initialState, action) {
  switch (action.type) {
    case consentFormsConstants.DR_CF_REQUEST:
      return  { 
                ...state,
                sendingRequest  : true, 
                loader          : true,
              };
    case consentFormsConstants.DR_CF_SUCCESS:
      return  { 
                ...state,
                sendingRequest  : false, 
                loader          : false,
                consentForms    : action.consentForms.result,
                pages           : action.consentForms.pages
              };
    case consentFormsConstants.DR_CF_FAILURE:
      return  { 
                ...state,
                sendingRequest  : false,
                loader          : false, 
                errorMsg        : action.errorMsg
              };          
    case consentFormsConstants.DR_CF_EDIT_SUCCESS:
      return  { 
                ...state,
                afterUpdate     : true,
                sendingRequest  : false, 
                successMessage : action.successMsg.message,
                updatedData     : action.successMsg.detail,
                consentForms        : action.successMsg.consentForm
              };
    case consentFormsConstants.DR_CF_EDIT_FAILURE:
      return  { 
                ...state,
                sendingRequest  : false, 
                errorMsg        : action.errorMsg
              };
    case consentFormsConstants.DR_CF_ADD_REQUEST:
      return  { 
                ...state,
                sendingRequest  : true,
              };
    case consentFormsConstants.DR_CF_ADD_SUCCESS:
      return  { 
                ...state,
                sendingRequest  : false, 
                successMessage : action.successMsg.message,
                consentForms        : [...state.consentForms]                
              };
    case consentFormsConstants.DR_CF_ADD_FAILURE:
      return  { 
                ...state,
                sendingRequest  : false, 
                errorMsg     : action.errorMsg
              };
    case consentFormsConstants.DR_CF_REMOVE_REQUEST:
      return  { 
                 ...state,
                sendingRequest  : true,
              };
    case consentFormsConstants.DR_CF_REMOVE_SUCCESS:
      return  { 
                ...state,
                sendingRequest  : false, 
                deleteSuccessMessage : action.successMsg.message,
                consentForms        : action.successMsg.consentForm,
              };
    case consentFormsConstants.DR_CF_REMOVE_FAILURE:
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
    case consentFormsConstants.DR_CF_RESET_STATE:
      return {
                ...state,
                errorMsg          : false,
                successMessage    : false,
                deleteSuccessMessage : false,
                deleteErrorMsg       : false
             };
    default:
      return state
  }
}