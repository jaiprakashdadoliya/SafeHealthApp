import { configConstants, generalCheckupConstants } from '../_constants';
import { generalCheckupService } from '../_services';
import { utilityHelper } from '../_helpers';

/**
 * patientGeneralCheckupAction
 *
 * @package                ILD India Registry
 * @subpackage             patientGeneralCheckupAction
 * @category               Actions
 * @DateOfCreation         25 May 2018
 * @ShortDescription       This is responsible for all degree actions
 */ 
export const patientGeneralCheckupAction = {
    generalCheckupInsertUpdate,
    getPatientGeneralCheckupRecord,
    resetState
};

/**
* @DateOfCreation        19 June 2018
* @ShortDescription      This function is responsible for submit the update form
* @param                 JSON experience, This contains single experience input data
                         JSON experienceData, This contain list of experience 
* @return                JSON Object
*/
function generalCheckupInsertUpdate(checkupData) {
    return dispatch => {
        dispatch(request());
        generalCheckupService.doGeneralCheckupInsertUpdate(checkupData)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){ 
                     
                        // Result with Message and data to transfer on Reducer
                        var result = {
                            'message'               : data.message,
                            'checkupData'           : checkupData
                        };
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
    function request() { return { type: generalCheckupConstants.GENERAL_CHECKUP_ADD_UPDATE_REQUEST } }
    function success(generalCheckupPatientRecord) { return { type: generalCheckupConstants.GENERAL_CHECKUP_ADD_UPDATE_SUCCESS, generalCheckupPatientRecord } }
    function failure(error) { return { type: generalCheckupConstants.GENERAL_CHECKUP_ADD_UPDATE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        25 June 2018
* @ShortDescription      This function is responsible for submit the update form
* @param                 JSON experience, This contains single experience input data
                         JSON experienceData, This contain list of experience 
* @return                JSON Object
*/
function getPatientGeneralCheckupRecord(visitId, patientId) {
    return dispatch => {
        dispatch(request());
        generalCheckupService.getPatientGeneralCheckupRecordService(visitId, patientId)
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
    function request() { return { type: generalCheckupConstants.GENERAL_CHECKUP_DATA_REQUEST } }
    function success(patientGeneralCheckupData) { return { type: generalCheckupConstants.GENERAL_CHECKUP_DATA_SUCCESS, patientGeneralCheckupData } }
    function failure(error) { return { type: generalCheckupConstants.GENERAL_CHECKUP_DATA_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


/**
* @DateOfCreation        28 May 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function resetState(){
    return dispatch => { dispatch(request());}
    function request() { return { type: generalCheckupConstants.GENERAL_CHECKUP_RESET_STATE } }
}
