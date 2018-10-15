import React from "react";
import { Alert, bsStyle } from 'react-bootstrap';
import { SaveClinicContainer } from './SaveClinicContainer';
import { utilityHelper } from '../../_helpers';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { HeaderContainer } from "../Header";
import { SideMenu } from "../SideMenu";

export const Clinic = (props) => {
    return (
        <div className="page-container">
            <SideMenu />
            <HeaderContainer history={props.history}  />
            <SaveClinicContainer
                saveClinicHideHandle = { props.saveClinicHideHandle }
                saveClinicShow       = { props.saveClinicShow }
                clinicEditDetail     = { props.clinicDetail }
            />
            <div className="main-content">
                <div className="col-md-12">
                    <div className="wrap-inner-content">
                        <div className="inner-content">
                            <div className="row page-header">
                                <div className="col-md-6 col-sm-6"><h2>Clinics</h2></div>
                                <div className="col-md-6 col-sm-6 text-right">
                                    <button onClick={ props.saveClinicShowHandle } className="btn green text-btn">Add clinic</button>
                                </div>
                            </div>
                            <div className="table-wrap">
                                <div className="table-search">
                                 <input 
                                            value={props.filterAll}
                                            onChange={props.clinicSearch}
                                            className="table-search-input"
                                            placeholder="Search"
                                        />
                                </div>
                                <ReactTable
                                    noDataText="No clinic found !!"
                                    data={props.clinicList}
                                    filterable
                                    defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                                    filtered={props.filtered}
                                    columns={[
                                        {  
                                            Header      : "Clinic Name",
                                            accessor    : "clinic_name",
                                            className   : "dataCellClass",
                                            filterable  : false,
                                            filterMethod: (filter, row) => {
                                                return row[filter.id].includes(filter.value);
                                            }
                                            
                                        },
                                        {
                                            Header    : "Phone Number",
                                            accessor  : "clinic_phone",
                                            className : "dataCellClass",
                                            filterable  : false,
                                            filterMethod: (filter, row) => {
                                                return row[filter.id].includes(filter.value);
                                            }
                                        },
                                        {
                                            Header    : "Address",
                                            accessor  : "clinic_address_line1",
                                            className : "dataCellClass",
                                            filterable  : false,
                                            filterMethod: (filter, row) => {
                                                return row[filter.id].includes(filter.value);
                                            },
                                            Cell: row => row.original.clinic_address_line1
                                        },
                                        {
                                            Header: 'Actions',
                                            accessor  : "clinic_id",
                                            filterable  : false,
                                            className :"actionCellClass",
                                            Cell: row => <div>
                                                            <a href="javascript:void(0);" onClick={ props.saveClinicShowHandle.bind(null,row.original) } className="green btn table-btn">Edit</a>
                                                            <a href="javascript:void(0)" onClick={ props.deleteClinicHandle.bind(null,row.original.clinic_id) } className="red btn table-btn">Delete</a>
                                                        </div>
                                        }
                                    ]}
                                    defaultSorted={[
                                        {
                                            id: "clinic_name",
                                            desc: true
                                        } 
                                    ]}
                                    defaultPageSize={6}
                                    minRows= {props.clinicList.length}
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
                                        props.getClinicList(state.page, state.pageSize, state.sorted, state.filtered);
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


