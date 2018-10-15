import { configConstants } from '../../../_constants';
import { patientGroupsConstants } from './patientGroupsConstants';
import { patientGroupsService } from './patientGroupsService';
import { utilityHelper } from '../../../_helpers';

/**
 * patientGroupsActions
 *
 * @package                SafeHealth
 * @subpackage             patientGroupsActions
 * @category               Actions
 * @DateOfCreation         22 August 2018
 * @ShortDescription       This is responsible for all patient group actions
 */ 
export const patientGroupsActions = {
    getList,
    doSave,
    doUpdate,
    doDelete,
    resetState
};

/**
* @DateOfCreation        22 August 2018
* @ShortDescription      This function is responsible for patient group list
* @return                JSON Object
*/
function getList(page, pageSize, sorted, filtered) {
    return dispatch => {
         dispatch(request());
        patientGroupsService.getList(page, pageSize, sorted, filtered)
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
    function request() { return { type: patientGroupsConstants.PAT_GRP_REQUEST } }
    function success(patientGroupsList) { return { type: patientGroupsConstants.PAT_GRP_SUCCESS, patientGroupsList} }
    function failure(error) { return { type: patientGroupsConstants.PAT_GRP_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        22 August 2018
* @ShortDescription      This function is responsible for save patient group detail
* @param {object} detail patient group detail
* @param {array} patientGroupsList  list of all active service
* @return                JSON Object in succsss message, recent saved record
*/
function doSave(detail) {    
    return dispatch => {
         dispatch(request());
        patientGroupsService.doSave(detail)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        var groupResult = {'message':data.message,'detail':data.result};
                        dispatch(success(groupResult));
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
    function request() { return { type: patientGroupsConstants.PAT_GRP_ADD_REQUEST } }
    function success(groupResult) { return { type: patientGroupsConstants.PAT_GRP_ADD_SUCCESS, groupResult} }
    function failure(error) { return { type: patientGroupsConstants.PAT_GRP_ADD_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        22 August 2018
* @ShortDescription      This function is responsible for update patient group detail
* @param {object} detail patient group detail
* @param {array} patientGroupsList  list of all active service
* @return                JSON Object in succsss message
*/
function doUpdate(detail, patientGroupsList) {

    return dispatch => {
        patientGroupsService.doUpdate(detail)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        const index = patientGroupsList.findIndex(i => i.pat_group_id === data.result.pat_group_id);
                        patientGroupsList[index] = data.result;
                        var successMsg = {'message':data.message,'detail':data.result,'patientGroupsList':patientGroupsList};
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
    function success(successMsg) { return { type: patientGroupsConstants.PAT_GRP_EDIT_SUCCESS, successMsg} }
    function failure(error) { return { type: patientGroupsConstants.PAT_GRP_EDIT_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        22 August 2018
* @ShortDescription      This function is responsible for update patient group detail
* @param {object} patientGroupId patient group id
* @param {array} patientGroupsList  list of all active service
* @return                JSON Object in succsss message
*/
function doDelete(patientGroupId, patientGroupsList) {
    return dispatch => {
         dispatch(request());
        patientGroupsService.doDelete(patientGroupId)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        patientGroupsList = patientGroupsList.filter(function(item) {
                            return item.pat_group_id !== patientGroupId
                        })
                        var successMsg = {'message':data.message,'patientGroupId':patientGroupId,'patientGroupsList':patientGroupsList};
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
    function request() { return { type: patientGroupsConstants.PAT_GRP_REMOVE_REQUEST } }
    function success(successMsg) { return { type: patientGroupsConstants.PAT_GRP_REMOVE_SUCCESS, successMsg} }
    function failure(error) { return { type: patientGroupsConstants.PAT_GRP_REMOVE_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


/**
* @DateOfCreation        22 August 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function resetState(){
    return dispatch => { dispatch(request());}
    function request() { return { type: patientGroupsConstants.PAT_GRP_RESET_STATE } }
}
