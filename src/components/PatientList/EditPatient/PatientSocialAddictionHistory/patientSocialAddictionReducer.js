import { configConstants } from '../../../../_constants';
import { patientSocialAddictionConstants } from './patientSocialAddictionConstants';


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
    fetchedSocialAddictionData   : false,
    isUpdateDone                : false,
    patientSocialAddictionData   : [],

};

export function patientSocialAddiction(state = initialState, action) {
    switch (action.type) {
        case patientSocialAddictionConstants.PATIENT_SOCIAL_ADDICTION_DATA_REQUEST:
            return {
                ...state,
                sendingRequest              : true,
                isUpdateDone                : false,
                submitted                   : false,
                errorMsg                    : false,
                fetchedSocialAddictionData  : false
            };
        case patientSocialAddictionConstants.PATIENT_SOCIAL_ADDICTION_DATA_FAILURE:
            return {
                ...state,
                sendingRequest              : false,
                errorMsg                    : action.errorMsg,
                fetchedSocialAddictionData   : false,
            };
        case patientSocialAddictionConstants.PATIENT_SOCIAL_ADDICTION_DATA_SUCCESS:
            return {
                ...state,
                sendingRequest             : false,
                patientSocialAddictionData : action.patientSocialAddictionData.result,
                fetchedSocialAddictionData : true,
            };
        case patientSocialAddictionConstants.NEW_SOCIAL_ADDICTION_DATA_REQUEST:
            return {
                ...state,
                isUpdateDone                : false,
                submitted                   : true,
                errorMsg                    : false,
            };
        case patientSocialAddictionConstants.NEW_SOCIAL_ADDICTION_DATA_FAILURE:
            return {
                ...state,
                submitted                   : false,
                errorMsg                    : action.errorMsg,
            };
        case patientSocialAddictionConstants.NEW_SOCIAL_ADDICTION_DATA_SUCCESS:
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
        case patientSocialAddictionConstants.PATIENT_SOCIAL_ADDICTION_RESET_STATE:
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
