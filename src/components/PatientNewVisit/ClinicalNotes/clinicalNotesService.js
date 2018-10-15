/**
 * clinicalNotesService
 *
 * @package                SAFEHEALTH
 * @subpackage             clinicalNotesService
 * @category               Service
 * @DateOfCreation         21 Aug 2018
 * @ShortDescription       This is responsible for calling all api related to membership
 */
import axios from 'axios';
import { configConstants } from '../../../_constants';
import { utilityHelper, headerHelper } from '../../../_helpers';

/**
* @DateOfCreation        11 May 2018
* @ShortDescription      This function is responsible to call membership api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
export const clinicalNotesService = {
    getClinicalNotesRequest,
    doClinicalNotesInsertUpdate,
};

/**
* @DateOfCreation        14 July 2018
* @ShortDescription      This function is responsible to call Fetch staticConfig data api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getClinicalNotesRequest(visitId, patId) { 
    let formData = {'visit_id': visitId, 'pat_id': patId};
    return axios({
            method: 'post',
            url     : configConstants.API_BASE_PATH+'visit/clinical-notes/get-clinical-notes-list',
            data    : headerHelper.appendUserDataInJson(formData),
            headers : headerHelper.getHeaderWithAuthorization()
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}

/**
* @DateOfCreation        14 July 2018
* @ShortDescription      This function is responsible to call Fetch state api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function doClinicalNotesInsertUpdate(data) { 
    return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'visit/clinical-notes/add-edit',
            data: headerHelper.appendUserDataInJson(data),
            headers : headerHelper.getHeaderWithAuthorization(),
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}