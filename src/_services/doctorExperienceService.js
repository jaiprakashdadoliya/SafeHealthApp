import axios from "axios"; 
import { configConstants } from '../_constants';
import { utilityHelper, history, headerHelper } from '../_helpers';

/**
 * doctorExperienceService
 *
 * @package                SafeHealth
 * @subpackage             doctorExperienceService
 * @category               Service
 * @DateOfCreation         18 May 2018
 * @ShortDescription       This is responsible for connect with API 
 */
export const doctorExperienceService = {
    getExperienceList,
    doExperienceUpdate,
    doExperienceCreate,
    doExperienceDelete
};

/**
* @DateOfCreation        21 May 2018
* @ShortDescription      This function is responsible to call Fetch experience api
* @return                Response JSON
*/
function getExperienceList(page, pageSize, sorted, filtered) {
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    var userInfo = utilityHelper.getUserInfo();
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + 'doctors/profile/experience',
        data    : {"page":page, "pageSize":pageSize, "sorted":sorted, "filtered":filtered},
        headers : { 
            'Authorization' : 'Bearer '+loginAccessToken
        }
    })
    .then(response => {
        return response;
    })
    .catch(function (response) {
            return response;
    });
}

/**
* @DateOfCreation        22 May 2018
* @ShortDescription      This function is responsible to update api
* @param                 JSON experience
* @return                Response JSON
*/
function doExperienceUpdate(experience) { 
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
            method  : 'put',
            url     : configConstants.API_BASE_PATH +'doctors/profile/experience/update',
            data    : experience,
            headers : { 
                'Authorization' : 'Bearer '+loginAccessToken,
                'Content-Type': 'application/json' 
            }
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            return response;
        });
}


/**
* @DateOfCreation        24 May 2018
* @ShortDescription      This function is responsible to Insert api
* @param                 JSON experience
* @return                Response JSON
*/
function doExperienceCreate(experience) {
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
            method  : 'post',
            url     : configConstants.API_BASE_PATH +'doctors/profile/experience/insert',
            data    : experience,
            headers : { 
                'Authorization' : 'Bearer '+loginAccessToken,
                'Content-Type': 'application/json' 
            }
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            return response;
        });
}


/**
* @DateOfCreation        24 May 2018
* @ShortDescription      This function is responsible to call Delete experience api
* @param                 jsonObj doc_exp_id
* @return                Response JSON
*/
function doExperienceDelete(doc_exp_id) {
    var deleteData = {'doc_exp_id':doc_exp_id};
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
        method  : 'delete',
        url     : configConstants.API_BASE_PATH + 'doctors/profile/experience/delete',
        headers : headerHelper.getHeaderWithAuthorization(),
        data    : headerHelper.appendUserDataInJson(deleteData)
    })
    .then(response => {
        return response;
    })
    .catch(function (response) {
            return response;
    });
}

