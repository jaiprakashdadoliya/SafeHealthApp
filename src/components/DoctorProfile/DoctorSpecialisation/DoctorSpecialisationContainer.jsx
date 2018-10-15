import React from "react";
import { connect } from 'react-redux';
import { doctorSpecialisationAction, headerActions } from '../../../_actions';
import { utilityHelper } from '../../../_helpers'
import { DoctorSpecialisation } from "./DoctorSpecialisation";
import { confirmAlert } from 'react-confirm-alert';

/**
 * DoctorSpecialisationContainer
 *
 * @package                SafeHealth
 * @subpackage             DoctorSpecialisationContainer
 * @category               Container Component
 * @DateOfCreation         31 May 2018
 * @ShortDescription       This component is reponsible for logic in Doctor Specialisation
 */
class DoctorSpecialisationContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        specialisationAddShow   : false,
        specialisationEditShow  : false,
        specialisationDetail    : '',
        filtered: [],
        filterAll: '',          
    };

    this.specialisationAddShowHandle = this.specialisationAddShowHandle.bind(this);
    this.specialisationAddHideHandle = this.specialisationAddHideHandle.bind(this);
    this.specialisationEditShowHandle = this.specialisationEditShowHandle.bind(this);
    this.specialisationEditHideHandle = this.specialisationEditHideHandle.bind(this);
    this.getSpecialisationList        = this.getSpecialisationList.bind(this);
    this.specialisationDelete         = this.specialisationDelete.bind(this);
    this.specialisationSearch         = this.specialisationSearch.bind(this);
  }

  /**
  * @DateOfCreation        31 May 2018
  * @ShortDescription      This function is responsible to show the Add Specialisation Modal
  * @return                Nothing
  */
  specialisationAddShowHandle() {
    const { dispatch }              = this.props;
    dispatch(doctorSpecialisationAction.getMainSpecialisationList());
    this.setState({ specialisationAddShow: true });
  }

   /**
  * @DateOfCreation        31 May 2018
  * @ShortDescription      This function is responsible to Hide the Add Specialisation Modal
  * @return                Nothing
  */
  specialisationAddHideHandle() {
    this.setState({ specialisationAddShow: false });
  }

   /**
  * @DateOfCreation        31 May 2018
  * @ShortDescription      This function is responsible to show the Edit Specialisation Modal
  * @return                Nothing
  */
  specialisationEditShowHandle(specialisation) {
    const { dispatch }              = this.props;
    dispatch(doctorSpecialisationAction.getMainSpecialisationList());
    dispatch(doctorSpecialisationAction.getSpecialisationsTagList(specialisation.spl_id));
    this.setState({ specialisationEditShow: true });
    this.setState({ specialisationDetail:specialisation });
  }

   /**
  * @DateOfCreation        31 May 2018
  * @ShortDescription      This function is responsible to hide the Edit Specialisation Modal
  * @return                Nothing
  */
  specialisationEditHideHandle() {
    this.setState({ specialisationEditShow: false });
  }

 /**
  * @DateOfCreation        31 May 2018
  * @ShortDescription      This function is responsible to delete the current specialisation entry
  * @return                Nothing
  */
  specialisationDelete(doc_spl_id){
      confirmAlert({
          title: 'Specialisation delete',
          message: 'Are you sure you want to delete this specialisation?',
          buttons: [
          {
            label: 'Yes',
            onClick: () => {
              const { dispatch } = this.props;
              dispatch(doctorSpecialisationAction.specialisationDelete(doc_spl_id, this.props.specialisationData));
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
    * @ShortDescription      This function is responsible to get the list of specialisation from API
    * @return                Nothing
    */
   
    getSpecialisationList(page, pageSize, sorted, filtered) {
       const { dispatch }              = this.props;
       dispatch(doctorSpecialisationAction.getSpecialisationList(page, pageSize, sorted, filtered));
    }

    /**
   * @DateOfCreation        26 June 2018
   * @ShortDescription      This function is responsible to handle load filtered specialisation list
   * @return                Nothing
   */
    specialisationSearch(event){
      const { value } = event.target;
      const filterAll = value;
      const filtered = [{ id: 'all', value: filterAll }];
      this.setState({ filterAll, filtered });
    }
 
    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to show Doctor specialisation part
    * @return                View
    */
    render() {
        return (
                <div>
                  <DoctorSpecialisation 
                      errorMsg                        = {this.props.errorMsg}
                      successMsg                      = {this.props.successMsg}
                      specialisationData              = {this.props.specialisationData}
                      specialisationDetail            = {this.state.specialisationDetail}
                      specialisationAddShowHandle     = {this.specialisationAddShowHandle}
                      specialisationAddHideHandle     = {this.specialisationAddHideHandle} 
                      specialisationEditShowHandle    = {this.specialisationEditShowHandle}
                      specialisationEditHideHandle    = {this.specialisationEditHideHandle}
                      specialisationAddShow           = {this.state.specialisationAddShow}
                      specialisationEditShow          = {this.state.specialisationEditShow}
                      specialisationDelete            = {this.specialisationDelete}
                      masterSpecialisationData        = {this.props.masterSpecialisationData}
                      getSpecialisationList           = {this.getSpecialisationList}
                      pages                           = {this.props.pages}
                      filterAll                       = {this.state.filterAll}
                      filtered                        = {this.state.filtered}
                      specialisationSearch            = {this.specialisationSearch}
                      tagSpecialisationData           = {this.props.tagSpecialisationData}
                      tagSpecialisationFetch          = {this.props.tagSpecialisationFetch}
                  />
                </div>
          );
        }
      }

  /**
  * @DateOfCreation        31 May 2018
  * @ShortDescription      This function is responsible to connect store to props
  * @return                View
  */
  function mapStateToProps(state) {
      const {  tagSpecialisationFetch, tagSpecialisationData, pages,isUserNotValid, specialisationData, successMsg, errorMsg, masterSpecialisationData } = state.doctorSpecialisation;
      return {
          tagSpecialisationFetch, 
          tagSpecialisationData,  
          pages,
          specialisationData,
          successMsg,
          errorMsg,
          isUserNotValid,
          masterSpecialisationData
      };
  }

// Connection with State 
const connectedDoctorSpecialisationContainer = connect(mapStateToProps)(DoctorSpecialisationContainer);
export { connectedDoctorSpecialisationContainer as DoctorSpecialisationContainer }; 