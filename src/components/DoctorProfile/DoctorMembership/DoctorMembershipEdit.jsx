/**
 * Doctor membership edit
 *
 * @package                SafeHealth
 * @subpackage             Doctor membership edit
 * @category               Presentational Component
 * @DateOfCreation         11 May 2018
 * @ShortDescription       This component is reponsible to render model of edit doctor membership
 */
import React from "react";
import { Alert, bsStyle } from 'react-bootstrap';
import {Button, Modal} from 'react-bootstrap';
import Select from 'react-select';
import { utilityHelper } from '../../../_helpers';

export const DoctorMembershipEdit = (props) => {
    return(
      <div>
        <Modal show={props.membershipEditShow} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Membership</Modal.Title>
          </Modal.Header>
          { props.editMessage &&                     
                <Alert bsStyle="success">
                  {props.editMessage}
                </Alert>
          }

           { props.errorMsg &&                      
                <Alert bsStyle="danger">
                  {props.errorMsg}
                </Alert>
            }
           <Modal.Body>
            <div className="row">
                <div className="col-md-4">
                    <div className={props.payload.validate.doc_mem_name.isValid ? 'form-group' : 'form-group has-error'}>
                        <input
                          type="text"
                          className="form-control"
                          name="doc_mem_name"
                          onChange={ props.handleChange }
                          value={ props.payload.detail.doc_mem_name }
                        />
                        <label className="control-label">Membership Name</label>
                        <span className="help-block">{props.payload.validate.doc_mem_name.message}</span>
                    </div>
                </div>
                 <div className="col-md-4">
                    <div className={props.payload.validate.doc_mem_year.isValid ? 'form-group' : 'form-group has-error'}>
                      <Select
                        name="doc_mem_year"
                        className="custom-select"
                        value = { props.payload.detail.doc_mem_year }
                        clearable={false}
                        onChange={(value, name) => props.handleSelectChange(value, 'doc_mem_year')}
                        options={ utilityHelper.getYears() }
                      />
                      <label className="control-label">Membership Joining Year</label>
                      <span className="help-block">{props.payload.validate.doc_mem_year.message}</span>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className={props.payload.validate.doc_mem_no.isValid ? 'form-group' : 'form-group has-error'}>
                        <input
                          type="text"
                          className="form-control"
                          name="doc_mem_no"
                          onChange={ props.handleChange }
                          value={ props.payload.detail.doc_mem_no }
                        />
                        <label className="control-label">Membership Number</label>
                        <span className="help-block">{props.payload.validate.doc_mem_no.message}</span>
                    </div>
                </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn text-btn red" onClick={props.handleClose}>Close</Button>
            <Button className="btn text-btn green" onClick={props.handleSubmit} disabled={props.editMessage ? true : false} className="btn text-btn green">{props.editMessage ? 'Sending..' : 'Update'}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
}
