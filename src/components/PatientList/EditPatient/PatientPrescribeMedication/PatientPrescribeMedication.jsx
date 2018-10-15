import React from "react";
import {PatientAddMedicine} from "./PatientAddMedicine";
import {PatientEditMedicine} from "./PatientEditMedicine";
import {PatientMedicineChart} from "./PatientMedicineChart";

export class PatientPrescribeMedication extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.patientAddMedicineShowHandle = this.patientAddMedicineShowHandle.bind(this);
    this.patientAddMedicineHideHandle = this.patientAddMedicineHideHandle.bind(this);
    this.patientEditMedicineShowHandle = this.patientEditMedicineShowHandle.bind(this);
    this.patientEditMedicineHideHandle = this.patientEditMedicineHideHandle.bind(this);
    this.patientMedicineChartShowHandle = this.patientMedicineChartShowHandle.bind(this);
    this.patientMedicineChartHideHandle = this.patientMedicineChartHideHandle.bind(this);

    this.state = {
      patientAddMedicine: false,
      patientEditMedicine: false
    };
  }

  patientAddMedicineShowHandle() {
    this.setState({ patientAddMedicine: true });
  }

  patientAddMedicineHideHandle() {
    this.setState({ patientAddMedicine: false });
  }

  patientEditMedicineShowHandle() {
    this.setState({ patientEditMedicine: true });
  }

  patientEditMedicineHideHandle() {
    this.setState({ patientEditMedicine: false });
  }
  patientMedicineChartShowHandle() {
    this.setState({ patientMedicineChart: true });
  }

  patientMedicineChartHideHandle() {
    this.setState({ patientMedicineChart: false });
  }
  render() {
        return (
    <div>
    <PatientAddMedicine
       patientAddMedicine = {this.state.patientAddMedicine}
       patientAddMedicineHideHandle = {this.patientAddMedicineHideHandle}
    />
    <PatientEditMedicine
       patientEditMedicine = {this.state.patientEditMedicine}
       patientEditMedicineHideHandle = {this.patientEditMedicineHideHandle}
    />
    <PatientMedicineChart
       patientMedicineChart = {this.state.patientMedicineChart}
       patientMedicineChartHideHandle = {this.patientMedicineChartHideHandle}
    />
        <h4>Prescribe Medication</h4>
        <div className="row">
            <div className="col-md-6">
                <div className="add-new-medicine">
                    <div className="replace-file" onClick={this.patientAddMedicineShowHandle}>
                        <span className="add-icon"></span> Add Medicine
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="medicine-chart text-right">
                    <button onClick={this.patientMedicineChartShowHandle} className="btn text-btn green">Medicine Chart</button>
                </div>
            </div>
        </div>
        <div className="medicine-detail">
            <div className="medicine-detail-heading">
                <div className="col-md-6">
                    <h5>Rifampin (Rifadin, Rimactane) - Tab</h5>
                </div>
                <div className="col-md-6 text-right">
                    <div className="discontinue-option">
                        <label><input type="checkbox" className="option-input checkbox"/><span>Discontinue</span></label>
                    </div>
                    <div className="header-action">
                        <a className="btn table-btn green" href="javascript:void(0);">Edit</a>
                        <a className="btn table-btn red" href="">Delete</a>
                    </div>
                </div>
            </div>
            <div className="medicine-details-inner">
                <div className="row">
                    <div className="col-md-2">
                        03 Weeks
                    </div>
                    <div className="col-md-2">
                        02 Tabs
                    </div>
                    <div className="col-md-3">
                        Twice in day
                    </div>
                    <div className="col-md-3">
                        Start Date: 01/03/2018
                    </div>
                    <div className="col-md-2">
                        <i className="fa fa-utensils"></i> Before Meal
                    </div>
                    <div className="col-md-12">
                        <strong>Instruction</strong>
                        <ul className="list-unstyled">
                            <li>Take with milk</li>
                            <li>Rest for 10hrs</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
}
