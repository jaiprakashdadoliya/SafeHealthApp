import { configConstants } from '../../../../../_constants';
import { patientResidentPlaceConstants } from './patientResidentPlaceConstants';

/**
 *patient
 *
 * @package                ILD INDIA Registry
 * @subpackage             PatientProfile
 * @category               Reducers
 * @DateOfCreation         15 June 2018
 * @ShortDescription       This is responsible for all state related to Doctor profile
 */
//Initial State on load state and intial action with their type
const initialState = {
    dataGridRefresh: false,
    isInsertDone: false,
    submitted:false,
    sendingRequest: false,
    successMsg: false,
    errorMsg:false,
    isUserNotValid:false,
    patientResidentPlaceData:[],
};

export function patientResidentPlace(state = initialState, action) {
    switch (action.type) {
        
        // Add Reducer's  
        case patientResidentPlaceConstants.PATIENT_RESIDENT_PLACE_ADD_REQUEST:
            return {
                ...state,
                submitted        : true,
                errorMsg         : false,
                successMsg       : false,
                isInsertDone     : false,
            };
        case patientResidentPlaceConstants.PATIENT_RESIDENT_PLACE_ADD_SUCCESS:
            return {
                ...state, 
                successMsg       : action.result.message,
                dataGridRefresh  : true ,
                isInsertDone     : true ,
                submitted        : false,
                errorMsg         : false,
            };
        case patientResidentPlaceConstants.PATIENT_RESIDENT_PLACE_ADD_FAILURE:
            return {
                ...state,
                submitted        : false, 
                dataGridRefresh  : false ,
                errorMsg         : action.errorMsg,
                successMsg       : false,
                isInsertDone     : false ,
            }; 
        
        // Grid data Reducer's  
        case patientResidentPlaceConstants.PATIENT_RESIDENT_PLACE_GRID_REQUEST:
            return {
              ...state,
              sendingRequest  : true
            };
        case patientResidentPlaceConstants.PATIENT_RESIDENT_PLACE_GRID_FAILURE:
            return {
                ...state,
                sendingRequest  : false,
                dataGridRefresh : false,
                errorMsg        : action.errorMsg
            };
        case patientResidentPlaceConstants.PATIENT_RESIDENT_PLACE_GRID_SUCCESS:
            return {
                ...state,
                sendingRequest                  : false,
                dataGridRefresh                 : false,
                patientResidentPlaceData      : action.result,
                errorMsg                        : false
            };
        case patientResidentPlaceConstants.PATIENT_RESIDENT_PLACE_RESET:
            return {
                ...state,
                dataGridRefresh : false,
                isInsertDone    : false,
                successMsg      : false,
                errorMsg        : false,
            };

          // DELETE Reducer's  
        case patientResidentPlaceConstants.PATIENT_RESIDENT_PLACE_DELETE_REQUEST:
            return {
                ...state,
                errorMsg         : false,
                successMsg       : false,
            };
        case patientResidentPlaceConstants.PATIENT_RESIDENT_PLACE_DELETE_SUCCESS:
            return {
                ...state, 
                successMsg       : action.result.message,
                dataGridRefresh  : true,
                errorMsg         : false,
                isInsertDone     : true,
            };
        case patientResidentPlaceConstants.PATIENT_RESIDENT_PLACE_DELETE_FAILURE:
            return {
                ...state,
                dataGridRefresh  : false ,
                successMsg       : false ,
                errorMsg         : action.errorMsg,
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