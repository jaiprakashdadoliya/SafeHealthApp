import { configConstants } from '../../_constants';
import { patientDashboardProfileConstants } from './patientDashboardProfileConstants';

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
    sendingRequest          : false,
    successMessage          : false,
    isUserNotValid          : false,
    isUpdateDone            : false,
    patientDashboardData    : [],
    patientProfileRequest   : false,
    patientMedicationList   : [],
};

export function patientProfileDashboard(state = initialState, action) {
  switch (action.type) {
    case patientDashboardProfileConstants.LOGGED_IN:
      return {
      	errorMsg: true
      };
    case patientDashboardProfileConstants.LOGGED_OUT:
      return {
      	errorMsg: false
      };
    case patientDashboardProfileConstants.PATIENT_DASHBOARD_PROFILE_REQUEST:
        return {
            ...state,
            sendingRequest          : true,
            patientProfileRequest   : false,
        };
    case patientDashboardProfileConstants.PATIENT_DASHBOARD_PROFILE_FAILURE:
        return {
            ...state,
            sendingRequest        : false,
            patientProfileRequest : false,
            errorMsg              : action.errorMsg
        };
    case patientDashboardProfileConstants.PATIENT_DASHBOARD_PROFILE_SUCCESS:
        return {
            ...state,
            sendingRequest        : false,
            patientDashboardData  : action.patientDashboardProfileData,
            patientProfileRequest : true,
        };

    case patientDashboardProfileConstants.PATIENT_DASHBOARD_MEDICATION_REQUEST:
        return {
            ...state,
            sendingRequest  : true
        };
    case patientDashboardProfileConstants.PATIENT_DASHBOARD_MEDICATION_FAILURE: 

        return {
            ...state,
            sendingRequest  : false,
            errorMsg        : action.errorMsg
        };
    case patientDashboardProfileConstants.PATIENT_DASHBOARD_MEDICATION_SUCCESS:
        return {
            ...state,
            sendingRequest            : false,
            patientMedicationList     : action.patientMedicationListData,
        };
    
    case patientDashboardProfileConstants.PATIENT_DASHBOARD_PROFILE_RESET_STATE:
      return {
                ...state,
                sendingRequest: false,
                successMessage: false,
                isUserNotValid:false,
                isUpdateDone  :false,
             };
    default:
      return state
  }
}