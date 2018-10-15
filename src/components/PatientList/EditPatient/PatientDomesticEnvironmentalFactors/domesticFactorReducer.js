import { configConstants } from '../../../../_constants';
import { domesticFactorConstants } from './domesticFactorConstants';


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
    fetchedDomesticFactorData   : false,
    isUpdateDone                : false,
    patientDomesticFactorData   : [],

};

export function domesticFactor(state = initialState, action) {
    switch (action.type) {
        case domesticFactorConstants.PATIENT_DOMESTIC_FACTOR_DATA_REQUEST:
            return {
                ...state,
                sendingRequest              : true,
                isUpdateDone                : false,
                submitted                   : false,
                errorMsg                    : false,
                fetchedDomesticFactorData   : false
            };
        case domesticFactorConstants.PATIENT_DOMESTIC_FACTOR_DATA_FAILURE:
            return {
                ...state,
                sendingRequest              : false,
                errorMsg                    : action.errorMsg,
                fetchedDomesticFactorData   : false,
            };
        case domesticFactorConstants.PATIENT_DOMESTIC_FACTOR_DATA_SUCCESS:
            return {
                ...state,
                sendingRequest            : false,
                patientDomesticFactorData : action.patientDomesticFactorData.result,
                fetchedDomesticFactorData : true,
            };
        case domesticFactorConstants.NEW_DOMESTIC_FACTOR_DATA_REQUEST:
            return {
                ...state,
                isUpdateDone                : false,
                submitted                   : true,
                errorMsg                    : false,
            };
        case domesticFactorConstants.NEW_DOMESTIC_FACTOR_DATA_FAILURE:
            return {
                ...state,
                submitted                   : false,
                errorMsg                    : action.errorMsg,
            };
        case domesticFactorConstants.NEW_DOMESTIC_FACTOR_DATA_SUCCESS:
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
        case domesticFactorConstants.PATIENT_DOMESTIC_FACTOR_RESET_STATE:
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