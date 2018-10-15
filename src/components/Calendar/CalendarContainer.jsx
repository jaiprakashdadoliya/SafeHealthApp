/**
 * CalendarContainer
 *
 * @package                SafeHealth
 * @subpackage             CalendarContainer
 * @category               Container Component
 * @DateOfCreation         15 May 2018
 * @ShortDescription       This component is reponsible for calander
 */
import React from "react";
import moment from 'moment';

import {PropTypes} from 'prop-types' 
import { withDragDropContext } from "react-big-scheduler";
import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT} from 'react-big-scheduler';
import 'react-big-scheduler/lib/css/style.css';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd';
import { connect } from 'react-redux';
import { configConstants } from '../../_constants';
import { utilityHelper } from '../../_helpers';
import { calendarActions } from './calendarActions';
import { appointmentsActions } from '../Appointments/appointmentsActions';
import {fontawesome, FontAwesomeIcon, Loading} from '../../global';
import {faMobileAlt, faEnvelope, faTimes } from '@fortawesome/fontawesome-free-solid';
import Select from 'react-select';
import { Button, Modal, Alert, bsStyle } from 'react-bootstrap';
import { CalendarPopup } from './CalendarPopup';
import { ManageCalendarAddContainer } from './ManageCalendarAdd/';
import { manageCalendarAddActions } from './ManageCalendarAdd/manageCalendarAddActions';
import { confirmAlert } from 'react-confirm-alert';
class CalendarContainer extends React.Component {

    /**
     * @DateOfCreation        24 May 2018
     * @ShortDescription      Contructor is responsible to function declaration and define intial state
     * @param                 props
     * @return                Nothing
     */
    constructor(props, context) {
        super(props, context);
        this.DefaultSlotTime = 0;
        let schedulerData = new SchedulerData(moment().format(configConstants.DATE_FORMAT_DB), ViewTypes.Week,false,false,
            {eventItemPopoverEnabled: false,
            schedulerWidth:900,
            weekCellWidth:112.86,
            dayCellWidth:80,
            dayResourceTableWidth:110,
            weekResourceTableWidth:110,
            monthResourceTableWidth:110,
            quarterResourceTableWidth:110,
            yearResourceTableWidth:110,
            agendaViewHeader:'Day',
            resourceName:'Timing Slot',
            taskName:'Timing Slot',
            scrollToToday:true,
            views: [
                {viewName: 'Day', viewType: ViewTypes.Day, showAgenda: false, isEventPerspective: true},
                {viewName: 'Week', viewType: ViewTypes.Week, showAgenda: false, isEventPerspective: false},
                {viewName: 'Month', viewType: ViewTypes.Month, showAgenda: false, isEventPerspective: false},
                //{viewName: 'Quarter', viewType: ViewTypes.Quarter, showAgenda: false, isEventPerspective: false},
                //{viewName: 'Year', viewType: ViewTypes.Year, showAgenda: false, isEventPerspective: false},
            ]
        });
        schedulerData.localeMoment.locale('en');
        this.defualtClinicSet = false;
        this.defualtCloseSet = false;
        this.defualtBookingDelete = false;
        this.resources = [];
        schedulerData.setResources(this.resources);
        this.events = [];
        schedulerData.setEvents(this.events);
        this.state = {
            viewModel: schedulerData,
            clinicSelect : '',
            topOffset    : '0px',
            leftOffset   : '0px',
            popupDetails : {},
            modalShow    : false
        }
        this.prevClick = this.prevClick.bind(this);
        this.nextClick = this.nextClick.bind(this);
        this.prevClick= this.prevClick.bind(this);
        this.nextClick= this.nextClick.bind(this);
        this.onSelectDate= this.onSelectDate.bind(this);
        this.onViewChange= this.onViewChange.bind(this);
        this.eventClicked= this.eventClicked.bind(this);
        this.calanderCall= this.calanderCall.bind(this);
        this.handleSelectChange= this.handleSelectChange.bind(this);
        this.eventItemTemplateResolver= this.eventItemTemplateResolver.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getPosition = this.getPosition.bind(this);
        this.newEvent = this.newEvent.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.calendarRefresh = this.calendarRefresh.bind(this);
        this.cancelAppointMent = this.cancelAppointMent.bind(this);
        this.slotClickedFunc = this.slotClickedFunc.bind(this);
        this.isNonWorkingTime = this.isNonWorkingTime.bind(this);
    }

    
    /**
     * @DateOfCreation        9 Aug 2018
     * @return                Nothing
     */
    componentDidMount() {
      
      var schedulerview= document.getElementsByClassName('scheduler-view');
      schedulerview[0].getElementsByTagName('div')[1].addEventListener('scroll', this.handleScroll);
      
        const {dispatch} =this.props;
        dispatch(appointmentsActions.getAppointmentClinicListing());
    }

