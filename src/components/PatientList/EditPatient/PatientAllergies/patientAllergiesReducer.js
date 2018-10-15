import { configConstants } from '../../../../_constants';
import { patientAllergiesConstants } from './patientAllergiesConstants';

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
    isUpdatedDone: false,
    submitted:false,
    sendingRequest: false,
    successMsg: false,
    errorMsg:false,
    isUserNotValid:false,
    patientAllergiesData:[],
    historyData: [],
};

export function patientAllergies(state = initialState, action) {
    switch (action.type) {
        
        // Add Reducer's  
        case patientAllergiesConstants.PATIENT_ALLERGIES_ADD_REQUEST:
            return {
                ...state,
                submitted        : true,
                errorMsg         : false,
                successMsg       : false,
                isInsertDone     : false,
            };
        case patientAllergiesConstants.PATIENT_ALLERGIES_ADD_SUCCESS:
            return {
                ...state, 
                successMsg       : action.result.message,
                dataGridRefresh  : true ,
                isInsertDone     : true ,
                submitted        : false,
                errorMsg         : false,
            };
        case patientAllergiesConstants.PATIENT_ALLERGIES_ADD_FAILURE:
            return {
                ...state,
                submitted        : false, 
                dataGridRefresh  : false ,
                errorMsg         : action.errorMsg,
                successMsg       : false,
                isInsertDone     : false ,
            }; 
        
        // Grid data Reducer's  
        case patientAllergiesConstants.PATIENT_ALLERGIES_GRID_REQUEST:
            return {
              ...state,
              sendingRequest  : true
            };
        case patientAllergiesConstants.PATIENT_ALLERGIES_GRID_FAILURE:
            return {
                ...state,
                sendingRequest  : false,
                dataGridRefresh : false,
                errorMsg        : action.errorMsg
            };
        case patientAllergiesConstants.PATIENT_ALLERGIES_GRID_SUCCESS:
            return {
                ...state,
                sendingRequest                  : false,
                dataGridRefresh                 : false,
                patientAllergiesData            : action.result,
                errorMsg                        : false
            };
        case patientAllergiesConstants.PATIENT_ALLERGIES_RESET:
            return {
                ...state,
                dataGridRefresh : false,
                isInsertDone    : false,
                successMsg      : false,
                errorMsg        : false,
                isUpdatedDone    : false,
            };

          // DELETE Reducer's  
        case patientAllergiesConstants.PATIENT_ALLERGIES_DELETE_REQUEST:
            return {
                ...state,
                errorMsg         : false,
                successMsg       : false,
            };
        case patientAllergiesConstants.PATIENT_ALLERGIES_DELETE_SUCCESS:
            return {
                ...state, 
                successMsg       : action.result.message,
                dataGridRefresh  : true,
                errorMsg         : false,
                isInsertDone     : true,
            };
        case patientAllergiesConstants.PATIENT_ALLERGIES_DELETE_FAILURE:
            return {
                ...state,
                dataGridRefresh  : false ,
                successMsg       : false ,
                errorMsg         : action.errorMsg,
            };

          // Allergies history Reducer's  
        case patientAllergiesConstants.ALLERGIES_HISTORY_REQUEST:
            return {
                ...state,
                errorMsg         : false,
            };
        case patientAllergiesConstants.ALLERGIES_HISTORY_SUCCESS:
           return {
                ...state, 
                historyData      : action.result,
                errorMsg         : false,
            };
        case patientAllergiesConstants.ALLERGIES_HISTORY_FAILURE:
            return {
                ...state,
                errorMsg         : action.errorMsg,
            }; 

        case patientAllergiesConstants.ALLERGIES_HISTORY_ADD_UPDATE_REQUEST:
            return {
                ...state,
                submitted        : true,
                errorMsg         : false,
                successMsg       : false,
                isUpdatedDone     : false,
            };
        case patientAllergiesConstants.ALLERGIES_HISTORY_ADD_UPDATE_SUCCESS:
            return {
                ...state, 
                successMsg       : action.result.message,
                isUpdatedDone    : true,
                submitted        : false,
                errorMsg         : false,
            };
        case patientAllergiesConstants.ALLERGIES_HISTORY_ADD_UPDATE_FAILURE:
            return {
                ...state,
                submitted        : false, 
                errorMsg         : action.errorMsg,
                successMsg       : false,
                isUpdatedDone    : false ,
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