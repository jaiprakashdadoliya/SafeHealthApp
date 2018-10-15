/**
 * doctorService
 *
 * @package                SafeHealth
 * @subpackage             doctorService
 * @category               Service
 * @DateOfCreation         11 May 2018
 * @ShortDescription       This is responsible for calling all api related to service
 */
import axios from 'axios';
import { configConstants } from '../_constants';
import { utilityHelper, headerHelper } from '../_helpers';

/**
* @DateOfCreation        11 May 2018
* @ShortDescription      This function is responsible to call service api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
export const doctorService = {
    serviceList,
    serviceUpdate,
    serviceSave,
    serviceDelete
};

/**
* @DateOfCreation        21 May 2018
* @ShortDescription      This function is responsible to call Fetch service api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function serviceList(page, pageSize, sorted, filtered) { 
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH+'doctor/service/list',
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
function serviceSave(detail) { 
    return axios({
        method: 'post',
        url: configConstants.API_BASE_PATH+'doctor/service/insert',
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
* @ShortDescription      This function is responsible to update api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function serviceUpdate(detail) { 
    return axios({
        method: 'put',
        url: configConstants.API_BASE_PATH+'doctor/service/update',
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
function serviceDelete(serviceId) { 
    var deleteData = {'srv_id':serviceId};
    return axios({
        method: 'delete',
        url: configConstants.API_BASE_PATH+'doctor/service/delete',
        headers : headerHelper.getHeaderWithAuthorization(),
        data    : headerHelper.appendUserDataInJson(deleteData)
    }).then(function (response) {
        return response;
    }).catch(function (response) {
        return response;
    });
}
