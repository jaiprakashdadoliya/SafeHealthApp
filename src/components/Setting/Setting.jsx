import React from "react";
import { Tabs, Tab, Row, Col, Nav, NavItem } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import {fontawesome, FontAwesomeIcon} from '../../global';
import {faWrench, faUnlockAlt, faPills, faBriefcaseMedical, faFileAlt, faUserMd, faCalendarCheck, faUserFriends, faCalendarAlt, faCogs, faVials, faCertificate, faStethoscope, faMoneyCheckAlt } from '@fortawesome/fontawesome-free-solid';
import { utilityHelper } from '../../_helpers';
import { configConstants } from '../../_constants';
import Loadable from 'react-loadable';
import { Loading } from '../../global';
import {HeaderContainer} from "../Header";
import {SideMenu} from "../SideMenu";

const ManageDrugsContainer = Loadable({
    loader: () => import('./ManageDrugs').then(object => object.ManageDrugsContainer),
    loading: Loading
});
const ManageServices = Loadable({
    loader: () => import('./ManageServices').then(object => object.ManageServices),
    loading: Loading
});
const MedicalHistory = Loadable({
    loader: () => import('./MedicalHistory').then(object => object.MedicalHistory),
    loading: Loading
});
const ConsentForms = Loadable({
    loader: () => import('./ConsentForms').then(object => object.ConsentForms),
    loading: Loading
});
const PatientGroups = Loadable({
    loader: () => import('./PatientGroups').then(object => object.PatientGroups),
    loading: Loading
});
const AppointmentCategory = Loadable({
    loader: () => import('../AppointmentCategory').then(object => object.AppointmentCategory),
    loading: Loading
});
const Referral = Loadable({
    loader: () => import('../Referral').then(object => object.Referral),
    loading: Loading
});
const ManageCalendarContainer = Loadable({
    loader: () => import('./ManageCalendar').then(object => object.ManageCalendarContainer),
    loading: Loading
});
const VisitComponents = Loadable({
    loader: () => import('./VisitComponents').then(object => object.VisitComponents),
    loading: Loading
});
const LaboratoryTestsContainer = Loadable({
    loader: () => import('./LaboratoryTests').then(object => object.LaboratoryTestsContainer),
    loading: Loading
});
const LabTemplatesContainer = Loadable({
    loader: () => import('./LabTemplates').then(object => object.LabTemplatesContainer),
    loading: Loading
});
const MedicalCertificatesContainer = Loadable({
    loader: () => import('./MedicalCertificate').then(object => object.MedicalCertificatesContainer),
    loading: Loading
});
const MedicineTemplatesListContainer = Loadable({
    loader: () => import('./MedicineTemplates')
                  .then(object => object.MedicineTemplatesListContainer),
    loading: Loading
});
const CheckupTypeContainer = Loadable({
    loader: () => import('./CheckupType').then(object => object.CheckupTypeContainer),
    loading: Loading
});
const PaymentModeContainer = Loadable({
    loader: () => import('./PaymentMode').then(object => object.PaymentModeContainer),
    loading: Loading
});



export class Setting extends React.Component {
  constructor(props,context){
    super(props,context);
    this.handleSelect = this.handleSelect.bind(this);
     this.state = {
      activeTab: 1
    };
  }

