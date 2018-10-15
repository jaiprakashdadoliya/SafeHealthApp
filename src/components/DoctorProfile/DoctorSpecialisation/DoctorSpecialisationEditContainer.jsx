import React from "react";
import { connect } from 'react-redux';
import Select from 'react-select';
import {Button, Modal} from 'react-bootstrap';
import { utilityHelper } from '../../../_helpers';
import { DoctorSpecialisationEdit } from "./DoctorSpecialisationEdit";
import { specialisationValidator } from '../../../_validator';
import { doctorSpecialisationAction, headerActions } from '../../../_actions';
import { configConstants }  from '../../../_constants';

/**
 * DoctorSpecialisationEditContainer
 *
 * @package                SafeHealth
 * @subpackage             DoctorSpecialisationEditContainer
 * @category               Container Component
 * @DateOfCreation         17 May 2018
 * @ShortDescription       This component is reponsible for logic in DoctorExperience
 */
class DoctorSpecialisationEditContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.defaultState = {
            doctor: {
                specialisation: {
                    spl_id   : '',
                    specialisation_tags:[],
                  },
                specialisationValidate: {
                    spl_id   : {isValid: true, message: ''},
                }             
            },
            suggestions:[],
            delimiters: configConstants.KEY_CODES,
    }; 
        this.state = this.defaultState;
        this.getEditData = false;
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
    * @ShortDescription      This function is responsible to handle the close event of edit modal
    * @return                Nothing
    */
    handleClose() {
      const { dispatch }   = this.props;
      dispatch(doctorSpecialisationAction.updateState());
      this.setState(this.defaultState)
      this.getEditData = false;
      this.props.specialisationEditHideHandle();
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
    * @ShortDescription      This function is responsible to handle changes in Select state
    * @param                 Event Object
    * @return                Nothing
    */
    handleSelectChange(selectedOption, name) {
        const { specialisation, specialisationValidate }  = this.state.doctor;
        const { dispatch }   = this.props;
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
    * @ShortDescription      This function is responsible to updated State
    * @return                Nothing
    */
    componentWillReceiveProps(props) {
       const { dispatch }   = this.props;
       const { specialisation }            = this.state.doctor;
       const { specialisationValidate }    = this.state.doctor;
       if(props.isUpdateDone){
            this.setState({
                doctor : {
                    specialisation:{
                        doc_spl_id          :  String(props.specialisationUpdateData.doc_spl_id),   
                        spl_id              :  String(props.specialisationUpdateData.spl_id),
                        specialisation_tags :  [],
                    },specialisationValidate:{
                        ...specialisationValidate
                    }
                }
            });
            // Close the Modal window after 2 Sec
            setTimeout(function () {
                this.handleClose();
            }.bind(this), 2000);
       }
       if(props.specialisationDetail){
            this.setState({
                doctor : {
                    specialisation:{
                        doc_spl_id          :  String(props.specialisationDetail.doc_spl_id),   
                        spl_id              :  String(props.specialisationDetail.spl_id),
                        specialisation_tags :  props.specialisationDetail.specialisation_tags,
                    },specialisationValidate:{
                        ...specialisationValidate
                    }
                }
            });
        }
        if(props.tagSpecialisationFetch){
            this.setState({
                doctor : {
                    specialisation:{
                        ...specialisation
                    },specialisationValidate:{
                        ...specialisationValidate
                    }
                },
                suggestions:props.tagSpecialisationData
            });
        }
        
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to Submit the Edit specialisation form
    * @return                Nothing
    */
    handleSubmit() {
        const { dispatch }                  = this.props;
        const { specialisation }            = this.state.doctor;
        const { specialisationValidate }    = this.state.doctor;
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
                 const { specialisation } = this.state.doctor;
                this.setState({
                doctor : {
                    specialisation : {
                        ...specialisation,
                    },
                    specialisationValidate :{
                        ...specialisationValidate
                    }
                }
                }); 
                //Call the action function with dispatch
                dispatch(doctorSpecialisationAction.specialisationSave(specialisation, this.props.specialisationData));
            });
        }
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to connect store to props
    * @return                View
    */
    render() {
        return (
          <div >
             <DoctorSpecialisationEdit
                    isUpdateDone                = {this.props.isUpdateDone}
                    errorMsg                    = {this.props.errorMsg}
                    successMsg                  = {this.props.successMsg}
                    handleSubmit                = {this.handleSubmit}
                    submitted                   = {this.props.submitted}
                    handleSelectChange          = {this.handleSelectChange}
                    payload                     = {this.state.doctor}
                    specialisationEditShow      = {this.props.specialisationEditShow}
                    handleClose                 = {this.handleClose}
                    masterSpecialisationData    = {this.props.masterSpecialisationData}
                    handleDrag                  = {this.handleDrag}
                    handleAddition              = {this.handleAddition}
                    handleDelete                = {this.handleDelete}
                    suggestions                 = {this.state.suggestions}
                    delimiters                  = {this.state.delimiters}
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
        const { isUserNotValid, specialisationData,submitted, specialisationUpdateData, isUpdateDone, successMsg, errorMsg } = state.doctorSpecialisation;
        return {
            submitted,
            specialisationData,
            specialisationUpdateData,
            isUpdateDone,
            successMsg,
            errorMsg,
            isUserNotValid
        };
    }

    // Connection with State 
    const connectedDoctorSpecialisationEditContainer = connect(mapStateToProps)(DoctorSpecialisationEditContainer);
    export { connectedDoctorSpecialisationEditContainer as DoctorSpecialisationEditContainer }; 