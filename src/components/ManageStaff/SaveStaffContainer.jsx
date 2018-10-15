import React from "react";
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { utilityHelper } from '../../_helpers';
import { manageStaffActions, staticDataActions } from '../../_actions';
import { manageStaffValidator } from '../../_validator';
import { SaveStaff } from './SaveStaff';

class SaveStaffContainer extends React.Component {
  /**
     * @DateOfCreation        13 June 2018
     * @ShortDescription      Contructor is responsible to function declaration and define intial state
     * @param                 props
     * @return                Nothing
     */
    constructor(props, context) {
        super(props, context);
        this.state              = this.initialState;
        this.handleClose        = this.handleClose.bind(this);
        this.handleChange       = this.handleChange.bind(this);
        this.handleSave         = this.handleSave.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    get initialState() {
        return {
            staff : {
                detail : {
                    'doc_staff_id'       : '',
                    'user_id'            : '',
                    'user_firstname'     : '',
                    'user_lastname'      : '',
                    'user_gender_id'     : '',
                    'user_mobile'        : '',
                    'user_email'         : '',
                    'user_type_id'       : '',
                    'user_password'      : '',
                    'user_adhaar_number' : '',
                    'user_country_code'  : '91',
                },
                validate : {
                    user_firstname     : { isValid : true, message : '' },
                    user_lastname      : { isValid : true, message : '' },
                    user_gender_id     : { isValid : true, message : '' },
                    user_mobile        : { isValid : true, message : '' },
                    user_email         : { isValid : true, message : '' },
                    user_type_id       : { isValid : true, message : '' },
                    user_password      : { isValid : true, message : '' },
                    user_adhaar_number : { isValid : true, message : '' },
                }
            },
            title : 'Add Staff',
        }
    }

    /**
     * @DateOfCreation        13 June 2018
     * @ShortDescription      This function is responsible to handle close add/edit staff modal
     * @return                Nothing
     */
    handleClose() {
        const { dispatch } = this.props;
        dispatch(manageStaffActions.resetState());
        this.setState(this.initialState);
        this.props.saveStaffHideHandle();
    }

    /**
     * @DateOfCreation        13 June 2018
     * @ShortDescription      This function is responsible to set state for onchange on view page
     *                         so we can type in form.
     * @return                Nothing
     */
    handleChange(event) {
        const { name, value } = event.target;
        const { detail, validate } = this.state.staff;
        this.setState({
            staff : {
                validate : {
                    ...validate,
                    [name] : {
                        isValid : true,
                        message : ''
                    }
                },
                detail : {
                    ...detail,
                    [name] : value
                }
            }
        });
    }

    /**
    * @DateOfCreation        14 June 2018
    * @ShortDescription      This function is responsible to handle changes in Select state
    * @param                 Event Object
    * @return                Nothing
    */
    handleSelectChange(selectedOption, name) {
        const { detail, validate } = this.state.staff;
        this.setState({
            staff : {
                validate : {
                    ...validate,
                    [name] : {
                        isValid : true,
                        message : ''
                    }
                },
                detail : {
                    ...detail,
                    [name] : selectedOption.value
                },
            }
        });
    }

    /**
     * @DateOfCreation        13 June 2018
     * @ShortDescription      This function is responsible to save staff detail.
     * @return                Nothing
     */ 
    handleSave() {
        if(manageStaffValidator.isStaffValid(this)) {
            const { detail } = this.state.staff;
            const { dispatch } = this.props;
            dispatch(manageStaffActions.staffSave(detail, this.props.staffList));
        }
    }

    /**
     * @DateOfCreation        14 June 2018
     * @ShortDescription      This function is responsible to show staff detail on edit staff view.
     * @return                Nothing
     */
    componentWillReceiveProps(newProps) {
        if(newProps.isStaffSaved == true) {
            setTimeout(function() { 
                this.handleClose(); 
            }.bind(this), 2000);
        }else{
            if(newProps.staffEditDetail.doc_staff_id) {
                this.setState({
                    staff : {
                        detail : {
                            'doc_staff_id'       : newProps.staffEditDetail.doc_staff_id,
                            'user_id'            : newProps.staffEditDetail.user_id,
                            'user_firstname'     : newProps.staffEditDetail.user_firstname,
                            'user_lastname'      : newProps.staffEditDetail.user_lastname,
                            'user_gender_id'     : newProps.staffEditDetail.user_gender_id,
                            'user_mobile'        : newProps.staffEditDetail.user_mobile,
                            'user_email'         : newProps.staffEditDetail.user_email,
                            'user_type_id'       : newProps.staffEditDetail.user_type_id,
                            'user_password'      : newProps.staffEditDetail.user_password,
                            'user_adhaar_number' : newProps.staffEditDetail.user_adhaar_number,
                            'user_country_code'  : newProps.staffEditDetail.user_country_code,
                        },
                        validate : {
                            user_firstname     : { isValid : true, message : '' },
                            user_lastname      : { isValid : true, message : '' },
                            user_gender_id     : { isValid : true, message : '' },
                            user_mobile        : { isValid : true, message : '' },
                            user_email         : { isValid : true, message : '' },
                            user_type_id       : { isValid : true, message : '' },
                            user_password      : { isValid : true, message : '' },
                            user_adhaar_number : { isValid : true, message : '' },
                        }
                    },
                    title : 'Edit Staff',
                });
            }else{
                if(!newProps.errorMsg){
                    this.setState(this.initialState);
                }
            }
        }
    }

    /**
     * @DateOfCreation        13 June 2018
     * @ShortDescription      This function is responsible to include add/edit staff view.
     * @return                Nothing
     */ 
    render() {
        return (
            <div>
                <SaveStaff
                    handleChange       = { this.handleChange }
                    handleSelectChange = { this.handleSelectChange }
                    saveStaffShow      = { this.props.saveStaffShow }
                    payload            = { this.state.staff }
                    handleClose        = { this.handleClose }
                    handleSave         = { this.handleSave }
                    message            = { this.props.successMessage }
                    title              = { this.state.title }
                    isStaffSaved       = { this.props.isStaffSaved }
                    submitted          = { this.props.submitted }
                    errorMsg           = { this.props.errorMsg }
                    staticDatafetched  = { this.props.staticDatafetched }
                    staticData         = { this.props.staticData }
                />
            </div>
        );
    }
}


/**
 * @DateOfCreation        13 June 2018
 * @ShortDescription      connect state to props on reducer and get state for add/edit Staff
 * @param Object state    All the state has come from reducer
 * @return  object        Staff list, sending request message and success message
 */
function mapStateToProps(state) {
    const { successMessage, sendingRequest, submitted, staffList, errorMsg } = state.manageStaff;
    const isStaffSaved = state.manageStaff.isStaffSaved;
    const {staticDatafetched, staticData} = state.staticData;

    return {
        successMessage,
        sendingRequest,
        isStaffSaved,
        submitted,
        staffList,
        errorMsg,
        staticDatafetched,
        staticData
    };
}

const connectedSaveStaffContainer = connect(mapStateToProps)(SaveStaffContainer);
export { connectedSaveStaffContainer as SaveStaffContainer }; 
