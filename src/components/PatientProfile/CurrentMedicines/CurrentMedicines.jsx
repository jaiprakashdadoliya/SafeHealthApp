import React from "react";
import {fontawesome, FontAwesomeIcon} from '../../../global';
import {faMobileAlt, faUser, faTint, faIdCard } from '@fortawesome/fontawesome-free-solid';
import ReactTable from "react-table";
import "react-table/react-table.css";

export const CurrentMedicines = (props) => {
    return (
        <div className="col-md-12">
            <div className="box current-medication-container">
                <div className="box-header">
                    <h3 className="col-md-6 col-sm-6 col-xs-6">Medications</h3>
                    <div className="col-md-6 col-sm-6 col-xs-6 text-right"><i className="fa fa-2x fa-arrows-alt-v"></i></div>
                </div>
                <div className="table-responsive">
                    <div className="table-wrap">
                        <ReactTable
                            noDataText = "No medication found !!"
                            columns={[
                                {
                                    Header: "Medicine Name",
                                    headerClassName: 'grid-header',
                                    accessor: "medicine_name",
                                    filterMethod: (filter, row) => {
                                        return row[filter.id].includes(filter.value);
                                    },
                                },
                                {
                                    Header: "Start Date",
                                    headerClassName: 'grid-header',
                                    accessor: "medicine_start_date_formatted",
                                    filterable  : false,
                                    sortable: false,
                                },
                                {
                                    Header: "End Date",
                                    headerClassName: 'grid-header',
                                    accessor: "medicine_end_date_formatted",
                                    filterable  : false,
                                    sortable: false,
                                },
                                {
                                    Header: "Dose",
                                    accessor: "current_medicine_dose",
                                    className : "dataCellClass",
                                    headerClassName: 'grid-header',
                                    filterable  : false,
                                    sortable: false,
                                },
                            ]}
                            data = {props.patientMedicationList.result}
                            defaultPageSize={5}
                            minRows={0}
                            className="table table-bordered responsive"
                            defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                            filtered={props.filtered}
                            Sorted
                            pages={props.patientMedicationList.pages}
                            showPagination={true}
                            showPaginationTop={true}
                            showPaginationBottom={false}
                            pageSizeOptions={[5,10,25,50,100]}
                            manual // Identify Server Side Pagination
                            onFetchData={ (state, instance) => {
                                props.getPatientMedicationList(state.page, state.pageSize, state.sorted, state.filtered)
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );

}
