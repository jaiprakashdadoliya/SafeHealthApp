import { configConstants } from '../../../_constants';
import { appointmentConstants } from './appointmentConstants';
import { appointmentService } from './appointmentService';
import { utilityHelper, history } from '../../../_helpers';
import { Cookies } from 'react-cookie';

/**
 * appointmentAction
 *
 * @package                SafeHealth
 * @subpackage             appointmentAction
 * @category               Actions
 * @DateOfCreation         12 July 2018
 * @ShortDescription       This is responsible to handle all action related to appointment
 */
export const appointmentActions = {
    appointmentStore,
    getAppointmentReasons,
    updateState,
};

/**
* @DateOfCreation        12 July 2018
* @ShortDescription      This function is responsible for submit insert form 
* @param                 JSON appointment, This contains full appointment input data 
* @return                JSON Object
*/
function appointmentStore(appointment) {
    return dispatch => {
        dispatch(request({ appointment }));
        appointmentService.doAppointmentCreate(appointment)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        var result = {
                            'message'           :   data.message,
                            'appointmentInsertData'  :   data.result
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
                dispatch(failure(response));
            });
    };

// Actions defination that will perform according dispatch call and send data to reducer
    function request() { return { type: appointmentConstants.APT_ADD_REQUEST } }
    function success(result) { return { type: appointmentConstants.APT_ADD_SUCCESS, result } }
    function failure(error) { return { type: appointmentConstants.APT_ADD_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        12 Aug 2018
* @ShortDescription      This function is responsible for fatch appointment 
* @param                 JSON appointment, This contains fatch appointment reason
* @return                JSON Object
*/
function getAppointmentReasons($doctorId='') {
    return dispatch => {
        dispatch(request());
        appointmentService.getAppointmentReasons($doctorId)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        var result = {
                            'message'           :   data.message,
                            'appointmentReason'  :   data.result
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
                dispatch(failure(response));
            });
    };

// Actions defination that will perform according dispatch call and send data to reducer
    function request() { return { type: appointmentConstants.APT_REASON_REQUEST } }
    function success(result) { return { type: appointmentConstants.APT_REASON_SUCCESS, result } }
    function failure(error) { return { type: appointmentConstants.APT_REASON_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}



/**
* @DateOfCreation        12 July 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function updateState(){
     return dispatch => {
        dispatch(request());
    }
    function request() { return { type: appointmentConstants.APT_UPDATE_STATE } }
}

