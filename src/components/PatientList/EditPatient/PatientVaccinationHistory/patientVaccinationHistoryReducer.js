import { configConstants } from '../../../../_constants';
import { patientVaccinationHistoryConstants } from './patientVaccinationHistoryConstants';

/**
 *patientVaccinationHistory
 *
 * @package                Safe Health
 * @subpackage             patientVaccinationHistory
 * @category               Reducers
 * @DateOfCreation         21 Sept 2018
 * @ShortDescription       This is responsible for all state related to vaccination history
 */

//Initial State on load state and initial action with their type
const initialState = {
    dataGridRefresh: false,
    isInsertDone: false,
    isUpdateDone: false,
    submitted:false,
    sendingRequest: false,
    successMsg: false,
    errorMsg:false,
    isUserNotValid:false,
    patientVaccinationHistoryData:[],
};

export function patientVaccinationHistory(state = initialState, action) {
    switch (action.type) {
        
        // Add Reducer's  
        case patientVaccinationHistoryConstants.PATIENT_VACCINATION_HISTORY_ADD_REQUEST:
            return {
                ...state,
                submitted        : true,
                errorMsg         : false,
                successMsg       : false,
                isInsertDone     : false,
                isUpdateDone     : false,
            };
        case patientVaccinationHistoryConstants.PATIENT_VACCINATION_HISTORY_ADD_SUCCESS:
            return {
                ...state, 
                successMsg       : action.result.message,
                dataGridRefresh  : true ,
                isInsertDone     : true ,
                submitted        : false,
                errorMsg         : false,
            };
        case patientVaccinationHistoryConstants.PATIENT_VACCINATION_HISTORY_ADD_FAILURE:
            return {
                ...state,
                submitted        : false, 
                dataGridRefresh  : false ,
                errorMsg         : action.errorMsg,
                successMsg       : false,
                isInsertDone     : false ,
                isUpdateDone     : false ,
            }; 
        
        // Grid data Reducer's  
        case patientVaccinationHistoryConstants.PATIENT_VACCINATION_HISTORY_GRID_REQUEST:
            return {
              ...state,
              sendingRequest  : true
            };
        case patientVaccinationHistoryConstants.PATIENT_VACCINATION_HISTORY_GRID_FAILURE:
            return {
                ...state,
                sendingRequest  : false,
                dataGridRefresh : false,
                errorMsg        : action.errorMsg
            };
        case patientVaccinationHistoryConstants.PATIENT_VACCINATION_HISTORY_GRID_SUCCESS:
            return {
                ...state,
                sendingRequest                  : false,
                dataGridRefresh                 : false,
                patientVaccinationHistoryData   : action.result,
                errorMsg                        : false
            };
        case patientVaccinationHistoryConstants.PATIENT_VACCINATION_HISTORY_RESET:
            return {
                ...state,
                dataGridRefresh : false,
                isInsertDone    : false,
                isUpdateDone    : false,
                successMsg      : false,
                errorMsg        : false,
            };

          // DELETE Reducer's  
        case patientVaccinationHistoryConstants.PATIENT_VACCINATION_HISTORY_DELETE_REQUEST:
            return {
                ...state,
                errorMsg         : false,
                successMsg       : false,
            };
        case patientVaccinationHistoryConstants.PATIENT_VACCINATION_HISTORY_DELETE_SUCCESS:
            return {
                ...state, 
                successMsg       : action.result.message,
                dataGridRefresh  : true,
                errorMsg         : false,
                isInsertDone     : true,
                isUpdateDone     : true,
            };
        case patientVaccinationHistoryConstants.PATIENT_VACCINATION_HISTORY_DELETE_FAILURE:
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