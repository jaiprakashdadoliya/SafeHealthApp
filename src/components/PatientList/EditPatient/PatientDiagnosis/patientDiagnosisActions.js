import {configConstants } from '../../../../_constants';
import {patientDiagnosisConstants } from './patientDiagnosisConstants';
import {patientDiagnosisService } from './patientDiagnosisService';
import { utilityHelper } from '../../../../_helpers';

/**
 * patientDiagnosisActions
 *
 * @package                ILD INDIA REGISTRY
 * @subpackage             patientDiagnosisActions
 * @category               Actions
 * @DateOfCreation         14 june 2018
 * @ShortDescription       This is responsible for all patientDiagnosis actions
 */ 
export const patientDiagnosisActions = {
    getDiagnosisOptionListAction,
    getDiagnosisListAction,
    patientDiagnosisSubmitAction,
    diagnosisDelete,
    resetState,
    getDiagnosisFormAction,
    patientDiagnosisFactorSubmitAction
};

/**
* @DateOfCreation        14 june 2018
* @ShortDescription      This function is responsible for fetch Diagnosis Option list
* @return                JSON Object
*/
function getDiagnosisOptionListAction() {
    return dispatch => {
        dispatch(request());
        patientDiagnosisService.getDiagnosisOptionListRequest()
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
    function request() { return { type: patientDiagnosisConstants.DIAGNOSIS_OPTION_REQUEST } }
    function success(patientDiagnosisOptionData) { return { type: patientDiagnosisConstants.DIAGNOSIS_OPTION_SUCCESS, patientDiagnosisOptionData} }
    function failure(error) { return { type: patientDiagnosisConstants.DIAGNOSIS_OPTION_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        14 june 2018
* @ShortDescription      This function is responsible for fetch Diagnosis Option list
* @return                JSON Object
*/
function getDiagnosisListAction(patId, visitId, page, pageSize, sorted, filtered) {
    return dispatch => {
        dispatch(request());
        patientDiagnosisService.getDiagnosisListRequest(patId, visitId, page, pageSize, sorted, filtered)
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
    function request() { return { type: patientDiagnosisConstants.DIAGNOSIS_GRID_REQUEST } }
    function success(patientDiagnosisData) { return { type: patientDiagnosisConstants.DIAGNOSIS_GRID_SUCCESS, result:patientDiagnosisData} }
    function failure(error) { return { type: patientDiagnosisConstants.DIAGNOSIS_GRID_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        15 June 2018
* @ShortDescription      This function is responsible for final insert Symptom information sent
* @param                 JSON doctor, This contains full user input data 
* @return                JSON Object
*/
function patientDiagnosisSubmitAction(diagnosisFormData) {
    return dispatch => {
        dispatch(request());
        patientDiagnosisService.doAddUpdatePatientDiagnosisRequest(diagnosisFormData)
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

    function request() { return { type: patientDiagnosisConstants.DIAGNOSIS_ADD_REQUEST } }
    function success(result) { return { type: patientDiagnosisConstants.DIAGNOSIS_ADD_SUCCESS, result} }
    function failure(error) { 
        return { 
            type: patientDiagnosisConstants.DIAGNOSIS_ADD_FAILURE, 
            errorMsg:error
        }
    }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        21 june 2018
* @ShortDescription      This function is responsible for Delete the visit Symptom entry 
                         Alphnumeric visit_symptom_id   
* @return                JSON Object
*/
function diagnosisDelete(visit_diagnosis_id) {
    return dispatch => {
        dispatch(request());
        patientDiagnosisService.doDeletePatientDiagnosis(visit_diagnosis_id)
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
    function request() { return { type: patientDiagnosisConstants.DIAGNOSIS_DELETE_REQUEST } }
    function success(result) { return { type: patientDiagnosisConstants.DIAGNOSIS_DELETE_SUCCESS, result } }
    function failure(error) { return { type: patientDiagnosisConstants.DIAGNOSIS_DELETE_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


/**
* @DateOfCreation        8 Aug 2018
* @ShortDescription      This function is responsible for reset reducer state
* @param                 JSON doctor, This contains full user input data 
* @return                JSON Object
*/
function resetState(){
    return dispatch => {
            dispatch(request());
    };
    function request(){ return {type:patientDiagnosisConstants.DIAGNOSIS_REST_ADD}}
}

/**
* @DateOfCreation        8 Aug 2018
* @ShortDescription      This function is responsible for submit the update form
* @param                 JSON diagnosis, This contains single diagnosis input data
                         JSON diagnosisData, This contain list of diagnosis 
* @return                JSON Object
*/
function getDiagnosisFormAction(patientDetails) {
    return dispatch => {
        dispatch(request());
        patientDiagnosisService.getDiagnosisFormRequest(patientDetails)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){                      
                        // Result with Message and data to transfer on Reducer
                        dispatch(success(data));                       
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg    = utilityHelper.getFirstErrorMessage(data.error);
                        dispatch(failure(errorMsg));
                    }else if(data.code  == configConstants.EXCEPTION_CODE){
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
                dispatch(failure(response));
            });
    };

    // Actions definition that will perform according dispatch call and send data to reducer
    function request() { return { type: patientDiagnosisConstants.DIAGNOSIS_FORM_DATA_REQUEST } }
    function failure(error) { return { type: patientDiagnosisConstants.DIAGNOSIS_FORM_DATA_FAILURE, error } }
    function success(patientDetails) { return { type: patientDiagnosisConstants.DIAGNOSIS_FORM_DATA_SUCCESS, patientDetails } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        15 June 2018
* @ShortDescription      This function is responsible for final insert Symptom information sent
* @param                 JSON doctor, This contains full user input data 
* @return                JSON Object
*/
function patientDiagnosisFactorSubmitAction(diagnosisFormData) {
    return dispatch => {
        dispatch(request());
        patientDiagnosisService.patientDiagnosisFactorSubmitRequest(diagnosisFormData)
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

    function request() { return { type: patientDiagnosisConstants.DIAGNOSIS_FACTOR_ADD_REQUEST } }
    function success(result) { return { type: patientDiagnosisConstants.DIAGNOSIS_FACTOR_ADD_SUCCESS, result} }
    function failure(error) { return { type: patientDiagnosisConstants.DIAGNOSIS_FACTOR_ADD_FAILURE, errorMsg:error} }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}