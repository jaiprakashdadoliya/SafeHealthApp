import React from "react";
import { connect } from 'react-redux';
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../global';
import { utilityHelper } from './../../../../_helpers';
import { headerActions } from '../../../../_actions';
import { patientSocialAddictionActions } from './patientSocialAddictionActions';

const PatientSocialAddictionHistory = Loadable({
    loader: () => import('./PatientSocialAddictionHistory' /* webpackChunkName = "PatientSocialAddictionHistory" */).then(object => object.PatientSocialAddictionHistory),
    loading: Loading
});


class PatientSocialAddictionHistoryContainer extends React.Component {
	constructor(props){
		super(props);
        this.PatientSocialAddictionKeyContainerRef = React.createRef();
        this.PatientSocialAddictionUseKeyContainerRef = React.createRef();
        this.submitSocialAddictionStatus = this.submitSocialAddictionStatus.bind(this);

	}

	/**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get all form information
    * @return                Redirect
    */
	componentWillMount() {
       	const { dispatch, patId, visitId} = this.props;
		dispatch(patientSocialAddictionActions.getPatientSocialAddictionRecord(visitId, patId));
	}

	/**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to final information send
    * @return                Redirect
    */
    submitSocialAddictionStatus() {
         const { patId, visitId } = this.props;
        let socialAddictionKey = this.PatientSocialAddictionKeyContainerRef.current.getSocialAddictionKeyData();
        let socialAddictionUseKey = this.PatientSocialAddictionUseKeyContainerRef.current.getSocialAddictionUseKeyData();
        let extraData = {};
        extraData['pat_id'] = patId;
        extraData['visit_id'] = visitId;
        let finalData = {};
        finalData = utilityHelper.mergeMultipleObject([socialAddictionKey, socialAddictionUseKey,extraData]);
        if (finalData) {
            const { dispatch,patId, visitId } = this.props;
            dispatch(patientSocialAddictionActions.newSocialAddictionSubmit(finalData));
            // scroll to div top
            document.getElementById('socialAddictionTitle').scrollIntoView(); 
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


    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to props update hook event
    * @return                Redirect
    */
    componentWillReceiveProps(props) {
        const { dispatch} = this.props;
        
        if(props.isUpdateDone){
            setTimeout(function(){
                dispatch(patientSocialAddictionActions.resetState());
            },2000);
        }
    }

    render() {
        if(this.props.fetchedSocialAddictionData){
            return (
                <div >
                    <PatientSocialAddictionHistory 
    					successMessage   			                = {this.props.successMessage}
    					errorMsg   					                = {this.props.errorMsg}
    					patientSocialAddictionData                  = {this.props.patientSocialAddictionData}
    					patId                                       = {this.props.patId}
    					visitId                                     = {this.props.visitId}
    					isUpdateDone                                = {this.props.isUpdateDone}
    					PatientSocialAddictionKeyContainerRef       = {this.PatientSocialAddictionKeyContainerRef}
    					PatientSocialAddictionUseKeyContainerRef    = {this.PatientSocialAddictionUseKeyContainerRef}
    					submitSocialAddictionStatus                 = {this.submitSocialAddictionStatus}
                    />
                </div>
            );
        }else{
            return(<div></div>);
        }
    }
}

/**
 * @DateOfCreation        22 June 2018
 * @ShortDescription      This function is responsible to map store state to props
 * @return                View
 */
function mapStateToProps(state) {
    const { successMessage, errorMsg, isUserNotValid, fetchedSocialAddictionData,patientSocialAddictionData,isUpdateDone } = state.patientSocialAddiction;

    return {
        successMessage, 
        isUpdateDone,
        errorMsg, 
        isUserNotValid,
        fetchedSocialAddictionData,
        patientSocialAddictionData,

    };
}

const connectedPatientSocialAddictionHistoryContainer = connect(mapStateToProps)(PatientSocialAddictionHistoryContainer);
export { connectedPatientSocialAddictionHistoryContainer as PatientSocialAddictionHistoryContainer };
