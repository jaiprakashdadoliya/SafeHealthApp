/**
 * referralService
 *
 * @package                SafeHealth
 * @subpackage             referralService
 * @category               Service
 * @DateOfCreation         22 August 2018
 * @ShortDescription       This is responsible for calling all api related to Appointment Category
 */
import axios from 'axios';
import { configConstants } from '../../_constants';
import { utilityHelper, headerHelper } from '../../_helpers';

/**
* @DateOfCreation        22 August 2018
* @ShortDescription      This function is responsible to call service api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
export const referralService = {
    getList,
    doUpdate,
    doSave,
    doDelete
};

/**
* @DateOfCreation        22 August 2018
* @ShortDescription      This function is responsible to call Fetch service api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getList(page, pageSize, sorted, filtered) { 
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH+'referral/doctor/list',
        data    : {"page":page, "pageSize":pageSize, "sorted":sorted, "filtered":filtered},
        headers : {'Authorization' : 'Bearer '+utilityHelper.getLoginAccessToken() }
    }).then(function (response) {
        return response;
    }).catch(function (response) {
        return response;
    });
}

/**
* @DateOfCreation        22 August 2018
* @ShortDescription      This function is responsible to save api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function doSave(detail) { 
    return axios({
        method: 'post',
        url: configConstants.API_BASE_PATH+'referral/doctor/insert',
        data: detail,
        headers: {'Content-Type': 'application/json', 'Authorization' : 'Bearer '+utilityHelper.getLoginAccessToken() }
    }).then(function (response) {
        return response;
    }).catch(function (response) {
        return response;
    });
}

/**
* @DateOfCreation        22 August 2018
* @ShortDescription      This function is responsible to update api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function doUpdate(detail) { 
    return axios({
        method: 'put',
        url: configConstants.API_BASE_PATH+'referral/doctor/update',
        data: detail,
        headers: {'Content-Type': 'application/json', 'Authorization' : 'Bearer '+utilityHelper.getLoginAccessToken() }
    }).then(function (response) {
        return response;
    }).catch(function (response) {
        return response;
    });
}

/**
* @DateOfCreation        22 August 2018
* @ShortDescription      This function is responsible to delete api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function doDelete(referralId) {
    var deleteData = {'doc_ref_id':referralId};
    return axios({
        method: 'delete',
        url: configConstants.API_BASE_PATH+'referral/doctor/delete',
        headers : headerHelper.getHeaderWithAuthorization(),
        data    : headerHelper.appendUserDataInJson(deleteData)
    }).then(function (response) {
        return response;
    }).catch(function (response) {
        return response;
    });
}
