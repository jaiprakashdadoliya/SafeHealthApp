/**
 * medicineTemplatesService
 *
 * @package                ILD INDIA REGISTRY
 * @subpackage             medicineTemplatesService
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
export const medicineTemplatesService = {
    getMedicineListRequest,
    doMedicationInsertUpdate,
    medicineTemplateDelete,
    doGetMedicineData,
    medicineSaveAsTemplate,
    getMedicineTemplate,
    getTemplate,
    medicineUpdateTemplate
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
            url     : configConstants.API_BASE_PATH+'settings/template-medicine-list',
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
* @DateOfCreation        15 june 2018
* @ShortDescription      This function is responsible to call Fetch state api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function medicineTemplateDelete(pat_med_temp_id) { 
    let formData = {pat_med_temp_id: pat_med_temp_id};
    return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'settings/medication-template/delete',
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
            url: configConstants.API_BASE_PATH+'settings/medication-template/save',
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
function medicineUpdateTemplate(medicationData) { 
    return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'settings/medication-template/update',
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
function getMedicineTemplate(page, pageSize, sorted, filtered) { 
    return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'settings/medication-templates',
            data    : {"page":page, "pageSize":pageSize, "sorted":sorted, "filtered":filtered},
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
            url: configConstants.API_BASE_PATH+'settings/medication-templates/list',
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
* @DateOfCreation        22 June 2018
* @ShortDescription      This function is responsible to call Fetch medicine data api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function doGetMedicineData(formData) { 
    return axios({
            method: 'post',
            url     : configConstants.API_BASE_PATH+'settings/template-medicine-list',
            data    : headerHelper.appendUserDataInJson(formData),
            headers : headerHelper.getHeaderWithAuthorization()
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}

