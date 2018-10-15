import moment from 'moment';
var formConfig = {
            fields: [ 
                {
                    name: "residence_value",
                    title: "Place of residence",
                    value:"",
                    type: "text",                    
                    showOnForm: true,
                    cssClasses:{
                        inputParentClass:'col-md-8',
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
                    name:"pr_id",
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
            ],
            data: {
                
            },
           handlers:{               
           }
        };
        
export default formConfig;