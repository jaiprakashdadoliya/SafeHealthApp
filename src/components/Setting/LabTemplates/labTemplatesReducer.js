import { configConstants } from '../../../_constants';
import { labTemplatesConstants } from './labTemplatesConstants';

/**
 *patient
 *
 * @package                Safe Helth
 * @subpackage             setting
 * @category               Reducers
 * @DateOfCreation         15 June 2018
 * @ShortDescription       This is responsible for add lab templates
 */
//Initial State on load state and intial action with their type
const initialState = {
    dataGridRefresh: false,
    isInsertDone: false,
    submitted:false,
    sendingRequest: false,
    successMsg: false,
    errorMsg:false,
    isUserNotValid:false,
    optionData:[],
    fetchOptionData:false,
    labTemplatesData:[],
};

export function labTemplates(state = initialState, action) {
    switch (action.type) {
        
        // Add Reducer's  
        case labTemplatesConstants.LAB_TEMPLATES_ADD_REQUEST:
            return {
                ...state,
                submitted        : true,
                errorMsg         : false,
                successMsg       : false,
                isInsertDone     : false,
            };
        case labTemplatesConstants.LAB_TEMPLATES_ADD_SUCCESS:
            return {
                ...state, 
                successMsg       : action.result.message,
                dataGridRefresh  : true ,
                isInsertDone     : true ,
                submitted        : false,
                errorMsg         : false,
            };
        case labTemplatesConstants.LAB_TEMPLATES_ADD_FAILURE:
            return {
                ...state,
                submitted        : false, 
                dataGridRefresh  : false ,
                errorMsg         : action.errorMsg,
                successMsg       : false,
                isInsertDone     : false ,
            }; 
        
        // Grid data Reducer's  
        case labTemplatesConstants.LAB_TEMPLATES_GRID_REQUEST:
            return {
              ...state,
              sendingRequest  : true
            };
        case labTemplatesConstants.LAB_TEMPLATES_GRID_FAILURE:
            return {
                ...state,
                sendingRequest  : false,
                dataGridRefresh : false,
                errorMsg        : action.errorMsg
            };
        case labTemplatesConstants.LAB_TEMPLATES_GRID_SUCCESS:
            return {
                ...state,
                sendingRequest  : false,
                dataGridRefresh : false,
                labTemplatesData : action.result,
                errorMsg        : false
            };
        case labTemplatesConstants.LAB_TEMPLATES_RESET:
            return {
                ...state,
                dataGridRefresh : false,
                isInsertDone    : false,
                successMsg      : false,
                errorMsg        : false,
                optionData      : [],
                fetchOptionData : false
            };

          // DELETE Reducer's  
        case labTemplatesConstants.LAB_TEMPLATES_DELETE_REQUEST:
            return {
                ...state,
                errorMsg         : false,
                successMsg       : false,
            };
        case labTemplatesConstants.LAB_TEMPLATES_DELETE_SUCCESS:
            return {
                ...state, 
                successMsg       : action.result.message,
                dataGridRefresh  : true,
                errorMsg         : false,
                isInsertDone     : true,
            };
        case labTemplatesConstants.LAB_TEMPLATES_DELETE_FAILURE:
            return {
                ...state,
                dataGridRefresh  : false ,
                successMsg       : false ,
                errorMsg         : action.errorMsg,
            };
        case labTemplatesConstants.LAB_TEMPLATES_OPTION_REQUEST:
            return {
                ...state,
                sendingRequest          : true,
                fetchOptionData         : false
            };
        case labTemplatesConstants.LAB_TEMPLATES_OPTION_FAILURE:
            return {
                ...state,
                sendingRequest           : false,
                fetchOptionData          : false,
                errorMsg                 : action.errorMsg
            };
        case labTemplatesConstants.LAB_TEMPLATES_OPTION_SUCCESS:
            return {
                ...state,
                sendingRequest              : false,
                optionData                  : action.optionData,
                fetchOptionData             : true
            };

        case configConstants.UNAUTHENTICATE:
            return {
                ...state,
                isUserNotValid : true,
                errorMsg       : false
            }; 
        default:
            return state
    }
}