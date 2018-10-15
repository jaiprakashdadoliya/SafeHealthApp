import React from "react";
import { NewMedicationModal } from "./NewMedicationModal";
import formConfig from "./NewMedicationModelConfig";

import { connect } from 'react-redux';
import { headerActions } from '../../../../_actions';
import { medicationActions } from './../medicationActions';
import { newPatientValidator } from '../../../../_validator';
import { utilityHelper } from '../../../../_helpers';
import { dataConstants } from '../../../../_constants';
import moment from 'moment';

export class NewMedicationModalContainer extends React.Component {
    constructor(props) {  
        super(props);
        
        this.defaultState = {
            formConfig: formConfig,
        }; 
        this.state = this.defaultState;
        this.boundForm = undefined;

        this.handleClose                = this.handleClose.bind(this);
        this.handleBoundFormUpdate      = this.handleBoundFormUpdate.bind(this);
        this.submitMedication           = this.submitMedication.bind(this);
        this.showHideDoseByFrequency    = this.showHideDoseByFrequency.bind(this);  
        this.getMedicineDataByMedicine  = this.getMedicineDataByMedicine.bind(this);  
        this.medicineAutoCompleteHendler= this.medicineAutoCompleteHendler.bind(this);
        this.isReload = true;
        this.isClose = false;
    }

    /**
     * @DateOfCreation        13 July 2018
     * @ShortDescription      This function is responsible to handle the close event of add modal
     * @return                Nothing
     */
    handleClose() {
        this.setState(this.defaultState);
        this.props.newMedicationModalHideHandle();
    }

