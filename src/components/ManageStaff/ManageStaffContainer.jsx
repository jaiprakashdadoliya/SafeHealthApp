/**
 * ManageStaffContainer
 *
 * @package                SafeHealth
 * @subpackage             ManageStaffContainer
 * @category               Container Component
 * @DateOfCreation         19 June 2018
 * 
 */

import React from "react";
import { connect } from 'react-redux';
import { utilityHelper, history } from '../../_helpers';
import { Cookies } from 'react-cookie';
import { LoginContainer } from "../Login";
import { configConstants } from '../../_constants';
import { ManageStaff } from "./ManageStaff";
import { SaveStaff } from "./SaveStaff";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import { manageStaffActions, staticDataActions } from '../../_actions';

class ManageStaffContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.saveStaffShowHandle = this.saveStaffShowHandle.bind(this);
        this.saveStaffHideHandle = this.saveStaffHideHandle.bind(this);
        this.deleteStaffHandle   = this.deleteStaffHandle.bind(this);
        this.getStaffList        = this.getStaffList.bind(this);
        this.staffSearch         = this.staffSearch.bind(this);
        this.state               = this.initialState;
    }

    get initialState() {
        return {
            staffDetail : {
                'doc_staff_id'       : '',
                'user_id'            : '',
                'user_firstname'     : '',
                'user_lastname'      : '',
                'user_gender_id'     : '',
                'user_mobile'        : '',
                'user_email'         : '',
                'user_type_id'       : '',
                'user_password'      : '',
                'user_adhaar_number' : '',
                'user_country_code'  : '91',
            },
            loading : false,
            pages  : 0
        }
    }

    /**
  * @DateOfCreation        29 May 2018
  * @ShortDescription      This function is responsible to fatch city and state on load
  * @return                nothing
  */
  componentDidMount(){
        const { dispatch }   = this.props;
        dispatch(staticDataActions.getStaticData());
  }
  

    /**
     * @DateOfCreation        19 June 2018
     * @ShortDescription      This function is responsible to handle open Add/Edit Staff model
     * @return                Nothing
    */
    saveStaffShowHandle(staffEditDetail) {
        this.setState({ saveStaffShow: true });
        if(staffEditDetail.doc_staff_id != null) {

            this.setState({
                staffDetail : {
                    'doc_staff_id'       : String(staffEditDetail.doc_staff_id),
                    'user_id'            : String(staffEditDetail.user_id),
                    'user_firstname'     : String(staffEditDetail.user_firstname),
                    'user_lastname'      : String(staffEditDetail.user_lastname),
                    'user_gender_id'     : String(staffEditDetail.user_gender_id),
                    'user_mobile'        : String(staffEditDetail.user_mobile),
                    'user_email'         : String(staffEditDetail.user_email),
                    'user_type_id'       : String(staffEditDetail.user_type_id),
                    'user_password'      : String(staffEditDetail.user_password),
                    'user_adhaar_number' : String(staffEditDetail.user_adhaar_number),
                    'user_country_code'  : '91',
                },
                closeForm : false,
            });
        }else{
            this.setState(this.initialState);
        }
    }

    /**
     * @DateOfCreation        19 June 2018
     * @ShortDescription      This function is responsible to handle hide Add/Edit Staff model
     * @return                Nothing
    */
    saveStaffHideHandle() {
        this.setState({ saveStaffShow: false });
    }



    /**
     * @DateOfCreation        19 June 2018
     * @ShortDescription      This function is responsible to handle Delete Staff actions
     * @return                Nothing
    */
    deleteStaffHandle(staffId) {
        confirmAlert({
            title   : 'Delete Staff',
            message : 'Are you sure you want to delete this staff member?',
            buttons : [
                {
                    label: 'Yes',
                    onClick: () => {
                        const { dispatch } = this.props;
                        dispatch(manageStaffActions.staffDelete(staffId, this.props.staffList));
                        this.setState(this.initialState);
                    }
                },
                {
                    label   : 'No',
                    onClick : () => { return false; }
                }
            ]
        })
    }

    /**
    * @DateOfCreation        19 June 2018
    * @ShortDescription      This function is responsible to get the list of experience from API
    * @return                Nothing
    */
    getStaffList(page, pageSize, sorted, filtered){
        const { dispatch }   = this.props;
        dispatch(manageStaffActions.staffList(page, pageSize, sorted, filtered));
    }

    /**
     * @DateOfCreation        26 June 2018
     * @ShortDescription      This function is responsible to handle load filtered membership list
     * @return                Nothing
    */
    staffSearch(event){
        const { value } = event.target;
        const filterAll = value;
        const filtered = [{ id: 'all', value: filterAll }];
        this.setState({ filterAll, filtered });
    }

    render() {
        return (
            <ManageStaff 
                saveStaffShowHandle = { this.saveStaffShowHandle }
                saveStaffHideHandle = { this.saveStaffHideHandle }
                saveStaffShow       = { this.state.saveStaffShow }
                staffDetail         = { this.state.staffDetail }
                deleteStaffHandle   = { this.deleteStaffHandle }
                staffList           = { this.props.staffList }
                history             = { this.props.history }
                loaderMessage       = { this.props.loader }
                loading             = { this.props.loading }
                pages               = { this.props.pages }
                getStaffList        = { this.getStaffList }
                filterAll           = { this.state.filterAll }
                filtered            = { this.state.filtered }
                staffSearch         = { this.staffSearch }
            />
        );
    }
}

function mapStateToProps(state) {
    const {pages, staffList, loader } = state.manageStaff;
    return {
        staffList,
        pages,
        loader
    };
}

const connectedManageStaffContainer = connect(mapStateToProps)(ManageStaffContainer);
export { connectedManageStaffContainer as ManageStaffContainer }; 