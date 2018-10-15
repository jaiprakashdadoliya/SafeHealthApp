import { configConstants } from '../../../../_constants';
import { patientPastKnownMedicalHistoryConstants } from './patientPastKnownMedicalHistoryConstants';

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
    patientMedicalHistoryData:[],
};

export function patientPastKnownMedicalHistory(state = initialState, action) {
    switch (action.type) {
        
        // Add Reducer's  
        case patientPastKnownMedicalHistoryConstants.PATIENT_PAST_MEDICAL_HISTORY_ADD_REQUEST:
            return {
                ...state,
                submitted        : true,
                errorMsg         : false,
                successMsg       : false,
                isInsertDone     : false,
            };
        case patientPastKnownMedicalHistoryConstants.PATIENT_PAST_MEDICAL_HISTORY_ADD_SUCCESS:
            return {
                ...state, 
                successMsg       : action.result.message,
                dataGridRefresh  : true ,
                isInsertDone     : true ,
                submitted        : false,
                errorMsg         : false,
            };
        case patientPastKnownMedicalHistoryConstants.PATIENT_PAST_MEDICAL_HISTORY_ADD_FAILURE:
            return {
                ...state,
                submitted        : false, 
                dataGridRefresh  : false ,
                errorMsg         : action.errorMsg,
                successMsg       : false,
                isInsertDone     : false ,
            }; 
        
        // Grid data Reducer's  
        case patientPastKnownMedicalHistoryConstants.PATIENT_PAST_MEDICAL_HISTORY_GRID_REQUEST:
            return {
              ...state,
              sendingRequest  : true
            };
        case patientPastKnownMedicalHistoryConstants.PATIENT_PAST_MEDICAL_HISTORY_GRID_FAILURE:
            return {
                ...state,
                sendingRequest  : false,
                dataGridRefresh : false,
                errorMsg        : action.errorMsg
            };
        case patientPastKnownMedicalHistoryConstants.PATIENT_PAST_MEDICAL_HISTORY_GRID_SUCCESS:
            return {
                ...state,
                sendingRequest                  : false,
                dataGridRefresh                 : false,
                patientMedicalHistoryData      : action.result,
                errorMsg                        : false
            };
        case patientPastKnownMedicalHistoryConstants.PATIENT_PAST_MEDICAL_HISTORY_RESET:
            return {
                ...state,
                dataGridRefresh : false,
                isInsertDone    : false,
                successMsg      : false,
                errorMsg        : false,
            };

          // DELETE Reducer's  
        case patientPastKnownMedicalHistoryConstants.PATIENT_PAST_MEDICAL_HISTORY_DELETE_REQUEST:
            return {
                ...state,
                errorMsg         : false,
                successMsg       : false,
            };
        case patientPastKnownMedicalHistoryConstants.PATIENT_PAST_MEDICAL_HISTORY_DELETE_SUCCESS:
            return {
                ...state, 
                successMsg       : action.result.message,
                dataGridRefresh  : true,
                errorMsg         : false,
                isInsertDone     : true,
            };
        case patientPastKnownMedicalHistoryConstants.PATIENT_PAST_MEDICAL_HISTORY_DELETE_FAILURE:
            return {
                ...state,
                dataGridRefresh  : false ,
                successMsg       : false ,
                errorMsg         : action.errorMsg,
            };
        case patientPastKnownMedicalHistoryConstants.DISEASE_REQUEST:
            return {
                ...state,
                errorMsg         : false,
                successMsg       : false,
                isInsertDone     : false,
            };
        case patientPastKnownMedicalHistoryConstants.DISEASE_SUCCESS:
            return {
               ...state,
                sendingRequest            : false,
                dataGridRefresh           : false,
                successMsg                : action.result.message,
                diseaseData               : action.result,
                errorMsg                  : false,
            };
        case patientPastKnownMedicalHistoryConstants.DISEASE_FAILURE:
            return {
                ...state,
                submitted        : false, 
                dataGridRefresh  : false ,
                errorMsg         : action.errorMsg,
                successMsg       : false,
                isInsertDone     : false ,
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