/**
 * patientAllVisitService
 *
 * @package                ILD India Registry
 * @subpackage             patientAllVisitService
 * @category               Service
 * @DateOfCreation         31 May 2018
 * @ShortDescription       This is responsible for calling all api related to domestic Factor Service
 */
import axios from 'axios';
import { configConstants } from '../../_constants';
import { utilityHelper, headerHelper } from '../../_helpers';

/**
* @DateOfCreation        11 May 2018
* @ShortDescription      This function is responsible to call Consultant api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
export const patientAllVisitService = {
    doNewVisitCreate,
    getPatientVisitListRequest
};

/**
* @DateOfCreation        18 June 2018
* @ShortDescription      This function is responsible to get Consultant record api
* @param                 JSON experience
* @return                Response JSON
*/
function doNewVisitCreate(patientDetails) { 
    return axios({
        method: 'POST',
        url: configConstants.API_BASE_PATH+'patients/profile/new-visit-id',
        data : headerHelper.appendUserDataInJson(patientDetails),
        headers : headerHelper.getHeaderWithAuthorization()
    }).then(function (response) {
        return response;
    }).catch(function (response) {
        return response;
    });
}

/**
* @DateOfCreation        11 July 2018
* @ShortDescription      This function is responsible to call save visit form data
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getPatientVisitListRequest(patId, page, pageSize, sorted, filtered, bookingId) { 
    let data = {patId: patId, page: page, pageSize: pageSize, sorted: sorted, filtered: filtered, bookingId: bookingId};
    return axios({
            method: 'POST',
            url: configConstants.API_BASE_PATH+'visit/list',
            data    : headerHelper.appendUserDataInJson(data),
            headers : headerHelper.getHeaderWithAuthorization()
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}