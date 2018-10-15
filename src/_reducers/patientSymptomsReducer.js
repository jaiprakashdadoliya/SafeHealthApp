import { patientSymptomsConstants, configConstants } from '../_constants';

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
    fetchSymptomsOptionData:false,
    patientSymptomsOptionData:[],
    patientSymptomsData:[],
    fetchHistoryOfPatientData:false,
    historyOfPatientData : [],
};

export function patientSymptoms(state = initialState, action) {
    switch (action.type) {
        case patientSymptomsConstants.SYMPTOMS_OPTION_REQUEST:
            return {
                ...state,
                sendingRequest          : true,
                fetchSymptomsOptionData : false
            };
        case patientSymptomsConstants.SYMPTOMS_OPTION_FAILURE:
            return {
                ...state,
                sendingRequest           : false,
                fetchSymptomsOptionData  : false,
                errorMsg                 : action.errorMsg
            };
        case patientSymptomsConstants.SYMPTOMS_OPTION_SUCCESS:
            return {
                ...state,
                sendingRequest              : false,
                patientSymptomsOptionData   : action.patientSymptomsOptionData,
                fetchSymptomsOptionData     : true
            };

        // Add Reducer's  
        case patientSymptomsConstants.SYMPTOMS_ADD_REQUEST:
            return {
                ...state,
                submitted        : true,
                errorMsg         : false,
                successMsg       : false,
                isInsertDone     : false,
            };
        case patientSymptomsConstants.SYMPTOMS_ADD_SUCCESS:
            return {
                ...state, 
                successMsg       : action.result.message,
                dataGridRefresh  : true ,
                isInsertDone     : true ,
                submitted        : false,
                errorMsg         : false,
            };
        case patientSymptomsConstants.SYMPTOMS_ADD_FAILURE:
            return {
                ...state,
                submitted        : false, 
                dataGridRefresh  : false ,
                errorMsg         : action.errorMsg,
                successMsg       : false,
                isInsertDone     : false ,
            }; 
        
        // Grid data Reducer's  
        case patientSymptomsConstants.SYMPTOMS_GRID_REQUEST:
            return {
              ...state,
              sendingRequest  : true
            };
        case patientSymptomsConstants.SYMPTOMS_GRID_FAILURE:
            return {
                ...state,
                sendingRequest  : false,
                dataGridRefresh : false,
                errorMsg        : action.errorMsg
            };
        case patientSymptomsConstants.SYMPTOMS_GRID_SUCCESS:
            return {
                ...state,
                sendingRequest        : false,
                dataGridRefresh       : false,
                patientSymptomsData   : action.result,
                errorMsg              : false
            };
        // history of patient illness
        case patientSymptomsConstants.HOPI_DETAIL_REQUEST:
            return {
              ...state,
              sendingRequest  : true
            };
        case patientSymptomsConstants.HOPI_DETAIL_FAILURE:
            return {
                ...state,
                sendingRequest  : false,
                dataGridRefresh : false,
                errorMsg        : action.errorMsg
            };
        case patientSymptomsConstants.HOPI_DETAIL_SUCCESS:
           return {
                ...state,
                sendingRequest        : false,
                dataGridRefresh       : false,
                fetchHistoryOfPatientData       : true,
                historyOfPatientData  : action.result,
                errorMsg              : false
            };
        case patientSymptomsConstants.HOPI_ADD_UPDATE_REQUEST:
            return {
                ...state,
                submitted        : true,
                errorMsg         : false,
                successMsg       : false,
                isUpdatedDone     : false,
            };
        case patientSymptomsConstants.HOPI_ADD_UPDATE_SUCCESS:
            return {
                ...state, 
                successMsg       : action.result.message,
                dataGridRefresh  : true ,
                isUpdatedDone     : true ,
                submitted        : false,
                errorMsg         : false,
            };
        case patientSymptomsConstants.HOPI_ADD_UPDATE_FAILURE:
            return {
                ...state,
                submitted        : false, 
                dataGridRefresh  : false ,
                errorMsg         : action.errorMsg,
                successMsg       : false,
                isUpdatedDone     : false ,
            }; 
        case patientSymptomsConstants.SYMPTOMS_REST_ADD:
            return {
                ...state,
                dataGridRefresh                : false,
                isInsertDone                   : false,
                successMsg                     : false,
                errorMsg                       : false,
                fetchSymptomsOptionData        : false,
                isUpdatedDone                  : false,
            };

        // update Reducer's  
        case patientSymptomsConstants.SYMPTOMS_UPDATE_REQUEST:
            return {
                ...state,
                submitted  : true,
                isInsertDone     : false ,
            };
        case patientSymptomsConstants.SYMPTOMS_UPDATE_SUCCESS:
            return {
                ...state, 
                successMsg    : action.result.message,
                dataGridRefresh     : true ,
                isInsertDone        : true ,
                submitted           : false
            };
        case patientSymptomsConstants.SYMPTOMS_UPDATE_FAILURE:
            return {
                ...state,
                submitted              : false, 
                dataGridRefresh        : false ,
                isInsertDone           : false ,
                errorMsg               : action.errorMsg,
            }; 

          // update Reducer's  
        case patientSymptomsConstants.SYMPTOMS_DELETE_REQUEST:
            return {
                ...state,
                errorMsg         : false,
                successMsg       : false,
            };
        case patientSymptomsConstants.SYMPTOMS_DELETE_SUCCESS:
            return {
                ...state, 
                successMsg       : action.result.message,
                dataGridRefresh  : true,
                errorMsg         : false,
                isInsertDone     : true,
            };
        case patientSymptomsConstants.SYMPTOMS_DELETE_FAILURE:
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