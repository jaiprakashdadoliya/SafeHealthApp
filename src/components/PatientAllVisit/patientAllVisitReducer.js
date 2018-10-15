import { configConstants } from '../../_constants';
import { patientAllVisitConstants } from './patientAllVisitConstants';


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
    errorMsg                    : false,
    isUserNotValid              : false,
    fetchedNewVisitData         : false,
    isUpdateDone                : false,
    patientNewVisitData         : [],
    patientVisitList            : [],
    page : 0,

};

export function patientAllVisit(state = initialState, action) {
    switch (action.type) {
        case patientAllVisitConstants.NEW_PATIENT_FOLLOW_UP_REQUEST:
            return {
                ...state,
                sendingRequest              : true,
                isUpdateDone                : false,
                submitted                   : false,
                errorMsg                    : false,
                fetchedNewVisitData         : false,
                patientNewVisitData         : []
            };
        case patientAllVisitConstants.NEW_PATIENT_FOLLOW_UP_FAILURE:
            return {
                ...state,
                sendingRequest              : false,
                errorMsg                    : action.errorMsg,
                fetchedNewVisitData         : false,
            };
        case patientAllVisitConstants.NEW_PATIENT_FOLLOW_UP_SUCCESS:
            return {
                ...state,
                sendingRequest            : false,
                patientNewVisitData       : action.data.result,
                fetchedNewVisitData       : true,
            };

        case patientAllVisitConstants.PATIENT_VISIT_LIST_DATA_REQUEST:
            return {
                ...state,
                sendingRequest              : true,
                patientVisitList            : []
            };
        case patientAllVisitConstants.PATIENT_VISIT_LIST_DATA_FAILURE:
            return {
                ...state,
                sendingRequest              : false,
                errorMsg                    : action.errorMsg,
            };
        case patientAllVisitConstants.PATIENT_VISIT_LIST_DATA_SUCCESS:
            return {
                ...state,
                sendingRequest            : false,
                patientVisitList          : action.visitList.result,
                pages                     : action.visitList.pages,
            };

        case configConstants.UNAUTHENTICATE:
            return {
                ...state,
                isUserNotValid : true,
                errorMsg       : false
            };
        case patientAllVisitConstants.PATIENT_FOLLOW_UP_RESET_STATE:
            return {
                ...state,
                sendingRequest              : false,
                successMessage              : false,
                errorMsg                    : false,
                isUpdateDone                : false,
                patientNewVisitData         : [],
                fetchedNewVisitData         : false
            };
        default:
            return state
    }
}