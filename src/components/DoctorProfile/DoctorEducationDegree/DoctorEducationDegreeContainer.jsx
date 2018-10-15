/**
 * DoctorEducationDegreeContainer
 *
 * @package                SafeHealth
 * @subpackage             DoctorEducationDegreeContainer
 * @category               Container Component
 * @DateOfCreation         31 May 2018
 * @ShortDescription       This component is reponsible for logic in degree
 */
import React from "react";
import { connect } from 'react-redux';
import ReactDOM from "react-dom";

import { confirmAlert } from 'react-confirm-alert'; // Import

import {DoctorEducationDegree} from "./DoctorEducationDegree";
import {DoctorEducationDegreeAdd} from "./DoctorEducationDegreeAdd";
import {DoctorEducationDegreeEdit} from "./DoctorEducationDegreeEdit";
import {doctorDegreeActions, headerActions, doctorProfileActions} from '../../../_actions';

class DoctorEducationDegreeContainer extends React.Component 
{
  /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      Contructor is responsible to function declaration
    * @param                 props
    * @return                Nothing
    */
  constructor(props, context) {
    super(props, context);
    this.degreeAddShowHandle = this.degreeAddShowHandle.bind(this);
    this.degreeAddHideHandle = this.degreeAddHideHandle.bind(this);
    this.degreeEditShowHandle = this.degreeEditShowHandle.bind(this);
    this.degreeEditHideHandle = this.degreeEditHideHandle.bind(this);
    this.degreeDeleteHandle = this.degreeDeleteHandle.bind(this);
    this.getDegreeList = this.getDegreeList.bind(this);
    this.degreeSearch = this.degreeSearch.bind(this);
    this.refreshDoctorProfile = this.refreshDoctorProfile.bind(this);
    this.state = {
      degreeAddShow: false,
      degreeEditShow: false,
      degreeDetail:'',
      filtered: [],
      filterAll: '',
    };
  }


  /**
   * @DateOfCreation        31 May 2018
   * @ShortDescription      This function is responsible to handle open add degree model
   * @return                Nothing
   */
  degreeAddShowHandle() {
    const { dispatch }  = this.props;
    dispatch(doctorDegreeActions.resetState());
    this.setState({ degreeAddShow: true });
  }

  /**
   * @DateOfCreation        31 May 2018
   * @ShortDescription      This function is responsible to handle close add degree model
   * @return                Nothing
   */
  degreeAddHideHandle() {
    this.setState({ degreeAddShow: false });
  }

  /**
   * @DateOfCreation        31 May 2018
   * @ShortDescription      This function is responsible to handle open edit degree model
   * @return                Nothing
   */
  degreeEditShowHandle(degreeDetail) {
    this.setState({ degreeEditShow: true });
    this.setState({ degreeDetail:degreeDetail });
  }

  /**
   * @DateOfCreation        31 May 2018
   * @ShortDescription      This function is responsible to handle close edit degree model
   * @return                Nothing
   */
  degreeEditHideHandle() {
    this.setState({ degreeEditShow: false });
  }

  /**
   * @DateOfCreation        01 Aug 2018
   * @ShortDescription      This function is responsible to refresh the profile detail on add edit.
   * @return                Nothing
   */
  refreshDoctorProfile(){
      const { dispatch }  = this.props;
      dispatch(doctorProfileActions.getProfileDetail());
  }

  /**
   * @DateOfCreation        31 May 2018
   * @ShortDescription      This function is responsible to handle delete degree request
   * @param int degreeId degree id of perticular doctor
   * @return                Nothing
   */
  degreeDeleteHandle(degreeId){
    confirmAlert({
      title: 'degree delete',
      message: <div className="alert-message">Are you sure you want to delete this degree?</div>,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            const { dispatch } = this.props;
            dispatch(doctorDegreeActions.degreeDelete(degreeId, this.props.degrees));
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
   * @DateOfCreation        01 Aug 2018
   * @ShortDescription      This function is responsible to set props in state on view page
   *                        and after update again set state.
   * @param Object props    get props for edit mode
   * @return                Nothing
   */
  componentWillReceiveProps(nextProps){
      if(nextProps.deleteSuccessMessage){
            this.refreshDoctorProfile();
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
   * @ShortDescription      This function is responsible to handle load degree list
   * @return                Nothing
   */

  getDegreeList(page, pageSize, sorted, filtered){
    const { dispatch } = this.props;
    dispatch(doctorDegreeActions.degreeList(page, pageSize, sorted, filtered));
  }

  /**
   * @DateOfCreation        26 June 2018
   * @ShortDescription      This function is responsible to handle load filtered eduction list
   * @return                Nothing
   */
    degreeSearch(event){
      const { value } = event.target;
      const filterAll = value;
      const filtered = [{ id: 'all', value: filterAll }];
      this.setState({ filterAll, filtered });
    }

  /**
   * @DateOfCreation        31 May 2018
   * @ShortDescription      pass all required detail for display doctor degree list
   * @return                Nothing
   */
  render() {
    return(
      <div>
        <DoctorEducationDegree 
            degreeAddShowHandle   = { this.degreeAddShowHandle }
            degreeEditShowHandle  = { this.degreeEditShowHandle }
            degreeAddHideHandle   = { this.degreeAddHideHandle }
            degreeEditHideHandle  = { this.degreeEditHideHandle }
            degreeDeleteHandle    = { this.degreeDeleteHandle }
            degrees               = { this.props.degrees }
            degreeEditShow        = { this.state.degreeEditShow }
            degreeDetail          = { this.state.degreeDetail }
            degreeAddShow         = { this.state.degreeAddShow }
            loaderMessage         = { this.props.loader }
            getDegreeList         = { this.getDegreeList }
            pages                 = { this.props.pages }
            filterAll             = { this.state.filterAll }
            filtered              = { this.state.filtered }
            degreeSearch          = { this.degreeSearch }
            refreshDoctorProfile        = { this.refreshDoctorProfile }
            />
      </div>
    );
  }
}

/**
 * @DateOfCreation        31 May 2018
 * @ShortDescription      connect state to props on reducer and get state for degree list
 * @return                degree list and loader
 */
function mapStateToProps(state) {
    const { pages,isUserNotValid, degrees, loader, deleteSuccessMessage,sendingRequest } = state.doctorDegree;
    return {
        pages,
        isUserNotValid,
        degrees,
        loader,
        deleteSuccessMessage,
        sendingRequest
    };
}
const connectedDoctorEducationDegreeContainer = connect(mapStateToProps)(DoctorEducationDegreeContainer);
export { connectedDoctorEducationDegreeContainer as DoctorEducationDegreeContainer }; 


