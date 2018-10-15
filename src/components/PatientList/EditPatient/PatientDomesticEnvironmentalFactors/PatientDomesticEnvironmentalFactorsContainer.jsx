import React from "react";
import { connect } from 'react-redux';
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../global';
import { utilityHelper } from './../../../../_helpers';
import { headerActions } from '../../../../_actions';
import { patientDomesticFactorActions } from './patientDomesticFactorActions';

const PatientDomesticEnvironmentalFactors = Loadable({
    loader: () => import('./PatientDomesticEnvironmentalFactors' /* webpackChunkName = "PatientDomesticEnvironmentalFactors" */).then(object => object.PatientDomesticEnvironmentalFactors),
    loading: Loading
});

class PatientDomesticEnvironmentalFactorsContainer extends React.Component {
	constructor(props){
		super(props);
        this.PatientCookingContainerRef = React.createRef();
        this.PatientHouseConditionContainerRef = React.createRef();
        this.PatientResidentialLocationContainerRef = React.createRef();
        this.PatientResidentPlaceContainerRef = React.createRef();
        this.submitDomesticFactorStatus = this.submitDomesticFactorStatus.bind(this);

	}

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get all form information
    * @return                Redirect
    */
	componentWillMount() {
       	const { dispatch, patId, visitId} = this.props;
		dispatch(patientDomesticFactorActions.getPatientDomesticFactorRecord(visitId, patId));
	}

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to final information send
    * @return                Redirect
    */
    submitDomesticFactorStatus() {
         const { patId, visitId } = this.props;
        let hosueConditionData = this.PatientHouseConditionContainerRef.current.getHosueConditionData();
        let residentialLocationData = this.PatientResidentialLocationContainerRef.current.getResidentialLocationData();
        let cookingData = this.PatientCookingContainerRef.current.getCookingData();
        let extraData = {};
        extraData['pat_id'] = patId;
        extraData['visit_id'] = visitId;
        let finalData = {};
        finalData = utilityHelper.mergeMultipleObject([hosueConditionData, residentialLocationData, cookingData,extraData]);
        if (finalData) {
            const { dispatch,patId, visitId } = this.props;
            dispatch(patientDomesticFactorActions.newDomesticFactorSubmit(finalData));
            // scroll to div top
            document.getElementById('domesticFactorTitle').scrollIntoView(); 
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
                dispatch(patientDomesticFactorActions.resetState());
            },2000);
        }
    }

    render() {
        if(this.props.fetchedDomesticFactorData){

            return (
                <div >
                    <PatientDomesticEnvironmentalFactors 
    					successMessage   			                  = {this.props.successMessage}
    					errorMsg   					                  = {this.props.errorMsg}
                        patientDomesticFactorData                     = {this.props.patientDomesticFactorData}
                        patId                                         = {this.props.patId}
                        visitId                                       = {this.props.visitId}
                        isUpdateDone                                  = {this.props.isUpdateDone}
                        PatientCookingContainerRef                    = {this.PatientCookingContainerRef}
                        PatientHouseConditionContainerRef             = {this.PatientHouseConditionContainerRef}
                        PatientResidentialLocationContainerRef        = {this.PatientResidentialLocationContainerRef}
                        PatientResidentPlaceContainerRef              = {this.PatientResidentPlaceContainerRef}
    					submitDomesticFactorStatus                    = {this.submitDomesticFactorStatus}
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
    const { successMessage, errorMsg, isUserNotValid, fetchedDomesticFactorData,patientDomesticFactorData,isUpdateDone } = state.domesticFactor;

    return {
        successMessage, 
        isUpdateDone,
        errorMsg, 
        isUserNotValid,
        fetchedDomesticFactorData,
        patientDomesticFactorData,

    };
}

const connectedPatientDomesticEnvironmentalFactorsContainer = connect(mapStateToProps)(PatientDomesticEnvironmentalFactorsContainer);
export { connectedPatientDomesticEnvironmentalFactorsContainer as PatientDomesticEnvironmentalFactorsContainer };