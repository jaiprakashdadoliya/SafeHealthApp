import { configConstants } from '../../../_constants';
import { laboratoryTestsConstants } from './laboratoryTestsConstants';

/**
 *patient
 *
 * @package                Safe Helth
 * @subpackage             setting
 * @category               Reducers
 * @DateOfCreation         15 June 2018
 * @ShortDescription       This is responsible for add Lab Tests
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
    laboratoryTestsData:[],
};

export function laboratoryTests(state = initialState, action) {
    switch (action.type) {
        
        // Add Reducer's  
        case laboratoryTestsConstants.LT_ADD_REQUEST:
            return {
                ...state,
                submitted        : true,
                errorMsg         : false,
                successMsg       : false,
                isInsertDone     : false,
            };
        case laboratoryTestsConstants.LT_ADD_SUCCESS:
            return {
                ...state, 
                successMsg       : action.result.message,
                dataGridRefresh  : true ,
                isInsertDone     : true ,
                submitted        : false,
                errorMsg         : false,
            };
        case laboratoryTestsConstants.LT_ADD_FAILURE:
            return {
                ...state,
                submitted        : false, 
                dataGridRefresh  : false ,
                errorMsg         : action.errorMsg,
                successMsg       : false,
                isInsertDone     : false ,
            }; 
        
        // Grid data Reducer's  
        case laboratoryTestsConstants.LT_GRID_REQUEST:
            return {
              ...state,
              sendingRequest  : true
            };
        case laboratoryTestsConstants.LT_GRID_FAILURE:
            return {
                ...state,
                sendingRequest  : false,
                dataGridRefresh : false,
                errorMsg        : action.errorMsg
            };
        case laboratoryTestsConstants.LT_GRID_SUCCESS:
            return {
                ...state,
                sendingRequest  : false,
                dataGridRefresh : false,
                laboratoryTestsData : action.result,
                errorMsg        : false
            };
        case laboratoryTestsConstants.LT_RESET:
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
        case laboratoryTestsConstants.LT_DELETE_REQUEST:
            return {
                ...state,
                errorMsg         : false,
                successMsg       : false,
            };
        case laboratoryTestsConstants.LT_DELETE_SUCCESS:
            return {
                ...state, 
                successMsg       : action.result.message,
                dataGridRefresh  : true,
                errorMsg         : false,
                isInsertDone     : true,
            };
        case laboratoryTestsConstants.LT_DELETE_FAILURE:
            return {
                ...state,
                dataGridRefresh  : false ,
                successMsg       : false ,
                errorMsg         : action.errorMsg,
            };
        case laboratoryTestsConstants.LT_OPTION_REQUEST:
            return {
                ...state,
                sendingRequest          : true,
                fetchOptionData         : false
            };
        case laboratoryTestsConstants.LT_OPTION_FAILURE:
            return {
                ...state,
                sendingRequest           : false,
                fetchOptionData          : false,
                errorMsg                 : action.errorMsg
            };
        case laboratoryTestsConstants.LT_OPTION_SUCCESS:
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