import React from "react";
import { connect } from 'react-redux';
import {SideMenu} from '../SideMenu';
import {PatientHistory} from './PatientHistory';
import {patientHistoryActions} from './patientHistoryActions';
import { Loading } from '../../global';
import { patientProfileAction } from '../../_actions';
import Loadable from 'react-loadable';

const HeaderContainer = Loadable({
    loader: () => import('../Header' /* webpackChunkName = "HeaderContainer" */).then(object => object.HeaderContainer),
    loading: Loading
});

class PatientHistoryContainer extends React.Component {

	constructor(props){
		super(props);
	}

	/**
     * @DateOfCreation        3 Sept 2018
     * @ShortDescription      This function is responsible to get the list of Clinical Notes from API
     * @return                Nothing
     */
    componentWillMount() {
        const { dispatch } = this.props;
        
        let patId = this.props.match.params.patId;
        let formData = {};
        if(patId){
        	formData['pat_id'] = patId;
            dispatch(patientHistoryActions.getPatientActivityHistory(formData));
            dispatch(patientProfileAction.patientProfileRequest(patId));
        }
    }

    render() {
    	if(this.props.isPatientActivityHistoryFetched){
	        return (
	            <div className="page-container">    
	            	<SideMenu/>
	            	<HeaderContainer/>
	               	<PatientHistory 
	               		successMessage 			= {this.props.successMessage}
						errorMsg 				= {this.props.errorMsg}
						patientActivityHistory 	= {this.props.patientActivityHistory}
						isUpdateDone			= {this.props.isUpdateDone}
						user_type 				= {this.props.user_type}
						patientUpdatedData		= {this.props.patientUpdatedData}
	               	/>
	            </div>
	        );    		
    	} else {
    		return(<Loading />);
    	}
    }
}

/**
 * @DateOfCreation        3 Sept 2018
 * @ShortDescription      This function is responsible to connect store to props
 * @return                View
 */
function mapStateToProps(state) {
    const { sendingRequest, successMessage, errorMsg, isUserNotValid, isUpdateDone, patientActivityHistory, isPatientActivityHistoryFetched } = state.patientActivityHistory;
    const { patientUpdatedData } = state.patientProfile;

    return {
        successMessage,
        errorMsg,
        patientActivityHistory,
        isPatientActivityHistoryFetched,
        isUpdateDone,
        patientUpdatedData,
        user_type:state.session.user.user_type
    };
}

// Connection with State 
const connectedPatientHistoryContainer = connect(mapStateToProps)(PatientHistoryContainer);
export { connectedPatientHistoryContainer as PatientHistoryContainer };
