import React from "react";
import {Button, Alert, bsStyle} from 'react-bootstrap';
import Loadable from 'react-loadable'; 
import { Loading,PatientAlertMessage } from './../../../global';
import { configConstants } from './../../../_constants';
import {PhysicalExaminationContainer} from './PhysicalExaminationContainer';

export const PhysicalExaminationSave = (props) => {
  return(
    <div>
        <div className="row" id="physicalExaminationTitle">
            <div className="col-md-6"><h3>Physical Examination</h3></div>

            {props.user_type != configConstants.USER_TYPE_PATIENT ?
                <div className="col-md-6 text-right">
                    <button className="btn text-btn green" disabled={!props.submitted ? false : true} onClick={props.submitPhysicalExaminationStatus}>{props.submitted ? configConstants.BUTTON_PLEASE_WAIT : configConstants.SAVE_BUTTON}</button>
                </div> : ''
            }
        </div>
        <PatientAlertMessage 
            errorMsg = {props.errorMsg}
            isUpdateDone = {props.isUpdateDone}
            successMessage = {props.successMessage}
        />
        <PhysicalExaminationContainer 
            physicalExaminationFormData     = {props.physicalExaminationFormData}
            visitDatafetched                = {props.visitDatafetched}
            patId                           = {props.patId}
            visitId                         = {props.visitId} 
            ref                             = {props.PhysicalExaminationContainerRef}
            titleShow                       = {false}
        />
    </div>
  );
}

