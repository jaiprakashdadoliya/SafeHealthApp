import React from "react";
import { connect } from 'react-redux';
import {Button, Modal} from 'react-bootstrap';
import Select from 'react-select';
import { configConstants }  from '../../../_constants';
import { utilityHelper } from '../../../_helpers';
import { DoctorSpecialisationAdd } from "./DoctorSpecialisationAdd";
import { specialisationValidator } from '../../../_validator';
import { doctorSpecialisationAction, headerActions } from '../../../_actions';

/**
 * DoctorSpecialisationAddContainer
 *
 * @package                SafeHealth
 * @subpackage             DoctorSpecialisationAddContainer
 * @category               Container Component
 * @DateOfCreation         31 May 2018
 * @ShortDescription       This component is reponsible for logic in Doctor Add Specialisation
 */
class DoctorSpecialisationAddContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            doctor: {
                specialisation: {
                    spl_id   : '',
                    specialisation_tags:[],
                  },
                specialisationValidate: {
                    spl_id   : {isValid: true, message: ''},
                }             
            },
            initial: {
                specialisation: {
                    spl_id   : '',
                    specialisation_tags:[],
                },
                specialisationValidate: {
                    spl_id   : {isValid: true, message: ''}
                  }             
            },
            suggestions:[],
            delimiters: configConstants.KEY_CODES,
        }; 
    
    // Bind the events to the current class
    this.handleSubmit       = this.handleSubmit.bind(this);
    this.handleClose        = this.handleClose.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleDelete       = this.handleDelete.bind(this);
    this.handleAddition     = this.handleAddition.bind(this);
    this.handleDrag         = this.handleDrag.bind(this);
  }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to handle the close event of add modal
    * @return                Nothing
    */
    handleClose() {
        const { dispatch }   = this.props;
        dispatch(doctorSpecialisationAction.updateState()); 
        const { doctor } = this.state;
        const { specialisation } = this.state.initial;
        this.setState({
            doctor : {
                ...doctor,
                specialisation : specialisation,
            }
        });
        /*this.state = this.defaultState;*/
        this.props.specialisationAddHideHandle();
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to handle the close event of add modal
    * @return                Nothing
    */
    handleDelete(i) {
        const { specialisation, specialisationValidate }  = this.state.doctor;
        const { specialisation_tags } = this.state.doctor.specialisation;
        this.setState({
            doctor : {
                specialisation : {
                    ...specialisation,
                    specialisation_tags:specialisation_tags.filter((tag, index) => index !== i),
                },
                 specialisationValidate:{
                    ...specialisationValidate,
                },
            }
        })
    }
 
    handleAddition(specialisation_tags) {
        const { specialisation, specialisationValidate }  = this.state.doctor;
        this.setState({
            doctor : {
                specialisation : {
                    ...specialisation,
                    specialisation_tags:[...specialisation.specialisation_tags, specialisation_tags]
                },
                 specialisationValidate:{
                    ...specialisationValidate,
                },
            }
        })
    }
 
    handleDrag(tag, currPos, newPos) {
        const { specialisation, specialisationValidate }  = this.state.doctor;
        const tags = [...this.state.doctor.specialisation.specialisation_tags];
        const newTags = tags.slice();
 
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
 
        // re-render
        this.setState({
            doctor : {
                specialisation : {
                    ...specialisation,
                    specialisation_tags:newTags
                },
                 specialisationValidate:{
                    ...specialisationValidate,
                },
            }
        })
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
        if(this.props.isInsertDone){
            setTimeout(function () {
                this.handleClose();
             }.bind(this), 2000);
        }
    }

    /**
    * @DateOfCreation        08 August 2018
    * @ShortDescription      This function is responsible to receive the props
    * @return                Redirect
    */
    componentWillReceiveProps(props){
        const { specialisation, specialisationValidate }  = this.state.doctor;
        if(props.tagSpecialisationFetch){
            this.setState({
                doctor : {
                    specialisation : {
                        ...specialisation,
                    },
                    specialisationValidate:{
                        ...specialisationValidate,
                    },
                },
                suggestions:props.tagSpecialisationData
            });
        }
    }

     /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to handle changes in Select state
    * @param                 Event Object
    * @return                Nothing
    */
    handleSelectChange(selectedOption, name) {
        const { specialisation, specialisationValidate }  = this.state.doctor;
        const { dispatch }              = this.props;
        dispatch(doctorSpecialisationAction.getSpecialisationsTagList(selectedOption.value));
        this.setState({
            doctor : {
                specialisation : {
                    ...specialisation,
                    [name]: selectedOption.value
                },
                specialisationValidate:{
                    ...specialisationValidate,
                    [name]: {
                        isValid: true,
                        message: ''
                    }
                },
            }
        });
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to Submit the add Specialisation form
    * @return                Nothing
    */
    handleSubmit() {
        const { dispatch }                                = this.props;
        const { specialisation, specialisationValidate }  = this.state.doctor;
        if(specialisationValidator.isSpecialisationValid(this)){
            this.setState({
                doctor : {
                    specialisation : {
                        ...specialisation,
                    },
                    specialisationValidate :{
                        ...specialisationValidate
                    }
                }
            }, function () {
                //Call the action function with dispatch
                dispatch(doctorSpecialisationAction.specialisationStore(specialisation, this.props.specialisationData));
            });
        } 
    }

     /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to show Add specialisation form in modal
    * @return                View
    */
    render() {
          return (
            <div>
                <DoctorSpecialisationAdd 
                    submitted                  = {this.props.submitted}
                    errorMsg                   = {this.props.errorMsg}
                    successMsg                 = {this.props.successMsg}
                    handleSubmit               = {this.handleSubmit}
                    handleSelectChange         = {this.handleSelectChange}
                    payload                    = {this.state.doctor}
                    specialisationAddShow      = {this.props.specialisationAddShow}
                    handleClose                = {this.handleClose}
                    isInsertDone               = {this.props.isInsertDone}
                    masterSpecialisationData   = {this.props.masterSpecialisationData}
                    handleInputChange          = {this.handleInputChange}
                    handleDrag                 = {this.handleDrag}
                    handleAddition             = {this.handleAddition}
                    handleDelete               = {this.handleDelete}
                    suggestions                = {this.state.suggestions}
                    delimiters                 = {this.state.delimiters}
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
        const { tagSpecialisationFetch, tagSpecialisationData, isUserNotValid, isInsertDone, submitted, successMsg, errorMsg } = state.doctorSpecialisation;
        return {
            tagSpecialisationFetch,
            tagSpecialisationData,
            submitted,
            isInsertDone,
            successMsg,
            errorMsg,
            isUserNotValid
        };
    }
    // Connection with State 
    const connectedDoctorSpecialisationAddContainer = connect(mapStateToProps)(DoctorSpecialisationAddContainer);
    export { connectedDoctorSpecialisationAddContainer as DoctorSpecialisationAddContainer }; 