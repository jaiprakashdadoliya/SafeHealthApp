import React from "react";
import { connect } from 'react-redux';
import Loadable from 'react-loadable'; 
import { Loading } from '../../../global';
import { medicationActions } from './medicationActions';
import { utilityHelper } from '../../../_helpers';
import { headerActions } from '../../../_actions';
import { patientDashboardProfileAction } from '../../PatientProfile/patientDashboardProfileAction';
import { confirmAlert } from 'react-confirm-alert';
import validator from 'validator';
import formConfig from '../../Setting/ManageDrugs/ManageDrugsConfig';
import {manageDrugsActions} from '../../Setting/ManageDrugs/manageDrugsActions';

const Medications = Loadable({
    loader: () => import('./Medications' /* webpackChunkName = "Medications" */).then(object => object.Medications),
    loading: Loading
});

class MedicationsContainer extends React.Component {
	constructor(props){
		super(props);

        this.newMedicationModalShowHandle = this.newMedicationModalShowHandle.bind(this);
        this.newMedicationModalHideHandle = this.newMedicationModalHideHandle.bind(this);
        this.medicineChartModalShowHandle = this.medicineChartModalShowHandle.bind(this);
        this.medicineChartModalHideHandle = this.medicineChartModalHideHandle.bind(this);
        this.submitMedicationData         = this.submitMedicationData.bind(this);
        this.getMedicineDataByMedicine    = this.getMedicineDataByMedicine.bind(this);
        this.searchMedicine               = this.searchMedicine.bind(this);
        this.deleteMedicationRecord       = this.deleteMedicationRecord.bind(this);
        this.discontinueMedicationRecord  = this.discontinueMedicationRecord.bind(this);
        this.patientChartMedicineSearch   = this.patientChartMedicineSearch.bind(this);
        this.getChartMedicineList         = this.getChartMedicineList.bind(this);
        this.medicineSaveAsTemplate       = this.medicineSaveAsTemplate.bind(this);
        this.isTemplateValid              = this.isTemplateValid.bind(this);
        this.handleChange                 = this.handleChange.bind(this);
        this.handleSelectChange           = this.handleSelectChange.bind(this);
        this.addMedicineModalShowHandle   = this.addMedicineModalShowHandle.bind(this);
        this.addMedicineModalHideHandle   = this.addMedicineModalHideHandle.bind(this);
        this.medicineViewPrescriptionModalShowHandle = this.medicineViewPrescriptionModalShowHandle.bind(this);
        this.medicineViewPrescriptionModalHideHandle = this.medicineViewPrescriptionModalHideHandle.bind(this);
        this.boundFormAddMedicine         = undefined;
        this.handleBoundFormUpdate        = this.handleBoundFormUpdate.bind(this);
        this.handleAddMedicineSubmit      = this.handleAddMedicineSubmit.bind(this);

        // NEW ADD MEDICINE DATA 
        this.removedMedicineBoxFromState  = this.removedMedicineBoxFromState.bind(this);
        this.handleInputChange            = this.handleInputChange.bind(this);
        this.handleDropDownSelectChange   = this.handleDropDownSelectChange.bind(this);
        this.onCheckBoxChanged            = this.onCheckBoxChanged.bind(this);
        this.submitMedicationRecord       = this.submitMedicationRecord.bind(this);
        this.handleSelectAutocomplete     = this.handleSelectAutocomplete.bind(this);
        this.handleChangeAutocomplete     = this.handleChangeAutocomplete.bind(this);
        this.isTemplateDataLoad           = true;

        this.state = {
            newMedicationModalShow  : false,
            medicationChartModalShow: false,
            medicationEditData      : [],
            pages                   : 0,
            filtered                : [],
            filterAll               : '',
            medicine                : this.initialState,
            formConfig              : formConfig,
            tempMedicineArr         : [],
        };
	}

    get initialState(){
        return {
                template:{
                    temp_name:'',
                    template_select:''
                },
                validate:{
                    temp_name:{
                        isValid:true,
                        message:''
                    }
                }
            }
    }

