import { configConstants } from '../../../_constants';
import { manageDrugsConstants } from './manageDrugsConstants';

/**
 *patient
 *
 * @package                Safe Helth
 * @subpackage             setting
 * @category               Reducers
 * @DateOfCreation         15 June 2018
 * @ShortDescription       This is responsible for add drugs
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
    manageDrugsData:[],
};

export function manageDrugs(state = initialState, action) {
    switch (action.type) {
        
        // Add Reducer's  
        case manageDrugsConstants.SEETING_MANAGE_DRUG_ADD_REQUEST:
            return {
                ...state,
                submitted        : true,
                errorMsg         : false,
                successMsg       : false,
                isInsertDone     : false,
            };
        case manageDrugsConstants.SEETING_MANAGE_DRUG_ADD_SUCCESS:
            return {
                ...state, 
                successMsg       : action.result.message,
                dataGridRefresh  : true ,
                isInsertDone     : true ,
                submitted        : false,
                errorMsg         : false,
            };
        case manageDrugsConstants.SEETING_MANAGE_DRUG_ADD_FAILURE:
            return {
                ...state,
                submitted        : false, 
                dataGridRefresh  : false ,
                errorMsg         : action.errorMsg,
                successMsg       : false,
                isInsertDone     : false ,
            }; 
        
        // Grid data Reducer's  
        case manageDrugsConstants.SEETING_MANAGE_DRUG_GRID_REQUEST:
            return {
              ...state,
              sendingRequest  : true
            };
        case manageDrugsConstants.SEETING_MANAGE_DRUG_GRID_FAILURE:
            return {
                ...state,
                sendingRequest  : false,
                dataGridRefresh : false,
                errorMsg        : action.errorMsg
            };
        case manageDrugsConstants.SEETING_MANAGE_DRUG_GRID_SUCCESS:
            return {
                ...state,
                sendingRequest  : false,
                dataGridRefresh : false,
                manageDrugsData : action.result,
                errorMsg        : false
            };
        case manageDrugsConstants.SEETING_MANAGE_DRUG_RESET:
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
        case manageDrugsConstants.SEETING_MANAGE_DRUG_DELETE_REQUEST:
            return {
                ...state,
                errorMsg         : false,
                successMsg       : false,
            };
        case manageDrugsConstants.SEETING_MANAGE_DRUG_DELETE_SUCCESS:
            return {
                ...state, 
                successMsg       : action.result.message,
                dataGridRefresh  : true,
                errorMsg         : false,
                isInsertDone     : true,
            };
        case manageDrugsConstants.SEETING_MANAGE_DRUG_DELETE_FAILURE:
            return {
                ...state,
                dataGridRefresh  : false ,
                successMsg       : false ,
                errorMsg         : action.errorMsg,
            };
        case manageDrugsConstants.SEETING_MANAGE_DRUG_OPTION_REQUEST:
            return {
                ...state,
                sendingRequest          : true,
                fetchOptionData         : false
            };
        case manageDrugsConstants.SEETING_MANAGE_DRUG_OPTION_FAILURE:
            return {
                ...state,
                sendingRequest           : false,
                fetchOptionData          : false,
                errorMsg                 : action.errorMsg
            };
        case manageDrugsConstants.SEETING_MANAGE_DRUG_OPTION_SUCCESS:
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