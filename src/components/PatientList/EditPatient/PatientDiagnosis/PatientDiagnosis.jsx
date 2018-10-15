import React from "react";
import {Button, Alert, bsStyle} from 'react-bootstrap';
import { utilityHelper } from '../../../../_helpers';
import {configConstants} from '../../../../_constants';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import ReactAutocomplete from 'react-autocomplete';
import Loadable from 'react-loadable'; 
import { Loading, PatientAlertMessage } from './../../../../global';
import {FxMultiAddFormContainer} from '../../../../_packages/fx-multi-add-form';
import {FxForm} from '../../../../_packages/fx-form';

import 'react-datepicker/dist/react-datepicker.css';
import ReactTable from "react-table";
import "react-table/react-table.css";

export const PatientDiagnosis = (props) => {
  return (
    <div>
        <div className="col-md-12" id='diagnosis-top-div'>
            <PatientAlertMessage 
              isUpdateDone = {props.isFactorDataInsertDone}
              successMessage = {props.successMsg}
            />
        </div>

        <FxMultiAddFormContainer 
              gridData                  = {props.gridData}
              filterAl                  = {props.filterAl}
              searchHandler             = {props.diagnosisSearch}
              fxFormViewModel           = {props.diagnosisFormShow}
              fxFormViewModelHideHandle = {props.patientEditDiagnosisHideHandle}
              fxFormConfig              = {props.diagnosisFormConfig}
              handleBoundFormUpdate     = {props.handleBoundFormUpdate}
              handleSubmit              = {props.handleSubmit}
              fxMultiAddFormExtraConfig = {props.fxMultiAddFormExtraConfig}
              fxMultiAddFormTitle       = {props.fxMultiAddFormTitle}
              successMsg                = {props.successMsg}
              errorMsg                  = {props.errorMsg}
              submitted                 = {props.submitted}
        />

        {/*<div className="col-md-6">
            <h5>GERD</h5>
            <FxForm
                config={props.diagnosisFormData.GerdDiseaseFormFactor}
                ref={(form) => {
                    props.handleBoundGerdFormUpdate(form);
                }}
            />
        </div>*/}

       {/* <div className="col-md-6">
            <h5>CTD</h5>
            <FxForm
                config={props.diagnosisFormData.CtdDiseaseFormFactor}
                ref={(form) => {
                    props.handleBoundCtdFormUpdate(form);
                }}
            />
        </div>*/}

        {/*<div className="col-md-12">
            <h5>Pulmonary hypertension: 2D ECHO</h5>
            <FxForm
                config={props.diagnosisFormData.PulmonaryDiseaseFormFactor}
                ref={(form) => {
                    props.handleBoundPulmonaryFormUpdate(form);
                }}
            />
        </div>
        */}
        {/*<div className="col-md-12 text-right">
            {props.user_type != configConstants.USER_TYPE_PATIENT ? 
                <button onClick={props.handleDiagnosisFactorSubmit} disabled={(props.submitted) && !props.errorMessage && !props.successMsg ? true : false} className="btn text-btn green">{(props.submitted) && !props.errorMessage && !props.successMsg ? 'Sending..' : 'Save'}</button>
            : '' }
        </div>*/}

        
    </div>

);
}
