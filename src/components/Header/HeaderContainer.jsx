import React from "react";
import { connect } from 'react-redux';
import { headerActions } from '../../_actions';
import { utilityHelper } from '../../_helpers';
import Loadable from 'react-loadable'; 
import { Loading } from './../../global';
import { configConstants } from './../../_constants';

const Header = Loadable({
    loader: () => import('./Header' /* webpackChunkName = "Header" */).then(object => object.Header),
    loading: Loading
});

/**
 * HeaderContainer
 *
 * @package                SafeHealth
 * @subpackage             HeaderContainer
 * @category               Container Component
 * @DateOfCreation         22 May 2018
 * @ShortDescription       This component is reponsible for logic in header
 */
class HeaderContainer extends React.Component {
    constructor(props) {
        
        super(props);
        var doctorName = utilityHelper.getUserInfo().user_firstname+' '+ utilityHelper.getUserInfo().user_lastname;
        var userType = utilityHelper.getUserInfo().user_type;
        var profileImages = '';
        
        switch(String(userType)){
            case configConstants.USER_TYPE_PATIENT:
               profileImages = utilityHelper.getUserInfo().pat_profile_img;
               break;
            case configConstants.USER_TYPE_DOCTOR:
               profileImages = utilityHelper.getUserInfo().doc_profile_img;
               break;
            default:
               profileImages = configConstants.DEFAULT_IMAGE_PATH;
        }

        this.state = {
            loggedInUser: doctorName,
            loggedInUserImage : (profileImages!='') ? profileImages: configConstants.DEFAULT_IMAGE_PATH
        };
        // Bind the events to the current class
        this.handleLogout = this.handleLogout.bind(this);
    }

    /**
    * @DateOfCreation        22 May 2018
    * @ShortDescription      This function is responsible to handle the logout event
    * @return                Nothing
    */
    handleLogout() { 
        const { dispatch }  = this.props;
        dispatch(headerActions.logout());
    }

    componentWillReceiveProps(nextProps){
        var userType = utilityHelper.getUserInfo().user_type;
        let { loggedInUserImage } = this.state;
        if((nextProps.doc_profile_img!=undefined) && (userType == configConstants.USER_TYPE_DOCTOR)){
            this.setState({
                loggedInUserImage :nextProps.doc_profile_img
            })
        }else if(nextProps.user.doc_profile_img!= undefined  && (userType == configConstants.USER_TYPE_DOCTOR)){
            this.setState({
                loggedInUserImage :nextProps.user.doc_profile_img
            })
        }else if(nextProps.pat_profile_img!=undefined  && (userType == configConstants.USER_TYPE_PATIENT)){
            this.setState({
                loggedInUserImage :nextProps.pat_profile_img
            })
        }else if(nextProps.user.pat_profile_img!= undefined  && (userType == configConstants.USER_TYPE_PATIENT)){
            this.setState({
                loggedInUserImage :nextProps.user.pat_profile_img
            })
        }else{
            this.setState({
                loggedInUserImage :configConstants.DEFAULT_IMAGE_PATH
            })
        }
    }

   
    /**
    * @DateOfCreation        22 May 2018
    * @ShortDescription      This function is responsible to show header
    * @return                View
    */
    render() {
        return (
            <div >    
                <Header 
                    handleLogout = {this.handleLogout}
                    loggedInUser = {this.state.loggedInUser}
                    userType     = {this.props.user.user_type}
                    loggedInUserImage = {this.state.loggedInUserImage}
                />
            </div>
        );
    }
}

/**
* @DateOfCreation        22 May 2018
* @ShortDescription      This function is responsible to connect store to props
* @return                View
*/
function mapStateToProps(state) {
    const { isLogoutDone, successMsg, errorMsg } = state.headerReducer;
    const { doc_profile_img }  = state.doctorProfile;
    const { pat_profile_img }  = state.patientProfile;
    return {
        isLogoutDone,
        successMsg,
        errorMsg,
        doc_profile_img,
        pat_profile_img,
        user: state.session.user
    };
}

// Connection with State 
const connectedHeaderContainer = connect(mapStateToProps)(HeaderContainer);
export { connectedHeaderContainer as HeaderContainer }; 

