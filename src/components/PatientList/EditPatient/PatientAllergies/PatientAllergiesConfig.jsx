import moment from 'moment';
var formConfig = {
            fields: [ 
                {
                    name: "parent_allergy_type",
                    title: "Parent Allergy",
                    value:"",
                    type: "select",                    
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
                    ]
                }, 
                {
                    name: "allergy_type",
                    title: "Allergy Name",
                    value:"",
                    type: "select",                    
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
                    name: "onset",
                    title: "Onset",
                    value:"",
                    type: "text",
                    showOnForm: true,
                    cssClasses:{
                        inputParentClass:'col-md-4',
                        labelClass:'form-group',
                        inputContainerClass:'',
                        inputGroupClass:''
                    }
                },
                {
                    name: "onset_time",
                    title: "Duration",
                    value:"",
                    type: "select",
                    showOnForm: true,
                    cssClasses:{
                        inputParentClass:'col-md-4',
                        labelClass:'form-group',
                        inputContainerClass:'',
                        inputGroupClass:''
                    },                    
                },
                {
                    name: "status",
                    title: "Status",
                    value:"",
                    type: "customcheckbox",                    
                    showOnForm: true,
                    cssClasses:{
                        inputParentClass:'col-md-4',
                        labelClass:'form-group',
                        inputContainerClass:'',
                        inputGroupClass:''
                    },
                    clearFix:true
                }, 
                {
                    name:"pat_alg_id",
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
                onset_time_data: [],
                parent_allergy_type_data: [],
                allergy_type_data: [],
                status_data:[]
            },
           handlers:{               
           }
        };
        
export default formConfig;