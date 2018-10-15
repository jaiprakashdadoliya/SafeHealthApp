import { generalCheckupConstants, configConstants } from '../_constants';

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
    isUpdateDone                : false,
    patientGeneralCheckupData   : [],

};

export function generalCheckup(state = initialState, action) {
    switch (action.type) {
        case generalCheckupConstants.GENERAL_CHECKUP_DATA_REQUEST:
            return {
                ...state,
                sendingRequest : true,
                isUpdateDone   : false,
                submitted      : false,
                errorMsg       : false,
            };
        case generalCheckupConstants.GENERAL_CHECKUP_DATA_FAILURE:
            return {
                ...state,
                sendingRequest  : false,
                errorMsg        : action.errorMsg
            };
        case generalCheckupConstants.GENERAL_CHECKUP_DATA_SUCCESS:
            return {
                ...state,
                sendingRequest            : false,
                patientGeneralCheckupData : action.patientGeneralCheckupData
            };

        case generalCheckupConstants.GENERAL_CHECKUP_ADD_UPDATE_REQUEST:
            return {
                ...state,
                submitted        : true,
                errorMsg         : false,
                successMessage   : false,
                isUpdateDone     : false,
            };
        case generalCheckupConstants.GENERAL_CHECKUP_ADD_UPDATE_SUCCESS:
            return {
                ...state, 
                successMessage   : action.generalCheckupPatientRecord.message,
                isUpdateDone     : true ,
                submitted        : false,
                errorMsg         : false,
            };
        case generalCheckupConstants.GENERAL_CHECKUP_ADD_UPDATE_FAILURE:
            return {
                ...state,
                submitted        : false, 
                errorMsg         : action.error,
                successMessage   : false,
                isUpdateDone     : false ,
            }; 
        case generalCheckupConstants.GENERAL_CHECKUP_RESET_STATE:
            return {
                ...state,
                submitted      : false,
                sendingRequest : false,
                successMessage : false,
                errorMsg       : false,
                isUserNotValid : false,
                isUpdateDone   : false,
            };
        default:
            return state
    }
}