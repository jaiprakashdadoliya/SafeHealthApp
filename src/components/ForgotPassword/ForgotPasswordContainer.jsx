import React from "react";
import { connect } from 'react-redux';
import { forgotPasswordActions } from '../../_actions';
import { forgotPasswordValidator } from '../../_validator';
import Loadable from 'react-loadable'; 
import { Loading } from './../../global';

const ForgotPassword = Loadable({
    loader: () => import('./ForgotPassword' /* webpackChunkName = "ForgotPassword" */).then(object => object.ForgotPassword),
    loading: Loading
});

/**
 * ForgotPasswordContainer
 *
 * @package                SafeHealth
 * @subpackage             ForgotPasswordContainer
 * @category               Container Component
 * @DateOfCreation         16 May 2018
 * @ShortDescription       This component is reponsible for logic for Forgot password
 */
class ForgotPasswordContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            forgotPassword: {
                user: {
                    user_username       : '',
                },
                userValidate:{
                     user_username      : {isValid: true, message: ''}
                }             
            }            
        };
        
        // Bind the events to the current class
        this.handleInputChange  = this.handleInputChange.bind(this);
        this.handleForgotSubmit = this.handleForgotSubmit.bind(this);
    }

    /**
    * @DateOfCreation        03 May 2018
    * @ShortDescription      This function is responsible to clear the state on load
    * @return                Nothing
    */
    componentDidMount() {
       const { dispatch }  = this.props;
       dispatch(forgotPasswordActions.updateState());
    }
    
    /**
    * @DateOfCreation        16 May 2018
    * @ShortDescription      This function is responsible to handle changes in input state
    * @param                 Event Object
    * @return                Nothing
    */
    handleInputChange(event) {
        const { name, value }           = event.target;
        const { user, userValidate }    = this.state.forgotPassword;
        this.setState({
            forgotPassword : {
                    userValidate:{
                        ...userValidate,
                        [name]: {
                            isValid: true,
                            message: ''
                        }
                    },
                    user : {
                        ...user,
                        [name]: value
                    }
            }
        });
    }

    /**
    * @DateOfCreation        16 May 2018
    * @ShortDescription      This function is responsible to Submit the Forgot password Form
    * @return                Nothing
    */
    handleForgotSubmit() {
        // Check the validation of forgot password form
        if(forgotPasswordValidator.isForgotPasswordValid(this)){
            const { dispatch }  = this.props;
            const { user }      = this.state.forgotPassword;

            //Call the action function with dispatch
            dispatch(forgotPasswordActions.forgotSubmit(user));
        }
    }
    
     /**
    * @DateOfCreation        16 May 2018
    * @ShortDescription      This function is responsible render the forgot password form
    * @return                View
    */
    render() {
        return (
            <div >    
                <ForgotPassword 
                    submitted           = {this.props.submitted}
                    successMsg          = {this.props.successMsg}
                    errorMsg            = {this.props.errorMsg}
                    handleForgotSubmit  = {this.handleForgotSubmit}
                    handleInputChange   = {this.handleInputChange}
                    payload             = {this.state.forgotPassword} 
                />
            </div>
        );
    }
}

/**
* @DateOfCreation        16 May 2018
* @ShortDescription      This function is responsible to connect store to props
* @return                View
*/
function mapStateToProps(state) {
    const { successMsg, submitted, errorMsg } = state.forgotPass;
    return {
        submitted,
        successMsg,
        errorMsg
    };
}

// Connect with state
const connectedForgotPasswordContainer = connect(mapStateToProps)(ForgotPasswordContainer);
export { connectedForgotPasswordContainer as ForgotPasswordContainer }; 
