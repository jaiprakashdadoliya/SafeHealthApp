/**
 * DoctorEducationDegreeAddContainer
 *
 * @package                SafeHealth
 * @subpackage             DoctorEducationDegreeAddContainer
 * @category               Container Component
 * @DateOfCreation         31 May 2018
 * @ShortDescription       This component is reponsible for add education degree
 */
import React from "react";
import { connect } from 'react-redux';
import { utilityHelper } from '../../../_helpers';

import {Button, Modal} from 'react-bootstrap';
import {doctorDegreeActions, headerActions } from '../../../_actions';
import {DoctorEducationDegreeAdd} from './DoctorEducationDegreeAdd';
import {doctorDegreeValidator} from '../../../_validator';


class DoctorEducationDegreeAddContainer extends React.Component
{
    /**
     * @DateOfCreation        31 May 2018
     * @ShortDescription      Contructor is responsible to function declaration and define intial state
     * @param                 props
     * @return                Nothing
     */
    constructor(props, context) {
        super(props, context);
        this.state = this.initialState;
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    /**
     * @DateOfCreation        31 May 2018
     * @ShortDescription      This function is responsible to set initial state
     * @return                Nothing
     */
    get initialState()  {
        return {
            degree : {
                detail:{
                    'doc_deg_name': '',
                    'doc_deg_passing_year': '',
                    'doc_deg_institute': ''
                },
                validate:{
                    doc_deg_name: {isValid:true, message: ''},
                    doc_deg_passing_year: {isValid:true, message: ''},
                    doc_deg_institute: {isValid:true, message: ''}
                }
            }
        }
    }

    /**
     * @DateOfCreation        31 May 2018
     * @ShortDescription      This function is responsible to set props in state on view page
     *                        and after update again set state.
     * @param Object props    get props for edit mode
     * @return                Nothing
     */
    componentWillReceiveProps(nextProps){
        if(nextProps.addSuccessMessage){
            setTimeout(function() {
                this.handleClose();
            }.bind(this), 2000);
        }
    }
    /**
     * @DateOfCreation        31 May 2018
     * @ShortDescription      This function is responsible to handle close add degree model
     * @return                Nothing
     */
    handleClose() {
        const { dispatch }  = this.props;
        dispatch(doctorDegreeActions.resetState());
        this.setState(this.initialState);
        this.props.refreshDoctorProfile();
        this.props.degreeAddHideHandle();
    }

    /**
     * @DateOfCreation        22 May 2018
     * @ShortDescription      This function is responsible to set state for onchange on view page
     *                         so we can type in form.
     * @return                Nothing
     */
    handleChange(event) {
        const { name, value } = event.target;
        const { detail,validate } = this.state.degree;
        this.setState({
            degree: {
                validate:{
                    ...validate,
                    [name]: {
                        isValid: true,
                        message: ''
                    }
                },
                detail: {
                    ...detail,
                    [name]: value
                }
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
        const { detail, validate }  = this.state.degree;
        this.setState({
            degree : {
                detail : {
                    ...detail,
                    [name]: selectedOption.value
                },
                validate:{
                    ...validate,
                    [name]: {
                        isValid: true,
                        message: ''
                    }
                },
            }
        });
    }


    /**
     * @DateOfCreation        22 May 2018
     * @ShortDescription      This function is responsible to save degree detail.
     * @return                Nothing
     */
    handleSave() {
        if(doctorDegreeValidator.isDegreeValid(this)){
            const { detail } = this.state.degree;
            const { dispatch } = this.props;
            dispatch(doctorDegreeActions.degreeSave(detail));
        }
    }

    /**
     * @DateOfCreation        29 May 2018
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
     * @DateOfCreation        22 May 2018
     * @ShortDescription      This function is responsible to include add degree view.
     * @return                Nothing
     */
    render() {
        return(
            <div>
                <DoctorEducationDegreeAdd
                    handleChange={this.handleChange}
                    degreeAddShow = {this.props.degreeAddShow}
                    payload = {this.state.degree}
                    handleClose = {this.handleClose}
                    handleSelectChange = {this.handleSelectChange}
                    handleSave = {this.handleSave}
                    addSuccessMessage = { this.props.addSuccessMessage }
                    sendingRequest = { this.props.sendingRequest}
                    errorMsg = { this.props.errorMsg }
                />
            </div>
        );
    }
}


/**
 * @DateOfCreation        22 May 2018
 * @ShortDescription      connect state to props on reducer and get state for add degree
 * @param Object state    All the state has come from reducer
 * @return  object        degree list, sending request message and success message
 */
function mapStateToProps(state) {
    const { isUserNotValid,addSuccessMessage,sendingRequest, degrees,errorMsg } = state.doctorDegree;
    return {
        isUserNotValid,
        addSuccessMessage,
        sendingRequest,
        degrees,
        errorMsg
    };
}

const connectedDoctorEducationDegreeAddContainer = connect(mapStateToProps)(DoctorEducationDegreeAddContainer);
export { connectedDoctorEducationDegreeAddContainer as DoctorEducationDegreeAddContainer };