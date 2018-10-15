import axios from "axios"; 
import { configConstants } from '../_constants';
import { utilityHelper, history, headerHelper } from '../_helpers';
import { Cookies } from 'react-cookie';

/**
 * headerService
 *
 * @package                SafeHealth
 * @subpackage             headerService
 * @category               Service
 * @DateOfCreation         22 May 2018
 * @ShortDescription       This is responsible for calling API
 */
export const headerService = {
    logout
};

/**
* @DateOfCreation        22 May 2018
* @ShortDescription      This function is responsible for remove cookies
* @return                Redirect
*/
function logout() {
    //Call the action function with dispatch
    var userInfo = utilityHelper.getUserInfo();
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + 'logout/'+userInfo.user_id,
        headers : headerHelper.getHeaderWithAuthorization()
    })
    .then(response => {
         return response;
    })
    .catch(response => {
        let res = utilityHelper.catchServiceErrorHandel(response);
        return res;
    });
}

