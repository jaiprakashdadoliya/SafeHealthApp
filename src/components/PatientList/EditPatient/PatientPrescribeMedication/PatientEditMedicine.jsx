import React from "react";
import {Button, Modal} from 'react-bootstrap';
import Select from 'react-select';

export class PatientEditMedicine extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleClose = this.handleClose.bind(this);
  }

handleClose() {
  this.props.patientEditMedicineHideHandle();
}
render() {
        return (
          <div>
            <Modal show={this.props.patientEditMedicine} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Medicine</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <div className="row">
                  <div className="col-md-12">
                      <div className="form-group">
                          <Select
                              className="custom-select"
                              options={[
                              { value: '1', label: 'Select'},
                              { value: '1', label: 'Prednisone'},
                              { value: '1', label: 'Methotrexate'},
                              { value: '1', label: 'Rituximab'},
                              { value: '1', label: 'NAC'},
                              { value: '1', label: 'Pirfenidone'},
                              { value: '1', label: 'Antacids'},
                              { value: '1', label: 'H2 receptor antagonist'},
                              { value: '1', label: 'ERA'},
                              { value: '1', label: 'Azathioprine'},
                              { value: '1', label: 'Cyclophosphamide'},
                              { value: '1', label: 'Hydroxycholoroquine'},
                              { value: '1', label: 'Mycophenolate'},
                              { value: '1', label: 'Nintedanib'},
                              { value: '1', label: 'PPI'},
                              { value: '1', label: 'Sildenafil'},
                              { value: '1', label: 'Calcium channel blockers'}
                              ]}
                          />
                          <lable className="control-label">Select Medicine</lable>
                      </div>
                  </div>
                  <div className="col-md-6">
                      <div className="form-group">
                          <span className="inline"><input type="text" className="form-control" /></span>
                          <span className="inline">
                              <Select
                                  className="custom-select"
                                  optoins={[
                                  { value: '1', label: 'Select'},
                                  { value: '1', label: 'day(s)'},
                                  { value: '1', label: 'week(s)'},
                                  { value: '1', label: 'month(s)'}
                                  ]}
                              />
                          </span>
                          <lable className="control-label">Duration</lable>
                      </div>
                  </div>
                  <div className="col-md-6">
                      <div className="form-group">
                          <Select
                              className="custom-select"
                              options={[
                              { value: '1', label: 'Select'},
                              { value: '1', label: 'Ones in a day'},
                              { value: '1', label: 'selected>Twice in a day'},
                              { value: '1', label: 'Thrice in a day'},
                              { value: '1', label: 'Feerly as needed'}
                              ]}
                          />
                          <lable className="control-label">Frequency</lable>
                      </div>
                  </div>
                  <div className="clearfix"></div>
                  <div className="col-md-3">
                      <div className="form-group">
                          <input type="text" className="form-control" />
                          <lable className="control-label">Qty (8:00 AM)</lable>
                      </div>
                  </div>
                  <div className="col-md-3">
                      <div className="form-group">
                          <input type="text" className="form-control" />
                          <lable className="control-label">Qty (8:00 PM)</lable>
                      </div>
                  </div>
                  <div className="col-md-3">
                      <div className="form-group">
                          <Select
                              className="custom-select"
                              options={[
                              {value: '1', label: 'Select'},
                              {value: '1', label: 'mg'},
                              {value: '1', label: 'ml'},
                              {value: '1', label: 'gm'}
                              ]}
                          />
                          <lable className="control-label">Unit</lable>
                      </div>
                  </div>
                  <div className="col-md-3">
                      <div className="form-group">
                          <input type="text" className="form-control datepicker" />
                          <lable className="control-label">Start Date</lable>
                      </div>
                  </div>
                  <div className="col-md-8">
                      <div className="checkbox-section">
                          <label><input type="checkbox" className="option-input"/><span>Before Meal</span></label>
                          <label><input type="checkbox" className="option-input"/><span>After Meal</span></label>
                      </div>
                  </div>
                  <div className="clearfix">
                      <div className="form-group"></div>
                  </div>
                  <div className="col-md-12">
                      <div className="form-group">
                          <input type="text" className="form-control" />
                          <lable className="control-label">Instructions</lable>
                      </div>
                  </div>
              </div>
              </Modal.Body>
              <Modal.Footer>
                <Button className="btn text-btn red" onClick={this.handleClose}>Close</Button>
                <Button className="btn text-btn green">Save</Button>
              </Modal.Footer>
            </Modal>
          </div>
  );
}
}
