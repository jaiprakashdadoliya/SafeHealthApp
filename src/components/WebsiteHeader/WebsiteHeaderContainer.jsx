import React from "react";
import { connect } from 'react-redux';
import 'react-select/dist/react-select.css';
import { WebsiteHeader } from './WebsiteHeader'
import { headerActions } from '../../_actions';
import { doctorDetailActions } from '../BookAppointments/DoctorDetails/doctorDetailActions';
import { configConstants } from '../../_constants';
/**
 * WebsiteHeaderContainer
 *
 * @package                SafeHealth
 * @subpackage             WebsiteHeaderContainer
 * @category               Container Component
 * @DateOfCreation         18 July 2018
 * @ShortDescription       This component is reponsible for logic in website header
 */
class WebsiteHeaderContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginShow     : false,
            registerShow  : false,
            userType      : '',          
        };
        // Bind the events to the current class
        this.handleLogout = this.handleLogout.bind(this);
        this.loginShowHandle  = this.loginShowHandle.bind(this);
        this.loginHideHandle  = this.loginHideHandle.bind(this);
        this.registerShowHandle = this.registerShowHandle.bind(this);
        this.registerPatientShowHandle = this.registerPatientShowHandle.bind(this);
        this.registerLabShowHandle = this.registerLabShowHandle.bind(this);
        this.registerHideHandle = this.registerHideHandle.bind(this);
        this.viewProfile        = this.viewProfile.bind(this);
        this.backToHome         = this.backToHome.bind(this);
        this.allDoctors         = this.allDoctors.bind(this);
        this.openRegisterPopup  = this.openRegisterPopup.bind(this);
        this.openLoginPopup     = this.openLoginPopup.bind(this);
     
    }

    /**
    * @DateOfCreation        18 July 2018
    * @ShortDescription      This function is responsible to handle the logout event
    * @return                Nothing
    */
    handleLogout() {
       const { dispatch }  = this.props;
       dispatch(headerActions.logout());
    }

    /**
    * @DateOfCreation        22 May 2018
    * @ShortDescription      This function is responsible to viewProfile event
    * @return                Nothing
    */
    viewProfile() {
        if(this.props.user.user_type == configConstants.USER_TYPE_DOCTOR){
            this.props.history.push('/appointments');
        }else if(this.props.user.user_type == configConstants.USER_TYPE_PATIENT){
            this.props.history.push('/dashboard');
        }else if(this.props.user.user_type == configConstants.USER_TYPE_LAB_MANAGER){
            this.props.history.push('/dashboard');
        }else{
            this.props.history.push('/appointments');
        }
    }
    /**
    * @DateOfCreation        22 May 2018
    * @ShortDescription      This function is responsible to viewProfile event
    * @return                Nothing
    */
    backToHome() {
        document.location.href="/";
    }

    /**
    * @DateOfCreation        22 May 2018
    * @ShortDescription      This function is responsible to list of all doctors
    * @return                Nothing
    */
    allDoctors() {
       this.props.history.push('/doctorlisting');
    }
    

     /**
    * @DateOfCreation        18 July 2018
    * @ShortDescription      This function is responsible to show the login Modal
    * @return                Nothing
    */
    loginShowHandle() {
        this.setState({ loginShow: true });
    }

    /**
    * @DateOfCreation        18 July 2018
    * @ShortDescription      This function is responsible to hide the login Modal
    * @return                Nothing
    */
    loginHideHandle() {
        this.setState({ loginShow: false });
        const { dispatch } = this.props;
        dispatch(doctorDetailActions.resetState());
    }

    /**
    * @DateOfCreation        18 July 2018
    * @ShortDescription      This function is responsible to show the register Modal
    * @return                Nothing
    */
    registerShowHandle(userType= '') {
        this.setState({ registerShow: true, userType : userType });

    }

    /**
    * @DateOfCreation        18 July 2018
    * @ShortDescription      This function is responsible to show the register as lab Modal
    * @return                Nothing
    */
    registerLabShowHandle(){
        this.registerShowHandle(configConstants.USER_TYPE_LAB_MANAGER);
    }

   /**
    * @DateOfCreation        18 July 2018
    * @ShortDescription      This function is responsible to show the register as patient Modal
    * @return                Nothing
    */
    registerPatientShowHandle(){
        this.registerShowHandle(configConstants.USER_TYPE_PATIENT);
    }

    /**
    * @DateOfCreation        18 July 2018
    * @ShortDescription      This function is responsible to hide the register Modal
    * @return                Nothing
    */
    registerHideHandle() {
        this.setState({ registerShow: false, userType:''});
    }

    componentWillReceiveProps(newProps){
        if(newProps.loginShow){
            this.setState({
                loginShow : newProps.loginShow, 
                
            })
        }
    }

    openRegisterPopup(){
        this.setState({ registerShow : true, loginShow: false})
    }

    openLoginPopup(){
        this.setState({ registerShow : false, loginShow: true})
    }

    /**
    * @DateOfCreation        18 July 2018
    * @ShortDescription      This function is responsible to show header
    * @return                View
    */
    render() {
        return (
            <div >
                <WebsiteHeader 
                    loginShowHandle             = {this.loginShowHandle}
                    loginHideHandle             = {this.loginHideHandle} 
                    registerShow                = {this.registerShow}
                    registerLabShowHandle       = {this.registerLabShowHandle}
                    registerPatientShowHandle   = {this.registerPatientShowHandle}
                    registerHideHandle          = {this.registerHideHandle}
                    loginShow                   = {this.state.loginShow}
                    registerShow                = {this.state.registerShow}
                    userType                    = {this.state.userType}
                    authenticated               = {this.props.authenticated}
                    handleLogout                = {this.handleLogout}
                    viewProfile                 = {this.viewProfile}
                    backToHome                  = {this.backToHome}
                    allDoctors                  = {this.allDoctors}
                    is_error                    = {this.props.is_error}
                    openRegisterPopup           = {this.openRegisterPopup}
                    openLoginPopup              = {this.openLoginPopup}
                    search                      = {this.props.search}
                    
                />
            </div>
        );
    }
}

/**
* @DateOfCreation        18 July 2018
* @ShortDescription      This function is responsible to connect store to props
* @return                View
*/
function mapStateToProps(state) {
    const { isLogoutDone, successMsg, errorMsg } = state.headerReducer;
    
    return {
        isLogoutDone,
        successMsg,
        errorMsg,
        user: state.session.user,
        authenticated: state.session.authenticated
    };
}

// Connection with State
const connectedWebsiteHeaderContainer = connect(mapStateToProps)(WebsiteHeaderContainer);
export { connectedWebsiteHeaderContainer as WebsiteHeaderContainer };
