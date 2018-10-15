import React from "react";
import {TopMenu} from "../TopMenu"
import {SideMenu} from "../SideMenu"

export class Analytics extends React.Component {
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
                          <div className="col-md-6 col-sm-6">
                              <h2 className="margin-bottom-20">Analytics</h2>
                          </div>
                      </div>
                      <div className="row">
                          <div className="col-md-4 select-outer">
                              <div className="form-group">
                                  <select name="test" className="form-control selectboxit" data-first-option="true">
                                      <option>Select</option>
                                      <option>Tuberculosis</option>
                                      <option>Extra pulmonary tuberculosis</option>
                                      <option>Hypertension</option>
                                      <option>Diabetes</option>
                                      <option>Coronary heart disease</option>
                                      <option>Heart failure</option>
                                      <option>Thyroid disease</option>
                                      <option>Stroke(CVA)</option>
                                      <option>Seizure</option>
                                      <option>Hepatitis A/B/C</option>
                                      <option>Kidney disease</option>
                                      <option>Anemia</option>
                                      <option>Eye Inflammation</option>
                                      <option>Asthma</option>
                                      <option>Bronchitis</option>
                                      <option>Sinus Disease</option>
                                      <option>Pulmonary hypertension</option>
                                      <option>Pulmonary embolism</option>
                                      <option>Sleep apnoea</option>
                                      <option>Lung cancer</option>
                                      <option>GERD</option>
                                      <option>Hiatal Hernia</option>
                                      <option>Bleeding Disorder</option>
                                      <option>Raynaud’s Phenomenon</option>
                                      <option>Rheumatoid arthritis</option>
                                      <option>Lupus</option>
                                      <option>Scleroderma</option>
                                      <option>Mixed connective tissue disease</option>
                                      <option>Sjogren’s syndrome</option>
                                      <option>Wegener's</option>
                                      <option>Polymyositis or dermatomyositis</option>
                                      <option>Bechet’s disease</option>
                                      <option>Ankylosing spondylitis</option>
                                  </select>
                                  <label className="control-label">Select Disease</label>
                              </div>
                          </div>
                          <div className="col-md-4">
                              <div className="form-group">
                                  <select name="test" className="form-control selectboxit" data-first-option="true">
                                      <option>Select</option>
                                      <option>Chronic cough</option>
                                      <option>Dry cough</option>
                                      <option>Fatigue or inability to exercise</option>
                                      <option>Shortness of breath</option>
                                      <option>Fast breathing</option>
                                      <option>Deformity of nails</option>
                                      <option>Weight loss</option>
                                  </select>
                                  <label className="control-label">Select symptom</label>
                              </div>
                          </div>
                          <div className="col-md-4">
                              <div className="form-group">
                                  <select name="test" className="form-control selectboxit" data-first-option="true">
                                      <option>Select</option>
                                      <option>Weight loss</option>
                                      <option>Difficulty in swallowing</option>
                                      <option>Dry eyes or dry mouth</option>
                                      <option>Rash or Changes in skin</option>
                                      <option>Oedema on legs</option>
                                      <option>Blood in urine</option>
                                      <option>Bruising skin</option>
                                      <option>Hand ulcers</option>
                                      <option>Mouth ulcers</option>
                                      <option>Chest Pain</option>
                                      <option>Joint Pain</option>
                                  </select>
                                  <label className="control-label">Has the patient noticed </label>
                              </div>
                          </div>
                          <div className="col-md-4">
                              <div className="form-group">
                                  <select name="test" className="form-control selectboxit" data-first-option="true">
                                      <option>Select</option>
                                      <option>Dusts (visible)</option>
                                      <option>Molds (Visible)</option>
                                      <option>Air Conditioner</option>
                                      <option>Cooler</option>
                                      <option>Birds in home (Caged) (Include piegenos, Parrot, hen, crow mourning dove )</option>
                                      <option>Any changes in house/housing condition in recent past</option>
                                      <option>How many days, months, or years before the cough and/or breathing/chest problems</option>
                                      <option>Open cooking on fire wood or cow dung</option>
                                      <option>Cooking on kerosene stove</option>
                                      <option>Cooking on coal</option>
                                      <option>Cooking with LPG gas</option>
                                      <option>Urban (District headquarter or higher)</option>
                                      <option>Sub urban (Tehsil HQ)</option>
                                      <option>Rural Village (Panchayat HQ or Lower)</option>
                                  </select>
                                  <label className="control-label">Domestic Environmental Factors</label>
                              </div>
                          </div>
                          <div className="col-md-4">
                              <div className="form-group">
                                  <select name="test" className="form-control selectboxit" data-first-option="true">
                                      <option>Select</option>
                                      <option>Tobacco</option>
                                      <option>Bidi</option>
                                      <option>Cigarette</option>
                                      <option>Hookah/Chillum</option>
                                      <option>Chewing tobacco</option>
                                      <option>Alcohol </option>
                                      <option>Ganja, Charas</option>
                                  </select>
                                  <label className="control-label">Social/Addiction</label>
                              </div>
                          </div>
                          <div className="col-md-2">
                              <button className="btn yellow text-btn form-inline-btn">Filter</button>
                          </div>
                          <div className="col-md-2 text-right">
                              <button className="btn green text-btn form-inline-btn">Export</button>
                          </div>
                      </div>
                      <div className="table-responsive">
                          <table className="table table-bordered">
                              <tbody className="clickable-row">
                                  <tr>
                                      <td width="200"><strong>Total</strong></td>
                                      <td>02</td>
                                  </tr>
                                  <tr>
                                      <td><strong>Male</strong></td>
                                      <td>02</td>
                                  </tr>
                                  <tr>
                                      <td><strong>Female</strong></td>
                                      <td>02</td>
                                  </tr>
                                  <tr>
                                      <td><strong>Age 0-25</strong></td>
                                      <td>02</td>
                                  </tr>
                                  <tr>
                                      <td><strong>Age 26-40</strong></td>
                                      <td>02</td>
                                  </tr>
                                  <tr>
                                      <td><strong>Age 41-60</strong></td>
                                      <td>02</td>
                                  </tr>
                                  <tr>
                                      <td><strong>Age 60 above</strong></td>
                                      <td>02</td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
            </div>
          </div>
          </div>
        );
    }
}
