/**
 * patientResidentPlaceService
 *
 * @package                ILD India Registry
 * @subpackage             Patient Symptoms
 * @category               Service
 * @DateOfCreation         19 june 2018
 * @ShortDescription       This is responsible for calling all api related to Parent Symptoms
 */
import axios from 'axios';
import { configConstants } from '../../../../../_constants';
import { utilityHelper, headerHelper } from '../../../../../_helpers';

/**
* @DateOfCreation        19 june 2018
* @ShortDescription      This function is responsible to call Symptoms api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
export const patientResidentPlaceService = {
    getTablelist,
    doSubmitRequest,
    doDeleteRequest
};

/**
* @DateOfCreation        15 june 2018
* @ShortDescription      This function is responsible to call Fetch state api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function doSubmitRequest(patientDetails) { 
    return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'visit/resident-place/save',
            data: headerHelper.getJsonDataToFormData(patientDetails),
            headers : headerHelper.getHeaderWithAuthorization('multipart/form-data'),
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}

/**
* @DateOfCreation        19 june 2018
* @ShortDescription      This function is responsible to call Fetch Symptoms api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getTablelist(patId, visitId, page, pageSize, sorted, filtered) {
    let dataForm = {patId: patId, visitId: visitId, page: page, pageSize: pageSize, sorted: sorted, filtered: filtered};
    return axios({
            method  : 'post',
            url     : configConstants.API_BASE_PATH+'visit/resident-place/list',
            data    : dataForm,
            headers : headerHelper.getHeaderWithAuthorization()
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}

/**
* @DateOfCreation        31 May 2018
* @ShortDescription      This function is responsible to call Delete symptom api
* @param                 JSON visit_symptom_id
* @return                JSON
*/
function doDeleteRequest(patientDetails) {
    return axios({
        method  : 'delete',
        url     : configConstants.API_BASE_PATH + 'visit/resident-place/delete',
        headers : headerHelper.getHeaderWithAuthorization(),
        data    : headerHelper.appendUserDataInJson(patientDetails)
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
    });
}

