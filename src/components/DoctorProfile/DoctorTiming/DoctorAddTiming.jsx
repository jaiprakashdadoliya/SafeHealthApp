import React from "react";
import {Button, Modal, Alert, bsStyle } from 'react-bootstrap';
import Select from 'react-select';
import { utilityHelper } from '../../../_helpers';

/**
 * DoctorAddTiming
 *
 * @package                SafeHealth
 * @subpackage             DoctorAddTiming
 * @category               Presentational Component
 * @DateOfCreation         23 May 2018
 * @ShortDescription       This component is reponsible to show the Doctor timing add modal
 */
export const DoctorAddTiming = (props) => {
    return(
        <div>
            <Modal show={props.timingAddModelShow} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Shift</Modal.Title>
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
                        <div className="col-md-4">
                            <div className={ props.payload.timingValidate.week_day.isValid ? 'form-group' : 'form-group has-error' }>
                                <Select
                                    className="custom-select"
                                    onChange={(value, label) => props.handleSelectChange(value, 'week_day')}
                                    options={utilityHelper.getWeekdays()}
                                    value = { props.payload.timing.week_day }
                                    clearable = { false }
                                />
                                <label className="control-label">Week Day</label>
                                <span className="help-block">{ props.payload.timingValidate.week_day.message }</span>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className={ props.payload.timingValidate.start_time.isValid ? 'form-group' : 'form-group has-error' }>
                                <Select
                                    className="custom-select"
                                    onChange={(value, name) => props.handleSelectChange(value, 'start_time')}
                                    options={utilityHelper.getTime()}
                                    value = { props.payload.timing.start_time }
                                    clearable = { false }
                                />
                                <label className="control-label">Start Time</label>
                                <span className="help-block">{ props.payload.timingValidate.start_time.message }</span>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className={ props.payload.timingValidate.end_time.isValid ? 'form-group' : 'form-group has-error' }>
                                <Select
                                    className="custom-select"
                                    onChange={(value, name) => props.handleSelectChange(value, 'end_time')}
                                    options={utilityHelper.getTime()}
                                    value = { props.payload.timing.end_time }
                                    clearable = { false }
                                />
                                <label className="control-label">End Time</label>
                                <span className="help-block">{ props.payload.timingValidate.end_time.message }</span>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className={ props.payload.timingValidate.slot_duration.isValid ? 'form-group' : 'form-group has-error' }>
                                <Select
                                    className="custom-select"
                                    onChange={(value, name) => props.handleSelectChange(value, 'slot_duration')}
                                    options={utilityHelper.getSlotDurations()}
                                    value = { props.payload.timing.slot_duration }
                                    clearable = { false }
                                />
                                <label className="control-label">Slot Duration</label>
                                <span className="help-block">{ props.payload.timingValidate.slot_duration.message }</span>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className={ props.payload.timingValidate.patients_per_slot.isValid ? 'form-group' : 'form-group has-error' }>
                                <Select
                                    className="custom-select"
                                    onChange={(value, name) => props.handleSelectChange(value, 'patients_per_slot')}
                                    options={utilityHelper.getPatientsPerSlot()}
                                    value = { props.payload.timing.patients_per_slot }
                                    clearable = { false }
                                />
                                <label className="control-label">Patients Per Slot</label>
                                <span className="help-block">{ props.payload.timingValidate.patients_per_slot.message }</span>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className={ props.payload.timingValidate.clinic_id.isValid ? 'form-group' : 'form-group has-error' }>
                                <Select
                                    className="custom-select"
                                    onChange={(value, name) => props.handleSelectChange(value, 'clinic_id')}
                                    options={props.clinicList}
                                    value = { props.payload.timing.clinic_id }
                                    clearable = { false }
                                />
                                <label className="control-label">Clinic</label>
                                <span className="help-block">{ props.payload.timingValidate.clinic_id.message }</span>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn text-btn red" onClick={props.handleClose}>Close</Button>
                    <Button onClick={props.handleSubmit} disabled={(props.submitted || props.isInsertDone) && !props.errorMsg ? true : false} className="btn text-btn green">{(props.submitted || props.isInsertDone) && !props.errorMsg ? 'Sending..' : 'Save'}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
