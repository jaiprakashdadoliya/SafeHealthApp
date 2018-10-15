var formConfig = {
            fields: [
                {
                    name: "clinical_notes",
                    title: "",
                    value: [],
                    type: "tags",  
                    showOnForm: true,
                    placeholder: 'Clinical notes separated by press enter or comma',
                    cssClasses:{
                        inputParentClass:'col-md-12',
                        labelClass:'control-label',
                        inputContainerClass:''
                    },
                    validations:[
                        {
                            isRequired:true,
                            msg:'This field is required.'
                        }
                    ],
                }
            ],
            data: {
                clinical_notes_data: []                
            },
           handlers:{               
           }
        };
        
export default formConfig;