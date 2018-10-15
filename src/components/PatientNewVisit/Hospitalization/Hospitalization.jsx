import React from "react";
import Select from 'react-select';

import {fontawesome, FontAwesomeIcon} from '../../../global';
import {faMobileAlt, faUser, faTint, faPlus } from '@fortawesome/fontawesome-free-solid';
import {FxForm} from '../../../_packages/fx-form';
import { utilityHelper } from '../../../_helpers';

import Datetime from "react-datetime";
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

export const Hospitalization = (props) => {  
    return (
        <div>
            <div className="clearfix"></div>
            <h3 className="equal-margin mt-20">Changed the doctor</h3>
            <div className="row">
            <div className="form-group">
            <FxForm
                config={props.hospitalizationFormData}
                ref={(form) => {
                    props.handleBoundFormHispitalizationUpdate(form);
                }}
            />
            </div>
            </div>
            <div className="divTable">
                <div className="divTableHeading">
                    <div className="divTableRow">
                        <div className="divTableHead">Hospitalization</div>
                        <div className="divTableHead">Diagnosis</div>
                        <div className="divTableHead">Date</div>
                        <div className="divTableHead">Duration</div>
                    </div>
                </div>
              <div className="divTableBody">
                  {
                      props.hospitalizationTableFormData.length > 0 ?  props.hospitalizationTableFormData.map(tableFectorDetails => {
                          let durationUnitSelectData= 'hospitalization_duration_select'
                          let dateOfHospitalization = 'hospitalization_date_'+tableFectorDetails.hospitalization_fector_id
                          let diagnosisDetails      = 'hospitalization_diagnosis_details_'+tableFectorDetails.hospitalization_fector_id
                          let duration              = 'hospitalization_duration_'+tableFectorDetails.hospitalization_fector_id
                          let durationUnitKey       = 'hospitalization_duration_unit_'+tableFectorDetails.hospitalization_fector_id
                          let durationUnitValue     = 'hospitalization_duration_unit_value_'+tableFectorDetails.hospitalization_fector_id
                          return(

                              <div className="divTableRow" key={tableFectorDetails.hospitalization_fector_id}>
                                  <div className="divTableCell">{tableFectorDetails.hospitalization_fector_value}</div>
                                  <div className="divTableCell">
                                      <input type="text" className="form-control medium-size" name={'hospitalization_diagnosis_details_'+tableFectorDetails.hospitalization_fector_id} onChange={props.handleInputChange} value={props.state[diagnosisDetails]} />
                                  </div>
                                  <div className="divTableCell">
                                      <Datetime key={dateOfHospitalization} 
                                            name        = {dateOfHospitalization}
                                            value       = {props.state[dateOfHospitalization ]}
                                            selected    = {moment(dateOfHospitalization)}
                                            onChange    = {(selected, name) => props.handleChangeDate(selected, dateOfHospitalization)}
                                            dateFormat  = "DD/MM/YYYY"
                                            timeFormat  = {false}
                                            closeOnSelect = {true}
                                            inputProps={{readOnly:true}}
                                            className   = "date-input"
                                        />
                                  </div>
                                  <div className="divTableCell">
                                      <span className="inline">
                                          <input type="text" className="form-control medium-size" name={'hospitalization_duration_'+tableFectorDetails.hospitalization_fector_id} onChange={props.handleInputChange} value={props.state[duration]}/>
                                      </span>
                                      <span className="inline">
                                          <Select
                                              className = "custom-select"
                                              name      = {durationUnitValue}
                                              options   = {utilityHelper.getDataConvertToOptionType(tableFectorDetails[durationUnitKey], 'value', 'id')}
                                              value     = {props.state[durationUnitValue]}
                                              onChange  = {(value, name) => props.handleSelectChange(value, durationUnitValue)}
                                          />
                                      </span>
                                  </div>
                              </div>                              
                          )

                      }) : ''
                  }
              </div>
            </div>

            <div className="clearfix"></div>
            <h4>Reference: usual causes of hospitalization</h4>
            <div className="row">
                <FxForm
                    config={props.hospitalizationReferenceFormData}
                    ref={(form) => {
                        props.handleBoundFormHispitalizationReferance(form);
                    }}
                />
            </div>
            <hr/>
        </div>
    );
}