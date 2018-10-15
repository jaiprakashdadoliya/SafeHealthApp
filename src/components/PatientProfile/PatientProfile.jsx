import React from "react";
import {fontawesome, FontAwesomeIcon, Loading, PatientInfoHeader} from '../../global';
import {Header} from "../Header";
import {faMobileAlt, faUser, faTint, faIdCard } from '@fortawesome/fontawesome-free-solid';

import Loadable from 'react-loadable';
import { configConstants } from '../../_constants';
import { utilityHelper } from '../../_helpers';

const SideMenu = Loadable({
    loader: () => import('../SideMenu' /* webpackChunkName = "HeaderContainer" */).then(object => object.SideMenu),
    loading: Loading
});

const HeaderContainer = Loadable({
    loader: () => import('../Header' /* webpackChunkName = "HeaderContainer" */).then(object => object.HeaderContainer),
    loading: Loading
});

const VitalsContainer = Loadable({
    loader: () => import('./Vitals' /* webpackChunkName = "VitalsContainer" */).then(object => object.VitalsContainer),
    loading: Loading
});

const AssociatedDisorderContainer = Loadable({
    loader: () => import('./AssociatedDisorder' /* webpackChunkName = "AssociatedDisorderContainer" */).then(object => object.AssociatedDisorderContainer),
    loading: Loading
});

const FinalDiagnosisContainer = Loadable({
    loader: () => import('./FinalDiagnosis' /* webpackChunkName = "FinalDiagnosisContainer" */).then(object => object.FinalDiagnosisContainer),
    loading: Loading
});

const WeightChartContainer = Loadable({
    loader: () => import('./WeightChart' /* webpackChunkName = "WeightChartContainer" */).then(object => object.WeightChartContainer),
    loading: Loading
});

const PulseChartContainer = Loadable({
    loader: () => import('./PulseChart' /* webpackChunkName = "PulseChartContainer" */).then(object => object.PulseChartContainer),
    loading: Loading
});

const SpO2ChartContainer = Loadable({
    loader: () => import('./SpO2Chart' /* webpackChunkName = "SpO2ChartContainer" */).then(object => object.SpO2ChartContainer),
    loading: Loading
});

const BpChartContainer = Loadable({
    loader: () => import('./BpChart' /* webpackChunkName = "BpChartContainer" */).then(object => object.BpChartContainer),
    loading: Loading
});

const BmiChartContainer = Loadable({
    loader: () => import('./BmiChart' /* webpackChunkName = "BmiChartContainer" */).then(object => object.BmiChartContainer),
    loading: Loading
});

const RespiratoryRateChartContainer = Loadable({
    loader: () => import('./RespiratoryRateChart' /* webpackChunkName = "RespiratoryRateChartContainer" */).then(object => object.RespiratoryRateChartContainer),
    loading: Loading
});

const CurrentMedicinesContainer = Loadable({
    loader: () => import('./CurrentMedicines' /* webpackChunkName = "CurrentMedicinesContainer" */).then(object => object.CurrentMedicinesContainer),
    loading: Loading
});

const FEVChartContainer = Loadable({
    loader: () => import('./FEVChart' /* webpackChunkName = "BmiChartContainer" */).then(object => object.FEVChartContainer),
    loading: Loading
});
const FVCChartContainer = Loadable({
    loader: () => import('./FVCChart' /* webpackChunkName = "BmiChartContainer" */).then(object => object.FVCChartContainer),
    loading: Loading
});
const FEVFVCChartContainer = Loadable({
    loader: () => import('./FEVFVCChart' /* webpackChunkName = "BmiChartContainer" */).then(object => object.FEVFVCChartContainer),
    loading: Loading
});