  handleSelect(activeTab){
    this.setState({ activeTab });
  }
  render(){
    const userInfo = utilityHelper.getUserInfo();
    const currentUserType = userInfo.user_type;

    let defaultActive = 2;
    if(currentUserType == configConstants.USER_TYPE_DOCTOR){
      defaultActive = 1;
    }
    return(
      <div className="page-container">
        <SideMenu />
        <HeaderContainer  history={this.props.history} />
        <div className="main-content">
          <div className="col-md-12">
            <div className="wrap-inner-content">
              <div className="inner-content">
                <div className="row page-header hide-on-print">
                  <div className="col-md-6 col-sm-6">
                      <h2>Settings</h2>
                  </div>
                </div>
                <Tab.Container id="left-tabs-example" defaultActiveKey={1} onSelect={this.handleSelect}>
                  <Row className="clearfix">
                    <Col className="visit-tabs rrp patient-medical-profile hide-on-print">
                      <Nav className="nav nav-tabs tabs-left" stacked>
                        <NavItem eventKey={1}><FontAwesomeIcon icon={faWrench}/>&nbsp; Services </NavItem>
                        <NavItem eventKey={2}><FontAwesomeIcon icon={faPills}/>&nbsp; Drugs </NavItem>
                        <NavItem eventKey={3}><FontAwesomeIcon icon={faBriefcaseMedical}/>&nbsp; Medical History</NavItem>
                        <NavItem eventKey={4}><FontAwesomeIcon icon={faFileAlt}/>&nbsp; Consent Forms</NavItem>
                        <NavItem eventKey={5}><FontAwesomeIcon icon={faCalendarCheck}/>&nbsp; Appointment Category</NavItem>
                        <NavItem eventKey={6}><FontAwesomeIcon icon={faUserFriends}/>&nbsp; Patient Groups </NavItem>
                        <NavItem eventKey={7}><FontAwesomeIcon icon={faUserMd}/>&nbsp; Referral </NavItem>
                        <NavItem eventKey={8}><FontAwesomeIcon icon={faCalendarAlt}/>&nbsp; Manage Calendar </NavItem>
                        <NavItem eventKey={9}><FontAwesomeIcon icon={faCogs}/>&nbsp; Visit Components </NavItem>
                        <NavItem eventKey={10}><FontAwesomeIcon icon={faVials}/>&nbsp; Laboratory Tests </NavItem>
                        <NavItem eventKey={11}><FontAwesomeIcon icon={faVials}/>&nbsp; Lab Templates </NavItem>
                        <NavItem eventKey={12}><FontAwesomeIcon icon={faCertificate}/>&nbsp; Medical Certificate </NavItem>
                        <NavItem eventKey={13}><FontAwesomeIcon icon={faPills}/>&nbsp; Medicine Templates </NavItem>
                        <NavItem eventKey={14}><FontAwesomeIcon icon={faStethoscope}/>&nbsp; Checkup Types </NavItem>
                        <NavItem eventKey={15}><FontAwesomeIcon icon={faMoneyCheckAlt}/>&nbsp; Payment Modes </NavItem>
                      </Nav>
                    </Col>
                    <Col className="visit-tabs-contents rlp patient-medical-profile">
                      <Scrollbars className="tabscroll" style={{height:350}}>
                        <Tab.Content className="left-tabs" animation>
                          <Tab.Pane eventKey={1}>
                            { this.state.activeTab === 1 &&
                                <ManageServices activeKey = {this.state.activeTab}/>
                            }
                          </Tab.Pane>
                          <Tab.Pane eventKey={2}>
                            { this.state.activeTab === 2 &&
                                <ManageDrugsContainer activeKey = {this.state.activeTab}/>
                            }
                          </Tab.Pane>
                          <Tab.Pane eventKey={3}>
                            { this.state.activeTab === 3 &&
                                <MedicalHistory activeKey = {this.state.activeTab}/>
                            }
                          </Tab.Pane>
                          <Tab.Pane eventKey={4}>
                            { this.state.activeTab === 4 &&
                                <ConsentForms activeKey = {this.state.activeTab}/>
                            }
                          </Tab.Pane>
                          <Tab.Pane eventKey={5}>
                            { this.state.activeTab === 5 &&
                                <AppointmentCategory activeKey = {this.state.activeTab}/>
                            }
                          </Tab.Pane>
                          <Tab.Pane eventKey={6}>
                            { this.state.activeTab === 6 &&
                                <PatientGroups activeKey = {this.state.activeTab}/>
                            }
                          </Tab.Pane>
                          <Tab.Pane eventKey={7}>
                            { this.state.activeTab === 7 &&
                                <Referral activeKey = {this.state.activeTab}/>
                            }
                          </Tab.Pane>
                          <Tab.Pane eventKey={8}>
                            { this.state.activeTab === 8 &&
                                <ManageCalendarContainer activeKey = {this.state.activeTab}/>
                            }
                          </Tab.Pane>
                          <Tab.Pane eventKey={9}>
                            { this.state.activeTab === 9 &&
                                <VisitComponents activeKey = {this.state.activeTab}/>
                            }
                          </Tab.Pane>
                          <Tab.Pane eventKey={10}>
                            { this.state.activeTab === 10 &&
                                <LaboratoryTestsContainer activeKey = {this.state.activeTab}/>
                            }
                          </Tab.Pane>
                          <Tab.Pane eventKey={11}>
                            { this.state.activeTab === 11 &&
                                <LabTemplatesContainer activeKey = {this.state.activeTab}/>
                            }
                          </Tab.Pane>
                          <Tab.Pane eventKey={12}>
                            { this.state.activeTab === 12 &&
                                <MedicalCertificatesContainer activeKey = {this.state.activeTab}/>
                            }
                          </Tab.Pane>
                          <Tab.Pane eventKey={13}>
                            { this.state.activeTab === 13 &&
                                <MedicineTemplatesListContainer activeKey = {this.state.activeTab}/>
                            }
                          </Tab.Pane>
                          <Tab.Pane eventKey={14}>
                            { this.state.activeTab === 14 &&
                                <CheckupTypeContainer activeKey = {this.state.activeTab}/>
                            }
                          </Tab.Pane>
                          <Tab.Pane eventKey={15}>
                            { this.state.activeTab === 15 &&
                                <PaymentModeContainer activeKey = {this.state.activeTab}/>
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
      </div>
    );
    
  }
}
