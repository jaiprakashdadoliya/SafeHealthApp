import React from "react";
import formConfig from "./NextVisitScheduleConfig";
import { connect } from 'react-redux';
import { newPatientValidator } from '../../../_validator';
import { utilityHelper } from '../../../_helpers';
import { configConstants } from '../../../_constants';
import moment from 'moment';
import { NextVisitSchedule } from "./NextVisitSchedule";
import { nextVisitScheduleActions } from "./nextVisitScheduleActions";
import { appointmentActions } from '../../BookAppointments/Appointment/appointmentActions'

class NextVisitScheduleContainer extends React.Component {
    constructor(props) {  
        super(props);
        this.defaultState = {
            formConfig: formConfig,
        }; 
        this.state = this.defaultState;
        this.boundForm = undefined;
        this.clinic_id = '';        
        this.submitNextVisitSchedule  = this.submitNextVisitSchedule.bind(this);
        this.handleBoundFormUpdate    = this.handleBoundFormUpdate.bind(this);
        this.getAppointmentTimeByDate = this.getAppointmentTimeByDate.bind(this);
        this.setClinicId  = this.setClinicId.bind(this);      
    }
    
    /**
     * @DateOfCreation        9 Aug 2018
     * @ShortDescription      This function is responsible to get Appointment Time List
     * @return                Nothing
     */
    getAppointmentTimeByDate(date){
        const { dispatch, patId, visitId, user_type } = this.props;
        var formattedDate = moment(date).format(configConstants.DATE_FORMAT);
        var submitData = {'pat_id' : patId, 'visit_id' : visitId, 'clinic_id': this.clinic_id, 'appointmentDate': formattedDate};
        dispatch(nextVisitScheduleActions.getAppointmentTimeListing(submitData));
    }

     /**
     * @DateOfCreation        24 August 2018
     * @ShortDescription      This function is responsible to set clinic
     * @return                Nothing
     */
    setClinicId(clinic_id){
        this.clinic_id = clinic_id;
    }

    
    /**
     * @DateOfCreation        9 Aug 2018
     * @ShortDescription      This function is responsible to submit fx form data
     * @return                Nothing
     */
    submitNextVisitSchedule() {
        const { dispatch, patId, visitId } = this.props;
        if(this.boundForm){
            let data = this.boundForm.getData();
            if (data) {
                var extraData = {'pat_id' : patId, 'visit_id' : visitId, 'timing_id' : this.state.timing_id};
                dispatch(nextVisitScheduleActions.nextVisitScheduleSubmitAction(utilityHelper.mergeMultipleObject([data, extraData])));
            } 
        }
    }

    /**
     * @DateOfCreation        9 Aug 2018
     * @return                Nothing
     */
    componentWillMount() {
        const { dispatch, patId, visitId } = this.props;
       
        // Set state
        const { handlers } = this.state.formConfig;
        const { formConfig } = this.state;
        this.setState({
                formConfig:{
                    ...formConfig,
                    handlers:{
                        ...handlers,
                        booking_date_handle:this.getAppointmentTimeByDate,
                        clinic_id_handle:this.setClinicId
                    }
                }
            }
        );

        dispatch(appointmentActions.getAppointmentReasons());
        dispatch(nextVisitScheduleActions.getAppointmentClinicListing());
        dispatch(nextVisitScheduleActions.getNextVisitSchedule(patId));
    }
    
    /**
     * @DateOfCreation        9 Aug 2018
     * @ShortDescription      This function is responsible to set country,state,city data
     * @return                Nothing
     */
    componentWillReceiveProps(props) {
        // set appointment clinic listing
        if(props.isClinicFatched){
            let listingData = utilityHelper.getDataConvertToOptionType(props.visitAppointmentClinic, 'label', 'value');

            const { data } = this.state.formConfig;
            const { formConfig } = this.state;
            this.setState({
                    formConfig:{
                        ...formConfig,
                        data:{
                            ...data,
                            clinic_id_data: listingData
                        }
                    },
                }
            );     
        }

        // set appointment time listing
        if(props.isTimeListingFatched){
            let listData = utilityHelper.visitAppointmentTimeListingOption(props.visitAppointmentTimeSlot);
            const { data } = this.state.formConfig;
            const { formConfig } = this.state;
            this.setState({
                    formConfig:{
                        ...formConfig,
                        data:{
                            ...data,
                            booking_time_data: listData
                        }
                    },
                    timing_id : props.visitAppointmentTimeSlot[0].timing_id,
                }
            );            
        }

        // set appointment Reason listing
        if(props.isFetchDone && !props.isTimeListingFatched && !props.isClinicFatched){
            let reasonListData = utilityHelper.getAppointmentReasons(props.appointmentReason);
            const { data } = this.state.formConfig;
            const { formConfig } = this.state;
            this.setState({
                    formConfig:{
                        ...formConfig,
                        data:{
                            ...data,
                            booking_reason_data: reasonListData
                        }
                    }
                }
            );            
        }

        const { dispatch } = this.props;
        if(props.isInsertDone || props.isVisitScheduleFatched || props.errorMsg){
            setTimeout(function(){
                dispatch(nextVisitScheduleActions.resetState());
            }.bind(this),2000);
        }        
    } 
    
     /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data
    * @return                Redirect
    */
    handleBoundFormUpdate(data){
        this.boundForm = data;
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
            <div >
                <NextVisitSchedule
                    submitNextVisitSchedule = {this.submitNextVisitSchedule}
                    formConfig              = {this.state.formConfig}
                    handleBoundFormUpdate   = {this.handleBoundFormUpdate}
                    errorMsg                = {this.props.errorMsg}
                    successMsg              = {this.props.successMsg}
                    isInsertDone            = {this.props.isInsertDone}
                    visitAppointmentTimeSlot= {this.props.visitAppointmentTimeSlot}     
                    user_type               = { this.props.user_type }
                    submitted               = { this.props.submitted }
                    nextVisitSchedule       = {this.props.patNextVisitSchedule} 
                    isVisitScheduleFatched  = {this.props.isVisitScheduleFatched}              
                />
            </div>
        );
    }
}

/**
 * @DateOfCreation        31 May 2018
 * @ShortDescription      This function is responsible to connect store to props
 * @return                View
 */
function mapStateToProps(state) {
    const { successMsg, errorMsg, isInsertDone, visitAppointmentTimeSlot, sendingRequest, isTimeListingFatched, submitted, isClinicFatched, visitAppointmentClinic,patNextVisitSchedule,isVisitScheduleFatched } = state.nextVisitSchedule;
    const { appointmentReason, isFetchDone } = state.appointment;
    return {
        successMsg,
        errorMsg,
        isInsertDone,
        visitAppointmentTimeSlot,
        sendingRequest,
        isTimeListingFatched,
        submitted,
        isClinicFatched,
        visitAppointmentClinic,
        isFetchDone,
        appointmentReason,
        patNextVisitSchedule,
        isVisitScheduleFatched  
    };
}

// Connection with State 
const connectedNextVisitScheduleContainer = connect(mapStateToProps)(NextVisitScheduleContainer);
export { connectedNextVisitScheduleContainer as NextVisitScheduleContainer };
