/**
 * labTemplatesService
 *
 * @package                Safe Helth
 * @subpackage             setting
 * @category               Service
 * @DateOfCreation         19 june 2018
 * @ShortDescription       This is responsible for calling all api related to add lab template
 */
import axios from 'axios';
import { configConstants } from '../../../_constants';
import { utilityHelper, headerHelper } from '../../../_helpers';

/**
* @DateOfCreation        19 june 2018
* @ShortDescription      This function is responsible to call Symptoms api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
export const labTemplatesService = {
    getTablelist,
    doSubmitRequest,
    doDeleteRequest,
    getOptionlist
};

/**
* @DateOfCreation        15 june 2018
* @ShortDescription      This function is responsible to call Fetch state api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function doSubmitRequest(details) { 
    let save = (details.lab_temp_id && details.lab_temp_id != '' ) ? 'update' : 'insert';
    let httpMethod = (details.lab_temp_id && details.lab_temp_id != '' ) ? 'put' : 'post';
    return axios({
            method: httpMethod,
            url: configConstants.API_BASE_PATH+'settings/lab-templates/'+save,
            data: headerHelper.appendUserDataInJson(details),
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
function getTablelist(page, pageSize, sorted, filtered) {
    let dataForm = {page: page, pageSize: pageSize, sorted: sorted, filtered: filtered};
    return axios({
            method  : 'post',
            url     : configConstants.API_BASE_PATH+'settings/lab-templates/list',
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
function doDeleteRequest(details) {
    return axios({
        method  : 'delete',
        url     : configConstants.API_BASE_PATH + 'settings/lab-templates/delete',
        headers : headerHelper.getHeaderWithAuthorization(),
        data    : headerHelper.appendUserDataInJson(details)
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
* @ShortDescription      This function is responsible to call Fetch lab templates option api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getOptionlist() {
    return axios({
            method: 'get',
            url: configConstants.API_BASE_PATH+'settings/lab-templates/optionlist',
            headers : headerHelper.getHeaderWithAuthorization()
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}