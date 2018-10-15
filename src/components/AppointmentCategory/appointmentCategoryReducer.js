import { appointmentCategoryConstants } from './appointmentCategoryConstants';
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
  appointmentCategoryList: [],
  sendingRequest: false,
  afterUpdate: false,
  loader: false,
  addSuccessMessage: false,
  editSuccessMessage: false,
  deleteSuccessMessage:false,
  isUserNotValid:false,
  detail:{}
};

export function appointmentCategory(state = initialState, action) {
  switch (action.type) {
    case appointmentCategoryConstants.APP_CATE_REQUEST:
      return  { 
                ...state,
                sendingRequest  : true, 
                loader          : true,
              };
    case appointmentCategoryConstants.APP_CATE_SUCCESS:
      return  { 
                ...state,
                sendingRequest  : false, 
                loader          : false,
                appointmentCategoryList : action.appointmentCategoryList.result,
                pages           : action.appointmentCategoryList.pages
              };
    case appointmentCategoryConstants.APP_CATE_FAILURE:
      return  { 
                ...state,
                sendingRequest  : false,
                loader          : false, 
                errorMsg        : action.errorMsg
              };          
    case appointmentCategoryConstants.APP_CATE_EDIT_SUCCESS:
      return  { 
                ...state,
                afterUpdate     : true,
                sendingRequest  : false, 
                editSuccessMessage : action.successMsg.message,
                updatedData     : action.successMsg.detail,
                appointmentCategoryList : action.successMsg.appointmentCategoryList
              };
    case appointmentCategoryConstants.APP_CATE_EDIT_FAILURE:
      return  { 
                ...state,
                sendingRequest  : false, 
                editErrorMsg        : action.errorMsg
              };
    case appointmentCategoryConstants.APP_CATE_ADD_REQUEST:
      return  { 
                ...state,
                sendingRequest  : true,
              };
    case appointmentCategoryConstants.APP_CATE_ADD_SUCCESS:
      return  { 
                ...state,
                sendingRequest  : false, 
                addSuccessMessage : action.categoryResult.message,
                appointmentCategoryList : [...state.appointmentCategoryList, action.categoryResult.detail]                
              };
    case appointmentCategoryConstants.APP_CATE_ADD_FAILURE:
      return  { 
                ...state,
                sendingRequest  : false, 
                addErrorMsg     : action.errorMsg
              };
    case appointmentCategoryConstants.APP_CATE_REMOVE_REQUEST:
      return  { 
                 ...state,
                sendingRequest  : true,
              };
    case appointmentCategoryConstants.APP_CATE_REMOVE_SUCCESS:
      return  { 
                ...state,
                sendingRequest  : false, 
                deleteSuccessMessage : action.successMsg.message,
                appointmentCategoryList        : action.successMsg.appointmentCategoryList,
              };
    case appointmentCategoryConstants.APP_CATE_REMOVE_FAILURE:
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
    case appointmentCategoryConstants.APP_CATE_RESET_STATE:
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