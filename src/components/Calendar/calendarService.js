/**
 * calendarService
 *
 * @package                SafeHealth
 * @subpackage             calendarService
 * @category               Service
 * @DateOfCreation         12 May 2018
 * @ShortDescription       This is responsible for calling all api related to appointmentsList
 */
import axios from 'axios';
import { utilityHelper,headerHelper } from '../../_helpers';
import { configConstants } from '../../_constants';
/**
* @DateOfCreation        30 july 2018
* @ShortDescription      This function is responsible to call appointmentsList api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
export const calendarService = {
    calendarDataList,
    doDeleteRequest
};

/**
* @DateOfCreation        30 july 2018
* @ShortDescription      This function is responsible to appointmentsList api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function calendarDataList(details){ 
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH+'bookings/calendarlist',
        data    : headerHelper.appendUserDataInJson(details),
        headers : headerHelper.getHeaderWithAuthorization()
    }).then(function (response) {
        return response;
    }).catch(function (response) {
        return response;
    });
}

/**
* @DateOfCreation        31 May 2018
* @ShortDescription      This function is responsible to call Delete symptom api
* @param                 JSON visit_symptom_id
* @return                JSON
*/
function doDeleteRequest(details) {
    return axios({
        method  : 'delete',
        url     : configConstants.API_BASE_PATH + 'manage-calendar-delete',
        data    : headerHelper.appendUserDataInJson(details),
        headers : headerHelper.getHeaderWithAuthorization()
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
    });
}
