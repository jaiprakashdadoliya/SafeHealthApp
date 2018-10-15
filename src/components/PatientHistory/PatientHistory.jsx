import React from "react";
import ReactDOM from "react-dom";
import {Timeline, TimelineEvent} from 'react-event-timeline';
import ReactTable from "react-table";
import "react-table/react-table.css";
import moment from 'moment';
import {configConstants} from '../../_constants';
import { fontawesome, FontAwesomeIcon, Loading, PatientInfoHeader } from '../../global';

export const PatientHistory = (props) => {
    return (
      	<div className="main-content">
      		<div className="col-md-12 col-sm-12">
      			<div className="inner-content">
                    <div className="row">
      					<div className="col-md-6 col-sm-6">
			                <div className="patient-info">
			                    <div className="patient-details-wrap">
				                    <div className="patient-name-code">
				                        {props.patientUpdatedData.user_firstname} {props.patientUpdatedData.user_lastname}
				                        <span>Patient code: {props.patientUpdatedData.pat_code}</span></div>
				                        <div className="patient-other-details">
				                           <PatientInfoHeader
				                            pat_code =''
				                            visit_date = ''
				                            country_code_sign = {configConstants.COUNTRY_CODE_SIGN}
				                            country_code ={props.patientUpdatedData.user_country_code}
				                            mobile ={props.patientUpdatedData.user_mobile}
				                            age ={props.patientUpdatedData.age}
				                            blood_group ={props.patientUpdatedData.pat_blood_group_name}
				                            allergy_type_value ={props.patientUpdatedData.allergy_type_value}
				                            pat_profile_img = {props.patientUpdatedData.pat_profile_img}
				                            />
				                        
				                    </div>
			                    </div>
			                </div>
			            </div>
			            <div className="col-md-6 col-sm-6 text-right">
                            <a href="javascript:void(0);" onClick={ () => window.print() } className="btn text-btn green">Print</a>
                        </div>
		            </div>
		        </div>
            </div>
	      	<div className="col-md-12">
	      		<div className="wrap-inner-content">
	      			<Timeline className="patient-timeline">
	      				{
	      					props.patientActivityHistory.length > 0 ? props.patientActivityHistory.map(
				                (activity, index) => {
	      							let title = '';
	      							let diagnosisData 	= '';
	      							let symptomsData 	= '';
	      							let medicationData 	= '';
	      							let vitalsData 		= '';
	      							let clinicalNotesData = '';

	      							if(activity.activity_table == 'patients_visit_diagnosis' && activity.diagnosis_data != undefined){
	      								title = 'Diagnosis';
	      								diagnosisData = <TimelineEvent title={title} createdAt={activity.created_at} >
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
											                    data = {activity.diagnosis_data}
											                    minRows={0}
											                    className="table table-bordered responsive"
											                    showPagination={false}
											                    sortable={false}
											                />
									      				</TimelineEvent>
	      							}else if(activity.activity_table == 'visit_symptoms' && activity.symptoms_data != undefined){
	      								title = 'Present Complaints';
	      								symptomsData = <TimelineEvent title={title} createdAt={activity.created_at} >
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
											                    data = {activity.symptoms_data}
											                    minRows={0}
											                    className="table table-bordered responsive"
											                    showPagination={false}
											                    sortable={false}
											                />
									      				</TimelineEvent>
	      							}else if(activity.activity_table == 'patient_medication_history' && activity.prescribedMedicine_data != undefined){
	      								title = 'Medication';
	      								medicationData = <TimelineEvent title={title} createdAt={activity.created_at} >
										      				{
										      					activity.prescribedMedicine_data.length > 0 ? activity.prescribedMedicine_data.map(medicationData =>{
                        
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
										                                    <div className="col-md-12"><h4>{medicationData.medicine_name} - Tab</h4></div>
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
									      				</TimelineEvent>
	      							}else if(activity.activity_table == 'clinical_notes' && activity.clinicalNotes_data.clinical_notes != undefined){
	      								title = 'Clinical Notes';
	      								clinicalNotesData = <TimelineEvent title={title} createdAt={activity.created_at} >
											      				{ activity.clinicalNotes_data.clinical_notes.map((clinicalNotesData, index) => {
										                                return (
										                                  <li key = {index} >{clinicalNotesData.text}</li>
										                                )
										                            })
										                        }
										      				</TimelineEvent>
	      							}else if(activity.activity_table == 'vitals'){
	      								title = 'Vitals';
	      								vitalsData = <TimelineEvent title={title} createdAt={activity.created_at} >
	      												
							                            <div key={activity.vitals_data[0].physical_fector_id} className="col-md-2 vitalsheading">
							                                Weight (kg)
							                                <div className="col-md-12 rpl">{activity.vitals_data[0].physical_weight != '' ? activity.vitals_data[0].physical_weight : 0}</div>
							                            </div>
							                        
									      				{ activity.vitals_data ? activity.vitals_data.map((vitalsData, index) => {
										                        return(
										                            <div key={vitalsData.vitals_factor_id} className="col-md-2 vitalsheading">
										                                {vitalsData.title}
										                                <div className="col-md-12 rpl">{vitalsData.vitals_factor_value != '' ? vitalsData.vitals_factor_value : 0}</div>
										                            </div>
										                        )
										                    }) : <div className="no-record">Vitals Not Found.</div>
										                }
								      				</TimelineEvent>
	      							}
				                	return (
				                		<div key={index}>						                    
						      				{diagnosisData}
						      				{symptomsData}
						      				{medicationData}
						      				{vitalsData}
						      				{clinicalNotesData}
						      			</div>

					      			)
				                }) : <TimelineEvent title='No Record Found' ></TimelineEvent>
	      				}
	      			</Timeline>
			    </div>
			</div>
		</div>
    );
  
}