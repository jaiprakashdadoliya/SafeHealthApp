/**
 * doctorDetailService
 *
 * @package                SafeHealth
 * @subpackage             doctorDetailService
 * @category               Service
 * @DateOfCreation         12 May 2018
 * @ShortDescription       This is responsible for calling all api related to service
 */
import axios from 'axios';
import { configConstants } from '../../../_constants';
import { utilityHelper } from '../../../_helpers';

/**
* @DateOfCreation        11 May 2018
* @ShortDescription      This function is responsible to call service api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
export const doctorDetailService = {
    doctorDetail,
    bookingSlot,
    isSlotAvailable,
    ratingSave,
};

/**
* @DateOfCreation        22 May 2018
* @ShortDescription      This function is responsible to delete api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function doctorDetail(doctorId) { 
    return axios({
        method: 'get',
        url: configConstants.API_BASE_PATH+'doctor/'+doctorId,
        headers: {'Content-Type': 'application/json' }
    }).then(function (response) {
        return response;
    }).catch(function (response) {
        return response;
    });
}

/**
* @DateOfCreation        22 May 2018
* @ShortDescription      This function is responsible to delete api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function bookingSlot(clinicId,userId,slotDate,slot) { 
    return axios({
        method: 'post',
        url: configConstants.API_BASE_PATH+'doctor/public/clinic',
        data: {'clinicId':clinicId,'userId':userId,'slotDate':slotDate, 'slot':slot},
        headers: {'Content-Type': 'application/json' }
    }).then(function (response) {
        return response;
    }).catch(function (response) {
        return response;
    });
}

/**
* @DateOfCreation        24 July 2018
* @ShortDescription      This function is responsible to check slot availability
* @param                 timing_id, booking_date, booking_time
* @return                Response JSON jsonObj
*/
function isSlotAvailable(timingId, bookingDate, bookingTime, userId) { 
    return axios({
        method: 'post',
        url: configConstants.API_BASE_PATH+'bookings/isSlotAvailable',
        data: {'timing_id':timingId,'booking_date':bookingDate,'booking_time':bookingTime, 'user_id':userId},
        headers: {'Content-Type': 'application/json' }
    }).then(function (response) {
        return response;
    }).catch(function (response) {
        return response;
    });
}

/**
* @DateOfCreation        22 May 2018
* @ShortDescription      This function is responsible to delete api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function ratingSave(rating) { 
    return axios({
        method: 'post',
        url: configConstants.API_BASE_PATH+'patient/review/save',
        data: rating,
        headers: {'Content-Type': 'application/json', 'Authorization' : 'Bearer '+utilityHelper.getLoginAccessToken()}
    }).then(function (response) {
        return response;
    }).catch(function (response) {
        return response;
    });
}
