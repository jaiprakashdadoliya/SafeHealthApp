/**
 * DoctorMembershipContainer
 *
 * @package                SafeHealth
 * @subpackage             DoctorMembershipContainer
 * @category               Container Component
 * @DateOfCreation         11 May 2018
 * @ShortDescription       This component is reponsible for logic in membership
 */
import React from "react";
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert'; // Import
import {DoctorMembership} from "./DoctorMembership";
import {DoctorMembershipAdd} from "./DoctorMembershipAdd";
import {DoctorMembershipEdit} from "./DoctorMembershipEdit";
import {doctorMembershipActions, headerActions} from '../../../_actions';

class DoctorMembershipContainer extends React.Component 
{
  /**
    * @DateOfCreation        22 May 2018
    * @ShortDescription      Contructor is responsible to function declaration
    * @param                 props
    * @return                Nothing
    */
  constructor(props, context) {
    super(props, context);
    this.membershipAddShowHandle = this.membershipAddShowHandle.bind(this);
    this.membershipAddHideHandle = this.membershipAddHideHandle.bind(this);
    this.membershipEditShowHandle = this.membershipEditShowHandle.bind(this);
    this.membershipEditHideHandle = this.membershipEditHideHandle.bind(this);
    this.membershipDeleteHandle = this.membershipDeleteHandle.bind(this);
    this.getMembershipList = this.getMembershipList.bind(this);
    this.membershipSearch = this.membershipSearch.bind(this);
    this.state = {
      membershipAddShow: false,
      membershipEditShow: false,
      membershipDetail:'',
      filtered: [],
      filterAll: '',
    };
  }


  /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to handle open add membership model
   * @return                Nothing
   */
  membershipAddShowHandle() {
    this.setState({ membershipAddShow: true });
    const { dispatch }  = this.props;
    dispatch(doctorMembershipActions.resetState());
  }

  /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to handle close add membership model
   * @return                Nothing
   */
  membershipAddHideHandle() {
    this.setState({ membershipAddShow: false });
  }

  /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to handle open edit membership model
   * @return                Nothing
   */
  membershipEditShowHandle(membershipIndex) {
    var memberDetail = this.props.membership[membershipIndex];
    this.setState({ membershipEditShow: true });
    this.setState({ membershipDetail:memberDetail });
  }

  /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to handle close edit membership model
   * @return                Nothing
   */
  membershipEditHideHandle() {
    this.setState({ membershipEditShow: false });
  }

  /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to handle delete membership request
   * @param int membershipId membership id of perticular doctor
   * @return                Nothing
   */
  membershipDeleteHandle(membershipId){
    confirmAlert({
      title: 'Membership delete',
      message: <div className="alert-message">Are you sure you want to delete this membership?</div>,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            const { dispatch } = this.props;
            dispatch(doctorMembershipActions.membershipDelete(membershipId, this.props.membership));  
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
   * @ShortDescription      This function is responsible to handle load membership list
   * @return                Nothing
   */

  getMembershipList(page, pageSize, sorted, filtered){
    const { dispatch } = this.props;
    dispatch(doctorMembershipActions.membershipList(page, pageSize, sorted, filtered));
  }

  /**
   * @DateOfCreation        26 June 2018
   * @ShortDescription      This function is responsible to handle load filtered membership list
   * @return                Nothing
   */
  membershipSearch(event){
    const { value } = event.target;
    const filterAll = value;
    const filtered = [{ id: 'all', value: filterAll }];
    this.setState({ filterAll, filtered });
  }

  /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      pass all required detail for display doctor membership list
   * @return                Nothing
   */
  render() {
    return(
      <div>
        <DoctorMembership 
            membershipAddShowHandle = {this.membershipAddShowHandle}
            membershipEditShowHandle = {this.membershipEditShowHandle}
            membershipAddHideHandle ={this.membershipAddHideHandle}        
            membershipEditHideHandle ={this.membershipEditHideHandle}
            membershipDeleteHandle = {this.membershipDeleteHandle}
            membership ={this.props.membership}
            membershipEditShow = {this.state.membershipEditShow}
            membershipDetail = {this.state.membershipDetail}
            membershipAddShow = {this.state.membershipAddShow}
            loaderMessage = {this.props.loader}
            getMembershipList = {this.getMembershipList}
            pages             = {this.props.pages}
            filterAll            = {this.state.filterAll}
            filtered          = {this.state.filtered}
            membershipSearch         = {this.membershipSearch}
            />
      </div>
    );
  }
}

/**
 * @DateOfCreation        22 May 2018
 * @ShortDescription      connect state to props on reducer and get state for membership list 
 * @return                membership list and loader 
 */
function mapStateToProps(state) {
    const { pages, isUserNotValid, membership, loader, deleteSuccessMessage,sendingRequest } = state.doctorMembership;
    return {
        pages,
        isUserNotValid,
        membership,
        loader,
        deleteSuccessMessage,
        sendingRequest
    };
}
const connectedDoctorMembershipContainer = connect(mapStateToProps)(DoctorMembershipContainer);
export { connectedDoctorMembershipContainer as DoctorMembershipContainer }; 


