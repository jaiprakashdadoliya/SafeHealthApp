import { doctorListingConstants } from './doctorListingConstants';
import { configConstants } from '../../_constants';
/**
 * doctorServiceReducer
 *
 * @package                SafeHealth
 * @subpackage             doctorServiceReducer
 * @category               Reducers
 * @DateOfCreation         17 May 2018
 * @ShortDescription       This is responsible for all state related to Doctor service
 */

//Initial State on load state and intial action with their type
const initialState = {
  sendingRequest: true,
  getTimeSlotDone: false,
  editMessage: false,
  deleteMessage:false,
  isUserNotValid:false,
  detail:{}
};

export function doctorListing(state = initialState, action) {
  switch (action.type) {
    case doctorListingConstants.DR_LISTING_REQUEST:
      return  { 
                 ...state,
                sendingRequest  : true
              };
    case doctorListingConstants.DR_LISTING_SUCCESS:
      return  { 
                ...state,
                sendingRequest: false, 
                doctorListing : action.doctorListing.result,
                pages         : action.doctorListing.pages,
                page          : action.doctorListing.page,
                searchedCity  : action.doctorListing.searched_city,
                searchedCount : action.doctorListing.searched_count,
                searchedSpl   : action.doctorListing.searched_spl,
                getTimeSlotDone: false
              };
    case doctorListingConstants.DR_LISTING_FAILURE:
      return  { 
                ...state,
                sendingRequest  : false, 
                errorMsg  : action.errorMsg
              };
    case doctorListingConstants.SLOT_LISTING_REQUEST:
      return  { 
                 ...state,
                sendingRequest  : false,
              };
    case doctorListingConstants.SLOT_LISTING_SUCCESS:
      return  { 
                ...state,
                sendingRequest  : false, 
                getTimeSlotDone : true,
                timeSlots       : action.timeSlots,
              };
    case doctorListingConstants.SLOT_LISTING_FAILURE:
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
    case doctorListingConstants.DR_LISTING_RESET_STATE:
      return {
                ...state,
                errorMsg: false
             };
    default:
      return state
  }
}