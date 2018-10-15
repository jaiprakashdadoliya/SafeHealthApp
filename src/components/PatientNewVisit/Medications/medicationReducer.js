import { configConstants } from '../../../_constants';
import { utilityHelper } from '../../../_helpers';
import { medicationConstants } from './medicationConstants';

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
    isEditSuccess               : false,
    isMedicationDataFetched     : false,
    medicineList                : [],
    patientMedicationData       : [],
    patientTemplateMedicationData: [],
    medicineData                : [],
    templateSaveMSg             : '',
    medicineTempList            : [],
    medicineDataBySearch        : [],
    isSearchDone                : false,
    isUnitFetched               : false,
    isTemplateDataFetched       : false,
};

export function Medications(state = initialState, action) {
    switch (action.type) {
        case medicationConstants.MEDICINE_LIST_DATA_REQUEST:
            return {
                ...state,
                sendingRequest : true,
                isUpdateDone   : false,
                submitted      : false,
                errorMsg       : false,
                isUnitFetched  : false,
                isTemplateDataFetched: false
            };
        case medicationConstants.MEDICINE_LIST_DATA_FAILURE:
            return {
                ...state,
                sendingRequest  : false,
                errorMsg        : action.errorMsg,
                isUnitFetched   : false,
            };
        case medicationConstants.MEDICINE_LIST_DATA_SUCCESS:
            return {
                ...state,
                sendingRequest  : false,
                isUnitFetched   : true,
                medicineList    : action.result
            };

        case medicationConstants.MEDICATION_TEMP_REQUEST:
            return {
                ...state,
                isTemplateDataFetched: false
            };
        case medicationConstants.MEDICATION_TEMP_FAILURE:
            return {
                ...state,
                errorMsg        : action.errorMsg
            };
        case medicationConstants.MEDICATION_TEMP_SUCCESS:
            return {
                ...state,
                templateSaveMSg  : action.result.message,
                medicineTempList : [...state.medicineTempList,action.result.template]
            };
        case medicationConstants.MEDICINE_TEMP_DATA_REQUEST:
            return {
                ...state,
                isTemplateDataFetched: false
            };
        case medicationConstants.MEDICATIONS_RESET_STATE_TEMPLATE_DATA_FETCHED:
            return {
                ...state,
                isTemplateDataFetched: false
            };
        case medicationConstants.MEDICINE_TEMP_DATA_FAILURE:
            return {
                ...state,
                errorMsg        : action.errorMsg
            };
        case medicationConstants.MEDICINE_TEMP_DATA_SUCCESS:
           return {
                 ...state,
                sendingRequest  : false,
                medicineTempList : action.result
            };    
        case medicationConstants.MEDICINE_TEMP_FETCH_REQUEST:
            return {
                ...state,
                sendingRequest  : false,
                patientTemplateMedicationData: [],
                isTemplateDataFetched: false
            };
        case medicationConstants.MEDICINE_TEMP_FETCH_FAILURE:
            return {
                ...state,
                errorMsg        : action.errorMsg,
                patientTemplateMedicationData: [],
                isTemplateDataFetched: false
            };
        case medicationConstants.MEDICINE_TEMP_FETCH_SUCCESS:
           return {
                 ...state,
                sendingRequest  : false,
                patientTemplateMedicationData : action.result,
                isTemplateDataFetched: true
            };      
        case medicationConstants.MEDICATION_EDIT_REQUEST:
            return {
                ...state,
                sendingRequest : true,
                isUpdateDone   : false,
                submitted      : false,
                errorMsg       : false,
                isEditSuccess  : false,
                isTemplateDataFetched: false,
            };
        case medicationConstants.MEDICATION_EDIT_FAILURE:
            return {
                ...state,
                sendingRequest  : false,
                errorMsg        : utilityHelper.getFirstErrorMessage(action.error.error),
                isUpdateDone    : false,
                isEditSuccess   : false,
            };
        case medicationConstants.MEDICATION_EDIT_SUCCESS:
            return {
                ...state,
                isUpdateDone    : true,
                sendingRequest  : false,
                isEditSuccess   : true,
                successMessage  : action.result,
                errorMsg        : false,
            };

        case medicationConstants.PATIENT_MEDICINE_DATA_REQUEST:
            return {
                ...state,
                sendingRequest : true,
                isUpdateDone   : false,
                submitted      : false,
                errorMsg       : false,
                isMedicationDataFetched: false,
            };
        case medicationConstants.PATIENT_MEDICINE_DATA_FAILURE:
            return {
                ...state,
                sendingRequest  : false,
                errorMsg        : action.error,
                isMedicationDataFetched: false,
            };
        case medicationConstants.PATIENT_MEDICINE_DATA_SUCCESS:
            return {
                ...state,
                isMedicationDataFetched : true,
                sendingRequest  : false,
                patientMedicationData: action.result.patientMedicationData,
                errorMsg        : false
            };

        case medicationConstants.MEDICATION_DELETE_REQUEST:
            return {
                ...state,
                sendingRequest : true,
            };
        case medicationConstants.MEDICATION_DELETE_FAILURE:
            return {
                ...state,
                sendingRequest  : false,
                errorMsg        : action.error,
                isUpdateDone    : false,
            };
        case medicationConstants.MEDICATION_DELETE_SUCCESS:
            return {
                ...state,
                isUpdateDone    : true,
                sendingRequest  : false,
                successMessage  : action.result,
                errorMsg        : false
            };

        case medicationConstants.DISCONTINUE_MEDICATION_REQUEST:
            return {
                ...state,
                sendingRequest : true,
            };
        case medicationConstants.DISCONTINUE_MEDICATION_FAILURE:
            return {
                ...state,
                sendingRequest  : false,
                errorMsg        : action.error,
                isUpdateDone    : false,
            };
        case medicationConstants.DISCONTINUE_MEDICATION_SUCCESS:
            return {
                ...state,
                isUpdateDone    : true,
                sendingRequest  : false,
                successMessage  : action.result,
                errorMsg        : false
            };

        case medicationConstants.MEDICATIONS_RESET_STATE:
            return {
                ...state,
                submitted                   : false,
                sendingRequest              : false,
                successMessage              : false,
                errorMsg                    : false,
                isUserNotValid              : false,
                isUpdateDone                : false,
                isMedicationDataFetched     : false,
                isEditSuccess               : false,
                medicineData                : [],
                templateSaveMSg             : '',
                isUnitFetched               : false,
                isTemplateDataFetched       : false
                // isSearchDone                : false,
                // medicineDataBySearch        : [],
            };

        case medicationConstants.GET_MEDICINE_DATA_REQUEST:
            return {
                ...state,
                sendingRequest : true
            };
        case medicationConstants.GET_MEDICINE_DATA_SUCCESS:
            return {
                ...state,
                sendingRequest  : false,
                medicineData    : action.result.medicineData
            };
        case medicationConstants.GET_MEDICINE_DATA_FAILURE:
            return {
                ...state,
                sendingRequest  : false,
                errorMsg        : action.errorMsg
            };

        case medicationConstants.SEARCH_MEDICINE_REQUEST:
            return {
                ...state,
                sendingRequest : true,
                isSearchDone   : false,
            };
        case medicationConstants.SEARCH_MEDICINE_SUCCESS:
            return {
                ...state,
                sendingRequest      : false,
                isSearchDone        : true,
                medicineDataBySearch: action.result.medicineData
            };
        case medicationConstants.SEARCH_MEDICINE_FAILURE:
            return {
                ...state,
                sendingRequest  : false,
                isSearchDone    : false,
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