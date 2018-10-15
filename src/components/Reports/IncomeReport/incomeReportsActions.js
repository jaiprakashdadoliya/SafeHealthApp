import { configConstants } from '../../../_constants';
import { incomeReportsConstants } from './incomeReportsConstants';
import { incomeReportsService } from './incomeReportsService';
import { utilityHelper } from '../../../_helpers';

/**
 * incomeReportAction
 *
 * @package                ILD India Registry
 * @subpackage             incomeReportAction
 * @category               Actions
 * @DateOfCreation         10 Oct 2018
 * @ShortDescription       This is responsible for all degree actions
 */ 
export const incomeReportsActions = {
    getIncomeReportForMonth,
    getIncomeReportForYear,
};

/**
* @DateOfCreation        30 Aug 2018
* @ShortDescription      This function is responsible for report for a month
* @return                JSON Object
*/
function getIncomeReportForMonth(month, year) {
    
    return dispatch => {
        incomeReportsService.getIncomeReportForMonth(month, year)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        dispatch(success(data.result));
                    }else if(data.code == configConstants.ERROR_CODE){
                       dispatch(failure(data.message));
                    }else if(data.code == configConstants.EXCEPTION_CODE){
                        dispatch(failure(data.message));
                    }else if(data.code == configConstants.UNAUTHENTICATE_CODE){
                        dispatch(unauthorize(data.message));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response.message));
            });
    };
    function request() { return { type: incomeReportsConstants.REPORTS_REQUEST } }
    function success(reportsData) { return { type: incomeReportsConstants.REPORTS_SUCCESS, reportsData} }
    function failure(error) { return { type: incomeReportsConstants.REPORTS_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        31 Aug 2018
* @ShortDescription      This function is responsible for report for a year
* @return                JSON Object
*/
function getIncomeReportForYear(year) {
    
    return dispatch => {
        incomeReportsService.getIncomeReportForYear(year)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        dispatch(success(data.result));
                    }else if(data.code == configConstants.ERROR_CODE){
                       dispatch(failure(data.message));
                    }else if(data.code == configConstants.EXCEPTION_CODE){
                        dispatch(failure(data.message));
                    }else if(data.code == configConstants.UNAUTHENTICATE_CODE){
                        dispatch(unauthorize(data.message));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response.message));
            });
    };
    function request() { return { type: incomeReportsConstants.REPORTS_REQUEST } }
    function success(reportsData) { return { type: incomeReportsConstants.REPORTS_SUCCESS, reportsData} }
    function failure(error) { return { type: incomeReportsConstants.REPORTS_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}