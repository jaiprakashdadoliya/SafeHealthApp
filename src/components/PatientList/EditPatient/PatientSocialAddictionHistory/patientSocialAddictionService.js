/**
 * patientSocialAddictionService
 *
 * @package                ILD India Registry
 * @subpackage             patientSocialAddictionService
 * @category               Service
 * @DateOfCreation         31 May 2018
 * @ShortDescription       This is responsible for calling all api related to social addiction Service
 */
import axios from 'axios';
import { configConstants } from '../../../../_constants';
import { utilityHelper, headerHelper } from '../../../../_helpers';

/**
* @DateOfCreation        11 May 2018
* @ShortDescription      This function is responsible to call social addication api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
export const patientSocialAddictionService = {
    getPatientSocialAddictionRecordService,
    doNewSocialAddiction
};

/**
* @DateOfCreation        18 June 2018
* @ShortDescription      This function is responsible to get social addication record api
* @param                 JSON experience
* @return                Response JSON
*/
function getPatientSocialAddictionRecordService(visitId, patientId) { 
    return axios({
        method: 'GET',
        url: configConstants.API_BASE_PATH+'visit/socialaddiction/get-social-addiction-records/'+visitId+'/'+patientId,
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
function doNewSocialAddiction(socialAddictionData) { 
     
    return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'visit/socialaddiction/save',
            data: headerHelper.getJsonDataToFormData(socialAddictionData),
            headers : headerHelper.getHeaderWithAuthorization('multipart/form-data')
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            return response;
        });
}
