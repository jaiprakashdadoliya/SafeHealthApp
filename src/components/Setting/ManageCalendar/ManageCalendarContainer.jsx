import React from "react";
import { connect } from 'react-redux';
import Loadable from 'react-loadable'; 
import { Loading } from './../../../global';
import { utilityHelper } from './../../../_helpers';
import { headerActions } from '../../../_actions';
import { manageCalendarActions } from './manageCalendarActions';
import { ManageCalendar }  from './ManageCalendar';


class ManageCalendarContainer extends React.Component {

	constructor(props){
		super(props);
        this.submitData = this.submitData.bind(this);
        this.boundForm = undefined;
        this.handleBoundFormUpdate = this.handleBoundFormUpdate.bind(this);


	}

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormUpdate(data){
        this.boundForm = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    submitData() {
       if(this.boundForm){
            let data = this.boundForm.getData();
            if (data) {
                const { dispatch} = this.props;
                dispatch(manageCalendarActions.newSubmit(data));
                document.getElementById('manageCalendarTitle').scrollIntoView(); 
            } 
       }
    }

	/**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get all form information
    * @return                Redirect
    */
	componentWillMount() {
       	const { dispatch} = this.props;
		dispatch(manageCalendarActions.getRecord());
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
                dispatch(manageCalendarActions.resetState());
            },2000);
        }
    }
    render() {
    	if(this.props.fetchedManageCalendarData){
        return (
            <div >
                <ManageCalendar 
                		successMessage   			                  = {this.props.successMessage}
    					errorMsg   					                  = {this.props.errorMsg}
                        formConfig                                    = {this.props.manageCalendarData.form}
                        isUpdateDone                                  = {this.props.isUpdateDone}
                        submitData                                    = {this.submitData}
                        handleBoundFormUpdate                         = {this.handleBoundFormUpdate}
                />
            </div>
        );
        }else{
            return(<div className="showbox">
                              <div className="loader">
                                <svg className="circular" viewBox="25 25 50 50">
                                  <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
                                </svg>
                              </div>
                            </div>);
        }
    }
}

/**
 * @DateOfCreation        22 June 2018
 * @ShortDescription      This function is responsible to map store state to props
 * @return                View
 */
function mapStateToProps(state) {
    const { successMessage, errorMsg, isUserNotValid, fetchedManageCalendarData,manageCalendarData,isUpdateDone } = state.manageCalendar;

    return {
        successMessage, 
        isUpdateDone,
        errorMsg, 
        isUserNotValid,
        fetchedManageCalendarData,
        manageCalendarData,

    };
}

const connectedManageCalendarContainer = connect(mapStateToProps)(ManageCalendarContainer);
export { connectedManageCalendarContainer as ManageCalendarContainer };
