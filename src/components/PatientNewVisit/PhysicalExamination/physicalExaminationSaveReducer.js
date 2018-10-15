import { configConstants } from '../../../_constants';
import { physicalExaminationSaveConstants } from './physicalExaminationSaveConstants';


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
    successMessage                      : false,
    errorMsg                            : false,
    isUserNotValid                      : false,
    fetchedphysicalExaminationData      : false,
    isUpdateDone                        : false,
    patientphysicalExaminationData      : [],

};

export function physicalExaminationSave(state = initialState, action) {
    switch (action.type) {
        case physicalExaminationSaveConstants.PATIENT_PHYSICAL_EXAMINATION_DATA_REQUEST:
            return {
                ...state,
                sendingRequest                      : true,
                isUpdateDone                        : false,
                submitted                           : false,
                errorMsg                            : false,
                fetchedphysicalExaminationData      : false
            };
        case physicalExaminationSaveConstants.PATIENT_PHYSICAL_EXAMINATION_DATA_FAILURE:
            return {
                ...state,
                sendingRequest                      : false,
                errorMsg                            : action.errorMsg,
                fetchedphysicalExaminationData      : false,
            };
        case physicalExaminationSaveConstants.PATIENT_PHYSICAL_EXAMINATION_DATA_SUCCESS:
            return {
                ...state,
                sendingRequest                              : false,
                patientphysicalExaminationData              : action.patientDetails.result,
                fetchedphysicalExaminationData              : true,
            };
        case physicalExaminationSaveConstants.PATIENT_PHYSICAL_EXAMINATION_ADD_REQUEST:
            return {
                ...state,
                isUpdateDone                : false,
                submitted                   : true,
                errorMsg                    : false,
            };
        case physicalExaminationSaveConstants.PATIENT_PHYSICAL_EXAMINATION_ADD_FAILURE:
            return {
                ...state,
                submitted                   : false,
                errorMsg                    : action.errorMsg,
            };
        case physicalExaminationSaveConstants.PATIENT_PHYSICAL_EXAMINATION_ADD_SUCCESS:
            return {
                ...state,
                successMessage            : action.result.message,
                submitted                 : false,
                isUpdateDone              : true,
            };
        case configConstants.UNAUTHENTICATE:
        return {
            ...state,
            isUserNotValid : true,
            errorMsg       : false
        };
        case physicalExaminationSaveConstants.PATIENT_PHYSICAL_EXAMINATION_RESET_STATE:
            return {
                ...state,
                sendingRequest              : false,
                successMessage              : false,
                errorMsg                    : false,
                isUpdateDone                : false,
            };
        default:
            return state
    }
}