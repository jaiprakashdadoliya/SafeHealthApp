import { configConstants } from '../../../../../_constants';
import { patientLaboratoryReportConstants } from './patientLaboratoryReportConstants';

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
    patientLaboratoryReportData:[],
    labTemplatesFetched:false,
    labTemplatesData:[]
};

export function patientLaboratoryReport(state = initialState, action) {
    switch (action.type) {
        
        // Add Reducer's  
        case patientLaboratoryReportConstants.PATIENT_LABORATORY_REPORT_ADD_REQUEST:
            return {
                ...state,
                submitted        : true,
                errorMsg         : false,
                successMsg       : false,
                isInsertDone     : false,
            };
        case patientLaboratoryReportConstants.PATIENT_LABORATORY_REPORT_ADD_SUCCESS:
            return {
                ...state, 
                successMsg       : action.result.message,
                dataGridRefresh  : true ,
                isInsertDone     : true ,
                submitted        : false,
                errorMsg         : false,
            };
        case patientLaboratoryReportConstants.PATIENT_LABORATORY_REPORT_ADD_FAILURE:
            return {
                ...state,
                submitted        : false, 
                dataGridRefresh  : false ,
                errorMsg         : action.errorMsg,
                successMsg       : false,
                isInsertDone     : false ,
            }; 
        
        // Grid data Reducer's  
        case patientLaboratoryReportConstants.PATIENT_LABORATORY_REPORT_GRID_REQUEST:
            return {
              ...state,
              sendingRequest  : true
            };
        case patientLaboratoryReportConstants.PATIENT_LABORATORY_REPORT_GRID_FAILURE:
            return {
                ...state,
                sendingRequest  : false,
                dataGridRefresh : false,
                errorMsg        : action.errorMsg
            };
        case patientLaboratoryReportConstants.PATIENT_LABORATORY_REPORT_GRID_SUCCESS:
            return {
                ...state,
                sendingRequest                  : false,
                dataGridRefresh                 : false,
                patientLaboratoryReportData      : action.result,
                errorMsg                        : false
            };
        case patientLaboratoryReportConstants.PATIENT_LABORATORY_REPORT_RESET:
            return {
                ...state,
                dataGridRefresh : false,
                isInsertDone    : false,
                successMsg      : false,
                errorMsg        : false,
                labTemplatesFetched :false,
            };

          // DELETE Reducer's  
        case patientLaboratoryReportConstants.PATIENT_LABORATORY_REPORT_DELETE_REQUEST:
            return {
                ...state,
                errorMsg         : false,
                successMsg       : false,
            };
        case patientLaboratoryReportConstants.PATIENT_LABORATORY_REPORT_DELETE_SUCCESS:
            return {
                ...state, 
                successMsg       : action.result.message,
                dataGridRefresh  : true,
                errorMsg         : false,
                isInsertDone     : true,
            };
        case patientLaboratoryReportConstants.LABORATORY_TEMP_REQUEST:
            return {
                ...state,
                labTemplatesFetched  : false, 
            };
         // Grid data Reducer's  
        case patientLaboratoryReportConstants.LABORATORY_TEMP_SUCCESS:
            return {
              ...state,
              labTemplatesFetched  : true,
              labTemplatesData     : action.result.result,
            };
        case patientLaboratoryReportConstants.LABORATORY_TEMP_FAILURE:
            return {
                ...state,
                labTemplatesFetched  : false,
            };
        case patientLaboratoryReportConstants.PATIENT_LABORATORY_REPORT_GRID_SUCCESS:
            return {
                ...state,
                sendingRequest                  : false,
                dataGridRefresh                 : false,
                patientLaboratoryReportData      : action.result,
                errorMsg                        : false
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