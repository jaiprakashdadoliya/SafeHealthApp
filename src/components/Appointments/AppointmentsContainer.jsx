import React from "react";
import { connect } from 'react-redux';
import Loadable from 'react-loadable';
import { Loading } from './../../global';
import { appointmentsActions } from './appointmentsActions';
import {patientAllVisitActions} from '../PatientAllVisit/patientAllVisitActions';
import { utilityHelper } from '../../_helpers';
import { dataConstants, configConstants } from '../../_constants';
import { confirmAlert } from 'react-confirm-alert';

const Appointments = Loadable({
  loader: () => import('./Appointments').then(object => object.Appointments),
  loading: Loading
});

const PatientAppointments = Loadable({
  loader: () => import('./PatientAppointments').then(object => object.PatientAppointments),
  loading: Loading
});

class AppointmentsContainer extends React.Component {
  /**
   * @DateOfCreation        30 july 2018
   * @ShortDescription      Contructor is responsible to function declaration
   * @param                 props
   * @return                Nothing
   */
  constructor(props, context) {
    super(props, context);
    this.getAppointmentsList = this.getAppointmentsList.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.fetchAnotherData = this.fetchAnotherData.bind(this);
    this.appointmentAddShowHandle = this.appointmentAddShowHandle.bind(this);
    this.appointmentAddHideHandle = this.appointmentAddHideHandle.bind(this);
    this.appointmentSearch        = this.appointmentSearch.bind(this);
    this.newVisit  = true;
    this.isPending = false;
    this.booking_id = '';
    this.patId = '';
    this.state = {
      date:'',
      page:'',
      pageSize:'',
      filterAll : '',
      filtered  : [],
      appointmentPage:'',
      appointmentDetail : {
                'booking_patient': '',
                'booking_date'   : '',
                'booking_clinic' : '',
                'booking_time'   : ''
            }
    }
  }

  fetchAnotherData(appointmentPage,appointmentDate){
    const { dispatch } = this.props;
    const{ date, page, pageSize,filtered} = this.state;
    this.setState({
      date : appointmentDate,
      page: configConstants.PAGE_NUMBER,
      pageSize: configConstants.PAGE_SIZE,
      appointmentPage : appointmentPage
    }, function(){
        dispatch(appointmentsActions.appointmentsList(this.state.page, this.state.pageSize,this.state.date,this.state.appointmentPage,filtered));
    })
  }

  /**
     * @DateOfCreation        30 july 2018
     * @ShortDescription      This function is responsible to handle close add/edit appointment modal
     * @return                Nothing
     */
    appointmentAddHideHandle() {
        this.setState({ appointmentAddShow: false });
    }

  /**
     * @DateOfCreation        24 May 2018
     * @ShortDescription      This function is responsible to handle open add awards modal
     * @return                Nothing
     */
    appointmentAddShowHandle() {
        const { appointmentDetail }  = this.state;
        this.setState({ appointmentAddShow: true });
        this.setState({
          appointmentDetail : {
              'booking_patient': '',
              'booking_date'   : '',
              'booking_clinic' : '',
              'booking_time'   : ''
          }
        });
    }

    /**
     * @DateOfCreation        26 June 2018
     * @ShortDescription      This function is responsible to handle load filtered eduction list
     * @return                Nothing
     */
    appointmentSearch(event){
        const { value } = event.target;
        const filterAll = value;
        const filtered = [{ id: 'all', value: filterAll }];
        this.setState({ filterAll, filtered,appointmentPage:'' });
    }
  /**
   * @DateOfCreation        30 july 2018
   * @ShortDescription      This function is responsible to fatch appointment list
   * @return                Nothing
   */
  getAppointmentsList(page, pageSize, filtered){
    if(pageSize < configConstants.PAGE_SIZE){
     this.state.date='';
     this.state.appointmentPage='';
    }
    const { dispatch } = this.props;
    dispatch(appointmentsActions.appointmentsList(page, pageSize, this.state.date,this.state.appointmentPage, filtered));
  }

