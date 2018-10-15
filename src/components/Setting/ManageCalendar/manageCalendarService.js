/**
 * manageCalendarService
 *
 * @package                ILD India Registry
 * @subpackage             manageCalendarService
 * @category               Service
 * @DateOfCreation         31 May 2018
 * @ShortDescription       This is responsible for calling all api related to domestic Factor Service
 */
import axios from 'axios';
import { configConstants } from '../../../_constants';
import { utilityHelper, headerHelper } from '../../../_helpers';

/**
* @DateOfCreation        11 May 2018
* @ShortDescription      This function is responsible to call LaboratoryTest api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
export const manageCalendarService = {
    getRecord,
    doNewSubmit
};

/**
* @DateOfCreation        18 June 2018
* @ShortDescription      This function is responsible to get LaboratoryTest record api
* @param                 JSON experience
* @return                Response JSON
*/
function getRecord(details) { 
    return axios({
        method: 'POST',
        url: configConstants.API_BASE_PATH+'setting/manage-calendar',
        data : headerHelper.appendUserDataInJson(details),
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
function doNewSubmit(details) { 
     
    return axios({
            method: 'POST',
            url: configConstants.API_BASE_PATH+'setting/manage-calendar/save',
            data: headerHelper.getJsonDataToFormData(details),
            headers : headerHelper.getHeaderWithAuthorization('multipart/form-data')
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            return response;
        });
}
