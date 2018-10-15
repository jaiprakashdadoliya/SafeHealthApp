/**
 * ClinicContainer
 *
 * @package                SafeHealth
 * @subpackage             ClinicContainer
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
import { Clinic } from "./Clinic";
import { SaveClinic } from "./SaveClinic";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import { clinicActions } from '../../_actions';

class ClinicContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.saveClinicShowHandle = this.saveClinicShowHandle.bind(this);
        this.saveClinicHideHandle = this.saveClinicHideHandle.bind(this);
        this.deleteClinicHandle   = this.deleteClinicHandle.bind(this);
        this.getClinicList        = this.getClinicList.bind(this);
        this.clinicSearch         = this.clinicSearch.bind(this);
        this.state               = this.initialState;
    }

    get initialState() {
        return {
            clinicDetail : {
                'clinic_id'     : '',
                'clinic_name'   : '',
                'clinic_phone'   : '',
                'clinic_address_line1' : '',
                'clinic_address_line2' : '',
                'clinic_landmark'   : '',
                'clinic_pincode'   : ''
            },
            loading : false,
            pages  : 0
        }
    }

    /**
     * @DateOfCreation        19 June 2018
     * @ShortDescription      This function is responsible to handle open Add/Edit Clinic model
     * @return                Nothing
    */
    saveClinicShowHandle(clinicEditDetail) {
        this.setState({ saveClinicShow: true });
        if(clinicEditDetail.clinic_id != null) {
            this.setState({
                clinicDetail : {
                    'clinic_id'     : String(clinicEditDetail.clinic_id),
                    'clinic_name'   : String(clinicEditDetail.clinic_name),
                    'clinic_phone'   : String(clinicEditDetail.clinic_phone),
                    'clinic_address_line1' : String(clinicEditDetail.clinic_address_line1),
                    'clinic_address_line2' : String(clinicEditDetail.clinic_address_line2),
                    'clinic_landmark'   : String(clinicEditDetail.clinic_landmark),
                    'clinic_pincode'   : String(clinicEditDetail.clinic_pincode)
                },
                closeForm : false,
            });
        }else{
            this.setState(this.initialState);
        }
    }

    /**
     * @DateOfCreation        19 June 2018
     * @ShortDescription      This function is responsible to handle hide Add/Edit Clinic model
     * @return                Nothing
    */
    saveClinicHideHandle() {
        this.setState({ saveClinicShow: false });
    }



    /**
     * @DateOfCreation        19 June 2018
     * @ShortDescription      This function is responsible to handle Delete Clinic actions
     * @return                Nothing
    */
    deleteClinicHandle(clinicId) {
        confirmAlert({
            title   : 'Delete Clinic',
            message : 'Are you sure you want to delete this clinic member?',
            buttons : [
                {
                    label: 'Yes',
                    onClick: () => {
                        const { dispatch } = this.props;
                        dispatch(clinicActions.clinicDelete(clinicId, this.props.clinicList));
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
    getClinicList(page, pageSize, sorted, filtered){
        const { dispatch }   = this.props;
        dispatch(clinicActions.clinicList(page, pageSize, sorted, filtered));
    }

    /**
     * @DateOfCreation        26 June 2018
     * @ShortDescription      This function is responsible to handle load filtered membership list
     * @return                Nothing
    */
    clinicSearch(event){
        const { value } = event.target;
        const filterAll = value;
        const filtered = [{ id: 'all', value: filterAll }];
        this.setState({ filterAll, filtered });
    }

    render() {
        return (
            <Clinic 
                saveClinicShowHandle = { this.saveClinicShowHandle }
                saveClinicHideHandle = { this.saveClinicHideHandle }
                saveClinicShow       = { this.state.saveClinicShow }
                clinicDetail         = { this.state.clinicDetail }
                deleteClinicHandle   = { this.deleteClinicHandle }
                clinicList           = { this.props.clinicList }
                history              = { this.props.history }
                loaderMessage        = { this.props.loader }
                loading              = { this.props.loading }
                pages                = { this.props.pages }
                getClinicList        = { this.getClinicList }
                filterAll            = { this.state.filterAll }
                filtered             = { this.state.filtered }
                clinicSearch         = { this.clinicSearch }
            />
        );
    }
}

function mapStateToProps(state) {
    const {pages, clinicList, loader } = state.clinic;
    return {
        clinicList,
        pages,
        loader
    };
}

const connectedClinicContainer = connect(mapStateToProps)(ClinicContainer);
export { connectedClinicContainer as ClinicContainer }; 