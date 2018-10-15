/**
 * clinicService
 *
 * @package                SafeHealth
 * @subpackage             clinicService
 * @category               Service
 * @DateOfCreation         13 June 2018
 * @ShortDescription       This is responsible for calling all api related to clinic
 */
import axios from 'axios';
import { configConstants } from '../_constants';
import { utilityHelper, history, headerHelper } from '../_helpers';

/**
 * @DateOfCreation        13 June 2018
 * @ShortDescription      This function is responsible to call clinic api
 * @param                 JSON jsonObj
 * @return                Response JSON jsonObj
 */
export const clinicService = {
    clinicList,
    clinicSave,
    clinicDelete
};

/**
 * @DateOfCreation        13 June 2018
 * @ShortDescription      This function is responsible to call Fetch Clinic api
 * @param                 JSON jsonObj
 * @return                Response JSON jsonObj
 */
function clinicList(page, pageSize, sorted, filtered) { 
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    var userInfo = utilityHelper.getUserInfo();
    return axios({
            method  : 'post',
            url     : configConstants.API_BASE_PATH+'clinics/getClinicList',
            data    : {"page":page, "pageSize":pageSize, "sorted":sorted, "filtered":filtered},
            headers : { 'Authorization' : 'Bearer '+loginAccessToken }
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            return response;
        });
}

/**
 * @DateOfCreation        13 June 2018
 * @ShortDescription      This function is responsible to call api to add or update Clinic
 * @param                 JSON jsonObj
 * @return                Response JSON jsonObj
 */
function clinicSave(detail) { 
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
            method  : 'post',
            url     : configConstants.API_BASE_PATH+'clinics/saveClinic',
            data    : detail,
            headers : { 'Content-Type' : 'application/json', 'Authorization' : 'Bearer '+loginAccessToken }
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            return response;
        });
}

/**
 * @DateOfCreation        14 June 2018
 * @ShortDescription      This function is responsible to call api to delete Clinic
 * @param                 JSON jsonObj
 * @return                Response JSON jsonObj
 */
function clinicDelete(clinicId) { 
    var deleteData = {'clinic_id':clinicId};
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
        method  : 'delete',
        url     : configConstants.API_BASE_PATH+'clinics/deleteClinic',
        headers : headerHelper.getHeaderWithAuthorization(),
        data    : headerHelper.appendUserDataInJson(deleteData)
    }).then(function (response) {
        return response;
    }).catch(function (response) {
        return response;
    });
}
