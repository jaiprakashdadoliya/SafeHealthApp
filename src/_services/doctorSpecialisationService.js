import axios from "axios"; 
import { configConstants } from '../_constants';
import { utilityHelper, history, headerHelper } from '../_helpers';

/**
 * doctorSpecialisationService
 *
 * @package                SafeHealth
 * @subpackage             doctorSpecialisationService
 * @category               Service
 * @DateOfCreation         31 May 2018
 * @ShortDescription       This is responsible for connect with API 
 */
export const doctorSpecialisationService = {
    getSpecialisationList,
    doSpecialisationUpdate,
    doSpecialisationCreate,
    doSpecialisationDelete,
    getMainSpecialisationList,
    getSpecialisationsTagList
};


/**
* @DateOfCreation        08 August 2018
* @ShortDescription      This function is responsible to call Fetch tags specialisation api
* @return                Response JSON
*/
function getSpecialisationsTagList(spl_id) {
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    var userInfo = utilityHelper.getUserInfo();
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + 'doctors/profile/specialisation/tags',
        data    : {spl_id:spl_id},
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
* @DateOfCreation        31 May 2018
* @ShortDescription      This function is responsible to call Fetch Master specialisation api
* @return                Response JSON
*/
function getMainSpecialisationList() {
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    var userInfo = utilityHelper.getUserInfo();
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + 'doctors/profile/specialisation/master',
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
* @DateOfCreation        31 May 2018
* @ShortDescription      This function is responsible to call Fetch specialisation api
* @return                Response JSON
*/
function getSpecialisationList(page, pageSize, sorted, filtered) {
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    var userInfo = utilityHelper.getUserInfo();
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + 'doctors/profile/specialisation',
        data   : {"page":page, "pageSize":pageSize, "sorted":sorted, "filtered":filtered}, 
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
* @DateOfCreation        31 May 2018
* @ShortDescription      This function is responsible to update api
* @param                 JSON specialisation
* @return                Response JSON
*/
function doSpecialisationUpdate(specialisation) { 
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
            method  : 'put',
            url     : configConstants.API_BASE_PATH +'doctors/profile/specialisation/update',
            data    : specialisation,
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
* @DateOfCreation        31 May 2018
* @ShortDescription      This function is responsible to Insert api
* @param                 JSON specialisation
* @return                Response JSON
*/
function doSpecialisationCreate(specialisation) {
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
            method  : 'post',
            url     : configConstants.API_BASE_PATH +'doctors/profile/specialisation/insert',
            data    : specialisation,
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
* @DateOfCreation        31 May 2018
* @ShortDescription      This function is responsible to call Delete specialisation api
* @param                 JSON doc_spl_id
* @return                JSON
*/
function doSpecialisationDelete(doc_spl_id) {
    var deleteData = {'doc_spl_id':doc_spl_id};
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
        method  : 'delete',
        url     : configConstants.API_BASE_PATH + 'doctors/profile/specialisation/delete',
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

