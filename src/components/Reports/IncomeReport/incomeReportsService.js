/**
 * incomeReportsService
 *
 * @package                SafeHealth
 * @subpackage             Patient Profile
 * @category               Service
 * @DateOfCreation         31 May 2018
 * @ShortDescription       This is responsible for calling all api related to Doctors reports
 */
import axios from 'axios';
import { configConstants } from '../../../_constants';
import { utilityHelper, headerHelper } from '../../../_helpers';

/**
* @DateOfCreation        11 May 2018
* @ShortDescription      This function is responsible to call degree api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
export const incomeReportsService = {
    getIncomeReportForMonth,
    getIncomeReportForYear,
};

/**
* @DateOfCreation        31 May 2018
* @ShortDescription      This function is responsible to call Fetch degree api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getIncomeReportForMonth(month, year) {
    let data = {month: month, year: year};
    return axios({
            method: 'POST',
            url: configConstants.API_BASE_PATH+'doctor/reports/income',
            headers : headerHelper.getHeaderWithAuthorization(),
            data    : headerHelper.appendUserDataInJson(data),
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}

/**
* @DateOfCreation        31 May 2018
* @ShortDescription      This function is responsible to call Fetch degree api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getIncomeReportForYear(year) {
    let data = {year: year};
    return axios({
            method: 'POST',
            url: configConstants.API_BASE_PATH+'doctor/reports/income',
            headers : headerHelper.getHeaderWithAuthorization(),
            data    : headerHelper.appendUserDataInJson(data),
        }).then(function (response) {
            return response;
        }).catch(function (response) {
            let res = utilityHelper.catchServiceErrorHandel(response);
            return res;
        });
}