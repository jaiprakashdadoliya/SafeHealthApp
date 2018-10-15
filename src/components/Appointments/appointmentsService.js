/**
 * appointmentsService
 *
 * @package                SafeHealth
 * @subpackage             appointmentsService
 * @category               Service
 * @DateOfCreation         12 May 2018
 * @ShortDescription       This is responsible for calling all api related to appointmentsList
 */
import axios from 'axios';
import { utilityHelper,headerHelper } from '../../_helpers';
import { configConstants } from '../../_constants';
/**
* @DateOfCreation        30 july 2018
* @ShortDescription      This function is responsible to call appointmentsList api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
export const appointmentsService = {
    appointmentsList,
    todaysAppointments,
    getBookingPatient,
    getAppointmentTimeListingRequest,
    AppointmentSubmitRequest,
    getAppointmentClinicListingRequest
};

/**
* @DateOfCreation        30 july 2018
* @ShortDescription      This function is responsible to appointmentsList api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function appointmentsList(page, pageSize,date,appointmentPage,filtered){ 
    return axios({
        method : 'post',
        url    : configConstants.API_BASE_PATH+'bookings/appointments',
        data   : {"page":page, "pageSize":pageSize,'date':date,'appointmentPage':appointmentPage,'filtered':filtered},
        headers: {'Content-Type': 'application/json', 'Authorization' : 'Bearer '+utilityHelper.getLoginAccessToken() }
    }).then(function (response) {
        return response;
    }).catch(function (response) {
        return response;
    });
}

/**
* @DateOfCreation        30 july 2018
* @ShortDescription      This function is responsible to today appointmentsList api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function todaysAppointments(){ 
    return axios({
        method : 'get',
        url    : configConstants.API_BASE_PATH+'bookings/todaysAppointments',
        headers: {'Content-Type': 'application/json', 'Authorization' : 'Bearer '+utilityHelper.getLoginAccessToken() }
    }).then(function (response) {
        return response;
    }).catch(function (response) {
        return response;
    });
}

/**
* @DateOfCreation        9 Aug 2018
* @ShortDescription      This function is responsible to call Fetch appointment time slot option list
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getBookingPatient() {
    return axios({
            method  : 'post',
            url     : configConstants.API_BASE_PATH+'patients/profile/list',
            headers : {'Content-Type': 'application/json', 'Authorization' : 'Bearer '+utilityHelper.getLoginAccessToken() },
            data    : {page:configConstants.PAGE_NUMBER,pageSize:configConstants.PAGE_SIZE},
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}

/**
* @DateOfCreation        9 Aug 2018
* @ShortDescription      This function is responsible to call Fetch appointment time slot option list
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getAppointmentTimeListingRequest(formData) {
    let request = utilityHelper.dateDataConvert(formData.appointmentDate);
    formData.appointmentDate=request;
     return axios({
            method  : 'post',
            url     : configConstants.API_BASE_PATH+'visit/appointments/time-slot',
            headers : {'Content-Type': 'application/json', 'Authorization' : 'Bearer '+utilityHelper.getLoginAccessToken() },
            data    : headerHelper.appendUserDataInJson(formData),
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}

/**
* @DateOfCreation        9 Aug 2018
* @ShortDescription      This function is responsible to call Fetch appointment time slot option list
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getAppointmentClinicListingRequest() {
    return axios({
            method  : 'get',
            url     : configConstants.API_BASE_PATH+'clinics/list',
            headers : {'Content-Type': 'application/json', 'Authorization' : 'Bearer '+utilityHelper.getLoginAccessToken() },
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}

/**
* @DateOfCreation        9 Aug 2018
* @ShortDescription      This function is responsible to call save next visit appointments
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function AppointmentSubmitRequest(formData) {
    const formDataq = formData;
    var objForm = formDataq;
    let  request = utilityHelper.dateDataConvert(objForm.booking_date);
    objForm.booking_date = request;
    return axios({
            method  : 'post',
            url     : configConstants.API_BASE_PATH+'bookings/add',
            headers : {'Content-Type': 'application/json', 'Authorization' : 'Bearer '+utilityHelper.getLoginAccessToken() },
            data    : headerHelper.appendUserDataInJson(objForm),
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}