import  React  from "react";
import ReactDOM from "react-dom";
import { Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { utilityHelper } from '../../../_helpers';
import { configConstants } from '../../../_constants';
export const TodaysAppointments = (props) => {
    return (
        <div className="col-md-3">
            <div className="inner-content remove-padding">
                <div className="current-appointments-list">
                    <div className="current-appointments">
                        <h3 className="green-bg">Today's <span>appointments</span></h3>
                        <div className="wrap-appointment">
                            {props.todaysappointments != undefined && props.todaysappointments.length > 0 ? props.todaysappointments.map((appointment, index)=>{
                                return (
                                    <div className="register-appointment-list" key={index}>
                                        <div className="patient-img">
                                            <img src={configConstants.DEFAULT_IMAGE_PATH} />
                                        </div>
                                        <div className="patient-name">{appointment.user_firstname} {appointment.user_lastname} <span>{utilityHelper.changeTimingFormat(appointment.booking_time)}</span></div>
                                            <Nav className="more-option">
                                                <NavDropdown
                                                className="table-dropdown"
                                                eventKey={1}
                                                title="More"
                                                id="">
                                                <MenuItem eventKey={1.4} href="javascript:void(0);" onClick={props.handleRedirect.bind(null,appointment.pat_id,appointment.booking_id, appointment.visit_id)}>{appointment.visit_id != null ? "Visit" : "Start Visit"}</MenuItem>
                                                <MenuItem eventKey={1.2} href="javascript:void(0);" onClick={props.deleteTodayAppointment.bind(null, appointment.booking_id, appointment.booking_time)}>Cancel Appointment</MenuItem>
                                            </NavDropdown>
                                        </Nav>
                                    </div>
                                    );
                                }) : <div className="no-record">No appointments for today!!</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}