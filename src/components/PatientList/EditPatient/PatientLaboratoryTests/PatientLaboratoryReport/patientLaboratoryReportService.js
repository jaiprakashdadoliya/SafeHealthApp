/**
 * patientLaboratoryReportService
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
export const patientLaboratoryReportService = {
    getTablelist,
    doSubmitRequest,
    doDeleteRequest,
    doDownloadRequest,
    getLabTemplates,
    showLabReport
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
            url: configConstants.API_BASE_PATH+'visit/laboratoryreport/save',
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
            url     : configConstants.API_BASE_PATH+'visit/laboratoryreport/list',
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
function getLabTemplates() {
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + 'visit/laboratorytemplates',
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
/**
* @DateOfCreation        31 May 2018
* @ShortDescription      This function is responsible to call Delete symptom api
* @param                 JSON visit_symptom_id
* @return                JSON
*/
function doDeleteRequest(patientDetails) {
    return axios({
        method  : 'delete',
        url     : configConstants.API_BASE_PATH + 'visit/laboratoryreport/delete',
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

/**
* @DateOfCreation        31 May 2018
* @ShortDescription      This function is responsible to call Delete symptom api
* @param                 JSON visit_symptom_id
* @return                JSON
*/
function doDownloadRequest(patientDetails) {
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + 'visit/laboratoryreport/download',
        headers : headerHelper.getHeaderWithAuthorization(),
        data    : headerHelper.appendUserDataInJson(patientDetails),
        responseType : 'blob', // important
}).then((response) => {
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', patientDetails.file_name);
  document.body.appendChild(link);
  link.click();
}).catch(response => {
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
function showLabReport(patId, visitId) {
    let dataForm = {patId: patId, visitId: visitId};
    return axios({
            method  : 'post',
            url     : configConstants.API_BASE_PATH+'visit/laboratoryreport/show',
            data    : dataForm,
            headers : headerHelper.getHeaderWithAuthorization()
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}

