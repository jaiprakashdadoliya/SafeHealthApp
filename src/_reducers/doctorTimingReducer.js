import { doctorTimingConstants, configConstants } from '../_constants';
/**
 * doctorTimingReducer
 *
 * @package                SafeHealth
 * @subpackage             doctorTimingReducer
 * @category               Reducers
 * @DateOfCreation         17 May 2018
 * @ShortDescription       This is responsible for all state related to Doctor Timing
 */

const defaultState = { 
            timingData:[], 
            timingUpdateData:[], 
            submitted:false,
            errorMsg:false,
            successMessage:false,
            isInsertDone:false,
            isUserNotValid:false,
            isDeleteDone:false,
            clinicList:[],
            isUpdateDone:false,
         };
export function doctorTiming(state = defaultState, action) {
    switch (action.type) {

        // Fetch Reducer's
        case doctorTimingConstants.DR_TM_FETCH_REQUEST:
            return {
                ...state
            };
        case doctorTimingConstants.DR_TM_FETCH_SUCCESS:
            return { 
                ...state,
                successMessage    : action.success, 
                timingData        : action.result
            };
        case doctorTimingConstants.DR_TM_FETCH_FAILURE:
            return { 
                ...state,
                errorMsg         : action.error
            };
        case doctorTimingConstants.DR_CLINIC_FETCH_REQUEST:
            return { 
                ...state
            };
        case doctorTimingConstants.DR_CLINIC_FETCH_SUCCESS:
            return { 
                ...state,
                successMessage    : action.success, 
                clinicList        : action.result
            };
        case doctorTimingConstants.DR_CLINIC_FETCH_FAILURE:
            return { 
                ...state,
                errorMsg         : action.error
            };

        // Add Reducer's  
        case doctorTimingConstants.DR_TM_ADD_REQUEST:
            return {
                ...state,
                submitted        : true
            };
        case doctorTimingConstants.DR_TM_ADD_SUCCESS:
            return {
                ...state, 
                successMessage   : action.result.message,
                isInsertDone     : true,
                errorMsg         : false 
            };
        case doctorTimingConstants.DR_TM_ADD_FAILURE:
            return {
                ...state, 
                errorMsg         : action.error
            };

        // Update Reducer's  
        case doctorTimingConstants.DR_TM_UPDATE_REQUEST:
            return {
                ...state,
                submitted        : true
            };
        case doctorTimingConstants.DR_TM_UPDATE_SUCCESS:
            return {
                ...state, 
                successMessage   : action.result.message,
                isUpdateDone     : true,
                errorMsg         : false 
            };
        case doctorTimingConstants.DR_TM_UPDATE_FAILURE:
                return {
                ...state, 
                errorMsg         : action.error
            };

        // Delete Reducer's  
        case doctorTimingConstants.DR_TM_DELETE_REQUEST:
            return {
                ...state
            };
        case doctorTimingConstants.DR_TM_DELETE_SUCCESS:
            return {
                ...state, 
                successMessage   : action.result.message,
                timingData       : action.result.timingData,
                isDeleteDone     : true  
            };
        case doctorTimingConstants.DR_TM_DELETE_FAILURE:
            return {
                ...state, 
                errorMsg  : action.error
            };

        case doctorTimingConstants.DR_TM_UPDATE_STATE:
            return {
                ...state,
                errorMsg       : false,
                successMessage : false,
                isInsertDone   : false,
                isUpdateDone   : false,
                submitted      : false,
                isDeleteDone   : false 
            }
        case configConstants.UNAUTHENTICATE:
            return {
                ...state,
                isUserNotValid : true
            }
        default:
            return state
    }
}
