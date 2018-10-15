import React from "react";
import {fontawesome, FontAwesomeIcon} from '../../../global';
import {configConstants} from '../../../_constants';
import {faMobileAlt, faUser, faTint, faPlus } from '@fortawesome/fontawesome-free-solid';

import {NewMedicationModalContainer} from "./NewMedicationModal";

import {MedicationListing} from "./MedicationListing";
import { Button, Alert, bsStyle,Modal } from 'react-bootstrap';
import Select from 'react-select';
import {utilityHelper} from '../../../_helpers';
  
export const MedicineTemplates = (props) => {
    return (
        <div>
            <NewMedicationModalContainer
                newMedicationModalShow        = {props.payload.newMedicationModalShow}
                medicationEditData            = {props.payload.medicationEditData}
                newMedicationModalHideHandle  = {props.newMedicationModalHideHandle}
                medicineListData              = {props.medicineList}
                submitMedicationData          = {props.submitMedicationData}
                getMedicineDataByMedicine     = {props.getMedicineDataByMedicine}
                successMsg                    = {props.successMsg}
                errorMsg                      = {props.errorMsg}
                sendingRequest                = {props.sendingRequest}
                isEditSuccess                 = {props.isEditSuccess}
                patientid                     = {props.patientid}  
                visitId                       = {props.visitId}  
                medicineData                  = {props.medicineData} 
                medicationFormData            = {props.medicationFormData} 
            />
            <div className="clearfix"></div>

            <div className="row form-group">

                { props.templateSaveMSg &&
                    <Alert bsStyle="success">
                       {props.templateSaveMSg}
                    </Alert>
                }
                
                { props.errorMsg &&
                    <Alert bsStyle="danger">
                       {props.errorMsg}
                    </Alert>
                }
             </div>
                <div className="row">
                    <div className="col-md-9"><h3>{props.templatePayload.temp_name}</h3></div>
                    {props.user_type != configConstants.USER_TYPE_PATIENT ? 
                        <div className="text-right col-md-3">
                            <Button className="btn text-btn green text-right" onClick={props.newMedicationModalShowHandle}><FontAwesomeIcon icon={faPlus} /> Add Medicine</Button>
                            <Button className="btn text-btn red text-right" onClick={props.loadTemplateList}> Back</Button>
                        </div>
                    : ''
                    }
                </div>
                <hr/>
                {
                    props.patientMedicationData.length > 0 ?
                    <div>
                        <MedicationListing 
                            patientMedicationData         = {props.patientMedicationData}
                            newMedicationModalShowHandle  = {props.newMedicationModalShowHandle}
                            deleteMedicationRecord        = {props.deleteMedicationRecord}
                            discontinueMedicationRecord   = {props.discontinueMedicationRecord}
                            user_type                     = {props.user_type}
                        />
                    </div> : 
                    <div className="text-center"><h4>No medicines found in this template.</h4></div>
                }
            <div className="clearfix"></div>
       
    </div>
    );
}
