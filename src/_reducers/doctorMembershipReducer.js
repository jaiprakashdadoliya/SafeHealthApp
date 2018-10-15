import { doctorMembershipConstants } from '../_constants';
import { configConstants } from '../_constants';
/**
 * doctorMembershipReducer
 *
 * @package                SafeHealth
 * @subpackage             doctorMembershipReducer
 * @category               Reducers
 * @DateOfCreation         17 May 2018
 * @ShortDescription       This is responsible for all state related to Doctor membership
 */

//Initial State on load state and intial action with their type
const initialState = {
  membership: [],
  sendingRequest: false,
  afterUpdate: false,
  loader: false,
  addSuccessMessage: false,
  editSuccessMessage: false,
  deleteSuccessMessage:false,
  isUserNotValid:false,
  detail:{}
};

export function doctorMembership(state = initialState, action) {
  switch (action.type) {
    case doctorMembershipConstants.DR_MEM_REQUEST:
      return  { 
                ...state,
                sendingRequest  : true, 
                loader          : true,
              };
    case doctorMembershipConstants.DR_MEM_SUCCESS:
      return  { 
                ...state,
                sendingRequest  : false, 
                loader          : false,
                membership      : action.membership.result,
                pages           : action.membership.pages
              };
    case doctorMembershipConstants.DR_MEM_FAILURE:
      return  { 
                ...state,
                sendingRequest  : false,
                loader          : false, 
                errorMsg        : action.errorMsg
              };
    case doctorMembershipConstants.DR_MEM_EDIT_REQUEST:
      return  { 
                ...state,
                sendingRequest  : true,
                afterUpdate     : false,
                editSuccessMessage: false
              };          
    case doctorMembershipConstants.DR_MEM_EDIT_SUCCESS:
      return  { 
                ...state,
                afterUpdate     : true,
                sendingRequest  : false, 
                editSuccessMessage : action.successMsg.message,
                detail          :action.successMsg.detail,
                membership      :action.successMsg.membership
              };
    case doctorMembershipConstants.DR_MEM_EDIT_FAILURE:
      return  { 
                ...state,
                sendingRequest  : false, 
                errorMsg        : action.errorMsg
              };
    case doctorMembershipConstants.DR_MEM_ADD_REQUEST:
      return  { 
                ...state,
                sendingRequest  : true,
              };
    case doctorMembershipConstants.DR_MEM_ADD_SUCCESS:
      return  { 
                ...state,
                sendingRequest  : false, 
                addSuccessMessage : action.successMsg.message,
                membership      : [...state.membership, action.successMsg.detail],
                
              };
    case doctorMembershipConstants.DR_MEM_ADD_FAILURE:
      return  { 
                ...state,
                sendingRequest  : false, 
                errorMsg        : action.errorMsg
              };
    case doctorMembershipConstants.DR_MEM_REMOVE_REQUEST:
      return  { 
                 ...state,
                sendingRequest  : true,
              };
    case doctorMembershipConstants.DR_MEM_REMOVE_SUCCESS:
      return  { 
                ...state,
                sendingRequest  : false, 
                deleteSuccessMessage : action.successMsg.message,
                membership      :action.successMsg.membership,
              };
    case doctorMembershipConstants.DR_MEM_REMOVE_FAILURE:
      return  { 
                ...state,
                sendingRequest  : false, 
                errorMsg        : action.errorMsg
              };
    case configConstants.UNAUTHENTICATE:
      return {
                ...state,
                isUserNotValid  : true,
                errorMsg        : false
            };  
    case doctorMembershipConstants.DR_MEM_RESET_STATE:
      return {
                ...state,
                sendingRequest  : false,
                errorMsg        : false,
                afterUpdate     : false,
                addSuccessMessage : false,
                editSuccessMessage: false,
                deleteSuccessMessage: false
             };
    default:
      return state
  }
}