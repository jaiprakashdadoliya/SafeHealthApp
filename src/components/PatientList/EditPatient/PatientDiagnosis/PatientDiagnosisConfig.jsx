import moment from 'moment';
var formConfig = {
            fields: [                
                {
                    name: "disease_name",
                    idField: "disease_id",
                    title: "Disease/Disorder",
                    value:"",
                    type: "autocomplete",   
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
                },
                {
                    name: "date_of_diagnosis",
                    title: "Date of Diagnosis",
                    type: "date",
                    value:"",
                    showOnForm: true,
                    format:"DD/MM/YYYY",
                    validations:[
                        {
                            isRequired:true,
                            msg:'This field is required.'
                        }
                    ],
                    cssClasses:{
                        inputParentClass:'col-md-4',
                        labelClass:'control-label',
                        inputContainerClass:'',
                    },
                },
                {
                    name: "diagnosis_end_date",
                    title: "End Date of Diagnosis",
                    type: "date",
                    value:"",
                    showOnForm: true,
                    format:"DD/MM/YYYY",
                    clearFix:true,
                    validations:[
                        {
                            isRequired:false,
                            msg:'This field is required.'
                        }
                    ],
                    cssClasses:{
                        inputParentClass:'col-md-4',
                        labelClass:'control-label',
                        inputContainerClass:'',
                    },
                }
            ],
            data: {
                disease_name_data:[]
            },
           handlers:{               
           }
        };
        
export default formConfig;