    /*********** Medicine to State **************/
    removedMedicineBoxFromState(index){
        this.state.tempMedicineArr.splice(index, 1);

        this.setState(
          this.state
        );
    }

    /**
     * @DateOfCreation        28 Sept 2018
     * @ShortDescription      This function is responsible to handle changes in input state
     * @param                 Event Object
     * @return                Nothing
     */
    handleInputChange(that, name, index) {
        let value = that.target.value;
        
        this.state.tempMedicineArr[index][name] = value;

        this.setState(
            this.state
        );    
    }

    /**
     * @DateOfCreation        28 Sept 2018
     * @ShortDescription      This function is responsible to handle changes in Select state
     * @param                 Event Object
     * @return                Nothing
     */
    handleDropDownSelectChange(selectedOption, name, index) {

        let value = selectedOption.value;

        this.state.tempMedicineArr[index][name] = value;

        this.setState(
            this.state
        );  
    }

    /**
     * @DateOfCreation        28 Sept 2018
     * @ShortDescription      This function is responsible to handle changes in checkbox state
     * @param                 Event Object
     * @return                Nothing
     */
    onCheckBoxChanged(name, index, event) {
        let initialValue = this.state.tempMedicineArr[index][name];
        let value = utilityHelper.getArrayDifference(initialValue, event);

        this.state.tempMedicineArr[index][name] = value;

        this.setState(
            this.state
        );  
    }

    /**
     * @DateOfCreation        1 Oct 2018
     * @ShortDescription      This function is responsible to set values from auto-complete  
     * @param                 Nothing
     * @return                Nothing
     */
    handleSelectAutocomplete(value, name, index) {
        let dataValue = '';
        dataValue = value.split('__');

        this.state.tempMedicineArr[index][name] = dataValue[0];
        this.state.tempMedicineArr[index][name+'_id'] = dataValue[1];
        
        this.setState(
            this.state
        );
    }

    /**
     * @DateOfCreation        1 Oct 2018
     * @ShortDescription      This function is responsible to handle change event on auto-complete  
     * @param                 Nothing
     * @return                Nothing
     */
    handleChangeAutocomplete(event, name, index) {
        const { value } = event.target;   

        this.state.tempMedicineArr[index][name] = value;
        this.state.tempMedicineArr[index][name+'_id'] = '';
        this.setState(
            this.state
        );   
    }

    /**
    * @DateOfCreation        25 Sept 2018
    * @ShortDescription      This function is responsible to handle show medicine prescription pop-up
    * @return                Redirect
    */
    addMedicineModalShowHandle(medicationData) {

        const {dispatch}        = this.props;
        dispatch(manageDrugsActions.getOptionlist());
        this.optionLoad         = true;
        
        let tempArray = [];
        tempArray['medicine_dose']          = (medicationData.medicine_dose != '' && medicationData.medicine_dose != undefined) ? medicationData.medicine_dose : '';
        tempArray['medicine_dose2']         = '';
        tempArray['medicine_dose3']         = '';
        tempArray['medicine_dose_unit']     = (medicationData.drug_dose_unit_id != '' && medicationData.drug_dose_unit_id != undefined) ? medicationData.drug_dose_unit_id : '';
        tempArray['medicine_instractions']  = '';
        tempArray['medicine_meal_opt']      = [];
        tempArray['medicine_name']          = (medicationData.medicine_name != '' && medicationData.medicine_name != undefined) ? medicationData.medicine_name : '';
        tempArray['medicine_type']          = (medicationData.drug_type_name != '' && medicationData.drug_type_name != undefined) ? medicationData.drug_type_name : '';
        tempArray['medicine_type_id']       = (medicationData.drug_type_id != '' && medicationData.drug_type_id != undefined) ? medicationData.drug_type_id : '';
        tempArray['medicine_id']            = (medicationData.medicine_id != '' && medicationData.medicine_id != undefined) ? medicationData.medicine_id : '';
        
        this.state.tempMedicineArr.push(tempArray)
        
        this.setState(
          this.state
        );
    } 

