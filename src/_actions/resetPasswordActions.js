import { resetConstants, configConstants } from '../_constants';
import { resetPasswordService } from '../_services';
import { utilityHelper, history } from '../_helpers';
import { Cookies } from 'react-cookie';

/**
 * resetPasswordActions
 *
 * @package                SafeHealth
 * @subpackage             resetPasswordActions
 * @category               Actions
 * @DateOfCreation         15 May 2018
 * @ShortDescription       This is responsible to handle all action related 
                           to Reset password
 */
export const resetPasswordActions = {
    resetSubmit
};

/**
* @DateOfCreation        15 May 2018
* @ShortDescription      This function is responsible for submit the Reset password form
* @param                 JSON user, This contains full user input data 
* @return                JSON Object
*/
function resetSubmit(user) {
    return dispatch => {
        dispatch(request({ user }));
        resetPasswordService.resetPassword(user)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        dispatch(success(user));
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg = utilityHelper.getFirstErrorMessage(data.error);
                        dispatch(failure(errorMsg));
                    }else if(data.code == configConstants.EXCEPTION_CODE){
                        dispatch(failure(data.message));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response.message));
            });
    };
// Actions defination that will perform according dispatch call and send data to reducer
    function request(user)   { return   { type  : resetConstants.RESET_REQUEST, user } }
    function success(result) { return   { type  : resetConstants.RESET_SUCCESS, result } }
    function failure(error)  { return   { type  : resetConstants.RESET_FAILURE, error } }
}

