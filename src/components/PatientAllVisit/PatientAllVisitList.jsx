import React from "react";
import {PatientInfoHeader} from '../../global';
import { configConstants } from '../../_constants';
import ReactTable from "react-table";
import {Button, Alert, bsStyle} from 'react-bootstrap';
import "react-table/react-table.css";
import { utilityHelper } from '../../_helpers';

export const PatientAllVisitList = (props) => {
    const userInfo = utilityHelper.getUserInfo();

    var gridCol = 
    [
        {
            Header: "Visit",
            headerClassName: 'grid-header',
            accessor: "visit_number",
            filterMethod: (filter, row) => {
                return row[filter.id].includes(filter.value);
            },
        },
        {
            Header      : "Date & Time",
            headerClassName: 'grid-header',
            accessor    : "created_at",
            filterMethod: (filter, row) => {
                return row[filter.id].includes(filter.value);
            },
        },
        {
            Header      : "Present Complaints",
            headerClassName: 'grid-header',
            accessor    : "symptom_list",
            filterable  : false,
            sortable    : false,
        },
/*        {
            Header      : "FVC % pred",
            headerClassName: 'grid-header',
            accessor    : "fvc_data",
            filterable  : false,
            sortable    : false,
        },
        {
            Header      : "Date of last hospitalization",
            headerClassName: 'grid-header',
            accessor    : "date_of_hospitalization",
            filterable  : false,
            sortable    : false,
        },
        {
            Header      : "DLCo % pred",
            headerClassName: 'grid-header',
            accessor    : "dlco_data",
            filterable  : false,
            sortable    : false,
        },
*/        {
            Header      : "Doctor Name",
            headerClassName: 'grid-header',
            accessor    : "doctor_name",
            filterable  : true,
            sortable    : true,
        },
        {
            Header      : "Action",
            headerClassName: 'grid-header-action text-center',
            filterable  : false,
            sortable    : false,
            className   :"text-center",
            Cell: row => (
                <div>
                    <a href="javascript:void(0)" onClick={() => props.redirectHandleVisitPage(row.original.pat_id, row.original.visit_id, row.original.visit_type)}
                        className="btn green table-btn">Edit
                    </a>
                </div>
            )
        }
    ];

    /*if(userInfo.user_type != configConstants.USER_TYPE_PATIENT){
        gridCol.splice(6, 1);
    }*/

    return (
        <div className="main-content">
            <div className="wrap-inner-content">
                <div className="col-md-12">
                    <div className="inner-content">
                        <div className="row">
                            <div className="col-md-6 col-sm-6">
                                <PatientInfoHeader
                                    pat_code            = {props.patientUpdatedData.pat_code}
                                    visit_date          = ''
                                    user_firstname      = {props.patientUpdatedData.user_firstname}
                                    user_lastname       = {props.patientUpdatedData.user_lastname}
                                    country_code_sign   = {configConstants.COUNTRY_CODE_SIGN}
                                    country_code        = {props.patientUpdatedData.user_country_code}
                                    mobile              = {props.patientUpdatedData.user_mobile}
                                    age                 = {props.patientUpdatedData.age}
                                    blood_group         = {props.patientUpdatedData.pat_blood_group_name}
                                    allergy_type_value  = {props.patientUpdatedData.allergy_type_value}
                                    pat_profile_img     = {props.patientUpdatedData.pat_profile_img}
                                />
                            </div>
                            { userInfo.user_type != configConstants.USER_TYPE_PATIENT &&
                                <div className="col-md-6 col-sm-6 text-right">
                                    <a href={process.env.BASENAME+'patientlist'} className="btn text-btn yellow">Patient List</a>
                                    <a href="javascript:void(0)" className="btn text-btn green" onClick={props.patientNewVisitCreate.bind(null,props.patId,props.bookingId)}>New Visit</a>
                                </div>
                            }
                        </div>
                    </div>

                    <div className="inner-content">
                        <div className="row">
                            <div className="col-md-12">
                                <h2 className="checkbox-listing">All visits:</h2>
                                <div className="clearfix"></div>
                                <div className="table-responsive">
                                    <div className="table-wrap">
                                        <div className="table-search">
                                            <input
                                              value={props.filterAll}
                                              onChange={props.patientVisitListSearch}
                                              className="table-search-input"
                                              placeholder="Search"
                                            />
                                        </div>
                                        <ReactTable
                                            noDataText = "No visit found !!"
                                            columns={gridCol}
                                            data = {props.patientVisitList}
                                            defaultPageSize={5}
                                            className="table table-bordered responsive"
                                            defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                                            Sorted
                                            minRows={0}
                                            pages={props.pages}
                                            showPagination={true}
                                            showPaginationTop={true}
                                            showPaginationBottom={false}
                                            pageSizeOptions={[2,5,10,25,50,100]}
                                            manual // Identify Server Side Pagination
                                            filtered={props.filtered}
                                            onFetchData={ (state, instance) => {
                                                props.getPatientVisitList(state.page, state.pageSize, state.sorted, state.filtered)
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
