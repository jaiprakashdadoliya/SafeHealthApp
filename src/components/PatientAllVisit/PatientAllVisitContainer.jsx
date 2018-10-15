import React from "react";
import { connect } from 'react-redux';
import Loadable from 'react-loadable';
import { Loading } from './../../global';
import { confirmAlert } from 'react-confirm-alert';
import {patientAllVisitActions, patientVisitList} from './patientAllVisitActions';
import { dataConstants, configConstants } from '../../_constants';
import {patientProfileAction,headerActions} from '../../_actions';
import { utilityHelper } from '../../_helpers';

const PatientAllVisitList = Loadable({
    loader: () => import('./PatientAllVisitList' /* webpackChunkName = "PatientAllVisitList" */).then(object => object.PatientAllVisitList),
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

class PatientAllVisitContainer extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.booking_id             = '';
        this.patientNewVisitCreate  = this.patientNewVisitCreate.bind(this);
        this.patientVisitListSearch = this.patientVisitListSearch.bind(this);
        this.getPatientVisitList    = this.getPatientVisitList.bind(this);
        this.redirectHandleVisitPage= this.redirectHandleVisitPage.bind(this);
        this.newVisit  = true;
        this.isPending = false;
        if(this.props.match.params.bookingId != undefined){
            this.booking_id = this.props.match.params.bookingId;
        }
        this.state = {
            pages               : 0,
            filtered            : [],
            filterAll           : '',
        };
    }

    /**
     * @DateOfCreation        14 june 2018
     * @ShortDescription      This function is responsible delete symptom confirm alert
     * @param                 Event Object
     * @return                Nothing
     */
    patientNewVisitCreate(pat_Id,bookingId){
        if(pat_Id!== null && pat_Id !=''){
            let patDetails = {};
            patDetails['patientUserId'] = pat_Id;
            patDetails['patientBookingId'] = bookingId;
            const { dispatch } = this.props;
            dispatch(patientAllVisitActions.newVisitCreate(patDetails));
            this.isPending = true;
        }
    }

    /**
     * @DateOfCreation        21 June 2018
     * @ShortDescription      This function is responsible to handle redirect after getting patient visit id
     * @return                Nothing
     */
    componentWillReceiveProps(props){
        const {dispatch} = this.props;
        if(props.fetchedNewVisitData && this.newVisit){
            let urlre = ( (props.patientNewVisitData.visit_type == dataConstants.INITIAL_VISIT_TYPE || props.patientNewVisitData.visit_type == dataConstants.FOLLOWUP_VISIT_TYPE) ? '/patientnewvisit/' :'/editpatient/');
            if(this.booking_id != ''){
                urlre = urlre +this.props.match.params.patId+'/'+ props.patientNewVisitData.visit_id+'/'+ this.booking_id;
            }else{
                urlre = urlre +this.props.match.params.patId+'/'+ props.patientNewVisitData.visit_id;
            }

            if(props.patientNewVisitData.is_pending == true && this.isPending){
                confirmAlert({
                    title: 'New Visit',
                    message: 'Please finish patient last visit before creating new one.',
                    buttons: [
                        {
                            label: 'Ok',
                            onClick: () => {
                                this.newVisit  = false;
                                this.isPending = false;
                                props.patientNewVisitData.is_pending = false;
                                dispatch(patientAllVisitActions.resetState());
                                props.history.push(urlre);
                            }
                        },
                        {
                            label: <div className='btn default table-btn'>Cancel</div>,
                            onClick: () => {
                                this.isPending = false;
                                props.patientNewVisitData.is_pending = false;
                                return false;
                            }
                        }
                    ]
                })
            }

            if(props.patientNewVisitData.is_pending == false && this.isPending){
                this.isPending = false;
                this.newVisit  = false;
                dispatch(patientAllVisitActions.resetState());
                props.history.push(urlre);
            }
        }
    }

    /**
     * @DateOfCreation        11 July 2018
     * @ShortDescription      This function is responsible to handle load filtered eduction list
     * @return                Nothing
     */
    patientVisitListSearch(event){
        const { value } = event.target;
        const filterAll = value;
        const filtered = [{ id: 'all', value: filterAll }];
        this.setState({ filterAll, filtered });
    }

    /**
     * @DateOfCreation        20 June 2018
     * @ShortDescription      This function is responsible to get patient list from api
     * @return                Nothing
     */
    getPatientVisitList(page, pageSize, sorted, filtered){
        const userInfo = utilityHelper.getUserInfo();
        const currentUserType = userInfo.user_type;
        var patId = '';
        if(currentUserType == configConstants.USER_TYPE_PATIENT){
            patId = userInfo.user_id;
        }else{
            patId = this.props.match.params.patId;
        }
        const { dispatch } = this.props;
        dispatch(patientAllVisitActions.patientVisitList(patId, page, pageSize, sorted, filtered, this.booking_id));
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to handel redirect in inital or followup visitPage
    * @return                Redirect
    */
    redirectHandleVisitPage(patientId, visitId, visitType){
        if(patientId != false){
            if(this.booking_id != ''){
                this.props.history.push("/patientnewvisit/"+patientId+"/"+visitId+'/'+this.props.match.params.bookingId);
            }else{
                this.props.history.push("/patientnewvisit/"+patientId+"/"+visitId);
            }
        }
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get all information for patientProfile
    * @return                Redirect
    */
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(patientProfileAction.patientProfileRequest(this.props.match.params.patId));
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
          <div className=" right-sidebar-remove">
            <HeaderContainer />
                <PatientAllVisitList
                    patientNewVisitCreate   = { this.patientNewVisitCreate }
                    patId                   = { this.props.match.params.patId }
                    bookingId               = { this.booking_id }
                    patientVisitList        = { this.props.patientVisitList }
                    patientVisitListSearch  = { this.patientVisitListSearch }
                    getPatientVisitList     = { this.getPatientVisitList }
                    redirectHandleVisitPage = { this.redirectHandleVisitPage }
                    pages                   = { this.props.pages }
                    filterAll               = { this.state.filterAll }
                    filtered                = { this.state.filtered }
                    patientUpdatedData      = { this.props.patientUpdatedData }
                />
            </div>
            </div>
        );
    }
}

/**
 * @DateOfCreation        22 June 2018
 * @ShortDescription      This function is responsible to map store state to props
 * @return                View
 */
function mapStateToProps(state) {
    const { submitted, sendingRequest,errorMsg, isUserNotValid, fetchedNewVisitData, isUpdateDone, patientNewVisitData, patientVisitList, pages } = state.patientAllVisit;
    const { patientUpdatedData } = state.patientProfile;

    return {
        submitted,
        sendingRequest,
        errorMsg,
        isUserNotValid,
        fetchedNewVisitData,
        isUpdateDone,
        patientNewVisitData,
        patientVisitList,
        pages,
        patientUpdatedData
    };
}

const connectedPatientAllVisitContainer = connect(mapStateToProps)(PatientAllVisitContainer);
export { connectedPatientAllVisitContainer as PatientAllVisitContainer };
