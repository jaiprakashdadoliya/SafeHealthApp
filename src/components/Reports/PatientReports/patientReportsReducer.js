import { configConstants } from '../../../_constants';
import { patientReportsConstants } from './patientReportsConstants';

/**
 * Reports
 *
 * @package                SafeHealth
 * @subpackage             Reports
 * @category               Reducers
 * @DateOfCreation         03 Oct 2018
 * @ShortDescription       This is responsible for all state related to Patients reports
 */
//Initial State on load state and initial action with their type
const initialState = {
    sendingRequest              : false,
    successMessage              : false,
    isUserNotValid              : false,
    isUpdateDone                : false,
    filterData                  : [],
    filterPatientData           : [],
    isFilterDataFetched         : false,
    isFilterPatientDataFetched  : false
};

export function patientReports(state = initialState, action) {
  switch (action.type) {
    case patientReportsConstants.LOGGED_IN:
      return {
      	errorMsg: true
      };
    case patientReportsConstants.LOGGED_OUT:
      return {
      	errorMsg: false
      };

    case patientReportsConstants.PATIENT_REPORTS_GET_FILTER_DATA_REQUEST:
        return {
            ...state,
            sendingRequest        : true,
        };
    case patientReportsConstants.PATIENT_REPORTS_GET_FILTER_DATA_FAILURE:
        return {
            ...state,
            sendingRequest        : false,
            errorMsg              : action.errorMsg
        };
    case patientReportsConstants.PATIENT_REPORTS_GET_FILTER_DATA_SUCCESS:
        return {
            ...state,
            sendingRequest        : false,
            filterData            : action.reportsData,
            isFilterDataFetched   : true
        };

    case patientReportsConstants.REPORTS_GET_FILTER_PATIENTS_DATA_REQUEST:
        return {
            ...state,
            sendingRequest            : true,
            isFilterPatientDataFetched: false,
        };
    case patientReportsConstants.REPORTS_GET_FILTER_PATIENTS_DATA_SUCCESS:
        return {
            ...state,
            sendingRequest            : false,
            filterPatientData         : action.patientsData,
            isFilterPatientDataFetched: true
        };
    case patientReportsConstants.REPORTS_GET_FILTER_PATIENTS_DATA_FAILURE:
        return {
            ...state,
            sendingRequest            : false,
            errorMsg                  : action.errorMsg,
            isFilterPatientDataFetched: false
        };

    case patientReportsConstants.PATIENT_REPORTS_RESET_STATE:
      return {
                ...state,
                sendingRequest            : false,
                successMessage            : false,
                isUserNotValid            : false,
                errorMsg                  : false,
                filterData                : [],
                filterPatientData         : [],
                isFilterDataFetched       : false,
                isFilterPatientDataFetched: false
             };
    default:
      return state
  }
}