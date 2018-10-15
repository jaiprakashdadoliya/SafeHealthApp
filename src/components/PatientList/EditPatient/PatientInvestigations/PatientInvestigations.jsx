import React from "react";
import {Button, Alert, bsStyle} from 'react-bootstrap';
import Loadable from 'react-loadable'; 
import { Loading,PatientAlertMessage } from './../../../../global';
import { configConstants } from '../../../../_constants';
import {SpirometryContainer} from '../../../PatientNewVisit/Spirometry';
import {SleepStudyContainer} from '../../../PatientNewVisit/SleepStudy';
import {InvestigationReportContainer} from '../../../PatientNewVisit/InvestigationReport';

export const PatientInvestigations = (props) => {
  return(
    <div>
        <div className="row" id="investigationsTitle">
            <div className="col-md-6">
                <h3>Spirometry</h3>
            </div>

            {props.user_type != configConstants.USER_TYPE_PATIENT ?
                <div className="col-md-6 text-right">
                    <button className="btn text-btn green" disabled={props.submitted ? true : false} onClick={props.submitInvestigationsStatus}>{props.submitted ? configConstants.BUTTON_PLEASE_WAIT : configConstants.SAVE_BUTTON}</button>
                </div> : ''
            }
        </div>
        <PatientAlertMessage 
            errorMsg = {props.errorMsg}
            isUpdateDone = {props.isUpdateDone}
            successMessage = {props.successMessage}
        />

        <SpirometryContainer 
            spirometryFormData      = {props.visitFormData.SpirometriesFector}
            spirometryTableFormData = {props.visitFormData.SpirometriesTableFector}
            investigationReportFormData = {props.visitFormData.InvestigationReport}
            sleepStudyFormData      = {props.visitFormData.SleepStudyReport}
            visitDatafetched        = {props.visitDatafetched}
            ref                     = {props.spirometryContainerRef}
            patId                   = {props.patId}
            visitId                 = {props.visitId}
        />

        <SleepStudyContainer 
            sleepStudyFormData      = {props.visitFormData.SleepStudyReport}
            visitDatafetched        = {props.visitDatafetched}
            ref                     = {props.sleepStudyContainerRef}
            patId                   = {props.patId}
            visitId                 = {props.visitId}
        />

        <InvestigationReportContainer 
            investigationReportFormData = {props.visitFormData.InvestigationReport}
            visitDatafetched            = {props.visitDatafetched}
            ref                         = {props.investigationReportContainerRef}
            patId                       = {props.patId}
            visitId                     = {props.visitId}
            user_type                   = {props.user_type}
        />
        
        <div className="row mt20">
            {props.user_type != configConstants.USER_TYPE_PATIENT ?
                <div className="col-md-12 text-right">
                    <button className="btn text-btn green" disabled={props.submitted ? true : false} onClick={props.submitInvestigationsStatus}>{props.submitted ? configConstants.BUTTON_PLEASE_WAIT : configConstants.SAVE_BUTTON}</button>
                </div> : ''
            }
        </div>        
    </div>
  );
}

