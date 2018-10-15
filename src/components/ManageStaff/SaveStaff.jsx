import React from "react";
import { Button, Modal, Alert, bsStyle } from 'react-bootstrap';
import { utilityHelper } from '../../_helpers';
import Select from 'react-select';

export const SaveStaff = (props) => {
    return (
        <div>
            <Modal show={ props.saveStaffShow } onHide={ props.handleClose }  backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
            <Modal.Title>{ props.title }</Modal.Title>
        </Modal.Header>
        { props.message &&
            <Alert bsStyle="success">
                { props.message }
            </Alert>
        }

        { props.errorMsg &&
            <Alert bsStyle="danger">
                { props.errorMsg }
            </Alert>
        }
        <Modal.Body>
            <div className="row">
                <div className="col-md-6">
                    <div className={ props.payload.validate.user_firstname.isValid ? 'form-group' : 'form-group has-error' }>
                        <input type="text" className="form-control" value={ props.payload.detail.user_firstname } name="user_firstname" onChange={ props.handleChange } />
                        <label className="control-label">First Name</label>
                        <span className="help-block">{ props.payload.validate.user_firstname.message }</span>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className={ props.payload.validate.user_lastname.isValid ? 'form-group' : 'form-group has-error' }>
                        <input type="text" className="form-control" value={ props.payload.detail.user_lastname } name="user_lastname" onChange={ props.handleChange } />
                        <label className="control-label">Last Name</label>
                        <span className="help-block">{ props.payload.validate.user_lastname.message }</span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className={ props.payload.validate.user_gender_id.isValid ? 'form-group' : 'form-group has-error' }>
                        <Select
                            name = "user_gender_id"
                            className = "custom-select"
                            value = { props.payload.detail.user_gender_id }
                            clearable = {false}
                            placeholder = "Select Gender"
                            onChange = { (value, name) => props.handleSelectChange(value, 'user_gender_id') }
                            options = { utilityHelper.getDataConvertToOptionType(props.staticData.gender, 'value', 'id') }
                        />
                        <label className="control-label">Gender</label>
                        <span className="help-block">{ props.payload.validate.user_gender_id.message }</span>
                    </div>
                </div>
                <div className="col-md-6">
                    <label className="control-label">Mobile Number</label>
                    <div className="row">
                        <div className="col-xs-3 col-md-3 rpr">
                            <div className="form-group">
                                <Select
                                    name="user_country_code"
                                    className="custom-select country-code"
                                    onChange={props.handleCountryCodeChange}
                                    clearable={false}
                                    value={props.payload.detail.user_country_code}
                                    options={[
                                        { value: '91', label: '+91'},
                                        { value: '92', label: '+92'},
                                        { value: '93', label: '+93'},
                                        { value: '94', label: '+94'}
                                    ]}
                                    />
                            </div>
                        </div>
                        <div className="col-xs-9 col-md-9 rpl">
                            <div className={ props.payload.validate.user_mobile.isValid ? 'form-group' : 'form-group has-error' }>
                                <input type="text" className="form-control" value={ props.payload.detail.user_mobile } name="user_mobile" onChange={ props.handleChange } />
                                <span className="help-block">{ props.payload.validate.user_mobile.message }</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className={props.payload.validate.user_email.isValid ? 'form-group' : 'form-group has-error'}>
                        <input type="text" name="user_email" onChange={props.handleChange} value={props.payload.detail.user_email} className="form-control" />
                        <label className="control-label">Email</label>
                        <span className="help-block">{props.payload.validate.user_email.message}</span>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className={props.payload.validate.user_password.isValid ? 'form-group' : 'form-group has-error'}>
                        <input type="password" name="user_password" onChange={props.handleChange} value={props.payload.detail.user_password} className="form-control" placeholder="********"/>
                        <label className="control-label">Password</label>
                        <span className="help-block">{props.payload.validate.user_password.message}</span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className={ props.payload.validate.user_type_id.isValid ? 'form-group' : 'form-group has-error' }>
                        <Select
                            name = "user_type_id"
                            className="custom-select"
                            value = { props.payload.detail.user_type_id }
                            clearable={false}
                            placeholder = "Select Role"
                            onChange = { (value, name) => props.handleSelectChange(value, 'user_type_id') }
                            options={ utilityHelper.getDataConvertToOptionType(props.staticData.staffRole, 'value', 'id') }
                        />
                        <label className="control-label">Select Role</label>
                        <span className="help-block">{ props.payload.validate.user_type_id.message }</span>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className={props.payload.validate.user_adhaar_number.isValid ? 'form-group' : 'form-group has-error'} >
                        <input type="text" name="user_adhaar_number" onChange={props.handleChange} value={props.payload.detail.user_adhaar_number} className="form-control" />
                        <label className="control-label">Adhaar number</label>
                        <span className="help-block">{props.payload.validate.user_adhaar_number.message}</span>
                    </div>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button className="btn text-btn red" onClick={ props.handleClose }>Close</Button>
            <Button className="btn text-btn green" disabled={ props.submitted || props.isInsertDone ? true : false }  onClick={ props.handleSave }>{ props.submitted ? 'Sending..' : 'Save' }</Button>
        </Modal.Footer>
      </Modal>
        </div>
    );
}
