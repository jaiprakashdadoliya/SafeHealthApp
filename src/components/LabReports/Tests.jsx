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

const NewTestModalContainer = Loadable({
    loader: () => import('./NewTestModal').then(object => object.NewTestModalContainer),
    loading: Loading
});

const EditTestModalContainer = Loadable({
    loader: () => import('./EditTestModal').then(object => object.EditTestModalContainer),
    loading: Loading
});

export const Tests = (props) => {
    return (
        <div className="page-container">
            <SideMenu />
            <HeaderContainer />
            <div className="main-content">
                <NewTestModalContainer
                    newTestModalShow =   {props.newTestModalShow}
                    newTestModalHideHandle = {props.newTestModalHideHandle}
                    errorMsg            = {props.errorMsg}
                    testSubmit       = {props.testSubmit}
                />
                <EditTestModalContainer
                    editTestModalShow =   {props.editTestModalShow}
                    editTestModalHideHandle = {props.editTestModalHideHandle}
                    successMsg  = {props.successMsg}
                    testSubmit = {props.testSubmit}
                />
                <div className="col-md-12">
                    <div className="wrap-inner-content">
                        <div className="inner-content">
                            <div className="row page-header">
                                <div className="col-md-6 col-sm-6"><h2>Lab Tests list</h2></div>
                                 <div className="col-md-6 col-sm-6 text-right">
                                    <a href={process.env.BASENAME+'labpatientslist'}><button  className="btn green text-btn">Patient list</button></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <button  onClick={props.newTestModalShowHandle} className="btn green text-btn">Add Test</button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 margin-top-25">
                                <ReactTable
                                    noDataText = "No test found !!"
                                    columns={[
                                        {
                                            Header: "Sno",
                                            headerClassName: 'grid-header',
                                            accessor:"test_id",
                                            width:60
                                        },
                                        {
                                            Header: "Test name",
                                            headerClassName: 'grid-header',
                                            accessor:"test_name",
                                        },
                                        {
                                            Header: "TOT( turn around time )",
                                            headerClassName: 'grid-header',
                                            accessor: "tot",
                                          },
                                        {
                                            Header: "Status",
                                            headerClassName: 'grid-header',
                                            accessor:"status"
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
                                                    <a href="javascript:void(0)" onClick={props.editTestModalShowHandle.bind(null, row.original)}  className="btn green table-btn">Edit</a>
                                                    <a href="javascript:void(0)" onClick={props.testDelete} className="btn red  table-btn">Delete</a>
                                                    <a href={process.env.BASENAME+'sampleslist'}  className="btn green  table-btn">Samples</a>
                                                    <a href={process.env.BASENAME+'reportslist'}  className="btn green  table-btn">Reports</a>
                                                </div>
                                            )
                                        }
                                    ]}
                                    data = {props.labTests}
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
