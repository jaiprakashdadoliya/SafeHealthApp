import React from "react";
import { Link } from 'react-router-dom';
import {fontawesome, FontAwesomeIcon} from '../../global';
import {faBars, faCalendarAlt, faUserFriends, faUserAlt, faCalculator, faCog, faMedkit, faTachometerAlt, faChartLine, faMoneyBillAlt, faMoneyCheckAlt } from '@fortawesome/fontawesome-free-solid';
import { utilityHelper } from '../../_helpers';
import { configConstants } from '../../_constants';

export const SideMenu = (props) => {
    const userInfo = utilityHelper.getUserInfo();
    const currentUserType = userInfo.user_type;

  return (
    <div className="sidebar-menu fixed">
        <div className="sidebar-menu-inner">
            <header className="logo-env">
                <div className="logo">
                    <Link to={'/'}><img src={require("../../assets/images/login-logo.png")} /></Link>
                </div>
                <div className="sidebar-collapse">
                    <a href="#" className="sidebar-collapse-icon">
                        <FontAwesomeIcon icon={faBars} />
                    </a>
                </div>
                <div className="sidebar-mobile-menu visible-xs">
                    <a href="#" className="with-animation">
                        <FontAwesomeIcon icon={faBars} />
                    </a>
                </div>
            </header>
            { currentUserType == configConstants.USER_TYPE_PATIENT &&
                <ul id="main-menu" className="main-menu">
                    <li>
                        <Link to={'/dashboard'}><FontAwesomeIcon icon={faTachometerAlt} /> <span className="title"> Dashboard</span></Link>
                    </li>
                    <li>
                        <Link to={'/myprofile/'+userInfo.user_id+'/'+userInfo.visit_id}><FontAwesomeIcon icon={faCog} /> <span className="title">My Profile</span></Link>
                    </li>
                    <li>
                        <Link to={'/appointments'}><FontAwesomeIcon icon={faCalendarAlt} /> <span className="title"> Appointments</span></Link>
                    </li>
                    <li>
                        <Link to={'/patientallvisit/'+userInfo.user_id}><FontAwesomeIcon icon={faCog} /> <span className="title">Visits</span></Link>
                    </li>
                </ul>        
            }
            { (currentUserType == configConstants.USER_TYPE_DOCTOR) &&
                <ul id="main-menu" className="main-menu">
                    <li>
                        <Link to={'/appointments'}><FontAwesomeIcon icon={faCalendarAlt} /> <span className="title"> Appointments</span></Link>
                    </li>
                    <li>
                        <Link to={'/patientlist'}><FontAwesomeIcon icon={faUserAlt} /> <span className="title">Patients</span></Link>
                    </li>
                     <li>
                        <Link to={'/payments'}><FontAwesomeIcon icon={faMoneyCheckAlt} /> <span className="title">Payments</span></Link>
                    </li>
                    {/*<li>
                        <Link to={'/invoices'}><FontAwesomeIcon icon={faMoneyBillAlt} /> <span className="title">Invoices</span></Link>
                    </li>*/}
                    <li>
                        <Link to={'/clinics'}><FontAwesomeIcon icon={faMedkit} /> <span className="title">Clinics</span></Link>
                    </li>
                    <li>
                        <Link to={'/reports'}><FontAwesomeIcon icon={faChartLine} /> <span className="title">Reports</span></Link>
                    </li>
                    <li>
                        <Link to={'/managestaff'}><FontAwesomeIcon icon={faUserFriends} /> <span className="title">Manage Staff</span></Link>
                    </li>
                    <li>
                        <Link to={'/setting'}><FontAwesomeIcon icon={faCog} /> <span className="title">Setting</span></Link>
                    </li>
                </ul>
            }
            { (utilityHelper.inArray(currentUserType, configConstants.USER_TYPE_STAFF)) &&
                <ul id="main-menu" className="main-menu">
                    <li>
                        <Link to={'/appointments'}><FontAwesomeIcon icon={faCalendarAlt} /> <span className="title"> Appointments</span></Link>
                    </li>
                    <li>
                        <Link to={'/patientlist'}><FontAwesomeIcon icon={faUserAlt} /> <span className="title">Patients</span></Link>
                    </li>
                    <li>
                        <Link to={'/clinics'}><FontAwesomeIcon icon={faMedkit} /> <span className="title">Clinics</span></Link>
                    </li>
                </ul>
            }
        </div>
    </div>
  );
}
