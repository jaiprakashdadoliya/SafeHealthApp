import { configConstants } from '../../../../_constants';
import { patientConsultantConstants } from './patientConsultantConstants';


/**
 *patient
 *
 * @package                ILD INDIA Registry
 * @subpackage             General Checkup
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
    fetchedConsultantData   : false,
    isUpdateDone                : false,
    patientConsultantData   : [],

};

export function patientConsultant(state = initialState, action) {
    switch (action.type) {
        case patientConsultantConstants.PATIENT_CONSULTANT_DATA_REQUEST:
            return {
                ...state,
                sendingRequest              : true,
                isUpdateDone                : false,
                submitted                   : false,
                errorMsg                    : false,
                fetchedConsultantData   : false
            };
        case patientConsultantConstants.PATIENT_CONSULTANT_DATA_FAILURE:
            return {
                ...state,
                sendingRequest              : false,
                errorMsg                    : action.errorMsg,
                fetchedConsultantData   : false,
            };
        case patientConsultantConstants.PATIENT_CONSULTANT_DATA_SUCCESS:
            return {
                ...state,
                sendingRequest            : false,
                patientConsultantData : action.patientConsultantData.result,
                fetchedConsultantData : true,
            };
        case patientConsultantConstants.NEW_CONSULTANT_DATA_REQUEST:
            return {
                ...state,
                isUpdateDone                : false,
                submitted                   : true,
                errorMsg                    : false,
            };
        case patientConsultantConstants.NEW_CONSULTANT_DATA_FAILURE:
            return {
                ...state,
                submitted                   : false,
                errorMsg                    : action.errorMsg,
            };
        case patientConsultantConstants.NEW_CONSULTANT_DATA_SUCCESS:
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
        case patientConsultantConstants.PATIENT_CONSULTANT_RESET_STATE:
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