import {configConstants } from '../../../../_constants';
import {patientVaccinationHistoryConstants } from './patientVaccinationHistoryConstants';
import {patientVaccinationHistoryService } from './patientVaccinationHistoryService';
import { utilityHelper } from '../../../../_helpers';

/**
 * patientVaccinationHistoryActions
 *
 * @package                Safe Health
 * @subpackage             patientVaccinationHistoryActions
 * @category               Actions
 * @DateOfCreation         21 Sept 2018
 * @ShortDescription       This is responsible for all patient Vaccination History actions
 */ 
export const patientVaccinationHistoryActions = {
    getVaccinationHistoryList,
    vaccinationHistorySubmit,
    deleteVaccinationHistory,
    resetState,
};


/**
* @DateOfCreation        21 Sept 2018
* @ShortDescription      This function is responsible for fetch Vaccination History Records
* @return                JSON Object
*/
function getVaccinationHistoryList(patId, visitId, page, pageSize, sorted, filtered) {
    return dispatch => {
         dispatch(request(patId, visitId, page, pageSize, sorted, filtered));
        patientVaccinationHistoryService.doGetVaccinationHistoryList(patId, visitId, page, pageSize, sorted, filtered)
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
    function request(patId, visitId) { return { type: patientVaccinationHistoryConstants.PATIENT_VACCINATION_HISTORY_GRID_REQUEST,patId, visitId } }
    function success(patientSymptomsData) { return { type: patientVaccinationHistoryConstants.PATIENT_VACCINATION_HISTORY_GRID_SUCCESS, result:patientSymptomsData} }
    function failure(error) { return { type: patientVaccinationHistoryConstants.PATIENT_VACCINATION_HISTORY_GRID_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        21 Sept 2018
* @ShortDescription      This function is responsible for insert Vaccination History data
* @param                 JSON doctor, This contains full user input data 
* @return                JSON Object
*/
function vaccinationHistorySubmit(patientDetails) {
    return dispatch => {
        dispatch(request({ patientDetails }));
        patientVaccinationHistoryService.doSubmitRequest(patientDetails)
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

    function request(patientDetails) { return { type: patientVaccinationHistoryConstants.PATIENT_VACCINATION_HISTORY_ADD_REQUEST, patientDetails } }
    function success(result) { return { type: patientVaccinationHistoryConstants.PATIENT_VACCINATION_HISTORY_ADD_SUCCESS, result} }
    function failure(error) { 
        return { 
            type: patientVaccinationHistoryConstants.PATIENT_VACCINATION_HISTORY_ADD_FAILURE, 
            errorMsg:error
        }
    }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        21 Sept 2018
* @ShortDescription      This function is responsible for Delete the Vaccination History entry
* @return                JSON Object
*/
function deleteVaccinationHistory(patientDetails) {
    return dispatch => {
        dispatch(request());
        patientVaccinationHistoryService.doDeleteRequest(patientDetails)
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
    // Actions definition that will perform according dispatch call and send data to reducer
    function request() { return { type: patientVaccinationHistoryConstants.PATIENT_VACCINATION_HISTORY_DELETE_REQUEST } }
    function success(result) { return { type: patientVaccinationHistoryConstants.PATIENT_VACCINATION_HISTORY_DELETE_SUCCESS, result } }
    function failure(error) { return { type: patientVaccinationHistoryConstants.PATIENT_VACCINATION_HISTORY_DELETE_FAILURE, errorMsg:error } }
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
    function request(){ return {type:patientVaccinationHistoryConstants.PATIENT_VACCINATION_HISTORY_RESET}}
}