import { configConstants } from '../../../_constants';
import { utilityHelper } from '../../../_helpers';
import { clinicalNotesConstants } from './clinicalNotesConstants';

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
    isClinicalDataFetched       : false,
    clinicalNotesData           : [],
    clinicalNotesList           : [],

};

export function clinicalNotes(state = initialState, action) {
    switch (action.type) {
        case clinicalNotesConstants.CLINICAL_NOTES_LIST_DATA_REQUEST:
            return {
                ...state,
                sendingRequest : true,
                isUpdateDone   : false,
                submitted      : false,
                errorMsg       : false,
                isClinicalDataFetched : false
            };
        case clinicalNotesConstants.CLINICAL_NOTES_LIST_DATA_FAILURE:
            return {
                ...state,
                sendingRequest  : false,
                errorMsg        : action.errorMsg,
                isClinicalDataFetched : false
            };
        case clinicalNotesConstants.CLINICAL_NOTES_LIST_DATA_SUCCESS:
            return {
                ...state,
                sendingRequest      : false,
                clinicalNotesList   : action.result,
                isClinicalDataFetched : true
            };

        case clinicalNotesConstants.CLINICAL_NOTES_EDIT_REQUEST:
            return {
                ...state,
                sendingRequest : true,
                isUpdateDone   : false,
                submitted      : false,
                errorMsg       : false,
            };
        case clinicalNotesConstants.CLINICAL_NOTES_EDIT_FAILURE:
            return {
                ...state,
                sendingRequest  : false,
                errorMsg        : utilityHelper.getFirstErrorMessage(action.error.error),
                isUpdateDone    : false,
            };
        case clinicalNotesConstants.CLINICAL_NOTES_EDIT_SUCCESS:
            return {
                ...state,
                isUpdateDone    : true,
                sendingRequest  : false,
                successMessage  : action.result,
                errorMsg        : false
            };

        case clinicalNotesConstants.CLINICAL_NOTES_DELETE_REQUEST:
            return {
                ...state,
                sendingRequest : true,
            };
        case clinicalNotesConstants.CLINICAL_NOTES_DELETE_FAILURE:
            return {
                ...state,
                sendingRequest  : false,
                errorMsg        : action.error,
                isUpdateDone    : false,
            };
        case clinicalNotesConstants.CLINICAL_NOTES_DELETE_SUCCESS:
            return {
                ...state,
                isUpdateDone    : true,
                sendingRequest  : false,
                successMessage  : action.result,
                errorMsg        : false
            };

        case clinicalNotesConstants.CLINICAL_NOTES_RESET_STATE:
            return {
                ...state,
                submitted                   : false,
                sendingRequest              : false,
                successMessage              : false,
                errorMsg                    : false,
                isUserNotValid              : false,
                isUpdateDone                : false,
                isClinicalDataFetched       : false,
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