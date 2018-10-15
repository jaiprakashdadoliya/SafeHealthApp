import React from 'react';
import { connect } from 'react-redux';

import { utilityHelper } from '../../../_helpers';
import { DoctorTiming } from './DoctorTiming';
import { timingValidator } from '../../../_validator';
import { doctorTimingAction, headerActions } from '../../../_actions';
import { confirmAlert } from 'react-confirm-alert';

/**
 * DoctorTimingContainer
 *
 * @package                SafeHealth
 * @subpackage             DoctorTimingContainer
 * @category               Container Component
 * @DateOfCreation         18 June 2018
 * @ShortDescription       This component is reponsible for logic in Doctor Timing
 */
class DoctorTimingContainer extends React.Component {
	constructor(props) {
		super(props);
		this.defaultState = {
			doctor: {
			    timing: {
                    timing_id       : '',
			        week_day   		: '',
			        start_time      : '',
                    end_time        : '',
                    slot_duration        : '',
			        patients_per_slot        : '',
                    clininc_id      : ''
			      },
			    timingValidate: {
                    timing_id       : {isValid: true, message: ''},
                    week_day        : {isValid: true, message: ''},
                    start_time      : {isValid: true, message: ''},
                    end_time        : {isValid: true, message: ''},
                    slot_duration        : {isValid: true, message: ''},
                    patients_per_slot        : {isValid: true, message: ''},
                    clininc_id      : {isValid: true, message: ''}
			    }             
			},
            timingEditModelShow   : false,
            timingAddModelShow    : false,
            timingDetail          : ''          
 		}; 
        this.state = this.defaultState;
        
        // Bind the events to the current class
        this.timingEditShowHandle       = this.timingEditShowHandle.bind(this);
        this.timingEditHideHandle       = this.timingEditHideHandle.bind(this);
        this.timingAddShowHandle        = this.timingAddShowHandle.bind(this);
        this.timingAddHideHandle        = this.timingAddHideHandle.bind(this);
  	}

    /**
    * @DateOfCreation        19 June 2018
    * @ShortDescription      This function is responsible to show the Edit timing Modal
                             and show the current row entry
    * @Param                 JSON timing Detail of single row of timing   
    * @return                Nothing
    */
    timingEditShowHandle(timing) {
        if(timing.timing_id != ''){
            this.setState({ timingEditModelShow: true });
            this.setState({ timingDetail:timing });
        }
    }

    /**
    * @DateOfCreation        19 June 2018
    * @ShortDescription      This function is responsible to hide the Edit timing Modal
    * @return                Nothing
    */
    timingEditHideHandle() {
        this.setState({ timingEditModelShow: false });
        this.setState({ timingDetail:'' });
    }

    /**
    * @DateOfCreation        19 June 2018
    * @ShortDescription      This function is responsible to show the Add timing Modal
                             and show the current row entry
    * @Param                 JSON timing Detail of single row of timing   
    * @return                Nothing
    */
    timingAddShowHandle() {
        this.setState({ timingAddModelShow: true });
    }

    /**
    * @DateOfCreation        19 June 2018
    * @ShortDescription      This function is responsible to hide the Add timing Modal
    * @return                Nothing
    */
    timingAddHideHandle() {
        this.setState({ timingAddModelShow: false });
    }

     /**
    * @DateOfCreation        19 June 2018
    * @ShortDescription      This function is responsible to redirect unauthorise users 
    * @return                Redirect
    */
    componentDidUpdate(){
        const { dispatch }   = this.props;
        if(this.props.isUserNotValid){
            const { dispatch }  = this.props;
            dispatch(headerActions.logout());
        }
    }

    /**
    * @DateOfCreation        18 June 2018
    * @ShortDescription      This function is responsible to get the list of timing from API
    * @return                Nothing
    */
    componentDidMount() {
       const { dispatch }              = this.props;
       dispatch(doctorTimingAction.getTimingList());
    }

  render() {
    return (
      <div>
       <DoctorTiming
            submitted               = {this.props.submitted}
            errorMsg                = {this.props.errorMsg}
            successMsg              = {this.props.successMsg}
            timingData              = {this.props.timingData}
            timingDetail            = {this.state.timingDetail}
            timingAddModelShow      = {this.state.timingAddModelShow}
            timingEditModelShow     = {this.state.timingEditModelShow}
            timingEditHideHandle    = {this.timingEditHideHandle} 
            timingEditShowHandle    = {this.timingEditShowHandle}
            timingAddShowHandle     = {this.timingAddShowHandle}
            timingAddHideHandle     = {this.timingAddHideHandle}
        />
      </div>
    );
  }
}

/**
* @DateOfCreation        18 June 2018
* @ShortDescription      This function is responsible to connect store to props
* @return                View
*/
function mapStateToProps(state) {
    const { isUserNotValid, timingData, successMsg, errorMsg } = state.doctorTiming;
    return {
        successMsg,
        errorMsg,
        isUserNotValid,
        timingData
    };
}

// Connection with State 
const connectedDoctorTimingContainer = connect(mapStateToProps)(DoctorTimingContainer);
export { connectedDoctorTimingContainer as DoctorTimingContainer }; 
