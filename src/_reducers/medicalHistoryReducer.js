import { medicalHistoryConstants, configConstants } from '../_constants';

/**
 *patient
 *
 * @package                ILD INDIA Registry
 * @subpackage             Medical History
 * @category               Reducers
 * @DateOfCreation         27 June 2018
 * @ShortDescription       This is responsible for all state related to Doctor profile
 */
//Initial State on load state and intial action with their type
const initialState = {
    submitted                   : false,
    sendingRequest              : false,
    successMessage              : false,
    errorMsg                    : false,
    isUserNotValid              : false,
    isUpdateDone                : false,
    patientMedicalHistoryData   : [],

};

export function medicalHistory(state = initialState, action) {
    switch (action.type) {
        case medicalHistoryConstants.MEDICAL_HISTORY_DATA_REQUEST:
            return {
                ...state,
                sendingRequest : true,
                isUpdateDone   : false,
                submitted      : false,
                errorMsg       : false,
            };
        case medicalHistoryConstants.MEDICAL_HISTORY_DATA_FAILURE:
            return {
                ...state,
                sendingRequest  : false,
                errorMsg        : action.errorMsg
            };
        case medicalHistoryConstants.MEDICAL_HISTORY_DATA_SUCCESS:
            return {
                ...state,
                sendingRequest            : false,
                patientMedicalHistoryData : action.patientMedicalHistoryData
            };
        case medicalHistoryConstants.MEDICAL_HISTORY_RESET_STATE:
            return {
                ...state,
                submitted      : false,
                sendingRequest : false,
                successMessage : false,
                errorMsg       : false,
                isUserNotValid : false,
                isUpdateDone   : false,
            };

        case medicalHistoryConstants.MEDICAL_HISTORY_ADD_UPDATE_REQUEST:
            return {
                ...state,
                submitted        : true,
                errorMsg         : false,
                successMessage   : false,
                isUpdateDone     : false,
            };
        case medicalHistoryConstants.MEDICAL_HISTORY_ADD_UPDATE_SUCCESS:
            return {
                ...state, 
                successMessage   : action.medicalHistoryUpdatedData.message,
                isUpdateDone     : true ,
                submitted        : false,
                errorMsg         : false,
            };
        case medicalHistoryConstants.MEDICAL_HISTORY_ADD_UPDATE_FAILURE:
            return {
                ...state,
                submitted        : false, 
                errorMsg         : action.errorMsg,
                successMessage   : false,
                isUpdateDone     : false ,
            }; 
        default:
            return state
    }
}