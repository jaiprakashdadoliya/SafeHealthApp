import { patientConstants, configConstants } from '../_constants';
import { patientService } from '../_services';
import { utilityHelper, history } from '../_helpers';

/**
 * PatientAction
 *
 * @package                SafeHealth
 * @subpackage             PatientAction
 * @category               Actions
 * @DateOfCreation         08 June 2018
 * @ShortDescription       This is responsible to handle all action related to Patient
 */
export const patientAction = {
    getPatientList,
    patientSave,
    patientStore,
    patientDelete,
    updateState,
    getStateList,
    getCitiesList

};
/**
* @DateOfCreation        08 June 2018
* @ShortDescription      This function is responsible for StateList
* @param                 JSON user, This contains full patient input data 
* @return                JSON Object
*/
function getStateList() {
    return dispatch => {
        dispatch(request());
        patientService.getStateList()
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){                        
                        dispatch(success(data.result));                        
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg = utilityHelper.getFirstErrorMessage(data.error);
                        dispatch(failure(errorMsg));
                    }else if(data.code == configConstants.EXCEPTION_CODE){
                        errorMsg = data.message;
                        dispatch(failure(errorMsg));
                    }else if(data.code == configConstants.UNAUTHENTICATE_CODE){
                        var errorMsg = data.message;
                        dispatch(unauthorize(errorMsg));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };

// Actions defination that will perform according dispatch call and send data to reducer
    function request() { return { type: patientConstants.STATE_FETCH_REQUEST } }
    function success(result) { return { type: patientConstants.STATE_FETCH_SUCCESS, result } }
    function failure(error) { return { type: patientConstants.STATE_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}
/**
* @DateOfCreation        08 June 2018
* @ShortDescription      This function is responsible for Cities List
* @return                JSON Object
*/
function getCitiesList(state_id) {
    return dispatch => {
        dispatch(request());
        patientService.getCitiesList(state_id)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){                        
                        dispatch(success(data.result));                        
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg = utilityHelper.getFirstErrorMessage(data.error);
                        dispatch(failure(errorMsg));
                    }else if(data.code == configConstants.EXCEPTION_CODE){
                        errorMsg = data.message;
                        dispatch(failure(errorMsg));
                    }else if(data.code == configConstants.UNAUTHENTICATE_CODE){
                        var errorMsg = data.message;
                        dispatch(unauthorize(errorMsg));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };

// Actions defination that will perform according dispatch call and send data to reducer
    function request() { return { type: patientConstants.CITIES_FETCH_REQUEST } }
    function success(result) { return { type: patientConstants.CITIES_FETCH_SUCCESS, result } }
    function failure(error) { return { type: patientConstants.CITIES_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}



/**
* @DateOfCreation        08 June 2018
* @ShortDescription      This function is responsible for Get patient List
* @return                JSON Object
*/
function getPatientList(page, pageSize, sorted, filtered) {
    return dispatch => {
        dispatch(request());
        patientService.getPatientList(page, pageSize, sorted, filtered)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        dispatch(success(data.result));                        
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg = utilityHelper.getFirstErrorMessage(data.error);
                        dispatch(failure(errorMsg));
                    }else if(data.code == configConstants.EXCEPTION_CODE){
                        errorMsg = data.message;
                        dispatch(failure(errorMsg));
                    }else if(data.code == configConstants.UNAUTHENTICATE_CODE){
                        var errorMsg = data.message;
                        dispatch(unauthorize(errorMsg));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };

// Actions defination that will perform according dispatch call and send data to reducer
    function request() { return { type: patientConstants.PATIENT_FETCH_REQUEST } }
    function success(result) { return { type: patientConstants.PATIENT_FETCH_SUCCESS, result } }
    function failure(error) { return { type: patientConstants.PATIENT_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        08 June 2018
* @ShortDescription      This function is responsible for submit the update form
* @param                 JSON patient, This contains single patient input data
                         JSON patientData, This contain list of patient 
* @return                JSON Object
*/
function patientSave(patient, patientData) {
    return dispatch => {
        dispatch(request());
        patientService.doPatientUpdate(patient)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){ 
                        
                        const index = patientData.findIndex(
                                            i => 
                                                i.pat_id === patient.pat_id
                                            );
                        patientData[index] = patient;
                     
                        // Result with Message and data to transfer on Reducer
                        var result = {
                            'message'            :   data.message,
                            'patientUpdateData'  :   patient,
                            'patientData'        :   patientData
                        };                       
                        dispatch(success(result));                       
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg = utilityHelper.getFirstErrorMessage(data.error);
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
                dispatch(failure(response));
            });
    };

// Actions defination that will perform according dispatch call and send data to reducer
    function request() { return { type: patientConstants.PATIENT_UPDATE_REQUEST } }
    function success(result) { return { type: patientConstants.PATIENT_UPDATE_SUCCESS, result } }
    function failure(error) { return { type: patientConstants.PATIENT_UPDATE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        08 June 2018
* @ShortDescription      This function is responsible for submit insert form 
* @param                 JSON patient, This contains full patient input data 
* @return                JSON Object
*/
function patientStore(patient, patientData) {
    return dispatch => {
        dispatch(request({ patient }));
        patientService.doPatientCreate(patient)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        var result = {
                            'message'            :   data.message,
                            'patientInsertData'  :   data.result,
                            'patientData'        :   patientData
                        };                                             
                        dispatch(success(result));                        
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg = utilityHelper.getFirstErrorMessage(data.error);
                        dispatch(failure(errorMsg));
                    }else if(data.code == configConstants.EXCEPTION_CODE){
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
                dispatch(failure(response));
            });
    };

// Actions defination that will perform according dispatch call and send data to reducer
    function request() { return { type: patientConstants.PATIENT_ADD_REQUEST } }
    function success(result) { return { type: patientConstants.PATIENT_ADD_SUCCESS, result } }
    function failure(error) { return { type: patientConstants.PATIENT_ADD_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        08 June 2018
* @ShortDescription      This function is responsible for Delete the patient entry 
* @param                 JSON patient, This contains full patient input data 
* @return                JSON Object
*/
function patientDelete(doc_exp_id, patientData) {
    return dispatch => {
        dispatch(request({ patientData }));
        patientService.doPatientDelete(doc_exp_id)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        patientData = patientData.filter(function(patient) {
                            return patient.doc_exp_id !== doc_exp_id
                        })
                        var result = {
                            'message'               :   data.message,
                            'patientData'        :   patientData
                        };                                             
                        dispatch(success(result));                        
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg = utilityHelper.getFirstErrorMessage(data.error);
                        dispatch(failure(errorMsg));
                    }else if(data.code == configConstants.EXCEPTION_CODE){
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
                dispatch(failure(response));
            });
    };

// Actions defination that will perform according dispatch call and send data to reducer
    function request() { return { type: patientConstants.PATIENT_DELETE_REQUEST } }
    function success(result) { return { type: patientConstants.PATIENT_DELETE_SUCCESS, result } }
    function failure(error) { return { type: patientConstants.PATIENT_DELETE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


/**
* @DateOfCreation        08 June 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function updateState(){
     return dispatch => {
        dispatch(request());
    }
    function request() { return { type: patientConstants.PATIENT_UPDATE_STATE } }
}
