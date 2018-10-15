import { configConstants } from '../../../_constants';
import { utilityHelper } from '../../../_helpers';
import { vitalsSaveFromInitialVisitService } from './vitalsSaveFromInitialVisitService';
import { vitalsSaveFromInitialVisitConstants } from './vitalsSaveFromInitialVisitConstants';

/**
 * vitalsSaveFromInitialVisitActions
 *
 * @package                ILD India Registry
 * @subpackage             vitalsSaveFromInitialVisitActions
 * @category               Actions
 * @DateOfCreation         26 July 2018
 * @ShortDescription       This is responsible for all patient Vitals actions
 */ 
export const VitalsSaveFromInitialVisitActions = {
    getListRecords,
    submitRequest,
    resetState
};

/**
* @DateOfCreation        26 July 2018
* @ShortDescription      This function is responsible for submit the update form
* @param                 JSON experience, This contains single experience input data
                         JSON experienceData, This contain list of experience 
* @return                JSON Object
*/
function getListRecords(patientDetails) { 
    return dispatch => {
        dispatch(request());
        vitalsSaveFromInitialVisitService.getListRecord(patientDetails)
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
    function request() { return { type: vitalsSaveFromInitialVisitConstants.PATIENT_VITALS_DATA_REQUEST } }
    function failure(error) { return { type: vitalsSaveFromInitialVisitConstants.PATIENT_VITALS_DATA_FAILURE, error } }
    function success(patientDetails) { return { type: vitalsSaveFromInitialVisitConstants.PATIENT_VITALS_DATA_SUCCESS, patientDetails } }
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
        vitalsSaveFromInitialVisitService.doSubmitRequest(patientDetails)
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

    function request(patientDetails) { return { type: vitalsSaveFromInitialVisitConstants.PATIENT_VITALS_ADD_REQUEST, patientDetails } }
    function success(result) { return { type: vitalsSaveFromInitialVisitConstants.PATIENT_VITALS_ADD_SUCCESS, result} }
    function failure(error) { 
        return { 
            type: vitalsSaveFromInitialVisitConstants.PATIENT_VITALS_ADD_FAILURE, 
            errorMsg:error
        }
    }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        28 May 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function resetState(){
    return dispatch => { dispatch(request());}
    function request() { return { type: vitalsSaveFromInitialVisitConstants.PATIENT_VITALS_RESET_STATE } }
}