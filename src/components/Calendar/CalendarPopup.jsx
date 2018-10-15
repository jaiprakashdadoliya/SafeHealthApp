import React from "react";
import ReactDOM from 'react-dom';
import {fontawesome, FontAwesomeIcon, Loading} from '../../global';
import {faMobileAlt, faEnvelope, faTimes } from '@fortawesome/fontawesome-free-solid';
import moment from 'moment';
export class CalendarPopup extends React.Component {
	 constructor(props, context) {
        super(props, context);
    }
    
	render(){
var cancelAppointment = moment().valueOf() <= moment(this.props.payload.popupDetails.appointment_data,'MMM DD,YYYY \a\t h:m A').valueOf() ? true : false;
	    var cancelAppointmentDiv ='';
	    {/*var appointmentDiv = (<a className="btn text-btn green" onClick={this.props.handleRedirect.bind(null,this.props.payload.popupDetails.pat_id,this.props.payload.popupDetails.booking_id,this.props.payload.popupDetails.visit_id)}>{this.props.payload.popupDetails.visit_id != null ?'Visit' : 'Start visit'}</a>);*/}
	    var appointmentDiv = (<a className="btn text-btn green" onClick={() => this.props.handleRedirect(this.props.payload.popupDetails.pat_id,this.props.payload.popupDetails.booking_id,this.props.payload.popupDetails.visit_id)}>{this.props.payload.popupDetails.visit_id != null ?'Visit' : 'Start visit'}</a>);
	    if(cancelAppointment){
	    	var cancelAppointmentDiv = (<a className="btn text-btn green" onClick={() => this.props.cancelAppointMent(this.props.payload.popupDetails.booking_id,moment(this.props.payload.popupDetails.appointment_data,'MMM DD,YYYY \a\t h:m A').format('HHmm'))}>Cancel Appointment</a>);
	    }
	    return(
			<div className="calendar-view-details left hide"  id="popover" style={{top:this.props.payload.topOffset,left:this.props.payload.leftOffset}} ref="node">
	            <div className="calendar-popover-arrow"></div>
	            <div className="remove" onClick={this.props.handleClose}><FontAwesomeIcon icon={faTimes} /></div>
	                <div className="profile-img"><img src={this.props.payload.popupDetails.image}/></div>
	                <div className="patient-other-details"><div className="patient-name">{this.props.payload.popupDetails.name}</div>
	                <div className="patient-others">{this.props.payload.popupDetails.code} <br/>{this.props.payload.popupDetails.gender}, {this.props.payload.popupDetails.age}<br/><span><FontAwesomeIcon icon={faMobileAlt} /></span> {this.props.payload.popupDetails.mobile} <br/><span><FontAwesomeIcon icon={faEnvelope} /></span> {this.props.payload.popupDetails.email}</div></div>
	                <div className="calendar-schedule">Appointment with <span>{this.props.payload.popupDetails.doctor_name}</span> on <span>{this.props.payload.popupDetails.appointment_data}</span></div>
	                <div className="calendar-schedule-reason">Appointment Reason: <span>{this.props.payload.popupDetails.appointment_reason}</span></div>
	                <div className="actions"> {cancelAppointmentDiv}
	                 {appointmentDiv}
	                 </div>
	        </div>
	    );
	}
}