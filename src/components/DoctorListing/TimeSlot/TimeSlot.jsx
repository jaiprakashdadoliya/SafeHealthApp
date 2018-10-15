import React from "react";
import {fontawesome, FontAwesomeIcon} from '../../../global';
import { configConstants } from '../../../_constants';
import {faMapMarkerAlt, faCalendarAlt, faChevronRight, faChevronLeft} from '@fortawesome/fontawesome-free-solid';
import { utilityHelper } from '../../../_helpers';
export const TimeSlot = (props) => {
    let prevButton = '';
    var timeSlotString = '';
    var key = Object.keys(props.timeSlot)[0];
    var slots = props.timeSlot[key];
    
    if(utilityHelper.changeDateFormat(slots.date) != configConstants.CURRENT_DAY){
      prevButton = (<a href="javascript:void(0)" className="previous" onClick={props.previousSlot.bind(null,slots)}>
      <FontAwesomeIcon icon={faChevronLeft} /></a>);
    }else{
      prevButton = (<a href="javascript:void(0)" className="previous previous-disable">
      <FontAwesomeIcon icon={faChevronLeft} /></a>);
    }  
   
    return (
      <div className="col-md-4 col-sm-4">
        <div className="calendar-listing-section appointment-calendar">
                  <div className="date-column">
                    <div className="date-heading">
                      <div className="direction">
                      <span>{utilityHelper.changeDateFormat(slots.date)}</span>
                        {prevButton} 
                        <a href="javascript:void(0)" className="next" onClick={props.nextSlot.bind(null,slots)}><FontAwesomeIcon icon={faChevronRight} /></a>
                      </div>
                    </div>
                    <div className={slots.nextDay ? "date-column-outer searching nextDay" : "date-column-outer searching"}>
                      { slots.slot ? slots.slot.map((slot, index) => {
                        if(slot.booking_count >= slots.patients_per_slot){
                          timeSlotString =(<a  href="javascript:void(0);" >{utilityHelper.changeTimingFormat(slot.slot_time)}</a>);
                        }else{
                          timeSlotString = (<a onClick={props.addAppointmentShowHandle.bind(null, props.detail, slot.slot_time)} href="javascript:void(0);">{utilityHelper.changeTimingFormat(slot.slot_time)} </a>);
                        }
                        return(
                              <div className="date-column" key={index} ><div className="time-slot-column">
                              <div className="time-slot">
                                {timeSlotString}
                                <div className="booking_counter">
                                <span className="count">{slot.booking_count}</span>
                                <div className="remain-booking">Available Booking: 0<br/>Already Booked: {slot.booking_count}</div>
                                </div>
                              </div>
                              </div>
                              </div>
                          )
                      }) : slots.nextDay != 'N/A' ?
                            <a href="javascript:void(0)" className="no-timeslot" onClick={props.nextAvailableSlot.bind(null,slots)}>
                            Next availability on {slots.nextDay}, {slots.nextDate}</a>
                          : <span className="no-timeslot" >
                            No slots available</span>
                    }
                    </div>
                  </div>
        </div>
      </div> 
    );
}
