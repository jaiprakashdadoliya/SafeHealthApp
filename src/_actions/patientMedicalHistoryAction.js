import { configConstants, medicalHistoryConstants } from '../_constants';
import { medicalHistoryService } from '../_services';
import { utilityHelper } from '../_helpers';

/**
 * patientMedicalHistoryAction
 *
 * @package                ILD India Registry
 * @subpackage             patientMedicalHistoryAction
 * @category               Actions
 * @DateOfCreation         25 May 2018
 * @ShortDescription       This is responsible for all degree actions
 */ 
export const patientMedicalHistoryAction = {
    getPatientMedicalHistoryRecords,
    medicalHistoryInsertUpdate,
    resetState
};

/**
* @DateOfCreation        27 June 2018
* @ShortDescription      This function is responsible for submit form
* @param                 @form data
* @return                JSON Object
*/
function medicalHistoryInsertUpdate(medicalHistoryData) {
    return dispatch => {
        dispatch(request());
        medicalHistoryService.doMedicalHistoryInsertUpdate(medicalHistoryData)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){ 
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
    function request() { return { type: medicalHistoryConstants.MEDICAL_HISTORY_ADD_UPDATE_REQUEST } }
    function success(medicalHistoryUpdatedData) { return { type: medicalHistoryConstants.MEDICAL_HISTORY_ADD_UPDATE_SUCCESS, medicalHistoryUpdatedData } }
    function failure(error) { return { type: medicalHistoryConstants.MEDICAL_HISTORY_ADD_UPDATE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        24 June 2018
* @ShortDescription      This function is responsible for get medical history records
* @param                 @patientId, @visitId
* @return                JSON Object
*/
function getPatientMedicalHistoryRecords(visitId, patientId) {
    return dispatch => {
        dispatch(request());
        medicalHistoryService.getPatientMedicalHistoryService(visitId, patientId)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){                      
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
    function request() { return { type: medicalHistoryConstants.MEDICAL_HISTORY_DATA_REQUEST } }
    function success(patientMedicalHistoryData) { return { type: medicalHistoryConstants.MEDICAL_HISTORY_DATA_SUCCESS, patientMedicalHistoryData } }
    function failure(error) { return { type: medicalHistoryConstants.MEDICAL_HISTORY_DATA_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


/**
* @DateOfCreation        27 June 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function resetState(){
    return dispatch => { dispatch(request());}
    function request() { return { type: medicalHistoryConstants.MEDICAL_HISTORY_RESET_STATE } }
}
