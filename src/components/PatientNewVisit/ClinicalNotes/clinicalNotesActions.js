import { configConstants } from './../../../_constants';
import { clinicalNotesConstants } from './clinicalNotesConstants';
import { clinicalNotesService } from './clinicalNotesService';
import { utilityHelper } from '../../../_helpers';

/**
 * clinicalNotes
 *
 * @package                SAFEHEALTH
 * @subpackage             clinicalNotes
 * @category               Actions
 * @DateOfCreation         21 Aug 2018
 * @ShortDescription       This is responsible for all clinical notes Data actions
 */ 
export const clinicalNotesActions = {
    getClinicalNotesList,
    clinicalNotesSubmit,
    resetState
};

/**
* @DateOfCreation        14 July 2018
* @ShortDescription      This function is responsible for get all static data array list
* @return                JSON Object
*/
function getClinicalNotesList(visitId, patId) {
    return dispatch => {
        dispatch(request());
        clinicalNotesService.getClinicalNotesRequest(visitId, patId)
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
    function request() { return { type: clinicalNotesConstants.CLINICAL_NOTES_LIST_DATA_REQUEST } }
    function success(result) { return { type: clinicalNotesConstants.CLINICAL_NOTES_LIST_DATA_SUCCESS, result} }
    function failure(error) { return { type: clinicalNotesConstants.CLINICAL_NOTES_LIST_DATA_FAILURE, errorMsg:error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        14 July 2018
* @ShortDescription      This function is responsible for submit the update form
* @param                 JSON experience, This contains single experience input data
                         JSON experienceData, This contain list of experience 
* @return                JSON Object
*/
function clinicalNotesSubmit(data) {
    return dispatch => {
        dispatch(request());
        clinicalNotesService.doClinicalNotesInsertUpdate(data)
            .then(
                response => { 
                    var data = response.data;
                    if(data.code == configConstants.SUCCESS_CODE){ 
                        var successMsg  = data.message;
                        dispatch(success(successMsg));                       
                    }else if(data.code == configConstants.ERROR_CODE){
                        var errorMsg    = data;
                        dispatch(failure(errorMsg));
                    }else if(data.code  == configConstants.EXCEPTION_CODE){
                        var errorMsg  = data.message;
                        dispatch(failure(errorMsg));
                    }else if(data.code == configConstants.UNAUTHENTICATE_CODE){
                        var errorMsg = data.message;
                        dispatch(unauthorize(errorMsg));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response.message));
            });
    };

    // Actions definition that will perform according dispatch call and send data to reducer
    function request() { return { type: clinicalNotesConstants.CLINICAL_NOTES_EDIT_REQUEST } }
    function success(result) { return { type: clinicalNotesConstants.CLINICAL_NOTES_EDIT_SUCCESS, result } }
    function failure(error) { return { type: clinicalNotesConstants.CLINICAL_NOTES_EDIT_FAILURE, error } }
    function unauthorize(error) { return { type: configConstants.UNAUTHENTICATE, error } }
}

/**
* @DateOfCreation        14 July 2018
* @ShortDescription      This function is responsible to update the states and props
* @return                JSON Object
*/
function resetState(){
    return dispatch => { dispatch(request());}
    function request() { return { type: clinicalNotesConstants.CLINICAL_NOTES_RESET_STATE} 
    }
}