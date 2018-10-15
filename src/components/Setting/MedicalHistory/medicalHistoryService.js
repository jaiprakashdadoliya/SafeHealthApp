/**
 * medicalHistoryService
 *
 * @package                SafeHealth
 * @subpackage             medicalHistoryService
 * @category               Service
 * @DateOfCreation         11 May 2018
 * @ShortDescription       This is responsible for calling all api related to disease
 */
import axios from 'axios';
import { configConstants } from './../../../_constants';
import { utilityHelper, headerHelper } from './../../../_helpers';

/**
* @DateOfCreation        11 May 2018
* @ShortDescription      This function is responsible to call disease api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
export const medicalHistoryService = {
    diseaseList,
    diseaseSave,
    diseaseDelete
};

/**
* @DateOfCreation        21 May 2018
* @ShortDescription      This function is responsible to call Fetch disease api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function diseaseList(page, pageSize, sorted, filtered) { 
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH+'doctor/disease/list',
        data    : {"page":page, "pageSize":pageSize, "sorted":sorted, "filtered":filtered},
        headers : {'Authorization' : 'Bearer '+utilityHelper.getLoginAccessToken() }
    }).then(function (response) {
        return response;
    }).catch(function (response) {
        return response;
    });
}

/**
* @DateOfCreation        22 May 2018
* @ShortDescription      This function is responsible to save api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function diseaseSave(detail) { 
    var httpMethod = (detail['disease_id'] != "") ? "put" : "post";
    return axios({
        method: httpMethod,
        url: configConstants.API_BASE_PATH+'doctor/disease/save',
        data: detail,
        headers: {'Content-Type': 'application/json', 'Authorization' : 'Bearer '+utilityHelper.getLoginAccessToken() }
    }).then(function (response) {
        return response;
    }).catch(function (response) {
        return response;
    });
}

/**
* @DateOfCreation        22 May 2018
* @ShortDescription      This function is responsible to delete api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function diseaseDelete(diseaseId) { 
    var deleteData = {'disease_id':diseaseId};
    return axios({
        method: 'delete',
        url: configConstants.API_BASE_PATH+'doctor/disease/delete',
        headers : headerHelper.getHeaderWithAuthorization(),
        data    : headerHelper.appendUserDataInJson(deleteData)
    }).then(function (response) {
        return response;
    }).catch(function (response) {
        return response;
    });
}
