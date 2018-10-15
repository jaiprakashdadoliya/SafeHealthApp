/**
 * Doctor award add/edit
 *
 * @package                SafeHealth
 * @subpackage             Doctor award add/edit
 * @category               Presentational Component
 * @DateOfCreation         15 May 2018
 * @ShortDescription       This component is reponsible to render model of add/edit doctor award
 */
import React from "react";
import { Button, Modal, Alert, bsStyle } from 'react-bootstrap';
import { utilityHelper } from '../../../_helpers';
import Select from 'react-select';

export const DoctorAwardsAdd = (props) => {
    return (
        <div>
            <Modal show={ props.awardAddShow } onHide={ props.handleClose }>
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
                        { props.errorMsg }
                    </Alert>
                }
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-6">
                            <div className={ props.payload.validate.doc_award_name.isValid ? 'form-group' : 'form-group has-error' }>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={ props.payload.detail.doc_award_name }
                                    name="doc_award_name"
                                    onChange={ props.handleChange }
                                />
                                <label className="control-label">Award Name</label>
                                <span className="help-block">{ props.payload.validate.doc_award_name.message }</span>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className={ props.payload.validate.doc_award_year.isValid ? 'form-group' : 'form-group has-error' }>
                                <Select
                                    name = "doc_award_year"
                                    className = "custom-select"
                                    value = { props.payload.detail.doc_award_year }
                                    clearable = { false }
                                    onChange = { (value, name) => props.handleSelectChange(value, 'doc_award_year') }
                                    options = { utilityHelper.getYears() }
                                />
                                <label className="control-label">Year of Award</label>
                                <span className="help-block">{ props.payload.validate.doc_award_year.message }</span>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>

                    <Button className="btn text-btn red"  onClick={ props.handleClose }>Close</Button>
                    <Button className="btn text-btn green"  disabled={props.submitted || props.isInsertDone ? true : false}  onClick={ props.handleSave }>{props.submitted ? 'Sending..' : 'Save'}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
