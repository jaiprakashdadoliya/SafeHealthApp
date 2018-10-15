import React from "react";
import {fontawesome, FontAwesomeIcon} from '../../../global';
import {TopMenu} from "../TopMenu"
import {SideMenu} from "../SideMenu"
import {faMobileAlt, faUser, faTint, faIdCard } from '@fortawesome/fontawesome-free-solid';

export class DoctorList extends React.Component {
    constructor(props, context) {
        super(props, context);
      }
    render() {
        return (
          <div className="page-container">
            <SideMenu />
            <div className="main-content right-sidebar-remove">
              <TopMenu />
              <div className="main-content">
              <div className="wrap-inner-content admin">
                  <div className="inner-content">
                      <div className="row">
                          <div className="col-md-10 col-sm-10">
                              <h2 className="margin-bottom-20">Doctor List</h2>
                          </div>
                          <div className="col-md-2 col-sm-2">
                              <select name="test" className="form-control selectboxit  margin-bottom-20" data-first-option="true">
                                  <option>All</option>
                                  <option>Approved</option>
                                  <option>Disapproved</option>
                              </select>
                          </div>
                      </div>
                      <table className="table table-bordered responsive">
                          <thead>
                              <tr>
                                  <th>Name</th>
                                  <th>Registration Number</th>
                                  <th>Mobile Number</th>
                                  <th>Email Address</th>
                                  <th>Locality</th>
                                  <th>Status</th>
                                  <th className="text-center">Action</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td>Dr. Rajesh Shukla</td>
                                  <td>235363</td>
                                  <td>+911234567890</td>
                                  <td>patientemail@email.com</td>
                                  <td>Vijay Nagar</td>
                                  <td><span className="approved">Approved</span></td>
                                  <td className="text-center">
                                      <a href="#" title="Edit Profile" className="btn green table-btn">Edit</a>
                                  </td>
                              </tr>
                              <tr>
                                  <td>Dr. Rajesh Shukla</td>
                                  <td>235363</td>
                                  <td>+911234567890</td>
                                  <td>patientemail@email.com</td>
                                  <td>Vijay Nagar</td>
                                  <td><span className="disapproved">Disapproved</span></td>
                                  <td className="text-center">
                                      <a href="#" title="Edit Profile" className="btn green table-btn">Edit</a>
                                  </td>
                              </tr>
                              <tr>
                                  <td>Dr. Rajesh Shukla</td>
                                  <td>235363</td>
                                  <td>+911234567890</td>
                                  <td>patientemail@email.com</td>
                                  <td>Vijay Nagar</td>
                                  <td><span className="disapproved">Disapproved</span></td>
                                  <td className="text-center">
                                      <a href="#" title="Edit Profile" className="btn green table-btn">Edit</a>
                                  </td>
                              </tr>
                              <tr>
                                  <td>Dr. Rajesh Shukla</td>
                                  <td>235363</td>
                                  <td>+911234567890</td>
                                  <td>patientemail@email.com</td>
                                  <td>Vijay Nagar</td>
                                  <td><span className="disapproved">Disapproved</span></td>
                                  <td className="text-center">
                                      <a href="#" title="Edit Profile" className="btn green table-btn">Edit</a>
                                  </td>
                              </tr>
                              <tr>
                                  <td>Dr. Rajesh Shukla</td>
                                  <td>235363</td>
                                  <td>+911234567890</td>
                                  <td>patientemail@email.com</td>
                                  <td>Vijay Nagar</td>
                                  <td><span className="approved">Approved</span></td>
                                  <td className="text-center">
                                      <a href="#" title="Edit Profile" className="btn green table-btn">Edit</a>
                                  </td>
                              </tr>
                              <tr>
                                  <td>Dr. Rajesh Shukla</td>
                                  <td>235363</td>
                                  <td>+911234567890</td>
                                  <td>patientemail@email.com</td>
                                  <td>Vijay Nagar</td>
                                  <td><span className="disapproved">Disapproved</span></td>
                                  <td className="text-center">
                                      <a href="#" title="Edit Profile" className="btn green table-btn">Edit</a>
                                  </td>
                              </tr>
                              <tr>
                                  <td>Dr. Rajesh Shukla</td>
                                  <td>235363</td>
                                  <td>+911234567890</td>
                                  <td>patientemail@email.com</td>
                                  <td>Vijay Nagar</td>
                                  <td><span className="approved">Approved</span></td>
                                  <td className="text-center">
                                      <a href="#" title="Edit Profile" className="btn green table-btn">Edit</a>
                                  </td>
                              </tr>
                              <tr>
                                  <td>Dr. Rajesh Shukla</td>
                                  <td>235363</td>
                                  <td>+911234567890</td>
                                  <td>patientemail@email.com</td>
                                  <td>Vijay Nagar</td>
                                  <td><span className="disapproved">Disapproved</span></td>
                                  <td className="text-center">
                                      <a href="#" title="Edit Profile" className="btn green table-btn">Edit</a>
                                  </td>
                              </tr>
                              <tr>
                                  <td>Dr. Rajesh Shukla</td>
                                  <td>235363</td>
                                  <td>+911234567890</td>
                                  <td>patientemail@email.com</td>
                                  <td>Vijay Nagar</td>
                                  <td><span className="approved">Approved</span></td>
                                  <td className="text-center">
                                      <a href="#" title="Edit Profile" className="btn green table-btn">Edit</a>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </div>
            </div>
          </div>
          </div>
        );
    }
}
