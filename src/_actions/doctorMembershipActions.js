import { doctorMembershipConstants,configConstants } from '../_constants';
import { doctorMembershipService } from '../_services';
import { utilityHelper } from '../_helpers';

/**
 * doctorMembershipActions
 *
 * @package                SafeHealth
 * @subpackage             doctorMembershipActions
 * @category               Actions
 * @DateOfCreation         21 May 2018
 * @ShortDescription       This is responsible for all membership actions
 */ 
export const doctorMembershipActions = {
    membershipList,
    membershipUpdate,
    membershipSave,
    membershipDelete,
    resetState
};

/**
* @DateOfCreation        21 May 2018
* @ShortDescription      This function is responsible for member list
* @return                JSON Object
*/
function membershipList(page, pageSize, sorted, filtered) {
    return dispatch => {
         dispatch(request());
        doctorMembershipService.membershipList(page, pageSize, sorted, filtered)
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
    function request() { return { type: doctorMembershipConstants.DR_MEM_REQUEST } }
    function success(membership) { return { type: doctorMembershipConstants.DR_MEM_SUCCESS, membership} }
    function failure(error) { return { type: doctorMembershipConstants.DR_MEM_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        21 May 2018
* @ShortDescription      This function is responsible for save membership detail
* @param {object} detail Membership detail
* @param {array} membershipList  list of all active membership
* @return                JSON Object in succsss message, recent saved record
*/
function membershipSave(detail, membershipList) {    
    return dispatch => {
         dispatch(request());
        doctorMembershipService.membershipSave(detail)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        var successMsg = {'message':data.message,'detail':data.result,'membership':membershipList};
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
    function request() { return { type: doctorMembershipConstants.DR_MEM_ADD_REQUEST } }
    function success(successMsg) { return { type: doctorMembershipConstants.DR_MEM_ADD_SUCCESS, successMsg} }
    function failure(error) { return { type: doctorMembershipConstants.DR_MEM_ADD_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        21 May 2018
* @ShortDescription      This function is responsible for update membership detail
* @param {object} detail Membership detail
* @param {array} membershipList  list of all active membership
* @return                JSON Object in succsss message
*/
function membershipUpdate(detail, membershipList) {
    return dispatch => {
         dispatch(request());
        doctorMembershipService.membershipUpdate(detail)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                    const index = membershipList.findIndex(i => i.doc_mem_id === detail.doc_mem_id);
                        membershipList[index] = detail;
                        var successMsg = {'message':data.message,'detail':detail,'membership':membershipList};
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
    function request() { return { type: doctorMembershipConstants.DR_MEM_EDIT_REQUEST } }
    function success(successMsg) { return { type: doctorMembershipConstants.DR_MEM_EDIT_SUCCESS, successMsg} }
    function failure(error) { return { type: doctorMembershipConstants.DR_MEM_EDIT_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        21 May 2018
* @ShortDescription      This function is responsible for update membership detail
* @param {object} membershipId Membership id
* @param {array} membershipList  list of all active membership
* @return                JSON Object in succsss message
*/
function membershipDelete(membershipId, membershipList) {
    return dispatch => {
         dispatch(request());
        doctorMembershipService.membershipDelete(membershipId)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        membershipList = membershipList.filter(function(item) {
                            return item.doc_mem_id !== membershipId
                        })
                        var successMsg = {'message':data.message,'membershipId':membershipId,'membership':membershipList};
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
    function request() { return { type: doctorMembershipConstants.DR_MEM_REMOVE_REQUEST } }
    function success(successMsg) { return { type: doctorMembershipConstants.DR_MEM_REMOVE_SUCCESS, successMsg} }
    function failure(error) { return { type: doctorMembershipConstants.DR_MEM_REMOVE_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


/**
* @DateOfCreation        28 May 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function resetState(){
    return dispatch => { dispatch(request());}
    function request() { return { type: doctorMembershipConstants.DR_MEM_RESET_STATE } }
}
