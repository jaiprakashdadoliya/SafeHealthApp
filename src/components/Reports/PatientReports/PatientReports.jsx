import React from "react";
import moment from "moment";
import {faMobileAlt, faUser, faTint, faIdCard } from '@fortawesome/fontawesome-free-solid';
import { configConstants } from '../../../_constants';
import { utilityHelper } from '../../../_helpers';
import {FxForm} from '../../../_packages/fx-form';
import ReactTable from "react-table";
import "react-table/react-table.css";

export const PatientReports = (props) => {
    return (
        <div className="col-md-12 mb-10">
            <div className="row">
                <div className="col-md-6 col-sm-12">
                    <h4>Patient Report</h4>    
                </div>
                <div className="col-md-6 col-sm-12 text-right">
                <ul className="print_btn">
                   <li> <a href="javascript:void(0)">Export</a>
                        <ul>
                            <li><a href="javascript:void(0)" onClick={props.handleReportExport.bind(null, 'csv')} >CSV</a></li>
                            <li><a href="javascript:void(0)" onClick={props.handleReportExport.bind(null, 'pdf')} >PDF</a></li>
                        </ul>
                   </li>
                </ul>
                </div>

                <div className="col-md-12">
                    {props.errorMsg && !props.isInsertDone &&
                        <Alert bsStyle="danger">
                            {props.errorMsg}
                        </Alert>
                    }

                    {(props.isUpdateDone || props.isEditSuccess) &&
                        props.successMsg &&
                            <Alert bsStyle="success">
                                {props.successMsg}
                            </Alert>
                    }
                </div>
                
                <div className="col-md-12 mb10 filter-form-fields rpl rpr">
                    <form role="form" onSubmit={(e) => {e.preventDefault();}}>
                        <FxForm
                            config={props.PatientReportsFormConfig}
                            ref={(form) => {
                                props.handlePatientReportsFormUpdate(form);
                            }}
                        />
                    </form>
                </div>
                <div className="clearfix mt20"></div>
                <div className="col-md-12 mt20">
                    <div className="table-wrap">
                        <div className="table-search reports-table-search">
                            <input
                                value={props.filterAll}
                                onChange={props.filteredPatientSearch}
                                className="table-search-input"
                                placeholder="Search"
                            />
                        </div>
                        <div className="patientList">
                            <ReactTable
                                noDataText = "No record found !!"
                                columns={[
                                    {
                                        Header: "Created Date",
                                        headerClassName: 'grid-header',
                                        accessor:"created_at",
                                        filterMethod: (filter, row) => {
                                            return row[filter.id].includes(filter.value);
                                        },
                                        Cell: row => (
                                            <div>
                                                <a className="content" href="javascript:void(0)">
                                                {moment(row.value).format('DD/MM/YYYY')}
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
                                                <a className="content" href="javascript:void(0)">
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
                                                <a className="content" href="javascript:void(0)">
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
                                                <a className="content" href="javascript:void(0)">
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
                                                <a className="content" href="javascript:void(0)">
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
                                                <a className="content" href="javascript:void(0)">
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
                                                <a className="content" href="javascript:void(0)">
                                                {row.value}
                                                </a>
                                            </div>
                                        )
                                    }
                                ]}
                                data = {props.filterPatientData.result}
                                defaultPageSize={10}
                                minRows={0}
                                className="table table-bordered responsive"
                                defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                                filtered={props.filtered}
                                Sorted
                                pages={props.filterPatientData.pages}
                                showPagination={true}
                                showPaginationTop={true}
                                showPaginationBottom={false}
                                pageSizeOptions={[10, 20, 50, 100]}
                                manual // Identify Server Side Pagination
                                onFetchData={ (state, instance) => {
                                    props.getFilteredPatientList(state.page, state.pageSize, state.sorted, state.filtered)
                                }}
                            />
                        </div>
                    </div>
                </div>

            </div>     
        </div>
    );
}
