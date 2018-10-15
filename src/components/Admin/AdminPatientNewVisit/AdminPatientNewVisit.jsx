import React from "react";
import {TopMenu} from "../TopMenu"
import {SideMenu} from "../SideMenu"
import {PatientNewVisit} from "../../PatientNewVisit"

export class AdminPatientNewVisit extends React.Component {
    constructor(props, context) {
        super(props, context);
      }
    render() {
        return (
          <div className="page-container">
            <SideMenu />
            <div className="main-content right-sidebar-remove">
              <TopMenu />
              <PatientNewVisit />
            </div>
          </div>
        );
    }
}
