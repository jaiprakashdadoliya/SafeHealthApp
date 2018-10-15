import { configConstants } from '../../../_constants';
import { manageCalendarConstants } from './manageCalendarConstants';


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
    fetchedManageCalendarData   : false,
    isUpdateDone                : false,
    manageCalendarData   : [],

};

export function manageCalendar(state = initialState, action) {
    switch (action.type) {
        case manageCalendarConstants.MANAGE_CALENDAR_REQUEST:
            return {
                ...state,
                sendingRequest              : true,
                isUpdateDone                : false,
                submitted                   : false,
                errorMsg                    : false,
                fetchedManageCalendarData   : false
            };
        case manageCalendarConstants.MANAGE_CALENDAR_FAILURE:
            return {
                ...state,
                sendingRequest              : false,
                errorMsg                    : action.errorMsg,
                fetchedManageCalendarData   : false,
            };
        case manageCalendarConstants.MANAGE_CALENDAR_SUCCESS:
            return {
                ...state,
                sendingRequest            : false,
                manageCalendarData        : action.data.result,
                fetchedManageCalendarData : true,
            };
        case manageCalendarConstants.MANAGE_CALENDAR_NEW_REQUEST:
            return {
                ...state,
                isUpdateDone                : false,
                submitted                   : true,
                errorMsg                    : false,
            };
        case manageCalendarConstants.MANAGE_CALENDAR_NEW_FAILURE:
            return {
                ...state,
                submitted                   : false,
                errorMsg                    : action.errorMsg,
            };
        case manageCalendarConstants.MANAGE_CALENDAR_NEW_SUCCESS:
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
        case manageCalendarConstants.MANAGE_CALENDAR_RESET_STATE:
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