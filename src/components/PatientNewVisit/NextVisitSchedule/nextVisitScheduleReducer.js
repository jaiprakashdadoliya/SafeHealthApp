import { configConstants } from '../../../_constants';
import { NextVisitScheduleConstants } from './NextVisitScheduleConstants';

/**
 *nextVisitScheduleReducer
 *
 * @package                ILD INDIA Registry
 * @subpackage             nextVisitScheduleReducer
 * @category               Reducers
 * @DateOfCreation         9 Aug 2018
 * @ShortDescription       This is responsible for all state related to next schedule visit
 */
//Initial State on load state and initial action with their type
const initialState = {
    isInsertDone            : false,
    submitted               : false,
    sendingRequest          : false,
    successMsg              : false,
    errorMsg                : false,
    isUserNotValid          : false,
    visitAppointmentTimeSlot: [],
    visitAppointmentClinic  : [],
    isTimeListingFatched    : false,
    isClinicFatched         : false,  
    isVisitScheduleFatched  : false,
    patNextVisitSchedule       : [], 
};

export function nextVisitSchedule(state = initialState, action) {
    switch (action.type) {
        case NextVisitScheduleConstants.NEW_VISIT_SCHEDULE_APPOINTMENT_TIME_REQUEST:
            return {
                ...state,
                sendingRequest      : true,
                isTimeListingFatched: false,
                isClinicFatched     : false
            };
        case NextVisitScheduleConstants.NEW_VISIT_SCHEDULE_APPOINTMENT_TIME_FAILURE:
            return {
                ...state,
                isTimeListingFatched: false,
                isClinicFatched     : false,
                sendingRequest  : false,
                errorMsg        : action.errorMsg
            };
        case NextVisitScheduleConstants.NEW_VISIT_SCHEDULE_APPOINTMENT_TIME_SUCCESS:
            return {
                ...state,
                sendingRequest              : false,
                isClinicFatched             : false,
                isTimeListingFatched        : true,
                visitAppointmentTimeSlot    : action.visitAppointmentTimeSlot
            };
        case NextVisitScheduleConstants.NEW_VISIT_SCHEDULE_ADD_REQUEST:
            return {
                ...state,
                submitted        : true,
                errorMsg         : false,
                successMsg       : false,
                isInsertDone     : false,
            };
        case NextVisitScheduleConstants.NEW_VISIT_SCHEDULE_ADD_SUCCESS:
            return {
                ...state, 
                successMsg       : action.result.message,
                isInsertDone     : true ,
                submitted        : false,
                errorMsg         : false,
            };
        case NextVisitScheduleConstants.NEW_VISIT_SCHEDULE_ADD_FAILURE:
            return {
                ...state,
                submitted        : false, 
                errorMsg         : action.errorMsg,
                successMsg       : false,
                isInsertDone     : false ,
            }; 
        case NextVisitScheduleConstants.NEW_VISIT_SCHEDULE_APPOINTMENT_CLINIC_LIST_REQUEST:
            return {
                ...state,
                isClinicFatched     : false,
                isTimeListingFatched: false,
                sendingRequest      : true
            };
        case NextVisitScheduleConstants.NEW_VISIT_SCHEDULE_APPOINTMENT_CLINIC_LIST_SUCCESS:
            return {
                ...state,
                sendingRequest         : false,
                isClinicFatched        : true,
                visitAppointmentClinic : action.visitAppointmentClinic
            };
        case NextVisitScheduleConstants.NEW_VISIT_SCHEDULE_APPOINTMENT_CLINIC_LIST_FAILURE:
            return {
                ...state,
                isClinicFatched     : false,
                isTimeListingFatched: false,
                sendingRequest      : false,
                errorMsg            : action.errorMsg
            };
        case NextVisitScheduleConstants.PAT_NEXT_VISIT_SCHEDULE_REQUEST:
            return {
                ...state,
                isVisitScheduleFatched : false,
                sendingRequest      : true
            };
        case NextVisitScheduleConstants.PAT_NEXT_VISIT_SCHEDULE_SUCCESS:
            return {
                ...state,
                sendingRequest         : false,
                isVisitScheduleFatched    : true,
                patNextVisitSchedule : action.nextVisitSchedule
            };
        case NextVisitScheduleConstants.PAT_NEXT_VISIT_SCHEDULE_FAILURE:
            return {
                ...state,
                isVisitScheduleFatched : false,
                sendingRequest      : false,
                errorMsg            : action.errorMsg
            };
        case NextVisitScheduleConstants.NEW_VISIT_SCHEDULE_RESET_STATE:
            return {
                ...state,
                submitted        : false, 
                errorMsg         : false,
                successMsg       : false,
                isInsertDone     : false,
                isTimeListingFatched: false,
                isClinicFatched  : false,
                isVisitScheduleFatched: false,
            }; 
        default:
            return state
    }
}

