import moment from 'moment';
var formConfig = {
            fields: [ 
                {
                    name: "mlt_name",
                    idField: "lab_test_relation_id_select",
                    title: "Laboratory Test Name",
                    value:"",
                    type: "autocomplete",
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
                    name: "lab_test_relation_id",
                    value:"",
                    type: "hidden",
                    showOnForm: true
                }
            ],
            data: {
                mlt_name_data : [],
            },
           handlers:{               
           }
        };
        
export default formConfig;