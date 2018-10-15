/**
 * BookingsContainer
 *
 * @package                SafeHealth
 * @subpackage             BookingsContainer
 * @category               Container Component
 * @DateOfCreation         11 May 2018
 * @ShortDescription       This component is reponsible for logic in awards
 */
import React from "react";
import { connect } from 'react-redux';
import { Bookings } from "./Bookings";
import { doctorDetailActions } from '../DoctorDetails/doctorDetailActions';
import { configConstants } from '../../../_constants';
import { utilityHelper } from '../../../_helpers';
import { Loading } from '../../../global';
import { appointmentActions } from '../Appointment/appointmentActions';
class BookingsContainer extends React.Component {

  /**
   * @DateOfCreation        16 july 2018
   * @ShortDescription      Contructor is responsible to function declaration
   * @param                 props
   * @return                Nothing
   */
  constructor(props, context) {
    super(props, context);

    this.addAppointmentShowHandle = this.addAppointmentShowHandle.bind(this);
    this.addAppointmentHideHandle = this.addAppointmentHideHandle.bind(this);
    this.previousSlot = this.previousSlot.bind(this);
    this.nextSlot = this.nextSlot.bind(this);
    this.nextAvailableSlot = this.nextAvailableSlot.bind(this);
    this.doctorAlertShowHandle  = this.doctorAlertShowHandle.bind(this);
    this.doctorAlertHideHandle = this.doctorAlertHideHandle.bind(this);
    this.state = {
      addAppointmentShowHandle: false,
      doctorAlert             : false,
      doctorClinic: '',
      doctorDetail: '',
      appointmentDetail : {
                'user_id' : '',
                'clinic_id' : '',
                'timing_id' : '',
                'booking_date' : '',
                'booking_time' : '', 
                'clinic_address':'',
            },
    };
  }

  /**
   * @DateOfCreation        18 july 2018
   * @ShortDescription      This function is responsible to handle show appointment model
   * @return                Nothing
   */
  addAppointmentShowHandle(detail, slot,clinic_address) {
      let loginAcess = utilityHelper.getLoginAccessToken();
      if(loginAcess){
        let userType = utilityHelper.getUserInfo().user_type;
        let userId = utilityHelper.getUserInfo().user_id;
        if(userType == configConstants.USER_TYPE_PATIENT){
          var detailArray = detail;
          const { dispatch } = this.props;
          dispatch(doctorDetailActions.isSlotAvailable(detailArray.timing_id, detailArray.date, slot, userId));
          dispatch(appointmentActions.getAppointmentReasons(detail.user_id));
          this.setState({ 
              appointmentDetail : {
                      'user_id'       : detailArray.user_id,
                      'clinic_id'     : detailArray.clinic_id,
                      'timing_id'     : detailArray.timing_id,
                      'booking_date'  : detailArray.date,
                      'booking_time'  : slot, 
                      'clinic_address': clinic_address,
              },
              addAppointmentShowHandle: true,

          });
        }else{
          this.doctorAlertShowHandle();
        }
      }else{
        const { dispatch } = this.props;
        dispatch(doctorDetailActions.loginShowHandle());
      }
    }

   /**
    * @DateOfCreation        26 Sep 2018
    * @ShortDescription      This function is responsible to handle hide Doctor alert model
    * @return                Nothing
    */
    doctorAlertShowHandle() {
        this.setState({ doctorAlert: true });
    }
    /**
    * @DateOfCreation        26 Sep 2018
    * @ShortDescription      This function is responsible to handle hide Doctor alert model
    * @return                Nothing
    */
    doctorAlertHideHandle() {
        this.setState({ doctorAlert: false });
    }
  /**
   * @DateOfCreation        16 july 2018
   * @ShortDescription      This function is responsible to handle hide appointment model
   * @return                Nothing
   */
  addAppointmentHideHandle() {
    this.setState({ addAppointmentShowHandle: false });
  }

