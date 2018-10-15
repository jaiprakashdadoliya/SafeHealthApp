import { configConstants } from '../../../../_constants';
import { patientWorkEnvironmentConstants } from './patientWorkEnvironmentConstants';

/**
 *patient
 *
 * @package                ILD INDIA Registry
 * @subpackage             PatientProfile
 * @category               Reducers
 * @DateOfCreation         15 June 2018
 * @ShortDescription       This is responsible for all state related to Doctor profile
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
    patientWorkEnvironmentData:[],
};

export function patientWorkEnvironment(state = initialState, action) {
    switch (action.type) {
        case patientWorkEnvironmentConstants.WORK_ENVIRONMENT_FACTOR_OPTION_REQUEST:
            return {
                ...state,
                sendingRequest  : true
            };
        case patientWorkEnvironmentConstants.WORK_ENVIRONMENT_FACTOR_OPTION_FAILURE:
            return {
                ...state,
                sendingRequest  : false,
                errorMsg        : action.errorMsg
            };
        case patientWorkEnvironmentConstants.WORK_ENVIRONMENT_FACTOR_OPTION_SUCCESS:
            return {
                ...state,
                sendingRequest  : false
            };

        // Add Reducer's  
        case patientWorkEnvironmentConstants.WORK_ENVIRONMENT_FACTOR_ADD_REQUEST:
            return {
                ...state,
                submitted        : true,
                errorMsg         : false,
                successMsg       : false,
                isInsertDone     : false,
            };
        case patientWorkEnvironmentConstants.WORK_ENVIRONMENT_FACTOR_ADD_SUCCESS:
            return {
                ...state, 
                successMsg       : action.result.message,
                dataGridRefresh  : true ,
                isInsertDone     : true ,
                submitted        : false,
                errorMsg         : false,
            };
        case patientWorkEnvironmentConstants.WORK_ENVIRONMENT_FACTOR_ADD_FAILURE:
            return {
                ...state,
                submitted        : false, 
                dataGridRefresh  : false ,
                errorMsg         : action.errorMsg,
                successMsg       : false,
                isInsertDone     : false ,
            }; 
        
        // Grid data Reducer's  
        case patientWorkEnvironmentConstants.WORK_ENVIRONMENT_FACTOR_GRID_REQUEST:
            return {
              ...state,
              sendingRequest  : true
            };
        case patientWorkEnvironmentConstants.WORK_ENVIRONMENT_FACTOR_GRID_FAILURE:
            return {
                ...state,
                sendingRequest  : false,
                dataGridRefresh : false,
                errorMsg        : action.errorMsg
            };
        case patientWorkEnvironmentConstants.WORK_ENVIRONMENT_FACTOR_GRID_SUCCESS:
            return {
                ...state,
                sendingRequest                  : false,
                dataGridRefresh                 : false,
                patientWorkEnvironmentData      : action.result,
                errorMsg                        : false
            };
        case patientWorkEnvironmentConstants.WORK_ENVIRONMENT_FACTOR_RESET:
            return {
                ...state,
                dataGridRefresh : false,
                isInsertDone    : false,
                successMsg      : false,
                errorMsg        : false,
            };

          // update Reducer's  
        case patientWorkEnvironmentConstants.WORK_ENVIRONMENT_FACTOR_DELETE_REQUEST:
            return {
                ...state,
                errorMsg         : false,
                successMsg       : false,
            };
        case patientWorkEnvironmentConstants.WORK_ENVIRONMENT_FACTOR_DELETE_SUCCESS:
            return {
                ...state, 
                successMsg       : action.result.message,
                dataGridRefresh  : true,
                errorMsg         : false,
                isInsertDone     : true,
            };
        case patientWorkEnvironmentConstants.WORK_ENVIRONMENT_FACTOR_DELETE_FAILURE:
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