import {configConstants } from '../../../../../_constants';
import {patientLaboratoryReportConstants } from './patientLaboratoryReportConstants';
import {patientLaboratoryReportService } from './patientLaboratoryReportService';
import { utilityHelper } from '../../../../../_helpers';

/**
 * patientSymptomsActions
 *
 * @package                ILD INDIA REGISTRY
 * @subpackage             patientSymptomsActions
 * @category               Actions
 * @DateOfCreation         14 june 2018
 * @ShortDescription       This is responsible for all patientSymptoms actions
 */ 
export const patientLaboratoryReportActions = {
    getTablelist,
    submitRequest,
    getDeleteRequest,
    getDownloadRequest,
    resetState,
    getLabtemplates,
    showLabReport,
    };


/**
* @DateOfCreation        14 june 2018
* @ShortDescription      This function is responsible for fetch Symptoms Option list
* @return                JSON Object
*/
function getTablelist(patId, visitId, page, pageSize, sorted, filtered) {
    return dispatch => {
         dispatch(request(patId, visitId, page, pageSize, sorted, filtered));
        patientLaboratoryReportService.getTablelist(patId, visitId, page, pageSize, sorted, filtered)
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
    function request(patId, visitId) { return { type: patientLaboratoryReportConstants.PATIENT_LABORATORY_REPORT_GRID_REQUEST,patId, visitId } }
    function success(patientSymptomsData) { return { type: patientLaboratoryReportConstants.PATIENT_LABORATORY_REPORT_GRID_SUCCESS, result:patientSymptomsData} }
    function failure(error) { return { type: patientLaboratoryReportConstants.PATIENT_LABORATORY_REPORT_GRID_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}



/**
* @DateOfCreation        21 june 2018
* @ShortDescription      This function is responsible for Delete the visit Symptom entry 
                         Alphnumeric patientDetails   
* @return                JSON Object
*/
function getLabtemplates() {
    return dispatch => {
        dispatch(request());
        patientLaboratoryReportService.getLabTemplates()
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        var result = {
                            'message'  :   data.message,
                            'result'   :   data.result
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
    function request() { return { type: patientLaboratoryReportConstants.LABORATORY_TEMP_REQUEST } }
    function success(result) { return { type: patientLaboratoryReportConstants.LABORATORY_TEMP_SUCCESS, result } }
    function failure(error) { return { type: patientLaboratoryReportConstants.LABORATORY_TEMP_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        15 June 2018
* @ShortDescription      This function is responsible for final insert Symptom information sent
* @param                 JSON doctor, This contains full user input data 
* @return                JSON Object
*/
function submitRequest(patientDetails) {
    return dispatch => {
        dispatch(request({ patientDetails }));
        patientLaboratoryReportService.doSubmitRequest(patientDetails)
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

    function request(patientDetails) { return { type: patientLaboratoryReportConstants.PATIENT_LABORATORY_REPORT_ADD_REQUEST, patientDetails } }
    function success(result) { return { type: patientLaboratoryReportConstants.PATIENT_LABORATORY_REPORT_ADD_SUCCESS, result} }
    function failure(error) { 
        return { 
            type: patientLaboratoryReportConstants.PATIENT_LABORATORY_REPORT_ADD_FAILURE, 
            errorMsg:error
        }
    }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        21 june 2018
* @ShortDescription      This function is responsible for Delete the visit Symptom entry 
                         Alphnumeric patientDetails   
* @return                JSON Object
*/
function getDeleteRequest(patientDetails) {
    return dispatch => {
        dispatch(request());
        patientLaboratoryReportService.doDeleteRequest(patientDetails)
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
    function request() { return { type: patientLaboratoryReportConstants.PATIENT_LABORATORY_REPORT_DELETE_REQUEST } }
    function success(result) { return { type: patientLaboratoryReportConstants.PATIENT_LABORATORY_REPORT_DELETE_SUCCESS, result } }
    function failure(error) { return { type: patientLaboratoryReportConstants.PATIENT_LABORATORY_REPORT_DELETE_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

function getDownloadRequest(patientDetails) {
    return dispatch => {
        dispatch(request());
        patientLaboratoryReportService.doDownloadRequest(patientDetails)
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
    function request() { return { type: patientLaboratoryReportConstants.PATIENT_LABORATORY_REPORT_DOWNLOAD_REQUEST } }
    function success(result) { return { type: patientLaboratoryReportConstants.PATIENT_LABORATORY_REPORT_DOWNLOAD_SUCCESS, result } }
    function failure(error) { return { type: patientLaboratoryReportConstants.PATIENT_LABORATORY_REPORT_DOWNLOAD_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        14 june 2018
* @ShortDescription      This function is responsible for fetch Symptoms Option list
* @return                JSON Object
*/
function showLabReport(patId, visitId) {
    return dispatch => {
         dispatch(request(patId, visitId));
        patientLaboratoryReportService.showLabReport(patId, visitId)
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
    function request(patId, visitId) { return { type: patientLaboratoryReportConstants.SHOW_LAB_REPORT_REQUEST,patId, visitId } }
    function success(showReportData) { return { type: patientLaboratoryReportConstants.SHOW_LAB_REPORT_SUCCESS, result:showReportData} }
    function failure(error) { return { type: patientLaboratoryReportConstants.SHOW_LAB_REPORT_FAILURE, errorMsg:error } }
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
    function request(){ return {type:patientLaboratoryReportConstants.PATIENT_LABORATORY_REPORT_RESET}}
}