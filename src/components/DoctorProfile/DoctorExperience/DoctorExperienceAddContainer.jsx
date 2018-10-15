import React from "react";
import { connect } from 'react-redux';

import { utilityHelper } from '../../../_helpers';
import { DoctorExperienceAdd } from "./DoctorExperienceAdd";
import { experienceValidator } from '../../../_validator';
import { doctorExperienceAction, headerActions } from '../../../_actions';

/**
 * DoctorExperienceAddContainer
 *
 * @package                SafeHealth
 * @subpackage             DoctorExperienceAddContainer
 * @category               Container Component
 * @DateOfCreation         23 May 2018
 * @ShortDescription       This component is reponsible for logic in Doctor Add Experience
 */
class DoctorExperienceAddContainer extends React.Component {
    constructor(props) {
        super(props);
        this.defaultState = {
            doctor: {
                experience: {
                    doc_exp_organisation_name   : '',
                    doc_exp_designation         : '',
                    doc_exp_start_year          : '',
                    doc_exp_start_month         : '',
                    doc_exp_end_year            : '',
                    doc_exp_end_month           : '',
                    doc_exp_organisation_type   : '',
                },
                experienceValidate: {
                    doc_exp_organisation_name   : {isValid: true, message: ''},
                    doc_exp_designation         : {isValid: true, message: ''},
                    doc_exp_start_year          : {isValid: true, message: ''},
                    doc_exp_start_month         : {isValid: true, message: ''},
                    doc_exp_end_month           : {isValid: true, message: ''},
                    doc_exp_end_year            : {isValid: true, message: ''},
                    doc_exp_organisation_type   : {isValid: true, message: ''},
                }             
            }
        }; 
        this.state = this.defaultState;
        
        // Bind the events to the current class
        this.handleInputChange  = this.handleInputChange.bind(this);
        this.handleSubmit       = this.handleSubmit.bind(this);
        this.handleClose        = this.handleClose.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleEnterPressSubmit = this.handleEnterPressSubmit.bind(this);
    }

    /**
    * @DateOfCreation        23 May 2018
    * @ShortDescription      This function is responsible to handle the close event of add modal
    * @return                Nothing
    */
    handleClose() {
      const { dispatch }   = this.props;
      dispatch(doctorExperienceAction.updateState()); 
      this.setState(this.defaultState)
      this.props.experienceAddHideHandle();
    }

    /**
    * @DateOfCreation        24 May 2018
    * @ShortDescription      This function is responsible to check the data inserted and check valid data
                             is completed or not
    * @return                Redirect
    */
    componentDidUpdate(){
        const { dispatch }   = this.props;
        if(this.props.isUserNotValid){
            dispatch(headerActions.logout());
        }
        if(this.props.isInsertDone){
            setTimeout(function () {
                dispatch(doctorExperienceAction.updateState());
                this.setState(this.defaultState)
                this.props.experienceAddHideHandle();
             }.bind(this), 2000);
        }
    }

    /**
    * @DateOfCreation        24 May 2018
    * @ShortDescription      This function is responsible to handle changes in input state
    * @param                 Event Object
    * @return                Nothing
    */
    handleInputChange(event) {
        const { name, value }                     = event.target;
        const { experience, experienceValidate }  = this.state.doctor;
        this.setState({
            doctor : {
                experience : {
                    ...experience,
                    [name]: value
                },
                experienceValidate:{
                    ...experienceValidate,
                    [name]: {
                        isValid: true,
                        message: ''
                    }
                },
            }
        });
    }


     /**
    * @DateOfCreation        24 May 2018
    * @ShortDescription      This function is responsible to handle changes in Select state
    * @param                 Event Object
    * @return                Nothing
    */
    handleSelectChange(selectedOption, name) {
        const { experience, experienceValidate }  = this.state.doctor;
        this.setState({
            doctor : {
                experience : {
                    ...experience,
                    [name]: selectedOption.value
                },
                experienceValidate:{
                    ...experienceValidate,
                    [name]: {
                        isValid: true,
                        message: ''
                    }
                },
            }
        });
    }


    /**
    * @DateOfCreation        24 May 2018
    * @ShortDescription      This function is responsible to Submit the Experience Form
                             with Handle Enter key 
    * @return                Nothing
    */
    handleEnterPressSubmit(event){
        if(event.key == 'Enter'){
            this.handleSubmit();
        }
    }


    /**
    * @DateOfCreation        24 May 2018
    * @ShortDescription      This function is responsible to Submit the add experience form
    * @return                Nothing
    */
    handleSubmit() {
        const { dispatch }                        = this.props;
        const { experience, experienceValidate }  = this.state.doctor;

        if(experienceValidator.isExperienceValid(this)){
            this.setState({
                doctor : {
                    experience : {
                        ...experience,
                    },
                    experienceValidate :{
                        ...experienceValidate
                    }
                }
            }, function () {
                 const { experience } = this.state.doctor;
                this.setState({
                doctor : {
                    experience : {
                        ...experience,
                    },
                    experienceValidate :{
                        ...experienceValidate
                    }
                }
                }); 
                //Call the action function with dispatch
                dispatch(doctorExperienceAction.experienceStore(experience, this.props.experienceData));
            });
        }
    }
    
    /**
    * @DateOfCreation        24 May 2018
    * @ShortDescription      This function is responsible to show Add experience form in modal
    * @return                View
    */
    render() {
        return (
            <div >    
                <DoctorExperienceAdd 
                    submitted                  = {this.props.submitted}
                    errorMsg                   = {this.props.errorMsg}
                    successMsg                 = {this.props.successMsg}
                    handleSubmit               = {this.handleSubmit}
                    handleEnterPressSubmit     = {this.handleEnterPressSubmit}
                    handleInputChange          = {this.handleInputChange}
                    handleSelectChange         = {this.handleSelectChange}
                    payload                    = {this.state.doctor}
                    experienceAddShow          = {this.props.experienceAddShow}
                    handleClose                = {this.handleClose}
                    isInsertDone               = {this.props.isInsertDone}
                />
            </div>
        );
    }
}

/**
* @DateOfCreation        24 May 2018
* @ShortDescription      This function is responsible to connect store to props
* @return                View
*/
function mapStateToProps(state) {
    const { isUserNotValid, isInsertDone, submitted, successMsg, errorMsg } = state.doctorExperience;
    return {
        submitted,
        isInsertDone,
        successMsg,
        errorMsg,
        isUserNotValid
    };
}

// Connection with State 
const connectedDoctorExperienceAddContainer = connect(mapStateToProps)(DoctorExperienceAddContainer);
export { connectedDoctorExperienceAddContainer as DoctorExperienceAddContainer }; 
