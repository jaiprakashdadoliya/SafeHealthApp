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

const NewSampleModalContainer = Loadable({
    loader: () => import('./NewSampleModal').then(object => object.NewSampleModalContainer),
    loading: Loading
});

const EditSampleModalContainer = Loadable({
    loader: () => import('./EditSampleModal').then(object => object.EditSampleModalContainer),
    loading: Loading
});

export const Samples = (props) => {
    return (
        <div className="page-container">
            <SideMenu />
            <HeaderContainer />
            <div className="main-content">
                <NewSampleModalContainer
                    newSampleModalShow =   {props.newSampleModalShow}
                    newSampleModalHideHandle = {props.newSampleModalHideHandle}
                    errorMsg            = {props.errorMsg}
                    sampleSubmit       = {props.sampleSubmit}
                />
                <EditSampleModalContainer
                    editSampleModalShow =   {props.editSampleModalShow}
                    editSampleModalHideHandle = {props.editSampleModalHideHandle}
                    successMsg  = {props.successMsg}
                    sampleSubmit = {props.sampleSubmit}
                />
                <div className="col-md-12">
                    <div className="wrap-inner-content">
                        <div className="inner-content">
                            <div className="row page-header">
                                <div className="col-md-6 col-sm-6"><h2>Lab Samples list</h2></div>
                                 <div className="col-md-6 col-sm-6 text-right">
                                    <a href={process.env.BASENAME+'testslist'}><button  className="btn green text-btn">Tests list</button></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <button  onClick={props.newSampleModalShowHandle} className="btn green text-btn">Add Sample</button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 margin-top-25">
                                <ReactTable
                                    noDataText = "No sample found !!"
                                    columns={[
                                        {
                                            Header: "Sno",
                                            headerClassName: 'grid-header',
                                            accessor:"sample_id",
                                            width:60
                                        },
                                        {
                                            Header: "Sample Code",
                                            headerClassName: 'grid-header',
                                            accessor:"sample_code",
                                        },
                                        {
                                            Header: "Investigation status",
                                            headerClassName: 'grid-header',
                                            accessor: "inv_status",
                                        },
                                        {
                                            Header: "Date of sample",
                                            headerClassName: 'grid-header',
                                            accessor: "sample_date",
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
                                                    <a href="javascript:void(0)" onClick={props.editSampleModalShowHandle.bind(null, row.original)}  className="btn green table-btn">Edit</a>
                                                    <a href="javascript:void(0)" onClick={props.sampleDelete} className="btn red  table-btn">Delete</a>
                                                    <a href={process.env.BASENAME+'reportslist'}  className="btn green  table-btn">Reports</a>
                                                </div>
                                            )
                                        }
                                    ]}
                                    data = {props.labSamples}
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
