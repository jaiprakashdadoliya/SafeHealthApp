import { doctorTimingConstants, configConstants } from '../_constants';
import { doctorTimingService } from '../_services';
import { utilityHelper, history } from '../_helpers';
import { Cookies } from 'react-cookie';

/**
 * doctorTimingAction
 *
 * @package                SafeHealth
 * @subpackage             doctorTimingAction
 * @category               Actions
 * @DateOfCreation         20 June 2018
 * @ShortDescription       This is responsible to handle all action related to doctor Timing
 */
export const doctorTimingAction = {
    getTimingList,
    timingSave,
    timingStore,
    updateState,
    getClinicList

};

/**
* @DateOfCreation        20 June 2018
* @ShortDescription      This function is responsible for Get timing List
* @param                 JSON user, This contains full timing input data 
* @return                JSON Object
*/
function getTimingList() {
    return dispatch => {
        dispatch(request());
        doctorTimingService.getTimingList()
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        dispatch(success(data.result));
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg = utilityHelper.getFirstErrorMessage(data.error);
                        dispatch(failure(errorMsg));
                    }else if(data.code == configConstants.EXCEPTION_CODE){
                        errorMsg = data.message;
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
    function request() { return { type: doctorTimingConstants.DR_TM_FETCH_REQUEST } }
    function success(result) { return { type: doctorTimingConstants.DR_TM_FETCH_SUCCESS, result } }
    function failure(error) { return { type: doctorTimingConstants.DR_TM_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        20 June 2018
* @ShortDescription      This function is responsible for submit the update form
* @param                 JSON timing, This contains single timing input data
                         JSON timingData, This contain list of timing 
* @return                JSON Object
*/
function timingSave(timing, timingData) {
    return dispatch => {
        dispatch(request());
        doctorTimingService.doTimingUpdate(timing)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){ 
                        const position = utilityHelper.getMultiDimensionArrayIndex(timingData, 'timing_id', timing.timing_id);
                        timingData[(position[0])][position[1]] = data.result;
                        var result = {
                            'message'           :   data.message,
                            'timingUpdateData'  :   timing,
                            'timingData'        :   timingData
                        };
                        dispatch(success(result));
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

// Actions defination that will perform according dispatch call and send data to reducer
    function request() { return { type: doctorTimingConstants.DR_TM_UPDATE_REQUEST } }
    function success(result) { return { type: doctorTimingConstants.DR_TM_UPDATE_SUCCESS, result } }
    function failure(error) { return { type: doctorTimingConstants.DR_TM_UPDATE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        20 June 2018
* @ShortDescription      This function is responsible for submit insert form 
* @param                 JSON timing, This contains full timing input data 
* @return                JSON Object
*/
function timingStore(timing, timingData) {
    return dispatch => {
        dispatch(request({ timing }));
        doctorTimingService.doTimingCreate(timing)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        if(timing.week_day == '0'){
                            for(var day=1; day<=7; day++){
                                var weekday = day.toString();
                                timingData[weekday].push(data.result[weekday-1]);
                            }
                        }else{
                            timingData[timing.week_day].push(data.result);
                        }
                        var result = {
                            'message'           :   data.message,
                            'timingInsertData'  :   data.result,
                            'timingData'        :   timingData
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
    function request() { return { type: doctorTimingConstants.DR_TM_ADD_REQUEST } }
    function success(result) { return { type: doctorTimingConstants.DR_TM_ADD_SUCCESS, result } }
    function failure(error) { return { type: doctorTimingConstants.DR_TM_ADD_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        20 June 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function updateState(){
     return dispatch => {
        dispatch(request());
    }
    function request() { return { type: doctorTimingConstants.DR_TM_UPDATE_STATE } }
}

/**
* @DateOfCreation        20 June 2018
* @ShortDescription      This function is responsible for Get timing List
* @param                 JSON user, This contains full timing input data 
* @return                JSON Object
*/
function getClinicList() {
    return dispatch => {
        dispatch(request());
        doctorTimingService.getClinicList()
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        dispatch(success(data.result));
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg = utilityHelper.getFirstErrorMessage(data.error);
                        dispatch(failure(errorMsg));
                    }else if(data.code == configConstants.EXCEPTION_CODE){
                        errorMsg = data.message;
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
    function request() { return { type: doctorTimingConstants.DR_CLINIC_FETCH_REQUEST } }
    function success(result) { return { type: doctorTimingConstants.DR_CLINIC_FETCH_SUCCESS, result } }
    function failure(error) { return { type: doctorTimingConstants.DR_CLINIC_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

