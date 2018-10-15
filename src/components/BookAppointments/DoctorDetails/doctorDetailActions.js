import { configConstants } from '../../../_constants';
import { doctorDetailService } from './doctorDetailService';
import { utilityHelper } from '../../../_helpers';
import { doctorDetailConstants } from './doctorDetailConstants';

/**
 * doctorServiceActions
 *
 * @package                SafeHealth
 * @subpackage             doctorServiceActions
 * @category               Actions
 * @DateOfCreation         22 May 2018
 * @ShortDescription       This is responsible for all service actions
 */ 
export const doctorDetailActions = {
    doctorDetail,
    getBookingSlot,
    resetState,
    loginShowHandle,
    isSlotAvailable,
    ratingSave,
};


/**
* @DateOfCreation        21 May 2018
* @ShortDescription      This function is responsible for doctor detail
* @param {object} doctorId doctor id
* @return                JSON Object in succsss message
*/
function doctorDetail(doctorId) {
    return dispatch => {
         dispatch(request());
        doctorDetailService.doctorDetail(doctorId)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        dispatch(success(data.result));
                    }else if(data.code == configConstants.ERROR_CODE){
                        dispatch(failure(data.message));
                    }else if(data.code == configConstants.EXCEPTION_CODE){
                        dispatch(failure(data.message));
                    }else if(data.code == configConstants.UNAUTHENTICATE_CODE){
                        dispatch(unauthorize(data.message));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };
    function request() { return { type: doctorDetailConstants.DR_DETAIL_REQUEST } }
    function success(doctorDetail) { return { type: doctorDetailConstants.DR_DETAIL_SUCCESS, doctorDetail} }
    function failure(error) { return { type: doctorDetailConstants.DR_DETAIL_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


/**
* @DateOfCreation        10 july 2018
* @ShortDescription      This function is responsible for update service detail
* @param {object} serviceId Membership id
* @param {array} serviceList  list of all active service
* @return                JSON Object in succsss message
*/
function getBookingSlot(clinicId,userId,slotDate,slot) {
    return dispatch => {
        dispatch(request());
        doctorDetailService.bookingSlot(clinicId,userId,slotDate,slot)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        dispatch(success(data.result));
                    }else if(data.code == configConstants.ERROR_CODE){
                        dispatch(failure(data.message));
                    }else if(data.code == configConstants.EXCEPTION_CODE){
                        dispatch(failure(data.message));
                    }else if(data.code == configConstants.UNAUTHENTICATE_CODE){
                        dispatch(unauthorize(data.message));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };
    function request() { return { type: doctorDetailConstants.BOOKING_REQUEST } }
    function success(bookingDetail) { return { type: doctorDetailConstants.BOOKING_SUCCESS, bookingDetail} }
    function failure(error) { return { type: doctorDetailConstants.BOOKING_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


/**
* @DateOfCreation        28 May 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function resetState(){
    return dispatch => { dispatch(request());}
    function request() { return { type: doctorDetailConstants.DR_DETAIL_RESET_STATE } }
}

/**
* @DateOfCreation        20 May 2018
* @ShortDescription      This function is responsible to update the state to disaply login popup
* @return                JSON Object
*/
function loginShowHandle(){
    return dispatch => { dispatch(request());}
    function request() { return { type: doctorDetailConstants.LOGIN_SHOW } }
}

/**
* @DateOfCreation        24 July 2018
* @ShortDescription      This function is responsible to check if the bookings are availabale for selected slot
* @param                 timing_id, booking_date, booking_time
* @return                JSON Object
*/
function isSlotAvailable(timingId, bookingDate, bookingTime, userId){
    return dispatch => {
        dispatch(request());
        doctorDetailService.isSlotAvailable(timingId, bookingDate, bookingTime, userId)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        dispatch(success(data.result));
                    }else if(data.code == configConstants.ERROR_CODE){
                        dispatch(failure(data.message));
                    }else if(data.code == configConstants.EXCEPTION_CODE){
                        dispatch(failure(data.message));
                    }else if(data.code == configConstants.UNAUTHENTICATE_CODE){
                        dispatch(unauthorize(data.message));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };
    function request() { return { type: doctorDetailConstants.SLOT_AVAILABLE_REQUEST } }
    function success(result) { return { type: doctorDetailConstants.SLOT_AVAILABLE_SUCCESS, result} }
    function failure(error) { return { type: doctorDetailConstants.SLOT_AVAILABLE_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        10 july 2018
* @ShortDescription      This function is responsible for update rating detail
* @param {object} ratingId Membership id
* @param {array} ratingList  list of all active rating
* @return                JSON Object in succsss message
*/
function ratingSave(rating) {
    return dispatch => {
        dispatch(request());
        doctorDetailService.ratingSave(rating)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        let rating = {'message':data.message,'result': data.result}
                        dispatch(success(rating));
                    }else if(data.code == configConstants.ERROR_CODE){
                        dispatch(failure(data.message));
                    }else if(data.code == configConstants.EXCEPTION_CODE){
                        dispatch(failure(data.message));
                    }else if(data.code == configConstants.UNAUTHENTICATE_CODE){
                        dispatch(unauthorize(data.message));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };
    function request() { return { type: doctorDetailConstants.RATING_ADD_REQUEST } }
    function success(rating) { return { type: doctorDetailConstants.RATING_ADD_SUCCESS, rating} }
    function failure(error) { return { type: doctorDetailConstants.RATING_ADD_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}
