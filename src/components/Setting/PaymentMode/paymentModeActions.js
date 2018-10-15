import {configConstants } from '../../../_constants';
import {paymentModeConstants } from './paymentModeConstants';
import {paymentModeService } from './paymentModeService';
import { utilityHelper } from '../../../_helpers';

/**
 * paymentModeActions
 *
 * @package                RxHelth
 * @subpackage             paymentModeActions
 * @category               Actions
 * @DateOfCreation         04 Oct 2018
 * @ShortDescription       This is responsible for add Payment Mode Actions
 */ 
export const paymentModeActions = {
    getTablelist,
    submitRequest,
    getDeleteRequest,
    resetState
};


/**
* @DateOfCreation        04 Oct 2018
* @ShortDescription      This function is responsible for fetch Symptoms Option list
* @return                JSON Object
*/
function getTablelist(page, pageSize, sorted, filtered) {
    return dispatch => {
         dispatch(request());
        paymentModeService.getTablelist(page, pageSize, sorted, filtered)
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
                dispatch(failure(response.message));
            });
    };
    function request() { return { type: paymentModeConstants.PM_GRID_REQUEST} }
    function success(Data) { return { type: paymentModeConstants.PM_GRID_SUCCESS, result:Data} }
    function failure(error) { return { type: paymentModeConstants.PM_GRID_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        04 Oct 2018
* @ShortDescription      This function is responsible for final insert Symptom information sent
* @param                 JSON doctor, This contains full user input data 
* @return                JSON Object
*/
function submitRequest(details) {
    return dispatch => {
        dispatch(request({ details }));
        paymentModeService.doSubmitRequest(details)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        var result = {
                            'message':   data.message,
                        };                                         
                        dispatch(success(result));                        
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg = utilityHelper.getFirstErrorMessage(data.error);                        
                        dispatch(failure(errorMsg));
                    }else if(data.code == configConstants.EXCEPTION_CODE){
                        dispatch(failure(data.message));
                    }else if(data.code == configConstants.UNAUTHENTICATE_CODE){
                        var errorMsg = data.message;
                        dispatch(unauthorize(errorMsg));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response.message));
            });
    };

    function request(details) { return { type: paymentModeConstants.PM_ADD_REQUEST, details } }
    function success(result) { return { type: paymentModeConstants.PM_ADD_SUCCESS, result} }
    function failure(error) { 
        return { 
            type: paymentModeConstants.PM_ADD_FAILURE, 
            errorMsg:error
        }
    }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        04 Oct 2018
* @ShortDescription      This function is responsible for Delete the visit Symptom entry 
                         Alphnumeric details   
* @return                JSON Object
*/
function getDeleteRequest(details) {
    return dispatch => {
        dispatch(request());
        paymentModeService.doDeleteRequest(details)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        var result = {
                            'message'  :   data.message
                        };                                             
                        dispatch(success(result));                        
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg = utilityHelper.getFirstErrorMessage(data.error);
                        dispatch(failure(errorMsg));
                    }else if(data.code == configConstants.EXCEPTION_CODE){
                        var errorMsg  = data.message;
                        dispatch(failure(errorMsg));
                    }else if(data.code == configConstants.UNAUTHENTICATE_CODE){
                        var errorMsg = data.message;
                        dispatch(unauthorize(errorMsg));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response.message));
            });
    };
    // Actions defination that will perform according dispatch call and send data to reducer
    function request() { return { type: paymentModeConstants.PM_DELETE_REQUEST } }
    function success(result) { return { type: paymentModeConstants.PM_DELETE_SUCCESS, result } }
    function failure(error) { return { type: paymentModeConstants.PM_DELETE_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        04 Oct 2018
* @ShortDescription      This function is responsible for reset reducer state
* @param                 JSON doctor, This contains full user input data 
* @return                JSON Object
*/
function resetState(){
    return dispatch => {
            dispatch(request());
    };
    function request(){ return {type:paymentModeConstants.PM_RESET}}
}