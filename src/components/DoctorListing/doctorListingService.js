/**
 * doctorListingService
 *
 * @package                SafeHealth
 * @subpackage             doctorListingService
 * @category               Service
 * @DateOfCreation         16 july 2018
 * @ShortDescription       This is responsible for calling all api related to service
 */
import axios from 'axios';
import { configConstants } from '../../_constants';
import { utilityHelper } from '../../_helpers';

/**
* @DateOfCreation        16 july 2018
* @ShortDescription      This function is responsible to call service api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
export const doctorListingService = {
    doctorListing,
    getTimeSlot
};

/**
* @DateOfCreation        16 july 2018
* @ShortDescription      This function is responsible to delete api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function doctorListing(ids, page, pageSize, filters, sortBy) { 
    return axios({
        method: 'post',
        url: configConstants.API_BASE_PATH+'search/doctors',
        data: {'ids':ids, 'page':page,'pageSize':pageSize, 'filters':filters,'sortBy':sortBy},
        headers: {'Content-Type': 'application/json' }
    }).then(function (response) {
        return response;
    }).catch(function (response) {
        return response;
    });
}

/**
* @DateOfCreation        16 july 2018
* @ShortDescription      This function is responsible to delete api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getTimeSlot(clinicId,slotDate,slot, filters) { 
    return axios({
        method: 'post',
        url: configConstants.API_BASE_PATH+'search/doctors/timeslots',
        data: {'clinic_id':clinicId,'slotDate':slotDate, 'slot':slot, 'filters':filters},
        headers: {'Content-Type': 'application/json' }
    }).then(function (response) {
        return response;
    }).catch(function (response) {
        return response;
    });
}