  /**
   * @DateOfCreation        16 july 2018
   * @ShortDescription      This function is responsible to handle set state of doctor clinic detail
   * @return                Nothing
   */
  componentWillReceiveProps(nextProps){
    const {doctorClinic,timing} = this.state;
     this.setState({
          doctorDetail: nextProps.doctorDetail,
        })
    if(nextProps.fetchDone){

        var updatedDoctorClinic = 
                doctorClinic.length > 0 ? doctorClinic.map((clinic, index) =>{
                    nextProps.bookingDetail.map((timeslot, slotIndex)=>{
                            if(clinic.clinic_id == timeslot.clinic_id)
                            {
                                clinic.timing = [];
                                clinic.timing.push(timeslot);
                            }
                        });
                        return clinic;
                }) : [];
        this.setState({
          doctorClinic: updatedDoctorClinic
        })
        
    }else{
        this.setState({
          doctorClinic: nextProps.doctorClinic
        })
    }
  }

 /**
  * @DateOfCreation        16 july 2018
  * @ShortDescription      This function is responsible to handle previous timeslot
  * @return                Nothing
  */
  previousSlot(clinicTiming){
    var clinicId = clinicTiming['clinic_id'];
    var userId = clinicTiming['user_id'];
    var slotDate = clinicTiming['date'];
    const { dispatch } = this.props;
    dispatch(doctorDetailActions.getBookingSlot(clinicId,userId, slotDate, configConstants.PREVIOUS_SLOT));
    
  }

   /**
  * @DateOfCreation        16 july 2018
  * @ShortDescription      This function is responsible to handle next timeslot
  * @return                Nothing
  */
  nextSlot(clinicTiming){
    var clinicId = clinicTiming['clinic_id'];
    var userId = clinicTiming['user_id'];
    var slotDate = clinicTiming['date'];
    const { dispatch } = this.props;
    dispatch(doctorDetailActions.getBookingSlot(clinicId,userId, slotDate, configConstants.NEXT_SLOT));
    
  }

  /**
  * @DateOfCreation        24 July 2018
  * @ShortDescription      This function is responsible to handle availability slots
  * @return                Nothing
  */
  nextAvailableSlot(clinicTiming){
    var clinicId = clinicTiming['clinic_id'];
    var userId = clinicTiming['user_id'];
    var slotDate = clinicTiming['date'];
    const { dispatch } = this.props;
    dispatch(doctorDetailActions.getBookingSlot(clinicId,userId, slotDate, ''));
  }
  


  /**
   * @DateOfCreation        16 july 2018
   * @ShortDescription      pass all required detail for display booking list
   * @return                Nothing
   */
  render() {
    if(this.state.doctorClinic != undefined){
      return(
              <Bookings
                  doctorClinic             = {this.state.doctorClinic}
                  previousSlot             = {this.previousSlot}
                  nextSlot                 = {this.nextSlot}
                  addAppointmentShowHandle = {this.addAppointmentShowHandle}
                  addAppointmentHideHandle = {this.addAppointmentHideHandle}
                  addAppointmentShow       = {this.state.addAppointmentShowHandle}
                  appointmentDetail        = {this.state.appointmentDetail}
                  doctorDetail             = {this.state.doctorDetail}
                  nextAvailableSlot        = {this.nextAvailableSlot}
                  appointmentReason        = {this.props.appointmentReason}
                  doctorAlertHideHandle    = {this.doctorAlertHideHandle}
                  doctorAlert              = {this.state.doctorAlert}
              />) 
      }else{  
        return(<Loading/>)
      }
    }

}

/**
* @DateOfCreation        16 july 2018
* @ShortDescription      This function is responsible to connect store to props
* @return                View
*/
function mapStateToProps(state) {
    const {bookingDetail, fetchDone} = state.doctorDetail;
    const { appointmentReason } = state.appointment;
    return {
       bookingDetail,
       fetchDone,
       appointmentReason
    };
}

const connectedBookingsContainer = connect(mapStateToProps)(BookingsContainer);
export { connectedBookingsContainer as BookingsContainer }; 


