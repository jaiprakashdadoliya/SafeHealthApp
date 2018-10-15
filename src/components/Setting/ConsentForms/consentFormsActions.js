import { configConstants } from './../../../_constants';
import { consentFormsConstants } from './consentFormsConstants';
import { consentFormsService } from './consentFormsService';
import { utilityHelper } from './../../../_helpers';

/**
 * consentFormsActions
 *
 * @package                SafeHealth
 * @subpackage             consentFormsActions
 * @category               Actions
 * @DateOfCreation         21 May 2018
 * @ShortDescription       This is responsible for all consentForm actions
 */ 
export const consentFormsActions = {
    consentFormList,
    consentFormSave,
    consentFormDelete,
    resetState
};

/**
* @DateOfCreation        21 May 2018
* @ShortDescription      This function is responsible for consentForm list
* @return                JSON Object
*/
function consentFormList() {
    return dispatch => {
         dispatch(request());
        consentFormsService.consentFormList()
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
                dispatch(failure(response));
            });
    };
    function request() { return { type: consentFormsConstants.DR_CF_REQUEST } }
    function success(consentForms) { return { type: consentFormsConstants.DR_CF_SUCCESS, consentForms} }
    function failure(error) { return { type: consentFormsConstants.DR_CF_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        21 May 2018
* @ShortDescription      This function is responsible for save consentForm detail
* @param {object} detail Membership detail
* @param {array} consentFormList  list of all active consentForm
* @return                JSON Object in succsss message, recent saved record
*/
function consentFormSave(detail, consentFormList) {
    return dispatch => {
         dispatch(request());
        consentFormsService.consentFormSave(detail)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        if(detail.consent_form_id != ""){
                            const index = consentFormList.findIndex(i => i.consent_form_id === detail.consent_form_id);
                            consentFormList[index] = detail;
                        }else{
                            detail['consent_form_id'] = data.result.consent_form_id;
                            consentFormList.push(detail);
                        }
                        var successMsg = {'message':data.message,'detail':data.result,'consentForm':consentFormList};
                        dispatch(success(successMsg));
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg = utilityHelper.getFirstErrorMessage(data.error);
                        dispatch(failure(errorMsg));
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
    function request() { return { type: consentFormsConstants.DR_CF_ADD_REQUEST } }
    function success(successMsg) { return { type: consentFormsConstants.DR_CF_ADD_SUCCESS, successMsg} }
    function failure(error) { return { type: consentFormsConstants.DR_CF_ADD_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        21 May 2018
* @ShortDescription      This function is responsible for update consentForm detail
* @param {object} consentFormId Membership id
* @param {array} consentFormList  list of all active consentForm
* @return                JSON Object in succsss message
*/
function consentFormDelete(consentFormId, consentFormList) {
    return dispatch => {
         dispatch(request());
        consentFormsService.consentFormDelete(consentFormId)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        consentFormList = consentFormList.filter(function(item) {
                            return item.consent_form_id !== consentFormId
                        })
                        var successMsg = {'message':data.message,'consentFormId':consentFormId,'consentForm':consentFormList};
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
    function request() { return { type: consentFormsConstants.DR_CF_REMOVE_REQUEST } }
    function success(successMsg) { return { type: consentFormsConstants.DR_CF_REMOVE_SUCCESS, successMsg} }
    function failure(error) { return { type: consentFormsConstants.DR_CF_REMOVE_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


/**
* @DateOfCreation        28 May 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function resetState(){
    return dispatch => { dispatch(request());}
    function request() { return { type: consentFormsConstants.DR_CF_RESET_STATE } }
}
