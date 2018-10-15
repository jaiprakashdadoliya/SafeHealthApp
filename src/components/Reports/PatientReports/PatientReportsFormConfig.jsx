import moment from 'moment';
var PatientReportsFormConfig = {
            fields: [                
                {
                    name: "patient_state",
                    title: "State",
                    value:"",
                    type: "select",  
                    showOnForm: true,
                    validations:[
                        {
                            isRequired:false,
                            msg:'This field is required.'
                        }
                    ],
                    cssClasses:{
                        inputParentClass:'col-md-3',
                        labelClass:'control-label',
                        inputContainerClass:''
                    },
                },
                {
                    name: "patient_city",
                    title: "City",
                    value:"",
                    type: "select",  
                    showOnForm: true,
                    validations:[
                        {
                            isRequired:false,
                            msg:'This field is required.'
                        }
                    ],
                    cssClasses:{
                        inputParentClass:'col-md-3',
                        labelClass:'control-label',
                        inputContainerClass:''
                    },
                },
                {
                    name: "patient_group",
                    title: "Group",
                    value:"",
                    type: "select",  
                    showOnForm: true,
                    validations:[
                        {
                            isRequired:false,
                            msg:'This field is required.'
                        }
                    ],
                    cssClasses:{
                        inputParentClass:'col-md-3',
                        labelClass:'control-label',
                        inputContainerClass:''
                    },
                },
                {
                    name: "patient_referred_by",
                    title: "Referred By",
                    value:"",
                    type: "select",  
                    showOnForm: true,
                    validations:[
                        {
                            isRequired:false,
                            msg:'This field is required.'
                        }
                    ],
                    cssClasses:{
                        inputParentClass:'col-md-3',
                        labelClass:'control-label',
                        inputContainerClass:''
                    },
                },
                {
                    name: "patient_complaint",
                    title: "Complaint",
                    value:"",
                    type: "select",  
                    showOnForm: true,
                    validations:[
                        {
                            isRequired:false,
                            msg:'This field is required.'
                        }
                    ],
                    cssClasses:{
                        inputParentClass:'col-md-3',
                        labelClass:'control-label',
                        inputContainerClass:''
                    },
                },
                {
                    name: "patient_diagnosis",
                    title: "Diagnosis",
                    value:"",
                    type: "select",  
                    showOnForm: true,
                    validations:[
                        {
                            isRequired:false,
                            msg:'This field is required.'
                        }
                    ],
                    cssClasses:{
                        inputParentClass:'col-md-3',
                        labelClass:'control-label',
                        inputContainerClass:''
                    },
                },
                {
                    name: "patient_from_date",
                    title: "From Date",
                    value: "",
                    type: "date",  
                    showOnForm: true,
                    format: 'DD/MM/YYYY',
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
                    name: "patient_to_date",
                    title: "To Date",
                    value: "",
                    type: "date",  
                    showOnForm: true,
                    format: 'DD/MM/YYYY',
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
            ],
            data: {
                patient_state_data          : [],
                patient_city_data           : [],
                patient_group_data          : [],
                patient_referred_by_data    : [],
                patient_complaint_data      : [],
                patient_diagnosis_data      : [],
                patient_from_date           : moment(),
                patient_to_date             : moment(),
            },
            handlers:{}
        };
        
export default PatientReportsFormConfig;