export const PatientProfile = (props) => {
    const userInfo = utilityHelper.getUserInfo();
    return (
      <div className="page-container">
      {!props.medicalProfile && 
        <SideMenu />
      }
      <div className={props.medicalProfile ? '' : "main-content right-sidebar-remove"}>
        {!props.medicalProfile &&
            <HeaderContainer />
        }
                    <div className="wrap-inner-content">
                        <div className="">
                         {!props.medicalProfile &&
                            <div className="col-md-12">
                                <div className="box first">
                                    <div className="col-md-9 col-sm-9 patient-info">
                                    {/*    <h2>Patient Code: {props.patientUpdatedData.pat_code}
                                            <span>
                                                <FontAwesomeIcon icon={faMobileAlt} /> {configConstants.COUNTRY_CODE_SIGN+props.patientUpdatedData.user_country_code}{props.patientUpdatedData.user_mobile} 
                                                {props.patientUpdatedData.pat_blood_group_name !== '' ? ' | ':''}
                                                <FontAwesomeIcon icon={faTint} className={props.patientUpdatedData.pat_blood_group_name == '' ? 'hide' : ''} /> {props.patientUpdatedData.pat_blood_group_name}
                                                <br/>
                                                <FontAwesomeIcon icon={faIdCard} className={props.patientUpdatedData.pat_aadhar_no_formatted == '' ? 'hide' : ''} /> {props.patientUpdatedData.pat_aadhar_no_formatted}
                                            </span>
                                        </h2>
                                        {props.patientUpdatedData.pat_full_address_line1 != '' || props.patientUpdatedData.allergy_type_value != '' ? <div className="patient-address">
                                            {props.patientUpdatedData.pat_full_address_line1}<br/>
                                            {props.patientUpdatedData.pat_full_address_line2}<br/>
                                            {props.patientUpdatedData.country_name}
                                            <div className="red-color">
                                                {props.patientUpdatedData.allergy_type_value != '' ? 'Allergies: ' : ''}{props.patientUpdatedData.allergy_type_value}
                                            </div>
                                        </div> : ''}
                                    */}
                                        <PatientInfoHeader
                                            pat_code            = {props.patientUpdatedData.pat_code}
                                            visit_date          = ''
                                            user_firstname      = {props.patientUpdatedData.user_firstname}
                                            user_lastname       = {props.patientUpdatedData.user_lastname}
                                            country_code_sign   = {configConstants.COUNTRY_CODE_SIGN}
                                            country_code        = {props.patientUpdatedData.user_country_code}
                                            mobile              = {props.patientUpdatedData.user_mobile}
                                            age                 = {props.patientUpdatedData.age}
                                            blood_group         = {props.patientUpdatedData.pat_blood_group_name}
                                            allergy_type_value  = ''
                                            pat_profile_img     = {props.patientUpdatedData.pat_profile_img}
                                        />
                                        {props.patientUpdatedData.pat_full_address_line1 != '' || props.patientUpdatedData.allergy_type_value != '' ? <div className="patient-address">
                                            {props.patientUpdatedData.pat_full_address_line1}<br/>
                                            {props.patientUpdatedData.pat_full_address_line2}<br/>
                                            {props.patientUpdatedData.country_name}
                                            <div className="red-color">
                                                {props.patientUpdatedData.allergy_type_value != '' ? 'Allergies: ' : ''}{props.patientUpdatedData.allergy_type_value}
                                            </div>
                                        </div> : ''}
                                    </div>
                                    { userInfo.user_type != configConstants.USER_TYPE_PATIENT &&
                                        <div className="col-md-3 col-sm-3 text-right margin-top-30">
                                            <a title="Patient list" href={process.env.BASENAME+'patientlist'} className="btn text-btn yellow">Patient list</a>
                                            {/*<a title="Edit" href="encounter.html" className="btn text-btn green">Edit</a> */}
                                            <a title="Visits" href={process.env.BASENAME+'patientallvisit/'+props.patId} className="btn text-btn green">Visits</a>
                                        </div>
                                    }
                                </div>
                            </div>
                         }
                            <div className="profile-details">
                                <div className="col-md-">
                                    <div className="view-visit-section">
                                        <div className="box-outer">
                                            {!props.medicalProfile &&
                                                <VitalsContainer
                                                    vitalsData = {props.patientDashboardData.vitals}
                                                 />
                                            }
                                            {/*!props.medicalProfile &&
                                            <AssociatedDisorderContainer
                                            associatedDisorderData = {props.patientDashboardData.associated_disorder}
                                            />
                                            */}
                                            {!props.medicalProfile &&
                                            <FinalDiagnosisContainer
                                                finalDiagnosisData = {props.patientDashboardData.final_diagnosis}
                                            />
                                            }
                                            <WeightChartContainer
                                                weightChartData = {props.patientDashboardData.weight}
                                                medicalProfile  = {props.medicalProfile}
                                            />
                                            <PulseChartContainer
                                                pulseChartData = {props.patientDashboardData.pulse}
                                                medicalProfile  = {props.medicalProfile}
                                            />
                                            <SpO2ChartContainer
                                                spo2ChartData = {props.patientDashboardData.spo2}
                                                medicalProfile  = {props.medicalProfile}
                                            />
                                            <BpChartContainer
                                                diaChartData = {props.patientDashboardData.bp_dia}
                                                sysChartData = {props.patientDashboardData.bp_sys}
                                                medicalProfile  = {props.medicalProfile}
                                            />
                                            {!props.medicalProfile &&
                                            <BmiChartContainer
                                                bmiChartData = {props.patientDashboardData.bmi}
                                            />
                                            }
                                            {!props.medicalProfile &&
                                            <RespiratoryRateChartContainer
                                                respiratoryRateChartData = {props.patientDashboardData.respiratory_rate}
                                            />
                                            }

                                            {!props.medicalProfile &&
                                            <FEVChartContainer
                                                fevdata = {props.patientDashboardData.fev1}
                                            />
                                            }
                                            {!props.medicalProfile &&
                                            <FVCChartContainer
                                                fvcdata = {props.patientDashboardData.fvc}
                                            />
                                            }
                                            
                                            {!props.medicalProfile &&
                                            <FEVFVCChartContainer
                                                chartData = {props.patientDashboardData.fev1_fvc}
                                            />
                                            }
                                            


                                        </div>
                                        {!props.medicalProfile &&
                                        <CurrentMedicinesContainer
                                        filterAll               = { props.filterAll }
                                        filtered                = { props.filtered }
                                        patientMedicationSearch = { props.patientMedicationSearch }
                                        getPatientMedicationList= { props.getPatientMedicationList }
                                        pages                   = { props.pages}
                                        patientMedicationList   = { props.patientMedicationList}
                                        />
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}
