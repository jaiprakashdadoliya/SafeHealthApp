import { changePasswordConstants, configConstants } from '../_constants';
import { changePasswordService } from '../_services';
import { utilityHelper } from '../_helpers';

/**
 * changePasswordActions
 *
 * @package                SafeHealth
 * @subpackage             changePasswordActions
 * @category               Actions
 * @DateOfCreation         15 May 2018
 * @ShortDescription       This is responsible to handle all action related to change password
 */
export const changePasswordActions = {
    passwordUpdate,
    resetState
};

/**
* @DateOfCreation        15 May 2018
* @ShortDescription      This function is responsible for submit the change password form
* @param                 JSON user, This contains full user input data 
* @return                JSON Object
*/
function passwordUpdate(passwordDetail) {
    return dispatch => {
        changePasswordService.passwordUpdate(passwordDetail)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        var successMsg = data.message;
                        dispatch(success(successMsg));
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg = data.message;
                        dispatch(failure(errorMsg));
                    }else if(data.code == configConstants.EXCEPTION_CODE){
                        var errorMsg = data.message;
                        dispatch(failure(errorMsg));
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
    
    // Actions defination that will perform according dispatch call and send data to reducer
    function success(success) { return { type  : changePasswordConstants.PASSWORD_SUCCESS, success } }
    function failure(error)  { return { type  : changePasswordConstants.PASSWORD_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        28 May 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function resetState(){
    return dispatch => { dispatch(request());}
    function request() { return { type: changePasswordConstants.PASSWORD_RESET } }
}

