import {configConstants } from '../../../_constants';
import { NextVisitScheduleConstants } from './NextVisitScheduleConstants';
import {nextVisitScheduleService } from './nextVisitScheduleService';
import { utilityHelper } from '../../../_helpers';

/**
 * NextVisitScheduleActions
 *
 * @package                SafeHealth
 * @subpackage             NextVisitScheduleActions
 * @category               Actions
 * @DateOfCreation         09 Aug 2018
 * @ShortDescription       This is responsible for all patientDiagnosis actions
 */ 
export const nextVisitScheduleActions = {
    getAppointmentTimeListing,
    nextVisitScheduleSubmitAction,
    resetState,
    getAppointmentClinicListing,
    getNextVisitSchedule
};

/**
* @DateOfCreation        9 Aug 2018
* @ShortDescription      This function is responsible for fetch Diagnosis Option list
* @return                JSON Object
*/
function getAppointmentTimeListing(formData) {
    return dispatch => {
        dispatch(request());
        nextVisitScheduleService.getAppointmentTimeListingRequest(formData)
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
    function request() { return { type: NextVisitScheduleConstants.NEW_VISIT_SCHEDULE_APPOINTMENT_TIME_REQUEST } }
    function success(visitAppointmentTimeSlot) { return { type: NextVisitScheduleConstants.NEW_VISIT_SCHEDULE_APPOINTMENT_TIME_SUCCESS, visitAppointmentTimeSlot} }
    function failure(error) { return { type: NextVisitScheduleConstants.NEW_VISIT_SCHEDULE_APPOINTMENT_TIME_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        9 Aug 2018
* @ShortDescription      This function is responsible for fetch Diagnosis Option list
* @return                JSON Object
*/
function getAppointmentClinicListing() {
    return dispatch => {
        dispatch(request());
        nextVisitScheduleService.getAppointmentClinicListingRequest()
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
    function request() { return { type: NextVisitScheduleConstants.NEW_VISIT_SCHEDULE_APPOINTMENT_CLINIC_LIST_REQUEST } }
    function success(visitAppointmentClinic) { return { type: NextVisitScheduleConstants.NEW_VISIT_SCHEDULE_APPOINTMENT_CLINIC_LIST_SUCCESS, visitAppointmentClinic} }
    function failure(error) { return { type: NextVisitScheduleConstants.NEW_VISIT_SCHEDULE_APPOINTMENT_CLINIC_LIST_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        9 Aug 2018
* @ShortDescription      This function is responsible for final insert Symptom information sent
* @param                 JSON doctor, This contains full user input data 
* @return                JSON Object
*/
function nextVisitScheduleSubmitAction(nextScheduleFormData) {
    return dispatch => {
        dispatch(request());
        nextVisitScheduleService.nextVisitScheduleSubmitRequest(nextScheduleFormData)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        var result = { 'message': data.message };                                         
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

    function request() { return { type: NextVisitScheduleConstants.NEW_VISIT_SCHEDULE_ADD_REQUEST } }
    function success(result) { return { type: NextVisitScheduleConstants.NEW_VISIT_SCHEDULE_ADD_SUCCESS, result} }
    function failure(error) { return { type: NextVisitScheduleConstants.NEW_VISIT_SCHEDULE_ADD_FAILURE, errorMsg:error} }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        9 Aug 2018
* @ShortDescription      This function is responsible for fetch Diagnosis Option list
* @return                JSON Object
*/
function getNextVisitSchedule(patId) {
    return dispatch => {
        dispatch(request());
        nextVisitScheduleService.getNextVisitSchedule(patId)
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
    function request() { return { type: NextVisitScheduleConstants.PAT_NEXT_VISIT_SCHEDULE_REQUEST } }
    function success(nextVisitSchedule) { return { type: NextVisitScheduleConstants.PAT_NEXT_VISIT_SCHEDULE_SUCCESS, nextVisitSchedule} }
    function failure(error) { return { type: NextVisitScheduleConstants.PAT_NEXT_VISIT_SCHEDULE_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        9 Aug 2018
* @ShortDescription      This function is responsible for reset reducer state
* @param                 JSON doctor, This contains full user input data 
* @return                JSON Object
*/
function resetState(){
    return dispatch => {
            dispatch(request());
    };
    function request(){ return {type:NextVisitScheduleConstants.NEW_VISIT_SCHEDULE_RESET_STATE}}
}
