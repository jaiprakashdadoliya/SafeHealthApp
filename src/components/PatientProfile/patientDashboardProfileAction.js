import { configConstants } from '../../_constants';
import { patientDashboardProfileConstants } from './patientDashboardProfileConstants';
import { patientDashboardProfileService } from './patientDashboardProfileService';
import { utilityHelper } from '../../_helpers';

/**
 * patientProfileAction
 *
 * @package                ILD India Registry
 * @subpackage             patientProfileAction
 * @category               Actions
 * @DateOfCreation         31 May 2018
 * @ShortDescription       This is responsible for all degree actions
 */ 
export const patientDashboardProfileAction = {
    patientProfileRequest,    
    resetState,
    getPatientMedicationList
};

/**
* @DateOfCreation        15 June 2018
* @ShortDescription      This function is responsible for degree list
* @return                JSON Object
*/
function patientProfileRequest(patId) {
    return dispatch => {
        patientDashboardProfileService.patientProfile(patId)
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
    function request() { return { type: patientDashboardProfileConstants.PATIENT_DASHBOARD_PROFILE_REQUEST } }
    function success(patientDashboardProfileData) { return { type: patientDashboardProfileConstants.PATIENT_DASHBOARD_PROFILE_SUCCESS, patientDashboardProfileData} }
    function failure(error) { return { type: patientDashboardProfileConstants.PATIENT_DASHBOARD_PROFILE_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        20 July 2018
* @ShortDescription      This function is responsible for medication list
* @return                JSON Object
*/
function getPatientMedicationList(patId, page, pageSize, sorted, filtered) {
    return dispatch => {
        patientDashboardProfileService.patientMedicationListRequest(patId, page, pageSize, sorted, filtered)
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
    function request() { return { type: patientDashboardProfileConstants.PATIENT_DASHBOARD_MEDICATION_REQUEST } }
    function success(patientMedicationListData) { return { type: patientDashboardProfileConstants.PATIENT_DASHBOARD_MEDICATION_SUCCESS, patientMedicationListData} }
    function failure(error) { return { type: patientDashboardProfileConstants.PATIENT_DASHBOARD_MEDICATION_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        28 May 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function resetState(){
    return dispatch => { dispatch(request());}
    function request() { return { type: patientDashboardProfileConstants.PATIENT_DASHBOARD_PROFILE_RESET_STATE } }
}
