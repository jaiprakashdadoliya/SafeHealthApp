import React from "react";
import { Alert, bsStyle } from 'react-bootstrap';
import { SaveStaffContainer } from './SaveStaffContainer';
import { utilityHelper } from '../../_helpers';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { HeaderContainer } from "../Header";
import { SideMenu } from "../SideMenu";

export const ManageStaff = (props) => {
    return (
        <div className="page-container">
            <SideMenu />
            <HeaderContainer history={props.history}  />
            <SaveStaffContainer
                saveStaffHideHandle = { props.saveStaffHideHandle }
                saveStaffShow       = { props.saveStaffShow }
                staffEditDetail     = { props.staffDetail }
            />
            <div className="main-content">
                <div className="col-md-12">
                    <div className="wrap-inner-content">
                        <div className="inner-content">
                            <div className="row page-header">
                                <div className="col-md-6 col-sm-6"><h2>Manage Staff</h2></div>
                                <div className="col-md-6 col-sm-6 text-right">
                                    <button onClick={ props.saveStaffShowHandle } className="btn green text-btn">Add staff</button>
                                </div>
                            </div>
                            <div className="table-wrap">
                                <div className="table-search">
                                <input 
                                            value={props.filterAll}
                                            onChange={props.staffSearch}
                                            className="table-search-input"
                                            placeholder="Search"
                                        />
                                </div>
                                <ReactTable
                                    noDataText="No staff found !!"
                                    data={props.staffList}
                                    filterable
                                    defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                                    filtered={props.filtered}
                                    columns={[
                                        {  
                                            Header      : "Staff Name",
                                            accessor    : "user_firstname",
                                            className   : "dataCellClass",
                                            filterable  : false,
                                            filterMethod: (filter, row) => {
                                                return row[filter.id].includes(filter.value);
                                            }
                                            
                                        },
                                        {
                                            Header: "Gender",
                                            accessor: "user_gender",
                                            className : "dataCellClass",
                                            filterable  : false,
                                            filterMethod: (filter, row) => {
                                                return row[filter.id].includes(filter.value);
                                            },
                                            Cell: row => row.original.user_gender
                                        },
                                        {
                                            Header    : "Contact Number",
                                            accessor  : "user_mobile",
                                            className : "dataCellClass",
                                            filterable  : false,
                                            filterMethod: (filter, row) => {
                                                return row[filter.id].includes(filter.value);
                                            }
                                        },
                                        {
                                            Header    : "Role",
                                            accessor  : "user_type",
                                            className : "dataCellClass",
                                            filterable  : false,
                                            filterMethod: (filter, row) => {
                                                return row[filter.id].includes(filter.value);
                                            },
                                            Cell: row => row.original.user_type
                                        },
                                        {
                                            Header: 'Actions',
                                            accessor  : "doc_staff_id",
                                            filterable  : false,
                                            className :"actionCellClass",
                                            Cell: row => <div>
                                                            <a href="javascript:void(0);" onClick={ props.saveStaffShowHandle.bind(null,row.original) } className="green btn table-btn">Edit</a>
                                                            <a href="javascript:void(0)" onClick={ props.deleteStaffHandle.bind(null,row.original.doc_staff_id) } className="red btn table-btn">Delete</a>
                                                        </div>
                                        }
                                    ]}
                                    defaultSorted={[
                                        {
                                            id: "user_firstname",
                                            desc: true
                                        } 
                                    ]}
                                    defaultPageSize={6}
                                    minRows= {props.staffList.length}
                                    className="table table-bordered responsive"
                                    loading={props.loading}
                                    filterable
                                    Sorted
                                    pages={props.pages}
                                    showPagination={true}
                                    showPaginationTop={true}
                                    showPaginationBottom={false}
                                    pageSizeOptions={[1, 2, 3, 4, 5, 6]}
                                    manual // For server side pagination
                                    onFetchData={(state, instance) => {
                                        props.getStaffList(state.page, state.pageSize, state.sorted, state.filtered);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


