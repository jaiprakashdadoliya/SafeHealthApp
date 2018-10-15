import React from "react";
import { connect } from 'react-redux';
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../global';
import { utilityHelper } from './../../../../_helpers';
import { headerActions } from '../../../../_actions';
import { patientLaboratoryTestActions } from './patientLaboratoryTestActions';
const PatientLaboratoryTests = Loadable({
    loader: () => import('./PatientLaboratoryTests' /* webpackChunkName = "PatientLaboratoryTests" */).then(object => object.PatientLaboratoryTests),
    loading: Loading
});

class PatientLaboratoryTestsContainer extends React.Component {

	constructor(props){
		super(props);
        this.PatientCbcContainerRef = React.createRef();
        this.PatientDlcContainerRef = React.createRef();
        this.PatientBSugarContainerRef = React.createRef();
        this.PatientRenalContainerRef = React.createRef();
        this.PatientLiverContainerRef = React.createRef();
        this.PatientUrinalysisContainerRef = React.createRef();
        this.PatientSputumContainerRef = React.createRef();
        this.PatientCollagenContainerRef = React.createRef();
        this.PatientEchocardiogramContainerRef = React.createRef();

        this.submitLaboratoryTestStatus = this.submitLaboratoryTestStatus.bind(this);

	}

	/**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to final information send
    * @return                Redirect
    */
    submitLaboratoryTestStatus() {
        const { patId, visitId } = this.props;
        let CbcData = this.PatientCbcContainerRef.current.getCbcData();
        let DlcData = this.PatientDlcContainerRef.current.getDlcData();
        let BSugarData = this.PatientBSugarContainerRef.current.getBSugarData();
        let RenalData = this.PatientRenalContainerRef.current.getRenalData();
        let LiverData = this.PatientLiverContainerRef.current.getLiverData();
        let UrinalysisData = this.PatientUrinalysisContainerRef.current.getUrinalysisData();
        let SputumData = this.PatientSputumContainerRef.current.getSputumData();
        let CollagenData = this.PatientCollagenContainerRef.current.getCollagenData();
        let EchocardiogramData = this.PatientEchocardiogramContainerRef.current.getEchocardiogramData();
        let extraData = {};
        extraData['pat_id'] = patId;
        extraData['visit_id'] = visitId;
        let finalData = {};
        finalData = utilityHelper.mergeMultipleObject([ CbcData, DlcData, BSugarData, RenalData, LiverData, UrinalysisData, SputumData, CollagenData, EchocardiogramData, extraData]);
        if (finalData) {
            const { dispatch,patId, visitId } = this.props;
            dispatch(patientLaboratoryTestActions.newLaboratoryTestSubmit(finalData));
            // scroll to div top
            document.getElementById('laboratoryTestTitle').scrollIntoView(); 
        }

    }

	/**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get all form information
    * @return                Redirect
    */
	componentWillMount() {
       	const { dispatch, patId, visitId} = this.props;
       	let patDetails = {};
       	patDetails['pat_id'] = patId;
       	patDetails['visit_id'] = visitId;
		dispatch(patientLaboratoryTestActions.getPatientLaboratoryTestRecord(patDetails));
	}

	/**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to redirect unauthorize users
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
                dispatch(patientLaboratoryTestActions.resetState());
            },2000);
        }
    }
    render() {
        if(this.props.fetchedLaboratoryTestData){
            return (
            <div >
                <PatientLaboratoryTests 
            		successMessage   			                  = {this.props.successMessage}
					errorMsg   					                  = {this.props.errorMsg}
                    patientLaboratoryTestData                     = {this.props.patientLaboratoryTestData}
                    patId                                         = {this.props.patId}
                    visitId                                       = {this.props.visitId}
                    isHideExtraFields                             = {this.props.isHideExtraFields}
                    isUpdateDone                                  = {this.props.isUpdateDone}
                    user_type                                     = {this.props.user_type}
					submitLaboratoryTestStatus                    = {this.submitLaboratoryTestStatus}
                    PatientCbcContainerRef                    	  = {this.PatientCbcContainerRef}
                    PatientDlcContainerRef                    	  = {this.PatientDlcContainerRef}
                    PatientBSugarContainerRef                     = {this.PatientBSugarContainerRef}
                    PatientRenalContainerRef                      = {this.PatientRenalContainerRef}
                    PatientLiverContainerRef                      = {this.PatientLiverContainerRef}
                    PatientUrinalysisContainerRef                 = {this.PatientUrinalysisContainerRef}
                    PatientSputumContainerRef             		  = {this.PatientSputumContainerRef}
                    PatientCollagenContainerRef        			  = {this.PatientCollagenContainerRef}
                    PatientEchocardiogramContainerRef             = {this.PatientEchocardiogramContainerRef}
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
    const { successMessage, errorMsg, isUserNotValid, fetchedLaboratoryTestData,patientLaboratoryTestData,isUpdateDone } = state.laboratoryTest;

    return {
        successMessage, 
        isUpdateDone,
        errorMsg, 
        isUserNotValid,
        fetchedLaboratoryTestData,
        patientLaboratoryTestData,
        user_type:state.session.user.user_type

    };
}

const connectedPatientLaboratoryTestsContainer = connect(mapStateToProps)(PatientLaboratoryTestsContainer);
export { connectedPatientLaboratoryTestsContainer as PatientLaboratoryTestsContainer };
