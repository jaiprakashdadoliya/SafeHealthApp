import React from "react";
import {fontawesome, FontAwesomeIcon, Loading} from '../../global';
import {Header} from "../Header";
import {faMobileAlt, faUser, faTint, faIdCard } from '@fortawesome/fontawesome-free-solid';
import Select from 'react-select';
import Loadable from 'react-loadable';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {utilityHelper} from '../../_helpers';
const SideMenu = Loadable({
    loader: () => import('../SideMenu').then(object => object.SideMenu),
    loading: Loading
});

const HeaderContainer = Loadable({
    loader: () => import('../Header').then(object => object.HeaderContainer),
    loading: Loading
});

const NewPatientModalContainer = Loadable({
    loader: () => import('./NewPatientModal').then(object => object.NewPatientModalContainer),
    loading: Loading
});

const EditPatientModalContainer = Loadable({
    loader: () => import('./EditPatientModal').then(object => object.EditPatientModalContainer),
    loading: Loading
});

export const LabPatients = (props) => {
    return (
        <div className="page-container">
            <SideMenu />
            <HeaderContainer />
            <div className="main-content">
                <NewPatientModalContainer
                    newPatientModalShow =   {props.newPatientModalShow}
                    newPatientModalHideHandle = {props.newPatientModalHideHandle}
                    errorMsg            = {props.errorMsg}
                    patientSubmit       = {props.patientSubmit}
                />
                <EditPatientModalContainer
                    editPatientModalShow =   {props.editPatientModalShow}
                    editPatientModalHideHandle = {props.editPatientModalHideHandle}
                    successMsg  = {props.successMsg}
                    patientSubmit = {props.patientSubmit}
                />
                <div className="col-md-12">
                    <div className="wrap-inner-content">
                        <div className="inner-content">
                            <div className="row page-header">
                                <div className="col-md-6 col-sm-6"><h2>Lab Patients list</h2></div>
                                 <div className="col-md-6 col-sm-6 text-right">
                                    <button  onClick={props.newPatientModalShowHandle} className="btn green text-btn">Add Patient</button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 margin-top-25">
                                <ReactTable
                                    noDataText = "No patient found !!"
                                    columns={[
                                        {
                                            Header: "Sno",
                                            headerClassName: 'grid-header',
                                            accessor:"user_id",
                                            width:60
                                        },
                                        {
                                            Header: "Patient name",
                                            headerClassName: 'grid-header',
                                            accessor:"user_firstname",
                                        },
                                        {
                                            Header: "Mobile number",
                                            headerClassName: 'grid-header',
                                            accessor: "user_mobile",
                                          },
                                        {
                                            Header: "Age",
                                            headerClassName: 'grid-header',
                                            accessor:"pat_dob",
                                            Cell         : props => 
                                                <span>
                                                    {utilityHelper.calculateAge(props.value)}
                                                </span>
                                        },
                                        {
                                            Header: "Referred Doctor",
                                            headerClassName: 'grid-header',
                                            accessor:"doc_ref_name",
                                            Cell         : props => 
                                                <span>
                                                    {props.value}
                                                </span>
                                        },
                                        {
                                            Header: "Action",
                                            headerClassName: 'grid-header-action text-center',
                                            filterable  : false,
                                            width       : 300,
                                            sortable: false,
                                            className :"text-center",
                                            Cell: row => (
                                                <div>
                                                    <a href="javascript:void(0)" onClick={props.editPatientModalShowHandle.bind(null, row.original)}  className="btn green table-btn">Edit</a>
                                                    <a href="javascript:void(0)" onClick={props.patientDelete} className="btn red  table-btn">Delete</a>
                                                    <a href={process.env.BASENAME+'testslist'}  className="btn green  table-btn">Tests</a>
                                                </div>
                                            )
                                        }
                                    ]}
                                    data = {props.labPatients}
                                    defaultPageSize={10}
                                    className="table table-bordered responsive"
                                    defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                                    Sorted
                                    showPaginationTop={true}
                                    showPaginationBottom={false}
                                    pageSizeOptions={[50,100,250,500,1000]}
                                />
                                </div>
                            </div>        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
