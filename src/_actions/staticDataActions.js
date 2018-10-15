import {staticDataConstants,configConstants } from '../_constants';
import {staticDataService } from '../_services';
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
export const staticDataActions = {
    getStaticData,
};

/**
* @DateOfCreation        14 june 2018
* @ShortDescription      This function is responsible for get all static data array list
* @return                JSON Object
*/
function getStaticData() {
    return dispatch => {
         dispatch(request());
        staticDataService.getStaticData()
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
    function request() { return { type: staticDataConstants.STATIC_DATA_REQUEST } }
    function success(result) { return { type: staticDataConstants.STATIC_DATA_SUCCESS, result} }
    function failure(error) { return { type: staticDataConstants.STATIC_DATA_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}