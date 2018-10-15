import { configConstants } from '../../_constants';
import { utilityHelper } from '../../_helpers';
import { patientHistoryConstants } from './patientHistoryConstants';

/**
 *Patient Activity History Reducer
 *
 * @package                SafeHealth
 * @subpackage             Patient Activity History Reducer
 * @category               Reducers
 * @DateOfCreation         3 Sept 2018
 * @ShortDescription       This is responsible for all state related to Patient activity history
 */

//Initial State on load state and initial action with their type
const initialState = {
    submitted                   : false,
    sendingRequest              : false,
    successMessage              : false,
    errorMsg                    : false,
    isUserNotValid              : false,
    isUpdateDone                : false,
    patientActivityHistory      : [],
    isPatientActivityHistoryFetched: false,
};

export function patientActivityHistory(state = initialState, action) {
    switch (action.type) {
        case patientHistoryConstants.PATIENT_ACTIVITY_DATA_REQUEST:
            return {
                ...state,
                sendingRequest : true,
                isUpdateDone   : false,
                submitted      : false,
                errorMsg       : false,
            };
        case patientHistoryConstants.PATIENT_ACTIVITY_DATA_FAILURE:
            return {
                ...state,
                sendingRequest  : false,
                errorMsg        : action.errorMsg
            };
        case patientHistoryConstants.PATIENT_ACTIVITY_DATA_SUCCESS:
            return {
                ...state,
                sendingRequest                  : false,
                isPatientActivityHistoryFetched : true,
                patientActivityHistory          : action.result
            };

        case patientHistoryConstants.PATIENT_ACTIVITY_RESET_STATE:
            return {
                ...state,
                submitted                   : false,
                sendingRequest              : false,
                successMessage              : false,
                errorMsg                    : false,
                isUserNotValid              : false,
                isUpdateDone                : false,
                patientActivityHistory      : [],
                isPatientActivityHistoryFetched: false,
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