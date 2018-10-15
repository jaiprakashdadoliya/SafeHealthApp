/**
 * doctorDegreeService
 *
 * @package                ILD India Registry
 * @subpackage             Patient Profile
 * @category               Service
 * @DateOfCreation         31 May 2018
 * @ShortDescription       This is responsible for calling all api related to Parent profile
 */
import axios from 'axios';
import { configConstants } from '../../_constants';
import { utilityHelper, headerHelper } from '../../_helpers';

/**
* @DateOfCreation        11 May 2018
* @ShortDescription      This function is responsible to call degree api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
export const patientDashboardProfileService = {
    patientProfile,
    patientMedicationListRequest      
};

/**
* @DateOfCreation        31 May 2018
* @ShortDescription      This function is responsible to call Fetch degree api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function patientProfile(patId) {
    let data = {pat_id: patId};
    return axios({
            method: 'POST',
            url: configConstants.API_BASE_PATH+'patients/profile/dashboard',
            headers : headerHelper.getHeaderWithAuthorization(),
            data    : headerHelper.appendUserDataInJson(data),
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}

/**
* @DateOfCreation        20 July 2018
* @ShortDescription      This function is responsible to get patient medication list
* @param                 JSON experience
* @return                Response JSON
*/
function patientMedicationListRequest(patId, page, pageSize, sorted, filtered) { 
    let dataForm = {pat_id: patId, page: page, pageSize: pageSize, sorted: sorted, filtered: filtered};
    return axios({
            method  : 'post',
            url     : configConstants.API_BASE_PATH +'visit/medication/current-medications',
            data    : headerHelper.appendUserDataInJson(dataForm),
            headers : headerHelper.getHeaderWithAuthorization()
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}