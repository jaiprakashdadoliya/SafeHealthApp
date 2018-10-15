import { configConstants } from '../../_constants';
import { searchConstants } from './searchConstants';
import { searchService } from './searchService';
import { utilityHelper, history } from '../../_helpers';
import { Cookies } from 'react-cookie';

/**
 * searchActions
 *
 * @package                SafeHealth
 * @subpackage             searchActions
 * @category               Actions
 * @DateOfCreation         12 July 2018
 * @ShortDescription       This is responsible to handle all action related to login
 */
export const searchAction = {
    getSearchCityResult,
    updateState,
    getSearchSpecialityResult
};

/**
* @DateOfCreation        12 July 2018
* @ShortDescription      This function is responsible for Get experience List
* @param                 JSON user, This contains full experience input data 
* @return                JSON Object
*/
function getSearchCityResult(query) {
    return dispatch => {
        dispatch(request());
        searchService.getSearchResult(query)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){ 
                        dispatch(success(data.result));                        
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg = utilityHelper.getFirstErrorMessage(data.error);
                        dispatch(failure(errorMsg));
                    }else if(data.code == configConstants.EXCEPTION_CODE){
                        errorMsg = data.message;
                        dispatch(failure(errorMsg));
                    }else if(data.code == configConstants.UNAUTHENTICATE_CODE){
                        var errorMsg = data.message;
                        dispatch(unauthorize(errorMsg));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };

// Actions defination that will perform according dispatch call and send data to reducer
    function request() { return { type: searchConstants.SEARCH_CITY_FETCH_REQUEST } }
    function success(result) { return { type: searchConstants.SEARCH_CITY_FETCH_SUCCESS, result } }
    function failure(error) { return { type: searchConstants.SEARCH_CITY_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}


/**
* @DateOfCreation        12 July 2018
* @ShortDescription      This function is responsible for Get experience List
* @param                 JSON user, This contains full experience input data 
* @return                JSON Object
*/
function getSearchSpecialityResult(city_id,search = '') {
    return dispatch => {
        dispatch(request());
        searchService.getSearchSpecialisationResult(city_id, search)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){  
                        dispatch(success(data.result));                        
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg = utilityHelper.getFirstErrorMessage(data.error);
                        dispatch(failure(errorMsg));
                    }else if(data.code == configConstants.EXCEPTION_CODE){
                        errorMsg = data.message;
                        dispatch(failure(errorMsg));
                    }else if(data.code == configConstants.UNAUTHENTICATE_CODE){
                        var errorMsg = data.message;
                        dispatch(unauthorize(errorMsg));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };

// Actions defination that will perform according dispatch call and send data to reducer
    function request() { return { type: searchConstants.SEARCH_SP_FETCH_REQUEST } }
    function success(result) { return { type: searchConstants.SEARCH_SP_FETCH_SUCCESS, result } }
    function failure(error) { return { type: searchConstants.SEARCH_SP_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}




/**
* @DateOfCreation        28 May 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function updateState(){
     return dispatch => {
        dispatch(request());
    }
    function request() { return { type: searchConstants.SEARCH_UPDATE_STATE } }
}

