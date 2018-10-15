import {configConstants } from '../../../../_constants';
import {patientAllergiesConstants } from './patientAllergiesConstants';
import {patientAllergiesService } from './patientAllergiesService';
import { utilityHelper } from '../../../../_helpers';

/**
 * patientAllergiesActions
 *
 * @package                Safe health
 * @subpackage             patientAllergiesActions
 * @category               Actions
 * @DateOfCreation         02 August 2018
 * @ShortDescription       This is responsible for all patient Allergies actions
 */ 
export const patientAllergiesActions = {
    getTablelist,
    submitRequest,
    getDeleteRequest,
    resetState,
    getAllergiesHistoryRecord,
    getAllergiesHistorySubmit,
    };


/**
* @DateOfCreation        02 August 2018
* @ShortDescription      This function is responsible for fetch Allergies Option list
* @return                JSON Object
*/
function getTablelist(patId, visitId, page, pageSize, sorted, filtered) {
    return dispatch => {
         dispatch(request(patId, visitId, page, pageSize, sorted, filtered));
        patientAllergiesService.getTablelist(patId, visitId, page, pageSize, sorted, filtered)
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
    function request(patId, visitId) { return { type: patientAllergiesConstants.PATIENT_ALLERGIES_GRID_REQUEST,patId, visitId } }
    function success(patientSymptomsData) { return { type: patientAllergiesConstants.PATIENT_ALLERGIES_GRID_SUCCESS, result:patientSymptomsData} }
    function failure(error) { return { type: patientAllergiesConstants.PATIENT_ALLERGIES_GRID_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        02 August 2018
* @ShortDescription      This function is responsible for final insert Allergies information sent
* @param                 JSON doctor, This contains full user input data 
* @return                JSON Object
*/
function submitRequest(patientDetails) {
    return dispatch => {
        dispatch(request({ patientDetails }));
        patientAllergiesService.doSubmitRequest(patientDetails)
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

    function request(patientDetails) { return { type: patientAllergiesConstants.PATIENT_ALLERGIES_ADD_REQUEST, patientDetails } }
    function success(result) { return { type: patientAllergiesConstants.PATIENT_ALLERGIES_ADD_SUCCESS, result} }
    function failure(error) { 
        return { 
            type: patientAllergiesConstants.PATIENT_ALLERGIES_ADD_FAILURE, 
            errorMsg:error
        }
    }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        02 August 2018
* @ShortDescription      This function is responsible for Delete the visit Allergies entry 
                         Alphnumeric patientDetails   
* @return                JSON Object
*/
function getDeleteRequest(patientDetails) {
    return dispatch => {
        dispatch(request());
        patientAllergiesService.doDeleteRequest(patientDetails)
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
    function request() { return { type: patientAllergiesConstants.PATIENT_ALLERGIES_DELETE_REQUEST } }
    function success(result) { return { type: patientAllergiesConstants.PATIENT_ALLERGIES_DELETE_SUCCESS, result } }
    function failure(error) { return { type: patientAllergiesConstants.PATIENT_ALLERGIES_DELETE_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        14 june 2018
* @ShortDescription      This function is responsible for fetch Symptoms Option list
* @return                JSON Object
*/
function getAllergiesHistoryRecord(patDetails) {
    return dispatch => {
         dispatch(request());
        patientAllergiesService.getAllergiesHistoryRecord(patDetails)
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
    function request() { return { type: patientAllergiesConstants.ALLERGIES_HISTORY_REQUEST } }
    function success(result) { return { type: patientAllergiesConstants.ALLERGIES_HISTORY_SUCCESS, result} }
    function failure(error) { return { type: patientAllergiesConstants.ALLERGIES_HISTORY_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


/**
* @DateOfCreation        14 june 2018
* @ShortDescription      This function is responsible for fetch Symptoms Option list
* @return                JSON Object
*/
function getAllergiesHistorySubmit(finalData) {
    return dispatch => {
         dispatch(request(finalData));
        patientAllergiesService.getAllergiesHistorySubmit(finalData)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        var result = {'message': data.message };  
                        dispatch(success(result));
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
    function request(finalData) { return { type: patientAllergiesConstants.ALLERGIES_HISTORY_ADD_UPDATE_REQUEST, finalData} }
    function success(result) { return { type: patientAllergiesConstants.ALLERGIES_HISTORY_ADD_UPDATE_SUCCESS, result} }
    function failure(error) { return { type: patientAllergiesConstants.ALLERGIES_HISTORY_ADD_UPDATE_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


/**
* @DateOfCreation        02 August 2018
* @ShortDescription      This function is responsible for reset reducer state
* @param                 JSON doctor, This contains full user input data 
* @return                JSON Object
*/
function resetState(){
    return dispatch => {
            dispatch(request());
    };
    function request(){ return {type:patientAllergiesConstants.PATIENT_ALLERGIES_RESET}}
}