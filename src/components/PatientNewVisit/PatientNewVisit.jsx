import React from "react";
import {PatientInfoHeader, Loading } from '../../global';
import {  configConstants } from '../../_constants';
import {Button, Alert, bsStyle, Badge} from 'react-bootstrap';
import Loadable from 'react-loadable';
import {formConfig} from '../../_packages/fx-manager/PatientSymptopmsConfig';


const SideMenu = Loadable({
    loader: () => import('../SideMenu' /* webpackChunkName = "HeaderContainer" */).then(object => object.SideMenu),
    loading: Loading
});

const HeaderContainer = Loadable({
    loader: () => import('../Header' /* webpackChunkName = "HeaderContainer" */).then(object => object.HeaderContainer),
    loading: Loading
});

var components = [];


const PatientSymptomsContainer = [Loadable({
                                    loader: () => import('../PatientList/EditPatient/PatientSymptoms')
                                                  .then(object => object.PatientSymptomsContainer),
                                    loading: Loading
                                }),1];

const VitalsSaveFromInitialVisitContainer = [Loadable({
                                                loader: () => import('./Vitals')
                                                              .then(object => object.VitalsSaveFromInitialVisitContainer),
                                                loading: Loading
                                            }),2];

const PhysicalExaminationSaveContainer = [Loadable({
                                            loader: () => import('./PhysicalExamination')
                                                          .then(object => object.PhysicalExaminationSaveContainer),
                                            loading: Loading
                                        }),3];

const SystemicExaminationContainer = [Loadable({
                                loader: () => import('./SystemicExamination').then(object => object.SystemicExaminationContainer),
                                loading: Loading
                            }),4];

const PatientPastKnownMedicalHistoryContainer = [Loadable({
                                loader: () => import('../PatientList/EditPatient/PatientPastKnownMedicalHistory')
                                .then(object => object.PatientPastKnownMedicalHistoryContainer),
                                loading: Loading
                                }),5];

const PatientDiagnosisContainer = [Loadable({
                                    loader: () => import('../PatientList/EditPatient/PatientDiagnosis')
                                                  .then(object => object.PatientDiagnosisContainer),
                                    loading: Loading
                                }),6];

const PatientMedicalHistoryContainer = [Loadable({
                                            loader: () => import('../PatientList/EditPatient/PatientMedicalHistory')
                                            .then(object => object.PatientMedicalHistoryContainer),
                                            loading: Loading
                                        }),7];

const MedicationsContainer = [Loadable({
                                loader: () => import('./Medications')
                                              .then(object => object.MedicationsContainer),
                                loading: Loading
                            }),8];

const PatientInvestigationsContainer = [Loadable({
                                        loader: () => import('../PatientList/EditPatient/PatientInvestigations')
                                                      .then(object => object.PatientInvestigationsContainer),
                                        loading: Loading
                                    }),9];

const PatientLaboratoryTestsContainer = [Loadable({
                                         loader: () => import('../PatientList/EditPatient/PatientLaboratoryTests')
                                                       .then(object => object.PatientLaboratoryTestsContainer),
                                            loading: Loading
                                        }),10];
const ClinicalNotesContainer = [Loadable({
                                loader: () => import('./ClinicalNotes')
                                              .then(object => object.ClinicalNotesContainer),
                                loading: Loading
                            }),11];

const PrescriptionsContainer = [Loadable({
                                loader: () => import('./Prescriptions')
                                             .then(object => object.PrescriptionsContainer),
                                loading: Loading
                            }),12];



const NextVisitScheduleContainer = [Loadable({
                                    loader: () => import('./NextVisitSchedule')
                                                 .then(object => object.NextVisitScheduleContainer),
                                    loading: Loading
                                }),13];





components.push(PatientSymptomsContainer,VitalsSaveFromInitialVisitContainer,
    PhysicalExaminationSaveContainer,SystemicExaminationContainer,PatientPastKnownMedicalHistoryContainer
    ,PatientDiagnosisContainer,PatientMedicalHistoryContainer,MedicationsContainer,PatientInvestigationsContainer,PatientLaboratoryTestsContainer,
    ClinicalNotesContainer,PrescriptionsContainer,NextVisitScheduleContainer);

import { Tab, Row, Col, Nav, NavItem } from 'react-bootstrap';
import { dataConstants } from '../../_constants';
import { Scrollbars } from 'react-custom-scrollbars';

