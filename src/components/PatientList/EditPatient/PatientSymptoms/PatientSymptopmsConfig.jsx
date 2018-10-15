import moment from 'moment';
var formConfig = {
            fields: [                
                {
                    name: "symptom_name",
                    idField: "symptom_id_select",
                    title: "Present Complaint Name",
                    value:"",
                    type: "autocompleteRuntime",   
                    focusText: "Type of the complaint name",   
                    loadingText: "Loading...",   
                    notFoundText: "Record not found",   
                    showOnForm: true,
                    validations:[
                        {
                            isRequired:true,
                            msg:'This field is required.'
                        }
                    ]
                },
                {
                    name: "since_date",
                    title: "Since When",
                    type: "date",
                    value:"",
                    showOnForm: true,
                    format:"DD/MM/YYYY",
                    clearFix:true,
                    validations:[
                        {
                            isRequired:true,
                            msg:'This field is required.'
                        }
                    ]
                },
                {
                    name: "comment",
                    title: "Comment",
                    value:"",
                    type: "text",
                    showOnForm: true,
                    clearFix:true,
                    cssClasses:{
                        inputParentClass:'col-md-12'
                    }
                },
                {
                    name:"visit_symptom_id",
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
                },
                {
                    name:"symptom_id",
                    value:"",
                    type: "hidden",
                    showOnForm: true
                }
            ],
            data: {
                symptom_name_data:[]
            },
           handlers:{  
             
           }
        };
        
export default formConfig;