import moment from 'moment';
var formConfig = {
            fields: [ 
                {
                    name: "wef_is_working_location_outside",
                    title: "Working outside house",
                    value:[""],
                    type: "customcheckbox",                    
                    showOnForm: true,
                    cssClasses:{
                        inputParentClass:'col-md-12',
                        labelClass:'col-md-8',
                        inputContainerClass:'col-md-4',
                        inputGroupClass:'form-group checkbox-listing checkbox-formgroup'
                    }
                }, 
                {
                    name: "wef_is_smoky_dust",
                    title: "Exposed to visibly smoky or dusty air?",
                    value:[""],
                    type: "customcheckbox",                    
                    showOnForm: true,
                    cssClasses:{
                        inputParentClass:'col-md-12',
                        labelClass:'col-md-8',
                        inputContainerClass:'col-md-4',
                        inputGroupClass:'form-group checkbox-listing checkbox-formgroup'
                    }
                }, 
                {
                    name: "wef_use_of_protective_masks",
                    title: "Use of protective masks while working",
                    value:[""],
                    type: "customcheckbox",                    
                    showOnForm: true,
                    cssClasses:{
                        inputParentClass:'col-md-12',
                        labelClass:'col-md-8',
                        inputContainerClass:'col-md-4',
                        inputGroupClass:'form-group checkbox-listing checkbox-formgroup'
                    }
                },               
                {
                    name: "wef_occupation",
                    title: "Occupation",
                    value:"",
                    type: "text",   
                    showOnForm: true,
                    cssClasses:{
                        inputParentClass:'col-md-4',
                        labelClass:'control-label',
                        inputContainerClass:'',
                        inputGroupClass:'form-group'
                    },
                    validations:[
                        {
                            isRequired:true,
                            msg:'This field is required.'
                        }
                    ]
                },
                {
                    name: "wef_worked_from_month",
                    title: "Worked from month",
                    value:"",
                    type: "select",
                    showOnForm: true,
                    cssClasses:{
                        inputParentClass:'col-md-4',
                        labelClass:'control-label',
                        inputContainerClass:'',
                        inputGroupClass:'form-group'
                    },
                },
                {
                    name: "wef_worked_from_year",
                    title: "Worked from year",
                    value:"",
                    type: "select",
                    showOnForm: true,
                    cssClasses:{
                        inputParentClass:'col-md-4',
                        labelClass:'control-label',
                        inputContainerClass:'',
                        inputGroupClass:'form-group'
                    },
                    clearFix:true,
                },
                {
                    name: "wef_worked_to_month",
                    title: "Worked to month",
                    value:"",
                    type: "select",
                    showOnForm: true,
                    cssClasses:{
                        inputParentClass:'col-md-4',
                        labelClass:'control-label',
                        inputContainerClass:'',
                        inputGroupClass:'form-group'
                    }
                    
                },
                {
                    name: "wef_worked_to_year",
                    title: "Worked to year",
                    value:"",
                    type: "select",
                    showOnForm: true,
                    cssClasses:{
                        inputParentClass:'col-md-4',
                        labelClass:'control-label',
                        inputContainerClass:'',
                        inputGroupClass:'form-group'
                    }
                    
                },
                {
                    name: "wef_exposures",
                    title: "Exposures",
                    value:"",
                    type: "text",   
                    showOnForm: true,
                    clearFix:true,
                    cssClasses:{
                        inputParentClass:'col-md-4',
                        labelClass:'control-label',
                        inputContainerClass:'',
                        inputGroupClass:'form-group'
                    }
                },
                {
                    name:"wef_id",
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
                wef_is_working_location_outside_data: [],
                wef_is_smoky_dust_data: [],
                wef_use_of_protective_masks_data: [],
                wef_worked_from_month_data: [],
                wef_worked_from_year_data: [],
                wef_worked_to_month_data: [],
                wef_worked_to_year_data: [],
            },
           handlers:{               
           }
        };
        
export default formConfig;