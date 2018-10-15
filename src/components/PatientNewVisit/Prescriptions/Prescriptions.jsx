import React from "react";
import {fontawesome, FontAwesomeIcon} from '../../../global';
import {faMobileAlt, faUser, faTint, faPlus } from '@fortawesome/fontawesome-free-solid';

import {FxForm} from '../../../_packages/fx-form';
import {configConstants} from '../../../_constants';
import ReactTable from "react-table";
import "react-table/react-table.css";
import moment from 'moment';
import {MedicationListing} from "../Medications/MedicationListing";

export const Prescriptions = (props) => {
    return (
        <div>                
            <div className="clearfix"></div>
            <div className="col-md-8">
                <h3 className={!props.titleShow ? '' : ''}>Prescriptions</h3>
            </div>
            <div className="col-md-4 text-right">
                <a target="_ild" onClick={props.printPrescription.bind(null,props.patId,props.visitId)} href="javascript:void(0)" className="green btn table-btn">Print</a>
            </div>
            
            <div className="col-md-12">
                {/*<h3>Vitals</h3>*/}
                { props.vitalsFormData ? props.vitalsFormData.fields.map((vitalsData, index) => {
                        return(
                            <div key={vitalsData.name} className="col-md-2">
                                <label>{vitalsData.title}</label>
                                <div className="col-md-12 rpl">{vitalsData.value != '' ? vitalsData.value : 0}</div>
                            </div>
                        )
                    }) : <div className="no-record">Vitals Not Found.</div>
                }
            </div>
            
            { props.clinicalNotesList ?
                <div className="col-md-12">
                    <h4>Clinical Notes</h4>
                    <div className="col-md-12">
                        { props.clinicalNotesList.clinical_notes.map((clinicalNotesData, index) => {
                                return (
                                  <li key = {index} >{clinicalNotesData.text}</li>
                                )
                            })
                        }
                    </div>                        
                </div>
            : '' }

            <div className="col-md-12">
                <h4>Prescription(Rx)</h4>
                {
                    props.patientMedicationData.length > 0 ? props.patientMedicationData.map(medicationData =>{
                        
                        var isDiscontinue = (medicationData.is_discontinued == 1 || medicationData.is_end_date_past == 1) ? 'checked' : ''
                        var isDisabled = medicationData.is_end_date_past == 1 ? true : props.user_type == configConstants.USER_TYPE_PATIENT ? true : false
                        var dose = medicationData.medicine_dose+' '+medicationData.medicine_dose_unitVal
                        dose += ' - '+medicationData.medicine_dose2+' '+medicationData.medicine_dose_unitVal
                        dose += ' - '+medicationData.medicine_dose3+' '+medicationData.medicine_dose_unitVal

                        let classEndDate = 'col-md-2 hide';
                        if(medicationData.medicine_end_date != null && medicationData.medicine_end_date != ''){
                            classEndDate = 'col-md-2 show';
                        }
                        return(
                            <div className="medicine-detail" key={medicationData.pmh_id}>
                                <div className="medicine-detail-heading">
                                    <div className="col-md-12"><h4>{medicationData.medicine_name} - {medicationData.drug_type_name}</h4></div>
                                </div>
                                <div className="medicine-details-inner">
                                    <div className="col-md-2">
                                        {medicationData.medicine_duration} {medicationData.medicine_duration_unitVal}
                                    </div>
                                    <div className="col-md-2">
                                        {dose}
                                    </div>
                                    <div className="col-md-2">
                                        {medicationData.medicine_frequencyVal} 
                                    </div>
                                    <div className="col-md-2">
                                        Start Date: {medicationData.medicine_start_date_formatted}
                                    </div>

                                    <div className="col-md-2">
                                        End Date: {medicationData.medicine_end_date_formatted}
                                    </div>
                                    
                                    <div className="col-md-2">
                                        <i className="fa fa-utensils"></i> {medicationData.medicine_meal_optVal}
                                    </div>
                                    
                                    <div className="col-md-12">
                                        <strong>Instruction</strong>                                    
                                        { medicationData.medicine_instractions.length > 0 ? medicationData.medicine_instractions.map(
                                            (medicineInstractions, index) => {
                                                return (
                                                  <li key = {index} >{medicineInstractions.text}</li>
                                                )
                                            }) : ''
                                        }
                                    </div>
                                    
                                </div>
                            </div>
                        )
                    }) : ''
                }
            </div>

            <div className="col-md-12">                
                <h3 className="heading-prescription-print">Present Complaints</h3> 
                <label className="heading-prescription-print-checkbox">
                    <input className="option-input checkbox" name="is_print_symptoms" type="checkbox" onChange={props.handlePrintSymptomChange}/>
                    <span>Print Complaints</span>
                </label>
                <ReactTable
                    noDataText = "Present Complaints not found !!"
                    columns={[
                        {
                            Header: "Name",
                            headerClassName: 'grid-header',
                            accessor: "symptom_name"
                        },
                        {
                            Header: "Since",
                            accessor: "since_date",
                            className : "dataCellClass",
                            headerClassName: 'grid-header',
                            filterMethod: (filter, row) => {
                                return row[filter.id].includes(filter.value)
                            },
                            Cell: (props) => {return <span>{moment(props.value).format('DD/MM/YYYY')}</span>}
                        },
                        {
                            Header: "Comment",
                            accessor: "comment",
                            headerClassName: 'grid-header',
                            filterMethod: (filter, row) => {
                                return row[filter.id].includes(filter.value)
                            },
                        },
                    ]}
                    data = {props.patientSymptomsData.result}
                    minRows={0}
                    className="table table-bordered responsive"
                    showPagination={false}
                    sortable={false}
                />
            </div>

            <div className="col-md-12">
                <h3 className="heading-prescription-print">Diagnosis</h3>
                <label className="heading-prescription-print-checkbox">
                    <input className="option-input checkbox" name="is_print_diagnosis" type="checkbox" onChange={props.handlePrintSymptomChange}/>
                    <span>Print Diagnosis</span>
                </label>
                <ReactTable
                    noDataText = "Diagnosis not found !!"
                    columns={[
                         {
                            Header: "Disease/Disorder",
                            headerClassName: 'grid-header',
                            accessor: "disease_name",
                        },
                        {
                            Header: "Date of Diagnosis",
                            accessor: "date_of_diagnosis",
                            className : "dataCellClass",
                            headerClassName: 'grid-header',
                            Cell: (props) => {return <span>{moment(props.value).format('DD/MM/YYYY')}</span>}                            
                        }
                    ]}
                    data = {props.patientDiagnosisData}
                    minRows={0}
                    className="table table-bordered responsive"
                    showPagination={false}
                    sortable={false}
                />
            </div>
            <div className="col-md-12">
                <h3 className="heading-prescription-print">Laboratory Test</h3>
                <label className="heading-prescription-print-checkbox">
                    <input className="option-input checkbox" name="is_print_labtest" type="checkbox" onChange={props.handlePrintSymptomChange}/>
                    <span>Print Laboratory Test</span>
                </label>
                <ReactTable
                    noDataText = "Laboratory test not found !!"
                    columns={[
                                {
                                    Header: "Procedure/Test Name",
                                    headerClassName: 'grid-header',
                                    accessor: "lab_report_name",
                                    filterMethod: (filter, row) => {
                                        return row[filter.id].includes(filter.value)
                                    },

                                },
                                {
                                    Header: "Uploaded Date & Time",
                                    accessor: "created_at",
                                    className : "dataCellClass",
                                    headerClassName: 'grid-header',
                                    filterable  : false,
                                    Cell: (props) => {return <span>{moment(props.value).format('DD/MM/YYYY HH:mm:SS')}</span>}
                                },
                                {
                                    Header: "Report File",
                                    headerClassName: 'grid-header-action',
                                    filterable  : false,
                                    Cell: row => (
                                        <div>
                                            {row.original.lab_report_file == null ? 
                                                <div>No file submitted</div> : 
                                                <React.Fragment>
                                                    <a target="_ild" href={configConstants.API_BASE_PATH + 'visit/laboratoryreport/download/'+row.original.lr_id}  className="yellow btn table-btn">Download</a>
                                                    <a target="_ild" href={configConstants.API_BASE_PATH + 'visit/laboratoryreport/view/'+row.original.lr_id+'/view'}  className="green btn table-btn">View</a>
                                                </React.Fragment>
                                            }
                                        </div>
                                    )
                                }
                    ]}
                    data = {props.patientLaboratoryReportData.result}
                    minRows={0}
                    className="table table-bordered responsive"
                    showPagination={false}
                    sortable={false}
                />
            </div>
        </div>
    );
}
