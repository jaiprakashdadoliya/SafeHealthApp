/**
 * patientDiagnosisService
 *
 * @package                Safe Health
 * @subpackage             Patient Diagnosiss
 * @category               Service
 * @DateOfCreation         07 Aug 2018
 * @ShortDescription       This is responsible for calling all api related to Parent Diagnosiss
 */
import axios from 'axios';
import { configConstants } from '../../../_constants';
import { utilityHelper, headerHelper } from '../../../_helpers';

/**
* @DateOfCreation        19 june 2018
* @ShortDescription      This function is responsible to call Diagnosiss api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
export const nextVisitScheduleService = {
    getAppointmentTimeListingRequest,
    nextVisitScheduleSubmitRequest,
    getAppointmentClinicListingRequest,
    getNextVisitSchedule
};

/**
* @DateOfCreation        9 Aug 2018
* @ShortDescription      This function is responsible to call Fetch appointment time slot option list
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getAppointmentTimeListingRequest(formData) {
    return axios({
            method  : 'post',
            url     : configConstants.API_BASE_PATH+'visit/appointments/time-slot',
            headers : headerHelper.getHeaderWithAuthorization(),
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
    var formData = {};
    return axios({
            method  : 'get',
            url     : configConstants.API_BASE_PATH+'clinics/list',
            headers : headerHelper.getHeaderWithAuthorization(),
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
function nextVisitScheduleSubmitRequest(formData) {
    return axios({
            method  : 'post',
            url     : configConstants.API_BASE_PATH+'bookings/add',
            headers : headerHelper.getHeaderWithAuthorization(),
            data    : headerHelper.appendUserDataInJson(formData),
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}

/**
* @DateOfCreation        10 oct 2018
* @ShortDescription      This function is responsible to call fetch patient next visit schedule
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getNextVisitSchedule(patId) {
    var formData = {'pat_id':patId}
    return axios({
            method  : 'post',
            url     : configConstants.API_BASE_PATH+'bookings/patient-next-visit',
            headers : headerHelper.getHeaderWithAuthorization(),
            data    : headerHelper.appendUserDataInJson(formData),
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}