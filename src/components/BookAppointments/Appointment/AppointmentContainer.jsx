/**
 * DoctorAppointmentContainer
 *
 * @package                SafeHealth
 * @subpackage             DoctorAppointmentContainer
 * @category               Container Component
 * @DateOfCreation         11 May 2018
 * @ShortDescription       This component is reponsible for booking a doctor appointment
 */
import React from "react";
import StepZilla from 'react-stepzilla';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import { Button, Modal } from 'react-bootstrap';
import { utilityHelper } from '../../../_helpers';
import { appointmentActions } from './appointmentActions';
import { doctorDetailActions } from '../DoctorDetails/doctorDetailActions';
import { doctorListingActions } from '../../DoctorListing/doctorListingActions';
import { appointmentValidator } from './appointmentValidator';
import { Appointment } from './Appointment';
import { appointmentConstants } from './appointmentConstants';

const initialState = {
            appointment : {
                detail : {
                    'booking_id'     : '',
                    'booking_reason' : '',
                    'user_id'        : '',
                    'clinic_id'      : '',
                    'timing_id'      : '',
                    'booking_date'   : '',
                    'booking_time'   : '',
                    'payment_mode'   : true,
                    'is_profile_visible'   : 2,
                },
                validate : {
                    booking_id     : { isValid : true, message : '' },
                    user_id        : { isValid : true, message : '' },
                    clinic_id      : { isValid : true, message : '' },
                    timing_id      : { isValid : true, message : '' },
                    booking_date   : { isValid : true, message : '' },
                    booking_time   : { isValid : true, message : '' },
                    booking_reason : { isValid : true, message : '' },
                    payment_mode   : { isValid : true, message : '' },
                    is_profile_visible   : { isValid : true, message : '' },
                },
                isUserNotValid : false,
            }
    }
class AppointmentContainer extends React.Component {
    /**
     * @DateOfCreation        13 July 2018
     * @ShortDescription      Contructor is responsible to function declaration and define intial state
     * @param                 props
     * @return                Nothing
     */
    constructor(props, context) {
        super(props, context);
        this.state = {
            appointment : {
                detail : {
                    'booking_id'     : '',
                    'booking_reason' : '',
                    'user_id'        : '',
                    'clinic_id'      : '',
                    'timing_id'      : '',
                    'booking_date'   : '',
                    'booking_time'   : '',
                    'is_profile_visible'   : 2,
                },
                validate : {
                    booking_id     : { isValid : true, message : '' },
                    user_id        : { isValid : true, message : '' },
                    clinic_id      : { isValid : true, message : '' },
                    timing_id      : { isValid : true, message : '' },
                    booking_date   : { isValid : true, message : '' },
                    booking_time   : { isValid : true, message : '' },
                    booking_reason : { isValid : true, message : '' },
                    payment_mode   : { isValid : true, message : '' },
                    is_profile_visible   : { isValid : true, message : '' },
                },
                isUserNotValid : false,
            },
            doctorDetail : {
                    'title'             : 'Dr.',
                    'user_firstname'    : '',
                    'user_lastname'     : '',
                    'doc_deg_name'      : '',
                    'doc_spac_string'   : '',
                    'doc_address_line1' : '',
                    'doc_address_line2' : '',
                    'doc_pincode'       : '',
                    'doc_profile_img'   : '',
                    'doc_rating'        : '',
                    'doc_review_count'  : '',
            },
            currentDetail : '',
            addAppointmentShowConfirm : false,
        };
        this.handleClose            = this.handleClose.bind(this);
        this.handleSelectChange     = this.handleSelectChange.bind(this);
        this.handleSave             = this.handleSave.bind(this);
        this.checkValidation        = this.checkValidation.bind(this);
        this.refreshBookingSlots    = this.refreshBookingSlots.bind(this);
        this.handleCheckboxChange   = this.handleCheckboxChange.bind(this);
        this.confirmAddAppointmentShow   = this.confirmAddAppointmentShow.bind(this);
    }

    

    /**
     * @DateOfCreation        13 July 2018
     * @ShortDescription      This function is responsible to handle close add appointment modal
     * @return                Nothing
     */
    handleClose() {
        const { dispatch } = this.props;
        dispatch(appointmentActions.updateState());
        dispatch(doctorDetailActions.resetState());
        this.setState(initialState);
        this.props.addAppointmentHideHandle();
    }

     /**
    * @DateOfCreation        13 July 2018
    * @ShortDescription      This function is responsible to handle changes in Select state
    * @param                 Event Object
    * @return                Nothing
    */
    handleSelectChange(selectedOption, name) {
        const { detail, validate } = this.state.appointment;
        this.setState({
            appointment : {
                detail : {
                    ...detail,
                    [name] : String(selectedOption.value)
                },
                validate : {
                    ...validate,
                    [name] : {
                        isValid : true,
                        message : ''
                    }
                },
            }
        });
    }
    
