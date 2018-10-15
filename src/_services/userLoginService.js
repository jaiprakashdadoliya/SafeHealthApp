import axios from "axios"; 
import { configConstants } from '../_constants';
import { utilityHelper, history, headerHelper } from '../_helpers';
import { Cookies } from 'react-cookie';

/**
 * loginService
 *
 * @package                SafeHealth
 * @subpackage             loginService
 * @category               Service
 * @DateOfCreation         10 May 2018
 * @ShortDescription       This is responsible for calling API
 */
export const userLoginService = {
    login
};

/**
* @DateOfCreation        10 May 2018
* @ShortDescription      This function is responsible to call login api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function login(user) {
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + 'login',
        data    : headerHelper.getJsonDataToFormData(user),
        headers : headerHelper.getHeaderWithOutAuthorization('multipart/form-data')
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        let res = utilityHelper.catchServiceErrorHandel(response);
        return res;
    });
}



