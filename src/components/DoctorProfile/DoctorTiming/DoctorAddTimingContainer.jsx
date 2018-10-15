import React from "react";
import { connect } from 'react-redux';

import { utilityHelper } from '../../../_helpers';
import { DoctorAddTiming } from "./DoctorAddTiming";
import { doctorTimingValidator } from '../../../_validator';
import { doctorTimingAction, headerActions } from '../../../_actions';

/**
 * DoctorAddTimingContainer
 *
 * @package                SafeHealth
 * @subpackage             DoctorAddTimingContainer
 * @category               Container Component
 * @DateOfCreation         20 June 2018
 * @ShortDescription       This component is reponsible for logic in Doctor Add Timing
 */
class DoctorAddTimingContainer extends React.Component {
    constructor(props) {
        super(props);
        // Bind the events to the current class
        this.handleSubmit           = this.handleSubmit.bind(this);
        this.handleClose            = this.handleClose.bind(this);
        this.handleSelectChange     = this.handleSelectChange.bind(this);
        this.handleEnterPressSubmit = this.handleEnterPressSubmit.bind(this);
        this.defaultState = {
            doctor: {
                timing: {
                    week_day            : '',
                    start_time          : '',
                    end_time            : '',
                    slot_duration       : '',
                    patients_per_slot   : '',
                    clinic_id           : ''
                },
                timingValidate: {
                    week_day            : {isValid: true, message: ''},
                    start_time          : {isValid: true, message: ''},
                    end_time            : {isValid: true, message: ''},
                    slot_duration       : {isValid: true, message: ''},
                    patients_per_slot   : {isValid: true, message: ''},
                    clinic_id           : {isValid: true, message: ''}
                }             
            }
        }; 
        this.state = this.defaultState;
    }


    /**
    * @DateOfCreation        20 June 2018
    * @ShortDescription      This function is responsible to handle the close event of add modal
    * @return                Nothing
    */
    handleClose() {
      const { dispatch }   = this.props;
      dispatch(doctorTimingAction.updateState()); 
      this.setState(this.defaultState)
      this.props.timingAddHideHandle();
    }

    /**
    * @DateOfCreation        27 June 2018
    * @ShortDescription      This function is responsible to get the list of clinics from API
    * @return                Nothing
    */
    componentDidMount() {
       const { dispatch }              = this.props;
       dispatch(doctorTimingAction.getClinicList());
    }

    /**
    * @DateOfCreation        20 June 2018
    * @ShortDescription      This function is responsible to check the data inserted and check valid data
                             is completed or not
    * @return                Redirect
    */
    componentDidUpdate(){
        if(this.props.isUserNotValid){
            const { dispatch }   = this.props;
            dispatch(headerActions.logout());
        }
        if(this.props.isInsertDone){
            setTimeout(function () {
                this.handleClose();
             }.bind(this), 2000);
        }
    }

     /**
    * @DateOfCreation        20 June 2018
    * @ShortDescription      This function is responsible to handle changes in Select state
    * @param                 Event Object
    * @return                Nothing
    */
    handleSelectChange(selectedOption, name) {
        const { timing, timingValidate }  = this.state.doctor;
        if((name == 'start_time') || (name == 'end_time')){
            if(selectedOption.value == 'Off'){
               var start_time_value = 'Off'; 
               var end_time_value = 'Off';
            }else{
                if(name == 'start_time'){
                    var start_time_value = selectedOption.value;
                    var end_time_value = (timing.start_time == 'Off') ? '' : timing.end_time;
                }else if(name == 'end_time'){
                    var end_time_value = selectedOption.value;
                    var start_time_value = (timing.end_time == 'Off') ? '' : timing.start_time;
                }
            }
            this.setState({
                doctor : {
                    timing : {
                        ...timing,
                        start_time: start_time_value,
                        end_time: end_time_value,
                    },
                    timingValidate:{
                        ...timingValidate,
                        start_time : {
                            isValid: true,
                            message: ''
                        },
                        end_time : {
                            isValid: true,
                            message: ''
                        }
                    },
                }
            });
        }else{
            
            this.setState({
                doctor : {
                    timing : {
                        ...timing,
                        [name]: selectedOption.value
                    },
                    timingValidate:{
                        ...timingValidate,
                        [name] : {
                            isValid: true,
                            message: ''
                        }
                    },
                }
            });
        }
    }

    /**
    * @DateOfCreation        20 June 2018
    * @ShortDescription      This function is responsible to Submit the Timing Form
                             with Handle Enter key 
    * @return                Nothing
    */
    handleEnterPressSubmit(event){
        if(event.key == 'Enter'){
            this.handleSubmit();
        }
    }

    /**
    * @DateOfCreation        20 June 2018
    * @ShortDescription      This function is responsible to Submit the add timing form
    * @return                Nothing
    */
    handleSubmit() {
        const { dispatch }                = this.props;
        const { timing, timingValidate }  = this.state.doctor;

        if(doctorTimingValidator.isTimingValid(this)){
            this.setState({
                doctor : {
                    timing : {
                        ...timing,
                    },
                    timingValidate :{
                        ...timingValidate
                    }
                }
            }, function () {
                 const { timing } = this.state.doctor;
                this.setState({
                doctor : {
                    timing : {
                        ...timing,
                    },
                    timingValidate :{
                        ...timingValidate
                    }
                }
                }); 
                //Call the action function with dispatch
                dispatch(doctorTimingAction.timingStore(timing, this.props.timingData));
            });
        }
    }
    
    /**
    * @DateOfCreation        20 June 2018
    * @ShortDescription      This function is responsible to show Add timing form in modal
    * @return                View
    */
    render() {
        return (
            <div >    
                <DoctorAddTiming
                    isInsertDone               = {this.props.isInsertDone}
                    errorMsg                   = {this.props.errorMsg}
                    message                    = {this.props.successMessage}
                    submitted                  = {this.props.submitted} 
                    handleSubmit               = {this.handleSubmit}
                    handleEnterPressSubmit     = {this.handleEnterPressSubmit}
                    handleSelectChange         = {this.handleSelectChange}
                    payload                    = {this.state.doctor}
                    timingAddModelShow         = {this.props.timingAddModelShow}
                    handleClose                = {this.handleClose}
                    clinicList                 = {this.props.clinicList}
                />
            </div>
        );
    }
}

/**
* @DateOfCreation        20 June 2018
* @ShortDescription      This function is responsible to connect store to props
* @return                View
*/
function mapStateToProps(state) {
    const { isInsertDone, isUserNotValid, timingData, successMessage, errorMsg, clinicList } = state.doctorTiming;
    return {
        isInsertDone,
        successMessage,
        errorMsg,
        isUserNotValid,
        timingData,
        clinicList
    };
}

// Connection with State 
const connectedDoctorAddTimingContainer = connect(mapStateToProps)(DoctorAddTimingContainer);
export { connectedDoctorAddTimingContainer as DoctorAddTimingContainer }; 
