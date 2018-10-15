import { referralConstants } from './referralConstants';
import { configConstants } from '../../_constants';
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
  referralList: [],
  sendingRequest: false,
  afterUpdate: false,
  loader: false,
  addSuccessMessage: false,
  editSuccessMessage: false,
  deleteSuccessMessage:false,
  isUserNotValid:false,
  detail:{}
};

export function referral(state = initialState, action) {
  switch (action.type) {
    case referralConstants.DOC_REF_REQUEST:
      return  { 
                ...state,
                sendingRequest  : true, 
                loader          : true,
              };
    case referralConstants.DOC_REF_SUCCESS:
      return  { 
                ...state,
                sendingRequest  : false, 
                loader          : false,
                referralList : action.referralList.result,
                pages           : action.referralList.pages
              };
    case referralConstants.DOC_REF_FAILURE:
      return  { 
                ...state,
                sendingRequest  : false,
                loader          : false, 
                errorMsg        : action.errorMsg
              };          
    case referralConstants.DOC_REF_EDIT_SUCCESS:
      return  { 
                ...state,
                afterUpdate     : true,
                sendingRequest  : false, 
                editSuccessMessage : action.successMsg.message,
                updatedData     : action.successMsg.detail,
                referralList : action.successMsg.referralList
              };
    case referralConstants.DOC_REF_EDIT_FAILURE:
      return  { 
                ...state,
                sendingRequest  : false, 
                editErrorMsg        : action.errorMsg
              };
    case referralConstants.DOC_REF_ADD_REQUEST:
      return  { 
                ...state,
                sendingRequest  : true,
              };
    case referralConstants.DOC_REF_ADD_SUCCESS:
      return  { 
                ...state,
                sendingRequest  : false, 
                addSuccessMessage : action.categoryResult.message,
                referralList : [...state.referralList, action.categoryResult.detail]                
              };
    case referralConstants.DOC_REF_ADD_FAILURE:
      return  { 
                ...state,
                sendingRequest  : false, 
                addErrorMsg     : action.errorMsg
              };
    case referralConstants.DOC_REF_REMOVE_REQUEST:
      return  { 
                 ...state,
                sendingRequest  : true,
              };
    case referralConstants.DOC_REF_REMOVE_SUCCESS:
      return  { 
                ...state,
                sendingRequest  : false, 
                deleteSuccessMessage : action.successMsg.message,
                referralList        : action.successMsg.referralList,
              };
    case referralConstants.DOC_REF_REMOVE_FAILURE:
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
    case referralConstants.DOC_REF_RESET_STATE:
      return {
                ...state,
                editErrorMsg         : false,
                addErrorMsg          : false,
                addSuccessMessage    : false,
                editSuccessMessage   : false,
                deleteSuccessMessage : false,
                deleteErrorMsg       : false,
                updatedData          : false
             };
    default:
      return state
  }
}