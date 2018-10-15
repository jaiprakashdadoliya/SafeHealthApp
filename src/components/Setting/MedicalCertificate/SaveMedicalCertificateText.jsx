import React from "react";
import { Button, Modal, Alert, bsStyle } from 'react-bootstrap';
import { utilityHelper } from './../../../_helpers';
import Select from 'react-select';

export const SaveMedicalCertificateText = (props) => {
    return (
        <div>
            <Modal show={ props.editTextShow } onHide={ props.handleClose }  backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{ props.title }</Modal.Title>
                </Modal.Header>
                { props.message &&
                    <Alert bsStyle="success">
                        { props.message }
                    </Alert>
                }
                { props.errorMsg &&                      
                    <Alert bsStyle="danger">
                      {props.errorMsg}
                    </Alert>
                }
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-9">
                            <div className='form-group' >
                                <textarea
                                    className="form-control"
                                    rows={5} 
                                    value={ props.payload }
                                    name="mc_text"
                                    onChange={ props.handleChange }
                                    maxLength="400"
                                ></textarea>
                                <label className="control-label"></label>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn text-btn red" onClick={ props.handleClose }>Close</Button>
                    <Button className="btn text-btn green" disabled={ props.submitted || props.isInsertDone ? true : false }  onClick={ props.handleSave }>{ props.submitted ? 'Sending..' : 'Save' }</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