export const PatientNewVisit = (props) => {
    var visitStatus = props.visitData.visit_status;
    var visitStatusLabel = 'In Progress';
    var statusClass = 'visit-status-badge-in-progress';
    if(visitStatus == dataConstants.VISIT_REDIRECT_TYPE_CANCEL){
        visitStatusLabel = 'Cancelled';
        statusClass = 'visit-status-badge-cancel';
    }else if(visitStatus == dataConstants.VISIT_REDIRECT_TYPE_FINISH){
        visitStatusLabel = 'Finished';
        statusClass = 'visit-status-badge-finished';
    }

    var defaultKey = 0;
    if(props.visitComponentsfetched && props.visitComponentsData.length > 0){
        defaultKey = props.visitComponentsData[0].visit_cmp_order;
        var permittedValues = props.visitComponentsData.map(function(value) {
            return value.visit_cmp_order;
        });
    }

    return (
        <div className="page-container">
            <SideMenu />
            <div className="main-content right-sidebar-remove">
                <HeaderContainer />
                <div className="main-content">
                    <div className="wrap-inner-content">
                        <div className="col-md-12">
                            <div className="inner-content">
                                <div className="row">
                                    <div className="col-md-6">
                                        <PatientInfoHeader
                                            pat_code            = {props.visitData.PatientInformation.pat_code}
                                            visit_date          = {props.visitData.PatientInformation.created_at}
                                            user_firstname      = {props.visitData.PatientInformation.user_firstname}
                                            user_lastname       = {props.visitData.PatientInformation.user_lastname}
                                            country_code_sign   = {configConstants.COUNTRY_CODE_SIGN}
                                            country_code        = {props.visitData.PatientInformation.user_country_code}
                                            mobile              = {props.visitData.PatientInformation.user_mobile}
                                            age                 = {props.visitData.PatientInformation.age}
                                            blood_group         = {props.visitData.PatientInformation.pat_blood_group_name}
                                            allergy_type_value  = {props.visitData.PatientInformation.allergy_type_value}
                                            pat_profile_img     = {props.visitData.PatientInformation.pat_profile_img}
                                        />
                                    </div>

                                    {props.user_type != configConstants.USER_TYPE_PATIENT ?
                                        <div className="col-md-6 col-sm-6 text-right">
                                            <a href={process.env.BASENAME+'patientallvisit/'+props.patId} className="btn text-btn yellow hide">Visit List</a>
                                            <a href="javascript:void(0)" disabled={props.submitted ? 'disabled' : ''} onClick={() => props.submitNewVisitForm(dataConstants.VISIT_REDIRECT_TYPE_FINISH)} className="btn text-btn green">{props.submitted ? 'Sending..' : 'Finish Visit'}</a>
                                            <a href="javascript:void(0)" disabled={props.submitted ? 'disabled' : ''} onClick={() => props.submitNewVisitForm(dataConstants.VISIT_REDIRECT_TYPE_CANCEL)} className="btn text-btn red">Cancel</a>
                                        </div> : ''
                                    }
                                </div>
                            </div>
                            <div className="inner-content">
                                <div className="row">
                                    <div className="col-md-12">
                                        {props.errorMsg &&
                                            <Alert bsStyle="danger">
                                                {props.errorMsg}
                                            </Alert>
                                        }
                                        {props.isUpdateDone &&
                                            props.successMessage &&
                                                <Alert bsStyle="success">
                                                    {props.successMessage}
                                                </Alert>
                                        }
                                    </div>
                                    <div className="col-md-6 col-sm-6">                                        
                                        <h2>{props.visitData.PatientInformation.visit_number == '1' ? 'Initial Visit' : 'Visit Number: '+props.visitData.PatientInformation.visit_number}</h2>
                                    </div>                                    
                                </div>
                                <hr/>
                                <div className="clearfix"></div>
                                <div className="wrap-inner-content">
                                    <Tab.Container id="left-tabs" defaultActiveKey={defaultKey} onSelect={props.handleTabSelect}>
                                       <Row className="clearfix">
                                            <Col className="visit-tabs rrp patient-medical-profile">
                                                <Nav className="nav nav-tabs tabs-left" stacked>
                                                    {props.visitComponentsfetched && props.visitComponentsData.map((item, i) => {
                                                                return <NavItem key={i} eventKey={item.visit_cmp_order}>{item.component_title}</NavItem>
                                                        }) }
                                                </Nav>
                                            </Col>
                                            <Col className="visit-tabs-contents rlp patient-medical-profile">
                                                <Scrollbars className="tabscroll" style={{height:350}}>
                                                    <Tab.Content className="left-tabs" animation>
                                                        {props.visitComponentsfetched && props.visitComponentsData.length > 0 && components.length > 0 && components.map((item, i) => {
                                                            if(permittedValues.indexOf(components[i][configConstants.ORDER]) > -1 && props.payload.activeTab === components[i][configConstants.ORDER]){
                                                                let Module = components[i][configConstants.LOADABLE];
                                                                return <Tab.Pane key={i} eventKey={components[i][configConstants.ORDER]}>
                                                                        <Module  formConfig={formConfig} patId={props.patId} visitId={props.visitId}  user_type={props.user_type} isHideExtraFields={true} generalCheckupShow = {true} symptomsType="1" user_type={props.user_type} isOnlySymptomTable={false}/>
                                                                        </Tab.Pane>
                                                            }
                                                        }) }
                                                     </Tab.Content>
                                                </Scrollbars>
                                            </Col>
                                        </Row>
                                    </Tab.Container>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
