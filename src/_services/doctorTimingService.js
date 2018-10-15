import axios from "axios"; 
import { configConstants } from '../_constants';
import { utilityHelper, history } from '../_helpers';

/**
 * doctorTimingService
 *
 * @package                SafeHealth
 * @subpackage             doctorTimingService
 * @category               Service
 * @DateOfCreation         20 June 2018
 * @ShortDescription       This is responsible for connect with API 
 */
export const doctorTimingService = {
    getTimingList,
    doTimingUpdate,
    doTimingCreate,
    getClinicList
};

/**
* @DateOfCreation        20 June  2018
* @ShortDescription      This function is responsible to call Fetch timing api
* @return                Response JSON
*/
function getTimingList() {
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    var userInfo = utilityHelper.getUserInfo();
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + 'doctors/profile/timing',
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
* @DateOfCreation        20 June 2018
* @ShortDescription      This function is responsible to update api
* @param                 JSON timing
* @return                Response JSON
*/
function doTimingUpdate(timing) { 
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
            method  : 'put',
            url     : configConstants.API_BASE_PATH +'doctors/profile/timing/update',
            data    : timing,
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
* @DateOfCreation        20 June 2018
* @ShortDescription      This function is responsible to Insert api
* @param                 JSON timing
* @return                Response JSON
*/
function doTimingCreate(timing, timingData) {
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
            method  : 'post',
            url     : configConstants.API_BASE_PATH +'doctors/profile/timing/insert',
            data    : timing,
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
* @DateOfCreation        20 June  2018
* @ShortDescription      This function is responsible to call Fetch timing api
* @return                Response JSON
*/
function getClinicList() {
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    var userInfo = utilityHelper.getUserInfo();
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + 'clinics/list',
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
