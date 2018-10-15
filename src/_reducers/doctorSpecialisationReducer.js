import { doctorSpecialisationConstants, configConstants } from '../_constants';
/**
 * doctorSpecialisationConstants
 *
 * @package                SafeHealth
 * @subpackage             doctorSpecialisationConstants
 * @category               Reducers
 * @DateOfCreation         31 May 2018
 * @ShortDescription       This is responsible for all state related to Doctor Specialisation
 */
const defaultState = { 
                        masterSpecialisationData:[], 
                        specialisationData:[], 
                        specialisationUpdateData:[],
                        submitted:false,
                        errorMsg:false,
                        successMsg:false,
                        isUpdateDone:false,
                        isInsertDone:false,
                        isUserNotValid:false, 
                        specialisationData:[],
                        tagSpecialisationData:[],
                        tagSpecialisationFetch:false,
                     };
export function doctorSpecialisation(state = defaultState, action) {
  switch (action.type) {
   
    // Master Fetch Reducer's
    case doctorSpecialisationConstants.MASTER_FETCH_REQUEST:
      return {
        ...state
      };
    case doctorSpecialisationConstants.MASTER_FETCH_SUCCESS:
      return { 
        ...state,
        successMsg                  : action.success, 
        masterSpecialisationData    : action.result
      };
    case doctorSpecialisationConstants.MASTER_FETCH_FAILURE:
      return { 
        ...state,
        errorMsg              : action.error
      };


    // Tag Fetch Reducer's
    case doctorSpecialisationConstants.SPECIALISATION_TAG_FETCH_REQUEST:
      return {
        ...state
      };
    case doctorSpecialisationConstants.SPECIALISATION_TAG_FETCH_SUCCESS:
      return { 
        ...state,
        successMsg               : action.success, 
        tagSpecialisationData    : action.result,
        tagSpecialisationFetch   : true,
      };
    case doctorSpecialisationConstants.SPECIALISATION_TAG_FETCH_FAILURE:
      return { 
        ...state,
        errorMsg              : action.error
      };

    // Fetch Reducer's
    case doctorSpecialisationConstants.DR_SPL_FETCH_REQUEST:
      return {
        ...state
      };
    case doctorSpecialisationConstants.DR_SPL_FETCH_SUCCESS:
      return { 
        ...state,
        successMsg            : action.success, 
        specialisationData    : action.result.result,
        pages                 : action.result.pages
      };
    case doctorSpecialisationConstants.DR_SPL_FETCH_FAILURE:
      return { 
        ...state,
        errorMsg              : action.error
      };

    // Update Reducer's  
    case doctorSpecialisationConstants.DR_SPL_UPDATE_REQUEST:
      return {
        ...state,
        submitted             : true
      };
    case doctorSpecialisationConstants.DR_SPL_UPDATE_SUCCESS:
      return { 
        ...state,
        successMsg                    : action.result.message,
        specialisationData            : action.result.specialisationData,
        specialisationUpdateData      : action.result.specialisationUpdateData, 
        isUpdateDone                  : true,
        errorMsg                      : false 
      };
    case doctorSpecialisationConstants.DR_SPL_UPDATE_FAILURE:
      return { 
        ...state,
        errorMsg     : action.error,
        submitted    : false,
        isUpdateDone : false,
        successMsg   : false
      };  

     // Add Reducer's  
    case doctorSpecialisationConstants.DR_SPL_ADD_REQUEST:
      return {
        ...state,
        submitted        : true

      };
    case doctorSpecialisationConstants.DR_SPL_ADD_SUCCESS:
      return {
        ...state, 
        successMsg                   : action.result.message,
        specialisationData           : [...state.specialisationData, action.result.specialisationInsertData],
        isInsertDone                 : true,
        errorMsg                     : false
      };
    case doctorSpecialisationConstants.DR_SPL_ADD_FAILURE:
      return {
        ...state, 
        errorMsg         : action.error,
        submitted        : false,
        isInsertDone     : false,
        successMsg       : false
       };
   
    // Delete Reducer's  
    case doctorSpecialisationConstants.DR_SPL_DELETE_REQUEST:
      return {
       ...state
      };
    case doctorSpecialisationConstants.DR_SPL_DELETE_SUCCESS:
      return {
        ...state, 
        successMsg                   : action.result.message,
        specialisationData    : action.result.specialisationData
      };
    case doctorSpecialisationConstants.DR_SPL_DELETE_FAILURE:
      return {
        ...state, 
        errorMsg  : action.error
      };

    case doctorSpecialisationConstants.DR_SPL_UPDATE_STATE:
    return {
      ...state,
      errorMsg      : false,
      successMsg    : false,
      isUpdateDone  : false,
      isInsertDone  : false,
      submitted     : false,
      tagSpecialisationFetch:false,
    }
    case configConstants.UNAUTHENTICATE:
    return {
      ...state,
      isUserNotValid : true,
      errorMsg       : false
    }
    default:
      return state
  }
}
