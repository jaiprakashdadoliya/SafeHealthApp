import {regionConstants,configConstants } from '../_constants';
import {regionService } from '../_services';
import { utilityHelper } from '../_helpers';

/**
 * regionActions
 *
 * @package                ILD INDIA REGISTRY
 * @subpackage             regionActions
 * @category               Actions
 * @DateOfCreation         14 june 2018
 * @ShortDescription       This is responsible for all region actions
 */ 
export const regionActions = {
    getStates,
    getCities,
    getCountry,
};

/**
* @DateOfCreation        14 june 2018
* @ShortDescription      This function is responsible for country list
* @return                JSON Object
*/
function getCountry() {
    return dispatch => {
         dispatch(request());
        regionService.getCountry()
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
    function request() { return { type: regionConstants.COUNTRY_REQUEST } }
    function success(country) { return { type: regionConstants.COUNTRY_SUCCESS, country} }
    function failure(error) { return { type: regionConstants.COUNTRY_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        14 JUNE 2018
* @ShortDescription      This function is responsible for state list
* @return                JSON Object
*/
function getStates(country_id) {
    return dispatch => {
         dispatch(request(country_id));
        regionService.getStates(country_id)
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
    function request(country_id) { return { type: regionConstants.STATES_REQUEST,country_id } }
    function success(states) { return { type: regionConstants.STATES_SUCCESS, states} }
    function failure(error) { return { type: regionConstants.STATES_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        14 June 2018
* @ShortDescription      This function is responsible for city list
* @return                JSON Object
*/
function getCities(state_id) {
    return dispatch => {
        dispatch(request(state_id));
        regionService.getCities(state_id)
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
    function request(state_id) { return { type: regionConstants.CITIES_REQUEST,state_id } }
    function success(cities) { return { type: regionConstants.CITIES_SUCCESS, cities} }
    function failure(error) { return { type: regionConstants.CITIES_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}



/**
* @DateOfCreation        14 June 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function resetState(){
    return dispatch => { dispatch(request());}
    function request() { return { type: regionConstants.RESET_STATE } }
}

/**
* @DateOfCreation        14 June 2018
* @ShortDescription      This function is responsible to update the city and props
* @return                JSON Object
*/
function resetCity(){
    return dispatch => { dispatch(request());}
    function request() { return { type: regionConstants.RESET_CITY } }
}