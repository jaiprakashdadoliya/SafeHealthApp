import { configConstants } from '../../../_constants';
import { visitComponentsConstants } from './visitComponentsConstants';
import { visitComponentsService } from './visitComponentsService';
import { utilityHelper } from '../../../_helpers';
/**
 * visitComponentsActions
 *
 * @package                SafeHealth
 * @subpackage             visitComponentsActions
 * @category               Actions
 * @DateOfCreation         22 August 2018
 * @ShortDescription       This is responsible for all patient group actions
 */ 
export const visitComponentsActions = {
    getList,
    updateVisitSetting,
    resetState
};

/**
* @DateOfCreation        22 August 2018
* @ShortDescription      This function is responsible for patient group list
* @return                JSON Object
*/
function getList(page, pageSize, sorted, filtered) {

    return dispatch => {
         dispatch(request());
        visitComponentsService.getList(page, pageSize, sorted, filtered)
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
    function request() { return { type: visitComponentsConstants.VIS_CMP_REQUEST } }
    function success(visitComponentsList) { return { type: visitComponentsConstants.VIS_CMP_SUCCESS, visitComponentsList} }
    function failure(error) { return { type: visitComponentsConstants.VIS_CMP_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


/**
* @DateOfCreation        22 August 2018
* @ShortDescription      This function is responsible for patient group list
* @return                JSON Object
*/
function updateVisitSetting(visitComponent) {

    return dispatch => {
         dispatch(request());
         visitComponentsService.updateVisitSetting(visitComponent)
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
    function request() { return { type: visitComponentsConstants.VIS_CMP_SET_REQUEST } }
    function success(visitComponentSetting) { return { type: visitComponentsConstants.VIS_CMP_SET_SUCCESS, visitComponentSetting} }
    function failure(error) { return { type: visitComponentsConstants.VIS_CMP_SET_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


/**
* @DateOfCreation        22 August 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function resetState(){
    return dispatch => { dispatch(request());}
    function request() { return { type: visitComponentsConstants.VIS_CMP_RESET_STATE } }
}
