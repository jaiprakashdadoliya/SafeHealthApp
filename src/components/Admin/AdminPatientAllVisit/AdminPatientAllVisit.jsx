import React from "react";
import {TopMenu} from "../TopMenu"
import {SideMenu} from "../SideMenu"
import {PatientAllVisitList} from "../../PatientAllVisit"

export class AdminPatientAllVisit extends React.Component {
    constructor(props, context) {
        super(props, context);
      }
    render() {
        return (
          <div className="page-container">
            <SideMenu />
            <div className="main-content right-sidebar-remove">
              <TopMenu />
              <PatientAllVisitList />
            </div>
          </div>
        );
    }
}
