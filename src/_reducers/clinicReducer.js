import { clinicConstants } from '../_constants';

/**
 * clinicReducer
 *
 * @package                SafeHealth
 * @subpackage             clinicReducer
 * @category               Reducers
 * @DateOfCreation         13 June 2018
 * @ShortDescription       This is responsible for all state related to Doctor Clinic List
 */

//Initial State on load state and intial action with their type
const initialState = {
    clinicList       : [],
    sendingRequest  : false,
    afterUpdate     : false,
    loader          : true,
    successMessage  : '',
    detail          : {}
};
export function clinic(state = initialState, action) {
    switch (action.type) {
        case clinicConstants.DR_CLINIC_REQUEST :
            return  { 
                ...state,
                sendingRequest : false,
                loader         : true,
            };
        case clinicConstants.DR_CLINIC_SUCCESS :
            return  { 
                ...state,
                sendingRequest : true,
                loader         : false,
                clinicList      : action.clinicList.result,
                pages          : action.clinicList.pages

            };
        case clinicConstants.DR_CLINIC_FAILURE :
            return  { 
                ...state,
                sendingRequest : false,
                loader         : false,
                errorMsg       : action.error
            };

        case clinicConstants.DR_CLINIC_SAVE_SUCCESS :
            return  { 
                ...state,
                sendingRequest : true, 
                successMessage : action.successMsg.message,
                isClinicSaved   : true, 
                submitted      : true,
                clinicList         : [...state.clinicList],
            };
        case clinicConstants.DR_CLINIC_SAVE_FAILURE :
            return  { 
                ...state,
                sendingRequest : false, 
                isClinicSaved   : false, 
                submitted      : false,
                errorMsg       : action.error
            };
        case clinicConstants.DR_CLINIC_REMOVE_SUCCESS:
            return  { 
                ...state,
                sendingRequest       : true, 
                deleteSuccessMessage : action.successMsg.message,
                clinicList            : action.successMsg.clinicList,
            };
        case clinicConstants.DR_CLINIC_REMOVE_FAILURE:
            return  { 
                ...state,
                sendingRequest : false, 
                errorMsg       : action.error
            };
        case clinicConstants.DR_CLINIC_RESET_STATE:
            return {
                ...state,
                sendingRequest  : false, 
                errorMsg        : false,
                successMessage  : false,
                clinicEditDetail : false,
                isClinicSaved    : false,
                submitted       : false
             };
        default:
            return state
    }
}