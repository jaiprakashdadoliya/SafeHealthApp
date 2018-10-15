import moment from 'moment';
var formConfig = {
            fields: [ 
                {
                    name: "checkup_type",
                    title: "Checkup Type",
                    value:"",
                    type: "text",
                    clearFix:true,
                    showOnForm: true,
                    cssClasses:{
                        inputParentClass:'col-md-6',
                        labelClass:'control-label',
                        inputContainerClass:''
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
                    name: "checkup_type_id",
                    value:"",
                    type: "hidden",
                    showOnForm: true
                }
            ],
            data: {
            },
           handlers:{               
           }
        };
        
export default formConfig;