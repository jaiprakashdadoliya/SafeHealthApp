/**
 * doctorMediaService
 *
 * @package                SafeHealth
 * @subpackage             doctorMediaService
 * @category               Service
 * @DateOfCreation         11 May 2018
 * @ShortDescription       This is responsible for calling all api related to registration
 */

import axios from "axios";
import { configConstants, doctorMediaConstants } from '../_constants';
import { utilityHelper, headerHelper } from '../_helpers';
import { Cookies } from 'react-cookie';

export const doctorMediaService = {
    getMedia,
    deleteMedia,
    addMedia
};

/**
 * @DateOfCreation        11 May 2018
 * @ShortDescription      This function is responsible to call get media api
 * @return                Response JSON jsonObj
 */
function getMedia(formData) {
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
        method  : 'post',
        url: configConstants.API_BASE_PATH+'doctors/profile/media/get',
        headers : {'Authorization' : 'Bearer '+loginAccessToken},
        data: formData
    })
        .then(response => {
            return response;
        })
        .catch(function (response) {
            return response;
        });
}

/**
 * @DateOfCreation        11 May 2018
 * @ShortDescription      This function is responsible to call delete media api
 * @param                 JSON jsonObj
 * @return                Response JSON jsonObj
 */
function deleteMedia(mediaId) {
    var deleteData = {'doc_media_id':mediaId};
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
        method  : 'delete',
        url     : configConstants.API_BASE_PATH+'doctors/profile/media/delete',
        headers : headerHelper.getHeaderWithAuthorization(),
        data    : headerHelper.appendUserDataInJson(deleteData)
    })
        .then(response => {
            return response;
        })
        .catch(function (response) {
            return response;
        });
}

/**
 * @DateOfCreation        11 May 2018
 * @ShortDescription      This function is responsible to call add media api
 * @param                 JSON jsonObj
 * @return                Response JSON jsonObj
 */
function addMedia(fileData, dispatch, mediaDataObj, progressIndex, patId) {
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    var bodyFormData = new FormData();
    bodyFormData.append('doc_media_file', fileData);
    bodyFormData.append('patient_id', patId);
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH+'doctors/profile/media/add',
        data    : bodyFormData,
        headers : {'Authorization' : 'Bearer '+loginAccessToken},
        onUploadProgress: progressEvent => {
            dispatch(progress(progressEvent, mediaDataObj, progressIndex));
        }
    })
        .then(response => {
            return response;
        })
        .catch(function (response) {
            return response;
        });
    function progress(progressEvent, mediaDataObj) {
        return {type: doctorMediaConstants.DR_MEDIA_PROGRESS,  progressValue: ((progressEvent.loaded / progressEvent.total)*100), progressIndex:progressIndex, mediaData:mediaDataObj}
    }
}