    componentWillUnmount() {
        var schedulerview= document.getElementsByClassName('scheduler-view');
        schedulerview[0].getElementsByTagName('div')[1].removeEventListener('scroll', this.handleScroll);
    }
    
    /**
     * @DateOfCreation        9 Aug 2018
     * @ShortDescription      This function is responsible to set country,state,city data
     * @return                Nothing
     */
    componentWillReceiveProps(props) {
        if(props.fetchCalendarData && props.calendarData){
            let schedulerData = this.state.viewModel;

            if(props.calendarData.hasOwnProperty('calendarResources')){
                schedulerData.setResources(props.calendarData.calendarResources);
            }

            if(props.calendarData.hasOwnProperty('calendarEvents')){
                schedulerData.setEvents(props.calendarData.calendarEvents);
                this.DefaultSlotTime = props.calendarData.calendarSlotDuration;
            }
        }
        if(props.isClinicFatched  && !this.defualtClinicSet){
            
            this.setState({clinicSelect:props.bookingClinic[0].value},function(){
                let schedulerData = this.state.viewModel;
                this.calanderCall(schedulerData);
                this.defualtClinicSet = true;
            });
        }
        if(props.isUpdateDone && !this.defualtBookingDelete){
            this.defualtBookingDelete = true;
            this.handleClose();
            this.calendarRefresh();
            const {dispatch} = this.props;
            dispatch(appointmentsActions.todaysAppointments());
            dispatch(calendarActions.resetState());
        }else if(!props.isUpdateDone && this.defualtBookingDelete){
            this.defualtBookingDelete = false;
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
    
    isNonWorkingTime(schedulerData, time){
        alert(time);
        const { localeMoment } = schedulerData;
        if(schedulerData.viewType === ViewTypes.Day){
            let hour = localeMoment(time).hour();
            if(hour < 18 || hour > 20)
                return true;
        }
        else {
            let dayOfWeek = localeMoment(time).weekday();
            if (dayOfWeek === 0 || dayOfWeek === 6)
                return true;
        }

        return false;
    }

    /**
     * @DateOfCreation        31 May 2018
     * @ShortDescription      This function is responsible to close popup details 
     * @return                null
     */
    handleClose(){
        if(this.defualtCloseSet){
            var elementhide = document.getElementById('popover');
            elementhide.classList.add("hide");
            this.defualtCloseSet= false;
            
        }
    }

    /**
     * @DateOfCreation        31 May 2018
     * @ShortDescription      This function is responsible to close popup details on calendar scroll
     * @return                null
     */
    handleScroll(e){
       this.handleClose(); 
    }

    /**
     * @DateOfCreation        31 May 2018
     * @ShortDescription      This function is responsible to close popup details on calendar scroll
     * @return                null
     */
    handleModalClose(){
        this.setState({modalShow:false});
    }

    /**
     * @DateOfCreation        31 May 2018
     * @ShortDescription      This function is responsible to get previous date event data show on calendar like day/month etc 
     * @return                null
     */
    prevClick (schedulerData){
        schedulerData.prev();
        schedulerData.setEvents(this.events);
        this.calanderCall(schedulerData);
        this.setState({
            viewModel: schedulerData
        })
    }

    /**
     * @DateOfCreation        31 May 2018
     * @ShortDescription      This function is responsible to get next date event data show on calendar like day/month etc 
     * @return                null
     */
    nextClick (schedulerData){
        schedulerData.next();
        this.calanderCall(schedulerData);
        schedulerData.setEvents(this.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    /**
     * @DateOfCreation        31 May 2018
     * @ShortDescription      This function is responsible to get specific date range event data show on calendar like day/month etc 
     * @return                null
     */
    onViewChange (schedulerData, view) {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        this.calanderCall(schedulerData);
        schedulerData.setEvents(this.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    /**
     * @DateOfCreation        31 May 2018
     * @ShortDescription      This function is responsible to get specific date event data show on calendar 
     * @return                null
     */
    onSelectDate (schedulerData, date) {
        schedulerData.setDate(date);
        schedulerData.setEvents(this.events);
        this.calanderCall(schedulerData);
        this.setState({
            viewModel: schedulerData
        })
    }

    /**
     * @DateOfCreation        31 May 2018
     * @ShortDescription      This function is responsible to get specific element x and y axis position 
     * @return                null
     */
    getPosition(element) {
    var x = 0,
        y = 0;
    do {
        x += element.offsetLeft - element.scrollLeft;
        y += element.offsetTop - element.scrollTop;
    } while (element = element.offsetParent);
    return { 'x': x, 'y': y };
    }

    /**
     * @DateOfCreation        31 May 2018
     * @ShortDescription      This function is responsible to appointment details show on popup
     * @return                null
     */
    eventClicked (schedulerData, event) {
        var element = document.getElementById('calanderpopover'+event.id);
        var element2 = document.getElementById('inner-content');
        var element3 = document.getElementsByClassName('calendar-popover-arrow');
        var pos = this.getPosition( element );
        var pos2 = this.getPosition( element2 );
        let top = pos2.y+11+126;
        let posnegetive = pos2.x>0 ? 0: pos2.x*2;
        let da = element2.scrollLeft==0 ? 110 : element2.scrollLeft+110+posnegetive;
        let cellWidth = schedulerData.getContentCellWidth()+da-posnegetive;
        this.setState({topOffset:(pos.y-top)+'px',
            leftOffset:(pos.x-cellWidth)+'px',
            popupDetails:event.details
        },function(){
            this.defualtCloseSet= true;
            var elementshow = document.getElementById('popover');
            elementshow.classList.remove("hide");
        });
    }

    /**
     * @DateOfCreation        31 May 2018
     * @ShortDescription      This function is responsible to modifiy appointment event item style  
     * @return                null
     */
    eventItemTemplateResolver(schedulerData, event, bgColor, isStart, isEnd, mustAddCssClass, mustBeHeight, agendaMaxEventWidth){
        let borderWidth = isStart ? '4' : '0';
        let borderColor =  'rgba(0,139,236,1)', backgroundColor = '#80C5F6';
        let titleText = schedulerData.behaviors.getEventTextFunc(schedulerData, event);
        if(!!event.type){
            borderColor = event.type == 1 ? 'rgba(0,139,236,1)' : (event.type == 3 ? 'rgba(245,60,43,1)' : '#999');
        }
        let divStyle = {borderLeft: borderWidth + 'px solid ' + borderColor, backgroundColor: bgColor, height: mustBeHeight };
        if(!!agendaMaxEventWidth)
            divStyle = {...divStyle, maxWidth: agendaMaxEventWidth};

        let popoverClass ='calanderpopover'+event.id;
        const NONE= {diplay: 'none'}
        return <div key={event.id} className={mustAddCssClass} style={divStyle} id={popoverClass}>

                <span style={{marginLeft: '4px', lineHeight: `${mustBeHeight}px` }}>{titleText}</span>
                
                
        </div>;
    }

    /**
     * @DateOfCreation        31 May 2018
     * @ShortDescription      This function is responsible to call api function and get event detils specific opertion perform
     * @return                null
     */
    calanderCall(schedulerData){
        const { dispatch } = this.props;
        let clinicId = this.state.clinicSelect;
        let extra ={};
        extra['startDate'] = schedulerData.startDate;
        extra['endDate'] = schedulerData.endDate;
        extra['clinic_id'] = clinicId;
        extra['view_type'] = utilityHelper.getObjectKeyByValue(ViewTypes,schedulerData.viewType);
        dispatch(calendarActions.calendarDataList(extra));
    }

    /**
    * @DateOfCreation        24 May 2018
    * @ShortDescription      This function is responsible to handle changes in Select state
    * @param                 Event Object
    * @return                Nothing
    */
    handleSelectChange(selectedOption, name) {
        let state = this.state;
        this.setState({
            ...state,
            [name] : selectedOption.value,
        },function () {
            if(name == 'clinicSelect'){
                let schedulerData = this.state.viewModel;
                this.calanderCall(schedulerData);
            }
        });
    }

    /**
     * @DateOfCreation        31 May 2018
     * @ShortDescription      This function is responsible to call close details view popup and new appointment event create  
     * @return                null
     */
    newEvent(schedulerData, slotId, slotName, start, end, type, item){
        let startTimeData = start.split(' ');
        let slotIdString = moment(slotId,'hhmm').format('HH:mm:ss');
        if(schedulerData.viewType == ViewTypes.Day){
            var startTime = startTimeData[0]+ ' '+startTimeData[1];
            slotId = moment(start).format('HHmm');
        }else{

            var startTime = startTimeData[0]+ ' '+slotIdString;
        }
        if(moment().subtract(this.DefaultSlotTime, 'minutes').valueOf() <= moment(startTime).valueOf()){
            this.handleClose();
            let extra = {};
            extra['start_date']=start;
            extra['clinic_id']=this.state.clinicSelect;
            extra['slot_data']=slotId;
            extra['view_type'] = utilityHelper.getObjectKeyByValue(ViewTypes,schedulerData.viewType);
            const {dispatch} = this.props;
            dispatch(manageCalendarAddActions.getRecord(extra));
            this.setState({modalShow:true});
        }else{
            alert('Appointment not allow below current date or time.');
        }
    }

    calendarRefresh(){
        let schedulerData = this.state.viewModel;
        this.calanderCall(schedulerData);
    }

    cancelAppointMent(id,slotId){
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
                extra['slot_time'] = slotId;
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
    slotClickedFunc(schedulerData, slot){
        alert(`You just clicked a ${schedulerData.isEventPerspective ? 'task':'resource'}.{id: ${slot.slotId}, name: ${slot.slotName}}`);
    }

    render() {
        const {viewModel} = this.state;
        let leftCustomHeader = (
                    <div className="col-md-3 rpl">
                        <div className="form-group">
                            <Select
                                    name = "clinicSelect"
                                    className = "custom-select"
                                    value = { this.state.clinicSelect }
                                    clearable = { false }
                                    placeholder = "Select clinic"
                                    onChange = { (value, name) => this.handleSelectChange(value, 'clinicSelect') }
                                    options = { utilityHelper.getDataConvertToOptionType(this.props.bookingClinic,'label','value')}
                            />
                            <label className="control-label">Clinic</label>
                            <span className="help-block"></span>
                        </div>
                    </div>
        );
        return (
            <React.Fragment>
                <div className="inner-content" id="inner-content" onClick={this.handleClose} style={{overflowX:'auto'}}>
                    <Scheduler schedulerData={viewModel}
                        prevClick={this.prevClick}
                        nextClick={this.nextClick}
                        onSelectDate={this.onSelectDate}
                        onViewChange={this.onViewChange}
                        eventItemClick={this.eventClicked}
                        eventItemTemplateResolver={this.eventItemTemplateResolver}
                        leftCustomHeader={leftCustomHeader}
                        newEvent={this.newEvent}
                        isNonWorkingTime={this.isNonWorkingTime}
                    />
                </div>
                <CalendarPopup payload={this.state} handleClose={this.handleClose} cancelAppointMent={this.cancelAppointMent} handleRedirect={this.props.handleRedirect} />
                <ManageCalendarAddContainer modalShow={this.state.modalShow} handleModalClose = {this.handleModalClose} calendarRefresh={this.calendarRefresh} />
            </React.Fragment>
        );
    }
}
     
const CalendarDragDropContext = DragDropContext(HTML5Backend)(CalendarContainer)

/**
 * @DateOfCreation        24 May 2018
 * @ShortDescription      connect state to props on reducer and get state for add/edit Award
 * @param Object state    All the state has come from reducer
 * @return  object        Awards list, sending request message and success message
 */
function mapStateToProps(state) {
    const { successMsg, sendingRequest,errorMsg,isUpdateDone,calendarData ,fetchCalendarData,isUserNotValid } = state.calendar;
    const {bookingClinic,isClinicFatched} = state.appointments;
    return {
        successMsg,
        sendingRequest,
        errorMsg,
        calendarData,
        fetchCalendarData,
        isUserNotValid,
        bookingClinic,
        isClinicFatched,
        isUpdateDone
    };
}

const connectedCalendarContainer = connect(mapStateToProps)(CalendarDragDropContext);
export { connectedCalendarContainer as CalendarContainer};