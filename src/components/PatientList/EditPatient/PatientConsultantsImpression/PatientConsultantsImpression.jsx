import React from "react";
import {FxForm} from '../../../../_packages/fx-form';
import { PatientAlertMessage } from './../../../../global';
import { configConstants } from '../../../../_constants';
export const PatientConsultantsImpression = (props) => {
  return(
    <div>
         <div className="row" id="ConsultantTitle">
          <div className="col-md-6">
            <h3>Work Environment Factors</h3>
          </div>
          <div className="col-md-6 text-right">
            <button className="btn text-btn green" disabled={props.submitted ? true : false} onClick={props.submitConsultantStatus}>{props.submitted ? configConstants.BUTTON_PLEASE_WAIT : configConstants.SAVE_BUTTON}</button>
          </div>
        </div>
        <PatientAlertMessage 
            errorMsg = {props.errorMsg}
            isUpdateDone = {props.isUpdateDone}
            successMessage = {props.successMessage}
        />

        <form role="form" onSubmit={(e) => {e.preventDefault();}}>
            <FxForm
                config={props.patientConsultantData.form_consultant}
                ref={(form) => {
                    //this.boundForm = form;
                    props.handleBoundFormUpdate(form);
                }}

            />
        </form>
        <div className="row">
          <div className="col-md-12 text-right">
            <button className="btn text-btn green" disabled={props.submitted ? true : false} onClick={props.submitConsultantStatus}>{props.submitted ? configConstants.BUTTON_PLEASE_WAIT : configConstants.SAVE_BUTTON}</button>
          </div>
        </div>
        
    </div>
  );
}
