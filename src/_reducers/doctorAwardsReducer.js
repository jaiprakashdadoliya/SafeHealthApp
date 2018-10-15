import { doctorAwardsConstants } from '../_constants';

/**
 * doctorAwardsReducer
 *
 * @package                SafeHealth
 * @subpackage             doctorAwardsReducer
 * @category               Reducers
 * @DateOfCreation         20 May 2018
 * @ShortDescription       This is responsible for all state related to Doctor awards
 */

//Initial State on load state and intial action with their type
const initialState = {
    awards          : [],
    sendingRequest  : false,
    afterUpdate     : false,
    loader          : true,
    successMessage  : '',
    detail          : {}
};
export function doctorAwards(state = initialState, action) {
    switch (action.type) {
        case doctorAwardsConstants.DR_AWARDS_REQUEST :
            return  { 
                ...state,
                sendingRequest : false,
                loader         : true,
            };
        case doctorAwardsConstants.DR_AWARDS_SUCCESS :
            return  { 
                ...state,
                sendingRequest : true,
                loader         : false,
                awards         : action.awards.result,
                pages          : action.awards.pages
            };
        case doctorAwardsConstants.DR_AWARDS_FAILURE :
            return  { 
                ...state,
                sendingRequest : false,
                loader         : false,
                errorMsg       : action.errorMsg
            };

        case doctorAwardsConstants.DR_AWARDS_ADD_SUCCESS :
            return  { 
                ...state,
                sendingRequest : true, 
                successMessage : action.successMsg.message,
                isAwardSaved   : true, 
                submitted      : true,
                awards         : [...state.awards],
            };
        case doctorAwardsConstants.DR_AWARDS_ADD_FAILURE :
            return  { 
                ...state,
                sendingRequest : false, 
                isAwardSaved   : false, 
                submitted      : false,
                errorMsg       : action.errorMsg
            };
        case doctorAwardsConstants.DR_AWARDS_REMOVE_SUCCESS:
            return  { 
                ...state,
                sendingRequest       : true, 
                deleteSuccessMessage : action.successMsg.message,
                awards               : action.successMsg.awards,
            };
        case doctorAwardsConstants.DR_AWARDS_REMOVE_FAILURE:
            return  { 
                ...state,
                sendingRequest : false, 
                errorMsg       : action.errorMsg
            };
        case doctorAwardsConstants.DR_AWARDS_RESET_STATE:
            return {
                ...state,
                sendingRequest  : false, 
                errorMsg        : false,
                successMessage  : false,
                awardEditDetail : false,
                isAwardSaved    : false,
                submitted       : false
             };
        default:
            return state
    }
}