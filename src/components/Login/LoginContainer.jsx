import React from "react";
import { connect } from 'react-redux';
import { Login } from "./Login";
import { userLoginActions } from '../../_actions';
import { userLoginValidator } from '../../_validator';
import { utilityHelper } from '../../_helpers';
import { configConstants } from '../../_constants'
/**
 * LoginContainer
 *
 * @package                SafeHealth
 * @subpackage             LoginContainer
 * @category               Container Component
 * @DateOfCreation         09 May 2018
 * @ShortDescription       This component is reponsible for logic in Login Page
 */
class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: {
                user: {
                    user_username      : '',
                    user_password      : ''
                },
                userValidate: {
                    user_username      : {isValid: true, message: ''},
                    user_password      : {isValid: true, message: ''}
                }             
            }            
        };
        
        // Bind the events to the current class
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleEnterPressSubmit = this.handleEnterPressSubmit.bind(this);
    }

    /**
    * @DateOfCreation        03 May 2018
    * @ShortDescription      This function is responsible to clear the state on load
    * @return                Nothing
    */
    componentDidMount() {
       const { dispatch }  = this.props;
       dispatch(userLoginActions.updateState());
    }
    
    /**
    * @DateOfCreation        09 May 2018
    * @ShortDescription      This function is responsible to handle changes in input state
    * @param                 Event Object
    * @return                Nothing
    */
    handleInputChange(event) {
        const { name, value }       = event.target;
        const { user }              = this.state.login;
        const { userValidate }      = this.state.login;
        this.setState({
            login : {
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
    * @DateOfCreation        09 May 2018
    * @ShortDescription      This function is responsible to Submit the login Form
                             with Handle Enter key 
    * @return                Nothing
    */
    handleEnterPressSubmit(event){
        if(event.key == 'Enter'){
            this.handleLoginSubmit();
        }
    }
    
    /**
    * @DateOfCreation        09 May 2018
    * @ShortDescription      This function is responsible to Submit the login Form
                             with direct click event
    * @return                Nothing
    */
    handleLoginSubmit() {
        const { dispatch }  = this.props;
        const { user }      = this.state.login;
        if(userLoginValidator.isLoginValid(this)){
            const { dispatch }  = this.props;
            const { user }      = this.state.login;

            //Call the action function with dispatch
            dispatch(userLoginActions.loginSubmit(user));
            
        }
    }
    /**
    * @DateOfCreation        15 May 2018
    * @ShortDescription      This function is responsible to check the login 
                             is completed or not
    * @return                Redirect
    */
    componentDidUpdate(){
        if(this.props.authenticated && !utilityHelper.isObjectEmpty(this.props.user)){
            if (!this.props.popup) {
                var userinfo = this.props.user;
                if(userinfo.user_type == configConstants.USER_TYPE_DOCTOR){
                    this.props.history.push("/appointments");
                }else if(!this.props.popup && userinfo.user_type == configConstants.USER_TYPE_PATIENT){
                    this.props.history.push("/dashboard");
                }else if(!this.props.popup && userinfo.user_type == configConstants.USER_TYPE_LAB_MANAGER){
                    this.props.history.push("/reportslist");
                }else{
                    this.props.history.push("/patientlist");
                }
            }else{
                 setTimeout(function () {
                    this.props.loginHideHandle();
                }.bind(this), 500);
            }
        }
    }

    
    /**
    * @DateOfCreation        08 May 2018
    * @ShortDescription      This function is responsible to show Login form
    * @return                View
    */
    render() {
        return (
            <div >    
                <Login 
                    submitted               = {this.props.submitted}
                    errorMsg                = {this.props.errorMsg}
                    handleLoginSubmit       = {this.handleLoginSubmit}
                    handleInputChange       = {this.handleInputChange}
                    handleEnterPressSubmit  = {this.handleEnterPressSubmit}
                    payload                 = {this.state.login}
                    popup                   = {this.props.popup}
                    isLoginDone             = {this.props.isLoginDone}
                    openRegisterPopup       = {this.props.openRegisterPopup}
                />
            </div>
        );
    }
}

/**
* @DateOfCreation        10 May 2018
* @ShortDescription      This function is responsible to connect store to props
* @return                View
*/
function mapStateToProps(state) {
    const { isLoginDone, submitted, errorMsg } = state.userLogin;
    return {
        isLoginDone,
        submitted,
        errorMsg,
        user: state.session.user,
        authenticated: state.session.authenticated
    };
}

// Connection with State 
const connectedLoginContainer = connect(mapStateToProps)(LoginContainer);
export { connectedLoginContainer as LoginContainer };
