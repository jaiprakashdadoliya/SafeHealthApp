import { configConstants } from '../../_constants';
import { calendarConstants } from './calendarConstants';
/**
 * calendarReducer
 *
 * @package                SafeHealth
 * @subpackage             calendarReducer
 * @category               Reducers
 * @DateOfCreation         20 july 2018
 * @ShortDescription       This is responsible for all state related to calendar
 */

//Initial State on load state and intial action with their type
const initialState = {
  sendingRequest    : false,
  isUserNotValid    : false,
  calendarData      : [],
  fetchCalendarData : false,
  errorMsg          : false,
  successMsg        : false,
  isUpdateDone      : false,
};

export function calendar(state = initialState, action) {
  switch (action.type) {
    case calendarConstants.CALENDAR_REQUEST:
        return  { 
            ...state,
            sendingRequest      : true,
            fetchCalendarData   : false
        };
     case calendarConstants.CALENDAR_SUCCESS:
        return  { 
            ...state,
            sendingRequest      : false, 
            calendarData        : action.data,
            fetchCalendarData   : true
        };
    case calendarConstants.CALENDAR_FAILURE:
        return  { 
            ...state,
            sendingRequest      : false, 
            errorMsg            : action.errorMsg
        };
    case calendarConstants.CALENDAR_APPOINTMENT_DELETE_REQUEST:
        return {
            ...state,
            errorMsg         : false,
            successMsg       : false,
        };
    case calendarConstants.CALENDAR_APPOINTMENT_DELETE_SUCCESS:
        return {
            ...state, 
            successMsg       : action.result.message,
            errorMsg         : false,
            isUpdateDone     : true,
        };
    case calendarConstants.CALENDAR_APPOINTMENT_DELETE_FAILURE:
        return {
            ...state,
            dataGridRefresh  : false ,
            successMsg       : false ,
            errorMsg         : action.errorMsg,
        };

    case configConstants.UNAUTHENTICATE:
      return {
            ...state,
            isUserNotValid      : true,
            errorMsg            : false
        };  
    case calendarConstants.CALENDAR_RESET_STATE:
        return {
            ...state,
            errorMsg            : false,
            successMsg          : false,
            isUpdateDone        : false,
        };
    default:
      return state
  }
}