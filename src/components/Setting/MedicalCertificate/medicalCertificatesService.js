/**
 * medicalCertificatesService
 *
 * @package                SafeHealth
 * @subpackage             medicalCertificatesService
 * @category               Service
 * @DateOfCreation         3 Sept 2018
 * @ShortDescription       This is responsible for calling all api related to patient activity history
 */
import axios from 'axios';
import { configConstants } from './../../../_constants';
import { utilityHelper, headerHelper } from './../../../_helpers';

/**
* @DateOfCreation        3 Sept 2018
* @ShortDescription      This function is responsible to call Patient Activity history api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
export const medicalCertificatesService = {
    getMedicalCertificatesDataRequest,
    medicalCertificateTextSave
};

/**
* @DateOfCreation        3 Sept 2018
* @ShortDescription      This function is responsible to call Fetch activity history record
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getMedicalCertificatesDataRequest() { 
   return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'setting/medical-certificates/get-data',
            headers : headerHelper.getHeaderWithAuthorization(),
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}

/**
 * @DateOfCreation        13 June 2018
 * @ShortDescription      This function is responsible to call api to add or update Clinic
 * @param                 JSON jsonObj
 * @return                Response JSON jsonObj
 */
function medicalCertificateTextSave(medicalCertificateTextData) { 
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    var httpMethod = (medicalCertificateTextData['mc_id'] != "") ? "put" : "post";
    return axios({
            method  : httpMethod,
            url     : configConstants.API_BASE_PATH+'setting/medical-certificates/save-data',
            data    : medicalCertificateTextData,
            headers : { 'Content-Type' : 'application/json', 'Authorization' : 'Bearer '+loginAccessToken }
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            return response;
        });
}