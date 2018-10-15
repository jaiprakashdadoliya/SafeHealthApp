import React from "react";
import Loadable from 'react-loadable';
import { Loading } from '../../global';

const PatientAllVisitList = Loadable({
    loader: () => import('./PatientAllVisitList' /* webpackChunkName = "PatientAllVisitList" */).then(object => object.PatientAllVisitList),
    loading: Loading
});

const HeaderContainer = Loadable({
    loader: () => import('../Header' /* webpackChunkName = "HeaderContainer" */).then(object => object.HeaderContainer),
    loading: Loading
});

export const PatientAllVisit = (props) => {
        return (
          <div>
            <HeaderContainer />
            <PatientAllVisitList
                patientNewVisitCreate   = { props.patientNewVisitCreate }
                patId                   = { props.patId }
                patientVisitList        = { props.patientVisitList }
                patientVisitListSearch  = { props.patientVisitListSearch }
                getPatientVisitList     = { props.getPatientVisitList }
             />
          </div>
        );
}
