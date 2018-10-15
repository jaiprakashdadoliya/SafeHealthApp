import { configConstants } from './../../../_constants';
import { medicalCertificatesConstants } from './medicalCertificatesConstants';
import { medicalCertificatesService } from './medicalCertificatesService';
import { utilityHelper } from './../../../_helpers';

/**
 * medicalCertificatesActions
 *
 * @package                ILD INDIA REGISTRY
 * @subpackage             medicalCertificatesActions
 * @category               Actions
 * @DateOfCreation         3 Sept 2018
 * @ShortDescription       This is responsible for all Patient History Actions
 */ 
export const medicalCertificatesActions = {
    getMedicalCertificatesData,
    medicalCertificateTextSave,
    resetState
};

/**
* @DateOfCreation        3 Sept 2018
* @ShortDescription      This function is responsible for get patient activity history
* @return                JSON Object
*/
function getMedicalCertificatesData() {
    return dispatch => {
        dispatch(request());
        medicalCertificatesService.getMedicalCertificatesDataRequest()
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
    function request() { return { type: medicalCertificatesConstants.MEDICAL_CERTIFICATES_DATA_REQUEST } }
    function success(result) { return { type: medicalCertificatesConstants.MEDICAL_CERTIFICATES_DATA_SUCCESS, result} }
    function failure(error) { return { type: medicalCertificatesConstants.MEDICAL_CERTIFICATES_DATA_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
 * @DateOfCreation              13 June 2018
 * @ShortDescription            This function is responsible for save clinic detail
 * @param {object} detail       Clinic detail
 * @param {array} clinicList     list of all active clinic
 * @return                      JSON Object in succsss message, recent saved record
 */
function medicalCertificateTextSave(medicalCertificateTextData) {
    return dispatch => {
        medicalCertificatesService.medicalCertificateTextSave(medicalCertificateTextData)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE) {
                        var successMsg = { 'message' : data.message, 'result' : data.result };
                        dispatch(success(successMsg));
                    }else if(data.code == configConstants.ERROR_CODE) {
                        var errorMsg = utilityHelper.getFirstErrorMessage(data.error);
                        dispatch(failure(errorMsg));
                    }else if(data.code == configConstants.EXCEPTION_CODE) {
                        dispatch(failure(data.message));
                    }else if(data.code == configConstants.UNAUTHENTICATE_CODE) {
                        dispatch(unauthorize(data.message));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };

    function success(successMsg) { return { type : medicalCertificatesConstants.MEDICAL_CERTIFICATES_DATA_SAVE_SUCCESS, successMsg } }
    function failure(error) { return { type : medicalCertificatesConstants.MEDICAL_CERTIFICATES_DATA_SAVE_FAILURE, error } }
    function unauthorize(error) { return { type : configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        3 Sept 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function resetState(){
    return dispatch => { dispatch(request());}
    function request() { return { type: medicalCertificatesConstants.MEDICAL_CERTIFICATES_RESET_STATE} 
    }
}