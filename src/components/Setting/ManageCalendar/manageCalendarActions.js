import { configConstants } from '../../../_constants';
import { utilityHelper } from '../../../_helpers';
import { manageCalendarService } from './manageCalendarService';
import { manageCalendarConstants } from './manageCalendarConstants';

/**
 * manageCalendarActions
 *
 * @package                ILD India Registry
 * @subpackage             manageCalendarActions
 * @category               Actions
 * @DateOfCreation         2 July 2018
 * @ShortDescription       This is responsible for all patient Domestic Factor actions
 */ 
export const manageCalendarActions = {
    getRecord,
    newSubmit,
    resetState
};

/**
* @DateOfCreation        25 June 2018
* @ShortDescription      This function is responsible for submit the update form
* @param                 JSON experience, This contains single experience input data
                         JSON experienceData, This contain list of experience 
* @return                JSON Object
*/
function getRecord(details) {
    return dispatch => {
        dispatch(request());
        manageCalendarService.getRecord(details)
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
    function request() { return { type: manageCalendarConstants.MANAGE_CALENDAR_REQUEST } }
    function success(data) { return { type: manageCalendarConstants.MANAGE_CALENDAR_SUCCESS, data } }
    function failure(error) { return { type: manageCalendarConstants.MANAGE_CALENDAR_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        15 June 2018
* @ShortDescription      This function is responsible for final domestic information sent
* @param                 JSON doctor, This contains full user input data 
* @return                JSON Object
*/
function newSubmit(detils) {
    return dispatch => {
        dispatch(request({ detils }));
        manageCalendarService.doNewSubmit(detils)
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

    function request(data) { return { type: manageCalendarConstants.MANAGE_CALENDAR_NEW_REQUEST, data } }
    function success(data) { return { type: manageCalendarConstants.MANAGE_CALENDAR_NEW_SUCCESS, data } }
    function failure(error) { 
        return { 
            type: manageCalendarConstants.MANAGE_CALENDAR_NEW_FAILURE, 
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
    function request() { return { type: manageCalendarConstants.MANAGE_CALENDAR_RESET_STATE } }
}
