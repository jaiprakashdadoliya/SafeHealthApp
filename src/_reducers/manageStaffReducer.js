import { manageStaffConstants } from '../_constants';

/**
 * manageStaffReducer
 *
 * @package                SafeHealth
 * @subpackage             manageStaffReducer
 * @category               Reducers
 * @DateOfCreation         13 June 2018
 * @ShortDescription       This is responsible for all state related to Doctor Staff List
 */

//Initial State on load state and intial action with their type
const initialState = {
    staffList       : [],
    sendingRequest  : false,
    afterUpdate     : false,
    loader          : true,
    successMessage  : '',
    detail          : {}
};
export function manageStaff(state = initialState, action) {
    switch (action.type) {
        case manageStaffConstants.DR_STAFF_REQUEST :
            return  { 
                ...state,
                sendingRequest : false,
                loader         : true,
            };
        case manageStaffConstants.DR_STAFF_SUCCESS :
            return  { 
                ...state,
                sendingRequest : true,
                loader         : false,
                staffList      : action.staffList.result,
                pages          : action.staffList.pages

            };
        case manageStaffConstants.DR_STAFF_FAILURE :
            return  { 
                ...state,
                sendingRequest : false,
                loader         : false,
                errorMsg       : action.errorMsg
            };

        case manageStaffConstants.DR_STAFF_SAVE_SUCCESS :
            return  { 
                ...state,
                sendingRequest : true, 
                successMessage : action.successMsg.message,
                isStaffSaved   : true, 
                submitted      : true,
                staffList         : [...state.staffList],
            };
        case manageStaffConstants.DR_STAFF_SAVE_FAILURE :
            return  { 
                ...state,
                sendingRequest : false, 
                isStaffSaved   : false, 
                submitted      : false,
                errorMsg       : action.errorMsg
            };
        case manageStaffConstants.DR_STAFF_REMOVE_SUCCESS:
            return  { 
                ...state,
                sendingRequest       : true, 
                deleteSuccessMessage : action.successMsg.message,
                staffList            : action.successMsg.staffList,
            };
        case manageStaffConstants.DR_STAFF_REMOVE_FAILURE:
            return  { 
                ...state,
                sendingRequest : false, 
                errorMsg       : action.errorMsg
            };
        case manageStaffConstants.DR_STAFF_RESET_STATE:
            return {
                ...state,
                sendingRequest  : false, 
                errorMsg        : false,
                successMessage  : false,
                staffEditDetail : false,
                isStaffSaved    : false,
                submitted       : false
             };
        default:
            return state
    }
}