import axios from "axios"; 
import { configConstants } from '../_constants';
import { utilityHelper } from '../_helpers';

/**
 * changePasswordService
 *
 * @package                SafeHealth
 * @subpackage             changePasswordService
 * @category               Service
 * @DateOfCreation         15 june 2018
 * @ShortDescription       This is responsible for calling update password API
 */
export const changePasswordService = {
    passwordUpdate
};

/**
* @DateOfCreation        15 june 2018
* @ShortDescription      This function is responsible to call update password api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function passwordUpdate(detail) {
    return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'doctors/profile/password/update',
            data  : detail,
            headers: {'Content-Type': 'application/json', 'Authorization' : 'Bearer '+utilityHelper.getLoginAccessToken() }
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            return response;
        });
}

