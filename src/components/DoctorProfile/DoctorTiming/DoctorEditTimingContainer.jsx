import React from "react";
import { connect } from 'react-redux';

import { utilityHelper } from '../../../_helpers';
import { DoctorEditTiming } from "./DoctorEditTiming";
import { doctorTimingValidator } from '../../../_validator';
import { doctorTimingAction, headerActions } from '../../../_actions';

/**
 * DoctorEditTimingContainer
 *
 * @package                SafeHealth
 * @subpackage             DoctorEditTimingContainer
 * @category               Container Component
 * @DateOfCreation         20 June 2018
 * @ShortDescription       This component is reponsible for logic in DoctorTiming
 */
class DoctorEditTimingContainer extends React.Component {
    constructor(props) {
        super(props);
        // Bind the events to the current class
        this.handleSubmit         = this.handleSubmit.bind(this);
        this.handleClose          = this.handleClose.bind(this);
        this.handleSelectChange   = this.handleSelectChange.bind(this);
        this.handleEnterPressSubmit = this.handleEnterPressSubmit.bind(this);
        this.defaultState = {
            doctor: {
                timing: {
                    timing_id           : '',
                    week_day            : '',
                    start_time          : '',
                    end_time            : '',
                    slot_duration       : '',
                    patients_per_slot   : '',
                    clinic_id           : ''
                },
                timingValidate: {
                    timing_id           : {isValid: true, message: ''},
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
    * @ShortDescription      This function is responsible to handle the close event of edit modal
    * @return                Nothing
    */
    handleClose() {
        const { dispatch }   = this.props;
        dispatch(doctorTimingAction.updateState()); 
        this.state = this.defaultState;
        this.props.timingEditHideHandle();
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
    * @DateOfCreation        20 June 2018
    * @ShortDescription      This function is responsible to handling changes in Input states
    * @param                 Event Object
    * @return                Nothing
    */
    handleChange(event) {
        const { name, value } = event.target;
        const { timing, timingValidate } = this.state.doctor;
        this.setState({
            doctor : {
                timingValidate : {
                    ...timingValidate,
                    [name] : {
                        isValid : true,
                        message : ''
                    }
                },
                timing : {
                    ...timing,
                    [name] : value
                }
            }
        });
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
    * @ShortDescription      This function is responsible to updated State
    * @return                Nothing
    */
    componentWillReceiveProps(props) {
       const { dispatch }   = this.props;
       const { timing }            = this.state.doctor;
       const { timingValidate }    = this.state.doctor;
       
       if(props.isUpdateDone){
             setTimeout(function () {
                this.handleClose();
            }.bind(this), 1500);
       }
       
       if(props.timingDetail.timing_id != "" && props.timingDetail != ""){ 
            this.setState({
                doctor : {
                    timing:{
                        timing_id  : String(props.timingDetail.timing_id),   
                        week_day   : String(props.timingDetail.week_day),
                        start_time : String(props.timingDetail.start_time),
                        end_time   : String(props.timingDetail.end_time),
                        clinic_id  : String(props.timingDetail.clinic_id),
                        patients_per_slot : String(props.timingDetail.patients_per_slot),
                        slot_duration: String(props.timingDetail.slot_duration),
                    },timingValidate:{
                        ...timingValidate
                    }
                }
            });

       }
    }


    /**
    * @DateOfCreation        20 June 2018
    * @ShortDescription      This function is responsible to Submit the timing Form
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
    * @ShortDescription      This function is responsible to Submit the Edit timing form
    * @return                Nothing
    */
    handleSubmit() {
        const { dispatch }          = this.props;
        const { timing }            = this.state.doctor;
        const { timingValidate }    = this.state.doctor;
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
                dispatch(doctorTimingAction.timingSave(timing, this.props.timingData));
            });
        }
    }
    
    /**
    * @DateOfCreation        20 June 2018
    * @ShortDescription      This function is responsible to show Edit timing modal
    * @return                View
    */
    render() {
        return (
            <div >    
                <DoctorEditTiming
                    isUpdateDone           = {this.props.isUpdateDone}
                    errorMsg               = {this.props.errorMsg}
                    message                = {this.props.successMessage}
                    submitted              = {this.props.submitted}
                    handleSubmit           = {this.handleSubmit}
                    handleEnterPressSubmit = {this.handleEnterPressSubmit}
                    handleSelectChange     = {this.handleSelectChange}
                    handleChange           = {this.handleChange}
                    payload                = {this.state.doctor}
                    timingEditModelShow    = {this.props.timingEditModelShow}
                    handleClose            = {this.handleClose}
                    clinicList             = {this.props.clinicList}
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
    const { isUpdateDone, isUserNotValid, timingData, successMessage, errorMsg, clinicList } = state.doctorTiming;
    return {
        isUpdateDone,
        successMessage,
        errorMsg,
        isUserNotValid,
        timingData,
        clinicList
    };
}

// Connection with State 
const connectedDoctorEditTimingContainer = connect(mapStateToProps)(DoctorEditTimingContainer);
export { connectedDoctorEditTimingContainer as DoctorEditTimingContainer }; 