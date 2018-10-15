/**
 * patientSymptomsService
 *
 * @package                ILD India Registry
 * @subpackage             Patient Symptoms
 * @category               Service
 * @DateOfCreation         19 june 2018
 * @ShortDescription       This is responsible for calling all api related to Parent Symptoms
 */
import axios from 'axios';
import { configConstants } from '../_constants';
import { utilityHelper, headerHelper } from '../_helpers';

/**
* @DateOfCreation        19 june 2018
* @ShortDescription      This function is responsible to call Symptoms api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
export const patientSymptomsService = {
    getSymptomsOptionlist,
    getSymptomslist,
    doNewPatientSymptom,
    doUpdatePatientSymptom,
    doDeletePatientSymptom,
    getSymptomsOptionlistBySearch,
    getPatientHavePatientRecord,
    getPatientHavePatientSubmit
};

/**
* @DateOfCreation        19 june 2018
* @ShortDescription      This function is responsible to call Fetch Symptoms option api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getSymptomsOptionlist() {
    return axios({
            method: 'get',
            url: configConstants.API_BASE_PATH+'setup/symptoms',
            headers : headerHelper.getHeaderWithAuthorization()
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}

/**
* @DateOfCreation        15 june 2018
* @ShortDescription      This function is responsible to call Fetch state api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getPatientHavePatientRecord(patDetails) { 
    return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'visit/symptoms/details',
            data: headerHelper.getJsonDataToFormData(patDetails),
            headers : headerHelper.getHeaderWithAuthorization('multipart/form-data'),
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}

/**
* @DateOfCreation        15 june 2018
* @ShortDescription      This function is responsible to call Fetch state api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getPatientHavePatientSubmit(finalData) { 
    return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'visit/symptoms/save-hopi',
            data: headerHelper.getJsonDataToFormData(finalData),
            headers : headerHelper.getHeaderWithAuthorization('multipart/form-data'),
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}



/**
* @DateOfCreation        15 june 2018
* @ShortDescription      This function is responsible to call Fetch state api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function doNewPatientSymptom(symptom) { 
    return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'visit/symptoms/add',
            data: headerHelper.getJsonDataToFormData(symptom),
            headers : headerHelper.getHeaderWithAuthorization('multipart/form-data'),
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}
/**
* @DateOfCreation        15 june 2018
* @ShortDescription      This function is responsible to call Fetch state api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function doUpdatePatientSymptom(symptom) { 
    return axios({
            method: 'put',
            url: configConstants.API_BASE_PATH+'visit/symptoms/update',
            data: headerHelper.appendUserDataInJson(symptom),
            headers : headerHelper.getHeaderWithAuthorization(),
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
function getSymptomslist(patId, visitId, page, pageSize, sorted, filtered) {
    let dataForm = {patId: patId, visitId: visitId, page: page, pageSize: pageSize, sorted: sorted, filtered: filtered};
    return axios({
            method  : 'post',
            url     : configConstants.API_BASE_PATH+'visit/symptoms/list',
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
function doDeletePatientSymptom(visit_symptom_id) {
    var deleteData = {'visit_symptom_id':visit_symptom_id};
    return axios({
        method  : 'delete',
        url     : configConstants.API_BASE_PATH + 'visit/symptoms/delete',
        headers : headerHelper.getHeaderWithAuthorization(),
        data    : headerHelper.appendUserDataInJson(deleteData)
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
* @DateOfCreation        19 june 2018
* @ShortDescription      This function is responsible to call Fetch Symptoms option api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getSymptomsOptionlistBySearch(extraData) {
    return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'setup/symptoms/search',
            data    : headerHelper.getJsonDataToFormData(extraData),
            headers : headerHelper.getHeaderWithAuthorization()
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}

