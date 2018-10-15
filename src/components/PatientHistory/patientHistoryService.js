/**
 * patientHistoryService
 *
 * @package                SafeHealth
 * @subpackage             patientHistoryService
 * @category               Service
 * @DateOfCreation         3 Sept 2018
 * @ShortDescription       This is responsible for calling all api related to patient activity history
 */
import axios from 'axios';
import { configConstants } from '../../_constants';
import { utilityHelper, headerHelper } from '../../_helpers';

/**
* @DateOfCreation        3 Sept 2018
* @ShortDescription      This function is responsible to call Patient Activity history api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
export const patientHistoryService = {
    getPatientActivityHistoryRequest
};

/**
* @DateOfCreation        3 Sept 2018
* @ShortDescription      This function is responsible to call Fetch activity history record
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getPatientActivityHistoryRequest(postData) { 
   return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'patients/profile/activity-history',
            data: headerHelper.appendUserDataInJson(postData),
            headers : headerHelper.getHeaderWithAuthorization(),
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}