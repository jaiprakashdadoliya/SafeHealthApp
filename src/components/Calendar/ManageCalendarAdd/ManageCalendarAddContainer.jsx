import React from "react";
import { connect } from 'react-redux';
import Loadable from 'react-loadable'; 
import { Loading } from './../../../global';
import { utilityHelper } from './../../../_helpers';
import { headerActions } from '../../../_actions';
import { manageCalendarAddActions } from './manageCalendarAddActions';
import { appointmentsActions } from '../../Appointments/appointmentsActions';

const ManageCalendarAdd = Loadable({
    loader: () => import('./ManageCalendarAdd' /* webpackChunkName = "ManageCalendarAdd" */).then(object => object.ManageCalendarAdd),
    loading: Loading
});

class ManageCalendarAddContainer extends React.Component {

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
                let timingdata = data.booking_time.split('@##@');
                data['timing_id'] = timingdata[0];
                data['booking_time'] = timingdata[1];
                const { dispatch} = this.props;
                dispatch(manageCalendarAddActions.newSubmit(data));
            } 
       }
    }

	/**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get all form information
    * @return                Redirect
    */
	componentWillMount() {
       	
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
        
        if(props.isUpdateDoneAdd){
            setTimeout(function(){
                dispatch(manageCalendarAddActions.resetState());
                this.props.handleModalClose();
                this.props.calendarRefresh();
                dispatch(appointmentsActions.todaysAppointments());
            }.bind(this),2000);
        }
    }
    render() {
        if(this.props.fetchedManageCalendarAddData){
         return (
            <div >
                <ManageCalendarAdd 
                		successMessage   			                  = {this.props.successMessageAdd}
    					errorMsg   					                  = {this.props.errorMsgAdd}
                        formConfig                                    = {this.props.manageCalendarAddData.form}
                        isUpdateDone                                  = {this.props.isUpdateDoneAdd}
                        submitData                                    = {this.submitData}
                        modalShow                                     = {this.props.modalShow}
                        handleModalClose                              = {this.props.handleModalClose}
                        submittedAdd                                  = {this.props.submittedAdd}
                        handleBoundFormUpdate                         = {this.handleBoundFormUpdate}
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
    const { successMessageAdd, errorMsgAdd,submittedAdd, isUserNotValid, fetchedManageCalendarAddData,manageCalendarAddData,isUpdateDoneAdd } = state.manageCalendarAdd;

    return {
        successMessageAdd, 
        isUpdateDoneAdd,
        errorMsgAdd, 
        isUserNotValid,
        fetchedManageCalendarAddData,
        manageCalendarAddData,
        submittedAdd
    };
}

const connectedManageCalendarAddContainer = connect(mapStateToProps)(ManageCalendarAddContainer);
export { connectedManageCalendarAddContainer as ManageCalendarAddContainer };
