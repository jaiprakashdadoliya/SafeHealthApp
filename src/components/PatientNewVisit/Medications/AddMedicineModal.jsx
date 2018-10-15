import React from "react";
import {Button, Alert, bsStyle,Modal} from 'react-bootstrap';
import { utilityHelper } from '../../../_helpers';
import { ManageDrugsContainer } from '../../Setting/ManageDrugs';
import {FxForm} from '../../../_packages/fx-form';

export const AddMedicineModal = (props) => {
    return (
        <div>
            <Modal show={props.addMedicineModalShow} onHide={props.addMedicineModalHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Drug</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="row medicine-chart-container">
                        <div className="row">
                            <div className="col-md-12">
                                {props.errorMsg && !props.isInsertDone &&
                                    <Alert bsStyle="danger">
                                        {props.errorMsg}
                                    </Alert>
                                }

                                {(props.isInsertDone) &&
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
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button className="btn text-btn red" onClick={props.addMedicineModalHide}>Close</Button>
                    <Button className="btn text-btn green" onClick={props.handleAddMedicineSubmit}>Save</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
