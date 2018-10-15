import { configConstants } from '../../../_constants';
import { paymentModeConstants } from './paymentModeConstants';

/**
 *patient
 *
 * @package                RxHelth
 * @subpackage             setting
 * @category               Reducers
 * @DateOfCreation         04 Oct 2018
 * @ShortDescription       This is responsible for add Payment Mode
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
    paymentModeData:[],
};

export function paymentMode(state = initialState, action) {
    switch (action.type) {
        
        // Add Reducer's  
        case paymentModeConstants.PM_ADD_REQUEST:
            return {
                ...state,
                submitted        : true,
                errorMsg         : false,
                successMsg       : false,
                isInsertDone     : false,
            };
        case paymentModeConstants.PM_ADD_SUCCESS:
            return {
                ...state, 
                successMsg       : action.result.message,
                dataGridRefresh  : true ,
                isInsertDone     : true ,
                submitted        : false,
                errorMsg         : false,
            };
        case paymentModeConstants.PM_ADD_FAILURE:
            return {
                ...state,
                submitted        : false, 
                dataGridRefresh  : false ,
                errorMsg         : action.errorMsg,
                successMsg       : false,
                isInsertDone     : false ,
            }; 
        
        // Grid data Reducer's  
        case paymentModeConstants.PM_GRID_REQUEST:
            return {
              ...state,
              sendingRequest  : true
            };
        case paymentModeConstants.PM_GRID_FAILURE:
            return {
                ...state,
                sendingRequest  : false,
                dataGridRefresh : false,
                errorMsg        : action.errorMsg
            };
        case paymentModeConstants.PM_GRID_SUCCESS:
            return {
                ...state,
                sendingRequest  : false,
                dataGridRefresh : false,
                paymentModeData : action.result,
                errorMsg        : false
            };
        case paymentModeConstants.PM_RESET:
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
        case paymentModeConstants.PM_DELETE_REQUEST:
            return {
                ...state,
                errorMsg         : false,
                successMsg       : false,
            };
        case paymentModeConstants.PM_DELETE_SUCCESS:
            return {
                ...state, 
                successMsg       : action.result.message,
                dataGridRefresh  : true,
                errorMsg         : false,
                isInsertDone     : true,
            };
        case paymentModeConstants.PM_DELETE_FAILURE:
            return {
                ...state,
                dataGridRefresh  : false ,
                successMsg       : false ,
                errorMsg         : action.errorMsg,
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