import { configConstants } from '../../_constants';
import { patientHistoryConstants } from './patientHistoryConstants';
import { patientHistoryService } from './patientHistoryService';
import { utilityHelper } from '../../_helpers';

/**
 * patientHistoryActions
 *
 * @package                ILD INDIA REGISTRY
 * @subpackage             patientHistoryActions
 * @category               Actions
 * @DateOfCreation         3 Sept 2018
 * @ShortDescription       This is responsible for all Patient History Actions
 */ 
export const patientHistoryActions = {
    getPatientActivityHistory,
    resetState
};

/**
* @DateOfCreation        3 Sept 2018
* @ShortDescription      This function is responsible for get patient activity history
* @return                JSON Object
*/
function getPatientActivityHistory(postData) {
    return dispatch => {
        dispatch(request());
        patientHistoryService.getPatientActivityHistoryRequest(postData)
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
    function request() { return { type: patientHistoryConstants.PATIENT_ACTIVITY_DATA_REQUEST } }
    function success(result) { return { type: patientHistoryConstants.PATIENT_ACTIVITY_DATA_SUCCESS, result} }
    function failure(error) { return { type: patientHistoryConstants.PATIENT_ACTIVITY_DATA_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        3 Sept 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function resetState(){
    return dispatch => { dispatch(request());}
    function request() { return { type: patientHistoryConstants.PATIENT_ACTIVITY_RESET_STATE} 
    }
}