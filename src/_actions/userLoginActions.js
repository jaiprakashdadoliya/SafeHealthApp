import { loginConstants, configConstants } from '../_constants';
import { userLoginService } from '../_services';
import { loginMessagesActions } from './';
import { utilityHelper, history } from '../_helpers';
import { Cookies } from 'react-cookie';
import { sessionService } from '../_packages/redux-react-session';

/**
 * userLoginActions
 *
 * @package                SafeHealth
 * @subpackage             userLoginActions
 * @category               Actions
 * @DateOfCreation         10 May 2018
 * @ShortDescription       This is responsible to handle all action related to login
 */
export const userLoginActions = {
    loginSubmit,
    updateState 
};

/**
* @DateOfCreation        10 May 2018
* @ShortDescription      This function is responsible for submit the login form
* @param                 JSON user, This contains full user input data 
* @return                JSON Object
*/
function loginSubmit(user) {
    return dispatch => {
        dispatch(request({ user }));
        userLoginService.login(user)
            .then(
                response => { 
                    var data = response.data;

                    if(data.code == configConstants.SUCCESS_CODE){                        
                        // Set access token and user in cookies 
                        sessionService.saveSession(data.result.accessToken);
                        sessionService.saveUser(response.data.result.user);
                        dispatch(success(user));                        
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg = utilityHelper.getFirstErrorMessage(data.error);
                        dispatch(failure(errorMsg));
                    }else if(data.code == configConstants.EXCEPTION_CODE){
                        var errorMsg  = data.message;
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
    function request(user) { return { type: loginConstants.LOGIN_REQUEST, user } }
    function success(result) { return { type: loginConstants.LOGIN_SUCCESS, result } }
    function failure(error) { return { type: loginConstants.LOGIN_FAILURE, error } }
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
    function request() { return { type: loginConstants.LOGIN_UPDATE_STATE } }
}

