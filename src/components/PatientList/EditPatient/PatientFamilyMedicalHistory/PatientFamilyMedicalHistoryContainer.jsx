import React from "react";
import { connect } from 'react-redux';
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../global';
import { utilityHelper } from './../../../../_helpers';
import { headerActions } from '../../../../_actions';
import { patientFamilyMedicalHistoryActions } from './patientFamilyMedicalHistoryActions';

const PatientFamilyMedicalHistory = Loadable({
    loader: () => import('./PatientFamilyMedicalHistory' /* webpackChunkName = "PatientFamilyMedicalHistory" */).then(object => object.PatientFamilyMedicalHistory),
    loading: Loading
});

class PatientFamilyMedicalHistoryContainer extends React.Component {
	constructor(props){
		super(props);
		this.state = {};
        this.submitFamilyMedicalStatus = this.submitFamilyMedicalStatus.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleCheckboxChangeAll = this.handleCheckboxChangeAll.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.refreshData = true;

	}

	/**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get all form information
    * @return                Redirect
    */
	componentWillMount() {
       	const { dispatch, patId, visitId} = this.props;
       	let extraData = {};
        extraData['pat_id'] = patId;
        extraData['visit_id'] = visitId;
		dispatch(patientFamilyMedicalHistoryActions.getPatientFamilyMedicalHistoryRecord(extraData));
	}

	/**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to final information send
    * @return                Redirect
    */
    submitFamilyMedicalStatus() {
         const { patId, visitId } = this.props;
        let familyMedicalData = this.state;
        let extraData = {};
        extraData['pat_id'] = patId;
        extraData['visit_id'] = visitId;
        let finalData = {};
        finalData = utilityHelper.mergeMultipleObject([familyMedicalData, extraData]);
        if (finalData) {
            const { dispatch,patId, visitId } = this.props;
            dispatch(patientFamilyMedicalHistoryActions.newFamilyMedicalHistorySubmit(finalData));
            // scroll to div top
            document.getElementById('familyMedicalTitle').scrollIntoView(); 
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
	 * @DateOfCreation        14 june 2018
	 * @ShortDescription      This function is responsible to handle changes in Checkbox state
	 * @param                 Event Object
	 * @return                Nothing
	 */
	handleCheckboxChange(events, name) {
	    let state = this.state; 
	    this.setState({
	        ...state,
	        [name] : utilityHelper.getArrayDifference(this.state[name], events)
	    });
	}

	/**
	 * @DateOfCreation        14 june 2018
	 * @ShortDescription      This function is responsible to handle changes in Checkbox state
	 * @param                 Event Object
	 * @return                Nothing
	 */
	handleCheckboxChangeAll(events, name) {
	    let state = this.state; 
	    this.setState({
	        ...state,
	        [name] : events
	    });
	}

	/**
	 * @DateOfCreation        14 june 2018
	 * @ShortDescription      This function is responsible to handle changes in input state
	 * @param                 Event Object
	 * @return                Nothing
	 */
	handleInputChange(event) {
	    let state = this.state; 
	    const { name, value } = event.target;

	    this.setState({
	        ...state,
	        [name] : value
	    });
	}

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to props update hook event
    * @return                Redirect
    */
    componentWillReceiveProps(props) {
    	if(props.fetchedFamilyMedicalData && this.refreshData){
    		this.refreshData = false;
    		 	let data = props.patientFamilyMedicalData.record.map(function(record,index){
	    	    let stateRow = {};
	    	    stateRow['id'] = record.disease_id;
	    	    stateRow['value'] = record.disease_status;
	    	    stateRow['relation_id'] = record.family_relation_id;
	    	    stateRow['relation_value'] = record.family_relation;
	    	    return stateRow;
	    	});
	    	
	    	let statenew = {};
	    	for(var row in data) {
	    	    statenew[data[row].id] = data[row].value;
	    	    statenew[data[row].relation_id] = data[row].relation_value;
	    	}
	    	this.setState(statenew);
    	}
        
        if(props.isUpdateDone){
        const { dispatch} = this.props;
            setTimeout(function(){
                dispatch(patientFamilyMedicalHistoryActions.resetState());
            },2000);
        }
    }

    render() {
    	if(this.props.fetchedFamilyMedicalData){
	        return (
	            <div >
	                <PatientFamilyMedicalHistory 
	            		successMessage   			                  = {this.props.successMessage}
						errorMsg   					                  = {this.props.errorMsg}
	                    patientFamilyMedicalData                      = {this.props.patientFamilyMedicalData}
	                    patId                                         = {this.props.patId}
	                    visitId                                       = {this.props.visitId}
	                    isUpdateDone                                  = {this.props.isUpdateDone}
						submitFamilyMedicalStatus 					  = {this.submitFamilyMedicalStatus}
						state 					  					  = {this.state}
						handleCheckboxChange 					  	  = {this.handleCheckboxChange}
						handleCheckboxChangeAll 					  = {this.handleCheckboxChangeAll}
						handleInputChange 					  		  = {this.handleInputChange}
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
    const { successMessage, errorMsg, isUserNotValid, fetchedFamilyMedicalData,isUpdateDone,patientFamilyMedicalData } = state.patientFamilyMedicalHistory;

    return {
        successMessage, 
        errorMsg,
        isUserNotValid, 
        fetchedFamilyMedicalData,
        isUpdateDone,
        patientFamilyMedicalData,

    };
}

const connectedPatientFamilyMedicalHistoryContainer = connect(mapStateToProps)(PatientFamilyMedicalHistoryContainer);
export { connectedPatientFamilyMedicalHistoryContainer as PatientFamilyMedicalHistoryContainer };
