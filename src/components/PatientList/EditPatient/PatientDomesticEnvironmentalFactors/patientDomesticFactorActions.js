import { configConstants } from '../../../../_constants';
import { utilityHelper } from '../../../../_helpers';
import { domesticFactorService } from './domesticFactorService';
import { domesticFactorConstants } from './domesticFactorConstants';

/**
 * patientDomesticFactorActions
 *
 * @package                ILD India Registry
 * @subpackage             patientDomesticFactorActions
 * @category               Actions
 * @DateOfCreation         2 July 2018
 * @ShortDescription       This is responsible for all patient Domestic Factor actions
 */ 
export const patientDomesticFactorActions = {
    getPatientDomesticFactorRecord,
    newDomesticFactorSubmit,
    resetState
};

/**
* @DateOfCreation        25 June 2018
* @ShortDescription      This function is responsible for submit the update form
* @param                 JSON experience, This contains single experience input data
                         JSON experienceData, This contain list of experience 
* @return                JSON Object
*/
function getPatientDomesticFactorRecord(visitId, patientId) {
    return dispatch => {
        dispatch(request());
        domesticFactorService.getPatientDomesticFactorRecordService(visitId, patientId)
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
    function request() { return { type: domesticFactorConstants.PATIENT_DOMESTIC_FACTOR_DATA_REQUEST } }
    function success(patientDomesticFactorData) { return { type: domesticFactorConstants.PATIENT_DOMESTIC_FACTOR_DATA_SUCCESS, patientDomesticFactorData } }
    function failure(error) { return { type: domesticFactorConstants.PATIENT_DOMESTIC_FACTOR_DATA_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        15 June 2018
* @ShortDescription      This function is responsible for final domestic information sent
* @param                 JSON doctor, This contains full user input data 
* @return                JSON Object
*/
function newDomesticFactorSubmit(DomesticFactorData) {
    return dispatch => {
        dispatch(request({ DomesticFactorData }));
        domesticFactorService.doNewDomesticFactor(DomesticFactorData)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        dispatch(success(data));                        
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg = utilityHelper.getFirstErrorMessage(data.error);                        
                        dispatch(failure(errorMsg));
                    }else if(data.code == configConstants.EXCEPTION_CODE){
                        dispatch(failure(data.message));
                    }else if(data.code == configConstants.UNAUTHENTICATE_CODE){
                        var errorMsg = data.message;
                        dispatch(unauthorize(errorMsg));
                    }
                    else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };

    function request(doctor) { return { type: domesticFactorConstants.NEW_DOMESTIC_FACTOR_DATA_REQUEST, DomesticFactorData } }
    function success(data) { return { type: domesticFactorConstants.NEW_DOMESTIC_FACTOR_DATA_SUCCESS, data } }
    function failure(error) { 
        return { 
            type: domesticFactorConstants.NEW_DOMESTIC_FACTOR_DATA_FAILURE, 
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
    function request() { return { type: domesticFactorConstants.PATIENT_DOMESTIC_FACTOR_RESET_STATE } }
}
