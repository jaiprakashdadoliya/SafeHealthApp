import React from "react";
import { connect } from 'react-redux';
import Loadable from 'react-loadable'; 
import { Loading } from './../../global';
import { PatientProfile } from "./PatientProfile";
import { patientProfileAction } from '../../_actions';
import { patientDashboardProfileAction } from './patientDashboardProfileAction';
import { configConstants } from '../../_constants';
import { utilityHelper } from '../../_helpers';

class PatientProfileContainer extends React.Component {
	constructor(props, context) {
        super(props, context);
        this.medicalProfile = false;
        this.patientMedicationSearch  = this.patientMedicationSearch.bind(this);
        this.getPatientMedicationList = this.getPatientMedicationList.bind(this);
        this.patId = '';
        this.state = {
            pages               : 0,
            filtered            : [],
            filterAll           : ''
        };
    }

    componentWillMount() {
        const { dispatch } = this.props;
        const userInfo = utilityHelper.getUserInfo();
        const currentUserType = userInfo.user_type;
        if(this.props.medicalProfile){
            this.medicalProfile = true;
        }
        if(currentUserType == configConstants.USER_TYPE_PATIENT){
            this.patId = userInfo.user_id;
        }else{
            if(this.props.patId){
                this.patId = this.props.patId;
            }else{
                this.patId = this.props.match.params.patId;
            }
        }
        dispatch(patientProfileAction.patientProfileRequest(this.patId));
        dispatch(patientDashboardProfileAction.patientProfileRequest(this.patId));
    }

    /**
     * @DateOfCreation        26 June 2018
     * @ShortDescription      This function is responsible to handle load filtered eduction list
     * @return                Nothing
     */
    patientMedicationSearch(event){
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
    getPatientMedicationList(page, pageSize, sorted, filtered){
        const { dispatch } = this.props;
        const userInfo = utilityHelper.getUserInfo();
        const currentUserType = userInfo.user_type;
        dispatch(patientDashboardProfileAction.getPatientMedicationList(this.patId, page, pageSize, sorted, filtered));
    }

    render() {
        if(this.props.patientProfileRequest){
            return (
                <PatientProfile 
                	patId 					= { this.patId }
                    patientUpdatedData      = { this.props.patientUpdatedData }
                	patientDashboardData    = { this.props.patientDashboardData }
                    filterAll               = { this.state.filterAll }
                    filtered                = { this.state.filtered }
                    patientMedicationSearch = { this.patientMedicationSearch }
                    getPatientMedicationList= { this.getPatientMedicationList }
                    pages                   = { this.props.pages }
                    patientMedicationList   = { this.props.patientMedicationList }
                    state                   = { this.state }
                    medicalProfile          = {this.medicalProfile}
                />
            );
        }else{
            return (<Loading />);
        }
    }
}

/**
 * @DateOfCreation        20 July 2018
 * @ShortDescription      This function is responsible to map store state to props
 * @return                View
 */
function mapStateToProps(state) {
    const { patientUpdatedData }    = state.patientProfile;
    const { pages, patientDashboardData, patientMedicationList,patientProfileRequest }  = state.patientProfileDashboard;
    return {
        patientUpdatedData,
        patientDashboardData,
        patientMedicationList,
        patientProfileRequest,
        pages
    };
}

const connectedPatientProfileContainer = connect(mapStateToProps)(PatientProfileContainer);
export { connectedPatientProfileContainer as PatientProfileContainer };