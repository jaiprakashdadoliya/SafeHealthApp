/**
 * visitComponentsService
 *
 * @package                SafeHealth
 * @subpackage             visitComponentsService
 * @category               Service
 * @DateOfCreation         22 August 2018
 * @ShortDescription       This is responsible for calling all api related to Patient Groups
 */
import axios from 'axios';
import { configConstants } from '../../../_constants';
import { utilityHelper } from '../../../_helpers';

/**
* @DateOfCreation        22 August 2018
* @ShortDescription      This function is responsible to call service api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
export const visitComponentsService = {
    getList,
    updateVisitSetting
};

/**
* @DateOfCreation        22 August 2018
* @ShortDescription      This function is responsible to call Fetch service api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getList(page, pageSize, sorted, filtered) { 
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH+'visit/visits-components',
        data    : {"page":page, "pageSize":pageSize, "sorted":sorted, "filtered":filtered},
        headers : {'Authorization' : 'Bearer '+utilityHelper.getLoginAccessToken() }
    }).then(function (response) {
        return response;
    }).catch(function (response) {
        return response;
    });
}

/**
* @DateOfCreation        22 August 2018
* @ShortDescription      This function is responsible to call Fetch service api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function updateVisitSetting(visitComponent) { 
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH+'visit/visits-setting_components',
        data    : visitComponent,
        headers : {'Authorization' : 'Bearer '+utilityHelper.getLoginAccessToken() }
    }).then(function (response) {
        return response;
    }).catch(function (response) {
        return response;
    });
}