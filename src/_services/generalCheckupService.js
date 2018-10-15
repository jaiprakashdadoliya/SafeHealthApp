/**
 * doctorDegreeService
 *
 * @package                ILD India Registry
 * @subpackage             Patient Profile
 * @category               Service
 * @DateOfCreation         31 May 2018
 * @ShortDescription       This is responsible for calling all api related to Parent profile
 */
import axios from 'axios';
import { configConstants } from '../_constants';
import { utilityHelper, headerHelper } from '../_helpers';

/**
* @DateOfCreation        11 May 2018
* @ShortDescription      This function is responsible to call degree api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
export const generalCheckupService = {
    doGeneralCheckupInsertUpdate,
    getPatientGeneralCheckupRecordService
};

/**
* @DateOfCreation        18 June 2018
* @ShortDescription      This function is responsible to update patient profile api
* @param                 JSON experience
* @return                Response JSON
*/
function doGeneralCheckupInsertUpdate(checkupData) { 
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH+'visit/generalcheckup/add_edit',
        data    : headerHelper.appendUserDataInJson(checkupData),
        headers : headerHelper.getHeaderWithAuthorization(),
    }).then(function (response) {
        return response;
    }).catch(function (response) {
        return response;
    });
}

/**
* @DateOfCreation        18 June 2018
* @ShortDescription      This function is responsible to update patient profile api
* @param                 JSON experience
* @return                Response JSON
*/
function getPatientGeneralCheckupRecordService(visitId, patientId) { 
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
        method: 'GET',
        url: configConstants.API_BASE_PATH+'visit/generalcheckup/get-checkup-records/'+visitId+'/'+patientId,
        headers : headerHelper.getHeaderWithAuthorization()
    }).then(function (response) {
        return response;
    }).catch(function (response) {
        return response;
    });
}
