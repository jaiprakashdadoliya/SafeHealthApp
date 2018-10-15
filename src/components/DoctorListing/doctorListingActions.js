import { configConstants } from '../../_constants';
import { doctorListingService } from './doctorListingService';
import { utilityHelper } from '../../_helpers';
import { doctorListingConstants } from './doctorListingConstants';

/**
 * doctorServiceActions
 *
 * @package                SafeHealth
 * @subpackage             doctorServiceActions
 * @category               Actions
 * @DateOfCreation         21 May 2018
 * @ShortDescription       This is responsible for all service actions
 */ 
export const doctorListingActions = {
    doctorListing,
    getTimeSlot,
    resetState
};


/**
* @DateOfCreation        21 May 2018
* @ShortDescription      This function is responsible for doctor detail
* @param {object} doctorId doctor id
* @return                JSON Object in succsss message
*/
function doctorListing(ids,page,pageSize,filters,sortBy) {
    return dispatch => {
         dispatch(request());
        doctorListingService.doctorListing(ids, page, pageSize, filters,sortBy)
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
    function request() { return { type: doctorListingConstants.DR_LISTING_REQUEST } }
    function success(doctorListing) { return { type: doctorListingConstants.DR_LISTING_SUCCESS, doctorListing} }
    function failure(error) { return { type: doctorListingConstants.DR_LISTING_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


/**
* @DateOfCreation        10 july 2018
* @ShortDescription      This function is responsible for update service detail
* @param {object} serviceId Membership id
* @param {array} serviceList  list of all active service
* @return                JSON Object in succsss message
*/
function getTimeSlot(clinicId,slotDate,slot, filters) {
    return dispatch => {
         dispatch(request());
        doctorListingService.getTimeSlot(clinicId,slotDate,slot, filters)
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
    function request() { return { type: doctorListingConstants.SLOT_LISTING_REQUEST } }
    function success(timeSlots) { return { type: doctorListingConstants.SLOT_LISTING_SUCCESS, timeSlots} }
    function failure(error) { return { type: doctorListingConstants.SLOT_LISTING_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


/**
* @DateOfCreation        28 May 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function resetState(){
    return dispatch => { dispatch(request());}
    function request() { return { type: doctorListingConstants.DR_LISTING_RESET_STATE } }
}
