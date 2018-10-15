import React from "react";
import {Button, Alert, bsStyle,Modal} from 'react-bootstrap';
import Select from 'react-select';
import { utilityHelper } from '../../../_helpers';
import {FxForm} from '../../../_packages/fx-form';
import { PatientAlertMessage } from '../../../global';
import { configConstants} from '../../../_constants';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

export const NextVisitSchedule = (props) => {  
  return (
    <div>
        <h3 className='equal-margin' >Next Visit Schedule</h3>
        <div className="col-md-12" id='next-visit-top'>
            <PatientAlertMessage 
              errorMsg      = {props.errorMsg}
              isUpdateDone  = {props.isInsertDone}
              successMessage= {props.successMsg}
            />
        </div> 

        {
            props.user_type == configConstants.USER_TYPE_DOCTOR && 
            <div className="row">
                <div className="col-md-10">
                        <FxForm
                            config={props.formConfig}
                            ref={(form) => {
                                props.handleBoundFormUpdate(form);
                            }}
                        />
                </div>
                <div className="col-md-2 margin-top-25">
                    <button onClick={props.submitNextVisitSchedule} disabled={(props.submitted) && !props.errorMessage && !props.successMsg ? true : false} className="btn text-btn green">{(props.submitted) && !props.errorMessage && !props.successMsg ? 'Sending..' : 'Save'}</button>
                    
                </div>
                <div className="col-md-10"> 
                   {Object.keys(props.nextVisitSchedule).length > 0 &&  <div className="col-md-12">Your next booking schedule is <strong>{utilityHelper.changeDateFormat(props.nextVisitSchedule.booking_date)}, {utilityHelper.changeTimingFormat(props.nextVisitSchedule.booking_time)}</strong></div>}
                </div> 
            </div>
        }

        {
            props.user_type == configConstants.USER_TYPE_PATIENT && 
                
                <div className="col-md-10"> 
                   {Object.keys(props.nextVisitSchedule).length > 0 ?  <div className="col-md-12">Your next booking schedule is <strong>{utilityHelper.changeDateFormat(props.nextVisitSchedule.booking_date)}, {utilityHelper.changeTimingFormat(props.nextVisitSchedule.booking_time)}</strong></div> : <div>Next booking not booked </div>}
                </div> 
        }
    </div>
  );
}
