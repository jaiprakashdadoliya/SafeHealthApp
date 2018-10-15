import moment from 'moment';
var formConfig = {
            fields: [ 
                {
                    name: "medicine_name",
                    idField: "medicine_id_select",
                    title: "Drug Name",
                    value:"",
                    type: "autocomplete",
                    clearFix:true,
                    showOnForm: true,
                    cssClasses:{
                        inputParentClass:'col-md-4',
                        labelClass:'control-label',
                        inputContainerClass:''
                    },
                    validations:[
                        {
                            isRequired:true,
                            msg:'This field is required.'
                        }
                    ],
                  clearFix:false
                },
                {
                    name: "drug_type_name",
                    idField: "drug_type_id_select",
                    title: "Drug Type",
                    value:"",
                    type: "autocomplete",
                    clearFix:true,
                    showOnForm: true,
                    validations:[
                        {
                            isRequired:true,
                            msg:'This field is required.'
                        }
                    ],
                    cssClasses:{
                        inputParentClass:'col-md-4',
                        labelClass:'control-label',
                        inputContainerClass:''
                    },
                    clearFix:false
                }, 
                {
                    name: "medicine_dose",
                    title: "Strength",
                    value:"",
                    type: "text",
                    restrictType: "digitsWithDotOnly",
                    showOnForm: true,
                    validations:[
                        {
                            isRequired:true,
                            msg:'This field is required.'
                        }
                    ],
                    cssClasses:{
                        inputParentClass:'col-md-2',
                        labelClass:'control-label',
                        inputContainerClass:''
                    },
                },
                {
                    name: "drug_dose_unit_name",
                    idField: "drug_dose_unit_id_select",
                    title: "Unit",
                    value:"",
                    type: "autocomplete",
                    clearFix:true,
                    showOnForm: true,
                    validations:[
                        {
                            isRequired:true,
                            msg:'This field is required.'
                        }
                    ],
                    cssClasses:{
                        inputParentClass:'col-md-2',
                        labelClass:'control-label',
                        inputContainerClass:''
                    },
                    clearFix:false
                },
                {
                    name: "medicine_instractions",
                    title: "Instructions",
                    value: [],
                    type: "tags",  
                    showOnForm: true,
                    placeholder: 'Instructions separated by press enter or comma',
                    cssClasses:{
                        inputParentClass:'col-md-12',
                        labelClass:'control-label',
                        inputContainerClass:''
                    },
                    clearFix:true
                },
                {
                    name: "dmr_id",
                    value:"",
                    type: "hidden",
                    showOnForm: true
                }
            ],
            data: {
                drug_type_name_data: [],
                drug_dose_unit_name_data: [],
                medicine_name_data: [],
                medicine_instractions_data: [],
            },
           handlers:{               
           }
        };
        
export default formConfig;