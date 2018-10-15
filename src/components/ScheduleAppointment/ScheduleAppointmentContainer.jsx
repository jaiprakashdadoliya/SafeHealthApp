import React from "react";
import { connect } from 'react-redux';

import { utilityHelper } from '../../_helpers';
{/*import { ScheduleAppointment } from "./ScheduleAppointment";*/}
import { ScheduleAppointment } from "./ScheduleAppointment";
import { patientAction, headerActions } from '../../_actions';
import { confirmAlert } from 'react-confirm-alert';

/**
 * ScheduleAppointmentContainer
 *
 * @package                SafeHealth
 * @subpackage             ScheduleAppointmentContainer
 * @category               Container Component
 * @DateOfCreation         05 June 2018
 * @ShortDescription       This component is reponsible for logic in Schedule Appointment list
*/
class ScheduleAppointmentContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          patientDetail         : ''
        };

        this.getAppointmentList             = this.getAppointmentList.bind(this);
    }

    /**
    * @DateOfCreation        05 July 2018
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
    * @DateOfCreation        05 July 2018
    * @ShortDescription      This function is responsible to get the list of experience from API
    * @return                Nothing
    */
    getAppointmentList(page, pageSize, sorted, filtered){
        const { dispatch }   = this.props;
        dispatch(patientAction.getPatientList(page, pageSize, sorted, filtered));
    }

  
    /**
    * @DateOfCreation        08 June 2018
    * @ShortDescription      This function is responsible to show patient list and other part
    * @return                View
    */
    render() {
        return (
            <ScheduleAppointment    
                errorMsg                    = {this.props.errorMsg}
                successMsg                  = {this.props.successMsg}
                patientData                 = {this.props.patientData}
                patientDetail               = {this.state.patientDetail}
                history                     = {this.props.history}
                loading                     = {this.props.loading}
                pages                       = {this.props.pages}
                getPatientList          = {this.getAppointmentList}
            />
        );
    }
}

/**
* @DateOfCreation        22 May 2018
* @ShortDescription      This function is responsible to connect store to props
* @return                View
*/
function mapStateToProps(state) {
    const { pages, isDeleteDone, isUserNotValid, patientData, successMsg, errorMsg } = state.patient;
    return {
        pages,
        patientData,
        successMsg,
        errorMsg,
        isUserNotValid,
        isDeleteDone
    };
}

// Connection with State 
const connectedScheduleAppointmentContainer = connect(mapStateToProps)(ScheduleAppointmentContainer);
export { connectedScheduleAppointmentContainer as ScheduleAppointmentContainer }; 

