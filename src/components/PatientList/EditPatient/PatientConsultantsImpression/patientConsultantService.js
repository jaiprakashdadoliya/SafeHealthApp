/**
 * patientConsultantService
 *
 * @package                ILD India Registry
 * @subpackage             patientConsultantService
 * @category               Service
 * @DateOfCreation         31 May 2018
 * @ShortDescription       This is responsible for calling all api related to domestic Factor Service
 */
import axios from 'axios';
import { configConstants } from '../../../../_constants';
import { utilityHelper, headerHelper } from '../../../../_helpers';

/**
* @DateOfCreation        11 May 2018
* @ShortDescription      This function is responsible to call Consultant api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
export const patientConsultantService = {
    getpatientConsultantRecordService,
    doNewConsultant
};

/**
* @DateOfCreation        18 June 2018
* @ShortDescription      This function is responsible to get Consultant record api
* @param                 JSON experience
* @return                Response JSON
*/
function getpatientConsultantRecordService(patientDetails) { 
    return axios({
        method: 'POST',
        url: configConstants.API_BASE_PATH+'visit/consultant/details',
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
* @ShortDescription      This function is responsible to save consultant data
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function doNewConsultant(ConsultantData) { 
     
    return axios({
            method: 'POST',
            url: configConstants.API_BASE_PATH+'visit/consultant/save',
            data: headerHelper.getJsonDataToFormData(ConsultantData),
            headers : headerHelper.getHeaderWithAuthorization('multipart/form-data')
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            return response;
        });
}
