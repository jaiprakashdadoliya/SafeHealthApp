import { configConstants } from './../../../_constants';
import { medicineTemplatesConstants } from './medicineTemplatesConstants';
import { medicineTemplatesService } from './medicineTemplatesService';
import { utilityHelper } from '../../../_helpers';

/**
 * medicineTemplatesActions
 *
 * @package                ILD INDIA REGISTRY
 * @subpackage             medicineTemplatesActions
 * @category               Actions
 * @DateOfCreation         22 june 2018
 * @ShortDescription       This is responsible for all Medication Data actions
 */ 
export const medicineTemplatesActions = {
    getMedicineList,
    newMedicationSubmit,
    medicineTemplateDelete,
    resetState,
    getMedicineDataAction,
    medicineSaveAsTemplate,
    getMedicineTemplate,
    getTemplate,
    medicineUpdateTemplate,
    medicineUpdateTemplateList,
};

/**
* @DateOfCreation        14 July 2018
* @ShortDescription      This function is responsible for get all static data array list
* @return                JSON Object
*/
function getMedicineList() {
    return dispatch => {
        dispatch(request());
        medicineTemplatesService.getMedicineListRequest()
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
    function request() { return { type: medicineTemplatesConstants.SETTINGS_MED_LIST_DATA_REQUEST } }
    function success(result) { return { type: medicineTemplatesConstants.SETTINGS_MED_LIST_DATA_SUCCESS, result} }
    function failure(error) { return { type: medicineTemplatesConstants.SETTINGS_MED_LIST_DATA_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        14 July 2018
* @ShortDescription      This function is responsible for get all static data array list
* @return                JSON Object
*/
function getMedicineTemplate(page, pageSize, sorted, filtered) {
    return dispatch => {
        dispatch(request());
        medicineTemplatesService.getMedicineTemplate(page, pageSize, sorted, filtered)
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
    function request() { return { type: medicineTemplatesConstants.SETTINGS_MED_TEMP_DATA_REQUEST } }
    function success(result) { return { type: medicineTemplatesConstants.SETTINGS_MED_TEMP_DATA_SUCCESS, result} }
    function failure(error) { return { type: medicineTemplatesConstants.SETTINGS_MED_TEMP_DATA_FAILURE, errorMsg:error } }
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
        medicineTemplatesService.getTemplate(medicationTempData)
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
    function request() { return { type: medicineTemplatesConstants.SETTINGS_MED_TEMP_FETCH_REQUEST } }
    function success(result) { return { type: medicineTemplatesConstants.SETTINGS_MED_TEMP_FETCH_SUCCESS, result} }
    function failure(error) { return { type: medicineTemplatesConstants.SETTINGS_MED_TEMP_FETCH_FAILURE, errorMsg:error } }
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
        medicineTemplatesService.doMedicationInsertUpdate(medicationData)
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
    function request() { return { type: medicineTemplatesConstants.MEDICATION_EDIT_REQUEST } }
    function success(result) { return { type: medicineTemplatesConstants.MEDICATION_EDIT_SUCCESS, result } }
    function failure(error) { return { type: medicineTemplatesConstants.MEDICATION_EDIT_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        14 July 2018
* @ShortDescription      This function is responsible for submit the update form
* @param                 JSON experience, This contains single experience input data
                         JSON experienceData, This contain list of experience 
* @return                JSON Object
*/
function medicineSaveAsTemplate(medicationData,medicineTempList) {
    return dispatch => {
        dispatch(request());
        medicineTemplatesService.medicineSaveAsTemplate(medicationData)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){ 
                        medicineTempList.push(data.result);
                        var result  = {'message':data.message, 'medicineTempList':medicineTempList};
                        dispatch(success(result));                       
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg    = data;
                        dispatch(failure(errorMsg.message));
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
    function request() { return { type: medicineTemplatesConstants.SETTINGS_MED_TEMP_ADD_REQUEST } }
    function success(result) { return { type: medicineTemplatesConstants.SETTINGS_MED_TEMP_ADD_SUCCESS, result } }
    function failure(errorMsg) { return { type: medicineTemplatesConstants.SETTINGS_MED_TEMP_ADD_FAILURE, errorMsg } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        14 July 2018
* @ShortDescription      This function is responsible for submit the update form
* @param                 JSON experience, This contains single experience input data
                         JSON experienceData, This contain list of experience 
* @return                JSON Object
*/
function medicineUpdateTemplateList(medicationData,medicineTempList) {
    return dispatch => {
        dispatch(request());
        medicineTemplatesService.medicineUpdateTemplate(medicationData)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){ 
                        const index = medicineTempList.findIndex(
                                    i => 
                                        i.pat_med_temp_id == data.result.pat_med_temp_id
                                    );
                        if(medicineTempList[index]) {
                            medicineTempList[index] = data.result;
                        }
                        var result  = {'message':data.message,'medicineTempList':medicineTempList};
                        dispatch(success(result));                       
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg    = data;
                        dispatch(failure(errorMsg.message));
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
    function request() { return { type: medicineTemplatesConstants.MEDICATION_TEMP_UPDATE_REQUEST } }
    function success(result) { return { type: medicineTemplatesConstants.MEDICATION_TEMP_UPDATE_SUCCESS, result } }
    function failure(errorMsg) { return { type: medicineTemplatesConstants.MEDICATION_TEMP_UPDATE_FAILURE, errorMsg } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        14 July 2018
* @ShortDescription      This function is responsible for submit the update form
* @param                 JSON experience, This contains single experience input data
                         JSON experienceData, This contain list of experience 
* @return                JSON Object
*/
function medicineUpdateTemplate(medicationData) {
    return dispatch => {
        dispatch(request());
        medicineTemplatesService.medicineUpdateTemplate(medicationData)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){ 
                        var result  = {'message':data.message};
                        dispatch(success(result));                       
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg    = data;
                        dispatch(failure(errorMsg.message));
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
    function request() { return { type: medicineTemplatesConstants.MEDICATION_TEMP_UPDATE_REQUEST } }
    function success(result) { return { type: medicineTemplatesConstants.MEDICATION_TEMP_UPDATE_SUCCESS, result } }
    function failure(errorMsg) { return { type: medicineTemplatesConstants.MEDICATION_TEMP_UPDATE_FAILURE, errorMsg } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


/**
* @DateOfCreation        14 July 2018
* @ShortDescription      This function is responsible for submit the update form
* @param                 JSON experience, This contains single experience input data
                         JSON experienceData, This contain list of experience 
* @return                JSON Object
*/
function medicineTemplateDelete(templateId,medicineTempList) {
    return dispatch => {
        dispatch(request());
        medicineTemplatesService.medicineTemplateDelete(templateId)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){ 
                         medicineTempList = medicineTempList.filter(function(item) {
                            return item.pat_med_temp_id !== templateId
                        })
                        var result  = {'message':data.message,'medicineTempList':medicineTempList};
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
    function request() { return { type: medicineTemplatesConstants.MEDICATION_TEMP_DELETE_REQUEST } }
    function success(result) { return { type: medicineTemplatesConstants.MEDICATION_TEMP_DELETE_SUCCESS, result } }
    function failure(error) { return { type: medicineTemplatesConstants.MEDICATION_TEMP_DELETE_FAILURE, error } }
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
        medicineTemplatesService.doGetMedicineData(formData)
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
    function request() { return { type: medicineTemplatesConstants.GET_MEDICINE_DATA_REQUEST } }
    function success(result) {return { type: medicineTemplatesConstants.GET_MEDICINE_DATA_SUCCESS, result } }
    function failure(error) { return { type: medicineTemplatesConstants.GET_MEDICINE_DATA_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        14 July 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function resetState(){
    return dispatch => { dispatch(request());}
    function request() { return { type: medicineTemplatesConstants.MEDICATIONS_RESET_STATE} 
    }
}
