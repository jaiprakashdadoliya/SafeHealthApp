import React from "react";
import {fontawesome, FontAwesomeIcon} from '../../../global';
import {faMobileAlt, faUser, faTint, faPlus } from '@fortawesome/fontawesome-free-solid';

import Datetime from "react-datetime";
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

export const Diagnosis = (props) => {
    return (
        <div>
            <div className="clearfix"></div>
            <p>Any new condition diagnosed subsequent to initial diagnosis made by siteinvestigator based on clinical judgment at baseline after enrolling in registry</p>
            <div className="clearfix"></div>
            <div className="divTable">
              <div className="divTableHeading">
                <div className="divTableRow">
                  <div className="divTableHead">&nbsp;</div>
                  <div className="divTableHead">Date of Diagnosis</div>
                </div>
              </div>
              <div className="divTableBody">
                {
                    props.diagnosisFormData.map( (diagnosis, index) =>{
                      let dateOfDiagnose = 'date_of_diagnosis_'+diagnosis.disease_id;
                      return( 
                          <div className="divTableRow" key={index}>
                            <div className="divTableCell">
                              {  
                                  diagnosis.fectors.length > 0 ? <div className="divFectorTitleCell">{diagnosis.disease_name}</div> : diagnosis.disease_name
                              }
                              {
                                      diagnosis.fectors.length > 0 ?  diagnosis.fectors.map(fectorDetails => {
                                        if(fectorDetails.field_type === 'text'){
                                            return(
                                                <div className={diagnosis.disease_name == 'CTD' || diagnosis.disease_name == 'Pulmonary hypertension: 2D ECHO' ? 'col-md-3 rpl' : 'col-md-3'} key={'div_'+fectorDetails.id}>
                                                    <div className="form-group">
                                                      <input type="text" className="form-control" name={fectorDetails.name} onChange={props.handleInputChange} value={props.state[fectorDetails.name]} />
                                                      <label className="control-label">{fectorDetails.fector_title}</label>
                                                    </div>
                                                </div>
                                            
                                          )
                                        }else if(fectorDetails.field_type === 'checkbox'){
                                          return(
                                              <div className={diagnosis.disease_name != 'GERD' ? 'col-md-3' : ''} key={'div_'+fectorDetails.id}>
                                                <div className="form-group">
                                                  <div className="checkbox-section">
                                                      {  
                                                        <label key={fectorDetails.id}>
                                                            <CheckboxGroup
                                                                checkboxDepth={2} 
                                                                name={fectorDetails.name}
                                                                value={props.state[fectorDetails.name]}
                                                                onChange={(value, name) => props.onCheckBoxValueChanged(value, fectorDetails.name)} >                                       
                                                                {
                                                                  fectorDetails.options.map(checkOptions => {
                                                                      return (
                                                                          <label key={'sd'+checkOptions.id}><Checkbox className="option-input checkbox" value={checkOptions.id} /><span>{checkOptions.value}</span></label>
                                                                      )
                                                                  }) 
                                                                }
                                                            </CheckboxGroup>
                                                        </label>
                                                      }
                                                  </div>
                                                  <label className="control-label">{fectorDetails.fector_title}</label>
                                                </div>
                                              </div>
                                          )
                                        }
                                              
                                      }) : ''
                                    }
                                    </div>
                                    <div className="divTableCell">
                                        <Datetime key={"date_of_diagnosis_"+diagnosis.disease_id} 
                                            name={dateOfDiagnose}
                                            value={props.state[dateOfDiagnose ]}
                                            selected={moment(dateOfDiagnose)}
                                            onChange={(selected, name) => props.handleChangeDate(selected, dateOfDiagnose)}
                                            dateFormat="DD/MM/YYYY"
                                            timeFormat={false}
                                            closeOnSelect={true}
                                            inputProps={{readOnly:true}}
                                            className="date-input"
                                        />
                                    </div>
                                </div>
                            );
                          })
                      }
                    </div>
                  </div>
        </div>
    );

}
