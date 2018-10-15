import React from "react";
import Select from 'react-select';

import {Button, Modal, Alert, bsStyle} from 'react-bootstrap';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import { utilityHelper } from '../../../../_helpers';
import { configConstants } from '../../../../_constants';
import { PatientAlertMessage } from '../../../../global';

export const PatientGeneralCheckup = (props) => {
    return(
        <div>
            <div className="row">
                <div className="col-md-6 col-sm-12">
                    <h3 id="generalCheckupTitle">Has the Patient Noticed?</h3>
                </div>
                {props.user_type != configConstants.USER_TYPE_PATIENT ?
                    <div className="col-md-6 col-sm-12 text-right">
                        <button onClick={props.handleSubmit} disabled={props.submitted ? true : false} className="btn text-btn green">{props.submitted ? configConstants.BUTTON_PLEASE_WAIT : configConstants.SAVE_BUTTON}</button>
                    </div> : ''
                }
            </div>
            <PatientAlertMessage 
            errorMsg = {props.errorMsg}
            isUpdateDone = {props.isUpdateDone}
            successMessage = {props.successMessage}
            />
            <div className="table-responsive">
                <table className="table table-bordered responsive clearfix">
                    <thead>
                        <tr>
                            <th></th>
                            <th className="text-center">Yes/No</th>
                            <th width="300">Duration</th>
                            <th>Remark</th>
                        </tr>
                    </thead>
                    <tbody>  
                        { 
                            typeof props.patientGeneralCheckupData === 'object' ? props.patientGeneralCheckupData.result.map(checkupFector => 
                            {
                                let isHappenedId    = 'is_happend_'+checkupFector.id
                                let durationId      = 'duration_'+checkupFector.id
                                let durationUnit    = 'duration_unit_'+checkupFector.id
                                let remarkId        = 'remark_'+checkupFector.id

                                if(checkupFector.onlycheckbox == 0){
                                    return (
                                        <tr key={checkupFector.id} >
                                            <td>{checkupFector.value}</td>
                                            <td className="text-center">
                                                <CheckboxGroup
                                                    checkboxDepth={2} // This is needed to optimize the checkbox group
                                                    name={'is_happend_'+checkupFector.id}
                                                    value={props.state[isHappenedId]} 
                                                    onChange={(value, name) => props.handleCheckboxChange(value, 'is_happend_'+checkupFector.id)} >
                                             
                                                    {
                                                        props.staticData.yes_no_option.map(checkOptions => {
                                                            return (
                                                                <label key={'sd'+checkOptions.id}><Checkbox className="option-input checkbox" value={checkOptions.id} /><span>{checkOptions.value}</span></label>
                                                            )
                                                        }) 
                                                    }
                                                   

                                                </CheckboxGroup>
                                            </td>
                                            <td>
                                                <span className="inline">
                                                    <input type="text" className="form-control mediume-size" name={'duration_'+checkupFector.id} value={props.state[durationId]} onChange={props.handleInputChange}/>
                                                </span>
                                                <span className="inline">
                                                    <Select
                                                        className="custom-select"
                                                        name={'duration_unit_'+checkupFector.id}
                                                        options={utilityHelper.getDataConvertToOptionType(props.staticData.checkup_duration,'value','id')}
                                                        value={props.state[durationUnit]}
                                                        onChange={(value, name) => props.handleSelectChange(value, 'duration_unit_'+checkupFector.id)}
                                                    />
                                                </span>
                                            </td>
                                            <td>
                                                <input type="text" className="form-control" placeholder="Enter your remark" name={'remark_'+checkupFector.id} onChange={props.handleInputChange} value={props.state[remarkId]} />
                                            </td>
                                        </tr>
                                    )
                                }
                            }) : <tr><td colSpan="4" align="center">No record found.</td></tr>
                        }                  
                        
                    </tbody>
                </table>
            </div>
            <div className="row">
                {
                    typeof props.patientGeneralCheckupData === 'object' ? props.patientGeneralCheckupData.result.map(checkupFector => 
                    {
                        let isHappenedId    = 'is_happend_'+checkupFector.id
                        let durationId      = 'duration_'+checkupFector.id
                        let durationUnit    = 'duration_unit_'+checkupFector.id
                        let remarkId        = 'remark_'+checkupFector.id

                        if(checkupFector.onlycheckbox == 1){
                            return (
                                <div className="col-md-3" key={checkupFector.id}>
                                    <div className="form-group">
                                        <div className="checkbox-section">
                                            <CheckboxGroup
                                                checkboxDepth={2}
                                                name={'is_happend_'+checkupFector.id}
                                                value={props.state[isHappenedId]} 
                                                onChange={(value, name) => props.handleCheckboxChange(value, 'is_happend_'+checkupFector.id)} >
                                                
                                                {
                                                    props.staticData.yes_no_option.map(checkOptions => {
                                                        return (
                                                            <label key={checkOptions.id}><Checkbox className="option-input checkbox" value={checkOptions.id} /><span>{checkOptions.value}</span></label>
                                                        )
                                                    }) 
                                                }
                                            </CheckboxGroup>
                                        </div>
                                        <label className="control-label">{checkupFector.value} </label>
                                    </div>
                                </div>
                            )
                        }
                    }) : ''
                }

                {props.user_type != configConstants.USER_TYPE_PATIENT ?
                    <div className="col-md-12 text-right">
                        <button onClick={props.handleSubmit} disabled={props.submitted ? true : false} className="btn text-btn green">{props.submitted ? configConstants.BUTTON_PLEASE_WAIT : configConstants.SAVE_BUTTON}</button>
                    </div> : ''
                }
            </div>
            <PatientAlertMessage 
            errorMsg = {props.errorMsg}
            isUpdateDone = {props.isUpdateDone}
            successMessage = {props.successMessage}
            />
        </div>
    ); 
}

