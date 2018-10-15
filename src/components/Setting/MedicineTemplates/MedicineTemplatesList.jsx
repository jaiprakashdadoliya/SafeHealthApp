import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import {fontawesome, FontAwesomeIcon} from '../../../global';
import {faMobileAlt, faUser, faTint, faPlus } from '@fortawesome/fontawesome-free-solid';
import {configConstants} from '../../../_constants';
import {utilityHelper} from '../../../_helpers';
import { Button, Alert, bsStyle,Modal } from 'react-bootstrap';
export const MedicineTemplatesList = (props) => {
    return (
         <div className="table-wrap tabel-responsive col-md-12">
                <div className="table-search">
                Search: <input 
                  value={props.filterAll}
                  onChange={props.templateSearch}
                  className="table-search-input"
                   placeholder="Search"
                />
               </div>
               <div className="text-right"><Button className="btn text-btn green text-right" onClick={props.medicationModalShowHandle.bind(null,'')}><FontAwesomeIcon icon={faPlus} /> Add Template</Button></div>

                <Modal show={props.medicationTemplateModalShow} onHide={props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{props.payload.medicine.template.pat_med_temp_id == '' ? 'Add' : 'Edit' }Template</Modal.Title>
                    </Modal.Header>

                    {props.templateUpdateMSg && 
                        <Alert bsStyle="success">
                           {props.templateUpdateMSg}
                        </Alert>
                    }
                    {props.templateSaveMSg && 
                        <Alert bsStyle="success">
                           {props.templateSaveMSg}
                        </Alert>
                    }
                    <Modal.Body>
                        <div className="row">
                            <div className={props.payload.medicine.validate.temp_name.isValid ? 'form-group col-md-3' : 'form-group has-error col-md-3'}>
                              <input className="form-control" type="text" name="temp_name" id="temp_name" onChange={props.handleChange} value={props.payload.medicine.template.temp_name}/>
                              <label className="control-label">Template Name</label>
                              <span className="help-block">{props.payload.medicine.validate.temp_name.message}</span>
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button className="btn text-btn red" onClick={props.handleClose}>Close</Button>
                        <Button className="btn text-btn green" onClick={props.medicineSaveAsTemplate}>{props.payload.medicine.template.pat_med_temp_id == '' ? 'Save' : 'Update' } Template</Button>
                    </Modal.Footer>
                </Modal>
              <ReactTable
                       noDataText="No Template found !!"
                       data={props.medicineTempList}
                       filterable
                       defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                       filtered={props.filtered}
                       columns={[
                             {  
                                Header      : "Template Name",
                                accessor    : "temp_name",
                                className   : "dataCellClass",
                                filterable  : false,
                                filterMethod: (filter, row) => {
                                  return row[filter.id].includes(filter.value);
                                }
                             },
                             
                             {
                               Header: 'Actions',
                               accessor  : "pat_med_temp_id",
                               filterable  : false,
                               className :"actionCellClass",
                               Cell: row => <div>
                                                    <a href="javascript:void(0);" onClick={props.viewMedicineTemplate.bind(null,row.original)} className="green btn table-btn">View</a>
                                                    <a href="javascript:void(0);" onClick={props.medicationModalShowHandle.bind(null,row.value)} className="green btn table-btn">Edit</a>
                                                    <a href="javascript:void(0)" onClick={props.deleteMedicationRecord.bind(null,row.value)} className="red btn table-btn">Delete</a>
                                                </div>
                              }
                            ]}
                        defaultSorted={[
                            {
                                id: "temp_name",
                                desc: true
                            } 
                        ]}
                        defaultPageSize= {configConstants.PAGE_SIZE}
                        minRows= {props.medicineTempList != undefined ? props.medicineTempList.length : 5}
                        className="table table-bordered responsive"
                        loading={props.loader}
                        filterable
                        Sorted
                        pages={props.pages}
                        showPagination={true}
                        showPaginationTop={true}
                        showPaginationBottom={false}
                        pageSizeOptions={[10,20,50,100]}
                        manual // For server side pagination
                        onFetchData={(state, instance) => {
                            props.getMedicineTemplate(state.page, state.pageSize, state.sorted, state.filtered);
                        }}
                     />


            </div>
    );
}
