import React from "react";
import {fontawesome, FontAwesomeIcon} from '../../global';
import {faStar, faMapMarkerAlt, faCalendarAlt, faRupeeSign, faClock, faInfoCircle} from '@fortawesome/fontawesome-free-solid';
import { AppointmentContainer } from '../BookAppointments/Appointment';
import { configConstants } from '../../_constants';
import { utilityHelper } from '../../_helpers';
import { TimeSlot } from './TimeSlot/TimeSlot';
import { MoreFilters } from './MoreFilters';
import Loadable from 'react-loadable';
import { Modal } from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';

export const DoctorListing = (props) => {
    var listArray = [];
    var activeClass;
    for (var i=0; i < props.pages; i++) {
          activeClass ='paginate_button';
        if(i == props.page){
          activeClass = "paginate_button active";
        }
        if(i<10){
         listArray.push(<li className={activeClass} key={i}><a href="javascript:void(0)"  data-dt-idx="1" tabIndex="0" onClick={props.handlePaginationClick.bind(null,i)}>{i+1}</a></li>);
        }
    }
    return (
        <div>
            <AppointmentContainer
                addAppointmentShowHandle = {props.addAppointmentShow}
                addAppointmentHideHandle = {props.addAppointmentHideHandle}
                appointmentDetail        = {props.appointmentDetail}
                doctorDetail             = {props.doctorDetail}
                isSourceListing          = {props.isSourceListing}
                appointmentReason        = {props.appointmentReason}
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

            <div className="doctorlisting-page">
                <div className="col-md-8">
            
                    <div className="calendar-nav">
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                            <div className="row">
                                <div className="col-md-5 col-sm-5 search-filter">
                                  <h3>
                                  All Doctors related to city and specialisation
                                  </h3>
                                  <div className="shorting">
                                    <span>Sort by:</span>
                                    <span className="select-shorting">
                                    <select onChange={props.handleSelectChange} name="doctor_name" >
                                    <option defaultValue="default">Default</option>
                                    <option value="name">By Name</option>
                                    <option value="review">By Review</option>
                                    </select>
                                  </span>
                                  </div>
                                  {/*utilityHelper.getFilters(props.filters.filter_gender,'gender')} {utilityHelper.getFilters(props.filters.filter_consulting_fee,'consult_fee')} {utilityHelper.getFilters(props.filters.filter_hours_before_10,'hour_filter')} {utilityHelper.getFilters(props.filters.filter_hours_after_05,'hour_filter')} {utilityHelper.getFilters(props.filters.filter_availability,'availibity')} {utilityHelper.getFilters(props.filters.filter_distance,'distance')*/}
                                </div>
                                <div className="col-md-7 text-right">
                                  <div className="dataTables_paginate paging_simple_numbers" id="example_paginate">
                                    {props.pages >= 2 &&
                                      <ul className="pagination">
                                        <li className="paginate_button" disabled={props.buttonDisable} id="example_previous"><a href="javascript:void(0)" aria-controls="example" data-dt-idx="0" tabIndex="0" onClick={props.pageNavigation.bind(null, props.page, configConstants.PREVIOUS_SLOT,props.pages)}>Previous</a></li>
                                        {listArray}
                                        <li className="paginate_button" disabled={props.buttonDisable} id="example_next"><a href="javascript:void(0)" aria-controls="example" data-dt-idx="7" tabIndex="0"  onClick={props.pageNavigation.bind(null, props.page, configConstants.NEXT_SLOT,props.pages)}>Next</a></li>
                                      </ul>
                                    }
                                  </div>
                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {!props.sendingRequest  &&
                      <p>{props.searchedCount ? props.searchedCount : 0 } matches found for:{props.searchedSpl ? props.searchedSpl : '' } in {props.searchedCity ? props.searchedCity : '' }</p>
                    }
                    {!props.sendingRequest && props.doctorListing.length > 0 ? props.doctorListing.map((detail, index) =>{
                     
                      if(detail != null){
                        return(
                          <div className="doctor-listing-section" key={index}>
                            <div className="row">
                              <div className="col-md-8 col-sm-8">
                                <div className="doctor-profile-image">
                                  {!detail.doc_profile_img ? <img src={configConstants.PROFILE_LOADING} / >  : <a href="javascript:void(0)" onClick={props.handleDoctorDetail.bind(null,detail.doc_slug)}><img src={(detail.doc_profile_img !== '') ? configConstants.PROFILE_BASE_PATH+detail.doc_profile_img : configConstants.DEFAULT_IMAGE_PATH } /></a>
                                  }
                                  <div className="doctor-ratings">
                                    <div className='rating-stars'>
                                      <div className="doctor-ratings">
                                        <div className='rating-stars text-center'>
                                          <StarRatingComponent 
                                            name="average" 
                                            starCount={5}
                                            value={detail.overall_average!=null ? parseInt(detail.overall_average) : 0}
                                            editing={false}
                                          />
                                         <a href="#">{props.doctorDetail.doc_review_count}</a>
                                        </div>
                                      </div>
                                      <div className='review'>
                                      <a href="#">{detail.doc_review_count} review</a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <a href="javascript:void(0)" onClick={props.handleDoctorDetail.bind(null,detail.doc_slug)}>
                                  <div className="doctor-description">
                                      <div className="doctor-name">Dr. {detail.user_firstname} {detail.user_lastname}</div>
                                      <div className="doctor-specialties">{detail.doc_deg_name}</div>
                                      <div className="doctor-specialties-des">{detail.doc_spec_detail.doc_special}</div>
                                      <div className="location">
                                      <div className="extra-finfo">
                                      <span className="icon"><FontAwesomeIcon icon={faRupeeSign} /></span>
                                      <div className="details">{detail.doc_consult_fee} </div>
                                      </div>
                                      {/*<div className="extra-finfo">
                                        <span className="icon"><FontAwesomeIcon icon={faClock} /></span>
                                        <div className="details">Mon-Sat <span>11:00 AM-2:00 PM, 5:00 PM-8:00 PM</span></div>
                                        </div>*/}
                                      <div className="extra-finfo">
                                      <span className="icon"><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
                                      <div className="details">{detail.doc_address_line1}</div>
                                    </div>
                                    <div className="clinic-details">
                                      <div className="clinic-name">
                                          {detail.clinic_name}
                                      </div>
                                      {/*<div className="clinic-images">
                                        <img src={require('../../assets/images/10.jpg')}/>
                                        <img src={require('../../assets/images/10.jpg')}/>
                                        <img src={require('../../assets/images/10.jpg')}/>
                                        <img src={require('../../assets/images/10.jpg')}/>
                                        <img src={require('../../assets/images/10.jpg')}/>

                                      </div>*/}
                                    </div>
                                  </div>
                                </div>
                              </a>
                              </div>
                              {detail.doc_timing_slot && 
                                  <TimeSlot
                                      timeSlot = {detail.doc_timing_slot}
                                      previousSlot = {props.previousSlot}
                                      nextSlot = {props.nextSlot}
                                      addAppointmentShowHandle = {props.addAppointmentShowHandle}
                                      detail = {detail}
                                      nextAvailableSlot = {props.nextAvailableSlot}
                                  />
                              }
                              </div>
                            </div>
                        )
                        
                      }
                    }) : 
                          <div>
                            {props.sendingRequest ? 
                            <div className="showbox">
                              <div className="loader">
                                <svg className="circular" viewBox="25 25 50 50">
                                  <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
                                </svg>
                              </div>
                            </div>
                          :
                          <h1>No doctors found!!</h1>
                          }
                        </div>
                  }
                </div>
                <MoreFilters 
                  sendingRequest = {props.sendingRequest}
                  handleInputChange = {props.handleInputChange}
                  resetFilter     = {props.resetFilter}
                  defaultFilters = {props.defaultFilters}
                  filters    ={props.filters}
                />
            </div>
        </div>
    );
}
