import { doctorDegreeConstants,configConstants } from '../_constants';
import { doctorDegreeService } from '../_services';
import { utilityHelper } from '../_helpers';

/**
 * doctorDegreeActions
 *
 * @package                SafeHealth
 * @subpackage             doctorDegreeActions
 * @category               Actions
 * @DateOfCreation         31 May 2018
 * @ShortDescription       This is responsible for all degree actions
 */ 
export const doctorDegreeActions = {
    degreeList,
    degreeUpdate,
    degreeSave,
    degreeDelete,
    resetState
};

/**
* @DateOfCreation        31 May 2018
* @ShortDescription      This function is responsible for degree list
* @return                JSON Object
*/
function degreeList(page, pageSize, sorted, filtered) {
    return dispatch => {
        doctorDegreeService.degreeList(page, pageSize, sorted, filtered)
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
    function request(degree) { return { type: doctorDegreeConstants.DR_DEG_REQUEST, degree } }
    function success(degrees) { return { type: doctorDegreeConstants.DR_DEG_SUCCESS, degrees} }
    function failure(error) { return { type: doctorDegreeConstants.DR_DEG_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        31 May 2018
* @ShortDescription      This function is responsible for save degree detail
* @param {object} detail degree detail
* @param {array} degreeList  list of all active degree
* @return                JSON Object in succsss message, recent saved record
*/
function degreeSave(detail, degreeList) {    
    return dispatch => {
        doctorDegreeService.degreeSave(detail)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        var successMsg = {'message':data.message,'detail':data.result,'degree':degreeList};
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
    function success(successMsg) { return { type: doctorDegreeConstants.DR_DEG_ADD_SUCCESS, successMsg} }
    function failure(error) { return { type: doctorDegreeConstants.DR_DEG_ADD_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        31 May 2018
* @ShortDescription      This function is responsible for update degree detail
* @param {object} detail degree detail
* @param {array} degreeList  list of all active degree
* @return                JSON Object in succsss message
*/
function degreeUpdate(detail, degreeList) {
    return dispatch => {
        doctorDegreeService.degreeUpdate(detail)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                    const index = degreeList.findIndex(i => i.doc_deg_id === detail.doc_deg_id);
                        degreeList[index] = detail;
                        var successMsg = {'message':data.message,'detail':detail,'degrees':degreeList};
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
    function success(successMsg) { return { type: doctorDegreeConstants.DR_DEG_EDIT_SUCCESS, successMsg} }
    function failure(error) { return { type: doctorDegreeConstants.DR_DEG_EDIT_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        31 May 2018
* @ShortDescription      This function is responsible for update degree detail
* @param {object} degreeId degree id
* @param {array} degreeList  list of all active degree
* @return                JSON Object in succsss message
*/
function degreeDelete(degreeId, degreeList) {
    return dispatch => {
        doctorDegreeService.degreeDelete(degreeId)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        degreeList = degreeList.filter(function(item) {
                            return item.doc_deg_id !== degreeId
                        })
                        var successMsg = {'message':data.message,'degreeId':degreeId,'degrees':degreeList};
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
    function success(successMsg) { return { type: doctorDegreeConstants.DR_DEG_REMOVE_SUCCESS, successMsg} }
    function failure(error) { return { type: doctorDegreeConstants.DR_DEG_REMOVE_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


/**
* @DateOfCreation        28 May 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function resetState(){
    return dispatch => { dispatch(request());}
    function request() { return { type: doctorDegreeConstants.DR_DEG_RESET_STATE } }
}
