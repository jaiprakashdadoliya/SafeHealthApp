import { configConstants } from '../../../_constants';
import { manageCalendarAddConstants } from './manageCalendarAddConstants';


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
    submittedAdd                       : false,
    sendingRequest                  : false,
    successMessageAdd               : false,
    errorMsgAdd                     : false,
    isUserNotValid                  : false,
    fetchedManageCalendarAddData    : false,
    isUpdateDoneAdd                 : false,
    manageCalendarAddData           : [],

};

export function manageCalendarAdd(state = initialState, action) {
    switch (action.type) {
        case manageCalendarAddConstants.MANAGE_CALENDAR_ADD_REQUEST:
            return {
                ...state,
                sendingRequest                 : true,
                isUpdateDoneAdd                : false,
                submittedAdd                   : false,
                errorMsgAdd                    : false,
                fetchedManageCalendarAddData   : false
            };
        case manageCalendarAddConstants.MANAGE_CALENDAR_ADD_FAILURE:
            return {
                ...state,
                sendingRequest                 : false,
                errorMsgAdd                    : action.errorMsg,
                fetchedManageCalendarAddData   : false,
            };
        case manageCalendarAddConstants.MANAGE_CALENDAR_ADD_SUCCESS:
            return {
                ...state,
                sendingRequest               : false,
                manageCalendarAddData           : action.data.result,
                fetchedManageCalendarAddData : true,
            };
        case manageCalendarAddConstants.MANAGE_CALENDAR_ADD_NEW_REQUEST:
            return {
                ...state,
                isUpdateDoneAdd                : false,
                submittedAdd                   : true,
                errorMsgAdd                    : false,
            };
        case manageCalendarAddConstants.MANAGE_CALENDAR_ADD_NEW_FAILURE:
            return {
                ...state,
                submittedAdd                   : false,
                errorMsgAdd                    : action.errorMsg,
            };
        case manageCalendarAddConstants.MANAGE_CALENDAR_ADD_NEW_SUCCESS:
            return {
                ...state,
                successMessageAdd            : action.data.message,
                submittedAdd                 : false,
                isUpdateDoneAdd              : true,
            };
        case configConstants.UNAUTHENTICATE:
        return {
            ...state,
            isUserNotValid : true,
            errorMsg       : false
        };
        case manageCalendarAddConstants.MANAGE_CALENDAR_ADD_RESET_STATE:
            return {
                ...state,
                sendingRequest                 : false,
                successMessageAdd              : false,
                errorMsgAdd                    : false,
                isUpdateDoneAdd                : false,
            };
        default:
            return state
    }
}