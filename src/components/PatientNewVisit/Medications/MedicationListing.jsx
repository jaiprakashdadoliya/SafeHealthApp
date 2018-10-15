import React from "react";
import {fontawesome, FontAwesomeIcon} from '../../../global';
import {faMobileAlt, faUser, faTint, faPlus } from '@fortawesome/fontawesome-free-solid';
import {configConstants} from '../../../_constants';

export const MedicationListing = (props) => {
    return (
        <div>
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
                                <div className="col-md-6"><h4>{medicationData.medicine_name} - {medicationData.drug_type_name}</h4></div>
                                <div className="col-md-6 text-right">
                                    
                                    <div className={props.user_type != configConstants.USER_TYPE_PATIENT ? "header-action" : "header-action hide" } >
                                        <a className="btn table-btn green" onClick={props.newMedicationModalShowHandle.bind(null, medicationData)} href="javascript:void(0)">Edit</a>
                                        <a className="btn table-btn red" href="javascript:void(0)" onClick={props.deleteMedicationRecord.bind(null, medicationData.pmh_id)}>Delete</a>
                                    </div>
                                    
                                    <div className="discontinue-option">
                                        <label><input type="checkbox" className="option-input checkbox multiple-checkbox" onClick={props.discontinueMedicationRecord.bind(null, medicationData.pmh_id)} checked={isDiscontinue} disabled={isDisabled}/><span>Discontinue</span></label>
                                    </div>
                                </div>
                            </div>
                            <div className="medicine-details-inner">
                                <div className="col-md-2">
                                    {medicationData.medicine_duration} {medicationData.medicine_duration_unitVal}
                                </div>
                                <div className="col-md-2">
                                    {dose}
                                </div>
                                {/*<div className="col-md-2">
                                    {medicationData.medicine_frequencyVal} 
                                </div>*/}
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
    );
}
