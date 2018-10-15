/**
 * medicationService
 *
 * @package                ILD INDIA REGISTRY
 * @subpackage             medicationService
 * @category               Service
 * @DateOfCreation         3 July 2018
 * @ShortDescription       This is responsible for calling all api related to membership
 */
import axios from 'axios';
import { configConstants } from '../../../_constants';
import { utilityHelper, headerHelper } from '../../../_helpers';

/**
* @DateOfCreation        11 May 2018
* @ShortDescription      This function is responsible to call membership api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
export const medicationService = {
    getMedicineListRequest,
    doMedicationInsertUpdate,
    getPatientMedicationRecordRequest,
    doMedicationRecordDelete,
    doDiscontinueMedicationRecord,
    doGetMedicineData,
    medicineSaveAsTemplate,
    getMedicineTemplate,
    getTemplate,
    doGetMedicinelistBySearch,
    doMedicationMultipleInsertUpdate
};

/**
* @DateOfCreation        14 July 2018
* @ShortDescription      This function is responsible to call Fetch staticConfig data api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getMedicineListRequest(visitId) { 
    let formData = {};
    return axios({
            method: 'post',
            url     : configConstants.API_BASE_PATH+'visit/get-medicine-list',
            data    : headerHelper.appendUserDataInJson(formData),
            headers : headerHelper.getHeaderWithAuthorization()
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}

/**
* @DateOfCreation        14 July 2018
* @ShortDescription      This function is responsible to call Fetch state api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function doMedicationInsertUpdate(medicationData) { 
    return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'visit/medication/add-edit',
            data: headerHelper.appendUserDataInJson(medicationData),
            headers : headerHelper.getHeaderWithAuthorization(),
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}

/**
* @DateOfCreation        28 Sept 2018
* @ShortDescription      This function is responsible to call Fetch state api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function doMedicationMultipleInsertUpdate(medicationData) { 
    return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'visit/medication/multiple-add-edit',
            data: headerHelper.appendUserDataInJson(medicationData),
            headers : headerHelper.getHeaderWithAuthorization(),
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
function getPatientMedicationRecordRequest(visitId, patientId) { 
    let formData = {visitId: visitId, patientId: patientId};
    return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'visit/medication/get-patient-medication-record',
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
* @DateOfCreation        15 june 2018
* @ShortDescription      This function is responsible to call Fetch state api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function doMedicationRecordDelete(medicationId) { 
    let formData = {medicationId: medicationId};
    return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'visit/medication/delete-patient-medication-record',
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
* @DateOfCreation        15 june 2018
* @ShortDescription      This function is responsible to call Fetch state api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function medicineSaveAsTemplate(medicationData) { 
    return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'visit/medication/save-template',
            data: headerHelper.getJsonDataToFormData(medicationData),
            headers : headerHelper.getHeaderWithAuthorization(),
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
function getMedicineTemplate() { 
    return axios({
            method: 'get',
            url: configConstants.API_BASE_PATH+'visit/medication/templates',
            headers : headerHelper.getHeaderWithAuthorization(),
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}

/**
* @DateOfCreation        15 june 2018
* @ShortDescription      This function is responsible to call Fetch single state api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getTemplate(medicationTempId) { 
    return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'visit/medication/get-template',
            headers : headerHelper.getHeaderWithAuthorization(),
            data: headerHelper.getJsonDataToFormData(medicationTempId),
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
function doDiscontinueMedicationRecord(medicationId) { 
    let formData = {medicationId: medicationId};
    return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'visit/medication/discontinue-patient-medication-record',
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
* @DateOfCreation        22 June 2018
* @ShortDescription      This function is responsible to call Fetch medicine data api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function doGetMedicineData(formData) { 
    return axios({
            method: 'post',
            url     : configConstants.API_BASE_PATH+'visit/get-medicine-data',
            data    : headerHelper.appendUserDataInJson(formData),
            headers : headerHelper.getHeaderWithAuthorization()
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}

/**
* @DateOfCreation        20 Sept 2018
* @ShortDescription      This function is responsible to call Fetch medicine list by search
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function doGetMedicinelistBySearch(searchField) { 
    return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'visit/medication/search-medicine',
            data: headerHelper.appendUserDataInJson(searchField),
            headers : headerHelper.getHeaderWithAuthorization(),
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}