import React from "react";
import Loadable from 'react-loadable';
import { Loading } from './../../global';

const PatientList = Loadable({
    loader: () => import('./PatientList' /* webpackChunkName = "PatientList" */).then(object => object.PatientList),
    loading: Loading
});

/*const HeaderContainer = Loadable({
    loader: () => import('../Header' /* webpackChunkName = "HeaderContainer" ).then(object => object.HeaderContainer),
    loading: Loading
});*/
// const SideMenu = Loadable({
//     loader: () => import('../Admin/SideMenu' /* webpackChunkName = "HeaderContainer" */).then(object => object.SideMenu),
//     loading: Loading
// });
// const TopMenu = Loadable({
//     loader: () => import('../Admin/TopMenu' /* webpackChunkName = "HeaderContainer" */).then(object => object.TopMenu),
//     loading: Loading
// });

export class Patient extends React.Component {
    constructor(props, context) {
        super(props, context);
      }
  render() {
        return (

            <div>
                <PatientList
                    newPatientModalShowHandle     = {this.props.newPatientModalShowHandle}
                    newPatientModalHideHandle     = {this.props.newPatientModalHideHandle}
                    newPatientModalShow           = {this.props.newPatientModalShow}
                    patientList                   = {this.props.patientList}
                    loading                       = {this.props.loading}
                    pages                         = {this.props.pages}
                    getPatientList                = {this.props.getPatientList}
                    handlePatientEdit             = {this.props.handlePatientEdit}
                    patientVisitId                = {this.props.patientVisitId}
                    filterAll                     = { this.props.filterAll }
                    filtered                      = { this.props.filtered }
                    patientSearch                 = { this.props.patientSearch }
                    handlePatientAllVisits        = { this.props.handlePatientAllVisits }
                    handlePatientProfile          = { this.props.handlePatientProfile }
                />
            </div>

        );
    }
}
