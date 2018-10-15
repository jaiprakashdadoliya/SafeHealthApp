import { configConstants } from '../../../../_constants';
import { patientLaboratoryTestConstants } from './patientLaboratoryTestConstants';


/**
 *patient
 *
 * @package                ILD INDIA Registry
 * @subpackage             General Checkup
 * @category               Reducers
 * @DateOfCreation         15 June 2018
 * @ShortDescription       This is responsible for all state related to patient general Checkup history
 */
//Initial State on load state and intial action with their type
const initialState = {
    submitted                   : false,
    sendingRequest              : false,
    successMessage              : false,
    errorMsg                    : false,
    isUserNotValid              : false,
    fetchedLaboratoryTestData   : false,
    isUpdateDone                : false,
    patientLaboratoryTestData   : [],

};

export function laboratoryTest(state = initialState, action) {
    switch (action.type) {
        case patientLaboratoryTestConstants.PATIENT_LABORATORY_TEST_DATA_REQUEST:
            return {
                ...state,
                sendingRequest              : true,
                isUpdateDone                : false,
                submitted                   : false,
                errorMsg                    : false,
                fetchedLaboratoryTestData   : false
            };
        case patientLaboratoryTestConstants.PATIENT_LABORATORY_TEST_DATA_FAILURE:
            return {
                ...state,
                sendingRequest              : false,
                errorMsg                    : action.errorMsg,
                fetchedLaboratoryTestData   : false,
            };
        case patientLaboratoryTestConstants.PATIENT_LABORATORY_TEST_DATA_SUCCESS:
            return {
                ...state,
                sendingRequest            : false,
                patientLaboratoryTestData : action.patientLaboratoryTestData.result,
                fetchedLaboratoryTestData : true,
            };
        case patientLaboratoryTestConstants.NEW_LABORATORY_TEST_DATA_REQUEST:
            return {
                ...state,
                isUpdateDone                : false,
                submitted                   : true,
                errorMsg                    : false,
            };
        case patientLaboratoryTestConstants.NEW_LABORATORY_TEST_DATA_FAILURE:
            return {
                ...state,
                submitted                   : false,
                errorMsg                    : action.errorMsg,
            };
        case patientLaboratoryTestConstants.NEW_LABORATORY_TEST_DATA_SUCCESS:
            return {
                ...state,
                successMessage            : action.data.message,
                submitted                 : false,
                isUpdateDone              : true,
            };
        case configConstants.UNAUTHENTICATE:
        return {
            ...state,
            isUserNotValid : true,
            errorMsg       : false
        };
        case patientLaboratoryTestConstants.PATIENT_LABORATORY_TEST_RESET_STATE:
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