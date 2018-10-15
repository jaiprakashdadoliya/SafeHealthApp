import { configConstants } from '../../../../_constants';
import { patientFamilyMedicalHistoryConstants } from './patientFamilyMedicalHistoryConstants';


/**
 *patient
 *
 * @package                ILD INDIA Registry
 * @subpackage             Family Medical History
 * @category               Reducers
 * @DateOfCreation         15 June 2018
 * @ShortDescription       This is responsible for all state related to patient general Checkup history
 */
//Initial State on load state and intial action with their type
const initialState = {
    submitted                   : false,
    sendingRequest              : false,
    successMessage              : false,
    errorMsg                    : false,
    isUserNotValid              : false,
    fetchedFamilyMedicalData    : false,
    isUpdateDone                : false,
    patientFamilyMedicalData    : [],

};

export function patientFamilyMedicalHistory(state = initialState, action) {
    switch (action.type) {
        case patientFamilyMedicalHistoryConstants.PATIENT_FAMILY_MEDICAL_HISTORY_DATA_REQUEST:
            return {
                ...state,
                sendingRequest              : true,
                isUpdateDone                : false,
                submitted                   : false,
                errorMsg                    : false,
                fetchedFamilyMedicalData    : false
            };
        case patientFamilyMedicalHistoryConstants.PATIENT_FAMILY_MEDICAL_HISTORY_DATA_FAILURE:
            return {
                ...state,
                sendingRequest              : false,
                errorMsg                    : action.errorMsg,
                fetchedFamilyMedicalData    : false,
            };
        case patientFamilyMedicalHistoryConstants.PATIENT_FAMILY_MEDICAL_HISTORY_DATA_SUCCESS:
            return {
                ...state,
                sendingRequest              : false,
                patientFamilyMedicalData    : action.patientFamilyMedicalData.result,
                fetchedFamilyMedicalData    : true,
            };
        case patientFamilyMedicalHistoryConstants.NEW_FAMILY_MEDICAL_HISTORY_DATA_REQUEST:
            return {
                ...state,
                isUpdateDone                : false,
                submitted                   : true,
                errorMsg                    : false,
            };
        case patientFamilyMedicalHistoryConstants.NEW_FAMILY_MEDICAL_HISTORY_DATA_FAILURE:
            return {
                ...state,
                submitted                   : false,
                errorMsg                    : action.errorMsg,
            };
        case patientFamilyMedicalHistoryConstants.NEW_FAMILY_MEDICAL_HISTORY_DATA_SUCCESS:
            return {
                ...state,
                successMessage            : action.data.message,
                submitted                 : false,
                isUpdateDone              : true,
            };
        case configConstants.UNAUTHENTICATE:
        return {
            ...state,
            isUserNotValid : true,
            errorMsg       : false
        };
        case patientFamilyMedicalHistoryConstants.PATIENT_FAMILY_MEDICAL_HISTORY_RESET_STATE:
            return {
                ...state,
                sendingRequest              : false,
                successMessage              : false,
                errorMsg                    : false,
                isUpdateDone                : false,
            };
        default:
            return state
    }
}