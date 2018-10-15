import { configConstants } from '../../../_constants';
import { systemicExaminationConstants } from './systemicExaminationConstants';


/**
 *patient
 *
 * @package                ILD INDIA Registry
 * @subpackage             Family Medical History
 * @category               Reducers
 * @DateOfCreation         15 June 2018
 * @ShortDescription       This is responsible for all state related to patient general Checkup history
 */
//Initial State on load state and intial action with their type
const initialState = {
    submitted                           : false,
    sendingRequest                      : false,
    successMsg                          : false,
    errorMsg                            : false,
    isUserNotValid                      : false,
    fetchedSystemicExaminationData      : false,
    isUpdateDone                        : false,
    patientSystemicExaminationData      : [],

};

export function systemicExamination(state = initialState, action) {
    switch (action.type) {
        case systemicExaminationConstants.SYSTEMIC_EXAMINATION_DATA_REQUEST:
            return {
                ...state,
                sendingRequest                      : true,
                isUpdateDone                        : false,
                submitted                           : false,
                errorMsg                            : false,
                fetchedSystemicExaminationData      : false
            };
        case systemicExaminationConstants.SYSTEMIC_EXAMINATION_DATA_FAILURE:
            return {
                ...state,
                sendingRequest                      : false,
                errorMsg                            : action.errorMsg,
                fetchedSystemicExaminationData      : false,
            };
        case systemicExaminationConstants.SYSTEMIC_EXAMINATION_DATA_SUCCESS:
            return {
                ...state,
                sendingRequest                              : false,
                patientSystemicExaminationData              : action.examinationDetails.result,
                fetchedSystemicExaminationData              : true,
            };
        case systemicExaminationConstants.SYSTEMIC_EXAMINATION_ADD_REQUEST:
            return {
                ...state,
                isUpdateDone                : false,
                submitted                   : true,
                errorMsg                    : false,
            };
        case systemicExaminationConstants.SYSTEMIC_EXAMINATION_ADD_FAILURE:
            return {
                ...state,
                submitted                   : false,
                errorMsg                    : action.errorMsg,
            };
        case systemicExaminationConstants.SYSTEMIC_EXAMINATION_ADD_SUCCESS:
            return {
                ...state,
                successMsg            : action.result.message,
                submitted                 : false,
                isUpdateDone              : true,
            };
        case configConstants.UNAUTHENTICATE:
        return {
            ...state,
            isUserNotValid : true,
            errorMsg       : false
        };
        case systemicExaminationConstants.SYSTEMIC_EXAMINATION_RESET_STATE:
            return {
                ...state,
                sendingRequest              : false,
                successMsg              : false,
                errorMsg                    : false,
                isUpdateDone                : false,
            };
        default:
            return state
    }
}