    /**
     * @DateOfCreation        31 May 2018
     * @ShortDescription      This function is responsible to handle show medication add/edit pop-up
     * @return                Redirect
     */
    newMedicationModalShowHandle(medicationData, medicineId, medicineName) {
        let medData = [];
        if(medicationData != ''){
            medData = medicationData;
        }

        if(typeof medicineId != 'object'){
            medData.medicine_name    = medicineName;
            medData.medicine_id      = medicineId;
            medData.prev_medicine_id = medicineId;

            this.getMedicineDataByMedicine(medicineId);
        }
        
        this.setState({ 
            medicationEditData : medData,
            newMedicationModalShow: true,

        });
    } 

    /**
     * @DateOfCreation        28 Sept 2018
     * @ShortDescription      This function is responsible to submit medicine record with temp state
     * @return                Nothing
     */
    submitMedicationRecord(){
        const { dispatch } = this.props;
        let submittedData = this.state.tempMedicineArr;
       
        let extraData               = {};
        extraData['pat_id']         = this.props.patId;
        extraData['visit_id']       = this.props.visitId;
        
        let tempDataObj = {}
        for (var i = 0, ii = submittedData.length; i < ii; ++i) {
            var input = submittedData[i];
            tempDataObj[i] = JSON.stringify(utilityHelper.mergeMultipleObject([submittedData[i]]));
        }
        extraData['data_array'] = tempDataObj; 
        
        dispatch(medicationActions.newMedicationMultipleSubmit(extraData));
    }

    /************* Medicine to state END *************/

    isTemplateValid() {
        const { template, validate, medicine } = this.state.medicine;
        const validationState = {};
        if (validator.isEmpty(validator.trim(template.temp_name))) {
          validationState.temp_name = {
                isValid: false,
                message: 'Template name is required.'
            }
        }
         if(!utilityHelper.isObjectEmpty(validationState)){
            this.setState({
                medicine: {
                    template: {
                        ...template
                    },
                    validate:{
                        ...validate,
                        ...validationState
                    }
                }
            });
            return false;
        }else{
            return true;
        }
    }

    /**
     * @DateOfCreation        22 May 2018
     * @ShortDescription      This function is responsible to set state for onchange on view page
     *                        so we can type in form.
     * @return                Nothing
     */
    handleChange(event) { 
        const { name, value } = event.target;
        const { template, validate, medicine } = this.state.medicine;
        this.setState({
            medicine: {
                validate:{
                    ...validate,
                    [name]: {
                        isValid: true,
                        message: ''
                    }
                },
                template: {
                    ...template,
                    [name]: value
                }
            }
        });
    }

    /**
     * @DateOfCreation        24 May 2018
     * @ShortDescription      This function is responsible to handle changes in Select state
     * @param                 Event Object
     * @return                Nothing
     */
    handleSelectChange(value, template_select) {
        const { template, validate, medicine } = this.state.medicine;
        this.setState({
            medicine: {
                validate:{
                    ...validate,
                },
                template: {
                    ...template,
                    [template_select]: value
                }
            }
        },function(){
            const { dispatch,visitId,patId }  = this.props;
            var selectData = {'pat_med_temp_id':this.state.medicine.template.template_select, 'pat_id':patId,'visit_id':visitId}
            dispatch(medicationActions.getTemplate(selectData))
        });
    }

    /**
    * @DateOfCreation        25 Sept 2018
    * @ShortDescription      This function is responsible to update FxForm ref object
    * @return                JSON Object
    * @param                 Nothing
    */
    handleBoundFormUpdate(data){
        this.boundFormAddMedicine = data;
    }

