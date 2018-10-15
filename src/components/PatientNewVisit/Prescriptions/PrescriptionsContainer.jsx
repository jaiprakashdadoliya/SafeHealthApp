import React from "react";
import { connect } from 'react-redux';
import Loadable from 'react-loadable'; 
import { Loading } from '../../../global';
import { utilityHelper } from '../../../_helpers';
import { configConstants, dataConstants } from '../../../_constants';
import { patientSymptomsActions } from '../../../_actions';
import { VitalsSaveFromInitialVisitActions } from '../Vitals/VitalsSaveFromInitialVisitActions';
import { medicationActions } from '../Medications/medicationActions';
import { clinicalNotesActions } from '../ClinicalNotes/clinicalNotesActions';
import { patientDiagnosisActions } from '../../PatientList/EditPatient/PatientDiagnosis/patientDiagnosisActions';
import {patientLaboratoryReportActions} from '../../PatientList/EditPatient/PatientLaboratoryTests/PatientLaboratoryReport/patientLaboratoryReportActions';


const Prescriptions = Loadable({
    loader: () => import('./Prescriptions' /* webpackChunkName = "Prescriptions" */).then(object => object.Prescriptions),
    loading: Loading
});

class PrescriptionsContainer extends React.Component {
	constructor(props){
		super(props);

        this.state = {
            print_symptoms: dataConstants.PRINT_IN_PRESCRIPTION_NO,
            print_diagnosis: dataConstants.PRINT_IN_PRESCRIPTION_NO,
            print_labtest  : dataConstants.PRINT_IN_PRESCRIPTION_NO
        };

        this.handlePrintSymptomChange = this.handlePrintSymptomChange.bind(this);
        this.printPrescription        = this.printPrescription.bind(this);
	}

    /**
     * @DateOfCreation        20 Aug 2018
     * @ShortDescription      This function is responsible to get Symptoms Data
     * @param                 Event Object
     * @return                Nothing
     */
    componentWillMount(){
        const { dispatch, patId, visitId } = this.props;

        let extraData = {};
        extraData['pat_id']     = patId;
        extraData['visit_id']   = visitId;
        extraData['form_type']  = ['vitals-form-fector', 'vitals-Weight-form-fector'];        
        dispatch(VitalsSaveFromInitialVisitActions.getListRecords(extraData));

        dispatch(patientSymptomsActions.getSymptomslist(patId, visitId, 0, '-1', '', ''));
        dispatch(patientDiagnosisActions.getDiagnosisListAction(patId, visitId, 0, '-1', '', ''));
        dispatch(medicationActions.getPatientMedicationRecord(visitId, patId));
        dispatch(clinicalNotesActions.getClinicalNotesList(visitId, patId));
        dispatch(patientLaboratoryReportActions.getTablelist(patId, visitId, 0, '-1', '', ''));
    }

    /**
     * @DateOfCreation        29 Aug 2018
     * @ShortDescription      This function is responsible to show / hide symptoms, diagnosis, clinical notes in prescription
     * @param                 Event Object
     * @return                Nothing
     */
    handlePrintSymptomChange(event){
        const { name }  = event.target;
        var checked     = event.target.checked;
        const {state}   = this.state;

        let printSymptoms = dataConstants.PRINT_IN_PRESCRIPTION_NO;
        let printDiagnosis = dataConstants.PRINT_IN_PRESCRIPTION_NO;
        let printLabtest   = dataConstants.PRINT_IN_PRESCRIPTION_NO;
        if(name == 'is_print_symptoms'){
            if(checked == dataConstants.PRINT_IN_PRESCRIPTION_YES){
                printSymptoms = dataConstants.PRINT_IN_PRESCRIPTION_YES;
            }
            this.setState({
                ...state,
                print_symptoms : printSymptoms
            });
        }

        if(name == 'is_print_diagnosis'){
            if(checked == dataConstants.PRINT_IN_PRESCRIPTION_YES){
                printDiagnosis = dataConstants.PRINT_IN_PRESCRIPTION_YES;
            }
            this.setState({
                ...state,
                print_diagnosis : printDiagnosis
            });
        }
        if(name == 'is_print_labtest'){
            if(checked == dataConstants.PRINT_IN_PRESCRIPTION_YES){
                printLabtest = dataConstants.PRINT_IN_PRESCRIPTION_YES;
            }
            this.setState({
                ...state,
                print_labtest : printLabtest
            });
        }
    }

    /**
     * @DateOfCreation        29 August 2018
     * @ShortDescription      This function is responsible open print prescription url
     * @param                 Event Object
     * @return                Nothing
     */
    printPrescription(pat_Id, visit_id){
        if(pat_Id!== null && pat_Id !='' && visit_id !== null && visit_id != ''){
            let url = configConstants.API_BASE_PATH + 'visit/generate-prescription/'+pat_Id+'/'+visit_id+'/'+this.state.print_symptoms+'/'+this.state.print_diagnosis+'/'+this.state.print_labtest;

            window.open(url, '_blank');
        }
    }

    render() {
        if(this.props.patientSymptomsData && this.props.fetchedVitalsData && this.props.isClinicalDataFetched){
            return (
                <div >
                    <Prescriptions 
                        patId                   = {this.props.patId}
                        visitId                 = {this.props.visitId}
                        user_type               = {this.props.user_type}
                        patientMedicationData   = {this.props.patientMedicationData}
                        clinicalNotesList       = {this.props.clinicalNotesList}
                        patientSymptomsData     = {this.props.patientSymptomsData}
                        patientDiagnosisData    = {this.props.patientDiagnosisData}
                        vitalsFormData          = {this.props.patientVitalsData.VisitsVitalsFormFector}
                        handlePrintSymptomChange= {this.handlePrintSymptomChange}
                        printPrescription       = {this.printPrescription}
                        patientLaboratoryReportData = {this.props.patientLaboratoryReportData}
                    />
                </div>
            );            
        } else {
            return('<div></div>');
        }
    }
}

/**
 * @DateOfCreation        18 June 2018
 * @ShortDescription      This function is responsible to map store state to props
 * @return                View
 */
function mapStateToProps(state) {
    const { patientSymptomsData } = state.patientSymptoms;
    const { fetchedVitalsData, patientVitalsData} = state.vitalsSaveFromInitialVisit;
    const { patientDiagnosisData } = state.patientDiagnosis;
    const { patientMedicationData } = state.Medications;
    const { clinicalNotesList, isClinicalDataFetched } = state.clinicalNotes;
    const { patientLaboratoryReportData } = state.patientLaboratoryReport;
    return {
        patientSymptomsData,
        patientVitalsData,
        fetchedVitalsData,
        patientDiagnosisData,
        patientMedicationData,
        clinicalNotesList,
        isClinicalDataFetched,
        patientLaboratoryReportData,
        user_type:state.session.user.user_type
    };

}

const connectedPrescriptionsContainer = connect(mapStateToProps)(PrescriptionsContainer);
export { connectedPrescriptionsContainer as PrescriptionsContainer };