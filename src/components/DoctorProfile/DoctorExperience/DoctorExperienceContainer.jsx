import React from "react";
import { connect } from 'react-redux';

import { utilityHelper } from '../../../_helpers';
import { DoctorExperience } from "./DoctorExperience";
import { experienceValidator } from '../../../_validator';
import { doctorExperienceAction, headerActions } from '../../../_actions';
import { confirmAlert } from 'react-confirm-alert';

/**
 * DoctorExperienceContainer
 *
 * @package                SafeHealth
 * @subpackage             DoctorExperienceContainer
 * @category               Container Component
 * @DateOfCreation         17 May 2018
 * @ShortDescription       This component is reponsible for logic in DoctorExperience
 */
class DoctorExperienceContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            experienceAddShow   : false,
            experienceEditShow  : false,
            experienceDetail    : '',
            filtered            : [],
            filterAll           : ''          
        };
        
        // Bind the events to the current class
        this.experienceAddShowHandle  = this.experienceAddShowHandle.bind(this);
        this.experienceAddHideHandle  = this.experienceAddHideHandle.bind(this);
        this.experienceEditShowHandle = this.experienceEditShowHandle.bind(this);
        this.experienceEditHideHandle = this.experienceEditHideHandle.bind(this);
        this.experienceDelete         = this.experienceDelete.bind(this);
        this.getExperienceList        = this.getExperienceList.bind(this);
        this.experienceSearch         = this.experienceSearch.bind(this);
    }

    /**
    * @DateOfCreation        22 May 2018
    * @ShortDescription      This function is responsible to show the Add experience Modal
    * @return                Nothing
    */
    experienceAddShowHandle() {
        this.setState({ experienceAddShow: true });
    }

    /**
    * @DateOfCreation        22 May 2018
    * @ShortDescription      This function is responsible to hide the Add experience Modal
    * @return                Nothing
    */
    experienceAddHideHandle() {
        this.setState({ experienceAddShow: false });
    }

    /**
    * @DateOfCreation        22 May 2018
    * @ShortDescription      This function is responsible to show the Edit experience Modal
                             and show the current row entry
    * @Param                 JSON experience Detail of single row of experience   
    * @return                Nothing
    */
    experienceEditShowHandle(experience) {
        this.setState({ experienceEditShow: true });
        this.setState({ experienceDetail:experience });
    }

    /**
    * @DateOfCreation        22 May 2018
    * @ShortDescription      This function is responsible to hide the edit experience Modal
    * @return                Nothing
    */
    experienceEditHideHandle() {
        this.setState({ experienceEditShow: false });
        this.setState({ experienceDetail:'' });
    }

    /**
    * @DateOfCreation        22 May 2018
    * @ShortDescription      This function is responsible to delete the current experience entry
    * @return                Nothing
    */
    experienceDelete(doc_exp_id){
        confirmAlert({
            title: 'Experience delete',
            message: <div className="alert-message">Are you sure you want to delete this experience?</div>,
            buttons: [
            {
              label:  'Yes',
              onClick: () => {
                const { dispatch } = this.props;
                dispatch(doctorExperienceAction.experienceDelete(doc_exp_id, this.props.experienceData));
              }
            },
            {
              label: 'No',
              onClick: () => {return false;}
            }
            ]
        })
    }

    /**
    * @DateOfCreation        29 May 2018
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
    * @DateOfCreation        22 May 2018
    * @ShortDescription      This function is responsible to get the list of experience from API
    * @return                Nothing
    */

    getExperienceList(page, pageSize, sorted, filtered) {
       const { dispatch }              = this.props;
       dispatch(doctorExperienceAction.getExperienceList(page, pageSize, sorted, filtered));
    }

    /**
   * @DateOfCreation        26 June 2018
   * @ShortDescription      This function is responsible to handle load filtered eduction list
   * @return                Nothing
   */
    experienceSearch(event){
      const { value } = event.target;
      const filterAll = value;
      const filtered = [{ id: 'all', value: filterAll }];
      this.setState({ filterAll, filtered });
    }
 
    /**
    * @DateOfCreation        22 May 2018
    * @ShortDescription      This function is responsible to show Doctor experience part
    * @return                View
    */
    render() {
        return (
            <div >    
                <DoctorExperience 
                    submitted                   = {this.props.submitted}
                    errorMsg                    = {this.props.errorMsg}
                    successMsg                  = {this.props.successMsg}
                    experienceData              = {this.props.experienceData}
                    experienceDetail            = {this.state.experienceDetail}
                    experienceAddShowHandle     = {this.experienceAddShowHandle}
                    experienceAddHideHandle     = {this.experienceAddHideHandle} 
                    experienceEditShowHandle    = {this.experienceEditShowHandle}
                    experienceEditHideHandle    = {this.experienceEditHideHandle}
                    experienceAddShow           = {this.state.experienceAddShow}
                    experienceEditShow          = {this.state.experienceEditShow}
                    experienceDelete            = {this.experienceDelete}
                    getExperienceList           = {this.getExperienceList}
                    pages                       = {this.props.pages}
                    filterAll                   = { this.state.filterAll }
                    filtered                    = { this.state.filtered }
                    experienceSearch            = { this.experienceSearch }
                />
            </div>
        );
    }
}

/**
* @DateOfCreation        22 May 2018
* @ShortDescription      This function is responsible to connect store to props
* @return                View
*/
function mapStateToProps(state) {
    const { pages,isDeleteDone, isUserNotValid, experienceData, successMsg, errorMsg } = state.doctorExperience;
    return {
        pages,
        experienceData,
        successMsg,
        errorMsg,
        isUserNotValid,
        isDeleteDone
    };
}

// Connection with State 
const connectedDoctorExperienceContainer = connect(mapStateToProps)(DoctorExperienceContainer);
export { connectedDoctorExperienceContainer as DoctorExperienceContainer }; 
