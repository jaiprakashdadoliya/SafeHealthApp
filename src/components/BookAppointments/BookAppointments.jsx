import React from "react";
import ReactDOM from "react-dom";
import {BookingsContainer} from "./Bookings";
import {DoctorDetails} from "./DoctorDetails";
import { WebsiteHeaderContainer } from '../WebsiteHeader';

export const BookAppointments = (props) => {
   return (
    <div className="page-container">
          <WebsiteHeaderContainer 
                    history={props.history}
                    loginShow = { props.loginShow }
                />
          <div className="wrap-inner-content">
          <div className="doctor-review-page">
            <DoctorDetails
              doctorDetail = { props.doctorDetail }
              onStarClick  = { props.onStarClick }
              review       = { props.review }
              handleChange = { props.handleChange }
              handleSave   = { props.handleSave }
              successMsg   = { props.successMsg }
              errorMsg     = { props.errorMsg }
              sendingRequest= {props.sendingRequest}
            />
            <BookingsContainer
            doctorDetail = { props.doctorDetail }
            doctorClinic = { props.doctorClinic }
            />
          </div>
          </div>
      </div>
  );
}
