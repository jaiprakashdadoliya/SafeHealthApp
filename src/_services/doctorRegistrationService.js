/**
 * doctorRegistrationService
 *
 * @package                SafeHealth
 * @subpackage             doctorRegistrationService
 * @category               Service
 * @DateOfCreation         11 May 2018
 * @ShortDescription       This is responsible for calling all api related to registration
 */

import axios from 'axios';
import { doctorRegistrationConstants,configConstants } from '../_constants';
import { utilityHelper } from '../_helpers';

export const doctorRegistrationService = {
    doDoctorRegistration
};


/**
* @DateOfCreation        11 May 2018
* @ShortDescription      This function is responsible to call registration api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function doDoctorRegistration(doctor) { 
    var bodyFormData = new FormData(); 
    bodyFormData.append('resource_type', configConstants.RESOURCE_TYPE);
    bodyFormData = utilityHelper.jsonToFormData(doctor, bodyFormData);
    return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'doctor/registration',
            data: bodyFormData,
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            return response;
        });
}
      
