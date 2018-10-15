/**
 * doctorAwardsService
 *
 * @package                SafeHealth
 * @subpackage             doctorAwardsService
 * @category               Service
 * @DateOfCreation         15 May 2018
 * @ShortDescription       This is responsible for calling all api related to awards
 */
import axios from 'axios';
import { configConstants } from '../_constants';
import { utilityHelper, history, headerHelper } from '../_helpers';

/**
 * @DateOfCreation        15 May 2018
 * @ShortDescription      This function is responsible to call awards api
 * @param                 JSON jsonObj
 * @return                Response JSON jsonObj
 */
export const doctorAwardsService = {
    awardsList,
    awardSave,
    awardDelete
};

/**
 * @DateOfCreation        24 May 2018
 * @ShortDescription      This function is responsible to call Fetch Awards api
 * @param                 JSON jsonObj
 * @return                Response JSON jsonObj
 */
function awardsList(page, pageSize, sorted, filtered) { 
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    var userInfo = utilityHelper.getUserInfo();
    return axios({
            method  : 'post',
            url     : configConstants.API_BASE_PATH+'doctors/profile/awards',
            data    : {"page":page, "pageSize":pageSize, "sorted":sorted, "filtered":filtered},
            headers : { 'Authorization' : 'Bearer '+loginAccessToken }
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            return response;
        });
}

/**
 * @DateOfCreation        25 May 2018
 * @ShortDescription      This function is responsible to call api to add or update Awards
 * @param                 JSON jsonObj
 * @return                Response JSON jsonObj
 */
function awardSave(detail) { 
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    var httpMethod = (detail['doc_award_id'] != "") ? "put" : "post";
    return axios({
            method  : httpMethod,
            url     : configConstants.API_BASE_PATH+'doctors/profile/saveAward',
            data    : detail,
            headers : { 'Content-Type' : 'application/json', 'Authorization' : 'Bearer '+loginAccessToken }
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            return response;
        });
}

/**
 * @DateOfCreation        27 May 2018
 * @ShortDescription      This function is responsible to delete api
 * @param                 JSON jsonObj
 * @return                Response JSON jsonObj
 */
function awardDelete(awardId) {
    var deleteData = {'doc_award_id':awardId};
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
        method  : 'delete',
        url     : configConstants.API_BASE_PATH+'doctors/profile/deleteAward',
        headers : headerHelper.getHeaderWithAuthorization(),
        data    : headerHelper.appendUserDataInJson(deleteData)
    }).then(function (response) {
        return response;
    }).catch(function (response) {
        return response;
    });
}
