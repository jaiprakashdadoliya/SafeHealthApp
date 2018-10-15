/**
 * patientFamilyMedicalHistoryService
 *
 * @package                ILD India Registry
 * @subpackage             patientFamilyMedicalHistoryService
 * @category               Service
 * @DateOfCreation         31 May 2018
 * @ShortDescription       This is responsible for calling all api related to family Medical History Service
 */
import axios from 'axios';
import { configConstants } from '../../../../_constants';
import { utilityHelper, headerHelper } from '../../../../_helpers';

/**
* @DateOfCreation        11 May 2018
* @ShortDescription      This function is responsible to call familyMedical api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
export const patientFamilyMedicalHistoryService = {
    getPatientFamilyMedicalHistoryRecordService,
    doNewFamilyMedicalHistory
};

/**
* @DateOfCreation        18 June 2018
* @ShortDescription      This function is responsible to get familyMedical record api
* @param                 JSON experience
* @return                Response JSON
*/
function getPatientFamilyMedicalHistoryRecordService(patientDetails) { 
    return axios({
        method: 'POST',
        url: configConstants.API_BASE_PATH+'visit/familymedicalhistory/details',
        data: headerHelper.appendUserDataInJson(patientDetails),
        headers : headerHelper.getHeaderWithAuthorization()
    }).then(function (response) {
        return response;
    }).catch(function (response) {
        return response;
    });
}

/**
* @DateOfCreation        15 june 2018
* @ShortDescription      This function is responsible to call Fetch state api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function doNewFamilyMedicalHistory(familyMedicalData) { 
     
    return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'visit/familymedicalhistory/save',
            data: headerHelper.getJsonDataToFormData(familyMedicalData),
            headers : headerHelper.getHeaderWithAuthorization('multipart/form-data')
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            return response;
        });
}
