import React from "react";
import { connect } from 'react-redux';
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../global';
import { utilityHelper } from './../../../../_helpers';
import { headerActions } from '../../../../_actions';
import { patientConsultantActions } from './patientConsultantActions';
import { PatientConsultantsImpression } from './PatientConsultantsImpression';


/*const PatientConsultantsImpression = Loadable({
    loader: () => import('./PatientConsultantsImpression'  webpackChunkName = "PatientConsultantsImpression" ).then(object => object.PatientConsultantsImpression),
    loading: Loading
});
*/

class PatientConsultantsImpressionContainer extends React.Component {
	constructor(props){
		super(props);
		this.boundForm = undefined;
        this.submitConsultantStatus = this.submitConsultantStatus.bind(this);
        this.handleBoundFormUpdate = this.handleBoundFormUpdate.bind(this);

	}

	/**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data
    * @return                Redirect
    */
    handleBoundFormUpdate(data){
        this.boundForm = data;
    }

	/**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to final information send
    * @return                Redirect
    */
    submitConsultantStatus() {
    	if(this.boundForm){
	        const { patId, visitId } = this.props;
            let ConsultantData = this.boundForm.getData();
	        let extraData = {};
	        extraData['pat_id'] = patId;
	        extraData['visit_id'] = visitId;
	        let finalData = {};
	        finalData = utilityHelper.mergeMultipleObject([ ConsultantData, extraData]);
	        if (finalData) {
	            const { dispatch,patId, visitId } = this.props;
	            dispatch(patientConsultantActions.newConsultantSubmit(finalData));
	            // scroll to div top
	            document.getElementById('ConsultantTitle').scrollIntoView(); 
	        }
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
		dispatch(patientConsultantActions.getpatientConsultantRecord(patDetails));
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
                dispatch(patientConsultantActions.resetState());
            },2000);
        }
    }

    render() {
    	if(this.props.fetchedConsultantData){
	        return (
	            <div >
	             <PatientConsultantsImpression 
                        successMessage   = {this.props.successMessage}
                        errorMsg   	 = {this.props.errorMsg}
                        patientConsultantData = {this.props.patientConsultantData}
                        patId  = {this.props.patId}
                        visitId = {this.props.visitId}
                        isUpdateDone = {this.props.isUpdateDone}
                        submitConsultantStatus  = {this.submitConsultantStatus}
                        handleBoundFormUpdate  = {this.handleBoundFormUpdate}
                        submitted  = {this.props.submitted}
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
    const { successMessage, errorMsg, isUserNotValid, fetchedConsultantData,patientConsultantData,isUpdateDone,submitted } = state.patientConsultant;

    return {
        successMessage, 
        isUpdateDone,
        errorMsg, 
        isUserNotValid,
        fetchedConsultantData,
        patientConsultantData,
        submitted

    };
}

const connectedPatientConsultantsImpressionContainer = connect(mapStateToProps)(PatientConsultantsImpressionContainer);
export { connectedPatientConsultantsImpressionContainer as PatientConsultantsImpressionContainer };

