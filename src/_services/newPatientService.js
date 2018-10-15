/**
 * newPatientService
 *
 * @package                ILD INDIA REGISTRY
 * @subpackage             newPatientService
 * @category               Service
 * @DateOfCreation         15 June 2018
 * @ShortDescription       This is responsible for calling all api related to membership
 */
import axios from 'axios';
import { newPatientConstants,configConstants } from '../_constants';
import { utilityHelper,headerHelper } from '../_helpers';

/**
* @DateOfCreation        15 June 2018
* @ShortDescription      This function is responsible to call newPatient api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
export const newPatientService = {
    doNewPatient,
    getReferralDoctor,
    getPatientGroups,
};

/**
* @DateOfCreation        15 june 2018
* @ShortDescription      This function is responsible to call Fetch state api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function doNewPatient(patient) { 
    return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'patients/profile/insert',
             data: headerHelper.getJsonDataToFormData(patient),
            headers : headerHelper.getHeaderWithAuthorization('multipart/form-data')
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            return response;
        });
}

/**
* @DateOfCreation        15 june 2018
* @ShortDescription      This function is responsible to call Fetch Doctor Referrals api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getReferralDoctor() { 
    return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'referral/doctor/list',
            headers : headerHelper.getHeaderWithAuthorization()
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            return response;
        });
}

/**
* @DateOfCreation        31 Aug 2018
* @ShortDescription      This function is responsible to call Fetch Patient Groups api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getPatientGroups() { 
    return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'patient_groups/list',
            headers : headerHelper.getHeaderWithAuthorization()
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            return response;
        });
}