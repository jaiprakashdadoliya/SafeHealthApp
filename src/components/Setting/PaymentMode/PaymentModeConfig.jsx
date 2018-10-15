import moment from 'moment';
var formConfig = {
            fields: [ 
                {
                    name: "payment_mode",
                    title: "Payment Mode",
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
                    name: "payment_mode_id",
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