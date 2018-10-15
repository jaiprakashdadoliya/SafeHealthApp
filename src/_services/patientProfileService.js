/**
 * doctorDegreeService
 *
 * @package                ILD India Registry
 * @subpackage             Patient Profile
 * @category               Service
 * @DateOfCreation         31 May 2018
 * @ShortDescription       This is responsible for calling all api related to Parent profile
 */
import axios from 'axios';
import { configConstants } from '../_constants';
import { utilityHelper, headerHelper } from '../_helpers';

/**
* @DateOfCreation        11 May 2018
* @ShortDescription      This function is responsible to call degree api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
export const patientProfileService = {
    patientProfile,
    doPatientProfileUpdate,
    getPatientListRequest,
    getPatientVisitIdRequest,
    updateProfileImage
};

/**
* @DateOfCreation        31 May 2018
* @ShortDescription      This function is responsible to call Fetch degree api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function patientProfile(patId) {
    return axios({
            method: 'get',
            url: configConstants.API_BASE_PATH+'patients/profile/edit-profile/'+patId,
            headers: headerHelper.getHeaderWithAuthorization()
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}

/**
* @DateOfCreation        2  aug 2018
* @ShortDescription      This function is responsible to update api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function updateProfileImage(base64Image, patId) { 
    return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'patients/profile/update-image',
            data: {"pat_profile_img":base64Image, 'pat_id':patId},
            headers: {'Content-Type': 'application/json', 'Authorization' : 'Bearer '+utilityHelper.getLoginAccessToken() }
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            return response;
        });
}

/**
* @DateOfCreation        18 June 2018
* @ShortDescription      This function is responsible to update patient profile api
* @param                 JSON experience
* @return                Response JSON
*/
function doPatientProfileUpdate(profile) { 
    return axios({
            method  : 'put',
            url     : configConstants.API_BASE_PATH +'patients/profile/update',
            data    : profile,
            headers : headerHelper.getHeaderWithAuthorization()
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}

/**
* @DateOfCreation        19 June 2018
* @ShortDescription      This function is responsible to get patient list
* @param                 JSON experience
* @return                Response JSON
*/
function getPatientListRequest(page, pageSize, sorted, filtered) { 
    let dataForm = {page: page, pageSize: pageSize, sorted: sorted, filtered: filtered};
    return axios({
            method  : 'post',
            url     : configConstants.API_BASE_PATH +'patients/profile/list',
            data    : dataForm ,
            headers : headerHelper.getHeaderWithAuthorization()
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}

/**
* @DateOfCreation        21 June 2018
* @ShortDescription      This function is responsible to get patient visit id
* @param                 JSON experience
* @return                Response JSON
*/
function getPatientVisitIdRequest(patUserId) { 
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
            method  : 'post',
            url     : configConstants.API_BASE_PATH +'patients/profile/visit-id',
            data    : {"patientUserId": patUserId},
            headers : headerHelper.getHeaderWithAuthorization()
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}
