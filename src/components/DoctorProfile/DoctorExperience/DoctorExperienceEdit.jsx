import React from "react";
import { Button, Modal, Alert, bsStyle } from 'react-bootstrap';
import Select from 'react-select';
import { utilityHelper } from '../../../_helpers';
/**
 * DoctorExperienceEdit
 *
 * @package                SafeHealth
 * @subpackage             DoctorExperienceEdit
 * @category               Presentational Component
 * @DateOfCreation         24 May 2018
 * @ShortDescription       This component is reponsible to show the Doctor experience edit modal
 */
export const DoctorExperienceEdit = (props) => {
    return(
          <div>
            <Modal show={props.experienceEditShow} onHide={props.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Experience</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <div className="row">
                    <div className="col-md-12">

                        {props.errorMsg &&
                                <Alert bsStyle="danger">
                                    {props.errorMsg}
                                </Alert>
                        }

                        {props.isUpdateDone &&
                            props.successMsg &&
                                <Alert bsStyle="success">
                                    {props.successMsg}
                                </Alert>
                        }

                        <div className={props.payload.experienceValidate.doc_exp_organisation_name.isValid ? 'form-group' : 'form-group has-error'}>
                            <input
                                type="text"
                                className="form-control"
                                onChange={props.handleInputChange}
                                onKeyPress={props.handleEnterPressSubmit}
                                name="doc_exp_organisation_name"
                                value={props.payload.experience.doc_exp_organisation_name}
                            />
                            <label className="control-label">Organisation Name</label>
                            <span className="help-block">
                                {props.payload.experienceValidate.doc_exp_organisation_name.message}
                            </span>

                        </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-md-6">
                        <div className={props.payload.experienceValidate.doc_exp_designation.isValid ? 'form-group' : 'form-group has-error'}>
                            <input
                                type="text"
                                className="form-control"
                                name="doc_exp_designation"
                                onChange={props.handleInputChange}
                                onKeyPress={props.handleEnterPressSubmit}
                                value={props.payload.experience.doc_exp_designation}
                              />
                            <label className="control-label">Designation</label>
                            <span className="help-block">
                                {props.payload.experienceValidate.doc_exp_designation.message}
                            </span>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className={props.payload.experienceValidate.doc_exp_start_month.isValid ? 'form-group' : 'form-group has-error'}>
                             <Select
                                name="doc_exp_start_month"
                                className="custom-select"
                                value={props.payload.experience.doc_exp_start_month}
                                clearable={false}
                                onChange={(value, name) => props.handleSelectChange(value, 'doc_exp_start_month')}
                                options={utilityHelper.getMonths()}
                              />
                            <label className="control-label">Start Month</label>
                            <span className="help-block">
                                {props.payload.experienceValidate.doc_exp_start_month.message}
                            </span>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className={props.payload.experienceValidate.doc_exp_start_year.isValid ? 'form-group' : 'form-group has-error'}>
                             <Select
                                name="doc_exp_start_year"
                                className="custom-select"
                                value={props.payload.experience.doc_exp_start_year}
                                clearable={false}
                                onChange={(value, name) => props.handleSelectChange(value, 'doc_exp_start_year')}
                                options={utilityHelper.getYears()}
                              />
                            <label className="control-label">Start Year</label>
                            <span className="help-block">
                                {props.payload.experienceValidate.doc_exp_start_year.message}
                            </span>
                        </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-md-3">
                        <div className={props.payload.experienceValidate.doc_exp_end_month.isValid ? 'form-group' : 'form-group has-error'}>
                            <Select
                                name="doc_exp_end_month"
                                className="custom-select"
                                value={props.payload.experience.doc_exp_end_month}
                                clearable={false}
                                onChange={(value, name) => props.handleSelectChange(value, 'doc_exp_end_month')}
                                options={utilityHelper.getMonths()}
                            />
                            <label className="control-label">End Month</label>
                            <span className="help-block">
                                {props.payload.experienceValidate.doc_exp_end_month.message}
                            </span>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className={props.payload.experienceValidate.doc_exp_end_year.isValid ? 'form-group' : 'form-group has-error'}>
                            <Select
                                name="doc_exp_end_year"
                                className="custom-select"
                                value={props.payload.experience.doc_exp_end_year}
                                clearable={false}
                                onChange={(value, name) => props.handleSelectChange(value, 'doc_exp_end_year')}
                                options={utilityHelper.getYears()}
                            />
                            <label className="control-label">End Year</label>
                            <span className="help-block">
                                {props.payload.experienceValidate.doc_exp_end_year.message}
                            </span>

                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className={props.payload.experienceValidate.doc_exp_organisation_type.isValid ? 'form-group' : 'form-group has-error'}>
                            <label className="control-label">Organisation Type</label>
                            <div className="check-list-radio">
                                <input
                                    type = "radio"
                                    className = "option-input radio"
                                    name = "doc_exp_organisation_type"
                                    onChange = {props.handleInputChange}
                                    value = "1"
                                    defaultChecked={props.payload.experience.doc_exp_organisation_type === '1'}
                                />
                                <div>Government</div>
                                <input
                                    type = "radio"
                                    className = "option-input radio"
                                    name = "doc_exp_organisation_type"
                                    onChange = {props.handleInputChange}
                                    value = "2"
                                    defaultChecked={props.payload.experience.doc_exp_organisation_type === '2'}
                                />
                                <div>Private</div><br/>
                                <span className="help-block">
                                    {props.payload.experienceValidate.doc_exp_organisation_type.message}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button className="btn text-btn red" onClick={props.handleClose}>Close</Button>{props.submitted}
                 <Button onClick={props.handleSubmit} disabled={(props.submitted || props.isUpdateDone) && !props.errorMsg ? true : false} className="btn text-btn green">{(props.submitted || props.isUpdateDone) && !props.errorMsg ? 'Sending..' : 'Save'}</Button>
              </Modal.Footer>
            </Modal>
          </div>
        );
}
