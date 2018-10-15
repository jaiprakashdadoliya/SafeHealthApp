import React from "react";
import Select from 'react-select';
import {Button, Alert, bsStyle} from 'react-bootstrap';
import { utilityHelper } from '../../../../_helpers';
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { configConstants } from '../../../../_constants';
import {FxForm} from '../../../../_packages/fx-form';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import moment from 'moment';

export const PatientProfile = (props) => {
  return(
    <div className="row">
        <div className="col-md-3">
            <div className="row">
                <div className="col-md-12">
                    <div className="form-group ">
                        <label className="view-label">Patient Image</label>
                        <div className="image-view">
                           {props.sendingRequest ? <img src={configConstants.PROFILE_LOAING} />
                            : <img src={(props.patient.profile.pat_profile_img != '') ? props.patient.profile.pat_profile_img : configConstants.DEFAULT_IMAGE_PATH} />
                           }
                           </div>
                           <div className="upload-profile">
                               <label className="btn green text-btn select-file ">Choose file
                              <input type="file" className="btn text-btn yellow" onChange={props._onChange} />
                              </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-md-9">
                {props.errorMessage &&
                    <Alert bsStyle="danger">
                        {props.errorMessage}
                    </Alert>
                }

                {props.isUpdateDone &&
                    props.successMessage &&
                        <Alert bsStyle="success">
                            {props.successMessage}
                        </Alert>
                }
            <div className="row">
                <FxForm
                    config={props.patientProfileFormConfig}
                    ref={(form) => {
                        props.handleBoundFormUpdate(form);
                    }}
                />
                <div className="col-md-12 text-right">
                    <button onClick={props.handleSubmit} disabled={(props.submitted || props.isUpdateDone) && !props.errorMessage && !props.successMessage ? true : false} className="btn text-btn green">{(props.submitted || props.isUpdateDone) && !props.errorMessage && !props.successMessage ? 'Sending..' : 'Save'}</button>
                </div>
            </div>
        </div>
    </div>
);
}
