/**
 * doctorMembershipService
 *
 * @package                SafeHealth
 * @subpackage             doctorMembershipService
 * @category               Service
 * @DateOfCreation         11 May 2018
 * @ShortDescription       This is responsible for calling all api related to membership
 */
import axios from 'axios';
import { doctorMembershipConstants,configConstants } from '../_constants';
import { utilityHelper, headerHelper } from '../_helpers';

/**
* @DateOfCreation        11 May 2018
* @ShortDescription      This function is responsible to call membership api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
export const doctorMembershipService = {
    membershipList,
    membershipUpdate,
    membershipSave,
    membershipDelete
};

/**
* @DateOfCreation        21 May 2018
* @ShortDescription      This function is responsible to call Fetch membership api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function membershipList(page, pageSize, sorted, filtered) {
    
    return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'doctors/profile/membership/list',
            data    : {"page":page, "pageSize":pageSize, "sorted":sorted, "filtered":filtered},
            headers: {'Authorization' : 'Bearer '+utilityHelper.getLoginAccessToken() }
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
function membershipSave(detail) { 
    return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'doctors/profile/membership/insert',
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
function membershipUpdate(detail) { 
    return axios({
            method: 'put',
            url: configConstants.API_BASE_PATH+'doctors/profile/membership/update',
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
function membershipDelete(membershipId) { 
    var deleteData = {'doc_mem_id':membershipId};
    return axios({
        method: 'delete',
        url: configConstants.API_BASE_PATH+'doctors/profile/membership/delete',
        headers : headerHelper.getHeaderWithAuthorization(),
        data    : headerHelper.appendUserDataInJson(deleteData)
    }).then(function (response) {
        return response;
    }).catch(function (response) {
        return response;
    });
}
