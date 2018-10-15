/**
 * domesticFactorService
 *
 * @package                ILD India Registry
 * @subpackage             domesticFactorService
 * @category               Service
 * @DateOfCreation         31 May 2018
 * @ShortDescription       This is responsible for calling all api related to domestic Factor Service
 */
import axios from 'axios';
import { configConstants } from '../../../../_constants';
import { utilityHelper, headerHelper } from '../../../../_helpers';

/**
* @DateOfCreation        11 May 2018
* @ShortDescription      This function is responsible to call domesticFactor api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
export const domesticFactorService = {
    getPatientDomesticFactorRecordService,
    doNewDomesticFactor
};

/**
* @DateOfCreation        18 June 2018
* @ShortDescription      This function is responsible to get domesticFactor record api
* @param                 JSON experience
* @return                Response JSON
*/
function getPatientDomesticFactorRecordService(visitId, patientId) { 
    return axios({
        method: 'GET',
        url: configConstants.API_BASE_PATH+'visit/domesticfactor/get-domestic-factor-records/'+visitId+'/'+patientId,
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
function doNewDomesticFactor(domesticFactorData) { 
     
    return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'visit/domesticfactor/save',
            data: headerHelper.getJsonDataToFormData(domesticFactorData),
            headers : headerHelper.getHeaderWithAuthorization('multipart/form-data')
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            return response;
        });
}
