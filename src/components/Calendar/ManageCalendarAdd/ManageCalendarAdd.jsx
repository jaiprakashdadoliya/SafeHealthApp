import React from "react";
import {Button, Alert, bsStyle,Modal} from 'react-bootstrap';
import { configConstants } from '../../../_constants';
import { PatientAlertMessage } from '../../../global';
import {FxForm} from '../../../_packages/fx-form';



export const ManageCalendarAdd = (props) => {
  return(
<React.Fragment>
<Modal show={props.modalShow} onHide={props.handleModalClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
   
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
    </form>
    </Modal.Body>
        <Modal.Footer>
          <Button className="btn text-btn red" onClick={props.handleModalClose}>Close</Button>
          <Button className="btn text-btn green" disabled={props.submittedAdd ? true : false} onClick={props.submitData}>{props.submittedAdd ? configConstants.BUTTON_PLEASE_WAIT : configConstants.SAVE_BUTTON}</Button>
        </Modal.Footer>
      </Modal>
</React.Fragment>
  );
}
