import { doctorExperienceConstants, configConstants } from '../_constants';
/**
 * doctorExperienceReducer
 *
 * @package                SafeHealth
 * @subpackage             doctorExperienceReducer
 * @category               Reducers
 * @DateOfCreation         17 May 2018
 * @ShortDescription       This is responsible for all state related to Doctor Experience
 */

const defaultState = { 
                        experienceData:[], 
                        experienceUpdateData:[], 
                        submitted:false,
                        errorMsg:false,
                        successMsg:false,
                        isUpdateDone:false,
                        isInsertDone:false,
                        isUserNotValid:false,
                        isDeleteDone:false 
                     };
export function doctorExperience(state = defaultState, action) {
  switch (action.type) {
    
    // Fetch Reducer's
    case doctorExperienceConstants.DR_EXP_FETCH_REQUEST:
      return {
        ...state
      };
    case doctorExperienceConstants.DR_EXP_FETCH_SUCCESS:
      return { 
        ...state,
        successMsg            : action.success, 
        experienceData        : action.result.result,
                pages          : action.result.pages
      };
    case doctorExperienceConstants.DR_EXP_FETCH_FAILURE:
      return { 
        ...state,
        errorMsg              : action.error
      };

    
    // Update Reducer's  
    case doctorExperienceConstants.DR_EXP_UPDATE_REQUEST:
      return {
        ...state,
        submitted             : true
      };
    case doctorExperienceConstants.DR_EXP_UPDATE_SUCCESS:
      return { 
        ...state,
        successMsg            : action.result.message,
        experienceData        : action.result.experienceData,
        experienceUpdateData  : action.result.experienceUpdateData, 
        isUpdateDone          : true,
        errorMsg              : false
      };
    case doctorExperienceConstants.DR_EXP_UPDATE_FAILURE:
      return { 
        ...state,
        errorMsg         : action.error
      };  

     
     // Add Reducer's  
    case doctorExperienceConstants.DR_EXP_ADD_REQUEST:
      return {
        ...state,
        submitted        : true

      };
    case doctorExperienceConstants.DR_EXP_ADD_SUCCESS:
      return {
        ...state, 
        successMsg       : action.result.message,
        experienceData   : [...state.experienceData, action.result.experienceInsertData],
        isInsertDone     : true,
        errorMsg         : false 
      };
    case doctorExperienceConstants.DR_EXP_ADD_FAILURE:
      return {
        ...state, 
        errorMsg         : action.error
       };

    
    // Delete Reducer's  
    case doctorExperienceConstants.DR_EXP_DELETE_REQUEST:
      return {
       ...state
      };
    case doctorExperienceConstants.DR_EXP_DELETE_SUCCESS:
      return {
        ...state, 
        successMsg       : action.result.message,
        experienceData   : action.result.experienceData,
        isDeleteDone     : true  
      };
    case doctorExperienceConstants.DR_EXP_DELETE_FAILURE:
      return {
        ...state, 
        errorMsg  : action.error
      };

    case doctorExperienceConstants.DR_EXP_UPDATE_STATE:
    return {
      ...state,
      errorMsg      : false,
      successMsg    : false,
      isUpdateDone  : false,
      isInsertDone  : false,
      submitted     : false,
      isDeleteDone  : false 
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
