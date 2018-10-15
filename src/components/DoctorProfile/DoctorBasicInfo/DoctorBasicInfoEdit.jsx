import React from "react";
import { connect } from 'react-redux';
import {Button, Modal, Tabs, Tab, DropdownButton, title, Alert, bsStyle} from 'react-bootstrap';
import Select from 'react-select';
import {doctorProfileActions, headerActions, regionActions} from '../../../_actions';
import { doctorProfileValidator } from '../../../_validator';
import { utilityHelper } from '../../../_helpers';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from '../../../_packages/react-places-autocomplete';
/**
 * DoctorBasicInfoEdit
 *
 * @package                SafeHealth
 * @subpackage             DoctorBasicInfoEdit
 * @category               Component
 * @DateOfCreation         22 May 2018
 * @ShortDescription       This component is reponsible for update basic profile
 */
class DoctorBasicInfoEdit extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            user : {
                detail: this.props.payload.detail,
                validate: this.props.payload.validate,
                doc_other_city_visible: false,
            },
            old : {
                detail: this.props.payload.detail,
                validate: this.props.payload.validate,
                doc_other_city_visible: false,
            }
        };
        this.doc_other_city_set = true;
    }

  /**
  * @DateOfCreation        29 May 2018
  * @ShortDescription      This function is responsible to fatch city and state on load
  * @return                nothing
  */
  componentWillMount(){
      const { dispatch } = this.props;
      dispatch(regionActions.getCountry());
  }


 /**
  * @DateOfCreation        29 May 2018
  * @ShortDescription      This function is responsible to redirect unauthorise users
  * @return                Redirect
  */
  componentDidUpdate(){
      const { dispatch }  = this.props;
      if(this.props.isUserNotValid){
          dispatch(headerActions.logout());
      }
  }

  /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to handle close profile model
   * @return                Nothing
   */
  handleClose(typeSave) {
    if(!typeSave){
        let oldData = this.state.old;
        this.setState({
            user :{
                ...oldData,
            },
            old:{
                ...oldData,
            }
        });
    }
    const { dispatch }  = this.props;
    dispatch(doctorProfileActions.resetState());
    let state_id = this.state.old.detail.state_id;
    if(state_id !=='' && typeSave==true){
        dispatch(regionActions.getCities(state_id));
    }
    this.props.basicInfoEditHideHandle();
  }
  /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to set state for onchange on view page
   *                         so we can type in form.
   * @return                Nothing
   */
  handleChange(event) {
    const { name, value } = event.target;
    const { detail, validate, doc_other_city_visible } = this.state.user;
    let oldData = this.state.old;
    this.setState({
        user: {
            validate:{
                ...validate,
                [name]: {
                    isValid: true,
                    message: ''
                }
            },
            detail: {
                ...detail,
                [name]: value
            },
            doc_other_city_visible: doc_other_city_visible
        },
        old :{
            ...oldData
        }
    });
  }

  /**
   * @DateOfCreation        24 May 2018
   * @ShortDescription      This function is responsible to handle changes in Select state
   * @param                 Event Object
   * @return                Nothing
   */
  handleSelectChange(selectedOption, name) {
    const { detail, validate, doc_other_city_visible }  = this.state.user;
    let oldData = this.state.old;
    let other_city_state = doc_other_city_visible;
    let city_id = this.state.user.city_id;
    var doc_other_city = detail.doc_other_city;
    if (name === 'city_id' && selectedOption.label == 'Other'){
        other_city_state = true;
        doc_other_city = '';

    } else if(name === 'city_id' && selectedOption.label != 'Other') {
        other_city_state = false;
    }
    if (name === 'state_id'){
            city_id ='';
    }

    this.setState({
        user : {
            detail : {
                ...detail,
                ['doc_other_city'] : doc_other_city,
                ['city_id'] : city_id,
                [name]: selectedOption.value,
            },
            validate:{
                ...validate,
                [name]: {
                    isValid: true,
                    message: ''
                }
            },
            doc_other_city_visible : other_city_state 
        },
        old :{
            ...oldData
        }
    });

    if (name === 'state_id') {
        const { dispatch } = this.props;
        dispatch(regionActions.getCities(selectedOption.value));  
    } else if(name === 'country_id') {
        const { dispatch } = this.props;
        dispatch(regionActions.getStates(selectedOption.value));  
    }
  }

  /**
   * @DateOfCreation        2 aug 2018
   * @ShortDescription      This function is responsible to handle changes in Select google address
   * @param                 Event Object
   * @return                Nothing
   */
  handleAddressChange(address){
     const { detail,validate } = this.state.user;
         this.setState({
          user:{
            detail:{
              ...detail,
              doc_address_line1: address,
            },
            validate:{
                ...validate,
                doc_address_line1: {
                    isValid: true,
                    message: ''
                }
            }
          }
        });
  };

  /**
   * @DateOfCreation        2 aug 2018
   * @ShortDescription      This function is responsible to handle set google address
   * @param                 Event Object
   * @return                Nothing
   */
  handleSelect(address){
    const { detail,validate } = this.state.user;
         
     geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(fullAddress =>{
        this.setState({
          user:{
            detail:{
              ...detail,
              doc_address_line1: address,
              doc_latitude:fullAddress.lat,
              doc_longitude:fullAddress.lng
            },
            validate:{
                ...validate
            }
          }
        });
      })
      .catch(error => console.error('Error', error));
  };

  /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to set props in state on view page 
   *                        and after update again set state.
   * @param Object props    get props for edit mode
   * @return                Nothing
   */
  componentWillReceiveProps(nextProps){
    if(nextProps.successMessage && nextProps.sendingRequest){
          setTimeout(function() { 
            this.handleClose(true);
        }.bind(this), 2000);
    }
    if(this.doc_other_city_set && nextProps.payload.detail.doc_other_city!=''){
        let stateUser = this.state.user;
        let oldData = this.state.old;
        this.setState({
          user: {
            ...stateUser,
            doc_other_city_visible: true
          },
          old :{
            ...oldData,
            doc_other_city_visible: true
          }
        });
        this.doc_other_city_set = false;
    }
  }  

    /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to update doctor detail.
   * @return                Nothing
   */
  handleSubmit(){
    if(doctorProfileValidator.isDoctorValid(this)){
      const { detail } = this.state.user;
      const { dispatch } = this.props;
      dispatch(doctorProfileActions.profileUpdate(detail));
    }
  }

  render() {
       return (
          <div>
            <Modal show={this.props.basicInfoEditShow} onHide={this.handleClose.bind(null, false)}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Basic Profile</Modal.Title>
              </Modal.Header>
              { this.props.sendingRequest && this.props.successMessage &&                     
                <Alert bsStyle="success">
                  { this.props.successMessage }
                </Alert>
              }

             { this.props.errorMsg &&                      
                  <Alert bsStyle="danger">
                    { this.props.errorMsg }
                  </Alert>
              }
              <Modal.Body>
                <div className="row">
                  <div className="col-md-4">
                    <div className={this.state.user.validate.user_firstname.isValid ? 'form-group' : 'form-group has-error'}>
                        <input type="text" className="form-control" name="user_firstname" onChange={ this.handleChange } value={this.state.user.detail.user_firstname}/>
                        <label className="control-label">First Name</label>
                        <span className="help-block">{this.state.user.validate.user_firstname.message}</span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className={this.state.user.validate.user_lastname.isValid ? 'form-group' : 'form-group has-error'}>
                        <input type="text" className="form-control" name="user_lastname" onChange={ this.handleChange } value={this.state.user.detail.user_lastname}/>
                        <label className="control-label">First Name</label>
                        <span className="help-block">{this.state.user.validate.user_lastname.message}</span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className='form-group'>
                      <Select
                          name="user_gender"
                          className="custom-select"
                          value = {this.state.user.detail.user_gender}
                          clearable={false}
                          placeholder="Select Gender"
                          onChange={(value, name) => this.handleSelectChange(value, 'user_gender')}
                          options={[
                                { value: '1', label: 'Male' },
                                { value: '2', label: 'Female' },
                                { value: '3', label: 'Transgender' },
                              ]}
                        />
                        <label className="control-label">Gender</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input type="email" className="form-control" name="user_email" onChange={ this.handleChange } value={this.state.user.detail.user_email} disabled/>
                      <label className="control-label">Email</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={this.state.user.validate.user_mobile.isValid ? 'form-group' : 'form-group has-error'}>
                        <input type="text" className="form-control" name="user_mobile" onChange={ this.handleChange } value={this.state.user.detail.user_mobile} maxLength="12" disabled/>
                        <label className="control-label">Mobile Number</label>
                        <span className="help-block">{this.state.user.validate.user_mobile.message}</span>
                    </div>
                  </div>
                    <div className="col-md-6">
                      <div className={this.state.user.validate.doc_consult_fee.isValid ? 'form-group' : 'form-group has-error'}>
                          <input type="text" className="form-control" name="doc_consult_fee" onChange={ this.handleChange } value={this.state.user.detail.doc_consult_fee}/>
                          <label className="control-label">Consult fee</label>
                          <span className="help-block">{this.state.user.validate.doc_consult_fee.message}</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className={this.state.user.validate.doc_reg_num.isValid ? 'form-group' : 'form-group has-error'}>
                          <input type="text" className="form-control" name="doc_reg_num" onChange={ this.handleChange } value={this.state.user.detail.doc_reg_num}/>
                          <label className="control-label">Registration Number</label>
                          <span className="help-block">{this.state.user.validate.doc_reg_num.message}</span>
                      </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <textarea className="form-control" value={this.state.user.detail.doc_short_info}  name="doc_short_info" onChange={ this.handleChange } maxLength="1000"></textarea>
                            <label className="control-label">Short Description</label>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className={this.state.user.validate.doc_address_line1.isValid ? 'form-group' : 'form-group has-error'}>
                             <PlacesAutocomplete
                                value={this.state.user.detail.doc_address_line1}
                                onChange={this.handleAddressChange}
                                onSelect={this.handleSelect}
                                shouldFetchSuggestions={this.state.user.detail.doc_address_line1.length > 3}
                                >
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                  <div>
                                    <input
                                      {...getInputProps({
                                        name:"doc_address_line1",
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
                             <label className="control-label">Address 1</label>
                             <span className="help-block">{this.state.user.validate.doc_address_line1.message}</span>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                             <input type="text" className="form-control" name="doc_address_line2" onChange={ this.handleChange } value={this.state.user.detail.doc_address_line2}/>
                            <label className="control-label">Address 2</label>
                        </div>
                    </div>
                    <div className="col-md-4" style={{display:'none'}}>
                        <div className="form-group">
                            <Select
                              name="country_id"
                              className="custom-select"
                              value = {this.state.user.detail.country_id}
                              clearable={false}
                              placeholder="Select Country"
                              onChange={(value, name) => this.handleSelectChange(value, 'country_id')}
                              options={utilityHelper.getCountry(this.props.country)}
                            />
                        <label className="control-label">State</label>
                      </div>
                    </div> 
                    <div className="col-md-4">
                        <div className={this.state.user.validate.state_id.isValid ? 'form-group' : 'form-group has-error'}>
                            <Select
                              name="state_id"
                              className="custom-select"
                              value = {this.state.user.detail.state_id}
                              clearable={false}
                              placeholder="Select State"
                              onChange={(value, name) => this.handleSelectChange(value, 'state_id')}
                              options={utilityHelper.getStates(this.props.states)}
                            />
                        <label className="control-label">State</label>
                        <span className="help-block">{this.state.user.validate.state_id.message}</span>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className={this.state.user.validate.city_id.isValid ? 'form-group' : 'form-group has-error'}>
                         <Select
                              name="city_id"
                              className="custom-select"
                              value = {this.state.user.detail.city_id}
                              clearable={false}
                              placeholder="Select City"
                              onChange={(value, name) => this.handleSelectChange(value, 'city_id')}
                              options={utilityHelper.getCities(this.props.cities)}
                            />
                        <label className="control-label">City</label>
                        <span className="help-block">{this.state.user.validate.city_id.message}</span>
                      </div>
                    </div>
                    
                    <div className={this.state.user.doc_other_city_visible ? 'col-md-4' : 'col-md-4 hide'}>
                        <div className="form-group">
                            <input type="text" className="form-control" name="doc_other_city" onChange={ this.handleChange }  value={ this.state.user.detail.doc_other_city } />
                            <label className="control-label">Other City</label>
                        </div>
                    </div>
                    <div className="col-md-4">
                      <div className={this.state.user.validate.doc_pincode.isValid ? 'form-group' : 'form-group has-error'}>
                        <input type="text" className="form-control" name="doc_pincode" onChange={ this.handleChange } value={this.state.user.detail.doc_pincode}/>
                        <label className="control-label">Pincode</label>
                        <span className="help-block">{this.state.user.validate.doc_pincode.message}</span>
                      </div>
                    </div>
                    <div className='col-md-6'>
                        <div className={this.state.user.validate.doc_facebook_url.isValid ? 'form-group' : 'form-group has-error'}>
                            <input type="text" className="form-control" placeholder="Facebook page url" name="doc_facebook_url" onChange={ this.handleChange }  value={ this.state.user.detail.doc_facebook_url } />
                            <label className="control-label">Facebook</label>
                            <span className="help-block">{this.state.user.validate.doc_facebook_url.message}</span>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Twitter page url" name="doc_twitter_url" onChange={ this.handleChange }  value={ this.state.user.detail.doc_twitter_url } />
                            <label className="control-label">Twitter</label>
                        </div>
                    </div>
                    <div className="clearfix">
                    </div>
                    <div className='col-md-6'>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Google page url" name="doc_google_url" onChange={ this.handleChange }  value={ this.state.user.detail.doc_google_url } />
                            <label className="control-label">Google</label>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Google page url" name="doc_linkedin_url" onChange={ this.handleChange }  value={ this.state.user.detail.doc_linkedin_url } />
                            <label className="control-label">Linkedin</label>
                        </div>
                    </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button className="btn text-btn red" onClick={this.handleClose.bind(null, false)}>Close</Button>
                <Button className="btn text-btn green" onClick={this.handleSubmit} disabled={this.props.successMessage ? true : false}>Save</Button>
              </Modal.Footer>
            </Modal>
          </div>
        );
    }
}

/**
 * @DateOfCreation        22 May 2018
 * @ShortDescription      connect state to props on reducer and get state for profile
 * @return                profile detail
 */
function mapStateToProps(state) {
    const { isUserNotValid, sendingRequest, successMessage} = state.doctorProfile;
    const { country, states, cities } = state.region;
    return {
        isUserNotValid,
        sendingRequest,
        successMessage,
        states,
        cities,
        country
    };
}
const connectedDoctorBasicInfoEdit = connect(mapStateToProps)(DoctorBasicInfoEdit);
export { connectedDoctorBasicInfoEdit as DoctorBasicInfoEdit };
