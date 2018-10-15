/**
 * Register
 *
 * @package                SafeHealth
 * @subpackage             Register
 * @category               Presentational Component
 * @DateOfCreation         11 May 2018
 * @ShortDescription       This component is reponsible to render doctor registration form
 */

import React from "react";
import { Link } from 'react-router-dom';
import {Button, Modal, Alert, bsStyle } from 'react-bootstrap';
import Select from 'react-select';
import {RegisterContainer} from '../../Register';

export const Register = (props) => {
  return(
     <div>
            <Modal show={props.registerShow} onHide={props.registerHideHandle} backdrop="static" keyboard={false} className="registration-popup">
              <Modal.Header closeButton>
              </Modal.Header>
              <Modal.Body>
                <div className="row">
                    <RegisterContainer 
                        popup = {true}
                        user_type = {props.user_type}
                        registerHideHandle = {props.registerHideHandle}
                        openLoginPopup = {props.openLoginPopup}
                    />
                </div>
              </Modal.Body>
            </Modal>
          </div>   
  );
}
