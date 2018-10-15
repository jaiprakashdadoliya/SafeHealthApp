import React from "react";
import Select from 'react-select';
import { Button, Modal,Alert, bsStyle } from 'react-bootstrap';
import { utilityHelper } from '../../../_helpers';
import { WithContext as ReactTags } from 'react-tag-input';

/**
 * DoctorSpecialisationEdit
 *
 * @package                SafeHealth
 * @subpackage             DoctorSpecialisationEdit
 * @category               Presentational Component
 * @DateOfCreation         31 May 2018
 * @ShortDescription       This component is reponsible to show the Doctor specialisation edit modal
 */
export const DoctorSpecialisationEdit = (props) => {
    return (
        <div>
            <Modal show={ props.specialisationEditShow } onHide={ props.handleClose }>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Specialisation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { props.errorMsg &&                        
                          <Alert bsStyle="danger">
                              { props.errorMsg }
                          </Alert>
                    } 
                    { props.isUpdateDone && props.successMsg &&                        
                          <Alert bsStyle="success">
                              { props.successMsg }
                          </Alert>
                    } 
                    <div className={ props.payload.specialisationValidate.spl_id.isValid ? 'form-group' : 'form-group has-error'}>
                        <Select
                            name="spl_id"
                            className="custom-select"
                            value={ props.payload.specialisation.spl_id }
                            clearable={ false }
                            onChange={ (value, name) => props.handleSelectChange(value, 'spl_id') }
                            options={ utilityHelper.getSpecialisation(props.masterSpecialisationData) }
                        />
                        <label className="control-label">Specialisation</label>
                        <span className="help-block">
                            { props.payload.specialisationValidate.spl_id.message }
                        </span>
                    </div>
                    <div className='form-group'>
                        <ReactTags
                            tags            = { props.payload.specialisation.specialisation_tags }
                            suggestions     = { props.suggestions }
                            handleDelete    = { props.handleDelete }
                            handleAddition  = { props.handleAddition }
                            handleDrag      = { props.handleDrag }
                            delimiters      = { props.delimiters }
                        />
                        <label className="control-label">Specialisation tags</label>
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
