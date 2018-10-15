import React from "react";
import { Link } from 'react-router-dom';
import {Button, Modal, Alert, bsStyle } from 'react-bootstrap';
import {LoginContainer} from '../../Login';
/**
 * Login
 *
 * @package                SafeHealth
 * @subpackage             Login
 * @category               Presentational Component
 * @DateOfCreation         09 May 2018
 * @ShortDescription       This component is reponsible to show the login form
 */
export const Login = (props) => {
    let content = '';
      content = (<LoginContainer 
          popup = {true}
          loginHideHandle = {props.loginHideHandle}
          openRegisterPopup = {props.openRegisterPopup}
      />);
    return (
         <div>
            <Modal show={props.loginShow} onHide={props.loginHideHandle} backdrop="static" keyboard={false} className="login-popup">
              <Modal.Header closeButton>
              </Modal.Header>
              <Modal.Body>
               <div className="row">
                   {content}
                </div>
              </Modal.Body>
            </Modal>
          </div>
    );
}
