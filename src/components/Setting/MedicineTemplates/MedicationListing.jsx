import React from "react";
import {fontawesome, FontAwesomeIcon} from '../../../global';
import {faMobileAlt, faUser, faTint, faPlus } from '@fortawesome/fontawesome-free-solid';
import {configConstants} from '../../../_constants';
import {utilityHelper} from '../../../_helpers';
export const MedicationListing = (props) => {
    return (
        <div>
            {
                props.patientMedicationData.length > 0 ? props.patientMedicationData.map((medicationData,index) =>{
                    var morning = (medicationData.medicine_dose != undefined && medicationData.medicine_dose != '' ? medicationData.medicine_dose : 0);
                    var afternoon = (medicationData.medicine_dose2 != undefined && medicationData.medicine_dose3 != '' ? medicationData.medicine_dose2 : 0);
                    var night = (medicationData.medicine_dose3 != undefined && medicationData.medicine_dose4 != '' ? medicationData.medicine_dose3 : 0);
                    
                    var dose = morning+' '+medicationData.medicine_dose_unitVal
                    dose += ' - '+afternoon+' '+medicationData.medicine_dose_unitVal
                    dose += ' - '+night+' '+medicationData.medicine_dose_unitVal
                    return(
                        <div className="medicine-detail" key={index}>
                            <div className="medicine-detail-heading">
                                <div className="col-md-6"><h4>{medicationData.medicine_name} - Tab</h4></div>
                                <div className="col-md-6 text-right">
                                    
                                    <div className={props.user_type != configConstants.USER_TYPE_PATIENT ? "header-action" : "header-action hide" } >
                                        <a className="btn table-btn red" href="javascript:void(0)" onClick={props.deleteMedicationRecord.bind(null, medicationData.medicine_id)}>Delete</a>
                                    </div>
                                </div>
                            </div>
                            <div className="medicine-details-inner">
                                <div className="col-md-2">
                                    {medicationData.medicine_duration} {utilityHelper.getMedicineDurationUnit(medicationData.medicine_duration_unit)}
                                </div>
                                <div className="col-md-2">
                                    {dose}
                                </div>
                                <div className="col-md-2">
                                    <i className="fa fa-utensils"></i> {utilityHelper.getMedicineMealOpt(medicationData.medicine_meal_opt[0])}
                                </div>
                                
                                <div className="col-md-12">
                                    <strong>Instruction</strong>                                    
                                    { medicationData.medicine_instractions.length > 0 ? medicationData.medicine_instractions.map(
                                        (medicineInstractions, innerIndex) => {
                                            return (
                                              <li key = {innerIndex} >{medicineInstractions.text}</li>
                                            )
                                        }) : ''
                                    }
                                </div>
                                
                            </div>
                        </div>
                    )
                }) : <div> Record not found. </div>
            }
        </div>
    );
}
