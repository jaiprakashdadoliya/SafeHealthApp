import React from "react";
import {Button, Alert, bsStyle} from 'react-bootstrap';

import {PatientCbcContainer} from './PatientCbc';
import {PatientDlcContainer} from './PatientDlc';
import {PatientBSugarContainer} from './PatientBSugar';
import {PatientRenalContainer} from './PatientRenal';
import {PatientLiverContainer} from './PatientLiver';
import {PatientUrinalysisContainer} from './PatientUrinalysis';
import {PatientSputumContainer} from './PatientSputum';
import {PatientCollagenContainer} from './PatientCollagen';
import {PatientEchocardiogramContainer} from './PatientEchocardiogram';
import {PatientLaboratoryReportContainer} from './PatientLaboratoryReport';
import { configConstants } from '../../../../_constants';
import { PatientAlertMessage } from '../../../../global';



export const PatientLaboratoryTests = (props) => {
  return(
<div>
    <div className="row" id="laboratoryTestTitle">
        <div className="col-md-6">
            <h3>Laboratory test</h3>
        </div>
        <div className="col-md-6 text-right">
            {/*<button className="btn text-btn green" disabled={props.submitted ? true : false} onClick={props.submitLaboratoryTestStatus}>{props.submitted ? configConstants.BUTTON_PLEASE_WAIT : configConstants.SAVE_BUTTON}</button>*/}
        </div>
    </div>

    <PatientAlertMessage 
        errorMsg = {props.errorMsg}
        isUpdateDone = {props.isUpdateDone}
        successMessage = {props.successMessage}
    />

    <PatientLaboratoryReportContainer 
        patId               = {props.patId}
        visitId             = {props.visitId}
    />

    {!props.isHideExtraFields ? 
        <div className='laboratory-test-extra-fields'>
            <form role="form" onSubmit={(e) => {e.preventDefault();}}>
                <PatientCbcContainer 
                    formData            = {props.patientLaboratoryTestData.form_1}
                    patId               = {props.patId}
                    visitId             = {props.visitId}
                    ref                 = {props.PatientCbcContainerRef} 
                />
                <PatientDlcContainer 
                    formData            = {props.patientLaboratoryTestData.form_2}
                    patId               = {props.patId}
                    visitId             = {props.visitId}
                    ref                 = {props.PatientDlcContainerRef} 
                />
                <PatientBSugarContainer 
                    formData            = {props.patientLaboratoryTestData.form_3}
                    patId               = {props.patId}
                    visitId             = {props.visitId}
                    ref                 = {props.PatientBSugarContainerRef} 
                />
                <PatientRenalContainer 
                    formData            = {props.patientLaboratoryTestData.form_4}
                    patId               = {props.patId}
                    visitId             = {props.visitId}
                    ref                 = {props.PatientRenalContainerRef} 
                />
                <PatientLiverContainer 
                    formData            = {props.patientLaboratoryTestData.form_5}
                    patId               = {props.patId}
                    visitId             = {props.visitId}
                    ref                 = {props.PatientLiverContainerRef} 
                />
                <PatientUrinalysisContainer 
                    formData            = {props.patientLaboratoryTestData.form_6}
                    patId               = {props.patId}
                    visitId             = {props.visitId}
                    ref                 = {props.PatientUrinalysisContainerRef} 
                />
                <PatientSputumContainer 
                    formData            = {props.patientLaboratoryTestData.form_7}
                    patId               = {props.patId}
                    visitId             = {props.visitId}
                    ref                 = {props.PatientSputumContainerRef} 
                />
                <PatientCollagenContainer 
                    formData            = {props.patientLaboratoryTestData.form_8}
                    patId               = {props.patId}
                    visitId             = {props.visitId}
                    ref                 = {props.PatientCollagenContainerRef} 
                />
                <PatientEchocardiogramContainer 
                    formData            = {props.patientLaboratoryTestData.form_9}
                    patId               = {props.patId}
                    visitId             = {props.visitId}
                    ref                 = {props.PatientEchocardiogramContainerRef} 
                />
            </form>
            <div className="row">
                {props.user_type != configConstants.USER_TYPE_PATIENT ? 
                    <div className="col-md-12 text-right">
                        <button className="btn text-btn green" disabled={props.submitted ? true : false} onClick={props.submitLaboratoryTestStatus}>{props.submitted ? configConstants.BUTTON_PLEASE_WAIT : configConstants.SAVE_BUTTON}</button>
                    </div> : ''
                }
            </div>
        </div>
    : ''}
</div>
  );
}