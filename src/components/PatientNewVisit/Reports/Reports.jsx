import React from "react";
import {fontawesome, FontAwesomeIcon} from '../../../global';
import {faMobileAlt, faUser, faTint, faPlus } from '@fortawesome/fontawesome-free-solid';

export class Medications extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <div>
                <h3>Reports</h3>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <input type="text" className="form-control" />
                      <label className="control-label">Report Name</label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <label className="btn-bs-file btn form-inline-btn text-btn yellow">
                      Browse File
                      <input type="file" />
                    </label>
                  </div>
                  <div className="col-md-5 text-right">
                    <button className="btn text-btn green form-inline-btn">
                      Save
                    </button>
                  </div>
                  <div className="col-md-12">
                    <table className="table table-bordered clearfix">
                      <thead>
                        <tr>
                          <th>Report Name</th>
                          <th>Upload Date & Time</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="capitalie">ECG</td>
                          <td>20/12/2017 02:30 PM</td>
                          <td>
                            <a href="" className="btn table-btn yellow">Download</a>
                            <a href="" className="btn table-btn red">Delete</a>
                          </td>
                        </tr>
                        <tr>
                          <td className="capitalie">ECG</td>
                          <td>20/12/2017 02:30 PM</td>
                          <td>
                            <a href="" className="btn table-btn yellow">Download</a>
                            <a href="" className="btn table-btn red">Delete</a>
                          </td>
                        </tr>
                        <tr>
                          <td className="capitalie">ECG</td>
                          <td>20/12/2017 02:30 PM</td>
                          <td>
                            <a href="" className="btn table-btn yellow">Download</a>
                            <a href="" className="btn table-btn red">Delete</a>
                          </td>
                        </tr>
                        <tr>
                          <td className="capitalie">ECG</td>
                          <td>20/12/2017 02:30 PM</td>
                          <td>
                            <a href="" className="btn table-btn yellow">Download</a>
                            <a href="" className="btn table-btn red">Delete</a>
                          </td>
                        </tr>
                        <tr>
                          <td className="capitalie">ECG</td>
                          <td>20/12/2017 02:30 PM</td>
                          <td>
                            <a href="" className="btn table-btn yellow">Download</a>
                            <a href="" className="btn table-btn red">Delete</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
            </div>
        );
    }
}
