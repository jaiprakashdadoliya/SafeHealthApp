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

const NewReportModalContainer = Loadable({
    loader: () => import('./NewReportModal').then(object => object.NewReportModalContainer),
    loading: Loading
});

const EditReportModalContainer = Loadable({
    loader: () => import('./EditReportModal').then(object => object.EditReportModalContainer),
    loading: Loading
});

export const LabReports = (props) => {
    return (
        <div className="page-container">
            <SideMenu />
            <HeaderContainer />
            <div className="main-content">
                <NewReportModalContainer
                    newReportModalShow =   {props.newReportModalShow}
                    newReportModalHideHandle = {props.newReportModalHideHandle}
                    errorMsg            = {props.errorMsg}
                    reportSubmit       = {props.reportSubmit}
                />
                <EditReportModalContainer
                    editReportModalShow =   {props.editReportModalShow}
                    editReportModalHideHandle = {props.editReportModalHideHandle}
                    successMsg  = {props.successMsg}
                    reportSubmit = {props.reportSubmit}
                />
                <div className="col-md-12">
                    <div className="wrap-inner-content">
                        <div className="inner-content">
                            <div className="row page-header">
                                <div className="col-md-6 col-sm-6"><h2>Lab Reports list</h2></div>
                                 <div className="col-md-6 col-sm-6 text-right">
                                    <a href={process.env.BASENAME+'testslist'}><button  className="btn green text-btn">Tests list</button></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <button  onClick={props.newReportModalShowHandle} className="btn green text-btn">Add Report</button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 margin-top-25">
                                <ReactTable
                                    noDataText = "No report found !!"
                                    columns={[
                                        {
                                            Header: "Sno",
                                            headerClassName: 'grid-header',
                                            accessor:"user_id",
                                            width:60
                                        },
                                        {
                                            Header: "Report name",
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
                                            Header: "Action",
                                            headerClassName: 'grid-header-action text-center',
                                            filterable  : false,
                                            width       : 300,
                                            sortable: false,
                                            className :"text-center",
                                            Cell: row => (
                                                <div>
                                                    <a href="javascript:void(0)" onClick={props.editReportModalShowHandle.bind(null, row.original)}  className="btn green table-btn">Edit</a>
                                                    <a href="javascript:void(0)" onClick={props.reportDelete} className="btn red  table-btn">Delete</a>
                                                </div>
                                            )
                                        }
                                    ]}
                                    data = {props.labReports}
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
