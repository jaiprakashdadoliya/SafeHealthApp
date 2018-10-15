import { doctorRegistrationConstants,configConstants } from '../_constants';
import { doctorRegistrationService } from '../_services';
import { utilityHelper } from '../_helpers';

/**
 * doctorRegistrationActions
 *
 * @package                SafeHealth
 * @subpackage             doctorRegistrationActions
 * @category               Actions
 * @DateOfCreation         11 May 2018
 * @ShortDescription       This is responsible for all registration actions
 */
export const doctorRegistrationActions = {
    sendOTP,
    registrationSubmit,
    resetRegisteration
};


/**
* @DateOfCreation        11 May 2018
* @ShortDescription      This function is responsible for sending otp
* @param                 JSON doctor, This contains full user input data 
* @return                JSON Object
*/
function sendOTP(doctor, isotpsentReq) {
    return dispatch => {
        dispatch(request({ doctor }, {isotpsentReq}));
        doctorRegistrationService.doDoctorRegistration(doctor)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        dispatch(success(data.message));
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg = utilityHelper.getFirstErrorMessage(data.error);
                        dispatch(failure(errorMsg, isotpsentReq));
                    }else if(data.code == configConstants.EXCEPTION_CODE){ 
                        dispatch(failure(data.message, isotpsentReq));
                    }else{
                        dispatch(failure(response, isotpsentReq));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response, isotpsentReq));
            });
    };

    function request(doctor, isotpsentReq) { return { type: doctorRegistrationConstants.DR_OTP_REQUEST, doctor, isotpsent:isotpsentReq } }
    function success(message) { return { type: doctorRegistrationConstants.DR_OTP_SUCCESS, isotpsent: true, successMsg:message } }
    function failure(error, isotpsentReq) { return { type: doctorRegistrationConstants.DR_OTP_FAILURE, errorMsg:error, isotpsent:isotpsentReq } }
}

/**
* @DateOfCreation        11 May 2018
* @ShortDescription      This function is responsible for final registration and check otp
* @param                 JSON doctor, This contains full user input data 
* @return                JSON Object
*/
function registrationSubmit(doctor) {
    return dispatch => {
        dispatch(request({ doctor }));
        doctorRegistrationService.doDoctorRegistration(doctor)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        dispatch(success(errorMsg));                        
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
                dispatch(failure(response));
            });
    };

    function request(doctor) { return { type: doctorRegistrationConstants.DR_REG_REQUEST,isotpsent:true, doctor } }
    function success(doctor) { return { type: doctorRegistrationConstants.DR_REG_SUCCESS,registrationDone: true, isotpsent:true } }
    function failure(error) { 
        return { 
            type: doctorRegistrationConstants.DR_REG_FAILURE, 
            errorMsg:error, 
            registrationDone:false,
            isotpsent:true
        }
    }
}

/**
* @DateOfCreation        16 May 2018
* @ShortDescription      This function is responsible for reseting registration state
* @param                 No Input 
* @return                JSON Object
*/
function resetRegisteration(){
     return { type: doctorRegistrationConstants.CLICK_DR_REGISTER, isotpsent: false, sendingotp:false }
}
