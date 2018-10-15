import { configConstants } from '../../../_constants';
import { patientReportsConstants } from './patientReportsConstants';
import { patientReportsService } from './patientReportsService';
import { utilityHelper } from '../../../_helpers';

/**
 * patientReportsActions
 *
 * @package                Safe Health
 * @subpackage             patientReportsActions
 * @category               Actions
 * @DateOfCreation         4 Oct 2018
 * @ShortDescription       This is responsible for all degree actions
 */ 
export const patientReportsActions = {
    getReportsFilterData,
    getReportPatients
};

/**
* @DateOfCreation        4 Oct 2018
* @ShortDescription      This function is responsible for get report filter data
* @return                JSON Object
*/
function getReportsFilterData(filterData) {
    
    return dispatch => {
        patientReportsService.getReportsFilterDataService({'get-data': filterData})
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
    function request() { return { type: patientReportsConstants.PATIENT_REPORTS_GET_FILTER_DATA_REQUEST } }
    function success(reportsData) { return { type: patientReportsConstants.PATIENT_REPORTS_GET_FILTER_DATA_SUCCESS, reportsData} }
    function failure(error) { return { type: patientReportsConstants.PATIENT_REPORTS_GET_FILTER_DATA_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        4 Oct 2018
* @ShortDescription      This function is responsible for get report patients data
* @return                JSON Object
*/
function getReportPatients(filterData) {
    
    return dispatch => {
        patientReportsService.getReportPatientsService(filterData)
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
    function request() { return { type: patientReportsConstants.REPORTS_GET_FILTER_PATIENTS_DATA_REQUEST } }
    function success(patientsData) { return { type: patientReportsConstants.REPORTS_GET_FILTER_PATIENTS_DATA_SUCCESS, patientsData} }
    function failure(error) { return { type: patientReportsConstants.REPORTS_GET_FILTER_PATIENTS_DATA_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}