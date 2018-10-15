import { doctorDetailConstants } from './doctorDetailConstants';
import { configConstants } from '../../../_constants';
/**
 * doctorServiceReducer
 *
 * @package                SafeHealth
 * @subpackage             doctorServiceReducer
 * @category               Reducers
 * @DateOfCreation         18 May 2018
 * @ShortDescription       This is responsible for all state related to Doctor service
 */

//Initial State on load state and intial action with their type
const initialState = {
  sendingRequest: false,
  fetchDone: false,
  editMessage: false,
  deleteMessage:false,
  isUserNotValid:false,
  detail:{},
  loginShow: false,
  slotAvailable: true,
  unavailableMsg: false,
  rating:{},
  doctorDetail:[]
};

export function doctorDetail(state = initialState, action) {
  switch (action.type) {
    case doctorDetailConstants.DR_DETAIL_REQUEST:
      return  { 
                 ...state,
                sendingRequest  : true,
              };
    case doctorDetailConstants.DR_DETAIL_SUCCESS:
      return  { 
                ...state,
                sendingRequest  : false, 
                doctorDetail    :action.doctorDetail.doctor_detail,
                doctorClinic    :action.doctorDetail.doctor_clinic,
              };
    case doctorDetailConstants.DR_DETAIL_FAILURE:
      return  { 
                ...state,
                sendingRequest  : false, 
                errorMsg  : action.errorMsg
              };
    case doctorDetailConstants.BOOKING_REQUEST:
      return  { 
                 ...state,
                sendingRequest  : true,
              };
    case doctorDetailConstants.BOOKING_SUCCESS:
      return  { 
                ...state,
                sendingRequest  : false, 
                fetchDone       : true,
                bookingDetail    :action.bookingDetail,
              };
    case doctorDetailConstants.BOOKING_FAILURE:
      return  { 
                ...state,
                sendingRequest  : false, 
                errorMsg  : action.errorMsg
              };
    case configConstants.UNAUTHENTICATE:
      return {
                ...state,
                isUserNotValid  : true,
                errorMsg        : false
            };  
    case doctorDetailConstants.LOGIN_SHOW:
      return {
                ...state,
                loginShow: true
             };
    case doctorDetailConstants.SLOT_AVAILABLE_REQUEST:
      return  { 
                 ...state,
                sendingRequest  : true,
              };
    case doctorDetailConstants.SLOT_AVAILABLE_FAILURE:
      return  { 
                ...state,
                sendingRequest  : false, 
                unavailableMsg  : action.errorMsg,
                slotAvailable   : false,
              };
    case doctorDetailConstants.SLOT_AVAILABLE_SUCCESS:
      return {
                ...state,
                sendingRequest  : false,
                slotAvailable: action.result,
             };
    case doctorDetailConstants.RATING_ADD_REQUEST:
      return  { 
                 ...state,
                sendingRequest  : true,
              };
    case doctorDetailConstants.RATING_ADD_SUCCESS:
      return {
                ...state,
                sendingRequest  : false,
                successMsg: action.rating.message,
                rating   : action.rating.result,
             };
    case doctorDetailConstants.RATING_ADD_FAILURE:
      return  { 
                ...state,
                sendingRequest  : false, 
                errorMsg  : action.rating.message,
                rating   : false,
              };
     case doctorDetailConstants.DR_DETAIL_RESET_STATE:
      return {
                ...state,
                errorMsg        : false,
                loginShow       : false,
                slotAvailable   : true,
                unavailableMsg  : false,
                successMsg      : false,
                sendingRequest  : false,
             };
    default:
      return state
  }
}