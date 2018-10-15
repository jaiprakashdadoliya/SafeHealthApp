import React from "react";
import { connect } from 'react-redux';
import { utilityHelper, history } from '../../_helpers';
import { Cookies } from 'react-cookie';
import Loadable from 'react-loadable';
import { Loading } from './../../global';

const DoctorBasicInfo = Loadable({
    loader: () => import('./DoctorBasicInfo' /* webpackChunkName = "DoctorBasicInfo" */).then(object => object.DoctorBasicInfo),
    loading: Loading
});

const SideMenu = Loadable({
    loader: () => import('../SideMenu' /* webpackChunkName = "HeaderContainer" */).then(object => object.SideMenu),
    loading: Loading
});
const HeaderContainer = Loadable({
    loader: () => import('../Header' /* webpackChunkName = "HeaderContainer" */).then(object => object.HeaderContainer),
    loading: Loading
});

const DoctorEducationDegreeContainer = Loadable({
    loader: () => import('./DoctorEducationDegree' /* webpackChunkName = "DoctorEducationDegreeContainer" */).then(object => object.DoctorEducationDegreeContainer),
    loading: Loading
});

const DoctorExperienceContainer = Loadable({
    loader: () => import('./DoctorExperience' /* webpackChunkName = "DoctorExperienceContainer" */).then(object => object.DoctorExperienceContainer),
    loading: Loading
});

const DoctorMembershipContainer = Loadable({
    loader: () => import('./DoctorMembership' /* webpackChunkName = "DoctorMembershipContainer" */).then(object => object.DoctorMembershipContainer),
    loading: Loading
});

const LoginContainer = Loadable({
    loader: () => import('../Login' /* webpackChunkName = "LoginContainer" */).then(object => object.LoginContainer),
    loading: Loading
});

const DoctorAwardsContainer = Loadable({
    loader: () => import('./DoctorAwards/DoctorAwardsContainer' /* webpackChunkName = "DoctorAwardsContainer" */).then(object => object.DoctorAwardsContainer),
    loading: Loading
});

const DoctorAwardsAddContainer = Loadable({
    loader: () => import('./DoctorAwards/DoctorAwardsAddContainer' /* webpackChunkName = "DoctorAwardsAddContainer" */).then(object => object.DoctorAwardsAddContainer),
    loading: Loading
});

const DoctorMediaContainer = Loadable({
    loader: () => import('./DoctorMedia' /* webpackChunkName = "DoctorMediaContainer" */).then(object => object.DoctorMediaContainer),
    loading: Loading
});

const DoctorSpecialisationContainer = Loadable({
    loader: () => import('./DoctorSpecialisation' /* webpackChunkName = "DoctorSpecialisationContainer" */).then(object => object.DoctorSpecialisationContainer),
    loading: Loading
});

const DoctorTimingContainer = Loadable({
    loader: () => import('./DoctorTiming' /* webpackChunkName = "DoctorTimingContainer" */).then(object => object.DoctorTimingContainer),
    loading: Loading
});

import { doctorExperienceConstants, configConstants } from '../../_constants';
import { doctorProfileActions, regionActions } from '../../_actions';

/**
 * DoctorProfileContainer
 *
 * @package                SafeHealth
 * @subpackage             DoctorProfileContainer
 * @category               Container Component
 * @DateOfCreation         17 May 2018
 * @ShortDescription       This component is reponsible for logic for doctor's profile
 */
class DoctorProfileContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * @DateOfCreation        17 May 2018
     * @ShortDescription      This function is responsible to show Doctor profile page
     * @return                View
     */
    render() {
        const accessToken = utilityHelper.getLoginAccessToken();
        const userInfo = utilityHelper.getUserInfo();
        if(typeof accessToken === "undefined"){
            history.push('/');
            return <LoginContainer />
        }else if(userInfo.user_type != configConstants.USER_TYPE_DOCTOR){
            history.push('/');
            return <LoginContainer />
        }else{
                return (
                  <div className="page-container">
                  <SideMenu />
                  <div className=" right-sidebar-remove">
                    <HeaderContainer />
                    <div className="main-content">
                            <div className="wrap-inner-content">
                            <div className="col-md-12">
                                <DoctorBasicInfo
                                    profileDetail   = {this.props.profileDetail}
                                />
                                <div className="col-md-9 scroll rrp">
                                    <DoctorSpecialisationContainer />
                                    <DoctorEducationDegreeContainer />
                                    <DoctorAwardsContainer />
                                    <DoctorExperienceContainer/>
                                    <DoctorMembershipContainer />
                                    <DoctorMediaContainer />
                                    <DoctorTimingContainer />
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    </div>
                );
        }
    }

}

/**
 * @DateOfCreation        17 May 2018
 * @ShortDescription      This function is responsible to connect store to props
 * @return                View
 */
function mapStateToProps(state) {
    const { profileDetail, errorMsg } = state.doctorProfile;
    return {
        profileDetail,
        errorMsg,
    };
}

// Connect with state
const connectedDoctorProfileContainer = connect(mapStateToProps)(DoctorProfileContainer);
export { connectedDoctorProfileContainer as DoctorProfileContainer };
