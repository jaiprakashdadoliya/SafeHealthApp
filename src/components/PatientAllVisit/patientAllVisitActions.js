import { configConstants } from '../../_constants';
import { utilityHelper } from '../../_helpers';
import { patientAllVisitService } from './patientAllVisitService';
import { patientAllVisitConstants } from './patientAllVisitConstants';

/**
 * patientAllVisitActions
 *
 * @package                ILD India Registry
 * @subpackage             patientAllVisitActions
 * @category               Actions
 * @DateOfCreation         2 July 2018
 * @ShortDescription       This is responsible for all patient Domestic Factor actions
 */ 
export const patientAllVisitActions = {
    newVisitCreate,
    resetState,
    patientVisitList
};



/**
* @DateOfCreation        15 June 2018
* @ShortDescription      This function is responsible for final domestic information sent
* @param                 JSON doctor, This contains full user input data 
* @return                JSON Object
*/
function newVisitCreate(patientDetails) {
    return dispatch => {
        dispatch(request({ patientDetails }));
        patientAllVisitService.doNewVisitCreate(patientDetails)
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

    function request(patientDetails) { return { type: patientAllVisitConstants.NEW_PATIENT_FOLLOW_UP_REQUEST, patientDetails } }
    function success(data) { return { type: patientAllVisitConstants.NEW_PATIENT_FOLLOW_UP_SUCCESS, data } }
    function failure(error) { 
        return { 
            type: patientAllVisitConstants.NEW_PATIENT_FOLLOW_UP_FAILURE, 
            errorMsg:error
        }
    }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        11 July 2018
* @ShortDescription      This function is responsible for get all static data array list
* @return                JSON Object
*/
function patientVisitList(patId, page, pageSize, sorted, filtered, bookingId) {
    return dispatch => {
        dispatch(request());
        patientAllVisitService.getPatientVisitListRequest(patId, page, pageSize, sorted, filtered, bookingId)
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
    function request() { return { type: patientAllVisitConstants.PATIENT_VISIT_LIST_DATA_REQUEST } }
    function success(visitList) { return { type: patientAllVisitConstants.PATIENT_VISIT_LIST_DATA_SUCCESS, visitList} }
    function failure(error) { return { type: patientAllVisitConstants.PATIENT_VISIT_LIST_DATA_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        28 May 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function resetState(){
    return dispatch => { dispatch(request());}
    function request() { return { type: patientAllVisitConstants.PATIENT_FOLLOW_UP_RESET_STATE } }
}
