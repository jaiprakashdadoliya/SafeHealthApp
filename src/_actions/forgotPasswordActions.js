import { forgotConstants, configConstants } from '../_constants';
import { forgotPasswordService } from '../_services';
import { utilityHelper, history } from '../_helpers';
import { Cookies } from 'react-cookie';

/**
 * forgotPasswordActions
 *
 * @package                SafeHealth
 * @subpackage             forgotPasswordActions
 * @category               Actions
 * @DateOfCreation         15 May 2018
 * @ShortDescription       This is responsible to handle all action related to Forgot password
 */
export const forgotPasswordActions = {
    forgotSubmit,
    updateState
};

/**
* @DateOfCreation        15 May 2018
* @ShortDescription      This function is responsible for submit the forgot password form
* @param                 JSON user, This contains full user input data 
* @return                JSON Object
*/
function forgotSubmit(user) {
    return dispatch => {
        dispatch(request({ user }));
        forgotPasswordService.getResetToken(user)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        var successMsg = data.message;
                        dispatch(success(successMsg));
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg = utilityHelper.getFirstErrorMessage(data.error);
                        dispatch(failure(errorMsg));
                    }else if(data.code == configConstants.EXCEPTION_CODE){
                        var errorMsg = data.message;
                        dispatch(failure(errorMsg));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response.message));
            });
    };
    
    // Actions defination that will perform according dispatch call and send data to reducer
    function request(user)   { return   { type  : forgotConstants.FORGOT_REQUEST, user } }
    function success(success) { return   { type  : forgotConstants.FORGOT_SUCCESS, success } }
    function failure(error)  { return   { type  : forgotConstants.FORGOT_FAILURE, error } }
}

/**
* @DateOfCreation        15 June 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function updateState(){
     return dispatch => {
        dispatch(request());
    }
    function request() { return { type: forgotConstants.FORGOT_UPDATE_STATE } }
}