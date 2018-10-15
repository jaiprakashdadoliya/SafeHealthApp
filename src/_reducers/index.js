import { combineReducers } from 'redux';
import { sessionReducer } from '../_packages/redux-react-session';
import { doctorRegistration } from './doctorRegistrationReducer';
import { userLogin } from './userLoginReducer';
import { forgotPass } from './forgotPassReducer';
import { resetPass } from './resetPassReducer';
import { doctorProfile } from './doctorProfileReducer';
import { doctorExperience } from './doctorExperienceReducer';
import { doctorMembership } from './doctorMembershipReducer';
import { doctorDegree } from './doctorDegreeReducer';
import { doctorAwards } from './doctorAwardsReducer';
import { doctorMedia } from './doctorMediaReducer';
import { headerReducer } from './headerReducer';
import { doctorSpecialisation } from './doctorSpecialisationReducer';
import { doctorService } from './doctorServiceReducer';
import { region } from './regionReducer';
import { patient } from './patientReducer';
import { patientProfile } from './patientProfileReducer';
import { newPatient } from './newPatientReducer';
import { patientSymptoms } from './patientSymptomsReducer';
import { staticData } from './staticDataReducer';
import { generalCheckup } from './generalCheckupReducer';
import { medicalHistory } from './medicalHistoryReducer';
import { domesticFactor } from '../components/PatientList/EditPatient/PatientDomesticEnvironmentalFactors/domesticFactorReducer';
import { visit } from './visitReducer';
import { patientSocialAddiction } from '../components/PatientList/EditPatient/PatientSocialAddictionHistory/patientSocialAddictionReducer';
import { patientFamilyMedicalHistory } from '../components/PatientList/EditPatient/PatientFamilyMedicalHistory/patientFamilyMedicalHistoryReducer';
import { laboratoryTest } from '../components/PatientList/EditPatient/PatientLaboratoryTests/patientLaboratoryTestReducer';
import { patientAllergies } from '../components/PatientList/EditPatient/PatientAllergies/patientAllergiesReducer';
import { patientConsultant } from '../components/PatientList/EditPatient/PatientConsultantsImpression/patientConsultantReducer';
import { patientAllVisit } from '../components/PatientAllVisit/patientAllVisitReducer';
import { patientWorkEnvironment } from '../components/PatientList/EditPatient/PatientWorkEnvironmentalFactors/patientWorkEnvironmentReducer';
import { patientMedicalHistory } from '../components/PatientList/EditPatient/PatientMedicalHistory/patientMedicalHistoryReducer';
import { patientLaboratoryReport } from '../components/PatientList/EditPatient/PatientLaboratoryTests/PatientLaboratoryReport/patientLaboratoryReportReducer';
import { physicalExaminationSave } from '../components/PatientNewVisit/PhysicalExamination/physicalExaminationSaveReducer';
import { systemicExamination } from '../components/PatientNewVisit/SystemicExamination/systemicExaminationReducer';
import { patientInvestigations } from '../components/PatientList/EditPatient/PatientInvestigations/patientInvestigationsReducer';
import { Medications } from '../components/PatientNewVisit/Medications/medicationReducer';
import { patientProfileDashboard } from '../components/PatientProfile/patientProfileDashboardReducer';
import { manageStaff } from './manageStaffReducer';
import { changePassword } from './changePasswordReducer';
import { doctorTiming } from './doctorTimingReducer';
import { clinic } from './clinicReducer';
import { doctorDetail } from '../components/BookAppointments/DoctorDetails/doctorDetailReducer';
import { doctorListing } from '../components/DoctorListing/doctorListingReducer';
import { search } from '../components/Search/searchReducer';
import { patientPastKnownMedicalHistory } from '../components/PatientList/EditPatient/PatientPastKnownMedicalHistory/patientPastKnownMedicalHistoryReducer';
import { patientVaccinationHistory } from '../components/PatientList/EditPatient/PatientVaccinationHistory/patientVaccinationHistoryReducer';
import { patientResidentPlace } from '../components/PatientList/EditPatient/PatientDomesticEnvironmentalFactors/PatientResidentPlace/patientResidentPlaceReducer';
import { vitalsSaveFromInitialVisit } from '../components/PatientNewVisit/Vitals/vitalsSaveFromInitialVisitReducer';
import { patientDiagnosis } from '../components/PatientList/EditPatient/PatientDiagnosis/patientDiagnosisReducer';
import { nextVisitSchedule } from '../components/PatientNewVisit/NextVisitSchedule/nextVisitScheduleReducer';
import { clinicalNotes } from '../components/PatientNewVisit/ClinicalNotes/clinicalNotesReducer.js';
import { manageDrugs } from '../components/Setting/ManageDrugs/manageDrugsReducer';
import { medicalHistoryDoctor } from '../components/Setting/MedicalHistory/medicalHistoryDoctorReducer';
import { appointmentCategory } from '../components/AppointmentCategory/appointmentCategoryReducer';
import { referral } from '../components/Referral/referralReducer';
import { calendar } from '../components/Calendar/calendarReducer';
import { appointment } from '../components/BookAppointments/Appointment/appointmentReducer';
import { appointments } from '../components/Appointments/appointmentsReducer';
import { consentForms } from '../components/Setting/ConsentForms/consentFormsReducer';
import { patientGroups } from '../components/Setting/PatientGroups/patientGroupsReducer';
import { visitComponents } from '../components/Setting/VisitComponents/visitComponentsReducer';
import { chartReports } from '../components/Reports/ChartReport/chartReportsReducer';
import { patientReports } from '../components/Reports/PatientReports/patientReportsReducer';
import { manageCalendar } from '../components/Setting/ManageCalendar/manageCalendarReducer';
import { patientActivityHistory } from '../components/PatientHistory/patientActivityHistoryReducer';
import { manageCalendarAdd } from '../components/Calendar/ManageCalendarAdd/manageCalendarAddReducer';
import { laboratoryTests } from '../components/Setting/LaboratoryTests/laboratoryTestsReducer';
import { labTemplates } from '../components/Setting/LabTemplates/labTemplatesReducer';
import { medicalCertificates } from '../components/Setting/MedicalCertificate/medicalCertificatesReducer';
import { medicineTemplates } from '../components/Setting/MedicineTemplates/medicineTemplatesReducer';
import { payments } from '../components/Payments/paymentsReducer';
import { invoices } from '../components/Invoices/invoicesReducer';
import { checkupType } from '../components/Setting/CheckupType/checkupTypeReducer';
import { paymentMode } from '../components/Setting/PaymentMode/paymentModeReducer';
import { incomeReports } from '../components/Reports/IncomeReport/incomeReportsReducer';
const appReducer = combineReducers({
    doctorRegistration,
    userLogin,
    forgotPass,
    resetPass,
    doctorProfile,
    doctorExperience,
    headerReducer,
    doctorMembership,
    doctorMedia,
    doctorDegree,
    doctorSpecialisation,
    doctorService,
    doctorAwards,
    session: sessionReducer,
    region,
    patientProfile,
    newPatient,
    patientSymptoms,
    staticData,
    generalCheckup,
    medicalHistory,
    domesticFactor,
    visit,
    patientSocialAddiction,
    patientFamilyMedicalHistory,
    laboratoryTest,
    patientConsultant,
    patientAllVisit,
    patientWorkEnvironment,
    patientMedicalHistory,
    patientLaboratoryReport,
    physicalExaminationSave,
    patientInvestigations,
    Medications,
    patientProfileDashboard,
    manageStaff,
    doctorTiming,
    patient,
    clinic,
    doctorDetail,
    doctorListing,
    search,
    changePassword,
    patientPastKnownMedicalHistory,
    patientResidentPlace,
    appointment,
    patientAllergies,
    vitalsSaveFromInitialVisit,
    patientDiagnosis,
    nextVisitSchedule,
    clinicalNotes,
    manageDrugs,
    medicalHistoryDoctor,
    appointmentCategory,
    referral,
    consentForms,
    patientGroups,
    calendar,
    appointments,
    manageCalendar,
    patientActivityHistory,
    manageCalendarAdd,
    chartReports,
    visitComponents,
    laboratoryTests,
    systemicExamination,
    labTemplates,
    patientVaccinationHistory,
    medicalCertificates,
    medicineTemplates,
    patientReports,
    payments,
    invoices,
    checkupType,
    paymentMode,
    incomeReports
});

const rootReducer = ( state, action ) => {
  if ( action.type === 'LOGOUT_SUCCESS' ) {
    state = undefined;
  }
      
  return appReducer(state, action)
}


export default rootReducer;
