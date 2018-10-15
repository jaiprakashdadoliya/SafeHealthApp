import { configConstants } from './../../../_constants';
import { medicalHistoryConstants } from './medicalHistoryConstants';
import { medicalHistoryService } from './medicalHistoryService';
import { utilityHelper } from './../../../_helpers';

/**
 * medicalHistoryActions
 *
 * @package                SafeHealth
 * @subpackage             medicalHistoryActions
 * @category               Actions
 * @DateOfCreation         21 May 2018
 * @ShortDescription       This is responsible for all disease actions
 */ 
export const medicalHistoryActions = {
    diseaseList,
    diseaseSave,
    diseaseDelete,
    resetState
};

/**
* @DateOfCreation        21 May 2018
* @ShortDescription      This function is responsible for disease list
* @return                JSON Object
*/
function diseaseList(page, pageSize, sorted, filtered) {
    return dispatch => {
         dispatch(request());
        medicalHistoryService.diseaseList(page, pageSize, sorted, filtered)
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
    function request() { return { type: medicalHistoryConstants.DR_MH_REQUEST } }
    function success(diseases) { return { type: medicalHistoryConstants.DR_MH_SUCCESS, diseases} }
    function failure(error) { return { type: medicalHistoryConstants.DR_MH_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        21 May 2018
* @ShortDescription      This function is responsible for save disease detail
* @param {object} detail Membership detail
* @param {array} diseaseList  list of all active disease
* @return                JSON Object in succsss message, recent saved record
*/
function diseaseSave(detail, diseaseList) {    
    return dispatch => {
         dispatch(request());
        medicalHistoryService.diseaseSave(detail)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        if(detail.disease_id != ""){
                            const index = diseaseList.findIndex(i => i.disease_id === detail.disease_id);
                            diseaseList[index] = detail;
                        }else{
                            detail['disease_id'] = data.result.disease_id;
                            diseaseList.unshift(detail);
                        }
                        var successMsg = {'message':data.message,'detail':data.result,'disease':diseaseList};
                        dispatch(success(successMsg));
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
    function request() { return { type: medicalHistoryConstants.DR_MH_ADD_REQUEST } }
    function success(successMsg) { return { type: medicalHistoryConstants.DR_MH_ADD_SUCCESS, successMsg} }
    function failure(error) { return { type: medicalHistoryConstants.DR_MH_ADD_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        21 May 2018
* @ShortDescription      This function is responsible for update disease detail
* @param {object} diseaseId Membership id
* @param {array} diseaseList  list of all active disease
* @return                JSON Object in succsss message
*/
function diseaseDelete(diseaseId, diseaseList) {
    return dispatch => {
         dispatch(request());
        medicalHistoryService.diseaseDelete(diseaseId)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        diseaseList = diseaseList.filter(function(item) {
                            return item.disease_id !== diseaseId
                        })
                        var successMsg = {'message':data.message,'diseaseId':diseaseId,'disease':diseaseList};
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
    function request() { return { type: medicalHistoryConstants.DR_MH_REMOVE_REQUEST } }
    function success(successMsg) { return { type: medicalHistoryConstants.DR_MH_REMOVE_SUCCESS, successMsg} }
    function failure(error) { return { type: medicalHistoryConstants.DR_MH_REMOVE_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


/**
* @DateOfCreation        28 May 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function resetState(){
    return dispatch => { dispatch(request());}
    function request() { return { type: medicalHistoryConstants.DR_MH_RESET_STATE } }
}
