import { utilityHelper } from '../../_helpers';
import { configConstants } from '../../_constants';
import { appointmentsConstants } from './appointmentsConstants';
import { appointmentsService } from './appointmentsService';
/**
 * appointmentsActions
 *
 * @package                SafeHealth
 * @subpackage             appointmentsActions
 * @category               Actions
 * @DateOfCreation         22 JULY 2018
 * @ShortDescription       This is responsible for all service actions
 */ 
export const appointmentsActions = {
    appointmentsList,
    todaysAppointments,
    getBookingPatient,
    getAppointmentTimeListing,
    appointmentSave,
    resetState,
    getAppointmentClinicListing
};


/**
* @DateOfCreation        22 JULY 2018
* @ShortDescription      This function is responsible for appointment
* @return                JSON Object in succsss message
*/
function appointmentsList(page, pageSize,date,appointmentPage='',filtered){ 
     return dispatch => {
         dispatch(request());
        appointmentsService.appointmentsList(page, pageSize,date,appointmentPage,filtered)
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
    function request() { return { type: appointmentsConstants.APPOINTMENTS_REQUEST } }
    function success(appointments) { return { type: appointmentsConstants.APPOINTMENTS_SUCCESS, appointments} }
    function failure(error) { return { type: appointmentsConstants.APPOINTMENTS_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        22 JULY 2018
* @ShortDescription      This function is responsible for appointment
* @return                JSON Object in succsss message
*/
function todaysAppointments(){ 
     return dispatch => {
         dispatch(request());
        appointmentsService.todaysAppointments()
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
    function request() { return { type: appointmentsConstants.TODAY_APPOINTMENT_REQUEST } }
    function success(todaysAppointments) { return { type: appointmentsConstants.TODAY_APPOINTMENT_SUCCESS, todaysAppointments} }
    function failure(error) { return { type: appointmentsConstants.TODAY_APPOINTMENT_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        9 Aug 2018
* @ShortDescription      This function is responsible for fetch Diagnosis Option list
* @return                JSON Object
*/
function getBookingPatient() {
    return dispatch => {
        dispatch(request());
        appointmentsService.getBookingPatient()
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
    function request() { return { type: appointmentsConstants.GET_BOOKING_PATIENT_REQUEST } }
    function success(bookingPatient) { return { type: appointmentsConstants.GET_BOOKING_PATIENT_SUCCESS, bookingPatient} }
    function failure(error) { return { type: appointmentsConstants.GET_BOOKING_PATIENT_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        9 Aug 2018
* @ShortDescription      This function is responsible for fetch Diagnosis Option list
* @return                JSON Object
*/
function getAppointmentTimeListing(formData) {
    return dispatch => {
        dispatch(request());
        appointmentsService.getAppointmentTimeListingRequest(formData)
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
    function request() { return { type: appointmentsConstants.APPOINTMENT_TIME_REQUEST } }
    function success(appointmentTimeSlot) { return { type: appointmentsConstants.APPOINTMENT_TIME_SUCCESS, appointmentTimeSlot} }
    function failure(error) { return { type: appointmentsConstants.APPOINTMENT_TIME_FAILURE, errorMsg:error } }
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
        appointmentsService.getAppointmentClinicListingRequest()
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
    function request() { return { type: appointmentsConstants.GET_BOOKING_CLINIC_REQUEST } }
    function success(bookingClinic) {  return { type: appointmentsConstants.GET_BOOKING_CLINIC_SUCCESS, bookingClinic} }
    function failure(error) { return { type: appointmentsConstants.GET_BOOKING_CLINIC_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        9 Aug 2018
* @ShortDescription      This function is responsible for final insert Symptom information sent
* @param                 JSON doctor, This contains full user input data 
* @return                JSON Object
*/
function appointmentSave(appointmentData) {
    return dispatch => {
        dispatch(request());
        appointmentsService.AppointmentSubmitRequest(appointmentData)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        var result = { 'message': data.message,'detail':data.result };                                         
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

    function request() { return { type: appointmentsConstants.APPOINTMENT_ADD_REQUEST } }
    function success(result) { return { type: appointmentsConstants.APPOINTMENT_ADD_SUCCESS, result} }
    function failure(error) { return { type: appointmentsConstants.APPOINTMENT_ADD_FAILURE, errorMsg:error} }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


/**
* @DateOfCreation        28 JULY 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function resetState(){
    return dispatch => { dispatch(request());}
    function request() { return { type: appointmentsConstants.APPOINTMENTS_RESET_STATE } }
}


