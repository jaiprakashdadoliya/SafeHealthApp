import React from "react";
import { connect } from 'react-redux';

import { utilityHelper } from '../../../_helpers';
import { DoctorExperienceEdit } from "./DoctorExperienceEdit";
import { experienceValidator } from '../../../_validator';
import { doctorExperienceAction, headerActions } from '../../../_actions';

/**
 * DoctorExperienceEditContainer
 *
 * @package                SafeHealth
 * @subpackage             DoctorExperienceEditContainer
 * @category               Container Component
 * @DateOfCreation         17 May 2018
 * @ShortDescription       This component is reponsible for logic in DoctorExperience
 */
class DoctorExperienceEditContainer extends React.Component {
    constructor(props) {
        super(props);
        this.defaultState = {
            doctor: {
                experience: {
                    doc_exp_id                  : '',
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
        this.isDataEmpty = true;
        // Bind the events to the current class
        this.handleInputChange    = this.handleInputChange.bind(this);
        this.handleSubmit         = this.handleSubmit.bind(this);
        this.handleClose          = this.handleClose.bind(this);
        this.handleSelectChange   = this.handleSelectChange.bind(this);
        this.handleEnterPressSubmit = this.handleEnterPressSubmit.bind(this);
    }

    /**
    * @DateOfCreation        24 May 2018
    * @ShortDescription      This function is responsible to handle the close event of edit modal
    * @return                Nothing
    */
    handleClose() {
        const { dispatch }   = this.props;
        dispatch(doctorExperienceAction.updateState()); 
        this.state = this.defaultState;
        this.props.experienceEditHideHandle();
    }

    /**
    * @DateOfCreation        29 May 2018
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
    * @DateOfCreation        24 May 2018
    * @ShortDescription      This function is responsible to handle changes in input state
    * @param                 Event Object
    * @return                Nothing
    */
    handleInputChange(event) {
        const { name, value }           = event.target;
        const { experience }            = this.state.doctor;
        const { experienceValidate }    = this.state.doctor;
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
    * @ShortDescription      This function is responsible to updated State
    * @return                Nothing
    */
    componentWillReceiveProps(props) {
       const { dispatch }   = this.props;
       const { experience }            = this.state.doctor;
       const { experienceValidate }    = this.state.doctor;
       
       if(props.isUpdateDone){
             setTimeout(function () {
                this.handleClose();
            }.bind(this), 2000);
       }
       
       if(props.experienceDetail != ""){ 
                 
            this.setState({
                doctor : {
                    experience:{
                        doc_exp_id                  :  String(props.experienceDetail.doc_exp_id),   
                        doc_exp_organisation_name   :  String(props.experienceDetail.doc_exp_organisation_name),
                        doc_exp_designation         :  String(props.experienceDetail.doc_exp_designation),
                        doc_exp_start_year          :  String(props.experienceDetail.doc_exp_start_year),
                        doc_exp_end_year            :  String(props.experienceDetail.doc_exp_end_year),
                        doc_exp_start_month         :  String(props.experienceDetail.doc_exp_start_month),
                        doc_exp_end_month           :  String(props.experienceDetail.doc_exp_end_month),
                        doc_exp_organisation_type   :  String(props.experienceDetail.doc_exp_organisation_type)
                    },experienceValidate:{
                        ...experienceValidate
                    }
                }
            });

       }
    }


    /**
    * @DateOfCreation        24 May 2018
    * @ShortDescription      This function is responsible to Submit the experience Form
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
    * @ShortDescription      This function is responsible to Submit the Edit experience form
    * @return                Nothing
    */
    handleSubmit() {
        const { dispatch }              = this.props;
        const { experience }            = this.state.doctor;
        const { experienceValidate }    = this.state.doctor;
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
                dispatch(doctorExperienceAction.experienceSave(experience, this.props.experienceData));
            });
        }
    }
    
    /**
    * @DateOfCreation        24 May 2018
    * @ShortDescription      This function is responsible to show Edit experience modal
    * @return                View
    */
    render() {
        return (
            <div >    
                <DoctorExperienceEdit
                    isUpdateDone                = {this.props.isUpdateDone}
                    errorMsg                    = {this.props.errorMsg}
                    successMsg                  = {this.props.successMsg}
                    handleSubmit                = {this.handleSubmit}
                    handleEnterPressSubmit      = {this.handleEnterPressSubmit}
                    submitted                   = {this.props.submitted}
                    handleInputChange           = {this.handleInputChange}
                    handleSelectChange          = {this.handleSelectChange}
                    payload                     = {this.state.doctor}
                    experienceEditShow          = {this.props.experienceEditShow}
                    handleClose                 = {this.handleClose}
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
    const { isUserNotValid, experienceData,submitted, experienceUpdateData, isUpdateDone, successMsg, errorMsg } = state.doctorExperience;
    return {
        submitted,
        experienceData,
        experienceUpdateData,
        isUpdateDone,
        successMsg,
        errorMsg,
        isUserNotValid
    };
}

// Connection with State 
const connectedDoctorExperienceEditContainer = connect(mapStateToProps)(DoctorExperienceEditContainer);
export { connectedDoctorExperienceEditContainer as DoctorExperienceEditContainer }; 
