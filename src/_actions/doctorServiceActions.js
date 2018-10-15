import { doctorServiceConstants,configConstants } from '../_constants';
import { doctorService } from '../_services';
import { utilityHelper } from '../_helpers';

/**
 * doctorServiceActions
 *
 * @package                SafeHealth
 * @subpackage             doctorServiceActions
 * @category               Actions
 * @DateOfCreation         21 May 2018
 * @ShortDescription       This is responsible for all service actions
 */ 
export const doctorServiceActions = {
    serviceList,
    serviceUpdate,
    serviceSave,
    serviceDelete,
    resetState
};

/**
* @DateOfCreation        21 May 2018
* @ShortDescription      This function is responsible for service list
* @return                JSON Object
*/
function serviceList(page, pageSize, sorted, filtered) {
    return dispatch => {
         dispatch(request());
        doctorService.serviceList(page, pageSize, sorted, filtered)
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
    function request() { return { type: doctorServiceConstants.DR_SRV_REQUEST } }
    function success(services) { return { type: doctorServiceConstants.DR_SRV_SUCCESS, services} }
    function failure(error) { return { type: doctorServiceConstants.DR_SRV_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        21 May 2018
* @ShortDescription      This function is responsible for save service detail
* @param {object} detail Membership detail
* @param {array} serviceList  list of all active service
* @return                JSON Object in succsss message, recent saved record
*/
function serviceSave(detail, serviceList) {    
    return dispatch => {
         dispatch(request());
        doctorService.serviceSave(detail)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        var successMsg = {'message':data.message,'detail':data.result,'service':serviceList};
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
    function request() { return { type: doctorServiceConstants.DR_SRV_ADD_REQUEST } }
    function success(successMsg) { return { type: doctorServiceConstants.DR_SRV_ADD_SUCCESS, successMsg} }
    function failure(error) { return { type: doctorServiceConstants.DR_SRV_ADD_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        21 May 2018
* @ShortDescription      This function is responsible for update service detail
* @param {object} detail Membership detail
* @param {array} serviceList  list of all active service
* @return                JSON Object in succsss message
*/
function serviceUpdate(detail, serviceList) {

    return dispatch => {
        doctorService.serviceUpdate(detail)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        const index = serviceList.findIndex(i => i.srv_id === data.result.srv_id);
                        serviceList[index] = data.result;
                        var successMsg = {'message':data.message,'detail':detail,'service':serviceList};
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
    function success(successMsg) { return { type: doctorServiceConstants.DR_SRV_EDIT_SUCCESS, successMsg} }
    function failure(error) { return { type: doctorServiceConstants.DR_SRV_EDIT_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        21 May 2018
* @ShortDescription      This function is responsible for update service detail
* @param {object} serviceId Membership id
* @param {array} serviceList  list of all active service
* @return                JSON Object in succsss message
*/
function serviceDelete(serviceId, serviceList) {
    return dispatch => {
         dispatch(request());
        doctorService.serviceDelete(serviceId)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        serviceList = serviceList.filter(function(item) {
                            return item.srv_id !== serviceId
                        })
                        var successMsg = {'message':data.message,'serviceId':serviceId,'service':serviceList};
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
    function request() { return { type: doctorServiceConstants.DR_SRV_REMOVE_REQUEST } }
    function success(successMsg) { return { type: doctorServiceConstants.DR_SRV_REMOVE_SUCCESS, successMsg} }
    function failure(error) { return { type: doctorServiceConstants.DR_SRV_REMOVE_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


/**
* @DateOfCreation        28 May 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function resetState(){
    return dispatch => { dispatch(request());}
    function request() { return { type: doctorServiceConstants.DR_SRV_RESET_STATE } }
}
