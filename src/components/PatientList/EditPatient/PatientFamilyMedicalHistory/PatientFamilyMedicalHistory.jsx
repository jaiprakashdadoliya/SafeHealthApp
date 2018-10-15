import React from "react";
import { dataConstants,configConstants } from '../../../../_constants';
import { PatientAlertMessage } from '../../../../global';
import {Button, Alert, bsStyle} from 'react-bootstrap';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
export const PatientFamilyMedicalHistory = (props) => {
    var diseaseTypeShow = false;
  return(
<div>
 
    <div className="row" id="familyMedicalTitle">
        <div className="col-md-6">
          <h3>Family medical history (biological)</h3>
        </div>
        <div className="col-md-6 text-right">
          <button className="btn text-btn green" disabled={props.submitted ? true : false} onClick={props.submitFamilyMedicalStatus}>{props.submitted ? configConstants.BUTTON_PLEASE_WAIT : configConstants.SAVE_BUTTON}</button>
        </div>
    </div>
    <PatientAlertMessage 
        errorMsg = {props.errorMsg}
        isUpdateDone = {props.isUpdateDone}
        successMessage = {props.successMessage}
    />
  <div className="table-responsive">
        <div className="divTable">
            <div className="divTableHeading">
                <div className="divTableRow">
                    <div className="divTableHead">Disease Name</div>
                    <div className="divTableHead">Yes/No</div>
                    <div className="divTableHead">Relation</div>
                </div>
            </div>
            <div className="divTableBody">
                {
                  props.patientFamilyMedicalData.record.map( rowDisease => {
                    let diseaseId = rowDisease.disease_id;
                    let diseaseName = rowDisease.disease_name;
                    let familyRelationId = rowDisease.family_relation_id;
                    let diseaseType = rowDisease.disease_type;
                    let messsageString = '';
                    if(diseaseType !== dataConstants.IS_SHOW_IN_TYPE_FAMILY_MEDICAL_HISTORY_PART_1) {
                        return null;
                    }
                      return(<React.Fragment key={diseaseId}>
                                    {messsageString}
                                   <div className="divTableRow" >
                                    <div className="divTableCell">{diseaseName}</div>
                                    <div className="divTableCell">
                                        <CheckboxGroup
                                          checkboxDepth={2} // This is needed to optimize the checkbox group
                                          name={diseaseId}
                                          value={props.state[diseaseId]} 
                                          onChange={(value, name) => props.handleCheckboxChange(value, diseaseId)} >
                                   
                                          {
                                              props.patientFamilyMedicalData.yes_no_option.map(checkOptions => {
                                                  return (
                                                      <label key={'sd'+checkOptions.id}><Checkbox className="option-input checkbox" value={checkOptions.id} /><span>{checkOptions.value}</span></label>
                                                  )
                                              }) 
                                          }
                                        </CheckboxGroup>
                                    
                                    </div>
                                    <div className="divTableCell">
                                        <CheckboxGroup
                                          checkboxDepth={2} // This is needed to optimize the checkbox group
                                          name={familyRelationId}
                                          value={props.state[familyRelationId]} 
                                          onChange={(value, name) => props.handleCheckboxChangeAll(value, familyRelationId)} >
                                   
                                          {
                                              props.patientFamilyMedicalData.family_relation_option.map(checkOptions => {
                                                  return (
                                                      <label key={'sd'+checkOptions.id}><Checkbox className="option-input checkbox" value={checkOptions.id} /><span>{checkOptions.value}</span></label>
                                                  )
                                              }) 
                                          }
                                        </CheckboxGroup>
                                    </div>
                                </div>
                            </React.Fragment>
                            );
                    })
                }
                <div className="divTableRow">
                    <div className="divTableCell colspan">
                        <div>
                            <div>
                                <strong>Rheumatologic disease/collagen vascular disease</strong>
                            </div>
                        </div>
                    </div>
                </div>
                {
                  props.patientFamilyMedicalData.record.map( rowDisease => {
                    let diseaseId = rowDisease.disease_id;
                    let diseaseName = rowDisease.disease_name;
                    let familyRelationId = rowDisease.family_relation_id;
                    let diseaseType = rowDisease.disease_type;
                    let messsageString = '';
                    if(diseaseType !== dataConstants.IS_SHOW_IN_TYPE_FAMILY_MEDICAL_HISTORY_PART_2) {
                        return null;
                    }
                      return(<React.Fragment key={diseaseId}>
                                    {messsageString}
                                   <div className="divTableRow" >
                                    <div className="divTableCell">{diseaseName}</div>
                                    <div className="divTableCell">
                                        <CheckboxGroup
                                          checkboxDepth={2} // This is needed to optimize the checkbox group
                                          name={diseaseId}
                                          value={props.state[diseaseId]} 
                                          onChange={(value, name) => props.handleCheckboxChange(value, diseaseId)} >
                                   
                                          {
                                              props.patientFamilyMedicalData.yes_no_option.map(checkOptions => {
                                                  return (
                                                      <label key={'sd'+checkOptions.id}><Checkbox className="option-input checkbox" value={checkOptions.id} /><span>{checkOptions.value}</span></label>
                                                  )
                                              }) 
                                          }
                                        </CheckboxGroup>
                                    
                                    </div>
                                    <div className="divTableCell">
                                        <CheckboxGroup
                                          checkboxDepth={2} // This is needed to optimize the checkbox group
                                          name={familyRelationId}
                                          value={props.state[familyRelationId]} 
                                          onChange={(value, name) => props.handleCheckboxChangeAll(value, familyRelationId)} >
                                   
                                          {
                                              props.patientFamilyMedicalData.family_relation_option.map(checkOptions => {
                                                  return (
                                                      <label key={'sd'+checkOptions.id}><Checkbox className="option-input checkbox" value={checkOptions.id} /><span>{checkOptions.value}</span></label>
                                                  )
                                              }) 
                                          }
                                        </CheckboxGroup>
                                    </div>
                                </div>
                            </React.Fragment>
                            );
                    })
                }

                {
                  props.patientFamilyMedicalData.record.map( rowDisease => {
                    let diseaseId = rowDisease.disease_id;
                    let diseaseName = rowDisease.disease_name;
                    let familyRelationId = rowDisease.family_relation_id;
                    let diseaseType = rowDisease.disease_type;
                    let messsageString = '';
                    if(diseaseType !== dataConstants.IS_SHOW_IN_TYPE_FAMILY_MEDICAL_HISTORY_PART_3) {
                        return null;
                    }
                      return(<React.Fragment key={diseaseId}>
                                    {messsageString}
                                   <div className="divTableRow" >
                                    <div className="divTableCell">{diseaseName}</div>
                                    <div className="divTableCell"><div className="add-min-width-120"></div></div>
                                    <div className="divTableCell">
                                    <input type="text" className="form-control" name={diseaseId} value={props.state[diseaseId]} onChange={props.handleInputChange} />
                                    
                                    </div>
                                </div>
                            </React.Fragment>
                            );
                    })
                }
            </div>
        </div>
    </div>
    <div className="clearfix">&nbsp;</div>
    <div className="row">
        <div className="col-md-12 text-right">
          <button className="btn text-btn green" disabled={props.submitted ? true : false} onClick={props.submitFamilyMedicalStatus}>{props.submitted ? configConstants.BUTTON_PLEASE_WAIT : configConstants.SAVE_BUTTON}</button>
        </div>
    </div>
    <PatientAlertMessage 
        errorMsg = {props.errorMsg}
        isUpdateDone = {props.isUpdateDone}
        successMessage = {props.successMessage}
    />
</div>

  );
}
