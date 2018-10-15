import moment from 'moment';
var formConfig = {
            fields: [ 
                {
                    name: "temp_name",
                    title: "Template Name",
                    value:"",
                    type: "text",
                    clearFix:true,
                    showOnForm: true,
                    cssClasses:{
                        inputParentClass:'col-md-8',
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
                    name: "symptoms_data",
                    title: "Present Complaints",
                    value: [],
                    type: "tags",
                    showOnForm: true,
                    cssClasses:{
                        inputParentClass:'col-md-12',
                        labelClass:'control-label',
                        inputContainerClass:''
                    },
                    clearFix:true
                },
                {
                    name: "diagnosis_data",
                    title: "Diagnosis",
                    value: [],
                    type: "tags",  
                    showOnForm: true,
                    cssClasses:{
                        inputParentClass:'col-md-12',
                        labelClass:'control-label',
                        inputContainerClass:''
                    },
                    clearFix:true
                },
                {
                    name: "laboratory_test_data",
                    title: "Laboratory Tests",
                    value: [],
                    type: "tags",  
                    showOnForm: true,
                    cssClasses:{
                        inputParentClass:'col-md-12',
                        labelClass:'control-label',
                        inputContainerClass:''
                    },
                    clearFix:true
                },
                {
                    name: "lab_temp_id",
                    value:"",
                    type: "hidden",
                    showOnForm: true
                }
            ],
            data: {
                symptoms_data_data: [],
                diagnosis_data_data: [],
                laboratory_test_data_data: [],
            },
           handlers:{               
           }
        };
        
export default formConfig;