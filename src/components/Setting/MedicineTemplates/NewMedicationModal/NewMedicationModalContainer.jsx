import React from "react";
import { NewMedicationModal } from "./NewMedicationModal";
import formConfig from "./NewMedicationModelConfig";

import { connect } from 'react-redux';
import { headerActions } from '../../../../_actions';
import { newPatientValidator } from '../../../../_validator';
import { utilityHelper } from '../../../../_helpers';
import { dataConstants } from '../../../../_constants';
import moment from 'moment';

export class NewMedicationModalContainer extends React.Component {
    constructor(props) {  
        super(props);
        
        this.defaultState = {
            formConfig: formConfig,
            formData: [],
        }; 
        this.state = this.defaultState;
        this.boundForm = undefined;

        this.handleClose                = this.handleClose.bind(this);
        this.handleBoundFormUpdate      = this.handleBoundFormUpdate.bind(this);
        this.submitMedication           = this.submitMedication.bind(this);
        this.showHideDoseByFrequency    = this.showHideDoseByFrequency.bind(this);  
        this.getMedicineDataByMedicine  = this.getMedicineDataByMedicine.bind(this);  
        this.isReload = true;
        this.isClose = false;
        this.unitAdded = true;
        this.typeAdded = true;
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
        //set country
        if(props.medicineListData){
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

            //set medicine list data
            if(props.medicineListData){
                const { data } = this.state.formConfig;
                const { formConfig } = this.state;
                let medicineOpt = utilityHelper.getMedicineOption(props.medicineListData.medicine_data);
                this.setState({
                    formConfig:{
                        ...formConfig,
                        fields:fields,
                        data:{
                            ...data,
                            medicine_name_data: medicineOpt
                        }
                    }
                },function(){
                    this.isReload= true;
                });
            }

            // Set medicine details auto fill in medicine popup
            if(this.isReload && props.medicineData != '' ){
                
                if(props.medicineData.dose_unit && this.unitAdded){
                    let doseUnitData = utilityHelper.getDataConvertToOptionType(props.medicineData.dose_unit,'drug_dose_unit_name','drug_dose_unit_id');
                    let doseTypeData = utilityHelper.getDataConvertToOptionType(props.medicineData.drug_type,'drug_type_name','drug_type_id');
                    const { data } = this.state.formConfig;
                    const { formConfig } = this.state;
                    this.setState({
                        formConfig:{
                            ...formConfig,
                            data:{
                                ...data,
                                medicine_dose_unit_data:doseUnitData,
                                medicine_type_data:doseTypeData
                            }
                        }
                    },function(){
                        this.unitAdded = false;
                    });
                }
                var fieldVal = [];
                if(props.medicineData.medicine_data != ''){
                    for(var fc in fields){
                        var fieldName = fields[fc]['name'];

                        if(fieldName == 'medicine_instractions'){
                            fields[fc]['value'] = props.medicineData.medicine_data[fieldName];
                            fieldVal = fields[fc]['value'];
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
                    }
                    
                    if((fieldVal !='' || fieldVal != null) && props.medicationEditData ==''){
                        this.boundForm.setFieldData({medicine_instractions: []});
                    }
                }
                this.isReload = false;
            }
        }
    } 

    /**
     * @DateOfCreation        14 june 2018
     * @ShortDescription      This function is responsible to get the list of specialisation from API
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
                        medicine_name_handle:this.getMedicineDataByMedicine, 
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
            let doseUnitData = this.state.formConfig.data.medicine_dose_unit_data;
            const doseIndex = doseUnitData.findIndex(i => i.value === data.medicine_dose_unit);
            data.medicine_dose_unitVal = doseUnitData[doseIndex].label;

            let medicineTypeData = this.state.formConfig.data.medicine_type_data;
            const typeIndex = medicineTypeData.findIndex(i => i.value === data.medicine_type);
            data.drug_type_name = medicineTypeData[typeIndex].label;

           if (data) { 
                this.props.newMedicationModalHideHandle();
                this.props.medicationFormData(data);
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
                    isEditSuccess           = {this.props.isEditSuccess}                
                />
            </div>
        );
    }
}