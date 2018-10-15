/**
 * patientDiagnosisService
 *
 * @package                Safe Health
 * @subpackage             Patient Diagnosiss
 * @category               Service
 * @DateOfCreation         07 Aug 2018
 * @ShortDescription       This is responsible for calling all api related to Parent Diagnosiss
 */
import axios from 'axios';
import { configConstants } from '../../../../_constants';
import { utilityHelper, headerHelper } from '../../../../_helpers';

/**
* @DateOfCreation        19 june 2018
* @ShortDescription      This function is responsible to call Diagnosiss api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
export const patientDiagnosisService = {
    getDiagnosisListRequest,
    getDiagnosisOptionListRequest,
    doAddUpdatePatientDiagnosisRequest,
    doDeletePatientDiagnosis,
    getDiagnosisFormRequest,
    patientDiagnosisFactorSubmitRequest
};

/**
* @DateOfCreation        8 Aug 2018
* @ShortDescription      This function is responsible to call Fetch Diagnosis option list api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getDiagnosisOptionListRequest() {
    var dataForm = {};
    return axios({
            method  : 'post',
            url     : configConstants.API_BASE_PATH+'visit/diagnosis/option-list',
            headers : headerHelper.getHeaderWithAuthorization(),
            data    : headerHelper.appendUserDataInJson(dataForm),
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}

/**
* @DateOfCreation        8 Aug 2018
* @ShortDescription      This function is responsible to call Fetch Diagnosis List api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getDiagnosisListRequest(patId, visitId, page, pageSize, sorted, filtered) {
    let dataForm = {patId: patId, visitId: visitId, page: page, pageSize: pageSize, sorted: sorted, filtered: filtered};
    return axios({
            method  : 'post',
            url     : configConstants.API_BASE_PATH+'visit/diagnosis/list',
            data    : headerHelper.appendUserDataInJson(dataForm),
            headers : headerHelper.getHeaderWithAuthorization()
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}

/**
* @DateOfCreation        8 Aug 2018
* @ShortDescription      This function is responsible to call Fetch state api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function doAddUpdatePatientDiagnosisRequest(diagnosis) { 
    return axios({
        method: 'post',
        url: configConstants.API_BASE_PATH+'visit/diagnosis/add-edit',
        data: headerHelper.getJsonDataToFormData(diagnosis),
        headers : headerHelper.getHeaderWithAuthorization('multipart/form-data'),
    }).then(function (response) {
        return response;
    }).catch(function (response) {
        let res = utilityHelper.catchServiceErrorHandel(response);
        return res;
    });
}

/**
* @DateOfCreation        8 Aug 2018
* @ShortDescription      This function is responsible to call Delete Diagnosis api
* @param                 JSON visit_Diagnosis_id
* @return                JSON
*/
function doDeletePatientDiagnosis(visit_diagnosis_id) {
    let dataForm = {'visit_diagnosis_id': visit_diagnosis_id};
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + 'visit/diagnosis/delete',
        headers : headerHelper.getHeaderWithAuthorization(),
        data    : headerHelper.appendUserDataInJson(dataForm)
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
* @DateOfCreation        8 Aug 2018
* @ShortDescription      This function is responsible to get diagnosis form api
* @param                 JSON experience
* @return                Response JSON
*/
function getDiagnosisFormRequest(diagnosisFormData) { 
    return axios({
        method: 'POST',
        url: configConstants.API_BASE_PATH+'visit/get-visits-factor',
        data: headerHelper.appendUserDataInJson(diagnosisFormData),
        headers : headerHelper.getHeaderWithAuthorization()
    }).then(function (response) {
        return response;
    }).catch(function (response) {
        return response;
    });
}

/**
* @DateOfCreation        8 Aug 2018
* @ShortDescription      This function is responsible to call save api of Diagnosis Factor
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function patientDiagnosisFactorSubmitRequest(diagnosisFormData) { 
     
    return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'visit/save',
            data: headerHelper.getJsonDataToFormData(diagnosisFormData),
            headers : headerHelper.getHeaderWithAuthorization('multipart/form-data')
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            return response;
        });
}