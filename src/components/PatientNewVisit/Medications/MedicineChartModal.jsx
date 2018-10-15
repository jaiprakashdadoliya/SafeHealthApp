import React from "react";
import {Button, Alert, bsStyle,Modal} from 'react-bootstrap';
import { utilityHelper } from '../../../_helpers';
import ReactTable from "react-table";
import "react-table/react-table.css";

export const MedicineChartModal = (props) => {
    return (
        <div>
            <Modal show={props.medicationChartModalShow} onHide={props.medicineChartModalHideHandle}>
                <Modal.Header closeButton>
                    <Modal.Title>Medicine Chart</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="row medicine-chart-container">
                        
                        <ReactTable
                            noDataText = "No current medication found !!"
                            columns={[
                                {
                                    Header: "Medicine Name",
                                    headerClassName: 'grid-header',
                                    accessor: "medicine_name",
                                    filterMethod: (filter, row) => {
                                        return row[filter.id].includes(filter.value);
                                    },
                                    width: 150
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
                                }
                            ]}
                            data = {props.chartMedicineList.result}
                            defaultPageSize={10}
                            minRows={0}
                            className="table table-bordered responsive"
                            defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                            filtered={props.filtered}
                            Sorted
                            pages={props.chartMedicineList.pages}
                            showPagination={true}
                            showPaginationTop={true}
                            showPaginationBottom={false}
                            pageSizeOptions={[5,10,25,50,100]}
                            manual // Identify Server Side Pagination
                            onFetchData={ (state, instance) => {
                                props.getChartMedicineList(state.page, state.pageSize, state.sorted, state.filtered)
                            }}
                        />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button className="btn text-btn red" onClick={props.medicineChartModalHideHandle}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
