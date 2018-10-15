import { doctorMediaConstants,configConstants } from '../_constants';
import { doctorMediaService } from '../_services';
import { utilityHelper } from '../_helpers';

/**
 * doctorMediaActions
 *
 * @package                SafeHealth
 * @subpackage             doctorMediaActions
 * @category               Actions
 * @DateOfCreation         11 May 2018
 * @ShortDescription       This is responsible for all media actions
 */

export const doctorMediaActions = {
    getMedia,
    deleteMedia,
    addMedia,
    resetState
};

/**
 * @DateOfCreation        11 May 2018
 * @ShortDescription      This function is responsible for getting all media
 * @return                JSON Object
 */
function getMedia(formData) {
    return dispatch => {
        dispatch(request());
        doctorMediaService.getMedia(formData)
            .then(
                response => {
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        dispatch(success(data.result));
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg = utilityHelper.getFirstErrorMessage(data.error);
                        dispatch(failure(errorMsg));
                    }else if(data.code == configConstants.EXCEPTION_CODE){
                        var errorMsg = data.message;
                        dispatch(failure(errorMsg));
                    }else if(data.code == configConstants.UNAUTHENTICATE_CODE){
                        var errorMsg = data.message;
                        dispatch(unauthorize(errorMsg));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
            dispatch(failure(response));
        });
    };

    function request() { return { type: doctorMediaConstants.DR_MEDIA_REQUEST } }
    function success(mediaData) { return { type: doctorMediaConstants.DR_MEDIA_SUCCESS, mediaData } }
    function failure(error) { return { type: doctorMediaConstants.DR_MEDIA_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
 * @DateOfCreation        11 May 2018
 * @ShortDescription      This function is responsible for deleting media
 * @param                 int mediaId
 * @param                 JSON media data
 * @return                JSON Object
 */
function deleteMedia(mediaId, mediaDataObj) {
    return dispatch => {
        dispatch(request(mediaDataObj));
        doctorMediaService.deleteMedia(mediaId)
            .then(
                response => {
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        mediaDataObj = mediaDataObj.filter(function(item) {
                            return item.doc_media_id !== mediaId
                        })
                        dispatch(success(mediaId, mediaDataObj));
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg = utilityHelper.getFirstErrorMessage(data.error);
                        dispatch(failure(errorMsg));
                    }else if(data.code == configConstants.EXCEPTION_CODE){
                        var errorMsg = data.message;
                        dispatch(failure(errorMsg));
                    }else if(data.code == configConstants.UNAUTHENTICATE_CODE){
                        var errorMsg = data.message;
                        dispatch(unauthorize(errorMsg));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
            dispatch(failure(response));
        });
    };

    function request(mediaDataObj) { return { type: doctorMediaConstants.DR_MEDIA_DELETE_REQUEST, mediaData:mediaDataObj } }
    function success(mediaId, mediaDataObj) { return { type: doctorMediaConstants.DR_MEDIA_DELETE_SUCCESS, mediaId, mediaData:mediaDataObj } }
    function failure(error) { return { type: doctorMediaConstants.DR_MEDIA_DELETE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
 * @DateOfCreation        11 May 2018
 * @ShortDescription      This function is responsible for adding media
 * @param                 int fileData
 * @param                 JSON mediaDataObj
 * @return                JSON Object
 */
function addMedia(fileData, mediaDataObj, progressIndex, patId) {
    return dispatch => {
        dispatch(request(mediaDataObj));
        doctorMediaService.addMedia(fileData, dispatch, mediaDataObj, progressIndex, patId)
            .then(
                response => {
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        var result = data.result;
                        dispatch(success(mediaDataObj, result));
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg = utilityHelper.getFirstErrorMessage(data.error);
                        dispatch(failure(errorMsg));
                    }else if(data.code == configConstants.EXCEPTION_CODE){
                        var errorMsg = data.message;
                        dispatch(failure(errorMsg, mediaDataObj));
                    }else if(data.code == configConstants.UNAUTHENTICATE_CODE){
                        var errorMsg = data.message;
                        dispatch(unauthorize(errorMsg));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
            dispatch(failure(response));
        });
    };

    function request(mediaDataObj) { return { type: doctorMediaConstants.DR_MEDIA_ADD_REQUEST, mediaData:mediaDataObj } }
    function success(mediaDataObj, result) { return { type: doctorMediaConstants.DR_MEDIA_ADD_SUCCESS, newMedia:result } }
    function failure(error, mediaDataobj) { return { type: doctorMediaConstants.DR_MEDIA_ADD_FAILURE, error, mediaData:mediaDataObj } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        28 May 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function resetState(){
    return dispatch => { dispatch(request());}
    function request() { return { type: doctorMediaConstants.DR_MEDIA_RESET_STATE } }
}