  /**
   * @DateOfCreation        31 july 2018
   * @ShortDescription      This function is responsible to current date
   * @return                Nothing
   */
  componentWillReceiveProps(nextProps){
     const{ date} = this.state;
      this.setState({
        date : nextProps.date
      })
      const { dispatch } = this.props;
      if(nextProps.fetchedNewVisitData && this.newVisit){
            let urlre = ( (nextProps.patientNewVisitData.visit_type == dataConstants.INITIAL_VISIT_TYPE || nextProps.patientNewVisitData.visit_type == dataConstants.FOLLOWUP_VISIT_TYPE) ? '/patientnewvisit/' :'/editpatient/');
            if(nextProps.patientNewVisitData.booking_id != ''){
              urlre = urlre +this.patId+'/'+ nextProps.patientNewVisitData.visit_id+'/'+ nextProps.patientNewVisitData.booking_id;
            }else{
              urlre = urlre +this.patId+'/'+ nextProps.patientNewVisitData.visit_id;
            }
            if(nextProps.patientNewVisitData.is_pending && this.isPending){
                confirmAlert({
                    title: 'New Visit',
                    message: 'Please finish patient last visit before creating new one.',
                    buttons: [
                        {
                            label: 'Ok',
                            onClick: () => {
                                this.newVisit  = false;
                                this.isPending = false;
                                nextProps.patientNewVisitData.is_pending = false;
                                dispatch(patientAllVisitActions.resetState());
                                nextProps.history.push(urlre);
                            }
                        },
                        {
                            label: <div className='btn default table-btn'>Cancel</div>,
                            onClick: () => {
                                this.isPending = false;
                                nextProps.patientNewVisitData.is_pending = false;
                                return false;
                            }
                        }
                    ]
                })
            }

            if(nextProps.patientNewVisitData.is_pending == false && this.isPending){
                this.isPending = false;
                this.newVisit  = false;
                dispatch(patientAllVisitActions.resetState());
                nextProps.history.push(urlre);
            }
        }
  }


    /**
    * @DateOfCreation        30 july 2018
    * @ShortDescription      This function is responsible to handle the on click
    * @return                Nothing
    */
    handleRedirect(user_id,booking_id,visit_id){
      let patDetails = {};
      patDetails['patientUserId'] = this.patId = user_id;
      patDetails['patientBookingId'] = this.booking_id = booking_id;
      const { dispatch } = this.props;
      if(visit_id == null){
        dispatch(patientAllVisitActions.newVisitCreate(patDetails));
        this.isPending = true;
      }else{
        let urlre = '/patientnewvisit/';
        urlre = urlre +this.patId+'/'+ visit_id+'/'+ this.booking_id;
        this.props.history.push(urlre);
      }
    }

   

  /**
   * @DateOfCreation        30 july 2018
   * @ShortDescription      pass all required detail for display Appointment list
   * @return                Nothing
   */
  render() {
    const userInfo = utilityHelper.getUserInfo();
    const currentUserType = userInfo.user_type;
    let appointments = '';
    if(currentUserType == configConstants.USER_TYPE_DOCTOR || utilityHelper.inArray(currentUserType, [configConstants.USER_TYPE_STAFF])){
      appointments = (<Appointments 
            appointments       = {this.props.appointments}
            handleRedirect     = {this.handleRedirect}
            getAppointmentsList= { this.getAppointmentsList}
            pages              = { this.props.pages}
            date               = { this.state.date }
            sendingRequest= {this.props.sendingRequest}
            fetchAnotherData = {this.fetchAnotherData}
            appointmentAddShowHandle = {this.appointmentAddShowHandle}
            appointmentAddShow = {this.state.appointmentAddShow}
            appointmentAddHideHandle = {this.appointmentAddHideHandle}
          />);
        
    }else{
      appointments = (<PatientAppointments 
          appointments       = {this.props.appointments}
          handleRedirect     = {this.handleRedirect}
          getAppointmentsList= { this.getAppointmentsList}
          pages              = { this.props.pages}
          date               = { this.state.date }
          sendingRequest     = {this.props.sendingRequest}
          fetchAnotherData   = {this.fetchAnotherData}
          filterAll          = {this.state.filterAll}
          appointmentSearch  = {this.appointmentSearch} 
          filtered           = {this.state.filtered} 
        />);
    }
      return (
          <React.Fragment>
            {appointments}
          </React.Fragment>
        );
      
  }


}
/**
* @DateOfCreation        30 july 2018
* @ShortDescription      This function is responsible to connect store to props
* @return                View
*/
function mapStateToProps(state) {
    const {appointments,pages,sendingRequest,date} = state.appointments;
    const { fetchedNewVisitData,patientNewVisitData } = state.patientAllVisit;
    return {
       appointments,
       pages,
       date,
       sendingRequest,
       fetchedNewVisitData,
       patientNewVisitData
    };
}

const connectedAppointmentsContainer = connect(mapStateToProps)(AppointmentsContainer);
export { connectedAppointmentsContainer as AppointmentsContainer }; 