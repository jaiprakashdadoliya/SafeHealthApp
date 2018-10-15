import React from "react";
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export const PatientNextVisitSchedule = (props) => {
  return(
    <div>
        <h4>Next Visit Schedule</h4>
        <div className="row">
            <div className="col-md-3">
                <div className="form-group">
                    <input type="text" className="form-control datepicker" id="apc_date" />
                    <label className="control-label">Appointment Date</label>
                </div>
            </div>
            <div className="col-md-3">
                <div className="form-group">
                    <Select
                        className="custom-select"
                        options={[
                        { value: '1', label: '11:00 AM'},
                        { value: '1', label: '12:00 PM'},
                        { value: '1', label: '01:00 PM'},
                        { value: '1', label: '02:00 PM'},
                        { value: '1', label: '03:00 PM'},
                        { value: '1', label: '04:00 PM'}
                        ]}
                    />
                    <label className="control-label">Appointment Time</label>
                </div>
            </div>
            <div className="col-md-3">
                <button className="btn text-btn green margin-top-25">Save</button>
            </div>
        </div>
    </div>
  );
}
