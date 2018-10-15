import React from "react";
import Loadable from 'react-loadable';
import { Loading } from './../../../global';

const SideMenu = Loadable({
    loader: () => import('../../SideMenu' /* webpackChunkName = "HeaderContainer" */).then(object => object.SideMenu),
    loading: Loading
});

const HeaderContainer = Loadable({
    loader: () => import('../../Header' /* webpackChunkName = "HeaderContainer" */).then(object => object.HeaderContainer),
    loading: Loading
});

const EditPatientTabs = Loadable({
    loader: () => import('./EditPatientTabs' /* webpackChunkName = "EditPatientTabs" */).then(object => object.EditPatientTabs),
    loading: Loading
});


export const EditPatient = (props) => {
  return(
    <div className="page-container">
    <SideMenu />
    <div className="right-sidebar-remove">
      <HeaderContainer />
        <EditPatientTabs patId = {props.match.params.patId} visitId = {props.match.params.visitId}/>
        </div>
        </div>
  );
}
