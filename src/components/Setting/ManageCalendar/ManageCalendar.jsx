import React from "react";
import {Button, Alert, bsStyle} from 'react-bootstrap';
import { configConstants } from '../../../_constants';
import { PatientAlertMessage } from '../../../global';
import {FxForm} from '../../../_packages/fx-form';



export const ManageCalendar = (props) => {
  return(
<React.Fragment>
    <div className="" id="manageCalendarTitle">
        <div className="col-md-6">
            <h4>Calendar Setting</h4>
        </div>
    </div>
    <div className="col-md-12">
    <PatientAlertMessage 
        errorMsg = {props.errorMsg}
        isUpdateDone = {props.isUpdateDone}
        successMessage = {props.successMessage}
    />
    </div>
    <form role="form" onSubmit={(e) => {e.preventDefault();}}>

        <FxForm
            config={props.formConfig}
            ref={(form) => {
                //this.boundForm = form;
                props.handleBoundFormUpdate(form);
            }}
        />
     <div className="">
        <div className="col-md-12 text-right">
            <button className="btn text-btn green" disabled={props.submitted ? true : false} onClick={props.submitData}>{props.submitted ? configConstants.BUTTON_PLEASE_WAIT : configConstants.SAVE_BUTTON}</button>
        </div>
    </div>
    </form>
</React.Fragment>
  );
}
