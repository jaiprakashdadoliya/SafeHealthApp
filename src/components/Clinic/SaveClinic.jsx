import React from "react";
import { Button, Modal, Alert, bsStyle } from 'react-bootstrap';
import { utilityHelper } from '../../_helpers';
import Select from 'react-select';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from '../../_packages/react-places-autocomplete';

export const SaveClinic = (props) => {
    return (
        <div>
            <Modal show={ props.saveClinicShow } onHide={ props.handleClose }  backdrop="static" keyboard={false}>
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
                      {props.errorMsg}
                    </Alert>
                }
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-6">
                            <div className={ props.payload.validate.clinic_name.isValid ? 'form-group' : 'form-group has-error' }>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={ props.payload.detail.clinic_name }
                                    name="clinic_name"
                                    onChange={ props.handleChange }
                                />
                                <label className="control-label">Name</label>
                                <span className="help-block">{ props.payload.validate.clinic_name.message }</span>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className={ props.payload.validate.clinic_phone.isValid ? 'form-group' : 'form-group has-error' }>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="clinic_phone"
                                    onChange={ props.handleChange } 
                                    value={ props.payload.detail.clinic_phone }
                                    maxLength={10}
                                />
                                <label className="control-label">Phone Number</label>
                                <span className="help-block">{ props.payload.validate.clinic_phone.message }</span>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className={ props.payload.validate.clinic_address_line1.isValid ? 'form-group' : 'form-group has-error' }>
                                <PlacesAutocomplete
                                  value={props.payload.detail.clinic_address_line1}
                                  onChange={props.handleAddressChange}
                                  onSelect={props.handleSelect}
                                  shouldFetchSuggestions={props.payload.detail.clinic_address_line1.length > 3}
                                  >
                                  {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div>
                                      <input
                                        {...getInputProps({
                                          name:"clinic_address_line1",
                                          placeholder: 'Search Places ...',
                                          className: 'form-control location-search-input',
                                        })}
                                      />
                                      <div className="autocomplete-dropdown-container">
                                        {loading && <div>Loading...</div>}
                                        {suggestions.map(suggestion => {
                                          const className = suggestion.active
                                            ? 'suggestion-item--active'
                                            : 'suggestion-item';
                                          // inline style for demonstration purpose
                                          const style = suggestion.active
                                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                          return (
                                            <div
                                              {...getSuggestionItemProps(suggestion, {
                                                className,
                                                style,
                                              })}
                                            >
                                              <span>{suggestion.description}</span>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}
                                </PlacesAutocomplete>
                                <label className="control-label">Address line 1</label>
                                <span className="help-block">{ props.payload.validate.clinic_address_line1.message }</span>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className={ props.payload.validate.clinic_address_line2.isValid ? 'form-group' : 'form-group has-error' }>
                               <input type="text" 
                                     name="clinic_address_line2" 
                                     className="form-control" 
                                     onChange={props.handleChange} 
                                     value={(props.payload.detail.clinic_address_line2) ? props.payload.detail.clinic_address_line2 : ''}
                                />
                                <label className="control-label">Address line 2</label>
                                <span className="help-block">{ props.payload.validate.clinic_address_line2.message }</span>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className={ props.payload.validate.clinic_landmark.isValid ? 'form-group' : 'form-group has-error' }>
                                <input 
                                      type="text" 
                                      className="form-control" 
                                      name = "clinic_landmark"
                                      onChange={props.handleChange}   
                                      value={props.payload.detail.clinic_landmark}
                                />
                                <label className="control-label">Landmark</label>
                                <span className="help-block">{ props.payload.validate.clinic_landmark.message }</span>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className={ props.payload.validate.clinic_pincode.isValid ? 'form-group' : 'form-group has-error' }>
                                <input 
                                      type="text" 
                                      className="form-control" 
                                      name = "clinic_pincode"
                                      onChange={props.handleChange}   
                                      value={props.payload.detail.clinic_pincode}
                                />
                                <label className="control-label">Pincode</label>
                                <span className="help-block">{ props.payload.validate.clinic_pincode.message }</span>
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
