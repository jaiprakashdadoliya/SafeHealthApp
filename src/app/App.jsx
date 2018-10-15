/**
 * App
 *
 * @package                SafeHealth
 * @subpackage             App
 * @category               Component
 * @DateOfCreation         11 May 2018
 * @ShortDescription       This is the parent most component for full app
 */

import React from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import { UserRoute } from './UserRoute';
import { PatientRoute } from './PatientRoute';
import { Loading } from './../global';
import { configConstants } from './../_constants';
import 'react-select/dist/react-select.css';
import "../assets/css_safehealth/bootstrap.css";
import "../assets/css_safehealth/mine.css";
import 'react-confirm-alert/src/react-confirm-alert.css'
import {ErrorBoundary} from '../_packages/errorBoundary';


const LoginContainer = Loadable({
    loader: () => import('../components/Login' /* webpackChunkName = "Login" */).then(object => object.LoginContainer),
    loading: Loading
});

const RegisterContainer = Loadable({
    loader: () => import('../components/Register').then(object => object.RegisterContainer),
    loading: Loading
});

const PatientListContainer = Loadable({
    loader: () => import('../components/PatientList').then(object => object.PatientListContainer),
    loading: Loading
});

const EditPatient = Loadable({
    loader: () => import('../components/PatientList/EditPatient').then(object => object.EditPatient),
    loading: Loading
});

const PatientAllVisitContainer = Loadable({
    loader: () => import('../components/PatientAllVisit').then(object => object.PatientAllVisitContainer),
    loading: Loading
});

const PatientNewVisitContainer = Loadable({
    loader: () => import('../components/PatientNewVisit').then(object => object.PatientNewVisitContainer),
    loading: Loading
});

const DashboardContainer = Loadable({
    loader: () => import('../components/Admin/Dashboard').then(object => object.DashboardContainer),
    loading: Loading
});

const DoctorListContainer = Loadable({
    loader: () => import('../components/Admin/DoctorList').then(object => object.DoctorListContainer),
    loading: Loading
});

const AnalyticsContainer = Loadable({
    loader: () => import('../components/Admin/Analytics').then(object => object.AnalyticsContainer),
    loading: Loading
});

const AdminPatientListContainer = Loadable({
    loader: () => import('../components/Admin/AdminPatientList').then(object => object.AdminPatientListContainer),
    loading: Loading
});

const AdminPatientAllVisitContainer = Loadable({
    loader: () => import('../components/Admin/AdminPatientAllVisit').then(object => object.AdminPatientAllVisitContainer),
    loading: Loading
});

const AdminPatientEditContainer = Loadable({
    loader: () => import('../components/Admin/AdminPatientEdit').then(object => object.AdminPatientEditContainer),
    loading: Loading
});

const AdminPatientNewVisitContainer = Loadable({
    loader: () => import('../components/Admin/AdminPatientNewVisit').then(object => object.AdminPatientNewVisitContainer),
    loading: Loading
});

const ForgotPasswordContainer = Loadable({
    loader: () => import('../components/ForgotPassword').then(object => object.ForgotPasswordContainer),
    loading: Loading
});

const DoctorProfileContainer = Loadable({
    loader: () => import('../components/DoctorProfile').then(object => object.DoctorProfileContainer),
    loading: Loading
});

const PatientProfileContainer = Loadable({
    loader: () => import('../components/PatientProfile').then(object => object.PatientProfileContainer),
    loading: Loading
});
const AppointmentsContainer = Loadable({
    loader: () => import('../components/Appointments').then(object => object.AppointmentsContainer),
    loading: Loading
});
const ScheduleAppointmentContainer = Loadable({
    loader: () => import('../components/ScheduleAppointment').then(object => object.ScheduleAppointmentContainer),
    loading: Loading
});

