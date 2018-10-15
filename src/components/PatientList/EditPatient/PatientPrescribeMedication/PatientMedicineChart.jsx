import React from "react";
import {Button, Modal} from 'react-bootstrap';
import Select from 'react-select';

export class PatientMedicineChart extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleClose = this.handleClose.bind(this);
  }

handleClose() {
  this.props.patientMedicineChartHideHandle();
}
render() {
        return (
          <div>
            <Modal show={this.props.patientMedicineChart} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Medicine Chart</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <div className="row">
                  <div className="table-responsive col-md-12">
                      <table className="table table-bordered responsive">
                          <thead>
                              <tr>
                                  <th>S.No.</th>
                                  <th>Medicine Name</th>
                                  <th>Start Date</th>
                                  <th>End Date</th>
                                  <th>Dose</th>
                                  <th>Route</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td>1.</td>
                                  <td>Aceclofenac</td>
                                  <td>14/01/16</td>
                                  <td>--</td>
                                  <td>100 mg</td>
                                  <td>PO</td>
                              </tr>
                              <tr>
                                  <td>2.</td>
                                  <td>Asprin</td>
                                  <td>04/08/13</td>
                                  <td>--</td>
                                  <td>100 mg</td>
                                  <td>PO</td>
                              </tr>
                              <tr>
                                  <td>3.</td>
                                  <td>Chlorzoxazone</td>
                                  <td>13/12/10</td>
                                  <td>--</td>
                                  <td>100 mg</td>
                                  <td>PO</td>
                              </tr>
                              <tr>
                                  <td>4.</td>
                                  <td>Acetaminophen</td>
                                  <td>12/02/14</td>
                                  <td>--</td>
                                  <td>100 mg</td>
                                  <td>PO</td>
                              </tr>
                              <tr>
                                  <td>5.</td>
                                  <td>Aceclofenac</td>
                                  <td>22/01/12</td>
                                  <td>20/12/19</td>
                                  <td>100 mg</td>
                                  <td>PO</td>
                              </tr>
                              <tr>
                                  <td>6.</td>
                                  <td>Aceclofenac</td>
                                  <td>22/01/12</td>
                                  <td>20/12/19</td>
                                  <td>100 mg</td>
                                  <td>PO</td>
                              </tr>
                              <tr>
                                  <td>7.</td>
                                  <td>Aceclofenac</td>
                                  <td>22/01/12</td>
                                  <td>20/12/19</td>
                                  <td>100 mg</td>
                                  <td>PO</td>
                              </tr>
                              <tr>
                                  <td>8.</td>
                                  <td>Aceclofenac</td>
                                  <td>22/01/12</td>
                                  <td>20/12/19</td>
                                  <td>100 mg</td>
                                  <td>PO</td>
                              </tr>
                              <tr>
                                  <td>9.</td>
                                  <td>Aceclofenac</td>
                                  <td>22/01/12</td>
                                  <td>20/12/19</td>
                                  <td>100 mg</td>
                                  <td>PO</td>
                              </tr>
                              <tr>
                                  <td>10.</td>
                                  <td>Aceclofenac</td>
                                  <td>22/01/12</td>
                                  <td>20/12/19</td>
                                  <td>100 mg</td>
                                  <td>PO</td>
                              </tr>
                          </tbody>
                      </table>
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