    /**
     * @DateOfCreation        25 Sept 2018
     * @ShortDescription      This function is responsible to handle submit add medicine form data
     * @param                 Event Object
     * @return                Nothing
     */
    handleAddMedicineSubmit() {
        if(this.boundFormAddMedicine){
            const { dispatch } = this.props;
            let submitData = this.boundFormAddMedicine.getData();

            if(submitData){
                dispatch(manageDrugsActions.submitRequest(submitData));
            }
       }
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to handle hide medication add/edit pop-up
    * @return                Redirect
    */
    newMedicationModalHideHandle() {
        const { dispatch }  = this.props;
        dispatch(medicationActions.resetState());

        this.setState({ newMedicationModalShow: false });
    }

    /**
    * @DateOfCreation        23 July 2018
    * @ShortDescription      This function is responsible to handle show medicine chart
    * @return                Redirect
    */
    medicineChartModalShowHandle() {
        this.setState({ 
            medicationChartModalShow: true
        });
    }    

    /**
    * @DateOfCreation        23 July 2018
    * @ShortDescription      This function is responsible to handle hide medication chart pop-up
    * @return                Redirect
    */
    medicineChartModalHideHandle() {
        this.setState({ medicationChartModalShow: false });
    }

    /**
    * @DateOfCreation        25 Sept 2018
    * @ShortDescription      This function is responsible to handle show medicine prescription pop-up
    * @return                Redirect
    */
    medicineViewPrescriptionModalShowHandle() {
        this.setState({ 
            medicationViewPrescriptionModalShow: true
        });
    }    

    /**
    * @DateOfCreation        25 Sept 2018
    * @ShortDescription      This function is responsible to handle hide medication prescription pop-up
    * @return                Redirect
    */
    medicineViewPrescriptionModalHideHandle() {
        this.setState({ medicationViewPrescriptionModalShow: false });
    }   

    /**
    * @DateOfCreation        25 Sept 2018
    * @ShortDescription      This function is responsible to handle hide medication prescription pop-up
    * @return                Redirect
    */
    addMedicineModalHideHandle() {
        this.setState({ addMedicineModalShow: false });
    }

    /**
     * @DateOfCreation        14 July 2018
     * @ShortDescription      This function is responsible to get the list of Medicines from API
     * @return                Nothing
     */
    componentWillMount() {
        const { dispatch,visitId,patId } = this.props;
        dispatch(medicationActions.getMedicineList());   
        dispatch(medicationActions.getMedicineTemplate());   
        dispatch(medicationActions.getMedicinelistBySearch({'medicine_name' : ''}));

        if(visitId && patId){
            dispatch(medicationActions.getPatientMedicationRecord(visitId, patId));
        }

        dispatch(patientDashboardProfileAction.getPatientMedicationList(patId, 0, 5, '', []));
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to handel submit medication data
    * @return                Redirect
    */
    submitMedicationData(data){
        const { dispatch } = this.props;
       
        let extraData               = {};
        extraData['pat_id']         = this.props.patId;
        extraData['visit_id']       = this.props.visitId;
                
        let medicationData = utilityHelper.mergeMultipleObject([data, extraData]);
        dispatch(medicationActions.newMedicationSubmit(medicationData));        
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to handel save as template medication data
    * @return                Redirect
    */
    medicineSaveAsTemplate(){
        const { dispatch } = this.props;
       
        let data = {};
        if(this.isTemplateValid()){
            data['pat_id']         = this.props.patId;
            data['visit_id']       = this.props.visitId;
            data['temp_name']      = this.state.medicine.template.temp_name;
            dispatch(medicationActions.medicineSaveAsTemplate(data));        
        }
    }    

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to handel submit medication data
    * @return                Redirect
    */
    getMedicineDataByMedicine(medicineId){
        const { dispatch } = this.props;
       
        let extraData               = {};
        extraData['medicine_id']    = medicineId;
                
        let medicineData = utilityHelper.mergeMultipleObject([extraData]);
        dispatch(medicationActions.getMedicineDataAction(medicineData));        
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to handel submit medication data
    * @return                Redirect
    */
    searchMedicine(medicine){
        if(typeof medicine == 'object'){
            medicine = medicine.target.value;
        }
        const { dispatch } = this.props;
        let extraData = {}
        extraData['medicine_name'] = medicine;
        dispatch(medicationActions.getMedicinelistBySearch(extraData));      
    }    

    /**
     * @DateOfCreation        31 May 2018
     * @ShortDescription      This function is responsible to handel discontinue request medication data
     * @return                Redirect
     */
    discontinueMedicationRecord(medicationId){
        const { dispatch } = this.props;
        dispatch(medicationActions.discontinueMedicationRecord(medicationId));
    }

    /**
     * @DateOfCreation        14 July 2018
     * @ShortDescription      This function is responsible to get patient medication details
     * @param                 Event Object
     * @return                Nothing
     */
    componentWillReceiveProps(props){
        const { dispatch, visitId, patId } = this.props;

        if(props.isUpdateDone && visitId && patId){
            dispatch(medicationActions.getPatientMedicationRecord(visitId, patId));
            dispatch(medicationActions.getMedicineList()); 

            let tempArray = [];
            this.state.tempMedicineArr = tempArray;    
            this.setState( this.state );

            dispatch(medicationActions.resetState());
            this.newMedicationModalHideHandle();
        }

        if(props.templateSaveMSg){
            const { medicine } = this.state;
            setTimeout(function(){
                this.setState({
                    medicine: this.initialState
                }, function(){
                    dispatch(medicationActions.resetState());
                });
            }.bind(this),500);
        }

        if(props.isInsertDone){

            setTimeout(function(){
                this.setState({ addMedicineModalShow: false });
                dispatch(manageDrugsActions.resetState());
                dispatch(medicationActions.getMedicinelistBySearch({'medicine_name' : ''}));

                let tempArray = [];
                this.state.tempMedicineArr = tempArray;        
                this.setState( this.state );

            }.bind(this),2000);
        }

        if(props.fetchOptionData && this.optionLoad){
            this.optionLoad = false;
            const { data } = this.state.formConfig;
            const { formConfig } = this.state;
            let drugTypeOpt = utilityHelper.getDataConvertToOptionType(props.optionData.drug_type,'drug_type_name','drug_type_id');
            let doseUnitOpt = utilityHelper.getDataConvertToOptionType(props.optionData.drug_dose_unit,'drug_dose_unit_name','drug_dose_unit_id');
            let medicineOpt = utilityHelper.getDataConvertToOptionType(props.optionData.medicine_name,'medicine_name','medicine_id');
            
            this.setState({
                formConfig:{
                    ...formConfig,
                    data:{
                        ...data,
                        drug_dose_unit_name_data:doseUnitOpt,
                        drug_type_name_data:drugTypeOpt,
                        medicine_name_data:medicineOpt,
                    }
                }
            });
        }

        if(props.isTemplateDataFetched && this.isTemplateDataLoad){
            
            if(typeof props.patientTemplateMedicationData == 'object' && props.patientTemplateMedicationData.length > 0){
                let tempArray = [];

                props.patientTemplateMedicationData.map((templateMedicineData, index) =>{
                    let tempData = [];
                    tempData['medicine_dose']          = (templateMedicineData.medicine_dose != '' && templateMedicineData.medicine_dose != undefined) ? templateMedicineData.medicine_dose : '';
                    tempData['medicine_dose2']         = (templateMedicineData.medicine_dose2 != '' && templateMedicineData.medicine_dose2 != undefined) ? templateMedicineData.medicine_dose2 : '';
                    tempData['medicine_dose3']         = (templateMedicineData.medicine_dose3 != '' && templateMedicineData.medicine_dose3 != undefined) ? templateMedicineData.medicine_dose3 : '';
                    tempData['medicine_dose_unit']     = (templateMedicineData.medicine_dose_unit != '' && templateMedicineData.medicine_dose_unit != undefined) ? templateMedicineData.medicine_dose_unit : '';
                    tempData['medicine_instractions']  = '';
                    tempData['medicine_meal_opt']      = (templateMedicineData.medicine_meal_opt != '' && templateMedicineData.medicine_meal_opt != undefined) ? templateMedicineData.medicine_meal_opt : [];
                    tempData['medicine_name']          = (templateMedicineData.medicine_name != '' && templateMedicineData.medicine_name != undefined) ? templateMedicineData.medicine_name : '';
                    tempData['medicine_type']          = (templateMedicineData.drug_type_name != '' && templateMedicineData.drug_type_name != undefined) ? templateMedicineData.drug_type_name : '';
                    tempData['medicine_type_id']       = (templateMedicineData.medicine_type != '' && templateMedicineData.medicine_type != undefined) ? templateMedicineData.medicine_type : '';
                    tempData['medicine_id']            = (templateMedicineData.medicine_id != '' && templateMedicineData.medicine_id != undefined) ? templateMedicineData.medicine_id : '';
                    tempData['medicine_duration']      = (templateMedicineData.medicine_duration != '' && templateMedicineData.medicine_duration != undefined) ? templateMedicineData.medicine_duration : '';
                    tempData['medicine_duration_unit'] = (templateMedicineData.medicine_duration_unit != '' && templateMedicineData.medicine_duration_unit != undefined) ? templateMedicineData.medicine_duration_unit : '';

                    // tempArray.push(tempData);
                    this.state.tempMedicineArr.push(tempData);
                });

                // this.state.tempMedicineArr = tempArray
            
                this.setState(
                    this.state
                );

                // RESET STATE FOR 'isTemplateDataFetched' to false
                dispatch(medicationActions.resetStateTemplateData()); 
            }
        }
    }

    /**
     * @DateOfCreation        31 May 2018
     * @ShortDescription      This function is responsible to redirect unauthorise users
     * @return                Redirect
     */
    componentDidUpdate(){
        const { dispatch }  = this.props;
        if(this.props.isUserNotValid){
           dispatch(headerActions.logout());
        }
    }

    /**
     * @DateOfCreation        23 July 2018
     * @ShortDescription      This function is responsible to handle load filtered medicine chart
     * @return                Nothing
     */
    patientChartMedicineSearch(event){
        const { value } = event.target;
        const filterAll = value;
        const filtered = [{ id: 'all', value: filterAll }];
        this.setState({ filterAll, filtered });
    }

    /**
     * @DateOfCreation        20 June 2018
     * @ShortDescription      This function is responsible to get patient list from api
     * @return                Nothing
     */
    getChartMedicineList(page, pageSize, sorted, filtered){
        const { dispatch, visitId, patId } = this.props;
        dispatch(patientDashboardProfileAction.getPatientMedicationList(patId, page, pageSize, sorted, filtered, visitId));
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to handel delete request medication data
    * @return                Redirect
    */
    deleteMedicationRecord(medicationId){
       
        confirmAlert({
            title: 'Medications',
            message: 'Are you sure you want to delete this medication record?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        const { dispatch } = this.props;
                        dispatch(medicationActions.deleteMedicationRecord(medicationId));
                    }
                },
                {
                    label: 'No',
                    onClick: () => {return false;}
                }
            ]
        })        
    }

    render() {
        return (
            <div >
                <Medications 
                    newMedicationModalShowHandle     = {this.newMedicationModalShowHandle}
                    newMedicationModalHideHandle     = {this.newMedicationModalHideHandle}
                    medicineChartModalShowHandle     = {this.medicineChartModalShowHandle}
                    medicineChartModalHideHandle     = {this.medicineChartModalHideHandle}
                    submitMedicationData             = {this.submitMedicationData}
                    getMedicineDataByMedicine        = {this.getMedicineDataByMedicine}
                    searchMedicine                   = {this.searchMedicine}
                    deleteMedicationRecord           = {this.deleteMedicationRecord}
                    discontinueMedicationRecord      = {this.discontinueMedicationRecord}
                    payload                          = {this.state} 
                    medicineList                     = {this.props.medicineList}
                    patientid                        = {this.props.patId}
                    visitId                          = {this.props.visitId}
                    successMsg                       = {this.props.successMessage}
                    errorMsg                         = {this.props.errorMsg}
                    sendingRequest                   = {this.props.sendingRequest}
                    isUpdateDone                     = {this.props.isUpdateDone}
                    isEditSuccess                    = {this.props.isEditSuccess}
                    patientMedicationData            = {this.props.patientMedicationData}
                    isMedicationDataFetched          = {this.props.isMedicationDataFetched}
                    filterAll                        = { this.state.filterAll }
                    filtered                         = { this.state.filtered }
                    patientChartMedicineSearch       = { this.patientChartMedicineSearch }
                    getChartMedicineList             = { this.getChartMedicineList }
                    pages                            = { this.props.pages }
                    chartMedicineList                = { this.props.patientMedicationList }
                    medicineData                     = { this.props.medicineData }
                    user_type                        = { this.props.user_type }
                    medicineSaveAsTemplate           = { this.medicineSaveAsTemplate}
                    templateSaveMSg                  = { this.props.templateSaveMSg}
                    handleChange                     = { this.handleChange }
                    medicineTempList                 = { this.props.medicineTempList }
                    handleSelectChange               = { this.handleSelectChange }
                    medicineDataBySearch             = { this.props.medicineDataBySearch }
                    isSearchDone                     = { this.props.isSearchDone }
                    medicineDoseData                 = { this.props.medicineListData }
                    addMedicineModalShowHandle       = {this.addMedicineModalShowHandle}
                    addMedicineModalHideHandle       = {this.addMedicineModalHideHandle}
                    medicineViewPrescriptionModalShowHandle = {this.medicineViewPrescriptionModalShowHandle}
                    medicineViewPrescriptionModalHideHandle = {this.medicineViewPrescriptionModalHideHandle}
                    handleBoundFormUpdate            = {this.handleBoundFormUpdate}
                    handleAddMedicineSubmit          = {this.handleAddMedicineSubmit}
                    formConfig                       = {this.state.formConfig}
                    isInsertDone                     = {this.props.isInsertDone}
                    successMsg                       = {this.props.successMsg}
                    isUnitFetched                    = {this.props.isUnitFetched}
                    dose_unit                        = {this.props.medicineList.dose_unit}
                    drugType                         = {this.props.medicineList.drug_type}
                    
                    tempData                         = {this.state.tempMedicineArr}
                    medicineStateData                = {this.state.tempMedicineArr}
                    removedMedicineBoxFromState      = {this.removedMedicineBoxFromState}
                    handleInputChange                = {this.handleInputChange}
                    handleDropDownSelectChange       = {this.handleDropDownSelectChange}
                    onCheckBoxChanged                = {this.onCheckBoxChanged}
                    submitMedicationRecord           = {this.submitMedicationRecord}
                    handleSelectAutocomplete         = {this.handleSelectAutocomplete}
                    handleChangeAutocomplete         = {this.handleChangeAutocomplete}
                />
            </div>
        );
    }
}

/**
 * @DateOfCreation        31 May 2018
 * @ShortDescription      This function is responsible to connect store to props
 * @return                View
 */
function mapStateToProps(state) {
    const { successMessage, errorMsg, sendingRequest, isUpdateDone, medicineList, patientMedicationData, patientTemplateMedicationData, isMedicationDataFetched, isTemplateDataFetched, isUserNotValid, isEditSuccess, medicineData,templateSaveMSg, medicineTempList, medicineDataBySearch, isSearchDone, medicineListData, isUnitFetched} = state.Medications;
    const { pages, patientMedicationList }  = state.patientProfileDashboard;
    const { optionData, fetchOptionData, submitted, isInsertDone, successMsg } = state.manageDrugs;
    return {
        successMessage,
        errorMsg,
        isInsertDone,
        medicineList,
        sendingRequest,
        isUpdateDone, 
        patientMedicationData,
        isMedicationDataFetched,
        patientTemplateMedicationData,
        isTemplateDataFetched,
        isEditSuccess,
        isUserNotValid,
        patientMedicationList,
        pages,
        medicineData,
        user_type:state.session.user.user_type,
        templateSaveMSg,
        medicineTempList,
        medicineDataBySearch,
        isSearchDone,
        medicineListData,
        optionData, 
        fetchOptionData,
        submitted, 
        successMsg,
        isUnitFetched
    };
}

// Connection with State 
const connectedMedicationsContainer = connect(mapStateToProps)(MedicationsContainer);
export { connectedMedicationsContainer as MedicationsContainer };