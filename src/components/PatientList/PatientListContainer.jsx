import React from "react";
import { connect } from 'react-redux';
import { patientProfileAction, headerActions } from '../../_actions';
import Loadable from 'react-loadable';
import { Loading } from './../../global';

const Patient = Loadable({
    loader: () => import('./Patient' /* webpackChunkName = "Patient" */).then(object => object.Patient),
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

class PatientListContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.newPatientModalShowHandle = this.newPatientModalShowHandle.bind(this);
        this.newPatientModalHideHandle = this.newPatientModalHideHandle.bind(this);
        this.getPatientList            = this.getPatientList.bind(this);
        this.handlePatientEdit         = this.handlePatientEdit.bind(this);
        this.patientSearch             = this.patientSearch.bind(this);
        this.handlePatientAllVisits    = this.handlePatientAllVisits.bind(this);
        this.handlePatientProfile      = this.handlePatientProfile.bind(this);
        this.state = {
            newPatientModalShow : false,
            patientDetail       : '',
            loading             : false,
            pages               : 0,
            pat_id              : '',
            visit_id            : '',
            filtered            : [],
            filterAll           : '',
        };
    }

    /**
     * @DateOfCreation        20 June 2018
     * @ShortDescription      This function is responsible to show new patient modal form
     * @return                Nothing
     */
    newPatientModalShowHandle() {
        this.setState({ newPatientModalShow: true });
    }

    /**
     * @DateOfCreation        20 June 2018
     * @ShortDescription      This function is responsible to hide new patient modal form
     * @return                Nothing
     */
    newPatientModalHideHandle() {
        this.setState({ newPatientModalShow: false });
    }

    /**
     * @DateOfCreation        20 June 2018
     * @ShortDescription      This function is responsible to get patient list from api
     * @return                Nothing
     */
    getPatientList(page, pageSize, sorted, filtered){
        const { dispatch } = this.props;
        dispatch(patientProfileAction.getPatientList(page, pageSize, sorted, filtered));
    }

    /**
     * @DateOfCreation        21 June 2018
     * @ShortDescription      This function is responsible to get visit id of patient from api
     * @return                Nothing
     */
    handlePatientEdit(patientId, visitId){
        const { dispatch } = this.props;
        this.setState({
            newPatientModalShow : false,
            patientDetail       : '',
            loading             : false,
            pages               : 0,
            pat_id              : patientId,
            visit_id            : visitId,
        },function(){
          window.location = process.env.BASENAME+'editpatient/'+this.state.pat_id+'/'+this.state.visit_id;
        });
   }

    /**
     * @DateOfCreation        26 June 2018
     * @ShortDescription      This function is responsible to handle load filtered eduction list
     * @return                Nothing
     */
    patientSearch(event){
        const { value } = event.target;
        const filterAll = value;
        const filtered = [{ id: 'all', value: filterAll }];
        this.setState({ filterAll, filtered });
    }

    /**
     * @DateOfCreation        20 June 2018
     * @ShortDescription      This function is responsible to redirect patient visit list page
     * @return                Nothing
     */
    handlePatientAllVisits(patientId){
        if(patientId != false){
            this.props.history.push("/patientallvisit/"+patientId);
        }
    }

    handlePatientProfile(patientId){
        if(patientId != false){
            this.props.history.push("/patientprofile/"+patientId);
        }
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
    }

    render() {
        return (
          <div className="page-container">
          <SideMenu />
          <div className="main-content right-sidebar-remove">
            <HeaderContainer />
                <Patient
                    newPatientModalShowHandle     = {this.newPatientModalShowHandle}
                    newPatientModalHideHandle     = {this.newPatientModalHideHandle}
                    newPatientModalShow           = {this.state.newPatientModalShow}
                    patientList                   = {this.props.patientList}
                    loading                       = {this.props.loading}
                    pages                         = {this.props.pages}
                    getPatientList                = {this.getPatientList}
                    handlePatientEdit             = {this.handlePatientEdit}
                    patientVisitId                = {this.state.visitId}
                    filterAll                     = { this.state.filterAll }
                    filtered                      = { this.state.filtered }
                    patientSearch                 = { this.patientSearch }
                    handlePatientAllVisits        = { this.handlePatientAllVisits }
                    handlePatientProfile          = { this.handlePatientProfile }
                />
            </div>
            </div>
        );
    }
}

/**
 * @DateOfCreation        18 June 2018
 * @ShortDescription      This function is responsible to map store state to props
 * @return                View
 */
function mapStateToProps(state) {
    const { getVisitId, pages, patientList, patientVisitId, isUserNotValid } = state.patientProfile;
    return {
        getVisitId,
        pages,
        patientList,
        patientVisitId,
        isUserNotValid
    };
}

const connectedPatientListContainer = connect(mapStateToProps)(PatientListContainer);
export { connectedPatientListContainer as PatientListContainer };
