import React from "react";
import {Button, Alert, bsStyle,Modal} from 'react-bootstrap';
import { utilityHelper } from '../../../_helpers';
import { PrescriptionsContainer } from '../Prescriptions';

export const MedicinePrescriptionModal = (props) => {
    return (
        <div>
            <Modal show={props.medicineViewPrescriptionModalShow} onHide={props.medicineViewPrescriptionModalHide} className="prescription-model">
                <Modal.Header closeButton>
                    <Modal.Title>Prescription</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="row medicine-chart-container">
                        <PrescriptionsContainer 
                            visitId = {props.visitId}  
                            patId   = {props.patId}  
                        />                       
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button className="btn text-btn red" onClick={props.medicineViewPrescriptionModalHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
