import { configConstants } from '../../../../_constants';
import { patientDiagnosisConstants } from './patientDiagnosisConstants';

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
    patientDiagnosisOptionData:[],
    patientDiagnosisData:[],
    diagnosisFormData: [],
    fetchedFormData: false,
    pages: 0,
    isFactorDataInsertDone: false,
};

export function patientDiagnosis(state = initialState, action) {
    switch (action.type) {
        case patientDiagnosisConstants.DIAGNOSIS_OPTION_REQUEST:
            return {
                ...state,
                sendingRequest  : true
            };
        case patientDiagnosisConstants.DIAGNOSIS_OPTION_FAILURE:
            return {
                ...state,
                sendingRequest  : false,
                errorMsg        : action.errorMsg
            };
        case patientDiagnosisConstants.DIAGNOSIS_OPTION_SUCCESS:
            return {
                ...state,
                sendingRequest              : false,
                patientDiagnosisOptionData  : action.patientDiagnosisOptionData
            };

        // Add Reducer's  
        case patientDiagnosisConstants.DIAGNOSIS_ADD_REQUEST:
            return {
                ...state,
                submitted        : true,
                errorMsg         : false,
                successMsg       : false,
                isInsertDone     : false,
            };
        case patientDiagnosisConstants.DIAGNOSIS_ADD_SUCCESS:
            return {
                ...state, 
                successMsg       : action.result.message,
                dataGridRefresh  : true ,
                isInsertDone     : true ,
                submitted        : false,
                errorMsg         : false,
            };
        case patientDiagnosisConstants.DIAGNOSIS_ADD_FAILURE:
            return {
                ...state,
                submitted        : false, 
                dataGridRefresh  : false ,
                errorMsg         : action.errorMsg,
                successMsg       : false,
                isInsertDone     : false ,
            }; 
        
        // Grid data Reducer's  
        case patientDiagnosisConstants.DIAGNOSIS_GRID_REQUEST:
            return {
              ...state,
              sendingRequest  : true
            };
        case patientDiagnosisConstants.DIAGNOSIS_GRID_FAILURE:
            return {
                ...state,
                sendingRequest  : false,
                dataGridRefresh : false,
                errorMsg        : action.errorMsg
            };
        case patientDiagnosisConstants.DIAGNOSIS_GRID_SUCCESS:
            return {
                ...state,
                sendingRequest        : false,
                dataGridRefresh       : false,
                patientDiagnosisData  : action.result.result,
                pages                 : action.result.pages,
                errorMsg              : false
            };
        case patientDiagnosisConstants.DIAGNOSIS_REST_ADD:
            return {
                ...state,
                dataGridRefresh : false,
                isInsertDone    : false,
                successMsg      : false,
                errorMsg        :false,
            };

        // update Reducer's  
        case patientDiagnosisConstants.DIAGNOSIS_UPDATE_REQUEST:
            return {
                ...state,
                submitted  : true,
                isInsertDone : false ,
            };
        case patientDiagnosisConstants.DIAGNOSIS_UPDATE_SUCCESS:
            return {
                ...state, 
                successMsg    : action.result.message,
                dataGridRefresh     : true ,
                isInsertDone        : true ,
                submitted           : false
            };
        case patientDiagnosisConstants.DIAGNOSIS_UPDATE_FAILURE:
            return {
                ...state,
                submitted              : false, 
                dataGridRefresh        : false ,
                isInsertDone           : false ,
                errorMsg               : action.errorMsg,
            }; 

          // update Reducer's  
        case patientDiagnosisConstants.DIAGNOSIS_DELETE_REQUEST:
            return {
                ...state,
                errorMsg         : false,
                successMsg       : false,
            };
        case patientDiagnosisConstants.DIAGNOSIS_DELETE_SUCCESS:
            return {
                ...state, 
                successMsg       : action.result.message,
                dataGridRefresh  : true,
                errorMsg         : false,
                isInsertDone     : true,
            };
        case patientDiagnosisConstants.DIAGNOSIS_DELETE_FAILURE:
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
        case patientDiagnosisConstants.DIAGNOSIS_FORM_DATA_REQUEST:
            return {
                ...state,
                sendingRequest       : true,
                isUpdateDone         : false,
                submitted            : false,
                errorMsg             : false,
                fetchedFormData      : false
            };
        case patientDiagnosisConstants.DIAGNOSIS_FORM_DATA_FAILURE:
            return {
                ...state,
                sendingRequest       : false,
                errorMsg             : action.errorMsg,
                fetchedFormData      : false,
            };
        case patientDiagnosisConstants.DIAGNOSIS_FORM_DATA_SUCCESS:
            return {
                ...state,
                sendingRequest               : false,
                diagnosisFormData            : action.patientDetails.result,
                fetchedFormData              : true,
            };

        // Add form factor Reducer's  
        case patientDiagnosisConstants.DIAGNOSIS_FACTOR_ADD_REQUEST:
            return {
                ...state,
                submitted        : true,
                errorMsg         : false,
                successMsg       : false,
                isFactorDataInsertDone: false,
            };
        case patientDiagnosisConstants.DIAGNOSIS_FACTOR_ADD_SUCCESS:
            return {
                ...state, 
                successMsg       : action.result.message,
                isFactorDataInsertDone: true ,
                submitted        : false,
                errorMsg         : false,
            };
        case patientDiagnosisConstants.DIAGNOSIS_FACTOR_ADD_FAILURE:
            return {
                ...state,
                submitted        : false, 
                dataGridRefresh  : false ,
                errorMsg         : action.errorMsg,
                successMsg       : false,
                isFactorDataInsertDone: false,
            }; 
        default:
            return state
    }
}