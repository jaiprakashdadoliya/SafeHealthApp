import { doctorExperienceConstants, configConstants } from '../_constants';
import { doctorExperienceService } from '../_services';
import { utilityHelper, history } from '../_helpers';
import { Cookies } from 'react-cookie';

/**
 * doctorExperienceAction
 *
 * @package                SafeHealth
 * @subpackage             doctorExperienceAction
 * @category               Actions
 * @DateOfCreation         18 May 2018
 * @ShortDescription       This is responsible to handle all action related to doctor Experience
 */
export const doctorExperienceAction = {
    getExperienceList,
    experienceSave,
    experienceStore,
    experienceDelete,
    updateState

};

/**
* @DateOfCreation        18 May 2018
* @ShortDescription      This function is responsible for Get experience List
* @param                 JSON user, This contains full experience input data 
* @return                JSON Object
*/
function getExperienceList(page, pageSize, sorted, filtered) {
    return dispatch => {
        dispatch(request());
        doctorExperienceService.getExperienceList(page, pageSize, sorted, filtered)
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
    function request() { return { type: doctorExperienceConstants.DR_EXP_FETCH_REQUEST } }
    function success(result) { return { type: doctorExperienceConstants.DR_EXP_FETCH_SUCCESS, result } }
    function failure(error) { return { type: doctorExperienceConstants.DR_EXP_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        21 May 2018
* @ShortDescription      This function is responsible for submit the update form
* @param                 JSON experience, This contains single experience input data
                         JSON experienceData, This contain list of experience 
* @return                JSON Object
*/
function experienceSave(experience, experienceData) {
    return dispatch => {
        dispatch(request());
        doctorExperienceService.doExperienceUpdate(experience)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){ 
                        
                        const index = experienceData.findIndex(
                                            i => 
                                                i.doc_exp_id === experience.doc_exp_id
                                            );
                        experienceData[index] = experience;
                     
                        // Result with Message and data to transfer on Reducer
                        var result = {
                            'message'               :   data.message,
                            'experienceUpdateData'  :   experience,
                            'experienceData'        :   experienceData
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
    function request() { return { type: doctorExperienceConstants.DR_EXP_UPDATE_REQUEST } }
    function success(result) { return { type: doctorExperienceConstants.DR_EXP_UPDATE_SUCCESS, result } }
    function failure(error) { return { type: doctorExperienceConstants.DR_EXP_UPDATE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        24 May 2018
* @ShortDescription      This function is responsible for submit insert form 
* @param                 JSON experience, This contains full experience input data 
* @return                JSON Object
*/
function experienceStore(experience, experienceData) {
    return dispatch => {
        dispatch(request({ experience }));
        doctorExperienceService.doExperienceCreate(experience)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        var result = {
                            'message'               :   data.message,
                            'experienceInsertData'  :   data.result,
                            'experienceData'        :   experienceData
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
    function request() { return { type: doctorExperienceConstants.DR_EXP_ADD_REQUEST } }
    function success(result) { return { type: doctorExperienceConstants.DR_EXP_ADD_SUCCESS, result } }
    function failure(error) { return { type: doctorExperienceConstants.DR_EXP_ADD_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        24 May 2018
* @ShortDescription      This function is responsible for Delete the Experience entry 
* @param                 JSON experience, This contains full experience input data 
* @return                JSON Object
*/
function experienceDelete(doc_exp_id, experienceData) {
    return dispatch => {
        dispatch(request({ experienceData }));
        doctorExperienceService.doExperienceDelete(doc_exp_id)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        experienceData = experienceData.filter(function(experience) {
                            return experience.doc_exp_id !== doc_exp_id
                        })
                        var result = {
                            'message'               :   data.message,
                            'experienceData'        :   experienceData
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
    function request() { return { type: doctorExperienceConstants.DR_EXP_DELETE_REQUEST } }
    function success(result) { return { type: doctorExperienceConstants.DR_EXP_DELETE_SUCCESS, result } }
    function failure(error) { return { type: doctorExperienceConstants.DR_EXP_DELETE_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


/**
* @DateOfCreation        28 May 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function updateState(){
     return dispatch => {
        dispatch(request());
    }
    function request() { return { type: doctorExperienceConstants.DR_EXP_UPDATE_STATE } }
}
