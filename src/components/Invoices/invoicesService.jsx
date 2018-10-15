/**
 * invoicesService
 *
 * @package                RxHealth
 * @subpackage             invoicesService
 * @category               Service
 * @DateOfCreation         03 Sept 2018
 * @ShortDescription       This is responsible for calling all api related to invoice history
 */
import axios from 'axios';
import { configConstants } from '../../_constants';
import { utilityHelper, headerHelper } from '../../_helpers';

/**
* @DateOfCreation        03 Sept 2018
* @ShortDescription      This function is responsible to call Patient Activity history api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
export const invoicesService = {
    getInvoicesHistory
};

/**
* @DateOfCreation        03 Sept 2018
* @ShortDescription      This function is responsible to call Fetch activity history record
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getInvoicesHistory(postData) { 
   return axios({
            method: 'post',
            url: configConstants.API_BASE_PATH+'accounts/invoices-history',
            data: headerHelper.appendUserDataInJson(postData),
            headers : headerHelper.getHeaderWithAuthorization(),
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}