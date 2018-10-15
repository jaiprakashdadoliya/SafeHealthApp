import { utilityHelper } from '../../_helpers';
import { configConstants } from '../../_constants';
import { calendarConstants } from './calendarConstants';
import { calendarService } from './calendarService';
/**
 * calendarActions
 *
 * @package                SafeHealth
 * @subpackage             calendarActions
 * @category               Actions
 * @DateOfCreation         22 JULY 2018
 * @ShortDescription       This is responsible for all service actions
 */ 
export const calendarActions = {
    calendarDataList,
    resetState,
    getDeleteRequest
};


/**
* @DateOfCreation        22 JULY 2018
* @ShortDescription      This function is responsible for appointment
* @return                JSON Object in succsss message
*/
function calendarDataList(detials){ 
     return dispatch => {
         dispatch(request());
        calendarService.calendarDataList(detials)
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
                dispatch(failure(response));
            });
    };
    function request() { return { type: calendarConstants.CALENDAR_REQUEST } }
    function success(data) { return { type: calendarConstants.CALENDAR_SUCCESS, data} }
    function failure(error) { return { type: calendarConstants.CALENDAR_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        28 JULY 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function resetState(){
    return dispatch => { dispatch(request());}
    function request() { return { type: calendarConstants.CALENDAR_RESET_STATE } }
}

/**
* @DateOfCreation        21 june 2018
* @ShortDescription      This function is responsible for Delete the visit Symptom entry 
                         Alphnumeric autoIncId   
* @return                JSON Object
*/
function getDeleteRequest(detials) {
    return dispatch => {
        dispatch(request());
        calendarService.doDeleteRequest(detials)
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
    function request() { return { type: calendarConstants.CALENDAR_APPOINTMENT_DELETE_REQUEST } }
    function success(result) { return { type: calendarConstants.CALENDAR_APPOINTMENT_DELETE_SUCCESS, result } }
    function failure(error) { return { type: calendarConstants.CALENDAR_APPOINTMENT_DELETE_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


