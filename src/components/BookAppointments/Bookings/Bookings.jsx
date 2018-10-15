import React from "react";
import ReactDOM from "react-dom";
import Select from 'react-select';
import {Carousel} from 'react-bootstrap';
import { configConstants } from '../../../_constants';
import {fontawesome, FontAwesomeIcon} from '../../../global';
import {faMapMarkerAlt, faCalendarAlt, faChevronRight, faChevronLeft} from '@fortawesome/fontawesome-free-solid';
import { Modal } from 'react-bootstrap';
import { AppointmentContainer } from '../Appointment';
import { utilityHelper } from '../../../_helpers';

export const Bookings = (props) => {
    var prevButton = '';
    var timeSlotString = '';
 return (
          
    <div className="col-md-4 make-an-appointment">
          <AppointmentContainer
                    addAppointmentShowHandle = {props.addAppointmentShow}
                    addAppointmentHideHandle = {props.addAppointmentHideHandle}
                    appointmentDetail        = {props.appointmentDetail}
                    doctorDetail             = {props.doctorDetail}
                    appointmentReason        = {props.appointmentReason}
                    doctorClinic             = {props.doctorClinic}
                    />
          <Modal show={props.doctorAlert} onHide={props.doctorAlertHideHandle} className="single-appointment">
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body id="page-slide-1" >
                <div className="row">
                    <div className="col-md-12 alert-message">
                       Only paient are allowed to book an appointment
                    </div>
                </div>
            </Modal.Body>
          </Modal>
      <div className="book-appointment">
        <h2>Make free appointment</h2>
        <div className="appointment-details scroll">
            { props.doctorClinic ? props.doctorClinic.map(
              (clinic, clinicIndex) => {
                  return (
                      <div className="on-location" key={clinicIndex}>
                        <div className="location">
                          {clinic.address ?<span><FontAwesomeIcon icon={faMapMarkerAlt} /></span>: ''}
                          <div className="address">{clinic.address} {clinic.pincode}</div>
                        </div>
                        
                          {clinic.timing.map((timingSlot, timingSlotIndex) => {
                             if(utilityHelper.changeDateFormat(timingSlot.date) != configConstants.CURRENT_DAY){
                              prevButton = (<a href="javascript:void(0)" className="previous" onClick={props.previousSlot.bind(null,clinic.timing[0])}>
                              <FontAwesomeIcon icon={faChevronLeft} /></a>);
                            }else{
                              prevButton = (<a href="javascript:void(0)" className="previous previous-disable">
                              <FontAwesomeIcon icon={faChevronLeft} />
                              </a>);
                            }    
                            return(
                                <div className="appointment-calendar" key={timingSlotIndex}>
                                
                                  <div className="date-heading">
                                  <div className="direction">
                                  {prevButton}
                                    <a href="javascript:void(0)" className="next" onClick={props.nextSlot.bind(null,clinic.timing[0])}><FontAwesomeIcon icon={faChevronRight} /></a>
                                  </div>
                                  {timingSlot.date && utilityHelper.changeDateFormat(timingSlot.date)} &nbsp;
                                  </div>
                                  <div className={timingSlot.nextDay ? "date-column-outer nextDay" : "date-column-outer"}>
                                    { timingSlot.slot ? timingSlot.slot.map((slot, index) => {
                                      if(slot.booking_count >= timingSlot.patients_per_slot){
                                        timeSlotString =(<a  href="javascript:void(0);" >{utilityHelper.changeTimingFormat(slot.slot_time)}</a>);
                                      }else{
                                        timeSlotString = (<a onClick={props.addAppointmentShowHandle.bind(null, timingSlot, slot.slot_time,clinic.address)} href="javascript:void(0);">{utilityHelper.changeTimingFormat(slot.slot_time)} </a>);
                                      }
                                      return(
                                            <div className="date-column" key={index} ><div className="time-slot-column"><div className="time-slot">
                                              {timeSlotString}<div className="booking_counter"><span className="count">{slot.booking_count}</span></div>
                                            </div></div></div>
                                        )
                                    }) : timingSlot.nextDay != 'N/A' ?
                                         <a href="javascript:void(0)" className="no-timeslot" onClick={props.nextAvailableSlot.bind(null,clinic.timing[0])}>
                                          Next availability on {timingSlot.nextDay}, {timingSlot.nextDate}</a>
                                        : <span className="no-timeslot" >
                                          No slots available</span>
                                  }
                                  </div>
                                </div>
                                )
                            })
                          }
                       

                      </div> 
                  )
              }) : <div className="on-location">No record found.</div>
            }
        </div>
      </div>
    </div>
  );
}