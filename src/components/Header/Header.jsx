import React from "react";
import { Link } from 'react-router-dom';
import { Nav, NavDropdown, MenuItem} from 'react-bootstrap';
import { configConstants } from '../../_constants';
export const Header = (props) => {
      var prefix = (props.userType == configConstants.USER_TYPE_DOCTOR ? 'Dr' : '');
      var viewProfile = '';
      if(props.userType == configConstants.USER_TYPE_DOCTOR){
        viewProfile = (<li><Link to={'/doctorprofile'}>View Profile</Link></li>);
      }else if(props.userType == configConstants.USER_TYPE_PATIENT){
        viewProfile = (<li><Link to={'/dashboard'}>view Profile</Link></li>);
      }else{
        viewProfile = '';
      }
      return (
        <div className="clearfix top-menu">
            <div className="col-md-12 col-sm-12">
                <Nav pullRight className="user-info">
                    <NavDropdown className="profile-info" eventKey={1}
                        title={
                            <div>
                              <img className="img-circle"
                                  src={props.loggedInUserImage}
                                  alt="Doctor Photo"
                              />
                              {prefix} {props.loggedInUser}
                            </div>
                        }

                       id="doctor-profile-menu">
                       {viewProfile}
                       <li><Link to={'/changepassword'}>Change Password</Link></li>
                       <MenuItem eventKey={1.3} onClick={props.handleLogout}>Logout</MenuItem>
                    </NavDropdown>
                </Nav>
            </div>
        </div>
    );
}
