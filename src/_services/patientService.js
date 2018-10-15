import axios from "axios"; 
import { configConstants } from '../_constants';
import { utilityHelper, history } from '../_helpers';

/**
 * patientService
 *
 * @package                SafeHealth
 * @subpackage             patientService
 * @category               Service
 * @DateOfCreation         08 June 2018
 * @ShortDescription       This is responsible for connect with API 
 */
export const patientService = {
    getPatientList,
    doPatientUpdate,
    doPatientCreate,
    doPatientDelete,
    getStateList,
    getCitiesList
};

/**
* @DateOfCreation        21 May 2018
* @ShortDescription      This function is responsible to call Fetch city api
* @return                Response JSON
*/
function getCitiesList(state_id) {
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    var userInfo = utilityHelper.getUserInfo();
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + 'doctors/profile/cities',
        data    : {"state_id":state_id},
        headers : { 
            'Content-Type'  : 'application/json',
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
* @DateOfCreation        21 May 2018
* @ShortDescription      This function is responsible to call Fetch State api
* @return                Response JSON
*/
function getStateList() {
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    var userInfo = utilityHelper.getUserInfo();
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + 'doctors/profile/states',
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
* @DateOfCreation        21 May 2018
* @ShortDescription      This function is responsible to call Fetch patients api
* @return                Response JSON
*/
function getPatientList(page, pageSize, sorted, filtered) {
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    var userInfo = utilityHelper.getUserInfo();
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + 'patients',
        data    : {"page":page, "pageSize":pageSize, "sorted":sorted, "filtered":filtered},
        headers : { 
            'Content-Type'  : 'application/json',
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
* @param                 JSON patients
* @return                Response JSON
*/
function doPatientUpdate(patients) { 
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
            method  : 'put',
            url     : configConstants.API_BASE_PATH +'patients/update',
            data    : patients,
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
* @param                 JSON patients
* @return                Response JSON
*/
function doPatientCreate(patients) {
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
            method  : 'post',
            url     : configConstants.API_BASE_PATH +'patients/insert',
            data    : patients,
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
* @ShortDescription      This function is responsible to call Delete patients api
* @param                 jsonObj doc_exp_id
* @return                Response JSON
*/
function doPatientDelete(doc_exp_id) {
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
        method  : 'delete',
        url     : configConstants.API_BASE_PATH + 'patient/delete/'+doc_exp_id,
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

