import { configConstants } from '../../../_constants';
import { appointmentConstants } from './appointmentConstants';
/**
 * appointmentReducer
 *
 * @package                SafeHealth
 * @subpackage             appointmentReducer
 * @category               Reducers
 * @DateOfCreation         12 July 2018
 * @ShortDescription       This is responsible for all state related to appointment
 */

const defaultState = { 
            appointmentData :[], 
            appointmentUpdateData :[], 
            submitted       :false,
            errorMsg        :false,
            successMessage  :false,
            isInsertDone    :false,
            isFetchDone     :false,
            isUserNotValid  :false,
            userNotValidMsg :false,
            isDeleteDone    :false,
            payment_section :false,
            loader          : false,
            addAppointmentShowConfirm    : false,
         };
export function appointment(state = defaultState, action) {
    switch (action.type) {

        // Fetch Reducer's
        case appointmentConstants.APT_FETCH_REQUEST:
            return {
                ...state
            };
        case appointmentConstants.APT_FETCH_SUCCESS:
            return { 
                ...state,
                successMessage  : action.success, 
                appointmentData : action.result,
                loader          : false,
            };
        case appointmentConstants.APT_FETCH_FAILURE:
            return { 
                ...state,
                errorMsg        : action.error
            };

        // Add Reducer's  
        case appointmentConstants.APT_ADD_REQUEST:
            return {
                ...state,
                submitted       : true,
                loader          : true,
            };
        case appointmentConstants.APT_ADD_SUCCESS:
            return {
                ...state, 
                successMessage  : action.result.message,
                isInsertDone    : true,
                errorMsg        : false,
                loader        : false,
                submitted       : false,
            };
        case appointmentConstants.APT_ADD_FAILURE:
            return {
                ...state, 
                errorMsg        : action.error,
                loader          : false,
                submitted       : false,
            };

         // Add Reducer's  
        case appointmentConstants.APT_REASON_REQUEST:
            return {
                ...state,
                submitted       : true,
                loader          : true,
            };
        case appointmentConstants.APT_REASON_SUCCESS:
            return {
                ...state, 
                successMessage  : action.result.message,
                isFetchDone    : true,
                appointmentReason : action.result.appointmentReason,
                errorMsg        : false,
                loader        : false,
                submitted       : false,
            };
        case appointmentConstants.APT_REASON_FAILURE:
            return {
                ...state, 
                errorMsg        : action.error,
                loader          : false,
                submitted       : false,
            };

        // Update Reducer's  
        case appointmentConstants.APT_UPDATE_REQUEST:
            return {
                ...state,
                submitted       : true
            };
        case appointmentConstants.APT_UPDATE_SUCCESS:
            return {
                ...state, 
                successMessage  : action.result.message,
                isUpdateDone    : true,
                errorMsg        : false, 
                submitted       : false,
            };
        case appointmentConstants.APT_UPDATE_FAILURE:
                return {
                ...state, 
                errorMsg        : action.error,
                submitted       : false,
            };

        // Delete Reducer's  
        case appointmentConstants.APT_DELETE_REQUEST:
            return {
                ...state
            };
        case appointmentConstants.APT_DELETE_SUCCESS:
            return {
                ...state, 
                successMessage  : action.result.message,
                appointmentData : action.result.appointmentData,
                isDeleteDone    : true  
            };
        case appointmentConstants.APT_DELETE_FAILURE:
            return {
                ...state, 
                errorMsg        : action.error
            };

        case appointmentConstants.APT_UPDATE_STATE:
            return {
                ...state,
                errorMsg        : false,
                successMessage  : false,
                isInsertDone    : false,
                isUpdateDone    : false,
                submitted       : false,
                isDeleteDone    : false,
                addAppointmentShowConfirm    : false,
            }
        case configConstants.UNAUTHENTICATE:
            return {
                ...state,
                isUserNotValid  : true,
                errorMsg        : appointmentConstants.APT_UNAUTHENTICATED
            }
        default:
            return state
    }
}
