import React from "react";
import {Button, Alert, bsStyle,Modal} from 'react-bootstrap';
import Select from 'react-select';
import { utilityHelper } from '../../../_helpers';
import {FxForm} from '../../../_packages/fx-form';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

export const NewPatientModal = (props) => {    
  return (
    <div>
      <Modal show={props.newPatientModalShow} onHide={props.handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>New Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <div className="">
            {props.errorMsg && !props.isInsertDone &&
                <Alert bsStyle="danger">
                    {props.errorMsg}
                </Alert>
            }

            {props.isInsertDone &&
                props.successMsg &&
                    <Alert bsStyle="success">
                        {props.successMsg}
                    </Alert>
            }
                <form role="form" onSubmit={(e) => {e.preventDefault();}}>
                    <FxForm
                        config={props.formConfig}
                        ref={(form) => {
                            //this.boundForm = form;
                            props.handleBoundFormUpdate(form);
                        }}

                    />
                </form>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn text-btn red" onClick={props.handleClose}>Close</Button>
          <Button className="btn text-btn green" onClick={props.submitPatient}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}