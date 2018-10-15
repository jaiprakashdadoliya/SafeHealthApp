import axios from "axios"; 
import { configConstants } from '../../../_constants';
import { utilityHelper, history } from '../../../_helpers';

/**
 * appointmentService
 *
 * @package                SafeHealth
 * @subpackage             appointmentService
 * @category               Service
 * @DateOfCreation         12 July 2018
 * @ShortDescription       This is responsible for connect with API 
 */
export const appointmentService = {
    doAppointmentCreate,
    getAppointmentReasons,
};

/**
* @DateOfCreation        12 July 2018
* @ShortDescription      This function is responsible to Insert api
* @param                 JSON appointment
* @return                Response JSON
*/
function doAppointmentCreate(appointment) {
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
            method  : 'post',
            url     : configConstants.API_BASE_PATH +'bookings/add',
            data    : appointment,
            headers : { 
                'Authorization' : 'Bearer '+loginAccessToken,
                'Content-Type': 'application/json' 
            }
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            return response;
        });
}

/**
* @DateOfCreation        12 July 2018
* @ShortDescription      This function is responsible to fetch api
* @param                 JSON appointment
* @return                Response JSON
*/
function getAppointmentReasons(doctorId) {
    var loginAccessToken = utilityHelper.getLoginAccessToken();
    return axios({
            method  : 'post',
            url     : configConstants.API_BASE_PATH +'appointment/reason/list',
            data    : {'user_id':doctorId},
            headers : { 
                'Authorization' : 'Bearer '+loginAccessToken,
                'Content-Type': 'application/json' 
            }
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            return response;
        });
}