    /**
     * @DateOfCreation        13 July 2018
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
     * @DateOfCreation        13 July 2018
     * @ShortDescription      This function is responsible to fx form input state data
     * @return                Redirect
     */
    handleBoundFormUpdate(data){
        this.boundForm = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to handel input hide and show in condition wise
    * @return                Redirect
    */
    componentWillReceiveProps(props) {
        if(props.medicineListData.dose_unit != undefined && props.medicineListData.dose_unit != ''){
            let doseUnitData = utilityHelper.getDataConvertToOptionType(props.medicineListData.dose_unit,'drug_dose_unit_name','drug_dose_unit_id');
            const { data } = this.state.formConfig;
            const { formConfig } = this.state;
            this.setState({
                formConfig:{
                    ...formConfig,
                    data:{
                        ...data,
                        medicine_dose_unit_data:doseUnitData
                    }
                }
            });
        }
       
        const { data } = this.state.formConfig;
        const { formConfig } = this.state;

        var formConfigEdit = formConfig;
        var fields = formConfigEdit['fields'];
        if(props.medicationEditData !=''){
            
            for(var fc in fields){
                var fieldName = fields[fc]['name'];

                if(fields[fc]['type'] == 'customcheckbox'){
                    fields[fc]['value'] = [props.medicationEditData[fieldName]];
                }else{
                    fields[fc]['value'] = props.medicationEditData[fieldName];                        
                }

                if(fields[fc]['type'] == 'date'){
                    if(props.medicationEditData[fieldName] == 'undefined' || props.medicationEditData[fieldName] == undefined || props.medicationEditData[fieldName] == ''){
                        fields[fc]['value'] = moment();
                    }
                }
            }
        }else{
            for(var fc in fields){
                var fieldName = fields[fc]['name'];
                
                if(fields[fc]['type'] == 'customcheckbox'){
                    fields[fc]['value'] = [];
                }else{
                    fields[fc]['value'] = '';                        
                }
            }
        }

        if(props.isSearchDone){

            // Set medicine details auto fill in medicine popup
            if(props.medicineData != '' ){
                
                var fieldVal = [];
                if(props.medicineData.medicine_data != ''){
                    for(var fc in fields){
                        var fieldName = fields[fc]['name'];

                        if(fieldName == 'medicine_instractions'){
                            fields[fc]['value'] = props.medicineData.medicine_data[fieldName];
                            fieldVal = fields[fc]['value'];
                        } 

                        if(fieldName == 'medicine_dose_unit'){
                            fields[fc]['value'] = props.medicineData.medicine_data['drug_dose_unit_id'];
                            this.boundForm.setFieldData({medicine_dose_unit: fields[fc]['value']});
                        } 
                    }

                    if(fieldVal !='' || fieldVal != null){
                        fieldVal = fieldVal!='' && fieldVal!=null ? fieldVal :[];
                        
                       if(this.boundForm !=null && typeof this.boundForm == 'object'){
                            this.boundForm.setFieldData({medicine_instractions: fieldVal});                        
                        }
                    }
                }else{
                    for(var fc in fields){
                        var fieldName = fields[fc]['name'];

                        if(fieldName == 'medicine_instractions'){
                            fields[fc]['value'] = [];
                        } 

                        if(fieldName == 'medicine_dose_unit'){
                            fields[fc]['value'] = ''; 
                            this.boundForm.setFieldData({medicine_dose_unit: ''}); 
                        }
                    }
                    
                    if((fieldVal !='' || fieldVal != null) && props.medicationEditData ==''){
                        this.boundForm.setFieldData({medicine_instractions: []});
                    }
                }
                this.isReload = false;
            }
        }

        // Medicine List by search
        if(props.isSearchDone && props.medicineDataBySearch){

            let medicineOptionData = utilityHelper.getMedicineOption(props.medicineDataBySearch);

            const { data, handlers } = this.state.formConfig;
            const { formConfig } = this.state;
            this.setState({
                formConfig:{
                    ...formConfig,
                    data:{
                        ...data,
                        medicine_name_data:medicineOptionData
                    },
                }
            });
        }

        if(props.isUnitFetched){
            const { data } = this.state.formConfig;
            const { formConfig } = this.state;
            let drugTypeOptions = utilityHelper.getDataConvertToOptionType(props.dose_unit,'drug_dose_unit_name','drug_dose_unit_id');
            this.setState({
                formConfig:{
                    ...formConfig,
                    data:{
                        ...data,
                        medicine_dose_unit_data:drugTypeOptions                        
                    }
                }
            });
        }
    } 

    /**
     * @DateOfCreation        14 June 2018
     * @ShortDescription      This function is responsible to get the list of specialization from API
     * @return                Nothing
     */
    componentWillMount() {
        const { dispatch } = this.props;
       
        // Set state
        const { handlers } = this.state.formConfig;
        const { formConfig } = this.state;
        this.setState({
                formConfig:{
                    ...formConfig,
                    handlers:{
                        ...handlers,
                        medicine_frequency_handle:this.showHideDoseByFrequency,
                        medicine_name_runtime_multiple_handle:this.getMedicineDataByMedicine,
                        medicine_name_handle:this.medicineAutoCompleteHendler
                    }
                }
            },
            function(){}
        );
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to handel get fx form medication state data
    * @return                Redirect
    */
    submitMedication(){
        if(this.boundForm){
            let data = this.boundForm.getData();
            if (data) {   
                this.props.submitMedicationData(data);
            }
        }
    }

    /**
     * @DateOfCreation        17 july 2018
     * @ShortDescription      This function is responsible to show hide other city field
     * @return                Nothing
     */
    showHideDoseByFrequency(frequencyType, frequencyName){
        const { formConfig, handlers } = this.state;
        var fields = formConfig['fields'];
        for(var fc in fields){
            var fieldName = fields[fc]['name'];
            
            if(fieldName == 'medicine_dose3'){
                if(frequencyType != undefined && frequencyType != dataConstants.MEDICINE_FREQUENCY_ONCE_IN_A_DAY && frequencyType != dataConstants.MEDICINE_FREQUENCY_AS_NEEDED ){
                    fields[fc]['showOnForm'] = true;
                    fields[fc]['value'] = "";
                    fields[fc]['validations'] = [
                        {
                            isRequired:true,
                            msg:'Required.'
                        }
                    ];
                }else{
                    fields[fc]['showOnForm'] = false;
                    fields[fc]['value'] = "";
                    fields[fc]['validations'] = [];
                }
            } 

            if(fieldName == 'medicine_dose_unit'){
                if(frequencyType == dataConstants.MEDICINE_FREQUENCY_THRICE_IN_A_DAY){
                    fields[fc]['clearFix'] = true;
                 }else{
                    fields[fc]['clearFix'] = false;

                 }
            }


            if(fieldName == 'medicine_dose2'){
                if(frequencyType == dataConstants.MEDICINE_FREQUENCY_THRICE_IN_A_DAY){
                    fields[fc]['showOnForm'] = true;
                    fields[fc]['value'] = "";
                    fields[fc]['validations'] = [
                        {
                            isRequired:true,
                            msg:'Required.'
                        }
                    ];
                }else{
                    fields[fc]['showOnForm'] = false;
                    fields[fc]['value'] = "";
                    fields[fc]['validations'] = [];
                }
            }                  
        }
        
        this.setState({
                formConfig:{
                    ...formConfig,
                    ...handlers
                }
            }
        );
    }

    /**
     * @DateOfCreation        22 Aug 2018
     * @ShortDescription      This function is responsible to call medicine details API
     * @return                Nothing
     */
    getMedicineDataByMedicine(medicineId, medicineName){
        if(medicineId){
            this.props.getMedicineDataByMedicine(medicineId);
        }
    }

    /**
     * @DateOfCreation        20 Sept 2018
     * @ShortDescription      This function is responsible to get medicine name by search
     * @return                Nothing
     */
    medicineAutoCompleteHendler(value, fiendName){
        const { dispatch } = this.props;
        if(value!=null && value!=undefined && value!=''){
            this.props.searchMedicine(value);
        }else{
            this.autoCompleteListBlank();
        }
    }

    /**
     * @DateOfCreation        20 Sept 2018
     * @ShortDescription      This function is responsible to get Symptoms option list data blank set
     * @param                 Event Object
     * @return                Nothing
     */
    autoCompleteListBlank(){
        const { data } = this.state.formConfig;
        const { formConfig } = this.state;
        this.setState({
            formConfig:{
                ...formConfig,
                data:{
                    ...data,
                    medicine_name_data:[]
                }
            }
        });
    }

    render() {
        return (
            <div >
                <NewMedicationModal
                    newMedicationModalShow  = {this.props.newMedicationModalShow}
                    handleBoundFormUpdate   = {this.handleBoundFormUpdate}
                    handleClose             = {this.handleClose}
                    formConfig              = {this.state.formConfig}   
                    medicineListData        = {this.props.medicineListData}                 
                    submitMedication        = {this.submitMedication} 
                    successMsg              = {this.props.successMsg}
                    errorMsg                = {this.props.errorMsg}
                    sendingRequest          = {this.props.sendingRequest}
                    isUpdateDone            = {this.props.isUpdateDone}                
                    isEditSuccess           = {this.props.isEditSuccess}                
                />
            </div>
        );
    }
}