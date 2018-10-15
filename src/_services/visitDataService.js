/**
 * visitDataService
 *
 * @package                ILD INDIA REGISTRY
 * @subpackage             visitDataService
 * @category               Service
 * @DateOfCreation         3 July 2018
 * @ShortDescription       This is responsible for calling all api related to membership
 */
import axios from 'axios';
import { configConstants } from '../_constants';
import { utilityHelper, headerHelper } from '../_helpers';

/**
* @DateOfCreation        11 May 2018
* @ShortDescription      This function is responsible to call membership api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
export const visitDataService = {
    getStaticFormRequest,
    submitNewVisitFormRequest,
    getComponents,
    getVisitComponents
};

/**
* @DateOfCreation        07 August 2018
* @ShortDescription      This function is responsible to call Fetch components data
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getVisitComponents(visitId, visitNumber) {
    return axios({
            method  : 'post',
            url     : configConstants.API_BASE_PATH+'visit/get-visits-components',
            data    : {visitId:visitId,visitNumber:visitNumber},
            headers : headerHelper.getHeaderWithAuthorization()
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}
/**
* @DateOfCreation        14 june 2018
* @ShortDescription      This function is responsible to call Fetch staticConfig data api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getStaticFormRequest(patId, visitId) { 
    let formData = {pat_id: patId, visit_id: visitId};
    return axios({
            method: 'post',
            url     : configConstants.API_BASE_PATH+'visit/get-visits-factor',
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
* @DateOfCreation        6 July 2018
* @ShortDescription      This function is responsible to call save visit form data
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function submitNewVisitFormRequest(formData, patId, visitId) { 
    return axios({
            method: 'POST',
            url: configConstants.API_BASE_PATH+'visit/save',
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
* @DateOfCreation        07 August 2018
* @ShortDescription      This function is responsible to call components
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getComponents() { 
    return axios({
            method: 'POST',
            url: configConstants.API_BASE_PATH+'components/list',
            headers : headerHelper.getHeaderWithAuthorization()
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}

