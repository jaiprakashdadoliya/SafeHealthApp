/**
 * patientLaboratoryTestService
 *
 * @package                ILD India Registry
 * @subpackage             patientLaboratoryTestService
 * @category               Service
 * @DateOfCreation         31 May 2018
 * @ShortDescription       This is responsible for calling all api related to domestic Factor Service
 */
import axios from 'axios';
import { configConstants } from '../../../../_constants';
import { utilityHelper, headerHelper } from '../../../../_helpers';

/**
* @DateOfCreation        11 May 2018
* @ShortDescription      This function is responsible to call LaboratoryTest api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
export const patientLaboratoryTestService = {
    getPatientLaboratoryTestRecordService,
    doNewLaboratoryTest
};

/**
* @DateOfCreation        18 June 2018
* @ShortDescription      This function is responsible to get LaboratoryTest record api
* @param                 JSON experience
* @return                Response JSON
*/
function getPatientLaboratoryTestRecordService(patientDetails) { 
    return axios({
        method: 'POST',
        url: configConstants.API_BASE_PATH+'visit/laboratorytest/details',
        data : headerHelper.appendUserDataInJson(patientDetails),
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
function doNewLaboratoryTest(LaboratoryTestData) { 
     
    return axios({
            method: 'POST',
            url: configConstants.API_BASE_PATH+'visit/laboratorytest/save',
            data: headerHelper.getJsonDataToFormData(LaboratoryTestData),
            headers : headerHelper.getHeaderWithAuthorization('multipart/form-data')
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            return response;
        });
}
