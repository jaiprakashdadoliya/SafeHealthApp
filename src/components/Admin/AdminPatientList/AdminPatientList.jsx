import React from "react";
import {TopMenu} from "../TopMenu"
import {SideMenu} from "../SideMenu"
import {PatientList} from "../../PatientList"

export class AdminPatientList extends React.Component {
    constructor(props, context) {
        super(props, context);
      }
    render() {
        return (
          <div className="page-container">
            <SideMenu />
            <div className="main-content right-sidebar-remove">
              <TopMenu />
              <PatientList />
            </div>
          </div>
        );
    }
}
