import React from "react";
import Loadable from 'react-loadable';
import { configConstants } from '../../_constants';
import {fontawesome, FontAwesomeIcon, Loading} from '../../global';
import {faChevronRight, faChevronLeft,faPlus } from '@fortawesome/fontawesome-free-solid';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { utilityHelper } from '../../_helpers';
import { AppointmentAddContainer } from "./AppointmentAddContainer";
import { CalendarContainer} from '../Calendar';
const SideMenu = Loadable({
    loader: () => import('../SideMenu' /* webpackChunkName = "HeaderContainer" */).then(object => object.SideMenu),
    loading: Loading
});

const HeaderContainer = Loadable({
    loader: () => import('../Header' /* webpackChunkName = "HeaderContainer" */).then(object => object.HeaderContainer),
    loading: Loading
});

const TodaysAppointmentsContainer = Loadable({
    loader: () => import('./TodaysAppointments' /* webpackChunkName = "HeaderContainer" */).then(object => object.TodaysAppointmentsContainer),
    loading: Loading
});
export const Appointments = (props) => {
  return (
      <div className="page-container">
          <SideMenu />
          <div className="main-content right-sidebar-remove">
            <HeaderContainer />
            <div className="main-content">
              <div className="wrap-inner-content">
                  <AppointmentAddContainer
                      appointmentAddShow       = { props.appointmentAddShow }
                      appointmentAddHideHandle = { props.appointmentAddHideHandle }
                  />
                  <div className="">
                      <div className="col-md-9 rrp">
                          <div className="inner-content" >
                              <div className="table-wrap appointment-page" >
                                <CalendarContainer handleRedirect={props.handleRedirect} />
                              </div>
                          </div>
                      </div>
                      <TodaysAppointmentsContainer
                          handleRedirect = {props.handleRedirect}
                          />
                  </div>   
                  <div className="col-md-12">
                  </div> 
              </div>
            </div>
          </div>
      </div>
  );
}
