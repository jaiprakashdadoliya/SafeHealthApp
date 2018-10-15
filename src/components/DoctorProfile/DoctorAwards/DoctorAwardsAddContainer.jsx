/**
 * DoctorAwardsAddContainer
 *
 * @package                SafeHealth
 * @subpackage             DoctorAwardsAddContainer
 * @category               Container Component
 * @DateOfCreation         15 May 2018
 * @ShortDescription       This component is reponsible for add/edit award
 */
import React from "react";
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { utilityHelper } from '../../../_helpers';
import { doctorAwardsActions } from '../../../_actions';
import { doctorAwardsValidator } from '../../../_validator';
import { DoctorAwardsAdd } from './DoctorAwardsAdd';

class DoctorAwardsAddContainer extends React.Component {

    /**
     * @DateOfCreation        24 May 2018
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

    get initialState() {
        return {
            award : {
                detail : {
                    'doc_award_id'   : '',
                    'doc_award_name' : '',
                    'doc_award_year' : ''
                },
                validate : {
                    doc_award_name : { isValid : true, message : '' },
                    doc_award_year : { isValid : true, message : '' },
                }
            },
            title : 'Add Award',
        }
    }

    /**
     * @DateOfCreation        24 May 2018
     * @ShortDescription      This function is responsible to handle close add/edit award modal
     * @return                Nothing
     */
    handleClose() {
        const { dispatch } = this.props;
        dispatch(doctorAwardsActions.resetState());
        this.setState(this.initialState);
        this.props.awardAddHideHandle();
    }

    /**
     * @DateOfCreation        24 May 2018
     * @ShortDescription      This function is responsible to set state for onchange on view page
     *                         so we can type in form.
     * @return                Nothing
     */
    handleChange(event) {
        const { name, value } = event.target;
        const { detail, validate } = this.state.award;
        this.setState({
            award : {
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
    * @DateOfCreation        24 May 2018
    * @ShortDescription      This function is responsible to handle changes in Select state
    * @param                 Event Object
    * @return                Nothing
    */
    handleSelectChange(selectedOption, name) {
        const { detail, validate } = this.state.award;
        this.setState({
            award : {
                detail : {
                    ...detail,
                    [name] : selectedOption.value
                },
                validate : {
                    ...validate,
                    [name] : {
                        isValid : true,
                        message : ''
                    }
                },
            }
        });
    }

    /**
     * @DateOfCreation        24 May 2018
     * @ShortDescription      This function is responsible to save award detail.
     * @return                Nothing
     */ 
    handleSave() {
        if(doctorAwardsValidator.isAwardValid(this)) {
            const { detail } = this.state.award;
            const { dispatch } = this.props;
            dispatch(doctorAwardsActions.awardSave(detail, this.props.awards));
        }
    }

    /**
     * @DateOfCreation        24 May 2018
     * @ShortDescription      This function is responsible to show award detail on edit award view.
     * @return                Nothing
     */
    componentWillReceiveProps(newProps) {
        if(newProps.isAwardSaved == true) {
            setTimeout(function() { 
                this.handleClose();
            }.bind(this), 2000);
        }else{
            if(newProps.awardEditDetail.doc_award_id) {
                this.setState({
                    award : {
                        detail : {
                            'doc_award_id'   : newProps.awardEditDetail.doc_award_id,
                            'doc_award_name' : newProps.awardEditDetail.doc_award_name,
                            'doc_award_year' : String(newProps.awardEditDetail.doc_award_year),
                        },
                        validate : {
                            doc_award_name : { isValid:true, message : '' },
                            doc_award_year : { isValid:true, message : '' },
                        }
                    },
                    title : 'Edit Award',
                });
            }else{
                this.setState(this.initialState);
            }
        }
    }

    /**
     * @DateOfCreation        24 May 2018
     * @ShortDescription      This function is responsible to include add/edit award view.
     * @return                Nothing
     */ 
    render() {
        return (
            <div>
                <DoctorAwardsAdd
                    handleChange       = { this.handleChange }
                    handleSelectChange = { this.handleSelectChange }
                    awardAddShow       = { this.props.awardAddShow }
                    payload            = { this.state.award }
                    handleClose        = { this.handleClose }
                    handleSave         = { this.handleSave }
                    message            = { this.props.successMessage }
                    title              = { this.state.title }
                    isAwardSaved       = { this.props.isAwardSaved }
                    submitted          = { this.props.submitted }
                    errorMsg           = { this.props.errorMsg }
                />
            </div>
        );
    }
}

/**
 * @DateOfCreation        24 May 2018
 * @ShortDescription      connect state to props on reducer and get state for add/edit Award
 * @param Object state    All the state has come from reducer
 * @return  object        Awards list, sending request message and success message
 */
function mapStateToProps(state) {
    const { successMessage, sendingRequest, submitted, awards, errorMsg, isAwardSaved } = state.doctorAwards;

    return {
        successMessage,
        sendingRequest,
        isAwardSaved,
        submitted,
        awards,
        errorMsg,
    };
}

const connectedDoctorAwardsAddContainer = connect(mapStateToProps)(DoctorAwardsAddContainer);
export { connectedDoctorAwardsAddContainer as DoctorAwardsAddContainer }; 