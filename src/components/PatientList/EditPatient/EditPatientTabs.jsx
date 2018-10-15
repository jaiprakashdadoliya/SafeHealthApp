import React from "react";
import { Tab, Row, Col, Nav, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import windowSize from 'react-window-size';
import { Scrollbars } from 'react-custom-scrollbars';
import Loadable from 'react-loadable';
import { fontawesome, FontAwesomeIcon, Loading,PatientInfoHeader } from '../../../global';
import {faWrench, faUser, faHistory, faAllergies, faChartLine, faVials, faBuilding, faHome, faFile, faSyringe } from '@fortawesome/fontawesome-free-solid';
import { patientProfileAction,headerActions } from '../../../_actions';
import { configConstants } from '../../../_constants';
import {formConfig} from '../../../_packages/fx-manager/PatientSymptopmsConfig';
import { utilityHelper } from '../../../_helpers';

const PatientProfileContainer = Loadable({
    loader: () => import('./PatientProfile' /* webpackChunkName = "PatientProfile" */).then(object => object.PatientProfileContainer),
    loading: Loading
});

const PatientMedicalContainer = Loadable({
    loader: () => import('../../PatientProfile' /* webpackChunkName = "PatientProfile" */).then(object => object.PatientProfileContainer),
    loading: Loading
});

const PatientGeneralCheckupContainer = Loadable({
    loader: () => import('./PatientGeneralCheckup' /* webpackChunkName = "PatientGeneralCheckup" */).then(object => object.PatientGeneralCheckupContainer),
    loading: Loading
});

const PatientPastKnownMedicalHistoryContainer = Loadable({
    loader: () => import('./PatientPastKnownMedicalHistory'  /*webpackChunkName = "PatientPastKnownMedicalHistory"*/ ).then(object => object.PatientPastKnownMedicalHistoryContainer),
    loading: Loading
});

const PatientDomesticEnvironmentalFactorsContainer = Loadable({
    loader: () => import('./PatientDomesticEnvironmentalFactors' /* webpackChunkName = "PatientDomesticEnvironmentalFactors" */).then(object => object.PatientDomesticEnvironmentalFactorsContainer),
    loading: Loading
});

const PatientWorkEnvironmentalFactorsContainer = Loadable({
    loader: () => import('./PatientWorkEnvironmentalFactors' /* webpackChunkName = "PatientWorkEnvironmentalFactors" */).then(object => object.PatientWorkEnvironmentalFactorsContainer),
    loading: Loading
});

const PatientSocialAddictionHistoryContainer = Loadable({
    loader: () => import('./PatientSocialAddictionHistory' /* webpackChunkName = "PatientSocialAddictionHistory" */).then(object => object.PatientSocialAddictionHistoryContainer),
    loading: Loading
});

const PatientMedicalHistoryContainer = Loadable({
    loader: () => import('./PatientMedicalHistory' /* webpackChunkName = "PatientMedicalHistory" */).then(object => object.PatientMedicalHistoryContainer),
    loading: Loading
});

const PatientFamilyMedicalHistoryContainer = Loadable({
    loader: () => import('./PatientFamilyMedicalHistory' /* webpackChunkName = "PatientFamilyMedicalHistory" */).then(object => object.PatientFamilyMedicalHistoryContainer),
    loading: Loading
});

const PatientAllergiesContainer = Loadable({
    loader: () => import('./PatientAllergies'  /*webpackChunkName = "PatientPhysicalExamination"*/ ).then(object => object.PatientAllergiesContainer),
    loading: Loading
});

const PatientLaboratoryTestsContainer = Loadable({
    loader: () => import('./PatientLaboratoryTests' /* webpackChunkName = "PatientLaboratoryTests" */).then(object => object.PatientLaboratoryTestsContainer),
    loading: Loading
});

const PreviousPrescriptionContainer = Loadable({
    loader: () => import('../../PatientNewVisit/Prescriptions/PreviousPrescription/PreviousPrescriptionContainer' /* webpackChunkName = "PreviousPrescription" */).then(object => object.PreviousPrescriptionContainer),
    loading: Loading
});

const PatientVaccinationHistoryContainer = Loadable({
    loader: () => import('./PatientVaccinationHistory' /* webpackChunkName = "PatientVaccinationHistory" */).then(object => object.PatientVaccinationHistoryContainer),
    loading: Loading
});

class EditPatientTabs extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {activeTab : 1, patientUpdatedData: ''};
        this.handleTabSelect = this.handleTabSelect.bind(this);
    }

    /*
     * This function is using for set state according to active tab
     */
    handleTabSelect(activeTab) {
        this.setState({ activeTab });
    }

    /**
     * @DateOfCreation        14 june 2018
     * @ShortDescription      This function is responsible to get patient Profile data
     * @param                 Event Object
     * @return                Nothing
     */
    componentWillMount() {
        const { dispatch, patId } = this.props;
        dispatch(patientProfileAction.patientProfileRequest(patId));
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to redirect unauthorise users
    * @return                Redirect
    */
    componentDidUpdate(){
        const { dispatch }  = this.props;
        if(this.props.isUserNotValid){
           dispatch(headerActions.logout());
        }
    }

    componentWillReceiveProps(nextProps){
        let { patientUpdatedData } = this.state;
        if(nextProps.pat_profile_img!=undefined){
            this.setState({
                patientUpdatedData:{
                    ...patientUpdatedData,
                    pat_profile_img: nextProps.pat_profile_img
                }
            });
        }else{
            this.setState({
                patientUpdatedData: nextProps.patientUpdatedData
            });
        }
    }

    render() {
        const userInfo = utilityHelper.getUserInfo();
        if(this.state.patientUpdatedData.pat_profile_img != undefined){
        return(
                <div className="main-content">
                        <div className="wrap-inner-content">
                            <div className="col-md-12">
                            <div className="inner-content">
                                <div className="row">
                                    <div className="col-md-6 col-sm-6">
                                        <PatientInfoHeader
                                            pat_code            = {this.state.patientUpdatedData.pat_code}
                                            visit_date          = ''
                                            user_firstname      = {this.state.patientUpdatedData.user_firstname}
                                            user_lastname       = {this.state.patientUpdatedData.user_lastname}
                                            country_code_sign   = {configConstants.COUNTRY_CODE_SIGN}
                                            country_code        = {this.state.patientUpdatedData.user_country_code}
                                            mobile              = {this.state.patientUpdatedData.user_mobile}
                                            age                 = {this.state.patientUpdatedData.age}
                                            blood_group         = {this.state.patientUpdatedData.pat_blood_group_name}
                                            allergy_type_value  = {this.state.patientUpdatedData.allergy_type_value}
                                            pat_profile_img     = {this.state.patientUpdatedData.pat_profile_img}
                                        />  
                                    </div>
                                    { userInfo.user_type != configConstants.USER_TYPE_PATIENT &&
                                        <div className="col-md-6 col-sm-6 text-right">
                                            <a href={process.env.BASENAME+'patientlist'} className="btn text-btn green">patient list</a>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="inner-content">
                                <Tab.Container id="left-tabs-example" defaultActiveKey={1} onSelect={this.handleTabSelect}>
                                    <Row className="clearfix">
                                        <Col className="visit-tabs rrp patient-medical-profile">
                                            <Nav className="nav nav-tabs tabs-left" stacked>
                                                <NavItem eventKey={1}>&nbsp;&nbsp;Patient Profile</NavItem>
                                                <NavItem eventKey={2}>&nbsp;&nbsp;Allergies</NavItem>
                                                <NavItem eventKey={4}>&nbsp;&nbsp;Past or Known Medical History</NavItem>
                                                <NavItem eventKey={5}>&nbsp;&nbsp;Domestic Environmental Factors</NavItem>
                                                <NavItem eventKey={6}>&nbsp;&nbsp;Work Environmental Factors</NavItem>
                                                <NavItem eventKey={7}>&nbsp;&nbsp;Social/Addiction History</NavItem>
                                                <NavItem eventKey={8}>&nbsp;&nbsp;Medication History</NavItem>
                                                <NavItem eventKey={9}>&nbsp;&nbsp;Family Medical History</NavItem>
                                                <NavItem eventKey={11}>&nbsp;&nbsp;Vital charts</NavItem>
                                                <NavItem eventKey={12}>&nbsp;&nbsp;Laboratory Test</NavItem>
                                                <NavItem eventKey={13}>&nbsp;&nbsp;Previous Prescription</NavItem>
                                                <NavItem eventKey={14}>&nbsp;&nbsp;Vaccination History</NavItem>
                                            </Nav>
                                        </Col>
                                        <Col className="visit-tabs-contents rlp patient-medical-profile">
                                            <Scrollbars className="tabscroll" style={{height:this.props.windowHeight - 205}}>
                                                <Tab.Content className="left-tabs" animation>
                                                    <Tab.Pane eventKey={1}>
                                                        { this.state.activeTab === 1 &&
                                                            <PatientProfileContainer patId={this.props.patId} visitId={this.props.visitId} />
                                                        }
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey={2}>
                                                        { this.state.activeTab === 2 &&
                                                            <PatientAllergiesContainer patId={this.props.patId} visitId={this.props.visitId}/>
                                                        }
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey={4}>
                                                        { this.state.activeTab === 4 &&
                                                            <PatientPastKnownMedicalHistoryContainer patId={this.props.patId} visitId={this.props.visitId} />
                                                        }
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey={5}>
                                                        { this.state.activeTab === 5 &&
                                                            <PatientDomesticEnvironmentalFactorsContainer patId={this.props.patId} visitId={this.props.visitId} />
                                                        }
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey={6}>
                                                        { this.state.activeTab === 6 &&
                                                            <PatientWorkEnvironmentalFactorsContainer patId={this.props.patId} visitId={this.props.visitId}/>
                                                        }
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey={7}>
                                                        { this.state.activeTab === 7 &&
                                                            <PatientSocialAddictionHistoryContainer  patId={this.props.patId} visitId={this.props.visitId}/>
                                                        }
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey={8}>
                                                        { this.state.activeTab === 8 &&
                                                            <PatientMedicalHistoryContainer  patId={this.props.patId} visitId={this.props.visitId}/>
                                                        }
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey={9}>
                                                        { this.state.activeTab === 9 &&
                                                            <PatientFamilyMedicalHistoryContainer patId={this.props.patId} visitId={this.props.visitId}/>
                                                        }
                                                    </Tab.Pane>
                                                     <Tab.Pane eventKey={11}>
                                                        { this.state.activeTab === 11 &&
                                                            <div>
                                                                <div className="row">
                                                                    <div className="col-md-6 col-sm-12" id="AllergiesTitle">
                                                                        <h3>Vitals Charts</h3>    
                                                                    </div>
                                                                </div>
                                                                <PatientMedicalContainer patId={this.props.patId} medicalProfile={true}/>
                                                            </div>
                                                        }
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey={12}>
                                                        { this.state.activeTab === 12 &&
                                                            <PatientLaboratoryTestsContainer patId={this.props.patId} visitId={this.props.visitId} isHideExtraFields={true} />
                                                        }
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey={13}>
                                                        { this.state.activeTab === 13 &&
                                                            <PreviousPrescriptionContainer patId={this.props.patId} visitId={this.props.visitId} />
                                                        }
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey={14}>
                                                        { this.state.activeTab === 14 &&
                                                            <PatientVaccinationHistoryContainer patId={this.props.patId} visitId={this.props.visitId} />
                                                        }
                                                    </Tab.Pane>
                                                 </Tab.Content>
                                            </Scrollbars>
                                        </Col>
                                    </Row>
                                </Tab.Container>
                            </div>
                        </div>
                    </div>
                    </div>
            );
        }else{
            return(
                    <Loading />
                );
        }
    }
}

/**
 * @DateOfCreation        18 June 2018
 * @ShortDescription      This function is responsible to map store state to props
 * @return                View
 */
function mapStateToProps(state) {

    const { patientUpdatedData,isUserNotValid, pat_profile_img} = state.patientProfile;
    return {
        patientUpdatedData,
        isUserNotValid,
        pat_profile_img
    };

}

const connectedEditPatientTabs = windowSize(connect(mapStateToProps)(EditPatientTabs));
export { connectedEditPatientTabs as EditPatientTabs };
