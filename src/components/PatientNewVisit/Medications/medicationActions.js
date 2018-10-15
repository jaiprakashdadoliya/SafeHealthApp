import { configConstants } from './../../../_constants';
import { medicationConstants } from './medicationConstants';
import { medicationService } from './medicationService';
import { utilityHelper } from '../../../_helpers';

/**
 * medicationActions
 *
 * @package                ILD INDIA REGISTRY
 * @subpackage             medicationActions
 * @category               Actions
 * @DateOfCreation         22 june 2018
 * @ShortDescription       This is responsible for all Medication Data actions
 */ 
export const medicationActions = {
    getMedicineList,
    newMedicationSubmit,
    getPatientMedicationRecord,
    deleteMedicationRecord,
    discontinueMedicationRecord,
    resetState,
    getMedicineDataAction,
    medicineSaveAsTemplate,
    getMedicineTemplate,
    getTemplate,
    getMedicinelistBySearch,
    newMedicationMultipleSubmit,
    resetStateTemplateData
};

/**
* @DateOfCreation        14 July 2018
* @ShortDescription      This function is responsible for get all static data array list
* @return                JSON Object
*/
function getMedicineList() {
    return dispatch => {
        dispatch(request());
        medicationService.getMedicineListRequest()
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
    function request() { return { type: medicationConstants.MEDICINE_LIST_DATA_REQUEST } }
    function success(result) { return { type: medicationConstants.MEDICINE_LIST_DATA_SUCCESS, result} }
    function failure(error) { return { type: medicationConstants.MEDICINE_LIST_DATA_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        14 July 2018
* @ShortDescription      This function is responsible for get all static data array list
* @return                JSON Object
*/
function getMedicineTemplate() {
    return dispatch => {
        dispatch(request());
        medicationService.getMedicineTemplate()
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
    function request() { return { type: medicationConstants.MEDICINE_TEMP_DATA_REQUEST } }
    function success(result) { return { type: medicationConstants.MEDICINE_TEMP_DATA_SUCCESS, result} }
    function failure(error) { return { type: medicationConstants.MEDICINE_TEMP_DATA_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        14 July 2018
* @ShortDescription      This function is responsible for get all static data array list
* @return                JSON Object
*/
function getTemplate(medicationTempData) {
    return dispatch => {
        dispatch(request());
        medicationService.getTemplate(medicationTempData)
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
    function request() { return { type: medicationConstants.MEDICINE_TEMP_FETCH_REQUEST } }
    function success(result) { return { type: medicationConstants.MEDICINE_TEMP_FETCH_SUCCESS, result} }
    function failure(error) { return { type: medicationConstants.MEDICINE_TEMP_FETCH_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}
/**
* @DateOfCreation        14 July 2018
* @ShortDescription      This function is responsible for get all static data array list
* @return                JSON Object
*/
function getPatientMedicationRecord(visitId, patientid) {
    return dispatch => {
        dispatch(request());
        medicationService.getPatientMedicationRecordRequest(visitId, patientid)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){

                        let result = {
                            message: data.message,
                            patientMedicationData: data.result
                        }
                        dispatch(success(result));
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
    function request() { return { type: medicationConstants.PATIENT_MEDICINE_DATA_REQUEST } }
    function success(result) { return { type: medicationConstants.PATIENT_MEDICINE_DATA_SUCCESS, result} }
    function failure(error) { return { type: medicationConstants.PATIENT_MEDICINE_DATA_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        14 July 2018
* @ShortDescription      This function is responsible for submit the update form
* @param                 JSON experience, This contains single experience input data
                         JSON experienceData, This contain list of experience 
* @return                JSON Object
*/
function newMedicationSubmit(medicationData) {
    return dispatch => {
        dispatch(request());
        medicationService.doMedicationInsertUpdate(medicationData)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){ 
                        var successMsg  = data.message;
                        dispatch(success(successMsg));                       
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg    = data;
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
    function request() { return { type: medicationConstants.MEDICATION_EDIT_REQUEST } }
    function success(result) { return { type: medicationConstants.MEDICATION_EDIT_SUCCESS, result } }
    function failure(error) { return { type: medicationConstants.MEDICATION_EDIT_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        28 Sept 2018
* @ShortDescription      This function is responsible for submit the update form
* @param                 JSON experience, This contains single experience input data
                         JSON experienceData, This contain list of experience 
* @return                JSON Object
*/
function newMedicationMultipleSubmit(medicationData) {
    return dispatch => {
        dispatch(request());
        medicationService.doMedicationMultipleInsertUpdate(medicationData)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){ 
                        var successMsg  = data.message;
                        dispatch(success(successMsg));                       
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg    = data;
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
    function request() { return { type: medicationConstants.MEDICATION_EDIT_REQUEST } }
    function success(result) { return { type: medicationConstants.MEDICATION_EDIT_SUCCESS, result } }
    function failure(error) { return { type: medicationConstants.MEDICATION_EDIT_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        14 July 2018
* @ShortDescription      This function is responsible for submit the update form
* @param                 JSON experience, This contains single experience input data
                         JSON experienceData, This contain list of experience 
* @return                JSON Object
*/
function medicineSaveAsTemplate(medicationData) {
    return dispatch => {
        dispatch(request());
        medicationService.medicineSaveAsTemplate(medicationData)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){ 
                        var result  = {'message':data.message, 'template':data.result};
                        dispatch(success(result));                       
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg    = data;
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
    function request() { return { type: medicationConstants.MEDICATION_TEMP_REQUEST } }
    function success(result) { return { type: medicationConstants.MEDICATION_TEMP_SUCCESS, result } }
    function failure(error) { return { type: medicationConstants.MEDICATION_TEMP_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        14 July 2018
* @ShortDescription      This function is responsible for submit the update form
* @param                 JSON experience, This contains single experience input data
                         JSON experienceData, This contain list of experience 
* @return                JSON Object
*/
function deleteMedicationRecord(medicationId) {
    return dispatch => {
        dispatch(request());
        medicationService.doMedicationRecordDelete(medicationId)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){ 
                        var successMsg  = data.message;
                        dispatch(success(successMsg));                       
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg    = data;
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
    function request() { return { type: medicationConstants.MEDICATION_DELETE_REQUEST } }
    function success(result) { return { type: medicationConstants.MEDICATION_DELETE_SUCCESS, result } }
    function failure(error) { return { type: medicationConstants.MEDICATION_DELETE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        14 July 2018
* @ShortDescription      This function is responsible for submit the update form
* @param                 JSON experience, This contains single experience input data
                         JSON experienceData, This contain list of experience 
* @return                JSON Object
*/
function discontinueMedicationRecord(medicationId) {
    return dispatch => {
        dispatch(request());
        medicationService.doDiscontinueMedicationRecord(medicationId)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){ 
                        var successMsg  = data.message;
                        dispatch(success(successMsg));                       
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg    = data;
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
    function request() { return { type: medicationConstants.DISCONTINUE_MEDICATION_REQUEST } }
    function success(result) { return { type: medicationConstants.DISCONTINUE_MEDICATION_SUCCESS, result } }
    function failure(error) { return { type: medicationConstants.DISCONTINUE_MEDICATION_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        22 Aug 2018
* @ShortDescription      This function is responsible for submit the update form
* @param                 JSON This contains medicine id, user id and visit id
* @return                JSON Object
*/
function getMedicineDataAction(formData) {
    return dispatch => {
        dispatch(request());
        medicationService.doGetMedicineData(formData)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){ 
                        let result = {
                            message: data.message,
                            medicineData: data.result
                        }
                        dispatch(success(result));                       
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg    = data;
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
    function request() { return { type: medicationConstants.GET_MEDICINE_DATA_REQUEST } }
    function success(result) {return { type: medicationConstants.GET_MEDICINE_DATA_SUCCESS, result } }
    function failure(error) { return { type: medicationConstants.GET_MEDICINE_DATA_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

function getMedicinelistBySearch(formData){
    return dispatch => {
        dispatch(request());
        medicationService.doGetMedicinelistBySearch(formData)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){ 
                        let result = {
                            message: data.message,
                            medicineData: data.result
                        }
                        dispatch(success(result));                       
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg    = data;
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
    function request() { return { type: medicationConstants.SEARCH_MEDICINE_REQUEST } }
    function success(result) {return { type: medicationConstants.SEARCH_MEDICINE_SUCCESS, result } }
    function failure(error) { return { type: medicationConstants.SEARCH_MEDICINE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        14 July 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function resetState(){
    return dispatch => { dispatch(request());}
    function request() { return { type: medicationConstants.MEDICATIONS_RESET_STATE} 
    }
}

/**
 * @DateOfCreation        3 Oct 2018
 * @ShortDescription      This function is responsible to update the states and props
 * @return                JSON Object
 */
function resetStateTemplateData(){
    return dispatch => { dispatch(request());}
    function request() { return { type: medicationConstants.MEDICATIONS_RESET_STATE_TEMPLATE_DATA_FETCHED} 
    }
}