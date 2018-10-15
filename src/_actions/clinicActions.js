/**
 * clinicActions
 *
 * @package                SafeHealth
 * @subpackage             clinicActions
 * @category               Actions
 * @DateOfCreation         13 June 2018
 * @ShortDescription       This is responsible for all clinic actions
 */ 

import { clinicConstants,configConstants } from '../_constants';
import { clinicService } from '../_services';
import { utilityHelper } from '../_helpers';

export const clinicActions = {
    clinicList,
    clinicSave,
    clinicDelete,
    resetState
};

/**
 * @DateOfCreation        13 June 2018
 * @ShortDescription      This function is responsible for clinic list
 * @return                JSON Object
 */
function clinicList(page, pageSize, sorted, filtered) {
    return dispatch => {
        clinicService.clinicList(page, pageSize, sorted, filtered)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE) {
                        dispatch(success(data.result));
                    }else if(data.code == configConstants.ERROR_CODE) {
                        dispatch(failure(data.message));
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

    function request(clinicList) { return { type : clinicConstants.DR_CLINIC_REQUEST, clinicList } }
    function success(clinicList) { return { type : clinicConstants.DR_CLINIC_SUCCESS, clinicList } }
    function failure(error) { return { type : clinicConstants.DR_CLINIC_FAILURE, error } }
    function unauthorize(error) { return { type : configConstants.UNAUTHENTICATE, error } }
}

/**
 * @DateOfCreation              13 June 2018
 * @ShortDescription            This function is responsible for save clinic detail
 * @param {object} detail       Clinic detail
 * @param {array} clinicList     list of all active clinic
 * @return                      JSON Object in succsss message, recent saved record
 */
function clinicSave(detail, clinicList) {
    return dispatch => {
        clinicService.clinicSave(detail)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE) {
                        const index = clinicList.findIndex(
                                    i => 
                                        i.clinic_id == detail.clinic_id
                                    );
                        if(clinicList[index]) {
                            clinicList[index] = detail;
                        }else{
                            detail['clinic_id'] = data.result.clinic_id;
                            clinicList.push(detail);
                        }
                        var successMsg = { 'message' : data.message, 'detail' : data.result, 'clinic' : clinicList };
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

    function success(successMsg) { return { type : clinicConstants.DR_CLINIC_SAVE_SUCCESS, successMsg } }
    function failure(error) { return { type : clinicConstants.DR_CLINIC_SAVE_FAILURE, error } }
    function unauthorize(error) { return { type : configConstants.UNAUTHENTICATE, error } }
}

/**
 * @DateOfCreation              14 June 2018
 * @ShortDescription            This function is responsible for update clinic detail
 * @param {object}              clinicId Clinic id
 * @param {array} clinicList     list of all active clinic
 * @return                      JSON Object in succsss message
 */
function clinicDelete(clinicId, clinicList) {
    return dispatch => {
        clinicService.clinicDelete(clinicId)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE) {

                        clinicList = clinicList.filter(function(item) {
                            return item.clinic_id !== clinicId
                        });
                    
                        var successMsg = { 'message' : data.message, 'clinicId' : clinicId, 'clinicList' : clinicList };
                        dispatch(success(successMsg));
                    }else if(data.code == configConstants.ERROR_CODE) {
                        dispatch(failure(data.message));
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

    function success(successMsg) { return { type : clinicConstants.DR_CLINIC_REMOVE_SUCCESS, successMsg } }
    function failure(error) { return { type : clinicConstants.DR_CLINIC_REMOVE_FAILURE, error } }
    function unauthorize(error) { return { type : configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        14 June 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function resetState() {
    return dispatch => { dispatch(request()); }
    function request() { return { type : clinicConstants.DR_CLINIC_RESET_STATE } }
}