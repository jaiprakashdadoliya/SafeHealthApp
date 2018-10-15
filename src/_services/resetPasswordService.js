import axios from "axios"; 
import { configConstants } from '../_constants';
import { utilityHelper,headerHelper } from '../_helpers';

/**
 * resetPasswordService
 *
 * @package                SafeHealth
 * @subpackage             resetPasswordService
 * @category               Service
 * @DateOfCreation         15 May 2018
 * @ShortDescription       This is responsible for calling API
*/
export const resetPasswordService = {
    resetPassword
};

/**
* @DateOfCreation        15 May 2018
* @ShortDescription      This function is responsible to call Reset Api with new password
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function resetPassword(user) {
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + 'api/password/reset',
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

