import { patientConstants, configConstants } from '../_constants';
/**
 * patientConstants
 *
 * @package                SafeHealth
 * @subpackage             patientConstants
 * @category               Reducers
 * @DateOfCreation         08 June 2018
 * @ShortDescription       This is responsible for all state related to patient
 */

const defaultState = { 
                        patientData:[], 
                        patientUpdateData:[], 
                        submitted:false,
                        errorMsg:false,
                        successMsg:false,
                        isUpdateDone:false,
                        isInsertDone:false,
                        isUserNotValid:false,
                        isDeleteDone:false,
                        stateData:[],
                        cityData :[],
                        pages: 0,
                        loading:false 
                     };
export function patient(state = defaultState, action) {
  switch (action.type) {
    
    // Cities Fetch Reducer's
    case patientConstants.CITIES_FETCH_REQUEST:
      return {
        ...state
      };
    case patientConstants.CITIES_FETCH_SUCCESS:
      return { 
        ...state,
        successMsg         : action.success, 
        cityData           : action.result
      };
    case patientConstants.CITIES_FETCH_FAILURE:
      return { 
        ...state,
        errorMsg              : action.error
      };

     // State Fetch Reducer's
    case patientConstants.STATE_FETCH_REQUEST:
      return {
        ...state,
        loading : true
      };
    case patientConstants.STATE_FETCH_SUCCESS:
      return { 
        ...state,
        successMsg         : action.success, 
        stateData          : action.result,
        loading            : false
      };
    case patientConstants.STATE_FETCH_FAILURE:
      return { 
        ...state,
        errorMsg           : action.error,
        loading            : false

      };

    // Fetch Reducer's
    case patientConstants.PATIENT_FETCH_REQUEST:
      return {
        ...state,

      };
    case patientConstants.PATIENT_FETCH_SUCCESS:
      return { 
        ...state,
        successMsg         : action.success, 
        patientData        : action.result.result,
        pages              : action.result.pages
      };
    case patientConstants.PATIENT_FETCH_FAILURE:
      return { 
        ...state,
        errorMsg              : action.error
      };

    
    // Update Reducer's  
    case patientConstants.PATIENT_UPDATE_REQUEST:
      return {
        ...state,
        submitted             : true
      };
    case patientConstants.PATIENT_UPDATE_SUCCESS:
      return { 
        ...state,
        successMsg         : action.result.message,
        patientData        : action.result.patientData,
        patientUpdateData  : action.result.patientUpdateData, 
        isUpdateDone          : true
      };
    case patientConstants.PATIENT_UPDATE_FAILURE:
      return { 
        ...state,
        errorMsg         : action.error
      };  

     
     // Add Reducer's  
    case patientConstants.PATIENT_ADD_REQUEST:
      return {
        ...state,
        submitted        : true

      };
    case patientConstants.PATIENT_ADD_SUCCESS:
      return {
        ...state, 
        successMsg       : action.result.message,
        patientData      : [...state.patientData, action.result.patientInsertData],
        isInsertDone     : true 
      };
    case patientConstants.PATIENT_ADD_FAILURE:
      return {
        ...state, 
        errorMsg         : action.error
       };

    
    // Delete Reducer's  
    case patientConstants.PATIENT_DELETE_REQUEST:
      return {
       ...state
      };
    case patientConstants.PATIENT_DELETE_SUCCESS:
      return {
        ...state, 
        successMsg       : action.result.message,
        patientData      : action.result.patientData,
        isDeleteDone     : true  
      };
    case patientConstants.PATIENT_DELETE_FAILURE:
      return {
        ...state, 
        errorMsg  : action.error
      };

    case patientConstants.PATIENT_UPDATE_STATE:
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
