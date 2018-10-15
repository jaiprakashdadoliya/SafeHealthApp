import { patientGroupsConstants } from './patientGroupsConstants';
import { configConstants } from '../../../_constants';
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
  patientGroupsList: [],
  sendingRequest: false,
  afterUpdate: false,
  loader: false,
  addSuccessMessage: false,
  editSuccessMessage: false,
  deleteSuccessMessage:false,
  isUserNotValid:false,
  detail:{}
};

export function patientGroups(state = initialState, action) {
  switch (action.type) {
    case patientGroupsConstants.PAT_GRP_REQUEST:
      return  { 
                ...state,
                sendingRequest  : true, 
                loader          : true,
              };
    case patientGroupsConstants.PAT_GRP_SUCCESS:
      return  { 
                ...state,
                sendingRequest  : false, 
                loader          : false,
                patientGroupsList : action.patientGroupsList.result,
                pages           : action.patientGroupsList.pages
              };
    case patientGroupsConstants.PAT_GRP_FAILURE:
      return  { 
                ...state,
                sendingRequest  : false,
                loader          : false, 
                errorMsg        : action.errorMsg
              };          
    case patientGroupsConstants.PAT_GRP_EDIT_SUCCESS:
      return  { 
                ...state,
                afterUpdate     : true,
                sendingRequest  : false, 
                editSuccessMessage : action.successMsg.message,
                updatedData     : action.successMsg.detail,
                patientGroupsList : action.successMsg.patientGroupsList
              };
    case patientGroupsConstants.PAT_GRP_EDIT_FAILURE:
      return  { 
                ...state,
                sendingRequest  : false, 
                editErrorMsg        : action.errorMsg
              };
    case patientGroupsConstants.PAT_GRP_ADD_REQUEST:
      return  { 
                ...state,
                sendingRequest  : true,
              };
    case patientGroupsConstants.PAT_GRP_ADD_SUCCESS:
      return  { 
                ...state,
                sendingRequest  : false, 
                addSuccessMessage : action.groupResult.message,
                patientGroupsList : [...state.patientGroupsList, action.groupResult.detail]                
              };
    case patientGroupsConstants.PAT_GRP_ADD_FAILURE:
      return  { 
                ...state,
                sendingRequest  : false, 
                addErrorMsg     : action.errorMsg
              };
    case patientGroupsConstants.PAT_GRP_REMOVE_REQUEST:
      return  { 
                 ...state,
                sendingRequest  : true,
              };
    case patientGroupsConstants.PAT_GRP_REMOVE_SUCCESS:
      return  { 
                ...state,
                sendingRequest  : false, 
                deleteSuccessMessage : action.successMsg.message,
                patientGroupsList        : action.successMsg.patientGroupsList,
              };
    case patientGroupsConstants.PAT_GRP_REMOVE_FAILURE:
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
    case patientGroupsConstants.PAT_GRP_RESET_STATE:
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