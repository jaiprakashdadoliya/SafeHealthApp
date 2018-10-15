import { newPatientConstants,configConstants } from '../_constants';

/**
 * region
 *
 * @package                ILD INDIA
 * @subpackage             newPatient
 * @category               Reducers
 * @DateOfCreation         15 June 2018
 * @ShortDescription       This is responsible for Insert newPatient Information
 */
//Initial State on load state and intial action with their type
const initialState = {
    sendingRequest: false,
    gridRefresh: false,
    successMsg: false,
    errorMsg:false,
    isUserNotValid:false,
    isInsertDone:false,
    isReferralDoctorFetchDone: false,
    isPatientGroupsFetchDone: false,
    referralDoctor:[],
    patientGroups:[]
};
export function newPatient(state = initialState, action) {
  switch (action.type) {
    case newPatientConstants.NEW_PATIENT_REQUEST:
        return {
            ...state,
            sendingRequest  : true,
            errorMsg        : false,
            gridRefresh     : false,
            isInsertDone    : false,
        };
    case newPatientConstants.NEW_PATIENT_FAILURE:
        return {
            ...state,
            sendingRequest  : false,
            errorMsg        : action.errorMsg,
            gridRefresh     : false,
            isInsertDone    : false,
        };
    case newPatientConstants.NEW_PATIENT_SUCCESS:
        return {
            ...state,
            sendingRequest  : false,
            successMsg      : action.data.message,
            gridRefresh     : true,
            isInsertDone    : true,
            errorMsg        : false,

        };
    case newPatientConstants.REF_DOCTOR_REQUEST:
        return {
            ...state,
            sendingRequest  : true,
            errorMsg        : false,
            isReferralDoctorFetchDone    : false,
        };
    case newPatientConstants.REF_DOCTOR_FAILURE:
        return {
            ...state,
            sendingRequest  : false,
            errorMsg        : action.errorMsg,
            isReferralDoctorFetchDone    : false,
        };
    case newPatientConstants.REF_DOCTOR_SUCCESS:
        return {
            ...state,
            sendingRequest  : false,
            referralDoctor  : action.referralDoctor.result,
            isReferralDoctorFetchDone     : true,
            errorMsg        : false,

        };
    case newPatientConstants.PAT_GROUP_REQUEST:
        return {
            ...state,
            sendingRequest  : true,
            errorMsg        : false,
            isPatientGroupsFetchDone    : false,
        };
    case newPatientConstants.PAT_GROUP_FAILURE:
        return {
            ...state,
            sendingRequest  : false,
            errorMsg        : action.errorMsg,
            isPatientGroupsFetchDone    : false,
        };
    case newPatientConstants.PAT_GROUP_SUCCESS:
        return {
            ...state,
            sendingRequest  : false,
            patientGroups   : action.patientGroups.result,
            isPatientGroupsFetchDone     : true,
            errorMsg        : false,

        };
    case newPatientConstants.NEW_PATIENT_RESET:
        return {
            ...state,
            sendingRequest  : false,
            successMsg      : false,
            gridRefresh     : false,
            errorMsg        : false,
            isInsertDone    : false,
            isReferralDoctorFetchDone     : false,
            isPatientGroupsFetchDone     : false,

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
