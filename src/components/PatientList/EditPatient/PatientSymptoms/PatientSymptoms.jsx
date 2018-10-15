import React from "react";
import {Button, Alert, bsStyle} from 'react-bootstrap';
import { utilityHelper } from '../../../../_helpers';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import ReactAutocomplete from 'react-autocomplete';
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../global';
import {FxMultiAddFormContainer} from '../../../../_packages/fx-multi-add-form';
import { PatientGeneralCheckupContainer } from './../PatientGeneralCheckup';
import 'react-datepicker/dist/react-datepicker.css';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {configConstants} from '../../../../_constants';

import {PatientCoughContainer} from './PatientCough';
import {PatientExpectorationContainer} from './PatientExpectoration';
import {PatientHemoptysisContainer} from './PatientHemoptysis';
import {PatientDyspnoeaContainer} from './PatientDyspnoea';
import {PatientWheezeContainer} from './PatientWheeze';
import {PatientChestPainContainer} from './PatientChestPain';
import {PatientFeverContainer} from './PatientFever';
import {PatientWeightLossContainer} from './PatientWeightLoss';
import {PatientOtherSymptomsContainer} from './PatientOtherSymptoms';
import { PatientAlertMessage } from '../../../../global';


export const PatientSymptoms = (props) => {
  return (
   <div>
        <FxMultiAddFormContainer 
              gridData = {props.gridData}
              filterAl = {props.filterAl}
              searchHandler = {props.symptomSearch}
              fxFormViewModel = {props.symptomsFormShow}
              fxFormViewModelHideHandle = {props.patientEditSymptomsHideHandle}
              fxFormConfig = {props.symptomFormConfig}
              handleBoundFormUpdate         = {props.handleBoundFormUpdate}
              handleSubmit = {props.handleSubmit}
              fxMultiAddFormExtraConfig = {props.fxMultiAddFormExtraConfig}
              fxMultiAddFormTitle = {props.fxMultiAddFormTitle}
              successMsg  = {props.successMsg}
              errorMsg    = {props.errorMsg}
              submitted   = {props.submitted}
        />
        
       {/* <PatientGeneralCheckupContainer
            patId           = {props.patId} 
            visitId         = {props.visitId}
        />*/}
        <PatientAlertMessage 
            errorMsg = {props.errorMsg}
            isUpdateDone = {props.isUpdatedDone}
            successMessage = {props.successMsg}
        />
        {props.fetchHistoryOfPatientData && 
          <div>
             <div className="row">
                {props.user_type != configConstants.USER_TYPE_PATIENT ? 
                    <div className="col-md-12 text-right">
                        <button className="btn table-btn green" disabled={props.submitted ? true : false} onClick={props.submitHopiTestStatus}>{props.submitted ? configConstants.BUTTON_PLEASE_WAIT : configConstants.SAVE_BUTTON}</button>
                    </div> : ''
                }
            </div>
            <form role="form" onSubmit={(e) => {e.preventDefault();}}>
              <PatientCoughContainer 
                  formData            = {props.historyOfPatientData.form_1}
                  patId               = {props.patId}
                  visitId             = {props.visitId}
                  ref                 = {props.PatientCoughContainerRef} 
              />
              <PatientExpectorationContainer 
                  formData            = {props.historyOfPatientData.form_2}
                  patId               = {props.patId}
                  visitId             = {props.visitId}
                  ref                 = {props.PatientExpectorationContainerRef} 
              />
              <PatientHemoptysisContainer 
                  formData            = {props.historyOfPatientData.form_3}
                  patId               = {props.patId}
                  visitId             = {props.visitId}
                  ref                 = {props.PatientHemoptysisContainerRef} 
              />
              <PatientDyspnoeaContainer 
                  formData            = {props.historyOfPatientData.form_4}
                  patId               = {props.patId}
                  visitId             = {props.visitId}
                  ref                 = {props.PatientDyspnoeaContainerRef} 
              />
              <PatientWheezeContainer 
                  formData            = {props.historyOfPatientData.form_5}
                  patId               = {props.patId}
                  visitId             = {props.visitId}
                  ref                 = {props.PatientWheezeContainerRef} 
              />
              <PatientChestPainContainer 
                  formData            = {props.historyOfPatientData.form_6}
                  patId               = {props.patId}
                  visitId             = {props.visitId}
                  ref                 = {props.PatientChestPainContainerRef} 
              />
              <PatientFeverContainer 
                  formData            = {props.historyOfPatientData.form_7}
                  patId               = {props.patId}
                  visitId             = {props.visitId}
                  ref                 = {props.PatientFeverContainerRef} 
              />
              <PatientWeightLossContainer 
                  formData            = {props.historyOfPatientData.form_8}
                  patId               = {props.patId}
                  visitId             = {props.visitId}
                  ref                 = {props.PatientWeightLossContainerRef} 
              />
              <PatientOtherSymptomsContainer 
                  formData            = {props.historyOfPatientData.form_9}
                  patId               = {props.patId}
                  visitId             = {props.visitId}
                  ref                 = {props.PatientOtherSymptomsContainerRef} 
              />
            </form>
            <div className="row">
                {props.user_type != configConstants.USER_TYPE_PATIENT ? 
                    <div className="col-md-12 text-right">
                        <button className="btn table-btn green" disabled={props.submitted ? true : false} onClick={props.submitHopiTestStatus}>{props.submitted ? configConstants.BUTTON_PLEASE_WAIT : configConstants.SAVE_BUTTON}</button>
                    </div> : ''
                }
            </div>
          </div>
        }
    </div>
);
}
