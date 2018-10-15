/**
 * manageStaffActions
 *
 * @package                SafeHealth
 * @subpackage             manageStaffActions
 * @category               Actions
 * @DateOfCreation         13 June 2018
 * @ShortDescription       This is responsible for all staff actions
 */ 

import { manageStaffConstants,configConstants } from '../_constants';
import { manageStaffService } from '../_services';
import { utilityHelper } from '../_helpers';

export const manageStaffActions = {
    staffList,
    staffSave,
    staffDelete,
    resetState
};

/**
 * @DateOfCreation        13 June 2018
 * @ShortDescription      This function is responsible for staff list
 * @return                JSON Object
 */
function staffList(page, pageSize, sorted, filtered) {
    return dispatch => {
        manageStaffService.staffList(page, pageSize, sorted, filtered)
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

    function request(staffList) { return { type : manageStaffConstants.DR_STAFF_REQUEST, staffList } }
    function success(staffList) { return { type : manageStaffConstants.DR_STAFF_SUCCESS, staffList } }
    function failure(error) { return { type : manageStaffConstants.DR_STAFF_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type : configConstants.UNAUTHENTICATE, error } }
}

/**
 * @DateOfCreation              13 June 2018
 * @ShortDescription            This function is responsible for save staff detail
 * @param {object} detail       Staff detail
 * @param {array} staffList     list of all active staff
 * @return                      JSON Object in succsss message, recent saved record
 */
function staffSave(detail, staffList) {
    return dispatch => {
        manageStaffService.staffSave(detail)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE) {
                        const index = staffList.findIndex(
                                    i => 
                                        i.doc_staff_id == detail.doc_staff_id
                                    );
                        if(staffList[index]) {
                            staffList[index] = data.result;
                        }else{
                            detail['doc_staff_id'] = data.result.doc_staff_id;
                            detail['user_id'] = data.result.user_id;
                            staffList.push(data.result);
                        }
                        var successMsg = { 'message' : data.message, 'detail' : data.result, 'staff' : staffList };
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

    function success(successMsg) { return { type : manageStaffConstants.DR_STAFF_SAVE_SUCCESS, successMsg } }
    function failure(error) { return { type : manageStaffConstants.DR_STAFF_SAVE_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type : configConstants.UNAUTHENTICATE, error } }
}

/**
 * @DateOfCreation              14 June 2018
 * @ShortDescription            This function is responsible for update staff detail
 * @param {object}              staffId Staff id
 * @param {array} staffList     list of all active staff
 * @return                      JSON Object in succsss message
 */
function staffDelete(staffId, staffList) {
    return dispatch => {
        manageStaffService.staffDelete(staffId)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE) {

                        staffList = staffList.filter(function(item) {
                            return item.doc_staff_id !== staffId
                        });
                    
                        var successMsg = { 'message' : data.message, 'staffId' : staffId, 'staffList' : staffList };
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

    function success(successMsg) { return { type : manageStaffConstants.DR_STAFF_REMOVE_SUCCESS, successMsg } }
    function failure(error) { return { type : manageStaffConstants.DR_STAFF_REMOVE_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type : configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        14 June 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function resetState() {
    return dispatch => { dispatch(request()); }
    function request() { return { type : manageStaffConstants.DR_STAFF_RESET_STATE } }
}