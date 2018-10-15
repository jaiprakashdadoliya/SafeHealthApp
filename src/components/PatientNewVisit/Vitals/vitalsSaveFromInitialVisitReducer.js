import { configConstants } from '../../../_constants';
import { vitalsSaveFromInitialVisitConstants } from './vitalsSaveFromInitialVisitConstants';


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
    submitted                           : false,
    sendingRequest                      : false,
    successMessage                      : false,
    errorMsg                            : false,
    isUserNotValid                      : false,
    fetchedVitalsData                   : false,
    isUpdateDone                        : false,
    patientVitalsData                   : [],

};

export function vitalsSaveFromInitialVisit(state = initialState, action) {
    switch (action.type) {
        case vitalsSaveFromInitialVisitConstants.PATIENT_VITALS_DATA_REQUEST:
            return {
                ...state,
                sendingRequest                      : true,
                isUpdateDone                        : false,
                submitted                           : false,
                errorMsg                            : false,
                fetchedVitalsData                   : false
            };
        case vitalsSaveFromInitialVisitConstants.PATIENT_VITALS_DATA_FAILURE:
            return {
                ...state,
                sendingRequest                      : false,
                errorMsg                            : action.errorMsg,
                fetchedVitalsData                   : false,
            };
        case vitalsSaveFromInitialVisitConstants.PATIENT_VITALS_DATA_SUCCESS:
            return {
                ...state,
                sendingRequest                      : false,
                patientVitalsData                   : action.patientDetails.result,
                fetchedVitalsData                   : true,
            };
        case vitalsSaveFromInitialVisitConstants.PATIENT_VITALS_ADD_REQUEST:
            return {
                ...state,
                isUpdateDone                : false,
                submitted                   : true,
                errorMsg                    : false,
            };
        case vitalsSaveFromInitialVisitConstants.PATIENT_VITALS_ADD_FAILURE:
            return {
                ...state,
                submitted                   : false,
                errorMsg                    : action.errorMsg,
            };
        case vitalsSaveFromInitialVisitConstants.PATIENT_VITALS_ADD_SUCCESS:
            return {
                ...state,
                successMessage            : action.result.message,
                submitted                 : false,
                isUpdateDone              : true,
            };
        case configConstants.UNAUTHENTICATE:
        return {
            ...state,
            isUserNotValid : true,
            errorMsg       : false
        };
        case vitalsSaveFromInitialVisitConstants.PATIENT_VITALS_RESET_STATE:
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