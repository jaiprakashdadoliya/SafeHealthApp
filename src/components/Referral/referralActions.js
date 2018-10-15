import { configConstants } from '../../_constants';
import { referralConstants } from './referralConstants';
import { referralService } from './referralService';
import { utilityHelper } from '../../_helpers';

/**
 * referralActions
 *
 * @package                SafeHealth
 * @subpackage             referralActions
 * @category               Actions
 * @DateOfCreation         22 August 2018
 * @ShortDescription       This is responsible for all appointment category actions
 */ 
export const referralActions = {
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
        referralService.getList(page, pageSize, sorted, filtered)
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
    function request() { return { type: referralConstants.DOC_REF_REQUEST } }
    function success(referralList) { return { type: referralConstants.DOC_REF_SUCCESS, referralList} }
    function failure(error) { return { type: referralConstants.DOC_REF_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        22 August 2018
* @ShortDescription      This function is responsible for save appointment category detail
* @param {object} detail appointment category detail
* @param {array} referralList  list of all active service
* @return                JSON Object in succsss message, recent saved record
*/
function doSave(detail) {    
    return dispatch => {
         dispatch(request());
        referralService.doSave(detail)
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
    function request() { return { type: referralConstants.DOC_REF_ADD_REQUEST } }
    function success(categoryResult) { return { type: referralConstants.DOC_REF_ADD_SUCCESS, categoryResult} }
    function failure(error) { return { type: referralConstants.DOC_REF_ADD_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        22 August 2018
* @ShortDescription      This function is responsible for update appointment category detail
* @param {object} detail appointment category detail
* @param {array} referralList  list of all active service
* @return                JSON Object in succsss message
*/
function doUpdate(detail, referralList) {

    return dispatch => {
        referralService.doUpdate(detail)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        const index = referralList.findIndex(i => i.doc_ref_id === data.result.doc_ref_id);
                        referralList[index] = data.result;
                        var successMsg = {'message':data.message,'detail':data.result,'referralList':referralList};
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
    function success(successMsg) { return { type: referralConstants.DOC_REF_EDIT_SUCCESS, successMsg} }
    function failure(error) { return { type: referralConstants.DOC_REF_EDIT_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        22 August 2018
* @ShortDescription      This function is responsible for update appointment category detail
* @param {object} referralId appointment category id
* @param {array} referralList  list of all active service
* @return                JSON Object in succsss message
*/
function doDelete(referralId, referralList) {
    return dispatch => {
         dispatch(request());
        referralService.doDelete(referralId)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        referralList = referralList.filter(function(item) {
                            return item.doc_ref_id !== referralId
                        })
                        var successMsg = {'message':data.message,'referralId':referralId,'referralList':referralList};
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
    function request() { return { type: referralConstants.DOC_REF_REMOVE_REQUEST } }
    function success(successMsg) { return { type: referralConstants.DOC_REF_REMOVE_SUCCESS, successMsg} }
    function failure(error) { return { type: referralConstants.DOC_REF_REMOVE_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


/**
* @DateOfCreation        22 August 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function resetState(){
    return dispatch => { dispatch(request());}
    function request() { return { type: referralConstants.DOC_REF_RESET_STATE } }
}
