import { configConstants } from '../../_constants';
import { appointmentCategoryConstants } from './appointmentCategoryConstants';
import { appointmentCategoryService } from './appointmentCategoryService';
import { utilityHelper } from '../../_helpers';

/**
 * appointmentCategoryActions
 *
 * @package                SafeHealth
 * @subpackage             appointmentCategoryActions
 * @category               Actions
 * @DateOfCreation         22 August 2018
 * @ShortDescription       This is responsible for all appointment category actions
 */ 
export const appointmentCategoryActions = {
    getList,
    doSave,
    doUpdate,
    doDelete,
    resetState
};

/**
* @DateOfCreation        22 August 2018
* @ShortDescription      This function is responsible for appointment category list
* @return                JSON Object
*/
function getList(page, pageSize, sorted, filtered) {
    return dispatch => {
         dispatch(request());
        appointmentCategoryService.getList(page, pageSize, sorted, filtered)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        dispatch(success(data.result));
                    }else if(data.code == configConstants.ERROR_CODE){
                       dispatch(failure(data.message));
                    }else if(data.code == configConstants.EXCEPTION_CODE){
                        dispatch(failure(data.message));
                    }else if(data.code == configConstants.UNAUTHENTICATE_CODE){
                        dispatch(unauthorize(data.message));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };
    function request() { return { type: appointmentCategoryConstants.APP_CATE_REQUEST } }
    function success(appointmentCategoryList) { return { type: appointmentCategoryConstants.APP_CATE_SUCCESS, appointmentCategoryList} }
    function failure(error) { return { type: appointmentCategoryConstants.APP_CATE_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        22 August 2018
* @ShortDescription      This function is responsible for save appointment category detail
* @param {object} detail appointment category detail
* @param {array} appointmentCategoryList  list of all active service
* @return                JSON Object in succsss message, recent saved record
*/
function doSave(detail) {    
    return dispatch => {
         dispatch(request());
        appointmentCategoryService.doSave(detail)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        var categoryResult = {'message':data.message,'detail':data.result};
                        dispatch(success(categoryResult));
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg = utilityHelper.getFirstErrorMessage(data.error);
                        dispatch(failure(errorMsg));
                    }else if(data.code == configConstants.EXCEPTION_CODE){
                        dispatch(failure(data.message));
                    }else if(data.code == configConstants.UNAUTHENTICATE_CODE){
                        dispatch(unauthorize(data.message));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };
    function request() { return { type: appointmentCategoryConstants.APP_CATE_ADD_REQUEST } }
    function success(categoryResult) { return { type: appointmentCategoryConstants.APP_CATE_ADD_SUCCESS, categoryResult} }
    function failure(error) { return { type: appointmentCategoryConstants.APP_CATE_ADD_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        22 August 2018
* @ShortDescription      This function is responsible for update appointment category detail
* @param {object} detail appointment category detail
* @param {array} appointmentCategoryList  list of all active service
* @return                JSON Object in succsss message
*/
function doUpdate(detail, appointmentCategoryList) {

    return dispatch => {
        appointmentCategoryService.doUpdate(detail)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        const index = appointmentCategoryList.findIndex(i => i.appointment_cat_id === data.result.appointment_cat_id);
                        appointmentCategoryList[index] = data.result;
                        var successMsg = {'message':data.message,'detail':data.result,'appointmentCategoryList':appointmentCategoryList};
                        dispatch(success(successMsg));
                    }else if(data.code == configConstants.ERROR_CODE){
                        dispatch(failure(data.message));
                    }else if(data.code == configConstants.EXCEPTION_CODE){
                        dispatch(failure(data.message));
                    }else if(data.code == configConstants.UNAUTHENTICATE_CODE){
                        dispatch(unauthorize(data.message));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };
    function success(successMsg) { return { type: appointmentCategoryConstants.APP_CATE_EDIT_SUCCESS, successMsg} }
    function failure(error) { return { type: appointmentCategoryConstants.APP_CATE_EDIT_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        22 August 2018
* @ShortDescription      This function is responsible for update appointment category detail
* @param {object} appointmentCategoryId appointment category id
* @param {array} appointmentCategoryList  list of all active service
* @return                JSON Object in succsss message
*/
function doDelete(appointmentCategoryId, appointmentCategoryList) {
    return dispatch => {
         dispatch(request());
        appointmentCategoryService.doDelete(appointmentCategoryId)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        appointmentCategoryList = appointmentCategoryList.filter(function(item) {
                            return item.appointment_cat_id !== appointmentCategoryId
                        })
                        var successMsg = {'message':data.message,'appointmentCategoryId':appointmentCategoryId,'appointmentCategoryList':appointmentCategoryList};
                        dispatch(success(successMsg));
                    }else if(data.code == configConstants.ERROR_CODE){
                        dispatch(failure(data.message));
                    }else if(data.code == configConstants.EXCEPTION_CODE){
                        dispatch(failure(data.message));
                    }else if(data.code == configConstants.UNAUTHENTICATE_CODE){
                        dispatch(unauthorize(data.message));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };
    function request() { return { type: appointmentCategoryConstants.APP_CATE_REMOVE_REQUEST } }
    function success(successMsg) { return { type: appointmentCategoryConstants.APP_CATE_REMOVE_SUCCESS, successMsg} }
    function failure(error) { return { type: appointmentCategoryConstants.APP_CATE_REMOVE_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


/**
* @DateOfCreation        22 August 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function resetState(){
    return dispatch => { dispatch(request());}
    function request() { return { type: appointmentCategoryConstants.APP_CATE_RESET_STATE } }
}