const ClinicContainer = Loadable({
    loader: () => import('../components/Clinic').then(object => object.ClinicContainer),
    loading: Loading
});
const SearchContainer = Loadable({
    loader: () => import('../components/Search').then(object => object.SearchContainer),
    loading: Loading
});
const DoctorListingContainer = Loadable({
    loader: () => import('../components/DoctorListing').then(object => object.DoctorListingContainer),
    loading: Loading
});
const BookAppointmentsContainer = Loadable({
    loader: () => import('../components/BookAppointments').then(object => object.BookAppointmentsContainer),
    loading: Loading
});
const ManageStaffContainer = Loadable({
    loader: () => import('../components/ManageStaff').then(object => object.ManageStaffContainer),
    loading: Loading
});
const Setting = Loadable({
    loader: () => import('../components/Setting').then(object => object.Setting),
    loading: Loading
});
const ChangePassword = Loadable({
    loader: () => import('../components/Setting/ChangePassword').then(object => object.ChangePassword),
    loading: Loading
});
const PatientHistoryContainer = Loadable({
    loader: () => import('../components/PatientHistory').then(object => object.PatientHistoryContainer),
    loading: Loading
});
const Reports = Loadable({
    loader: () => import('../components/Reports').then(object => object.Reports),
    loading: Loading
});
const LabReportsContainer = Loadable({
    loader: () => import('../components/LabReports').then(object => object.LabReportsContainer),
    loading: Loading
});
const SamplesContainer = Loadable({
    loader: () => import('../components/LabReports').then(object => object.SamplesContainer),
    loading: Loading
});
const LabPatientsContainer = Loadable({
    loader: () => import('../components/LabReports').then(object => object.LabPatientsContainer),
    loading: Loading
});

const TestsContainer = Loadable({
    loader: () => import('../components/LabReports').then(object => object.TestsContainer),
    loading: Loading
});

const InvoicesContainer = Loadable({
    loader: () => import('../components/Invoices').then(object => object.InvoicesContainer),
    loading: Loading
});

