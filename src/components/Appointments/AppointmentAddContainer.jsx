/**
 * AppointmentAddContainer
 *
 * @package                SafeHealth
 * @subpackage             AppointmentAddContainer
 * @category               Container Component
 * @DateOfCreation         15 May 2018
 * @ShortDescription       This component is reponsible for add/edit award
 */
import React from "react";
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import moment from 'moment';
import { utilityHelper } from '../../_helpers';
import { configConstants } from '../../_constants';
import { appointmentsActions } from './appointmentsActions';
import { appointmentActions } from '../BookAppointments/Appointment/appointmentActions'
import { appointmentsValidator } from './appointmentsValidator';
import { AppointmentAdd } from "./AppointmentAdd";
class AppointmentAddContainer extends React.Component {

    /**
     * @DateOfCreation        24 May 2018
     * @ShortDescription      Contructor is responsible to function declaration and define intial state
     * @param                 props
     * @return                Nothing
     */
    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.formattedDate = false;   
        this.findObjectByKey = this.findObjectByKey.bind(this); 
        this.state = this.initialState;

        this.submitAppointment = this.submitAppointment.bind(this);
    }

    get initialState(){
        return {
            appointment:{
                detail : {
                  'pat_id'      : '',
                  'booking_date': '',
                  'clinic_id'   : '',
                  'booking_time': '',
                  'timing_id'   : '',
                  'booking_reason': '',
                },
                validate : {
                    pat_id : { isValid : true, message : '' },
                    booking_date : { isValid : true, message : '' },
                    clinic_id : { isValid : true, message : '' },
                    booking_time : { isValid : true, message : '' },
                    booking_reason : { isValid : true, message : '' },
                },
                bookingPatient:'',
                bookingClinic:'',
                bookingAppointmentTime:''
          }
        };
    }

    /**
     * @DateOfCreation        24 May 2018
     * @ShortDescription      This function is responsible to handle close add/edit award modal
     * @return                Nothing
     */
    handleClose() {
        const { dispatch } = this.props;
        this.setState(this.initialState);
        this.props.appointmentAddHideHandle();
        dispatch(appointmentsActions.resetState());
    }

    /**
     * @DateOfCreation        24 May 2018
     * @ShortDescription      This function is responsible to set state for onchange on view page
     *                         so we can type in form.
     * @return                Nothing
     */
    handleChange(date,name) {
        const { detail, validate } = this.state.appointment;
        const { dispatch } = this.props;
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
                    [name] : date
                }
            }
        }, function(){
            var submitData = {'clinic_id': this.state.appointment.detail.clinic_id, 'appointmentDate':this.state.appointment.detail.booking_date};
            dispatch(appointmentsActions.getAppointmentTimeListing(submitData));
        });
    }

   /**
    * @DateOfCreation        24 May 2018
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
                    [name] : selectedOption.value
                },
                validate : {
                    ...validate,
                    [name] : {
                        isValid : true,
                        message : ''
                    }
                },
            }
        },function () {
            if(name == "booking_time"){
                this.props.appointmentTimeSlot.map((result) => {
                    this.findObjectByKey(result, 'slot_time', selectedOption.value);
                })
            }
        });
    }
    findObjectByKey(timeSlots, key, value) {
       const { detail, validate }  = this.state.appointment;
        var timing_id = timeSlots.timing_id;
        for (var i = 0; i < timeSlots.slot.length; i++) {
            if (timeSlots.slot[i][key] === value) {
                this.setState({
                    appointment: {
                        detail: {
                         ...detail,
                        timing_id : timing_id
                        },
                        validate: {
                            ...validate
                        }
                    }
                })
            }
        }
    }
     /**
     * @DateOfCreation        9 Aug 2018
     * @ShortDescription      This function is responsible to submit fx form data
     * @return                Nothing
     */
    submitAppointment() {
        if(appointmentsValidator.isAppointmentValid(this)) {
            const { dispatch } = this.props;
            let details=this.state.appointment.detail;
            dispatch(appointmentsActions.appointmentSave(details));
        }
    }

    /**
     * @DateOfCreation        9 Aug 2018
     * @return                Nothing
     */
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(appointmentsActions.getBookingPatient());
        dispatch(appointmentsActions.getAppointmentClinicListing());
        dispatch(appointmentActions.getAppointmentReasons());
    }
    
    /**
     * @DateOfCreation        9 Aug 2018
     * @ShortDescription      This function is responsible to set country,state,city data
     * @return                Nothing
     */
    componentWillReceiveProps(props) {
        // set appointment clinic listing
        if(props.isPatientBookingFetched && props.bookingPatient!=undefined){
            let listingData = [];
            props.bookingPatient.map((patient,index)=>{
                patient = {
                    label : patient.user_firstname+' '+patient.user_lastname,
                    value : patient.user_id
                }
                listingData.push(patient);
            })

            this.setState({
                    bookingPatient: listingData
                }
            );     
        }


        // set appointment clinic listing
        if(props.isClinicFatched){
             let listingData = utilityHelper.getDataConvertToOptionType(props.bookingClinic, 'label', 'value');
            this.setState({
                    bookingClinic: listingData
                }
            );     
        }

        // set appointment time listing
        if(props.isTimeListingFatched){
            let listData = utilityHelper.visitAppointmentTimeListingOption(props.appointmentTimeSlot);
            this.setState({
                bookingAppointmentTime: listData,
                timing_id : props.appointmentTimeSlot.timing_id,
            });            
        }

        if(props.isInsertDone){
            dispatch(appointmentsActions.todaysAppointments());
            setTimeout(function(){
                this.handleClose();
            }.bind(this),2000);
        }        
    } 
    
    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to redirect unauthorise users
    * @return                Redirect
    */
    componentDidUpdate(){
        const { dispatch }  = this.props;
        if(this.props.isUserNotValid){
           dispatch(headerActions.logout());
        }
    }

    render() {
        return (
            <div>
                <AppointmentAdd
                    submitAppointment       = {this.submitAppointment}
                    errorMsg                = {this.props.errorMsg}
                    successMsg              = {this.props.successMsg}
                    isInsertDone            = {this.props.isInsertDone}
                    appointmentTimeSlot     = {this.props.appointmentTimeSlot}     
                    user_type               = {this.props.user_type }
                    submitted               = {this.props.submitted }  
                    appointmentAddShow      = {this.props.appointmentAddShow}   
                    handleClose             = {this.handleClose} 
                    bookingPatient          = {this.state.bookingPatient}
                    bookingClinic           = {this.state.bookingClinic}
                    bookingAppointmentTime  = {this.state.bookingAppointmentTime}
                    appointment             = {this.state.appointment}
                    handleSelectChange      = {this.handleSelectChange}
                    handleChange            = {this.handleChange}
                    sendingRequest          = {this.props.sendingRequest}
                    appointmentReason       = {this.props.appointmentReason}

                />
            </div>
        );
    }
}

/**
 * @DateOfCreation        24 May 2018
 * @ShortDescription      connect state to props on reducer and get state for add/edit Award
 * @param Object state    All the state has come from reducer
 * @return  object        Awards list, sending request message and success message
 */
function mapStateToProps(state) {
    const { successMsg, sendingRequest, submitted, bookingPatient,isPatientBookingFetched,bookingClinic,isClinicFatched,isTimeListingFatched,appointmentTimeSlot, errorMsg,isInsertDone } = state.appointments;
    const { appointmentReason } = state.appointment;
    return {
        successMsg,
        sendingRequest,
        submitted,
        bookingPatient,
        isPatientBookingFetched,
        bookingClinic,
        isClinicFatched,
        isTimeListingFatched,
        appointmentTimeSlot,
        errorMsg,
        isInsertDone,
        appointmentReason
    };
}

const connectedAppointmentAddContainer = connect(mapStateToProps)(AppointmentAddContainer);
export { connectedAppointmentAddContainer as AppointmentAddContainer }; 