import React from "react";
import { Link } from 'react-router-dom';
import {Button, Modal, Tabs, Nav, Tab, NavDropdown, MenuItem} from 'react-bootstrap';
import {Login} from './Login';
import {Register} from './Register';
import {SearchContainer} from '../Search';

export const WebsiteHeader = (props) => {
      let menu = '';
      let search = '';
      if(props.search){
        search = (
                  <SearchContainer 
                    showOnlySearch = {true}
                  />
                 )
      }
      if(!props.is_error){
        if(props.authenticated){
        menu = (<div>
                <div className="front-logo col-md-6">
                  <a href="javascript:void(0);" onClick={props.backToHome}> 
                    <img src={require("../../assets/images/front-end-logo.png")}/><br/>
                  </a>
                  {search}
                </div>
                <div className="topbar-menu col-md-6 text-right">
                  <ul>
                    <li><a href="javascript:void(0);" onClick={props.viewProfile}>My account</a></li>
                    <li><a href="javascript:void(0);" onClick={props.handleLogout}>Sign Out</a></li>
                  </ul>
                </div>
               </div>);
      }else{
        menu = (<div>
                  <div className="front-logo col-md-6">
                    <a href="javascript:void(0);" onClick={props.backToHome}> 
                      <img src={require("../../assets/images/front-end-logo.png")}/><br/>
                    </a>
                    {search}
                  </div>
                  <div className="topbar-menu col-md-6 text-right">
                    <ul>
                      <li><a href="javascript:void(0);" onClick={props.loginShowHandle}>Sign In</a></li>
                      <li><a href="javascript:void(0);" onClick={props.registerPatientShowHandle}>Sign Up</a></li>
                    </ul>
                  </div>
                </div>
                );
      }
    }else{
        menu = (<div>
                  <div className="front-logo col-md-6">
                    <a href="javascript:void(0);" onClick={props.backToHome}> 
                      <img src={require("../../assets/images/front-end-logo.png")}/><br/>
                    </a>
                  </div>
                  <div className="topbar-menu col-md-6 text-right">
                    <ul>
                      <li><a href="/">Back to home</a></li>
                    </ul>
                  </div>
                </div>
                );
      }
      return (
        <div className="front-header">
        	{menu}
        <Login
          loginShow = {props.loginShow}
          loginHideHandle = {props.loginHideHandle}
          authenticated = {props.authenticated}
          openRegisterPopup = {props.openRegisterPopup}
        />
        <Register
          registerShow = {props.registerShow}
          user_type = {props.userType}
          registerHideHandle = {props.registerHideHandle}
          openLoginPopup = {props.openLoginPopup}
        />
        </div>
      );
  }
