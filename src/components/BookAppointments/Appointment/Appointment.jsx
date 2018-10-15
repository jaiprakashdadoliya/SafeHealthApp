/**
 * DoctorAppointment
 *
 * @package                SafeHealth
 * @subpackage             DoctorAppointment
 * @category               View Component
 * @DateOfCreation         14 July 2018
 * @ShortDescription       This component is reponsible for booking a doctor appointment view
 */
import React from "react";
import ReactDOM from "react-dom";
import StepZilla from 'react-stepzilla';
import { fontawesome, FontAwesomeIcon } from '../../../global';
import { faMapMarkerAlt, faCalendarAlt, faClock, faStar } from '@fortawesome/fontawesome-free-solid';
import { Button, Modal, Alert, bsStyle } from 'react-bootstrap';
import { DoctorStepOne } from './DoctorStepOne';
import { DoctorStepTwo } from './DoctorStepTwo';
import { DoctorStepThree } from './DoctorStepThree';
import { configConstants } from '../../../_constants';
import { appointmentConstants } from './appointmentConstants';
import StarRatingComponent from 'react-star-rating-component';

export class Appointment extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const steps = [
                {name: 'Select Reason', component: <DoctorStepOne handleSelectChange={this.props.handleSelectChange} detail={this.props.payload.detail} validate={this.props.payload.validate} errorMsg={this.props.errorMsg} checkValidation={this.props.checkValidation} currentDetail={this.props.currentDetail} appointmentReason={this.props.appointmentReason}/>},
                {name: 'Select Payment Mode', component: <DoctorStepTwo handleCheckboxChange={this.props.handleCheckboxChange} detail={this.props.payload.detail} validate={this.props.payload.validate} errorMsg={this.props.errorMsg} checkValidation={this.props.checkValidation} handleSave={this.props.handleSave} message={this.props.message} submitted={this.props.submitted}/>},
                {name: 'Completed', component: <DoctorStepThree handleCheckboxChange={this.props.handleCheckboxChange} detail={this.props.payload.detail} errorMsg={this.props.errorMsg} message={this.props.message} loader={this.props.loader}/>},
        ]; 
        return (
            <div>
                    <Modal show={this.props.addAppointmentShowHandle} onHide={this.props.handleClose} className="single-appointment">
                        <Modal.Header closeButton></Modal.Header>
                        <Modal.Body id="page-slide-1" >
                                <div className="row">
                                    <div className="col-md-4 profile-view">
                                        <div className="profile-view-inner">
                                            <div className="doctor-image">
                                                <img src={(this.props.doctorDetail.doc_profile_img !== '' && this.props.doctorDetail.doc_profile_img !== configConstants.DEFAULT_IMAGE_PATH) ? configConstants.PROFILE_BASE_PATH+this.props.doctorDetail.doc_profile_img : configConstants.DEFAULT_IMAGE_PATH}/>
                                            </div>
                                            <div className="doctor-name">
                                            {this.props.doctorDetail.title} {this.props.doctorDetail.user_firstname} {this.props.doctorDetail.user_lastname}
                                            </div>
                                            <div className="doctor-degree">
                                                {this.props.doctorDetail.doc_deg_name}
                                            </div>
                                            <div className="doctor-specialties">
                                                {this.props.doctorDetail.doc_spac_string}
                                            </div>
                                            <div className="doctor-ratings">
                                                <div className='rating-stars text-center'>
                                                    <StarRatingComponent 
                                                      name="average" 
                                                      starCount={5}
                                                      value={parseInt(this.props.doctorDetail.doc_rating)}
                                                      editing={false}
                                                    />
                                                   <a href="#">{this.props.doctorDetail.doc_review_count} review</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        { this.props.userNotValidMsg &&
                                            <Alert bsStyle="danger">
                                              {this.props.userNotValidMsg}
                                            </Alert>
                                        }

                                        <div className="location">
                                            <span><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
                                            <div className="address">{ this.props.payload.detail.clinic_address!=undefined ? this.props.payload.detail.clinic_address :  this.props.doctorDetail.doc_address_line1+' '+this.props.doctorDetail.doc_address_line2}</div>
                                        </div>
                                        { this.props.addAppointmentShowConfirm ?
                                            <div className='step-progress'>
                                                <div className="col-sm-12">
                                                    {appointmentConstants.PATIENT_ALREADY_BOOKED_CONFIRM}
                                                </div>
                                                <div className="col-sm-12 text-center">
                                                <button className="btn text-btn green" onClick={this.props.confirmAddAppointmentShow.bind(null, true)}>Yes, Continue</button>
                                                <button className="btn text-btn green" onClick={this.props.confirmAddAppointmentShow.bind(null, false)}>Cancel</button>
                                                </div>
                                            </div>
                                        :
                                            <div>
                                                { this.props.slotAvailable ?
                                                    <div className='step-progress'>
                                                        <StepZilla steps={steps} prevBtnOnLastStep={true} nextTextOnFinalActionStep="Confirm" showNavigation={false}/>
                                                    </div>
                                                : 
                                                    <div>
                                                        { this.props.unavailableMsg &&
                                                          <div className="row success-step">
                                                            <div className="col-md-12">
                                                                <div className="form-group error">
                                                                    <div className="checkmark-sign"><h3>&#x274C;</h3></div>
                                                                    <h3>{this.props.unavailableMsg}</h3>
                                                                </div>
                                                            </div>
                                                          </div>
                                                        }
                                                    </div>
                                                }
                                            </div>
                                        }
                                    </div>
                                </div>
                        </Modal.Body>
                    </Modal>
            </div>
      );
    }
}