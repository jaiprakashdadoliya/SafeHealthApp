/**
 * consentFormsService
 *
 * @package                SafeHealth
 * @subpackage             consentFormsService
 * @category               Service
 * @DateOfCreation         11 May 2018
 * @ShortDescription       This is responsible for calling all api related to consentForm
 */
import axios from 'axios';
import { configConstants } from './../../../_constants';
import { utilityHelper, headerHelper } from './../../../_helpers';

/**
* @DateOfCreation        11 May 2018
* @ShortDescription      This function is responsible to call consentForm api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
export const consentFormsService = {
    consentFormList,
    consentFormSave,
    consentFormDelete
};

/**
* @DateOfCreation        21 May 2018
* @ShortDescription      This function is responsible to call Fetch consentForm api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function consentFormList() { 
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH+'doctor/consentForm/list',
        data    : {},
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
function consentFormSave(detail) { 
    var httpMethod = (detail['consent_form_id'] != "") ? "put" : "post";
    return axios({
        method: httpMethod,
        url: configConstants.API_BASE_PATH+'doctor/consentForm/save',
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
function consentFormDelete(consentFormId) { 
    var deleteData = {'consent_form_id':consentFormId};
    return axios({
        method: 'delete',
        url: configConstants.API_BASE_PATH+'doctor/consentForm/delete',
        headers : headerHelper.getHeaderWithAuthorization(),
        data    : headerHelper.appendUserDataInJson(deleteData)
    }).then(function (response) {
        return response;
    }).catch(function (response) {
        return response;
    });
}