const PaymentsContainer = Loadable({
    loader: () => import('../components/Payments').then(object => object.PaymentsContainer),
    loading: Loading
});

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ErrorBoundary>
            <Router basename={process.env.BASENAME}>
              { this.props.checked &&
                <Switch>
                    <Route exact path='/' component={SearchContainer} />
                    <Route path='/login' component={LoginContainer} />
                    <Route path='/forgotpassword' component={ForgotPasswordContainer} />
                    <Route path='/register' component={RegisterContainer} />
                    <Route path='/doctorlisting/:splId?/:cityId?/:srvId?/:splTagId?/:latitude?/:longitude?' component={DoctorListingContainer} />
                    <Route path='/bookappointments/:doctorName?' component={BookAppointmentsContainer} />
                    <Route path='/reportslist' component={LabReportsContainer}/>
                    <Route path='/sampleslist' component={SamplesContainer}/> 
                    <Route path='/labpatientslist' component={LabPatientsContainer}/> 
                    <Route path='/testslist' component={TestsContainer}/>
                    
                    <UserRoute path='/patientlist' component={PatientListContainer} authenticated={this.props.authenticated}  allowuser={[configConstants.USER_TYPE_DOCTOR, configConstants.USER_TYPE_ADMIN, configConstants.USER_TYPE_STAFF]} />
                    <UserRoute path='/editpatient/:patId/:visitId' component={EditPatient} authenticated={this.props.authenticated} allowuser={[configConstants.USER_TYPE_DOCTOR, configConstants.USER_TYPE_ADMIN, configConstants.USER_TYPE_PATIENT, configConstants.USER_TYPE_STAFF]} />
                    <UserRoute path='/patientallvisit/:patId/:bookingId?' component={PatientAllVisitContainer} authenticated={this.props.authenticated} allowuser={[configConstants.USER_TYPE_DOCTOR, configConstants.USER_TYPE_ADMIN, configConstants.USER_TYPE_PATIENT, configConstants.USER_TYPE_STAFF]} />

                    <UserRoute path='/patientnewvisit/:patId/:visitId/:bookingId?' component={PatientNewVisitContainer}  authenticated={this.props.authenticated} allowuser={[configConstants.USER_TYPE_DOCTOR, configConstants.USER_TYPE_ADMIN, configConstants.USER_TYPE_PATIENT, configConstants.USER_TYPE_STAFF]} />
                    <UserRoute path='/patientprofile/:patId' component={PatientProfileContainer} authenticated={this.props.authenticated} allowuser={[configConstants.USER_TYPE_DOCTOR, configConstants.USER_TYPE_ADMIN, configConstants.USER_TYPE_STAFF]} />
                    <UserRoute path='/doctorprofile' component={DoctorProfileContainer} authenticated={this.props.authenticated} allowuser={[configConstants.USER_TYPE_DOCTOR, configConstants.USER_TYPE_ADMIN]} />
                    <UserRoute path='/clinics' component={ClinicContainer} authenticated={this.props.authenticated} allowuser={[configConstants.USER_TYPE_DOCTOR, configConstants.USER_TYPE_ADMIN, configConstants.USER_TYPE_STAFF]} />

                    <UserRoute path='/managestaff' component={ManageStaffContainer} authenticated={this.props.authenticated} allowuser={[configConstants.USER_TYPE_DOCTOR, configConstants.USER_TYPE_ADMIN, configConstants.USER_TYPE_STAFF]}/>

                    <UserRoute path='/setting' component={Setting} authenticated={this.props.authenticated} allowuser={[configConstants.USER_TYPE_DOCTOR, configConstants.USER_TYPE_ADMIN, configConstants.USER_TYPE_STAFF]}/>

                     <UserRoute path='/changepassword' component={ChangePassword} authenticated={this.props.authenticated} allowuser={[configConstants.USER_TYPE_DOCTOR, configConstants.USER_TYPE_PATIENT, configConstants.USER_TYPE_ADMIN, configConstants.USER_TYPE_STAFF]}/>
                    
                    <UserRoute path='/appointments' component={AppointmentsContainer} authenticated={this.props.authenticated} allowuser={[configConstants.USER_TYPE_DOCTOR, configConstants.USER_TYPE_ADMIN,, configConstants.USER_TYPE_PATIENT, configConstants.USER_TYPE_STAFF]}/>
                    <UserRoute path='/scheduleAppointment' component={ScheduleAppointmentContainer} authenticated={this.props.authenticated} allowuser={[configConstants.USER_TYPE_DOCTOR, configConstants.USER_TYPE_ADMIN, configConstants.USER_TYPE_STAFF]}/>
                    <UserRoute path='/clinics' component={ClinicContainer} authenticated={this.props.authenticated} allowuser={[configConstants.USER_TYPE_DOCTOR, configConstants.USER_TYPE_ADMIN, configConstants.USER_TYPE_STAFF]}/>
                    <UserRoute path='/reports' component={Reports} authenticated={this.props.authenticated} allowuser={[configConstants.USER_TYPE_DOCTOR]}/>

                    <PatientRoute path='/dashboard' component={PatientProfileContainer} authenticated={this.props.authenticated}/>
                    <PatientRoute path='/myprofile/:patId/:visitId' component={EditPatient} authenticated={this.props.authenticated} />
                    <UserRoute path='/patienthistory/:patId' component={PatientHistoryContainer} authenticated={this.props.authenticated} allowuser={[configConstants.USER_TYPE_DOCTOR, configConstants.USER_TYPE_ADMIN, configConstants.USER_TYPE_STAFF]} />
                    <UserRoute path='/payments' component={PaymentsContainer} authenticated={this.props.authenticated} allowuser={[configConstants.USER_TYPE_DOCTOR]} />
                    <UserRoute path='/invoices' component={InvoicesContainer} authenticated={this.props.authenticated} allowuser={[configConstants.USER_TYPE_DOCTOR]} />
                    
                    {/*<UserRoute path='/dashboard' component={DashboardContainer} authenticated={this.props.authenticated} allowuser={[configConstants.USER_TYPE_ADMIN]} />
                    
                    <UserRoute path='/doctorlist' component={DoctorListContainer} authenticated={this.props.authenticated} allowuser={[configConstants.USER_TYPE_ADMIN]} />
                    <UserRoute path='/adminpatientlist' component={AdminPatientListContainer} authenticated={this.props.authenticated} allowuser={[configConstants.USER_TYPE_ADMIN]} />
                    <UserRoute path='/analytics' component={AnalyticsContainer} authenticated={this.props.authenticated} allowuser={[configConstants.USER_TYPE_ADMIN]} />*/}
                </Switch>
               }
            </Router>
            </ErrorBoundary>
        );
    }
}

const { bool } = PropTypes;

App.propTypes = {
  authenticated: bool.isRequired,
  checked: bool.isRequired
};

const mapState = ({ session }) => ({
  checked: session.checked,
  authenticated: session.authenticated
});

// Connection with State
const connectedApp = connect(mapState)(App);
export { connectedApp as App };
