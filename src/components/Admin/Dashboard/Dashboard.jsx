import React from "react";
import {fontawesome, FontAwesomeIcon} from '../../../global';
import {TopMenu} from "../TopMenu"
import {SideMenu} from "../SideMenu"
import {faMobileAlt, faUser, faTint, faIdCard } from '@fortawesome/fontawesome-free-solid';
import Loadable from 'react-loadable'; 
import { Loading } from '../../../global';

const HeaderContainer = Loadable({
    loader: () => import('../../Header' /* webpackChunkName = "HeaderContainer" */).then(object => object.HeaderContainer),
    loading: Loading
});

export class Dashboard extends React.Component {
    constructor(props, context) {
        super(props, context);
      }
    render() {
        return (
          <div className="page-container">
            <SideMenu />
            <div className="main-content right-sidebar-remove">
              <HeaderContainer />
              <div className="dashboard">
                  <div className="col-md-3">
                      <div className="tile-stats tile-red">
                          <div className="icon">
                              <i className="fa fa-5x fa-user-md"></i>
                          </div>
                          <div className="num">83</div>
                          <h3>Registered Doctors</h3>
                          <p>Total registered doctors in <stron>ILD India Registry</stron></p>
                      </div>
                  </div>
                  <div className="col-md-3">
                      <div className="tile-stats tile-blue">
                          <div className="icon">
                              <i className="fa fa-5x fa-users"></i>
                          </div>
                          <div className="num">102</div>
                          <h3>Registered Patients</h3>
                          <p>Total registered patients in <stron>ILD India Registry</stron></p>
                      </div>
                  </div>
                  <div className="col-md-3">
                      <div className="tile-stats green">
                          <div className="icon">
                              <i className="fa fa-5x fa-thumbs-up"></i>
                          </div>
                          <div className="num">56</div>
                          <h3>Approved</h3>
                          <p>Total approved patients in <stron>ILD India Registry</stron></p>
                      </div>
                  </div>
                  <div className="col-md-3">
                      <div className="tile-stats tile-aqua">
                          <div className="icon">
                              <i className="fa fa-5x fa-exclamation-circle"></i>
                          </div>
                          <div className="num">46</div>
                          <h3>Pending</h3>
                          <p>Total pending patients in <stron>ILD India Registry</stron></p>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        );
    }
}
