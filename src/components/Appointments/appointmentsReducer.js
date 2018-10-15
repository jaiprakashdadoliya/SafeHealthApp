import { configConstants } from '../../_constants';
import { appointmentsConstants } from './appointmentsConstants';
/**
 * appointmentsReducer
 *
 * @package                SafeHealth
 * @subpackage             appointmentsReducer
 * @category               Reducers
 * @DateOfCreation         20 july 2018
 * @ShortDescription       This is responsible for all state related to appointments
 */

//Initial State on load state and intial action with their type
const initialState = {
  sendingRequest: false,
  fetchDone: false,
  isUserNotValid:false,
  appointments:[],
  todaysAppointments:[]
};

export function appointments(state = initialState, action) {
  switch (action.type) {
    case appointmentsConstants.APPOINTMENTS_REQUEST:
      return  { 
                 ...state,
                sendingRequest  : true,
                fetchCalanderData: false,
              };
     case appointmentsConstants.APPOINTMENTS_SUCCESS:

      return  { 
                ...state,
                sendingRequest: false, 
                appointments  : action.appointments.result,
                pages         : action.appointments.pages,
                date          : action.appointments.date,
                fetchCalanderData: true,
              };
    case appointmentsConstants.APPOINTMENTS_FAILURE:
      return  { 
                ...state,
                sendingRequest  : false, 
                errorMsg  : action.errorMsg
              };
    case appointmentsConstants.TODAY_APPOINTMENT_REQUEST:
      return  { 
                 ...state,
                sendingRequest  : true,
              };
     case appointmentsConstants.TODAY_APPOINTMENT_SUCCESS:
      return  { 
                ...state,
                sendingRequest: false, 
                todaysappointments  : action.todaysAppointments,
              };
    case appointmentsConstants.TODAY_APPOINTMENT_FAILURE:
      return  { 
                ...state,
                sendingRequest  : false, 
                errorMsg  : action.errorMsg
              };
    case appointmentsConstants.GET_BOOKING_PATIENT_REQUEST:
      return  { 
                 ...state,
                sendingRequest  : true,
                isPatientBookingFetched:false
              };
    case appointmentsConstants.GET_BOOKING_PATIENT_SUCCESS:
      return  {
                ...state,
                sendingRequest: false, 
                isPatientBookingFetched: true,
                bookingPatient  : action.bookingPatient.result,
              };
    case appointmentsConstants.GET_BOOKING_PATIENT_FAILURE:
      return  { 
                ...state,
                sendingRequest  : false, 
                isPatientBookingFetched:true,
                errorMsg  : action.errorMsg
              };
    case appointmentsConstants.GET_BOOKING_CLINIC_REQUEST:
      return  { 
                 ...state,
                sendingRequest  : true,
                isClinicFatched:false
              };
    case appointmentsConstants.GET_BOOKING_CLINIC_SUCCESS:
      return  {
                ...state,
                sendingRequest: false, 
                isClinicFatched: true,
                bookingClinic  : action.bookingClinic,
              };
    case appointmentsConstants.GET_BOOKING_CLINIC_FAILURE:
      return  { 
                ...state,
                sendingRequest  : false, 
                isClinicFatched:true,
                errorMsg  : action.errorMsg
              };
    case appointmentsConstants.APPOINTMENT_TIME_REQUEST:
      return  { 
                 ...state,
                sendingRequest  : true,
                isTimeListingFatched:false
              };
    case appointmentsConstants.APPOINTMENT_TIME_SUCCESS:
      return  {
                ...state,
                sendingRequest: false, 
                isTimeListingFatched: true,
                appointmentTimeSlot  : action.appointmentTimeSlot,
              };
    case appointmentsConstants.APPOINTMENT_TIME_FAILURE:
      return  { 
                ...state,
                sendingRequest  : false, 
                isTimeListingFatched:true,
                errorMsg  : action.errorMsg
              };
   case appointmentsConstants.APPOINTMENT_ADD_REQUEST:
        return {
            ...state,
            sendingRequest        : true,
            errorMsg         : false,
            successMsg       : false,
            isInsertDone     : false,
        };
    case appointmentsConstants.APPOINTMENT_ADD_SUCCESS:
        return {
            ...state, 
            successMsg       : action.result.message,
            isInsertDone     : true ,
            sendingRequest   : false,
            errorMsg         : false,
            appointments     : [...state.appointments,action.result.detail],
        
        };
    case appointmentsConstants.APPOINTMENT_ADD_FAILURE:
        return {
            ...state,
            sendingRequest        : false, 
            errorMsg         : action.errorMsg,
            successMsg       : false,
            isInsertDone     : false ,
        };
    case configConstants.UNAUTHENTICATE:
      return {
                ...state,
                isUserNotValid  : true,
                errorMsg        : false
            };  
    case appointmentsConstants.APPOINTMENTS_RESET_STATE:
      return {
                ...state,
                errorMsg         : false,
                successMsg       : false,
                isInsertDone     : false,
                isPatientBookingFetched:false,
                isClinicFatched:false,
                isTimeListingFatched: false,
             };
    default:
      return state
  }
}