import React from "react";
import ReactDOM from "react-dom";
import {Timeline, TimelineEvent} from 'react-event-timeline';
import ReactTable from "react-table";
import "react-table/react-table.css";
import moment from 'moment';
import {configConstants} from './../../../_constants';
import { Button, Modal, Alert, bsStyle } from 'react-bootstrap';
import { fontawesome, FontAwesomeIcon, Loading, DatePickerData } from './../../../global';

export const MedicalCertificates = (props) => {
    return (
        <div className="main-content">
            <div className="col-md-12 col-sm-12 text-center">
                <div className="inner-content">
                    <div className="row">
                        <h2>Medical Certificate</h2>
                    </div>
                </div>
            </div>
            <div className="col-md-12">
                <div className="wrap-inner-content certificate-text">
                    <div className="inner-content">
                        <div className="row">
                            <div className="col-md-12 col-sm-12 text-right">
                                <a href="javascript:void(0);" onClick={ () => window.print() } className="btn text-btn green">Print</a>
                            </div>
                            <div className="col-md-12 col-sm-12">
                                Signature of Applicant:
                            </div>
                            <div className="col-md-12 col-sm-12">

                            </div>
                            <div className="col-md-12 col-sm-12">
                                I Dr. {props.userInfo.user_firstname} {props.userInfo.user_lastname}, after careful examination of the case, hereby certify that <span><input type="text" className="text-border-hide-on-print" name="patient_name" placeholder="Patient's Name" /></span> whose signature is given above, is suffering from <span><input type="text" className="text-border-hide-on-print" name="patient_disease" placeholder="Disease Name" /></span> and is considered that a period of absence from duty of <span><input type="text" className="text-border-hide-on-print" name="duty_number" placeholder="No" /></span> <span><select className="text-border-hide-on-print" name="duty_days"><option value="day(s)">day(s)</option><option value="month(s)">month(s)</option><option value="year(s)">year(s)</option></select></span> 
                                with effect from 
                                <span className="inline-date">
                                <DatePickerData
                                        dateFormat="DD-MM-YYYY"
                                        name = "effect_date"
                                        className = "text-border-hide-on-print "
                                        selectedValue={props.medicalCertificateTextData.effect_date}
                                        onChange={props.handleChange}
                                    />
                                </span> 
                                is absolutely necessary for restoration of his health.
                            </div>
                            <div className="col-md-12 col-sm-12">
                             
                            </div>
                            <div className="col-md-12 col-sm-12 hide-on-print">
                                Additional Text: 
                            </div>
                            <div className="col-md-9 col-sm-9">
                                {props.medicalCertificateTextData.mc_text_old}
                            </div>
                            <div className="col-md-3 col-sm-3">
                                <Button className="btn text-btn green" disabled={ props.submitted || props.isInsertDone ? true : false }  onClick={ props.editTextShowHandle }>Edit</Button>
                            </div>
                            <div className="col-md-12 col-sm-12">
                             
                            </div>
                            <div className="col-md-6 col-sm-6">
                                Date: <span className="inline-date"><DatePickerData
                                        name = "certificate_date"
                                        className = "text-border-hide-on-print"
                                        selectedValue={props.medicalCertificateTextData.certificate_date}
                                        onChange={props.handleChange}
                                    /></span>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-6">
                                Name of Doctor: Dr. {props.userInfo.user_firstname} {props.userInfo.user_lastname}
                                <br/>Signature & Seal:
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  
}