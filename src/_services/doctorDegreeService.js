/**
 * doctorDegreeService
 *
 * @package                SafeHealth
 * @subpackage             doctorDegreeService
 * @category               Service
 * @DateOfCreation         31 May 2018
 * @ShortDescription       This is responsible for calling all api related to degree
 */
import axios from 'axios';
import { doctorDegreeConstants,configConstants } from '../_constants';
import { utilityHelper, headerHelper } from '../_helpers';

/**
* @DateOfCreation        11 May 2018
* @ShortDescription      This function is responsible to call degree api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
export const doctorDegreeService = {
    degreeList,
    degreeUpdate,
    degreeSave,
    degreeDelete
};

/**
* @DateOfCreation        31 May 2018
* @ShortDescription      This function is responsible to call Fetch degree api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function degreeList(page, pageSize, sorted, filtered) {
    return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'doctors/profile/degree',
            data    : {"page":page, "pageSize":pageSize, "sorted":sorted, "filtered":filtered},
            headers: {'Authorization' : 'Bearer '+utilityHelper.getLoginAccessToken() }
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            return response;
        });
}

/**
* @DateOfCreation        31 May 2018
* @ShortDescription      This function is responsible to save api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function degreeSave(detail) {
    return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'doctors/profile/degree/insert',
            data: detail,
            headers: {'Content-Type': 'application/json', 'Authorization' : 'Bearer '+utilityHelper.getLoginAccessToken() }
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            return response;
        });
}

/**
* @DateOfCreation        31 May 2018
* @ShortDescription      This function is responsible to update api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function degreeUpdate(detail) {
    return axios({
            method: 'put',
            url: configConstants.API_BASE_PATH+'doctors/profile/degree/update',
            data: detail,
            headers: {'Content-Type': 'application/json', 'Authorization' : 'Bearer '+utilityHelper.getLoginAccessToken() }
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            return response;
        });
}

/**
* @DateOfCreation        31 May 2018
* @ShortDescription      This function is responsible to delete api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function degreeDelete(degreeId) {
    var deleteData = {'doc_deg_id':degreeId};
    return axios({
        method: 'delete',
        url: configConstants.API_BASE_PATH+'doctors/profile/degree/delete',
        headers : headerHelper.getHeaderWithAuthorization(),
        data    : headerHelper.appendUserDataInJson(deleteData)
    }).then(function (response) {
        return response;
    }).catch(function (response) {
        return response;
    });
}
