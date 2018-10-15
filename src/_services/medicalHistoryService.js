/**
 * doctorDegreeService
 *
 * @package                ILD India Registry
 * @subpackage             Patient Medical History
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
export const medicalHistoryService = {
    doMedicalHistoryInsertUpdate,
    getPatientMedicalHistoryService
};

/**
* @DateOfCreation        18 June 2018
* @ShortDescription      This function is responsible to update patient profile api
* @param                 JSON experience
* @return                Response JSON
*/
function doMedicalHistoryInsertUpdate(medicalHistoryData) { 
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH+'visit/medicalhistory/add_edit',
        data    : headerHelper.appendUserDataInJson(medicalHistoryData),
        headers : headerHelper.getHeaderWithAuthorization(),
    }).then(function (response) {
        return response;
    }).catch(function (response) {
        return response;
    });
}

/**
* @DateOfCreation        27 June 2018
* @ShortDescription      This function is responsible to get Patient medical history records
* @param                 JSON experience
* @return                Response JSON
*/
function getPatientMedicalHistoryService(visitId, patientId) { 
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    var data = {visit_id : visitId, patient_id : patientId};
    return axios({
        method  : 'POST',
        url     : configConstants.API_BASE_PATH+'visit/medicalhistory/details',
        data    : headerHelper.appendUserDataInJson(data),
        headers : headerHelper.getHeaderWithAuthorization()
    }).then(function (response) {
        return response;
    }).catch(function (response) {
        return response;
    });
}
