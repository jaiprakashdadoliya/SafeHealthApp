import React from "react";
import {NewPatientModalContainer} from "./NewPatientModal";
import { utilityHelper } from '../../_helpers';
import { configConstants } from '../../_constants';
import ReactTable from "react-table";
import "react-table/react-table.css";

export const PatientList = (props) => {
        return (
                <div className="main-content">
                <NewPatientModalContainer
                newPatientModalShow = {props.newPatientModalShow}
                newPatientModalHideHandle = {props.newPatientModalHideHandle}
                />
                    <div className="wrap-inner-content">
                        <div className="col-md-12">
                        <div className="inner-content">
                            <div className="row page-header">
                                <div className="col-md-6 col-sm-6"><h2>Patients List</h2></div>
                                <div className="col-md-6 col-sm-6 text-right">
                                    <button className="btn green text-btn" onClick={props.newPatientModalShowHandle} >New Patient</button>
                                </div>
                            </div>
                            <div className="table-wrap">
                                <div className="table-search">
                                        <input
                                          value={props.filterAll}
                                          onChange={props.patientSearch}
                                          className="table-search-input"
                                          placeholder="Search"
                                        />
                                </div>
                                <div className="patientList">
                                <ReactTable
                                    noDataText = "No patient found !!"
                                    columns={[
                                        {
                                            Header: "",
                                            headerClassName: 'grid-header',
                                            accessor:"pat_profile_img",
                                            filterMethod: (filter, row) => {
                                                return row[filter.id].includes(filter.value);
                                            },
                                            Cell: row => (
                                                <div>
                                                    <a className="content" href="javascript:void(0)" onClick={() => props.handlePatientProfile(row.original.user_id)}>
                                                    <img src={configConstants.PATIENT_MTHUMB_PATH+row.value} />
                                                    </a>
                                                </div>
                                            )
                                        },
                                        {
                                            Header: "Patient Name",
                                            headerClassName: 'grid-header',
                                            accessor:"user_firstname",
                                            filterMethod: (filter, row) => {
                                                return row[filter.id].includes(filter.value);
                                            },
                                            Cell: row => (
                                                <div>
                                                    <a className="content" href="javascript:void(0)" onClick={() => props.handlePatientProfile(row.original.user_id)}>
                                                    {row.value}
                                                    </a>
                                                </div>
                                            )
                                        },
                                        {
                                            Header: "Patient Code",
                                            headerClassName: 'grid-header',
                                            accessor: "pat_code",
                                            width       : 100,
                                            filterMethod: (filter, row) => {
                                                return row[filter.id].includes(filter.value);
                                            },
                                            Cell: row => (
                                                <div>
                                                    <a className="content" href="javascript:void(0)" onClick={() => props.handlePatientProfile(row.original.user_id)}>
                                                    {row.value}
                                                    </a>
                                                </div>
                                            )
                                        },
                                        {
                                            Header: "Mobile Number",
                                            headerClassName: 'grid-header',
                                            accessor: "user_mobile",
                                            filterMethod: (filter, row) => {
                                                return row[filter.id].includes(filter.value);
                                            },
                                            Cell: row => (
                                                <div>
                                                    <a className="content" href="javascript:void(0)" onClick={() => props.handlePatientProfile(row.original.user_id)}>
                                                    {row.value}
                                                    </a>
                                                </div>
                                            )
                                        },
                                        {
                                            Header: "Email Address",
                                            headerClassName: 'grid-header',
                                            accessor: "user_email",
                                            filterMethod: (filter, row) => {
                                                return row[filter.id].includes(filter.value);
                                            },
                                            Cell: row => (
                                                <div>
                                                    <a className="content" href="javascript:void(0)" onClick={() => props.handlePatientProfile(row.original.user_id)}>
                                                    {row.value}
                                                    </a>
                                                </div>
                                            )
                                        },
                                        {
                                            Header: "Gender",
                                            accessor: "user_gender",
                                            className : "dataCellClass",
                                            headerClassName: 'grid-header',
                                            width       : 100,
                                            filterMethod: (filter, row) => {
                                                return row[filter.id].includes(filter.value);
                                            },
                                            Cell: row => (
                                                <div>
                                                    <a className="content" href="javascript:void(0)" onClick={() => props.handlePatientProfile(row.original.user_id)}>
                                                    {utilityHelper.getGender(row.value)}
                                                    </a>
                                                </div>
                                            )
                                        },
                                        {
                                            Header: "Group",
                                            accessor: "pat_group_name",
                                            headerClassName: 'grid-header',
                                            width       : 150,
                                            filterMethod: (filter, row) => {
                                                return row[filter.id].includes(filter.value);
                                            },
                                            Cell: row => (
                                                <div>
                                                    <a className="content" href="javascript:void(0)" onClick={() => props.handlePatientProfile(row.original.user_id)}>
                                                    {row.value}
                                                    </a>
                                                </div>
                                            )
                                        },
                                        /*{
                                            Header: "Locality",
                                            accessor: "pat_locality",
                                            headerClassName: 'grid-header',
                                            width       : 150,
                                            filterMethod: (filter, row) => {
                                                return row[filter.id].includes(filter.value);
                                            },
                                            Cell: row => (
                                                <div>
                                                    <a className="content" href="javascript:void(0)" onClick={() => props.handlePatientProfile(row.original.user_id)}>
                                                    {row.value}
                                                    </a>
                                                </div>
                                            )
                                        },
                                        {
                                            Header: "Pincode",
                                            accessor: "pat_pincode",
                                            width       : 100,
                                            headerClassName: 'grid-header',
                                            filterMethod: (filter, row) => {
                                                return row[filter.id].includes(filter.value);
                                            },
                                            Cell: row => (
                                                <div>
                                                    <a className="content" href="javascript:void(0)" onClick={() => props.handlePatientProfile(row.original.user_id)}>
                                                    {row.value}
                                                    </a>
                                                </div>
                                            )
                                        },*/
                                        {
                                            Header: "Action",
                                            headerClassName: 'grid-header-action text-center',
                                            filterable  : false,
                                            width       : 300,
                                            sortable: false,
                                            className :"text-center",
                                            Cell: row => (
                                            	<div>
                                                    <a href="javascript:void(0)" onClick={() => props.handlePatientEdit(row.original.user_id, row.original.visit_id)} className="btn green table-btn">Edit</a>
                                                    <a href="javascript:void(0)" onClick={() => props.handlePatientAllVisits(row.original.user_id)} className="btn table-btn yellow">Visits</a>
                                                    <a href={process.env.BASENAME+'patienthistory/'+row.original.user_id} className="btn green table-btn">History</a>
                                                </div>
                                            )
                                        }
                                    ]}
                                    data = {props.patientList.result}
                                    defaultPageSize={50}
                                    minRows={0}
                                    className="table table-bordered responsive"
                                    defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                                    filtered={props.filtered}
                                    Sorted
                                    pages={props.patientList.pages}
                                    showPagination={true}
                                    showPaginationTop={true}
                                    showPaginationBottom={false}
                                    pageSizeOptions={[50,100,250,500,1000]}
                                    manual // Identify Server Side Pagination
                                    onFetchData={ (state, instance) => {
                                        props.getPatientList(state.page, state.pageSize, state.sorted, state.filtered)
                                    }}
                                /></div>
                            </div>
                            </div>
                        </div>
                    </div>
           </div>

    );
}
