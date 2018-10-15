import { configConstants } from './../../../_constants';
import { utilityHelper } from './../../../_helpers';
import { medicalCertificatesConstants } from './medicalCertificatesConstants';

/**
 * Medical Certificates Reducer
 *
 * @package                SafeHealth
 * @subpackage             Medical Certificates Reducer
 * @category               Reducers
 * @DateOfCreation         3 Sept 2018
 * @ShortDescription       This is responsible for all state related to Medical Certificates
 */

//Initial State on load state and initial action with their type
const initialState = {
    submitted                   : false,
    sendingRequest              : false,
    successMessage              : false,
    errorMsg                    : false,
    isUserNotValid              : false,
    isUpdateDone                : false,
    medicalCertificatesData      : [],
    isMedicalCertificatesDataFetched: false,
};

export function medicalCertificates(state = initialState, action) {
    switch (action.type) {
        case medicalCertificatesConstants.MEDICAL_CERTIFICATES_DATA_REQUEST:
            return {
                ...state,
                sendingRequest : true,
                isUpdateDone   : false,
                submitted      : false,
                errorMsg       : false,
            };
        case medicalCertificatesConstants.MEDICAL_CERTIFICATES_DATA_FAILURE:
            return {
                ...state,
                sendingRequest  : false,
                errorMsg        : action.errorMsg
            };
        case medicalCertificatesConstants.MEDICAL_CERTIFICATES_DATA_SUCCESS:
            return {
                ...state,
                sendingRequest                  : false,
                isMedicalCertificatesDataFetched : true,
                medicalCertificatesData          : action.result
            };

        case medicalCertificatesConstants.MEDICAL_CERTIFICATES_DATA_SAVE_SUCCESS :
            return  { 
                ...state,
                sendingRequest : true, 
                successMessage : action.successMsg.message,
                isUpdateDone   : true, 
                submitted      : true,
                medicalCertificatesData : action.successMsg.result,
                isMedicalCertificatesDataFetched: true,
            };
        case medicalCertificatesConstants.MEDICAL_CERTIFICATES_DATA_SAVE_FAILURE :
            return  { 
                ...state,
                sendingRequest : false, 
                isClinicSaved   : false, 
                submitted      : false,
                errorMsg       : action.error
            };

        case medicalCertificatesConstants.MEDICAL_CERTIFICATES_RESET_STATE:
            return {
                ...state,
                submitted                   : false,
                sendingRequest              : false,
                successMessage              : false,
                errorMsg                    : false,
                isUserNotValid              : false,
                isUpdateDone                : false,
            };
        case configConstants.UNAUTHENTICATE:
            return {
                ...state,
                isUserNotValid : true,
                errorMsg       : false
            };
        default:
            return state
    }
}