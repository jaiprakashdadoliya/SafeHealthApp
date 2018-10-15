/**
 * DoctorStepOne
 *
 * @package                SafeHealth
 * @subpackage             DoctorStepOne
 * @category               View Component
 * @DateOfCreation         17 July 2018
 * @ShortDescription       This component is reponsible for step 1 view for booking a doctor appointment
 */
import React from "react";
import ReactDOM from "react-dom";
import Select from 'react-select';
import {fontawesome, FontAwesomeIcon} from '../../../../global';
import {faMapMarkerAlt, faCalendarAlt, faClock} from '@fortawesome/fontawesome-free-solid';
import { utilityHelper } from '../../../../_helpers';
export class DoctorStepOne extends React.Component{
    /**
     * @DateOfCreation        19 July 2018
     * @ShortDescription      Contructor is responsible to function declaration
     * @param                 props
     * @return                Nothing
     */
    constructor(props, context) {
        super(props, context);
        this.jumpToStep   = this.jumpToStep.bind(this);
    }


    /**
     * @DateOfCreation          19 July 2018
     * @ShortDescription        This function is responsible to Navigate between the steps
                                after checking for validations.
     * @param                   props
     * @return                  view
     */
    jumpToStep(toStep) {
        if(this.props.checkValidation(toStep-1)){
            this.props.jumpToStep(toStep-1); 
        }
    }

    render(){
        return(
            <div>
                <div className={this.props.validate.booking_reason.isValid ? 'form-group' : 'form-group has-error'}>
                    <h3>What's the reason for your visit?</h3>
                    <Select
                        name="booking_reason"
                        className="custom-select"
                        placeholder="Select reason"
                        onChange={ (value, name) => this.props.handleSelectChange(value, 'booking_reason') }
                        value={this.props.detail.booking_reason}
                        options={utilityHelper.getAppointmentReasons(this.props.appointmentReason)}
                    />
                    <span className="help-block">{this.props.validate.booking_reason.message}</span>
                </div>
                <div className="appointment-view-datetime">
                    <div className="appointment-date">
                        <FontAwesomeIcon icon={faCalendarAlt} /> &nbsp; {utilityHelper.changeDateFormat(this.props.currentDetail.booking_date)}
                    </div>
                    <div className="appointment-time">
                        <FontAwesomeIcon icon={faClock} /> &nbsp; {utilityHelper.changeTimingFormat(this.props.currentDetail.booking_time)}
                    </div>
                </div>
                <button className="btn text-btn green pull-right" onClick={this.jumpToStep.bind(null, 2)}>Next</button>
            </div>
        );
    }
}
