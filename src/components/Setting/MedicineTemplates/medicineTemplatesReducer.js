import { configConstants } from '../../../_constants';
import { utilityHelper } from '../../../_helpers';
import { medicineTemplatesConstants } from './medicineTemplatesConstants';

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
    sendingRequest              : false,
    successMessage              : false,
    errorMsg                    : false,
    isUserNotValid              : false,
    isUpdateDone                : false,
    isEditSuccess               : false,
    medicineList                : [],
    patientMedicationData       : [],
    medicineData                : [],
    templateSaveMSg             : false,
    templateUpdateMSg           : false,
    templateDeleteMSg           : false,
    medicineTempList            : [],
    isFatchDone                 : false,

};

export function medicineTemplates(state = initialState, action) {
    switch (action.type) {
        case medicineTemplatesConstants.SETTINGS_MED_LIST_DATA_REQUEST:
            return {
                ...state,
                sendingRequest : true,
                isUpdateDone   : false,
                errorMsg       : false,
            };
        case medicineTemplatesConstants.SETTINGS_MED_LIST_DATA_FAILURE:
            return {
                ...state,
                sendingRequest  : false,
                errorMsg        : action.errorMsg
            };
        case medicineTemplatesConstants.SETTINGS_MED_LIST_DATA_SUCCESS:
            return {
                ...state,
                sendingRequest  : false,
                medicineList    : action.result
            };

        case medicineTemplatesConstants.SETTINGS_MED_TEMP_ADD_REQUEST:
            return {
                ...state
            };
        case medicineTemplatesConstants.SETTINGS_MED_TEMP_ADD_FAILURE:
            return {
                ...state,
                errorMsg        : action.errorMsg
            };
        case medicineTemplatesConstants.SETTINGS_MED_TEMP_ADD_SUCCESS:
            return {
                ...state,
                templateSaveMSg  : action.result.message,
                medicineTempList : action.result.medicineTempList
            };
        case medicineTemplatesConstants.MEDICATION_TEMP_UPDATE_REQUEST:
            return {
                ...state,
                isUpdateDone : false,

            };
        case medicineTemplatesConstants.MEDICATION_TEMP_UPDATE_FAILURE:
            return {
                ...state,
                errorMsg        : action.errorMsg,
                isUpdateDone : false,
            };
        case medicineTemplatesConstants.MEDICATION_TEMP_UPDATE_SUCCESS:
            return {
                ...state,
                templateUpdateMSg  : action.result.message,
                medicineTempList : action.result.medicineTempList,
                isUpdateDone : true,
            };
        case medicineTemplatesConstants.SETTINGS_MED_TEMP_DATA_REQUEST:
            return {
                ...state
            };
        case medicineTemplatesConstants.SETTINGS_MED_TEMP_DATA_FAILURE:
            return {
                ...state,
                errorMsg        : action.errorMsg
            };
        case medicineTemplatesConstants.SETTINGS_MED_TEMP_DATA_SUCCESS:
            return {
                 ...state,
                sendingRequest  : false,
                medicineTempList : action.result.result,
                pages          : action.result.pages  
            };

        case medicineTemplatesConstants.MEDICATION_TEMP_DELETE_REQUEST:
            return  { 
                 ...state,
                sendingRequest  : true,
              };
        case medicineTemplatesConstants.MEDICATION_TEMP_DELETE_SUCCESS:
            return  { 
                ...state,
                sendingRequest  : false, 
                templateDeleteMSg : action.result.message,
                medicineTempList : action.result.medicineTempList,
              };
        case medicineTemplatesConstants.MEDICATION_TEMP_DELETE_FAILURE:
            return  { 
                ...state,
                sendingRequest  : false, 
             };

        case medicineTemplatesConstants.SETTINGS_MED_TEMP_FETCH_REQUEST:
            return {
                ...state,
                 sendingRequest  : true,
            };
        case medicineTemplatesConstants.SETTINGS_MED_TEMP_FETCH_FAILURE:
            return {
                ...state,
                 sendingRequest  : false,
            };
        case medicineTemplatesConstants.SETTINGS_MED_TEMP_FETCH_SUCCESS:
           return {
                 ...state,
                sendingRequest  : false,
                patientMedicationData : action.result,
                isUpdateDone : false,
                isFatchDone : true,
            };      

        case medicineTemplatesConstants.MEDICATIONS_RESET_STATE:
            return {
                ...state,
                
                sendingRequest              : false,
                successMessage              : false,
                errorMsg                    : false,
                isUserNotValid              : false,
                isUpdateDone                : false,
                isEditSuccess               : false,
                templateSaveMSg             : false,
                templateUpdateMSg           : false,
                templateDeleteMSg           : false,
                isFatchDone                 : false,
            };

        case medicineTemplatesConstants.GET_MEDICINE_DATA_REQUEST:
            return {
                ...state,
                sendingRequest : true
            };
        case medicineTemplatesConstants.GET_MEDICINE_DATA_SUCCESS:
            return {
                ...state,
                sendingRequest  : false,
                medicineData    : action.result.medicineData
            };
        case medicineTemplatesConstants.GET_MEDICINE_DATA_FAILURE:
            return {
                ...state,
                sendingRequest  : false,
                errorMsg        : action.errorMsg
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