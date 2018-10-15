/**
 * patientVaccinationHistoryService
 *
 * @package                SAFE HEALTH
 * @subpackage             Patient Vaccination history
 * @category               Service
 * @DateOfCreation         21 Sept 2018
 * @ShortDescription       This is responsible for calling all api related to Patient Vaccination history
 */
import axios from 'axios';
import { configConstants } from '../../../../_constants';
import { utilityHelper, headerHelper } from '../../../../_helpers';

/**
* @DateOfCreation        21 Sept 2018
* @ShortDescription      This function is responsible to call Patient Vaccination history api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
export const patientVaccinationHistoryService = {
    doGetVaccinationHistoryList,
    doSubmitRequest,
    doDeleteRequest
};

/**
* @DateOfCreation        21 Sept 2018
* @ShortDescription      This function is responsible to call submit api for store vaccination history record
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function doSubmitRequest(formData) { 
    return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'visit/vaccination-history/save',
            data: headerHelper.getJsonDataToFormData(formData),
            headers : headerHelper.getHeaderWithAuthorization('multipart/form-data'),
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}

/**
* @DateOfCreation        21 Sept 2018
* @ShortDescription      This function is responsible to call Fetch Vaccination history api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function doGetVaccinationHistoryList(patId, visitId, page, pageSize, sorted, filtered) {
    let dataForm = {patId: patId, visitId: visitId, page: page, pageSize: pageSize, sorted: sorted, filtered: filtered};
    return axios({
            method  : 'post',
            url     : configConstants.API_BASE_PATH+'visit/vaccination-history/list',
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
* @DateOfCreation        21 Sept 2018
* @ShortDescription      This function is responsible to call Delete vaccination history record
* @param                 JSON visit_symptom_id
* @return                JSON
*/
function doDeleteRequest(id) {
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + 'visit/vaccination-history/delete',
        headers : headerHelper.getHeaderWithAuthorization(),
        data    : headerHelper.appendUserDataInJson({'vaccination_id': id})
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
    });
}

