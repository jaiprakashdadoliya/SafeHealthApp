import { configConstants } from '../../../_constants';
import { chartReportsConstants } from './chartReportsConstants';
import { chartReportsService } from './chartReportsService';
import { utilityHelper } from '../../../_helpers';

/**
 * patientProfileAction
 *
 * @package                ILD India Registry
 * @subpackage             patientProfileAction
 * @category               Actions
 * @DateOfCreation         31 May 2018
 * @ShortDescription       This is responsible for all degree actions
 */ 
export const chartReportsActions = {
    getPatientsReportForMonth,
    getPatientsReportForYear,
};

/**
* @DateOfCreation        30 Aug 2018
* @ShortDescription      This function is responsible for report for a month
* @return                JSON Object
*/
function getPatientsReportForMonth(month, year) {
    
    return dispatch => {
        chartReportsService.getPatientsReportForMonth(month, year)
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
    function request() { return { type: chartReportsConstants.REPORTS_REQUEST } }
    function success(reportsData) { return { type: chartReportsConstants.REPORTS_SUCCESS, reportsData} }
    function failure(error) { return { type: chartReportsConstants.REPORTS_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        31 Aug 2018
* @ShortDescription      This function is responsible for report for a year
* @return                JSON Object
*/
function getPatientsReportForYear(year) {
    
    return dispatch => {
        chartReportsService.getPatientsReportForYear(year)
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
    function request() { return { type: chartReportsConstants.REPORTS_REQUEST } }
    function success(reportsData) { return { type: chartReportsConstants.REPORTS_SUCCESS, reportsData} }
    function failure(error) { return { type: chartReportsConstants.REPORTS_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}