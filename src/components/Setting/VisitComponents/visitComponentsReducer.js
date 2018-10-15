import { visitComponentsConstants } from './visitComponentsConstants';
import { configConstants } from '../../../_constants';
/**
 * visitComponentsReducer
 *
 * @package                SafeHealth
 * @subpackage             visitComponentsReducer
 * @category               Reducers
 * @DateOfCreation         17 Aug 2018
 * @ShortDescription       This is responsible for all state related to Doctor visit
 */

//Initial State on load state and intial action with their type
const initialState = {
  visitComponentsList: [],
  sendingRequest: false,
  afterUpdate: false,
  loader: false,
  addSuccessMessage: false,
  editSuccessMessage: false,
  deleteSuccessMessage:false,
  isUserNotValid:false,
  visitComponentSetting:{}
};

export function visitComponents(state = initialState, action) {
  switch (action.type) {
    case visitComponentsConstants.VIS_CMP_REQUEST:
      return  { 
                ...state,
                sendingRequest  : true, 
                loader          : true,
              };
    case visitComponentsConstants.VIS_CMP_SUCCESS:
      return  { 
                ...state,
                sendingRequest  : false, 
                loader          : false,
                visitComponentsList : action.visitComponentsList.result,
                pages           : action.visitComponentsList.pages
              };
    case visitComponentsConstants.VIS_CMP_FAILURE:
      return  { 
                ...state,
                sendingRequest  : false,
                loader          : false, 
                errorMsg        : action.errorMsg
              };   
    case visitComponentsConstants.VIS_CMP_SET_REQUEST:
      return  { 
                ...state,
                sendingRequest  : true, 
                loader          : true,
              };
    case visitComponentsConstants.VIS_CMP_SET_SUCCESS:
      return  { 
                ...state,
                sendingRequest  : false, 
                loader          : false,
                visitComponent  : action.visitComponentSetting.result,
              };
    case visitComponentsConstants.VIS_CMP_SET_FAILURE:
      return  { 
                ...state,
                sendingRequest  : false,
                loader          : false, 
                errorMsg        : action.errorMsg
              };       
    case configConstants.UNAUTHENTICATE:
      return {
                ...state,
                isUserNotValid  : true,
                errorMsg        : false
            };  
    case visitComponentsConstants.VIS_CMP_RESET_STATE:
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