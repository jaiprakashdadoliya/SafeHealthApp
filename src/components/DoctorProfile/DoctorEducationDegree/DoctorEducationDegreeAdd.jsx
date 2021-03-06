/**
 * Doctor Degree add
 *
 * @package                SafeHealth
 * @subpackage             Doctor Degree add
 * @category               Presentational Component
 * @DateOfCreation         11 May 2018
 * @ShortDescription       This component is reponsible to render model of add doctor Degree
 */
import React from "react";
import { Alert, bsStyle, Button, Modal } from 'react-bootstrap';
import Select from 'react-select';
import { utilityHelper } from '../../../_helpers';

export const DoctorEducationDegreeAdd = (props) => {
    return(
      <div>
        <Modal show={props.degreeAddShow} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Education/Degree</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
            { props.sendingRequest &&  props.addSuccessMessage &&                      
                <Alert bsStyle="success">
                  {props.addSuccessMessage}
                </Alert>
            }

            { props.errorMsg &&                      
                <Alert bsStyle="danger">
                  {props.errorMsg}
                </Alert>
            }
                <div className="col-md-4">
                    <div className={props.payload.validate.doc_deg_name.isValid ? 'form-group' : 'form-group has-error'}>
                        <input type="text" className="form-control" name="doc_deg_name" onChange={ props.handleChange }  value={ props.payload.detail.doc_deg_name }/>
                        <label className="control-label">Degree Name</label>
                        <span className="help-block">{props.payload.validate.doc_deg_name.message}</span>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className={props.payload.validate.doc_deg_passing_year.isValid ? 'form-group' : 'form-group has-error'}>
                      <Select
                          name="doc_deg_passing_year"
                          className="custom-select"
                          value = {props.payload.detail.doc_deg_passing_year}
                          clearable={false}
                          onChange={(value, name) => props.handleSelectChange(value, 'doc_deg_passing_year')}
                          options={utilityHelper.getYears()}
                        />
                        <label className="control-label">Year of Passing</label>
                        <span className="help-block">{props.payload.validate.doc_deg_passing_year.message}</span>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className={props.payload.validate.doc_deg_institute.isValid ? 'form-group' : 'form-group has-error'}>
                        <input type="text" className="form-control" name="doc_deg_institute" onChange={ props.handleChange } value={ props.payload.detail.doc_deg_institute } />
                        <label className="control-label">Institute Name</label>
                        <span className="help-block">{props.payload.validate.doc_deg_institute.message}</span>
                    </div>
                </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn text-btn red" onClick={props.handleClose}>Close</Button>
            <Button className="btn text-btn green" onClick={props.handleSave} disabled={props.addSuccessMessage ? true : false}>Save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
}
