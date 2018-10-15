import { visitDataConstants, configConstants } from '../_constants';
import { visitDataService } from '../_services';
import { utilityHelper } from '../_helpers';

/**
 * staticDataActions
 *
 * @package                ILD INDIA REGISTRY
 * @subpackage             staticDataActions
 * @category               Actions
 * @DateOfCreation         22 june 2018
 * @ShortDescription       This is responsible for all static Data actions
 */ 
export const visitDataActions = {
    getStaticForm,
    newVisitFormSubmit,
    resetState,
    getComponents,
    getVisitComponents
};

/**
* @DateOfCreation        07 August 2018
* @ShortDescription      This function is responsible for get all component which need to load
* @return                JSON Object
*/
function getVisitComponents(visitId, visitNumber) {
    return dispatch => {
        dispatch(request());
        visitDataService.getVisitComponents(visitId, visitNumber)
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
                dispatch(failure(response.message));
            });
    };
    function request() { return { type: visitDataConstants.VISIT_COMPOMENTS_REQUEST } }
    function success(result) { return { type: visitDataConstants.VISIT_COMPOMENTS_SUCCESS, result} }
    function failure(error) { return { type: visitDataConstants.VISIT_COMPOMENTS_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        14 june 2018
* @ShortDescription      This function is responsible for get all static data array list
* @return                JSON Object
*/
function getStaticForm(patId, visitId) {
    return dispatch => {
        dispatch(request());
        visitDataService.getStaticFormRequest(patId, visitId)
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
                dispatch(failure(response.message));
            });
    };
    function request() { return { type: visitDataConstants.VISIT_DATA_REQUEST } }
    function success(result) { return { type: visitDataConstants.VISIT_DATA_SUCCESS, result} }
    function failure(error) { return { type: visitDataConstants.VISIT_DATA_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        6 July 2018
* @ShortDescription      This function is responsible for get all static data array list
* @return                JSON Object
*/
function newVisitFormSubmit(patientVisit) {
    return dispatch => {
        dispatch(request(patientVisit));
        visitDataService.submitNewVisitFormRequest(patientVisit)
            .then(
                response => { 
                    var data = response.data;

                    if(data.code == configConstants.SUCCESS_CODE){
                        var result = {
                            'message'           : data.message,
                            'patientVisitData'  : patientVisit
                        };
                        dispatch(success(result));
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
                dispatch(failure(response.message));
            });
    };
    function request(visitData) { return { type: visitDataConstants.VISIT_UPDATE_DATA_REQUEST, patientVisit } }
    function success(result) { return { type: visitDataConstants.VISIT_UPDATE_DATA_SUCCESS, result} }
    function failure(error) { return { type: visitDataConstants.VISIT_UPDATE_DATA_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


/**
* @DateOfCreation        14 june 2018
* @ShortDescription      This function is responsible for get all static data array list
* @return                JSON Object
*/
function getComponents() {
    return dispatch => {
        dispatch(request());
        visitDataService.getComponents()
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
                dispatch(failure(response.message));
            });
    };
    function request() { return { type: visitDataConstants.VISIT_COMPONENTS_DATA_REQUEST } }
    function success(result) { return { type: visitDataConstants.VISIT_COMPONENTS_DATA_SUCCESS, result} }
    function failure(error) { return { type: visitDataConstants.VISIT_COMPONENTS_DATA_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}
/**
* @DateOfCreation        28 May 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function resetState(visitStatus){
    return dispatch => { dispatch(request(visitStatus));}
    function request(visitStatus) { return { type: visitDataConstants.VISIT_RESET_STATE, visitStatus } 
    }
}