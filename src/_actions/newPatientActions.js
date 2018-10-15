import { newPatientConstants,configConstants } from '../_constants';
import { newPatientService } from '../_services';
import { utilityHelper } from '../_helpers';

/**
 * doctorRegistrationActions
 *
 * @package                SafeHealth
 * @subpackage             doctorRegistrationActions
 * @category               Actions
 * @DateOfCreation         11 May 2018
 * @ShortDescription       This is responsible for all registration actions
 */
export const newPatientActions = {
    newPatientSubmit,
    getReferralDoctor,
    getPatientGroups,
    resetState
};

/**
* @DateOfCreation        15 June 2018
* @ShortDescription      This function is responsible for final newPateint information sent
* @param                 JSON doctor, This contains full user input data 
* @return                JSON Object
*/
function newPatientSubmit(patient) {
    return dispatch => {
        dispatch(request({ patient }));
        newPatientService.doNewPatient(patient)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        dispatch(success(data));                        
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg = utilityHelper.getFirstErrorMessage(data.error);                        
                        dispatch(failure(errorMsg));
                    }else if(data.code == configConstants.UNAUTHENTICATE_CODE){
                        dispatch(unauthorize(data.message));
                    }else if(data.code == configConstants.EXCEPTION_CODE){
                        dispatch(failure(data.message));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };

    function request(doctor) { return { type: newPatientConstants.NEW_PATIENT_REQUEST, patient } }
    function success(data) { return { type: newPatientConstants.NEW_PATIENT_SUCCESS, data } }
    function failure(error) { 
        return { 
            type: newPatientConstants.NEW_PATIENT_FAILURE, 
            errorMsg:error
        }
    }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        15 June 2018
* @ShortDescription      This function is responsible for final newPateint information sent
* @param                 JSON doctor, This contains full user input data 
* @return                JSON Object
*/
function getReferralDoctor() {
    return dispatch => {
        dispatch(request());
        newPatientService.getReferralDoctor()
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        dispatch(success(data.result));                        
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg = utilityHelper.getFirstErrorMessage(data.error);                        
                        dispatch(failure(errorMsg));
                    }else if(data.code == configConstants.UNAUTHENTICATE_CODE){
                        dispatch(unauthorize(data.message));
                    }else if(data.code == configConstants.EXCEPTION_CODE){
                        dispatch(failure(data.message));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };

    function request() { return { type: newPatientConstants.REF_DOCTOR_REQUEST } }
    function success(referralDoctor) { return { type: newPatientConstants.REF_DOCTOR_SUCCESS, referralDoctor } }
    function failure(error) { 
        return { 
            type: newPatientConstants.REF_DOCTOR_FAILURE, 
            errorMsg:error
        }
    }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        15 June 2018
* @ShortDescription      This function is responsible for final newPateint information sent
* @param                 JSON doctor, This contains full user input data 
* @return                JSON Object
*/
function getPatientGroups() {
    return dispatch => {
        dispatch(request());
        newPatientService.getPatientGroups()
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        dispatch(success(data.result));                        
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg = utilityHelper.getFirstErrorMessage(data.error);                        
                        dispatch(failure(errorMsg));
                    }else if(data.code == configConstants.UNAUTHENTICATE_CODE){
                        dispatch(unauthorize(data.message));
                    }else if(data.code == configConstants.EXCEPTION_CODE){
                        dispatch(failure(data.message));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };

    function request() { return { type: newPatientConstants.PAT_GROUP_REQUEST } }
    function success(patientGroups) { return { type: newPatientConstants.PAT_GROUP_SUCCESS, patientGroups } }
    function failure(error) { 
        return { 
            type: newPatientConstants.PAT_GROUP_FAILURE, 
            errorMsg:error
        }
    }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}




/**
* @DateOfCreation        20 June 2018
* @ShortDescription      This function is responsible for reset reducer state
* @param                 JSON doctor, This contains full user input data 
* @return                JSON Object
*/
function resetState(){
    return dispatch => {
            dispatch(request());
    };
    function request(){ return {type:newPatientConstants.NEW_PATIENT_RESET}}
}