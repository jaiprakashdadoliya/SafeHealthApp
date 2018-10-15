import { configConstants } from '../../../_constants';
import { chartReportsConstants } from './chartReportsConstants';

/**
 * doctorProfile
 *
 * @package                SafeHealth
 * @subpackage             Reports
 * @category               Reducers
 * @DateOfCreation         15 June 2018
 * @ShortDescription       This is responsible for all state related to Doctor reports
 */
//Initial State on load state and intial action with their type
const initialState = {
    sendingRequest  : false,
    successMessage  : false,
    isUserNotValid  : false,
    isUpdateDone    : false,
    reportsData : [],
};

export function chartReports(state = initialState, action) {
  switch (action.type) {
    case chartReportsConstants.LOGGED_IN:
      return {
      	errorMsg: true
      };
    case chartReportsConstants.LOGGED_OUT:
      return {
      	errorMsg: false
      };
    case chartReportsConstants.REPORTS_REQUEST:
        return {
            ...state,
            sendingRequest        : true,
        };
    case chartReportsConstants.REPORTS_FAILURE:
        return {
            ...state,
            sendingRequest        : false,
            errorMsg              : action.errorMsg
        };
    case chartReportsConstants.REPORTS_SUCCESS:
        return {
            ...state,
            sendingRequest        : false,
            reportsData  : action.reportsData,
        };
    case chartReportsConstants.REPORTS_RESET_STATE:
      return {
                ...state,
                sendingRequest  : false,
                successMessage  : false,
                isUserNotValid  : false,
                errorMsg        : false,
             };
    default:
      return state
  }
}