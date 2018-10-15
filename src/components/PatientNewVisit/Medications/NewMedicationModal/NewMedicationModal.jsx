import React from "react";
import {Button, Alert, bsStyle,Modal} from 'react-bootstrap';
import Select from 'react-select';
import { utilityHelper } from '../../../../_helpers';
import {FxForm} from '../../../../_packages/fx-form';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

export const NewMedicationModal = (props) => {
    return (
        <div>
            <Modal show={props.newMedicationModalShow} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Medicine</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="row">
                        <div className="col-md-12">
                            {props.errorMsg && !props.isInsertDone &&
                                <Alert bsStyle="danger">
                                    {props.errorMsg}
                                </Alert>
                            }

                            {(props.isUpdateDone || props.isEditSuccess) &&
                                props.successMsg &&
                                    <Alert bsStyle="success">
                                        {props.successMsg}
                                    </Alert>
                            }
                        </div>
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
                    <Button className="btn text-btn green" onClick={props.submitMedication}>Save</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
