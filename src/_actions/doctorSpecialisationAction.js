import { doctorSpecialisationConstants, configConstants } from '../_constants';
import { doctorSpecialisationService } from '../_services';
import { utilityHelper, history } from '../_helpers';
import { Cookies } from 'react-cookie';

/**
 * doctorSpecialisationAction
 *
 * @package                SafeHealth
 * @subpackage             doctorSpecialisationAction
 * @category               Actions
 * @DateOfCreation         31 May 2018
 * @ShortDescription       This is responsible to handle all action related to doctor Specialisation
 */
export const doctorSpecialisationAction = {
    getSpecialisationList,
    specialisationSave,
    specialisationStore,
    specialisationDelete,
    updateState,
    getMainSpecialisationList,
    getSpecialisationsTagList
};



/**
* @DateOfCreation        08 August 2018
* @ShortDescription      This function is responsible for Get tags data of specialisation
* @return                JSON Object
*/
function getSpecialisationsTagList(spl_id) {
    return dispatch => {
        dispatch(request());
        doctorSpecialisationService.getSpecialisationsTagList(spl_id)
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
    function request() { return { type: doctorSpecialisationConstants.SPECIALISATION_TAG_FETCH_REQUEST } }
    function success(result) { return { type: doctorSpecialisationConstants.SPECIALISATION_TAG_FETCH_SUCCESS, result } }
    function failure(error) { return { type: doctorSpecialisationConstants.SPECIALISATION_TAG_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}
/**
* @DateOfCreation        31 May 2018
* @ShortDescription      This function is responsible for Get Master data of specialisation
* @return                JSON Object
*/
function getMainSpecialisationList() {
    return dispatch => {
        dispatch(request());
        doctorSpecialisationService.getMainSpecialisationList()
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
    function request() { return { type: doctorSpecialisationConstants.MASTER_FETCH_REQUEST } }
    function success(result) { return { type: doctorSpecialisationConstants.MASTER_FETCH_SUCCESS, result } }
    function failure(error) { return { type: doctorSpecialisationConstants.MASTER_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        31 May 2018
* @ShortDescription      This function is responsible for Get specialisation List
* @return                JSON Object
*/
function getSpecialisationList(page, pageSize, sorted, filtered) {
    return dispatch => {
        dispatch(request());
        doctorSpecialisationService.getSpecialisationList(page, pageSize, sorted, filtered)
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
    function request() { return { type: doctorSpecialisationConstants.DR_SPL_FETCH_REQUEST } }
    function success(result) { return { type: doctorSpecialisationConstants.DR_SPL_FETCH_SUCCESS, result } }
    function failure(error) { return { type: doctorSpecialisationConstants.DR_SPL_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        31 May 2018
* @ShortDescription      This function is responsible for submit the update form
* @param                 JSON specialisation, This contains single specialisation input data
                         JSON specialisationData, This contain list of specialisation 
* @return                JSON Object
*/
function specialisationSave(specialisation, specialisationData) {
    return dispatch => {
        dispatch(request());
        doctorSpecialisationService.doSpecialisationUpdate(specialisation)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){ 
                        const index = specialisationData.findIndex(
                                            i => 
                                                i.doc_spl_id === specialisation.doc_spl_id
                                            );
                        specialisationData[index] = data.result;
                        // Result with Message and data to transfer on Reducer
                        var result = {
                            'message'                   :   data.message,
                            'specialisationUpdateData'  :   data.result,
                            'specialisationData'        :   specialisationData
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
                dispatch(failure(response));
            });
    };

// Actions defination that will perform according dispatch call and send data to reducer
    function request() { return { type: doctorSpecialisationConstants.DR_SPL_UPDATE_REQUEST } }
    function success(result) { return { type: doctorSpecialisationConstants.DR_SPL_UPDATE_SUCCESS, result } }
    function failure(error) { return { type: doctorSpecialisationConstants.DR_SPL_UPDATE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        31 May 2018
* @ShortDescription      This function is responsible for submit insert form 
* @param                 JSON specialisation, This contains full specialisation input data 
* @return                JSON Object
*/
function specialisationStore(specialisation, specialisationData) {
    return dispatch => {
        dispatch(request());
        doctorSpecialisationService.doSpecialisationCreate(specialisation)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        var result = {
                            'message'                   :   data.message,
                            'specialisationInsertData'  :   data.result,
                            'specialisationData'        :   specialisationData
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
    function request() { return { type: doctorSpecialisationConstants.DR_SPL_ADD_REQUEST } }
    function success(result) { return { type: doctorSpecialisationConstants.DR_SPL_ADD_SUCCESS, result } }
    function failure(error) { return { type: doctorSpecialisationConstants.DR_SPL_ADD_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        31 May 2018
* @ShortDescription      This function is responsible for Delete the specialisation entry 
* @param                 JSON specialisationData, This contains full specialisationData input data
                         Alphnumeric doc_spl_id   
* @return                JSON Object
*/
function specialisationDelete(doc_spl_id, specialisationData) {
    return dispatch => {
        dispatch(request());
        doctorSpecialisationService.doSpecialisationDelete(doc_spl_id)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        specialisationData = specialisationData.filter(function(specialisation) {
                            return specialisation.doc_spl_id !== doc_spl_id
                        })
                        var result = {
                            'message'                   :   data.message,
                            'specialisationData'        :   specialisationData
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
    function request() { return { type: doctorSpecialisationConstants.DR_SPL_DELETE_REQUEST } }
    function success(result) { return { type: doctorSpecialisationConstants.DR_SPL_DELETE_SUCCESS, result } }
    function failure(error) { return { type: doctorSpecialisationConstants.DR_SPL_DELETE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


/**
* @DateOfCreation        31 May 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function updateState(){
     return dispatch => {
        dispatch(request());
    }
    function request() { return { type: doctorSpecialisationConstants.DR_SPL_UPDATE_STATE } }
}
