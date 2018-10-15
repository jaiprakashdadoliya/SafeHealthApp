import { patientProfileConstants,configConstants } from '../_constants';
import { patientProfileService } from '../_services';
import { utilityHelper } from '../_helpers';

/**
 * patientProfileAction
 *
 * @package                ILD India Registry
 * @subpackage             patientProfileAction
 * @category               Actions
 * @DateOfCreation         31 May 2018
 * @ShortDescription       This is responsible for all degree actions
 */ 
export const patientProfileAction = {
    patientProfileRequest,
    profileUpdate,
    getPatientList,
    getPatientVisitId,
    updateProfileImage,
    resetState
};

/**
* @DateOfCreation        15 June 2018
* @ShortDescription      This function is responsible for degree list
* @return                JSON Object
*/
function patientProfileRequest(patId) {
    return dispatch => {
        patientProfileService.patientProfile(patId)
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
    function request() { return { type: patientProfileConstants.PATIENT_PROFILE_REQUEST } }
    function success(patientProfileData) { return { type: patientProfileConstants.PATIENT_PROFILE_SUCCESS, patientProfileData} }
    function failure(error) { return { type: patientProfileConstants.PATIENT_PROFILE_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        2 aug 2018
* @ShortDescription      This function is responsible for update patient profile image
* @param {object}        profile image
* @return                JSON Object in succsss message
*/
function updateProfileImage(profileImage,patId) {
    return dispatch => {
        patientProfileService.updateProfileImage(profileImage,patId)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        var successMsg = {'message':data.message,'pat_profile_img':data.result};
                        dispatch(success(successMsg));
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
                dispatch(failure(response));
            });
    };
    function success(successMsg) { return { type: patientProfileConstants.PATIENT_PROFILE_UPDATE_SUCCESS, successMsg} }
    function failure(error) { return { type: patientProfileConstants.PATIENT_PROFILE_UPDATE_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        19 June 2018
* @ShortDescription      This function is responsible for submit the update form
* @param                 JSON experience, This contains single experience input data
                         JSON experienceData, This contain list of experience 
* @return                JSON Object
*/
function profileUpdate(profile, patientData) {
    return dispatch => {
        dispatch(request());
        patientProfileService.doPatientProfileUpdate(profile)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){ 
                     
                        // Result with Message and data to transfer on Reducer
                        var result = {
                            'message'               : data.message,
                            'patientUpdateData'     : data.result,
                            'patientData'           : patientData,
                        };                       
                        dispatch(success(result));                       
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg    = utilityHelper.getFirstErrorMessage(data.error);
                        dispatch(failure(errorMsg));
                    }else if(data.code  == configConstants.EXCEPTION_CODE){
                        var errorMsg  = data.message;
                        dispatch(failure(errorMsg));
                    }else if(data.code == configConstants.UNAUTHENTICATE_CODE){
                        var errorMsg = data.message;
                        dispatch(unauthorize(errorMsg));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response.message));
            });
    };

    // Actions definition that will perform according dispatch call and send data to reducer
    function request() { return { type: patientProfileConstants.PATIENT_PROFILE_EDIT_REQUEST } }
    function success(result) { return { type: patientProfileConstants.PATIENT_PROFILE_EDIT_SUCCESS, result } }
    function failure(error) { return { type: patientProfileConstants.PATIENT_PROFILE_EDIT_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        19 June 2018
* @ShortDescription      This function is responsible for submit the update form
* @param                 JSON experience, This contains single experience input data
                         JSON experienceData, This contain list of experience 
* @return                JSON Object
*/
function getPatientList(page, pageSize, sorted, filtered){
    return dispatch => {
        dispatch(request());
        patientProfileService.getPatientListRequest(page, pageSize, sorted, filtered)
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
    function request() { return { type: patientProfileConstants.PATIENT_LIST_REQUEST } }
    function success(patientListData) { return { type: patientProfileConstants.PATIENT_LIST_SUCCESS, patientListData} }
    function failure(error) { return { type: patientProfileConstants.PATIENT_LIST_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
 * @DateOfCreation        21 June 2018
 * @ShortDescription      This function is responsible for get visit id of patient
 * @param                 JSON experience, This contains single experience input data
                          JSON experienceData, This contain list of experience 
 * @return                JSON Object
 */
function getPatientVisitId(patientId){
    return dispatch => {
        dispatch(request());
        patientProfileService.getPatientVisitIdRequest(patientId)
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
    function request() { return { type: patientProfileConstants.PATIENT_VISIT_ID_REQUEST } }
    function success(patientVisitId) { return { type: patientProfileConstants.PATIENT_VISIT_ID_SUCCESS, patientVisitId} }
    function failure(error) { return { type: patientProfileConstants.PATIENT_VISIT_ID_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        28 May 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function resetState(){
    return dispatch => { dispatch(request());}
    function request() { return { type: patientProfileConstants.PATIENT_PROFILE_RESET_STATE } }
}
