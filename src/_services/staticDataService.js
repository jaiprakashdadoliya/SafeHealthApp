/**
 * staticDataService
 *
 * @package                ILD INDIA REGISTRY
 * @subpackage             staticDataService
 * @category               Service
 * @DateOfCreation         11 May 2018
 * @ShortDescription       This is responsible for calling all api related to membership
 */
import axios from 'axios';
import { configConstants } from '../_constants';
import { utilityHelper, headerHelper } from '../_helpers';

/**
* @DateOfCreation        11 May 2018
* @ShortDescription      This function is responsible to call membership api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
export const staticDataService = {
    getStaticData,
};

/**
* @DateOfCreation        14 june 2018
* @ShortDescription      This function is responsible to call Fetch staticConfig data api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getStaticData() { 
    return axios({
            method: 'get',
            url: configConstants.API_BASE_PATH+'setup/staticdata',
            headers : headerHelper.getHeaderWithAuthorization()
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}