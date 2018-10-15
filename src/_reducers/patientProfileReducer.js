import { patientProfileConstants, configConstants } from '../_constants';

/**
 * doctorProfile
 *
 * @package                ILD INDIA Registry
 * @subpackage             PatientProfile
 * @category               Reducers
 * @DateOfCreation         15 June 2018
 * @ShortDescription       This is responsible for all state related to Doctor profile
 */
//Initial State on load state and intial action with their type
const initialState = {
    getVisitId              : false,
    sendingRequest          : false,
    successMessage          : false,
    isUserNotValid          : false,
    patientProfile          : [],
    patientList             : [],
    isUpdateDone            : false,
    patientVisitId          : false,
    patientUpdatedData      : [],
    patientProfileRequest   : false,
};

export function patientProfile(state = initialState, action) {
  switch (action.type) {
    case patientProfileConstants.LOGGED_IN:
      return {
      	errorMsg: true
      };
    case patientProfileConstants.LOGGED_OUT:
      return {
      	errorMsg: false
      };
    case patientProfileConstants.PATIENT_PROFILE_REQUEST:
        return {
            ...state,
            sendingRequest          : true,
            patientProfileRequest   : false,
        };
    case patientProfileConstants.PATIENT_PROFILE_FAILURE:
        return {
            ...state,
            sendingRequest        : false,
            patientProfileRequest : false,
            errorMsg              : action.errorMsg
        };
    case patientProfileConstants.PATIENT_PROFILE_SUCCESS:
        return {
            ...state,
            sendingRequest        : false,
            patient               : action.patientProfileData,
            patientUpdatedData    : action.patientProfileData,
            patientProfileRequest : true,
        };

    // Update Reducer's  
    case patientProfileConstants.PATIENT_PROFILE_EDIT_REQUEST:
      return {
        ...state,
        submitted             : true
      };
    case patientProfileConstants.PATIENT_PROFILE_EDIT_SUCCESS:
      return { 
        ...state,
        successMessage        : action.result.message,
        patient               : action.result.patientUpdateData,
        patientUpdatedData    : action.result.patientUpdateData,
        isUpdateDone          : true,
        errorMsg              : false
      };
    case patientProfileConstants.PATIENT_PROFILE_EDIT_FAILURE:
      return { 
        ...state,
        errorMsg : action.error
      };  

    case patientProfileConstants.PATIENT_PROFILE_UPDATE_SUCCESS:
      return  { 
                ...state,
                sendingRequest  : false, 
                loader          : false,
                successMessage  : action.successMsg.message,
                pat_profile_img : action.successMsg.pat_profile_img
              };
    case patientProfileConstants.PATIENT_PROFILE_UPDATE_FAILURE:
      return  { 
                ...state,
                sendingRequest  : false,
                loader          : false, 
                errorMsg        : action.errorMsg
              };

        // PATIENT LIST
        case patientProfileConstants.PATIENT_LIST_REQUEST:
            return {
                ...state,
                sendingRequest  : true,
                getVisitId      : false
            };
        case patientProfileConstants.PATIENT_LIST_FAILURE: 

            return {
                ...state,
                sendingRequest  : false,
                errorMsg        : action.errorMsg
            };
        case patientProfileConstants.PATIENT_LIST_SUCCESS:
            return {
                ...state,
                sendingRequest  : false,
                patientList     : action.patientListData,
            };

        case configConstants.UNAUTHENTICATE:
            return {
                  ...state,
                  isUserNotValid : true,
                  errorMsg       : false
                };

        // PATIENT VISIT ID
        case patientProfileConstants.PATIENT_VISIT_ID_REQUEST:
            return {
                ...state,
                sendingRequest  : true
            };
        case patientProfileConstants.PATIENT_VISIT_ID_FAILURE:
            return {
                ...state,
                sendingRequest  : false,
                errorMsg        : action.errorMsg
            };
        case patientProfileConstants.PATIENT_VISIT_ID_SUCCESS:
            return {
                ...state,
                sendingRequest  : false,
                patientVisitId  : action.patientVisitId,
                getVisitId      : true
            };
    case patientProfileConstants.PATIENT_PROFILE_RESET_STATE:
      return {
                ...state,
                sendingRequest: false,
                successMessage: false,
                isUserNotValid: false,
                isUpdateDone  : false,
                getVisitId    : false
             };
    default:
      return state
  }
}