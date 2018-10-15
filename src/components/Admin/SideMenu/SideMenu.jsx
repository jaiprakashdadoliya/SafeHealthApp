import React from "react";
import { Link } from 'react-router-dom';
import {fontawesome, FontAwesomeIcon} from '../../../global';
import {faBars, faTachometerAlt, faUsers, faUser, faChartArea, faCalendarAlt} from '@fortawesome/fontawesome-free-solid';

export const SideMenu = (props) => {
  return (
    <div className="sidebar-menu fixed">
        <div className="sidebar-menu-inner">
            <header className="logo-env">
                {<div className="logo">
                    <a href=""><img src={require("../../../assets/images/inner-logo.png")} /></a>
                </div>}
            </header>
            <ul id="main-menu" className="main-menu">
                <li>
                    <Link to={'/dashboard'}><FontAwesomeIcon icon={faTachometerAlt} /> <span className="title"> Dashboard</span></Link>
                </li>
                <li>
                    <Link to={'/doctorlist'}><FontAwesomeIcon icon={faUser} /> <span className="title">Docotrs</span></Link>
                </li>
                <li>
                    <Link to={'/patientlist'}><FontAwesomeIcon icon={faUsers} /> <span className="title">Patients</span></Link>
                </li>
                <li>
                    <Link to={'/analytics'}><FontAwesomeIcon icon={faChartArea} /> <span className="title">Analytics</span></Link>
                </li>
                <li>
                    <Link to={'/appointments'}><FontAwesomeIcon icon={faCalendarAlt} /> <span className="title">Appointment</span></Link>
                </li>
            </ul>
        </div>
    </div>
  );
}
