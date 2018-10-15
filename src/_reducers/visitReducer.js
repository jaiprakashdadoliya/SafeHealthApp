import { visitDataConstants,configConstants } from '../_constants';

/**
 * visitData
 *
 * @package                ILD INDIA
 * @subpackage             visitData
 * @category               Reducers
 * @DateOfCreation         22 June 2018
 * @ShortDescription       This is responsible for all state related to visitData
 */
//Initial State on load state and intial action with their type
const initialState = {
  errorMsg        :false,
  visitDatafetched:false,
  isUserNotValid  :false,
  successMessage  : false,
  isUpdateDone    : false,
  submitted       : false,
  visitData       : [],
  componentsData  : [],
  componentDatafetched:false,
  visitComponentsfetched:false,
};

export function visit(state = initialState, action) {
    
  switch (action.type) {
    case visitDataConstants.VISIT_COMPONENTS_DATA_REQUEST:
        return {
            ...state,
            errorMsg  : false,
        };
    case visitDataConstants.VISIT_COMPONENTS_DATA_FAILURE:
        return {
            ...state,
            errorMsg              : action.errorMsg,
            componentDatafetched  : false,
        };
    case visitDataConstants.VISIT_COMPONENTS_DATA_SUCCESS:
        return {
            ...state,
            componentsData        : action.result,
            componentDatafetched  : true,
        };
    case visitDataConstants.VISIT_DATA_REQUEST:
        return {
            ...state,
            errorMsg  : false,
        };
    case visitDataConstants.VISIT_DATA_FAILURE:
        return {
            ...state,
            errorMsg          : action.errorMsg,
            visitDatafetched  : false,
        };
    case visitDataConstants.VISIT_DATA_SUCCESS:
        return {
            ...state,
            visitData         : action.result,
            visitDatafetched  : true,
        };

    case visitDataConstants.VISIT_COMPOMENTS_REQUEST:
        return {
            ...state,
            errorMsg  : false,
        };
    case visitDataConstants.VISIT_COMPOMENTS_FAILURE:
        return {
            ...state,
            errorMsg                : action.errorMsg,
            visitComponentsfetched  : false,
        };
    case visitDataConstants.VISIT_COMPOMENTS_SUCCESS:
        return {
            ...state,
            visitComponentsData         : action.result,
            visitComponentsfetched      : true,
        };
    
    case visitDataConstants.VISIT_UPDATE_DATA_REQUEST:
        return {
            ...state,
            submitted        : true,
        };
    case visitDataConstants.VISIT_UPDATE_DATA_SUCCESS:
        return {
            ...state, 
            successMessage   : action.result.message,
            isUpdateDone     : true ,
            submitted        : false,
            errorMsg         : false,
        };
    case visitDataConstants.VISIT_UPDATE_DATA_FAILURE:
        return {
            ...state,
            submitted        : false, 
            errorMsg         : action.errorMsg,
            successMessage   : false,
            isUpdateDone     : false ,
        }; 
    case visitDataConstants.VISIT_RESET_STATE:
       
        let setStateByCondition = {
            ...state,
            submitted      : false,
            successMessage : false,
            errorMsg       : false,
            isUserNotValid : false,
            isUpdateDone   : false,
            componentDatafetched : false,
            visitComponentsfetched : false,
        };
        if(action.visitStatus !== 1){
            setStateByCondition['visitData']        = [];
            setStateByCondition['visitDatafetched'] = false;
        }
        return setStateByCondition;

    case configConstants.UNAUTHENTICATE:
        return {
            ...state,
            isUserNotValid    : true,
            errorMsg          : false,
            visitDatafetched  : false,
        };
    default:
      return {
            ...state
      }
  }
}
