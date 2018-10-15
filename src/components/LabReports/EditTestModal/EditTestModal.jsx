import React from "react";
import {Button, Alert, bsStyle,Modal} from 'react-bootstrap';
import Select from 'react-select';
import { utilityHelper } from '../../../_helpers';
import {FxForm} from '../../../_packages/fx-form';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

export const EditTestModal = (props) => {    
  return (
    <div>
      <Modal show={props.editTestModalShow} onHide={props.handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Test</Modal.Title>
        </Modal.Header>
        <Modal.Body>
             {props.successMsg &&
                    <Alert bsStyle="success">
                        Test updated successfully
                    </Alert>
              }
            <div className="">
                <form role="form" onSubmit={(e) => {e.preventDefault();}}>
                    <FxForm
                        config={props.formConfig}
                        ref={(form) => {
                            props.handleBoundFormUpdate(form);
                        }}

                    />
                </form>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn text-btn red" onClick={props.handleClose}>Close</Button>
          <Button className="btn text-btn green" onClick={props.testSubmit.bind(null, 'edit')}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
