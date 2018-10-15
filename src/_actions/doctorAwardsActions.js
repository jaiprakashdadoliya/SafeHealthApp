/**
 * doctorAwardsActions
 *
 * @package                SafeHealth
 * @subpackage             doctorAwardsActions
 * @category               Actions
 * @DateOfCreation         21 May 2018
 * @ShortDescription       This is responsible for all awards actions
 */ 

import { doctorAwardsConstants,configConstants } from '../_constants';
import { doctorAwardsService } from '../_services';
import { utilityHelper } from '../_helpers';

export const doctorAwardsActions = {
    awardsList,
    awardSave,
    awardDelete,
    resetState
};

/**
 * @DateOfCreation        25 May 2018
 * @ShortDescription      This function is responsible for member list
 * @return                JSON Object
 */
function awardsList(page, pageSize, sorted, filtered) {
    return dispatch => {
        doctorAwardsService.awardsList(page, pageSize, sorted, filtered)
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

    function request(awards) { return { type : doctorAwardsConstants.DR_AWARDS_REQUEST, awards } }
    function success(awards) { return { type : doctorAwardsConstants.DR_AWARDS_SUCCESS, awards } }
    function failure(error) { return { type : doctorAwardsConstants.DR_AWARDS_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type : configConstants.UNAUTHENTICATE, error } }
}

/**
 * @DateOfCreation              25 May 2018
 * @ShortDescription            This function is responsible for save award detail
 * @param {object} detail       Awards detail
 * @param {array} awardsList    list of all active award
 * @return                      JSON Object in succsss message, recent saved record
 */
function awardSave(detail, awardsList) {
    return dispatch => {
        doctorAwardsService.awardSave(detail)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE) {
                        const index = awardsList.findIndex(
                                    i => 
                                        i.doc_award_id == detail.doc_award_id
                                    );
                        if(awardsList[index]) {
                            awardsList[index] = detail;
                        }else{
                            detail['doc_award_id'] = data.result.doc_award_id;
                            awardsList.push(detail);
                        }
                        var successMsg = { 'message' : data.message, 'detail' : data.result, 'awards' : awardsList };
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

    function success(successMsg) { return { type : doctorAwardsConstants.DR_AWARDS_ADD_SUCCESS, successMsg } }
    function failure(error) { return { type : doctorAwardsConstants.DR_AWARDS_ADD_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type : configConstants.UNAUTHENTICATE, error } }
}

/**
 * @DateOfCreation              27 May 2018
 * @ShortDescription            This function is responsible for update award detail
 * @param {object}              awardId Award id
 * @param {array} awardsList    list of all active awards
 * @return                      JSON Object in succsss message
 */
function awardDelete(awardId, awardsList) {
    return dispatch => {
        doctorAwardsService.awardDelete(awardId)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE) {

                        awardsList = awardsList.filter(function(item) {
                            return item.doc_award_id !== awardId
                        });
                    
                        var successMsg = { 'message' : data.message, 'awardId' : awardId, 'awards' : awardsList };
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

    function success(successMsg) { return { type : doctorAwardsConstants.DR_AWARDS_REMOVE_SUCCESS, successMsg } }
    function failure(error) { return { type : doctorAwardsConstants.DR_AWARDS_REMOVE_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type : configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        28 May 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function resetState(){
    return dispatch => { dispatch(request()); }
    function request() { return { type : doctorAwardsConstants.DR_AWARDS_RESET_STATE } }
}