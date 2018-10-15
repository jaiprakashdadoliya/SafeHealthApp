import React from "react";
import {Button, Alert, bsStyle} from 'react-bootstrap';
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../global';
import {PatientSocialAddictionKeyContainer} from './PatientSocialAddictionKey';
import {PatientSocialAddictionUseKeyContainer} from './PatientSocialAddictionUseKey';

//const PatientSocialAddictionKeyContainer = Loadable({
    //loader: () => import('./PatientSocialAddictionKey' /* webpackChunkName = "PatientSocialAddictionKey" */).then(object => object.PatientSocialAddictionKeyContainer),
   // loading: Loading
//});

//const PatientSocialAddictionUseKeyContainer = Loadable({
 //   loader: () => import('./PatientSocialAddictionUseKey'  /*webpackChunkName = "PatientSocialAddictionUseKey"*/ ).then(object => object.PatientSocialAddictionUseKeyContainer),
//    loading: Loading
//});


export const PatientSocialAddictionHistory = (props) => {
  return(
    <div>

        <div className="row">
            <div className="col-md-12" id="socialAddictionTitle">
                {props.errorMsg && !props.isUpdateDone &&
                    <Alert bsStyle="danger">
                        {props.errorMsg}
                    </Alert>
                }

                {props.isUpdateDone &&
                    props.successMessage &&
                        <Alert bsStyle="success">
                            {props.successMessage}
                        </Alert>
                }
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">
                <h3>Social/Addiction History</h3>
            </div>
             <div className="col-md-6 text-right">
                <button className="btn text-btn green" onClick={props.submitSocialAddictionStatus}>Save</button>
            </div>
        </div>
        <PatientSocialAddictionKeyContainer 
            formData    = {props.patientSocialAddictionData.socialAddictionKey}
            patId       = {props.patId}
            visitId     = {props.visitId} 
            ref         = {props.PatientSocialAddictionKeyContainerRef}
        />
        <PatientSocialAddictionUseKeyContainer 
            formData    = {props.patientSocialAddictionData.socialAddictionKeyUse}
            patId       = {props.patId}
            visitId     = {props.visitId}
            ref         = {props.PatientSocialAddictionUseKeyContainerRef}   
        />
    </div>
  );
}
