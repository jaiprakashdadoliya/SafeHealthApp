import React from "react";
import {fontawesome, FontAwesomeIcon} from '../../../global';
import {configConstants} from '../../../_constants';
import {faMobileAlt, faUser, faTint, faPlus, faPrescription } from '@fortawesome/fontawesome-free-solid';
import { Scrollbars } from 'react-custom-scrollbars';
import {NewMedicationModalContainer} from "./NewMedicationModal";
import { Tab, Row, Col, Nav, NavItem } from 'react-bootstrap';
import {MedicationListing} from "./MedicationListing";
import {MedicineChartModal} from "./MedicineChartModal";
import {MedicinePrescriptionModal} from "./MedicinePrescriptionModal";
import {AddMedicineModal} from "./AddMedicineModal";
import { Alert } from 'react-bootstrap';
import Select from 'react-select';
import ReactAutocomplete from 'react-autocomplete';
import {utilityHelper} from '../../../_helpers';
import {FxForm} from '../../../_packages/fx-form';

import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import { WithContext as ReactTags } from 'react-tag-input';

export const Medications = (props) => {
    const durationOptions = [
            { value: '1', label: 'Day(s)' },
            { value: '2', label: 'Week(s)' },
            { value: '3', label: 'Month(s)' }
        ];

    const drugTypeOptionData = props.drugType != '' && props.drugType != undefined ? utilityHelper.getDataConvertToOptionType(props.drugType,'drug_type_name','drug_type_id') : [];

    return (
        <div>
            <NewMedicationModalContainer
                newMedicationModalShow        = {props.payload.newMedicationModalShow}
                medicationEditData            = {props.payload.medicationEditData}
                newMedicationModalHideHandle  = {props.newMedicationModalHideHandle}
                medicineListData              = {props.medicineList}
                submitMedicationData          = {props.submitMedicationData}
                getMedicineDataByMedicine     = {props.getMedicineDataByMedicine}
                searchMedicine                = {props.searchMedicine}
                successMsg                    = {props.successMsg}
                errorMsg                      = {props.errorMsg}
                sendingRequest                = {props.sendingRequest}
                isUpdateDone                  = {props.isUpdateDone}  
                isEditSuccess                 = {props.isEditSuccess}
                patientid                     = {props.patientid}  
                visitId                       = {props.visitId}  
                medicineData                  = {props.medicineData}  
                medicineDataBySearch          = {props.medicineDataBySearch}  
                isSearchDone                  = {props.isSearchDone}  
                medicineDoseData              = {props.medicineDoseData}  
                isUnitFetched                 = {props.isUnitFetched}
                dose_unit                     = {props.dose_unit}
            />
            
            <MedicineChartModal 
                medicationChartModalShow      = {props.payload.medicationChartModalShow}
                medicineChartModalHideHandle  = {props.medicineChartModalHideHandle}
                filterAll                     = { props.filterAll }
                filtered                      = { props.filtered }
                patientChartMedicineSearch    = { props.patientChartMedicineSearch }
                getChartMedicineList          = { props.getChartMedicineList }
                pages                         = { props.pages }
                chartMedicineList             = { props.chartMedicineList }
            />

            <MedicinePrescriptionModal 
                medicineViewPrescriptionModalShow  = {props.payload.medicationViewPrescriptionModalShow}
                medicineViewPrescriptionModalHide  = {props.medicineViewPrescriptionModalHideHandle}
                visitId                            = {props.visitId}  
                patId                              = {props.patientid}  
            />

            <AddMedicineModal
                addMedicineModalShow    = {props.payload.addMedicineModalShow}
                addMedicineModalHide    = {props.addMedicineModalHideHandle}
                visitId                 = {props.visitId}  
                patId                   = {props.patientid} 
                handleBoundFormUpdate   = {props.handleBoundFormUpdate}
                handleAddMedicineSubmit = {props.handleAddMedicineSubmit}
                formConfig              = {props.formConfig}
                isInsertDone            = {props.isInsertDone}
                successMsg              = {props.successMsg}
            />

            <div className="clearfix"></div>
            <div className="row">
                <div className="col-md-12">
                    <h3 className="col-md-2">Medications</h3>
                    {/*
                    <div className="col-md-2">
                        {props.user_type != configConstants.USER_TYPE_PATIENT ? 
                        <div className="add-new-medicine" onClick={props.newMedicationModalShowHandle} >
                            <div className="replace-file">
                                <span className="add-icon">
                                    <FontAwesomeIcon icon={faPlus} />
                                </span> Add Medicine
                            </div>
                        </div> : ''
                        }
                    </div>
                    */}
                    <div className="col-md-6"></div>
                    <div className="col-md-4 text-right">
                        <button className="btn text-btn green medicine-chart" onClick={props.medicineChartModalShowHandle} >Patient Medicine Chart</button>
                        <button className="btn text-btn green" onClick={props.medicineViewPrescriptionModalShowHandle} > Print </button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-8">
                </div>
              
                <div className="col-md-9">
                    { props.templateSaveMSg &&
                        <Alert bsStyle="success">
                           {props.templateSaveMSg}
                        </Alert>
                    }

                    { props.successMsg && props.isInsertDone &&
                        <Alert bsStyle="success">
                           {props.templateSaveMSg}
                        </Alert>
                    }

                    { props.errorMsg && !props.isInsertDone &&
                        <Alert bsStyle="danger">
                           {props.errorMsg}
                        </Alert>
                    }
                </div>
            </div>
            

            <div className={props.user_type == configConstants.USER_TYPE_DOCTOR ? "col-md-9" : "col-md-12"}>
                {props.tempData.length > 0 && 
                    <React.Fragment>
                        <div className="text-right">
                            <button className="btn text-btn green btn btn-default" onClick={props.submitMedicationRecord} >Save</button>
                        </div>
                    </ React.Fragment>
                }

                { props.tempData.length > 0 ? props.tempData.map(
                    (data, index) => {
                        return(
                            <div key={index} className="add-medicine-box">
                                <div className="col-md-12 text-right rpr">
                                    <button className="btn text-btn red" onClick={ props.removedMedicineBoxFromState.bind(null, index) }>Remove</button>
                                </div>
                                <div className="col-md-2 col-xs-4">
                                    <div className='form-group'>
                                        <input key={"medicine_name_"+index} type="text" name="medicine_name" className="form-control" value={props.medicineStateData[index]['medicine_name']} onChange={(value, name, pos) => props.handleInputChange(value, 'medicine_name', index)} />
                                        <label className="control-label">Medicine Name</label>
                                        <span className="help-block"></span>
                                    </div>
                                </div>
                                
                                <div className="col-md-2 col-xs-4">
                                    <div className="form-group autocomplete-input">
                                        <ReactAutocomplete
                                            className="form-control"
                                            items={drugTypeOptionData}
                                            shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                            getItemValue={item => item.label+'__'+item.value}
                                            renderItem={(item, highlighted) =>
                                              <div
                                                key={item.value}
                                                style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
                                              >
                                                {item.label}
                                              </div>
                                            }
                                            name="medicine_type"
                                            
                                            value={props.medicineStateData[index]['medicine_type']}
                                            onSelect={(value, name, pos) => props.handleSelectAutocomplete(value, 'medicine_type', index)}
                                            onChange={(value, name, pos) => props.handleChangeAutocomplete(value, 'medicine_type', index)}
                                            
                                          />
                                        <label className="control-label">Medicine Type</label>
                                    </div>
                                </div>
                            
                                <div className="col-md-2 col-xs-4">
                                    <div className="form-group">
                                        <input type="text" name="medicine_duration" className="form-control" value={props.medicineStateData[index]['medicine_duration']}  onChange={(value, name, pos) => props.handleInputChange(value, 'medicine_duration', index)} />
                                        <label className="control-label">Duration</label>
                                    </div>
                                </div>

                                <div className="col-md-2 col-xs-4">
                                    <div className="form-group">
                                        <Select
                                            className   = "custom-select"
                                            name        = "medicine_duration_unit" 
                                            value       = {props.medicineStateData[index]['medicine_duration_unit']}
                                            clearable   = {false}
                                            onChange    = {(value, name, pos) => props.handleDropDownSelectChange(value, 'medicine_duration_unit', index)}
                                            options     = {durationOptions}
                                        />
                                        <label className="control-label">Duration Unit</label>
                                    </div>
                                </div>

                                <div className="col-md-2 col-xs-4">
                                    <div className="form-group">
                                        <input type="text" name="medicine_dose" className="form-control" value={props.medicineStateData[index]['medicine_dose']}  onChange={(value, name, pos) => props.handleInputChange(value, 'medicine_dose', index)}/>
                                        <label className="control-label">Qty (Morning)</label>
                                    </div>
                                </div>

                                <div className="col-md-2 col-xs-4">
                                    <div className="form-group">
                                        <input type="text" name="medicine_dose2" className="form-control" value={props.medicineStateData[index]['medicine_dose2']}  onChange={(value, name, pos) => props.handleInputChange(value, 'medicine_dose2', index)}/>
                                        <label className="control-label">Qty (Afternoon)</label>
                                    </div>
                                </div>
                                <div className="clearfix"></div>

                                <div className="col-md-2 col-xs-4">
                                    <div className="form-group">
                                        <input type="text" name="medicine_dose3" className="form-control" value={props.medicineStateData[index]['medicine_dose3']}  onChange={(value, name, pos) => props.handleInputChange(value, 'medicine_dose3', index)}/>
                                        <label className="control-label">Qty (Night)</label>
                                    </div>
                                </div>

                                <div className="col-md-2 col-xs-4">
                                    <div className="form-group">
                                        <Select
                                            className   = "custom-select"
                                            name        = "medicine_dose_unit" 
                                            value       = {props.medicineStateData[index]['medicine_dose_unit']}
                                            clearable   = {false}
                                            onChange    = {(value, name, pos) => props.handleDropDownSelectChange(value, 'medicine_dose_unit', index)}
                                            options     = {utilityHelper.getDataConvertToOptionType(props.dose_unit,'drug_dose_unit_name','drug_dose_unit_id')}
                                        />
                                        <label className="control-label">Unit</label>
                                        <span className="help-block"></span>
                                    </div>
                                </div>

                                <div className="col-md-2 col-xs-4">
                                    <div className="form-group">
                                        <CheckboxGroup
                                            checkboxDepth={2} 
                                            name="medicine_meal_opt"
                                            value={props.medicineStateData[index]['medicine_meal_opt']}
                                            
                                            onChange={props.onCheckBoxChanged.bind(this, 'medicine_meal_opt', index)} 
                                        >
                                            <label key="1"><Checkbox className="option-input checkbox" value="1" /><span>Before Meal</span></label>
                                            <label key="2"><Checkbox className="option-input checkbox" value="2" /><span>After Meal</span></label>
                                        </CheckboxGroup>
                                    </div>
                                </div>

                                <div className="col-md-6 col-xs-12">
                                    <label className="control-label">Instructions</label>
                                    <div className="form-group">
                                        <input type="text" name="medicine_instractions" className="form-control" value={props.medicineStateData[index]['medicine_instractions']}  onChange={(value, name, pos) => props.handleInputChange(value, 'medicine_instractions', index)} placeholder="Add Instructions comma separated" />
                                    </div>
                                </div>
                                <div className="clearfix"></div>

                            </div>
                        )
                    }) 
                    : ''
                }

                <MedicationListing 
                    patientMedicationData         = {props.patientMedicationData}
                    newMedicationModalShowHandle  = {props.newMedicationModalShowHandle}
                    deleteMedicationRecord        = {props.deleteMedicationRecord}
                    discontinueMedicationRecord   = {props.discontinueMedicationRecord}
                    user_type                     = {props.user_type}
                />
            </div>
            {props.user_type == configConstants.USER_TYPE_DOCTOR &&
            <div className="col-md-3">
                <Tab.Container id="left-tabs" defaultActiveKey={1} onSelect={props.handleTabSelect}>
                <Row className="clearfix">
                    <Col className="visit-tabs rrp patient-medical-profile">
                        <Nav className="nav nav-tabs tabs-left" stacked>
                            <NavItem eventKey={1}>Drugs</NavItem>
                            <NavItem eventKey={2}>Templates</NavItem>
                        </Nav>                            
                    </Col>
                    <Col className="visit-tabs-contents rlp patient-medical-profile">
                        <Scrollbars className="tabscroll" style={{height:350}}>
                            <Tab.Content className="left-tabs drugListTabs" animation>
                                <Tab.Pane eventKey={1}>
                                <div className="search row">
                                    <div className="col-md-9 col-xs-9"><input type="text" placeholder="Search Drugs" onChange={props.searchMedicine}/></div>
                                    <div className="col-md-3 col-xs-3 rpl"><button className="btn text-btn green pull-right" onClick={props.addMedicineModalShowHandle.bind(null, '')} >+ Add</button></div>
                                </div>
                                <ul className="drugList">
                                    {props.medicineDataBySearch.map((medicine, index) =>{
                                        return (
                                            <li key={index} className='medicine-search' onClick={props.addMedicineModalShowHandle.bind(null, medicine)}>{medicine.medicine_name}
                                            </li>
                                        )
                                        })
                                    }
                                </ul>
                                </Tab.Pane>
                                <Tab.Pane eventKey={2}>
                                    <div className="search row">
                                        <div className="col-md-9 col-xs-9"><input type="text" placeholder="Search Templates" /></div>
                                        <div className="col-md-3 col-xs-3 rpl"><button className="btn text-btn green pull-right" >+ Add</button></div>
                                    </div>
                                    <ul className="drugList">
                                        {props.medicineTempList.map((templates, index) =>{
                                            return (<li key={index} className='medicine-search' onClick={ (value, name) => props.handleSelectChange(templates.pat_med_temp_id, 'template_select')}>{templates.temp_name}</li>)
                                            })
                                        }
                                    </ul>
                                </Tab.Pane>
                             </Tab.Content>
                        </Scrollbars>
                    </Col>
                </Row>
                </Tab.Container>
            </div>
        }
            <div className="clearfix"></div>
        </div>
    );
}
