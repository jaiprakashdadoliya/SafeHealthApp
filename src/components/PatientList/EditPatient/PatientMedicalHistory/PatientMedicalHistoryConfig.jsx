import moment from 'moment';
var formConfig = {
            fields: [ 
                /*{
                    name: "medicine_id",
                    title: "Medicine Name",
                    value:"",
                    type: "select",                    
                    showOnForm: true,
                   cssClasses:{
                        inputParentClass:'col-md-4',
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
                }, */
                {
                    name: "medicine_name",
                    idField: "medicine_id",
                    title: "Medicine Name",
                    value:"",
                    type: "autocompleteRuntime",   
                    focusText: "Type medicine name",   
                    loadingText: "Loading...",   
                    notFoundText: "Record not found",   
                    showOnForm: true,
                    validations:[
                        {
                            isRequired:false,
                            msg:'This field is required.'
                        }
                    ],
                    cssClasses:{
                        inputParentClass:'col-md-4',
                        labelClass:'control-label',
                        inputContainerClass:'col-md-3'
                    },
                },
                {
                    name: "medicine_start_date",
                    title: "Start Date",
                    value:"",
                    type: "date",
                    format:"DD/MM/YYYY",
                    showOnForm: true,
                    validations:[
                        {
                            isRequired:true,
                            msg:'This field is required.'
                        }
                    ],
                    cssClasses:{
                        inputParentClass:'col-md-4',
                        labelClass:'form-group',
                        inputContainerClass:'',
                        inputGroupClass:''
                    }
                },
                {
                    name: "medicine_end_date",
                    title: "End Date",
                    value:"",
                    type: "date",
                    format:"DD/MM/YYYY",
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
                    name: "medicine_dose",
                    title: "Dose",
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
                    name: "medicine_dose_unit",
                    title: "Dose Unit",
                    value:"",
                    type: "select",
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
                    name:"pmh_id",
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
                /*{
                    name: "medicine_name",
                    value:"",
                    type: "hidden",
                    showOnForm: false
                },*/
                {
                    name: "prev_medicine_id",
                    title: "",
                    value:"",
                    type: "hidden",  
                    showOnForm: true,
                }
            ],
            data: {
                medicine_dose_unit_data: [],
                medicine_id_data: [],
                medicine_name_data: [],
            },
           handlers:{               
           }
        };
        
export default formConfig;