    /**
    * @DateOfCreation        13 July 2018
    * @ShortDescription      This function is responsible to handle changes in Checkbox state
    * @param                 Event Object
    * @return                Nothing
    */
    handleCheckboxChange(event){
        const { name } = event.target;
        const { detail, validate } = this.state.appointment;
        var checked = event.target.checked;
        if(name == 'is_profile_visible'){
            if(checked == true){
                checked = appointmentConstants.APT_IS_PROFILE_VISIBLE_YES;
            }else{
                checked = false;
            }
        }
        this.setState({
            appointment : {
                validate : {
                    ...validate,
                    [name] : {
                        isValid : true,
                        message : ''
                    }
                },
                detail : {
                    ...detail,
                    [name] : checked
                }
            }
        });
    }
   
    /**
     * @DateOfCreation        13 July 2018
     * @ShortDescription      This function is responsible to add appointment detail.
     * @return                Nothing
     */ 
    handleSave() {
        const { detail } = this.state.appointment;
        const { dispatch } = this.props;
        dispatch(appointmentActions.appointmentStore(detail));
    }

    /**
     * @DateOfCreation        13 July 2018
     * @ShortDescription      This function is responsible to add appointment detail.
     * @return                Nothing
    */
    checkValidation(step) {
        if(appointmentValidator.isAppointmentValid(this,step)){
            return true;
        }
        return false;
    }

    /**
     * @DateOfCreation      13 Aug 2018
     * @ShortDescription    This function is responsible to Confirm adding appointment is a 
                            patient already booked for the same day..
     * @return              Nothing
    */
    confirmAddAppointmentShow(confirm) {
        if(confirm == true){
            this.setState({
                addAppointmentShowConfirm : false,
            });
        }else{
            this.handleClose();
        }
    }

    refreshBookingSlots(){
        const { dispatch } = this.props;
        const { detail } = this.state.appointment;
        if(this.props.isSourceListing){
            dispatch(doctorListingActions.getTimeSlot(detail.clinic_id,detail.booking_date,detail.booking_time));
        }else{   
            dispatch(doctorDetailActions.getBookingSlot(detail.clinic_id,detail.user_id,detail.booking_date,detail.booking_time));
        }
    }

    

    /**
     * @DateOfCreation          14 July 2018
     * @ShortDescription        This function is responsible to reset appointment section after 
                                successful saving the appointment view.
     * @return                  Nothing
     */
    componentWillReceiveProps(newProps) {
        const { detail, validate } = this.state.appointment;
        let appointmentDetail = newProps.appointmentDetail;
       
        for(var k in appointmentDetail){
          this.state.appointment.detail[k]=appointmentDetail[k] != null ? appointmentDetail[k] : '';
        }
        const appointmentState = this.state.appointment;
        this.setState({
            doctorDetail : newProps.doctorDetail,
            currentDetail : appointmentState.detail,
        }); 
        
        if(newProps.isInsertDone == true || newProps.slotAvailable == false) {
            this.refreshBookingSlots();
            setTimeout(function() {
                this.handleClose()
            }.bind(this), 2000);
        }else{
            if(newProps.slotAvailable == appointmentConstants.PATIENT_ALREADY_BOOKED_DAY && newProps.submitted != true){
                this.setState({
                    addAppointmentShowConfirm : true,
                });
            }else if(newProps.slotAvailable == true){
                this.setState({
                    addAppointmentShowConfirm : false,
                });
            }
            if(!newProps.errorMsg){
                this.setState(initialState);
            }
        }
    }

    render() {
        
        return (
            <div>
                <Appointment
                    addAppointmentShowHandle = { this.props.addAppointmentShowHandle }
                    handleSelectChange   = { this.handleSelectChange }
                    payload              = { this.state.appointment }
                    handleClose          = { this.handleClose }
                    handleSave           = { this.handleSave }
                    loader               = { this.props.loader }
                    message              = { this.props.successMessage }
                    errorMsg             = { this.props.errorMsg }
                    isInsertDone         = { this.props.isInsertDone }
                    submitted            = { this.props.submitted }
                    checkValidation      = { this.checkValidation }
                    handleCheckboxChange = { this.handleCheckboxChange }
                    doctorDetail         = { this.state.doctorDetail }
                    doctorClinic         = { this.props.doctorClinic}
                    currentDetail        = { this.state.currentDetail }
                    slotAvailable        = { this.props.slotAvailable }
                    unavailableMsg       = { this.props.unavailableMsg }
                    confirmAddAppointmentShow = { this.confirmAddAppointmentShow }
                    addAppointmentShowConfirm = { this.state.addAppointmentShowConfirm }
                    appointmentReason    = { this.props.appointmentReason}
                />
            </div>
        );
    }
}

/**
 * @DateOfCreation        13 July 2018
 * @ShortDescription      connect state to props on reducer and get state for add Appointment
 * @param Object state    All the state has come from reducer
 * @return  object        Appointment list, sending request message and success message
 */
function mapStateToProps(state) {
    const { successMessage, sendingRequest, submitted, appointmentList, errorMsg, payment_section, isUserNotValid, loader } = state.appointment;
    const isInsertDone = state.appointment.isInsertDone;
    const { slotAvailable, unavailableMsg } = state.doctorDetail;
    return {
        successMessage,
        errorMsg,
        sendingRequest,
        isInsertDone,
        submitted,
        appointmentList,
        payment_section,
        isUserNotValid,
        loader,
        slotAvailable,
        unavailableMsg,
    };
}

const connectedAppointmentContainer = connect(mapStateToProps)(AppointmentContainer);
export { connectedAppointmentContainer as AppointmentContainer }; 