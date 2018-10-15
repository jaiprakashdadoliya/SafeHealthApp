/**
 * Doctor appointment add/edit
 *
 * @package                SafeHealth
 * @subpackage             Doctor appointment add
 * @category               Presentational Component
 * @DateOfCreation         15 May 2018
 * @ShortDescription       This component is reponsible to render model of add/edit doctor appointment
 */
import React from "react";
import { Button, Modal, Alert, bsStyle } from 'react-bootstrap';
import { utilityHelper } from '../../_helpers';
import Select from 'react-select';
import { DatePickerData } from '../../global';
export const AppointmentAdd = (props) => {
    return (
        <div>
            <Modal show={ props.appointmentAddShow } onHide={ props.handleClose } backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Appointment</Modal.Title>
                </Modal.Header>
                { props.successMsg &&
                    <Alert bsStyle="success">
                        { props.successMsg }
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
                            <div className={ props.appointment.validate.pat_id.isValid ? 'form-group' : 'form-group has-error' }>
                                <Select
                                    name = "pat_id"
                                    className = "custom-select"
                                    value = { props.appointment.detail.pat_id }
                                    clearable = { false }
                                    placeholder = "Select patient"
                                    onChange = { (value, name) => props.handleSelectChange(value, 'pat_id') }
                                    options = { props.bookingPatient }
                                />
                                <label className="control-label">Patient Name</label>
                                <span className="help-block">{ props.appointment.validate.pat_id.message }</span>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className={ props.appointment.validate.booking_reason.isValid ? 'form-group' : 'form-group has-error' }>
                                <Select
                                    name="booking_reason"
                                    className="custom-select"
                                    placeholder="Select reason"
                                    onChange={ (value, name) => props.handleSelectChange(value, 'booking_reason') }
                                    value={props.appointment.detail.booking_reason}
                                    options={utilityHelper.getAppointmentReasons(props.appointmentReason)}
                                />
                                <label className="control-label">Appointment reason</label>
                                <span className="help-block">{ props.appointment.validate.booking_reason.message }</span>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className={ props.appointment.validate.clinic_id.isValid ? 'form-group' : 'form-group has-error' }>
                                <Select
                                    name = "clinic_id"
                                    className = "custom-select"
                                    value = { props.appointment.detail.clinic_id }
                                    clearable = { false }
                                    placeholder = "Select clinic"
                                    onChange = { (value, name) => props.handleSelectChange(value, 'clinic_id') }
                                    options = { props.bookingClinic }
                                />
                                <label className="control-label">Clinic</label>
                                <span className="help-block">{ props.appointment.validate.clinic_id.message }</span>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className={ props.appointment.validate.booking_date.isValid ? 'form-group' : 'form-group has-error' }>
                                <DatePickerData
                                    name = "booking_date"
                                    selectedValue={props.appointment.detail.booking_date}
                                    onChange={props.handleChange}
                                    disableDate="before"
                                />
                                <label className="control-label">Appointment Date</label>
                                <span className="help-block">{ props.appointment.validate.booking_date.message }</span>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className={ props.appointment.validate.booking_time.isValid ? 'form-group' : 'form-group has-error' }>
                                <Select
                                    name = "booking_time"
                                    className = "custom-select"
                                    value = { props.appointment.detail.booking_time }
                                    clearable = { false }
                                    onChange = { (value, name) => props.handleSelectChange(value, 'booking_time') }
                                    options = { props.bookingAppointmentTime }
                                />
                                <label className="control-label">Appointment Time</label>
                                <span className="help-block">{ props.appointment.validate.booking_time.message }</span>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>

                    <Button className="btn text-btn red"  onClick={ props.handleClose }>Close</Button>
                    <Button className="btn text-btn green"  disabled={props.sendingRequest ? true : false}  onClick={ props.submitAppointment }>{props.sendingRequest ? 'Sending..' : 'Save'}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
