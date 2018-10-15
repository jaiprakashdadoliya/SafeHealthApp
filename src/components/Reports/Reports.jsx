import React from "react";
import { Tabs, Tab, Row, Col, Nav, NavItem } from 'react-bootstrap';
import {fontawesome, FontAwesomeIcon, Loading} from '../../global';
import { Scrollbars } from 'react-custom-scrollbars';
import {faMobileAlt, faUser, faTint, faIdCard, faWrench } from '@fortawesome/fontawesome-free-solid';
import Select from 'react-select';
import Loadable from 'react-loadable';
import { configConstants } from '../../_constants';
import { utilityHelper } from '../../_helpers';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

const SideMenu = Loadable({
    loader: () => import('../SideMenu' /* webpackChunkName = "SideMenu" */).then(object => object.SideMenu),
    loading: Loading
});

const HeaderContainer = Loadable({
    loader: () => import('../Header' /* webpackChunkName = "HeaderContainer" */).then(object => object.HeaderContainer),
    loading: Loading
});

const ChartReportsContainer = Loadable({
    loader: () => import('./ChartReport' /* webpackChunkName = "ChartReportsContainer" */).then(object => object.ChartReportsContainer),
    loading: Loading
});

const PatientReportsContainer = Loadable({
    loader: () => import('./PatientReports' /* webpackChunkName = "PatientReportsContainer" */).then(object => object.PatientReportsContainer),
    loading: Loading
});

const IncomeReportsContainer = Loadable({
    loader: () => import('./IncomeReport' /* webpackChunkName = "IncomeReportsContainer" */).then(object => object.IncomeReportsContainer),
    loading: Loading
});

export class Reports extends React.Component {
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
                      <h2>Reports</h2>
                  </div>
                </div>
                <Tab.Container id="left-tabs-example" defaultActiveKey={1} onSelect={this.handleSelect}>
                  <Row className="clearfix">
                    <Col className="visit-tabs rrp patient-medical-profile hide-on-print">
                      <Nav className="nav nav-tabs tabs-left" stacked>
                        <NavItem eventKey={1}>Statistics</NavItem>
                        <NavItem eventKey={2}>Patient Reports</NavItem>
                        <NavItem eventKey={3}>Income Reports</NavItem>
                      </Nav>
                    </Col>
                    <Col className="visit-tabs-contents rlp patient-medical-profile">
                      <Scrollbars className="tabscroll" style={{height:350}}>
                        <Tab.Content className="left-tabs" animation>
                          <Tab.Pane eventKey={1}>
                            { this.state.activeTab === 1 &&
                                <ChartReportsContainer activeKey = {this.state.activeTab}/>
                            }
                          </Tab.Pane>
                          <Tab.Pane eventKey={2}>
                            { this.state.activeTab === 2 &&
                                <PatientReportsContainer activeKey = {this.state.activeTab}/>
                            }
                          </Tab.Pane>
                          <Tab.Pane eventKey={3}>
                            { this.state.activeTab === 3 &&
                                <IncomeReportsContainer activeKey = {this.state.activeTab}/>
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
