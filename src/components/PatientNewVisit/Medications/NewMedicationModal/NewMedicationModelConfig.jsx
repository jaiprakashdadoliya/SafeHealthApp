import moment from 'moment';
var formConfig = {
            fields: [                
                /*{
                    name: "medicine_name",
                    idField: "medicine_id",
                    title: "Select Medicine",
                    value:"",
                    type: "autocomplete",
                    clearFix:true,
                    showOnForm: true,
                    validations:[
                        {
                            isRequired:true,
                            msg:'This field is required.'
                        }
                    ],
                    cssClasses:{
                        inputParentClass:'col-md-12',
                        labelClass:'control-label',
                        inputContainerClass:'col-md-3'
                    },
                    clearFix:true
                },*/

                {
                    name: "medicine_name",
                    idField: "medicine_id",
                    title: "Select Medicine",
                    value:"",
                    type: "autocompleteRuntime",   
                    focusText: "Type medicine name",   
                    loadingText: "Loading...",   
                    notFoundText: "Record not found",   
                    showOnForm: true,
                    validations:[
                        {
                            isRequired:true,
                            msg:'This field is required.'
                        }
                    ],
                    cssClasses:{
                        inputParentClass:'col-md-12',
                        labelClass:'control-label',
                        inputContainerClass:'col-md-3'
                    },
                    clearFix:true
                },

                {
                    name: "medicine_duration",
                    title: "Duration",
                    value:"",
                    type: "text",  
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
                    name: "medicine_duration_unit",
                    title: "Duration Unit",
                    value:"",
                    type: "select",  
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
                    name: "medicine_frequency",
                    title: "Frequency",
                    value:"",
                    type: "select",  
                    showOnForm: false,
                    validations:[
                        {
                            isRequired:true,
                            msg:'This field is required.'
                        }
                    ],
                    cssClasses:{
                        inputParentClass:'col-md-6',
                        labelClass:'control-label',
                        inputContainerClass:''
                    },
                    clearFix:true
                },
                {
                    name: "medicine_start_date",
                    title: "Start Date",
                    value: "",
                    type: "date",  
                    showOnForm: true,
                    format: 'DD/MM/YYYY',
                    validations:[
                        {
                            isRequired:true,
                            msg:'Required.'
                        }
                    ],
                    cssClasses:{
                        inputParentClass:'col-md-4',
                        labelClass:'control-label',
                        inputContainerClass:''
                    },
                    clearFix:true
                },
                {
                    name: "medicine_dose",
                    title: "Qty (Morning)",
                    value:"0",
                    type: "text",
                    showOnForm: true,
                    validations:[
                        {
                            isRequired:false,
                            msg:'Required.'
                        }
                    ],
                    cssClasses:{
                        inputParentClass:'col-md-3',
                        labelClass:'control-label',
                        inputContainerClass:''
                    },
                },
                {
                    name: "medicine_dose2",
                    title: "Qty (Afternoon)",
                    value:"0",
                    type: "text",
                    showOnForm: true,
                    validations:[
                        {
                            isRequired:false,
                            msg:'Required.'
                        }
                    ],
                    cssClasses:{
                        inputParentClass:'col-md-3',
                        labelClass:'control-label',
                        inputContainerClass:''
                    },
                },
                {
                    name: "medicine_dose3",
                    title: "Qty (Night)",
                    value:"0",
                    type: "text",
                    showOnForm: true,
                    validations:[
                        {
                            isRequired:false,
                            msg:'Required.'
                        }
                    ],
                    cssClasses:{
                        inputParentClass:'col-md-3',
                        labelClass:'control-label',
                        inputContainerClass:''
                    },
                },
                {
                    name: "medicine_dose_unit",
                    title: "Unit",
                    value:"",
                    type: "select",  
                    showOnForm: true,
                    validations:[
                        {
                            isRequired:true,
                            msg:'Required.'
                        }
                    ],
                    cssClasses:{
                        inputParentClass:'col-md-3',
                        labelClass:'control-label',
                        inputContainerClass:''
                    },
                    clearFix:true
                },
                {
                    name: "medicine_meal_opt",
                    title: " ",
                    value:[],
                    type: "customcheckbox",  
                    showOnForm: true,
                    cssClasses:{
                        inputParentClass:'col-md-12',
                        labelClass:'control-label',
                        inputContainerClass:''
                    },
                },
                {
                    name: "medicine_instractions",
                    title: "Instructions",
                    value: [],
                    type: "tags",  
                    showOnForm: true,
                    placeholder: 'Instructions separated by press enter or comma',
                    cssClasses:{
                        inputParentClass:'col-md-12',
                        labelClass:'control-label',
                        inputContainerClass:''
                    },
                },
                {
                    name: "pmh_id",
                    title: "",
                    value:"",
                    type: "hidden",  
                    showOnForm: true,
                },
                {
                    name: "prev_medicine_id",
                    title: "",
                    value:"",
                    type: "hidden",  
                    showOnForm: true,
                },
            ],
            data: {
                medicine_duration_unit_data: [
                    { value: '1', label: 'day(s)' },
                    { value: '2', label: 'week(s)' },
                    { value: '3', label: 'month(s)' }
                 ],
                medicine_frequency_data:[
                    { value: '1', label: 'Ones in a day' },
                    { value: '2', label: 'Twice in a day' },
                    { value: '3', label: 'Thrice in a day' },
                    { value: '4', label: 'Freely as needed' }
                 ],
                medicine_dose_unit_data:[],
                medicine_route_data:[
                    { value: '1', label: 'PO' },
                    { value: '2', label: 'IM' },
                    { value: '3', label: 'IV' }
                 ],
                medicine_meal_opt_data:[
                    { value: '1', label: 'Before Meal' },
                    { value: '2', label: 'After Meal' }
                 ],
                medicine_name_data: [],
                medicine_instractions_data: [],
                medicine_start_date : moment(),
            },
           handlers:{               
           }
        };
        
export default formConfig;