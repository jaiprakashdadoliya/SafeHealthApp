import { doctorProfileConstants,configConstants } from '../_constants';
import { doctorProfileService } from '../_services';
import { utilityHelper } from '../_helpers';

/**
 * doctorMembershipActions
 *
 * @package                SafeHealth
 * @subpackage             doctorMembershipActions
 * @category               Actions
 * @DateOfCreation         21 May 2018
 * @ShortDescription       This is responsible for all membership actions
 */ 
export const doctorProfileActions = {
    getProfileDetail,
    profileUpdate,
    updateProfileImage,
    getStates,
    getCities,
    resetState
};

/**
* @DateOfCreation        21 May 2018
* @ShortDescription      This function is responsible for profile detail
* @return                JSON Object
*/
function getProfileDetail() {
    return dispatch => {
         dispatch(request());
        doctorProfileService.getProfileDetail()
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
    function request() { return { type: doctorProfileConstants.DR_PROFILE_DETAIL_REQUEST } }
    function success(detail) { return { type: doctorProfileConstants.DR_PROFILE_DETAIL_SUCCESS, detail} }
    function failure(error) { return { type: doctorProfileConstants.DR_PROFILE_DETAIL_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        21 May 2018
* @ShortDescription      This function is responsible for update membership detail
* @param {object} detail Membership detail
* @param {array} membershipList  list of all active membership
* @return                JSON Object in succsss message
*/
function updateProfileImage(profileImage) {
    return dispatch => {
        doctorProfileService.updateProfileImage(profileImage)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        utilityHelper.setUpdatedProfileImage(data.result);
                        var successMsg = {'message':data.message,'doc_profile_img':data.result};
                        dispatch(success(successMsg));
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
    function success(successMsg) { return { type: doctorProfileConstants.DR_PROFILE_UPDATE_SUCCESS, successMsg} }
    function failure(error) { return { type: doctorProfileConstants.DR_PROFILE_UPDATE_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}



/**
* @DateOfCreation        21 May 2018
* @ShortDescription      This function is responsible for update membership detail
* @param {object} detail Membership detail
* @param {array} membershipList  list of all active membership
* @return                JSON Object in succsss message
*/
function profileUpdate(newDetail) {
    return dispatch => {
        doctorProfileService.profileUpdate(newDetail)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){
                        utilityHelper.setUpdatedProfile(data.result); //set updated profile
                        var detail = {'message':data.message,'newDetail':data.result};
                        dispatch(success(detail));
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
    function success(detail) { return { type: doctorProfileConstants.DR_PROFILE_EDIT_SUCCESS, detail} }
    function failure(error) { return { type: doctorProfileConstants.DR_PROFILE_EDIT_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}





/**
* @DateOfCreation        21 May 2018
* @ShortDescription      This function is responsible for state list
* @return                JSON Object
*/
function getStates() {
    return dispatch => {
         dispatch(request());
        doctorProfileService.getStates()
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
    function request() { return { type: doctorProfileConstants.STATES_REQUEST } }
    function success(states) { return { type: doctorProfileConstants.STATES_SUCCESS, states} }
    function failure(error) { return { type: doctorProfileConstants.STATES_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        21 May 2018
* @ShortDescription      This function is responsible for state list
* @return                JSON Object
*/
function getCities(state_id) {
    return dispatch => {
        dispatch(request(state_id));
        doctorProfileService.getCities(state_id)
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
    function request(state_id) { return { type: doctorProfileConstants.CITIES_REQUEST,state_id } }
    function success(cities) { return { type: doctorProfileConstants.CITIES_SUCCESS, cities} }
    function failure(error) { return { type: doctorProfileConstants.CITIES_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}



/**
* @DateOfCreation        28 May 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function resetState(){
    return dispatch => { dispatch(request());}
    function request() { return { type: doctorProfileConstants.DR_PROFILE_RESET_STATE } }
}
