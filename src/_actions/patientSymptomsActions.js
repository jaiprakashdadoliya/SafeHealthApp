import {patientSymptomsConstants,configConstants } from '../_constants';
import {patientSymptomsService } from '../_services';
import { utilityHelper } from '../_helpers';

/**
 * patientSymptomsActions
 *
 * @package                ILD INDIA REGISTRY
 * @subpackage             patientSymptomsActions
 * @category               Actions
 * @DateOfCreation         14 june 2018
 * @ShortDescription       This is responsible for all patientSymptoms actions
 */ 
export const patientSymptomsActions = {
    getSymptomsOptionlist,
    getSymptomslist,
    patientSymptomsSubmit,
    patientSymptomsUpdateSubmit,
    symptomsDelete,
    resetState,
    getSymptomsOptionlistBySearch,
    getPatientHavePatientRecord,
    getPatientHavePatientSubmit
    };

/**
* @DateOfCreation        14 june 2018
* @ShortDescription      This function is responsible for fetch Symptoms Option list
* @return                JSON Object
*/
function getSymptomsOptionlist() {
    return dispatch => {
         dispatch(request());
        patientSymptomsService.getSymptomsOptionlist()
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
    function request() { return { type: patientSymptomsConstants.SYMPTOMS_OPTION_REQUEST } }
    function success(patientSymptomsOptionData) { return { type: patientSymptomsConstants.SYMPTOMS_OPTION_SUCCESS, patientSymptomsOptionData} }
    function failure(error) { return { type: patientSymptomsConstants.SYMPTOMS_OPTION_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}



/**
* @DateOfCreation        14 june 2018
* @ShortDescription      This function is responsible for fetch Symptoms Option list
* @return                JSON Object
*/
function getSymptomslist(patId, visitId, page, pageSize, sorted, filtered) {
    return dispatch => {
         dispatch(request(patId, visitId, page, pageSize, sorted, filtered));
        patientSymptomsService.getSymptomslist(patId, visitId, page, pageSize, sorted, filtered)
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
    function request(patId, visitId) { return { type: patientSymptomsConstants.SYMPTOMS_GRID_REQUEST,patId, visitId } }
    function success(patientSymptomsData) { return { type: patientSymptomsConstants.SYMPTOMS_GRID_SUCCESS, result:patientSymptomsData} }
    function failure(error) { return { type: patientSymptomsConstants.SYMPTOMS_GRID_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


/**
* @DateOfCreation        14 june 2018
* @ShortDescription      This function is responsible for fetch Symptoms Option list
* @return                JSON Object
*/
function getPatientHavePatientRecord(patDetails) {
    return dispatch => {
         dispatch(request(patDetails));
        patientSymptomsService.getPatientHavePatientRecord(patDetails)
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
    function request(patDetails) { return { type: patientSymptomsConstants.HOPI_DETAIL_REQUEST,patId:patDetails.pat_id, visitId: patDetails.visit_id } }
    function success(result) { return { type: patientSymptomsConstants.HOPI_DETAIL_SUCCESS, result} }
    function failure(error) { return { type: patientSymptomsConstants.HOPI_DETAIL_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        14 june 2018
* @ShortDescription      This function is responsible for fetch Symptoms Option list
* @return                JSON Object
*/
function getPatientHavePatientSubmit(finalData) {
    return dispatch => {
         dispatch(request(finalData));
        patientSymptomsService.getPatientHavePatientSubmit(finalData)
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
    function request(finalData) { return { type: patientSymptomsConstants.HOPI_ADD_UPDATE_REQUEST, finalData} }
    function success(result) { return { type: patientSymptomsConstants.HOPI_ADD_UPDATE_SUCCESS, result} }
    function failure(error) { return { type: patientSymptomsConstants.HOPI_ADD_UPDATE_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}



/**
* @DateOfCreation        15 June 2018
* @ShortDescription      This function is responsible for final insert Symptom information sent
* @param                 JSON doctor, This contains full user input data 
* @return                JSON Object
*/
function patientSymptomsSubmit(symptom) {
    return dispatch => {
        dispatch(request({ symptom }));
        patientSymptomsService.doNewPatientSymptom(symptom)
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

    function request(symptom) { return { type: patientSymptomsConstants.SYMPTOMS_ADD_REQUEST, symptom } }
    function success(result) { return { type: patientSymptomsConstants.SYMPTOMS_ADD_SUCCESS, result} }
    function failure(error) { 
        return { 
            type: patientSymptomsConstants.SYMPTOMS_ADD_FAILURE, 
            errorMsg:error
        }
    }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}
/**
* @DateOfCreation        15 June 2018
* @ShortDescription      This function is responsible for final update Symptom information sent
* @param                 JSON doctor, This contains full user input data 
* @return                JSON Object
*/
function patientSymptomsUpdateSubmit(symptom) {
    return dispatch => {
        dispatch(request({ symptom }));
        patientSymptomsService.doUpdatePatientSymptom(symptom)
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
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response.message));
            });
    };

    function request(symptom) { return { type: patientSymptomsConstants.SYMPTOMS_UPDATE_REQUEST, symptom } }
    function success(result) { return { type: patientSymptomsConstants.SYMPTOMS_UPDATE_SUCCESS, result} }
    function failure(error) { 
        return { 
            type: patientSymptomsConstants.SYMPTOMS_UPDATE_FAILURE, 
            errorMsg:error
        }
    }
}

/**
* @DateOfCreation        21 june 2018
* @ShortDescription      This function is responsible for Delete the visit Symptom entry 
                         Alphnumeric visit_symptom_id   
* @return                JSON Object
*/
function symptomsDelete(visit_symptom_id) {
    return dispatch => {
        dispatch(request());
        patientSymptomsService.doDeletePatientSymptom(visit_symptom_id)
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
    function request() { return { type: patientSymptomsConstants.SYMPTOMS_DELETE_REQUEST } }
    function success(result) { return { type: patientSymptomsConstants.SYMPTOMS_DELETE_SUCCESS, result } }
    function failure(error) { return { type: patientSymptomsConstants.SYMPTOMS_DELETE_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


/**
* @DateOfCreation        20 June 2018
* @ShortDescription      This function is responsible for reset reducer state
* @param                 JSON doctor, This contains full user input data 
* @return                JSON Object
*/
function resetState(){
    return dispatch => {
            dispatch(request());
    };
    function request(){ return {type:patientSymptomsConstants.SYMPTOMS_REST_ADD}}
}

/**
* @DateOfCreation        14 june 2018
* @ShortDescription      This function is responsible for fetch Symptoms Option list
* @return                JSON Object
*/
function getSymptomsOptionlistBySearch(extraData) {
    return dispatch => {
         dispatch(request());
        patientSymptomsService.getSymptomsOptionlistBySearch(extraData)
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
    function request() { return { type: patientSymptomsConstants.SYMPTOMS_OPTION_REQUEST } }
    function success(patientSymptomsOptionData) { return { type: patientSymptomsConstants.SYMPTOMS_OPTION_SUCCESS, patientSymptomsOptionData} }
    function failure(error) { return { type: patientSymptomsConstants.SYMPTOMS_OPTION_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}