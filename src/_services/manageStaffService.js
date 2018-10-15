/**
 * manageStaffService
 *
 * @package                SafeHealth
 * @subpackage             manageStaffService
 * @category               Service
 * @DateOfCreation         13 June 2018
 * @ShortDescription       This is responsible for calling all api related to staff
 */
import axios from 'axios';
import { configConstants } from '../_constants';
import { utilityHelper, history, headerHelper } from '../_helpers';

/**
 * @DateOfCreation        13 June 2018
 * @ShortDescription      This function is responsible to call staff api
 * @param                 JSON jsonObj
 * @return                Response JSON jsonObj
 */
export const manageStaffService = {
    staffList,
    staffSave,
    staffDelete
};

/**
 * @DateOfCreation        13 June 2018
 * @ShortDescription      This function is responsible to call Fetch Staff api
 * @param                 JSON jsonObj
 * @return                Response JSON jsonObj
 */
function staffList(page, pageSize, sorted, filtered) { 
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    var userInfo = utilityHelper.getUserInfo();
    return axios({
            method  : 'post',
            url     : configConstants.API_BASE_PATH+'doctors/getStaffList',
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
 * @ShortDescription      This function is responsible to call api to add or update Staff
 * @param                 JSON jsonObj
 * @return                Response JSON jsonObj
 */
function staffSave(detail) { 
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    var httpMethod = (detail['doc_staff_id'] != "") ? "put" : "post";
    return axios({
            method  : httpMethod,
            url     : configConstants.API_BASE_PATH+'doctors/saveStaff',
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
 * @ShortDescription      This function is responsible to call api to delete Staff
 * @param                 JSON jsonObj
 * @return                Response JSON jsonObj
 */
function staffDelete(staffId) { 
    var deleteData = {'doc_staff_id':staffId};
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
            method  : 'delete',
            url     : configConstants.API_BASE_PATH+'doctors/deleteStaff',
            headers : headerHelper.getHeaderWithAuthorization(),
        data    : headerHelper.appendUserDataInJson(deleteData)
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            return response;
        });
}
