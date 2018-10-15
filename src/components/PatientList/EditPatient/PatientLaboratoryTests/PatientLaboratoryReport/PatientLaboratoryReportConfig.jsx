import moment from 'moment';
var formConfig = {
            fields: [ 
                {
                    name: "lab_report_name",
                    title: "Procedure/Test Name",
                    value:"",
                    type: "text",                    
                    showOnForm: true,
                    cssClasses:{
                        inputParentClass:'col-md-6',
                        labelClass:'form-group',
                        inputContainerClass:'',
                        inputGroupClass:''
                    },
                    validations:[
                        {
                            isRequired:true,
                            msg:'This field is required.'
                        }
                    ],
                    clearFix:true
                }, 
                {
                    name: "lab_report_file",
                    placeholder: "Browse File",
                    title:"Upload Report",
                    value:"",
                    type: "file", 
                    showOnForm: false,
                    accept:"application/pdf,text/csv,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,image/png,image/jpeg",
                    cssClasses:{
                        inputClass:'yellow btn text-btn',
                        labelClass:'form-group',
                    },
                    validations:[
                        {
                            isRequired:true,
                            msg:'This field is required.'
                        }
                    ],
                    clearFix:true
                },
                {
                    name:"lr_id",
                    value:"",
                    type:"hidden",
                    showOnForm: true
                },
                {
                    name: "pat_id",
                    value:"",
                    type: "hidden",
                    showOnForm: true
                },
                {
                    name: "visit_id",
                    value:"",
                    type: "hidden",
                    showOnForm: true
                }
            ],
            data: {
                lab_report_name_data: [],
            },
           handlers:{               
           }
        };
        
export default formConfig;