import React from "react";
import { Link } from 'react-router-dom';
import {Button, Modal, Tabs, Nav, Tab, NavDropdown, MenuItem} from 'react-bootstrap';
export const TopMenu = (props) => {
      return (

        <div className="top-menu admin">
                <div className="col-md-6 col-sm-6">
                    <div className="logo">

                    </div>
                </div>
                <div className="col-md-6 col-sm-6">
              <Nav pullRight className="user-info">
                  <NavDropdown className="profile-info" eventKey={1}
                      title={
                          <div>
                              <img className="img-circle"
                                  src={require("../../../assets/images/10.jpg")}
                                  alt="Doctor Photo"
                              />
                              Dr. R.S. Joshi
                          </div>
                      }

                      id="doctor-profile-menu">
                      <li><Link to={'/doctorprofile'}>View Profile</Link></li>
                      <MenuItem eventKey={1.3} onClick={props.handleLogut}>Logout</MenuItem>
                  </NavDropdown>
          </Nav>
          </div>
        </div>
        
      );
    }
