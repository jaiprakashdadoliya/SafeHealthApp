import React from "react";
import { connect } from 'react-redux';
import Loadable from 'react-loadable';
import { Loading } from './../../../global';
import { appointmentsActions } from '../appointmentsActions';
import { configConstants } from '../../../_constants';
import { calendarActions } from '../../Calendar/calendarActions';
import { confirmAlert } from 'react-confirm-alert';

const TodaysAppointments = Loadable({
    loader: () => import('./TodaysAppointments').then(object => object.TodaysAppointments),
    loading: Loading
});

class TodaysAppointmentsContainer extends React.Component {
  /**
   * @DateOfCreation        30 july 2018
   * @ShortDescription      Contructor is responsible to function declaration
   * @param                 props
   * @return                Nothing
   */
  constructor(props, context) {
      super(props, context);
      this.deleteTodayAppointment = this.deleteTodayAppointment.bind(this);
  }

  /**
   * @DateOfCreation        30 july 2018
   * @ShortDescription      This function is responsible to fatch appointment list
   * @return                Nothing
   */
  componentDidMount(){
    const { dispatch } = this.props;
    dispatch(appointmentsActions.todaysAppointments());
  }

  /**
   * @DateOfCreation        11 Oct 2018
   * @ShortDescription      This function is responsible to delete today's appointment
   * @return                Nothing
   */
  deleteTodayAppointment(id, time){
      confirmAlert({
          title: 'Appointment',
          message: 'Are you sure you want to delete this Appointment?',
          buttons: [
          {
            label: 'Yes',
            onClick: () => {
                const {dispatch} = this.props;
                let extra = {};
                extra['booking_id'] = id;
                extra['slot_time'] = time;
                dispatch(calendarActions.getDeleteRequest(extra));
            }
          },
          {
            label: 'No',
            onClick: () => {return false;}
          }
          ]
      })
  }

  /**
   * @DateOfCreation        30 july 2018
   * @ShortDescription      pass all required detail for display Appointment list
   * @return                Nothing
   */
  render() {
      return (
          <TodaysAppointments 
              todaysappointments     = {this.props.todaysappointments}
              sendingRequest         = {this.props.sendingRequest}
              handleRedirect         = {this.props.handleRedirect}
              deleteTodayAppointment = {this.deleteTodayAppointment}
          />
      );
  }
}

/**
* @DateOfCreation        30 july 2018
* @ShortDescription      This function is responsible to connect store to props
* @return                View
*/
function mapStateToProps(state) {
    const {todaysappointments, sendingRequest} = state.appointments;
    return {
        todaysappointments,
        sendingRequest,
    };
}

const connectedTodaysAppointmentsContainer = connect(mapStateToProps)(TodaysAppointmentsContainer);
export { connectedTodaysAppointmentsContainer as TodaysAppointmentsContainer }; 