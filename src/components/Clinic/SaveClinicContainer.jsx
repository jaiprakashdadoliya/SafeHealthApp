import React from "react";
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { utilityHelper } from '../../_helpers';
import { clinicActions } from '../../_actions';
import { clinicValidator } from '../../_validator';
import { SaveClinic } from './SaveClinic';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from '../../_packages/react-places-autocomplete';
class SaveClinicContainer extends React.Component {
  /**
     * @DateOfCreation        13 June 2018
     * @ShortDescription      Contructor is responsible to function declaration and define intial state
     * @param                 props
     * @return                Nothing
     */
    constructor(props, context) {
        super(props, context);
        this.state              = this.initialState;
        this.handleClose        = this.handleClose.bind(this);
        this.handleChange       = this.handleChange.bind(this);
        this.handleSave         = this.handleSave.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    get initialState() {
        return {
            clinic : {
                detail : {
                    'clinic_id'            : '',
                    'clinic_name'          : '',
                    'clinic_phone'          : '',
                    'clinic_address_line1' : '',
                    'clinic_address_line2' : '',
                    'clinic_landmark'       : '',
                    'clinic_pincode'       : ''
                },
                validate : {
                    clinic_name          : { isValid : true, message : '' },
                    clinic_phone          : { isValid : true, message : '' },
                    clinic_address_line1 : { isValid : true, message : '' },
                    clinic_address_line2 : { isValid : true, message : '' },
                    clinic_landmark       : { isValid : true, message : '' },
                    clinic_pincode       : { isValid : true, message : '' }
                }
            },
            title : 'Add Clinic',
        }
    }

    /**
     * @DateOfCreation        13 June 2018
     * @ShortDescription      This function is responsible to handle close add/edit clinic modal
     * @return                Nothing
     */
    handleClose() {
        const { dispatch } = this.props;
        dispatch(clinicActions.resetState());
        this.setState(this.initialState);
        this.props.saveClinicHideHandle();
    }

    /**
     * @DateOfCreation        13 June 2018
     * @ShortDescription      This function is responsible to set state for onchange on view page
     *                         so we can type in form.
     * @return                Nothing
     */
    handleChange(event) {
        const { name, value } = event.target;
        const { detail, validate } = this.state.clinic;
        this.setState({
            clinic : {
                validate : {
                    ...validate,
                    [name] : {
                        isValid : true,
                        message : ''
                    }
                },
                detail : {
                    ...detail,
                    [name] : value
                }
            }
        });
    }

    /**
     * @DateOfCreation        13 June 2018
     * @ShortDescription      This function is responsible to save clinic detail.
     * @return                Nothing
     */ 
    handleSave() {
        if(clinicValidator.isClinicValid(this)) {
            const { detail } = this.state.clinic;
            const { dispatch } = this.props;
            dispatch(clinicActions.clinicSave(detail, this.props.clinicList));
        }
    }

    /**
     * @DateOfCreation        14 June 2018
     * @ShortDescription      This function is responsible to show clinic detail on edit clinic view.
     * @return                Nothing
     */
    componentWillReceiveProps(newProps) {
        if(newProps.isClinicSaved == true) {
            setTimeout(function() { 
                this.handleClose();
            }.bind(this), 2000);
        }else{
            if(newProps.clinicEditDetail.clinic_id) {
                this.setState({
                    clinic : {
                        detail : {
                            'clinic_id'   : newProps.clinicEditDetail.clinic_id,
                            'clinic_name' : newProps.clinicEditDetail.clinic_name,
                            'clinic_phone' : newProps.clinicEditDetail.clinic_phone,
                            'clinic_address_line1' : newProps.clinicEditDetail.clinic_address_line1,
                            'clinic_address_line2' : newProps.clinicEditDetail.clinic_address_line2,
                            'clinic_landmark' : newProps.clinicEditDetail.clinic_landmark,
                            'clinic_pincode' : newProps.clinicEditDetail.clinic_pincode
                        },
                        validate : {
                            clinic_name : { isValid:true, message : '' },
                            clinic_phone : { isValid:true, message : '' },
                            clinic_address_line1 : { isValid:true, message : '' },
                            clinic_address_line2 : { isValid:true, message : '' },
                            clinic_landmark : { isValid:true, message : '' },
                            clinic_pincode : { isValid:true, message : '' },
                        }
                    },
                    title : 'Edit Clinic',
                });
            }else{
                if(!newProps.errorMsg){
                    this.setState(this.initialState);
                }
            }
        }
    }

      /**
   * @DateOfCreation        2 aug 2018
   * @ShortDescription      This function is responsible to handle changes in Select google address
   * @param                 Event Object
   * @return                Nothing
   */
  handleAddressChange(address){
     const { detail,validate } = this.state.clinic;
         this.setState({
          clinic:{
            detail:{
              ...detail,
              clinic_address_line1: address,
            },
            validate:{
                ...validate,
                clinic_address_line1: {
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
    const { detail,validate } = this.state.clinic;
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(fullAddress =>{
            this.setState({
              clinic:{
                detail:{
                  ...detail,
                  clinic_address_line1: address,
                  clinic_latitude:fullAddress.lat,
                  clinic_longitude:fullAddress.lng
                },
                validate:{
                    ...validate
                }
              }
            })
      })
      .catch(error => console.error('Error', error));
  };

    /**
     * @DateOfCreation        13 June 2018
     * @ShortDescription      This function is responsible to include add/edit clinic view.
     * @return                Nothing
     */ 
    render() {
        return (
            <div>
                <SaveClinic
                    handleChange       = { this.handleChange }
                    handleSelectChange = { this.handleSelectChange }
                    saveClinicShow     = { this.props.saveClinicShow }
                    payload            = { this.state.clinic }
                    handleClose        = { this.handleClose }
                    handleSave         = { this.handleSave }
                    message            = { this.props.successMessage }
                    errorMsg           = { this.props.errorMsg }
                    title              = { this.state.title }
                    isClinicSaved      = { this.props.isClinicSaved }
                    submitted          = { this.props.submitted }
                    handleAddressChange= { this.handleAddressChange }
                    handleSelect       = { this.handleSelect }

                />
            </div>
        );
    }
}

/**
 * @DateOfCreation        13 June 2018
 * @ShortDescription      connect state to props on reducer and get state for add/edit Clinic
 * @param Object state    All the state has come from reducer
 * @return  object        Clinic list, sending request message and success message
 */
function mapStateToProps(state) {
    const { successMessage, sendingRequest, submitted, clinicList, errorMsg } = state.clinic;
    const isClinicSaved = state.clinic.isClinicSaved;

    return {
        successMessage,
        errorMsg,
        sendingRequest,
        isClinicSaved,
        submitted,
        clinicList
    };
}

const connectedSaveClinicContainer = connect(mapStateToProps)(SaveClinicContainer);
export { connectedSaveClinicContainer as SaveClinicContainer }; 
