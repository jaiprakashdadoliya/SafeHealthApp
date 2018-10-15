/**
 * regionService
 *
 * @package                ILD INDIA REGISTRY
 * @subpackage             regionService
 * @category               Service
 * @DateOfCreation         11 May 2018
 * @ShortDescription       This is responsible for calling all api related to membership
 */
import axios from 'axios';
import { regionConstants,configConstants } from '../_constants';
import { utilityHelper,headerHelper } from '../_helpers';

/**
* @DateOfCreation        11 May 2018
* @ShortDescription      This function is responsible to call membership api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
export const regionService = {
    getCountry,
    getStates,
    getCities
};

/**
* @DateOfCreation        14 june 2018
* @ShortDescription      This function is responsible to call Fetch state api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getCountry() { 
    return axios({
            method: 'get',
            url: configConstants.API_BASE_PATH+'get-country',
            headers : headerHelper.getHeaderWithAuthorization()
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}

/**
* @DateOfCreation        14 june 2018
* @ShortDescription      This function is responsible to call Fetch state api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getStates(country_id) { 
    return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'get-states',
            data: {"country_id":country_id},
            headers : headerHelper.getHeaderWithAuthorization()
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}

/**
* @DateOfCreation        14 june 2018
* @ShortDescription      This function is responsible to call Fetch cities api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getCities(state_id) { 
    return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'get-city',
            data: {"state_id":state_id},
            headers : headerHelper.getHeaderWithAuthorization()
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}
