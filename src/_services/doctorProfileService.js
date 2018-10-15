/**
 * doctorProfileService
 *
 * @package                SafeHealth
 * @subpackage             doctorProfileService
 * @category               Service
 * @DateOfCreation         11 May 2018
 * @ShortDescription       This is responsible for calling all api related to membership
 */
import axios from 'axios';
import { doctorProfileConstants,configConstants } from '../_constants';
import { utilityHelper } from '../_helpers';

/**
* @DateOfCreation        11 May 2018
* @ShortDescription      This function is responsible to call membership api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
export const doctorProfileService = {
    profileUpdate,
    getProfileDetail,
    updateProfileImage,
    getStates,
    getCities
};


/**
* @DateOfCreation        22 May 2018
* @ShortDescription      This function is responsible to update api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function profileUpdate(detail) { 
    return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'doctors/profile/update',
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
function updateProfileImage(base64Image) { 
    return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'doctors/profile/update-image',
            data: {"doc_profile_img":base64Image},
            headers: {'Content-Type': 'application/json', 'Authorization' : 'Bearer '+utilityHelper.getLoginAccessToken() }
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            return response;
        });
}


/**
* @DateOfCreation        21 May 2018
* @ShortDescription      This function is responsible to call Fetch detail api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getProfileDetail() { 
    return axios({
            method: 'get',
            url: configConstants.API_BASE_PATH+'doctors/profile/detail',
            headers: {'Content-Type': 'application/json', 'Authorization' : 'Bearer '+utilityHelper.getLoginAccessToken() }
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            return response;
        });
}
/**
* @DateOfCreation        21 May 2018
* @ShortDescription      This function is responsible to call Fetch state api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getStates() { 
    return axios({
            method: 'get',
            url: configConstants.API_BASE_PATH+'doctors/profile/states',
            headers: {'Content-Type': 'application/json', 'Authorization' : 'Bearer '+utilityHelper.getLoginAccessToken() }
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            return response;
        });
}

/**
* @DateOfCreation        21 May 2018
* @ShortDescription      This function is responsible to call Fetch cities api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getCities(state_id) { 
    return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'doctors/profile/cities',
            data: {"state_id":state_id},
            headers: {'Content-Type': 'application/json', 'Authorization' : 'Bearer '+utilityHelper.getLoginAccessToken() }
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            return response;
        });
}
