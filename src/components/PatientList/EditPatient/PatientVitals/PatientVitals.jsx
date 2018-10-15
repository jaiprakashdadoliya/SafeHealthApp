import React from "react";

export const PatientVitals = (props) => {
  return(
    <div>
        <h4>Vitals</h4>
        <div className="row">
            <div className="col-md-4">
                <div className="form-group">
                    <input type="text" className="form-control" />
                    <label className="control-label">Weight (kg)</label>
                </div>
            </div>
            <div className="col-md-4">
                <div className="form-group">
                    <input type="text" className="form-control" />
                    <label className="control-label">Pulse (/min)</label>
                </div>
            </div>
            <div className="col-md-4">
                <div className="form-group">
                    <input type="text" className="form-control" />
                    <label className="control-label">BP Sys (mmHg)</label>
                </div>
            </div>
            <div className="col-md-4">
                <div className="form-group">
                    <input type="text" className="form-control" />
                    <label className="control-label">BP Dia (mmHg)</label>
                </div>
            </div>
            <div className="col-md-4">
                <div className="form-group">
                    <input type="text" className="form-control" />
                    <label className="control-label">SpO2 (%)</label>
                </div>
            </div>
            <div className="col-md-4">
                <div className="form-group">
                    <input type="text" className="form-control" />
                    <label className="control-label">Respiratory Rate (/min)</label>
                </div>
            </div>
            <div className="col-md-12 text-right">
                <button className="btn text-btn green">Save</button>
            </div>
        </div>
    </div>
  );
}
