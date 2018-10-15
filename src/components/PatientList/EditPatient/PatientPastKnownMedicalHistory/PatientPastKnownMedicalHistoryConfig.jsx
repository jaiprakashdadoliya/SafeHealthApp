import moment from 'moment';
import {configConstants} from '../../../../_constants/configConstants';
var formConfig = {
            fields: [ 
                {
                    name: "disease_id",
                    title: "Disease/Disorder Name",
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
                    name: "disease_onset",
                    title: "Onset",
                    value:"",
                    type: "text",                    
                    showOnForm: true,
                    cssClasses:{
                        inputParentClass:'col-md-2',
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
                    name: "disease_duration",
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
                    validations:[
                        {
                            isRequired:true,
                            msg:'This field is required.'
                        }
                    ],
                    clearFix:true
                },
                {
                    name: "disease_end_date",
                    title: "End Date",
                    value: '',
                    type: "date",                    
                    showOnForm: true,
                    format: configConstants.DATE_FORMAT,
                    cssClasses:{
                        inputParentClass:'col-md-4',
                        labelClass:'form-group',
                        inputContainerClass:'',
                        inputGroupClass:''
                    },
                    validations:[
                        {
                            isRequired:false,
                            msg:'This field is required.'
                        }
                    ],
                },
                {
                    name: "disease_status",
                    title: "Cynosis",
                    value:["1"],
                    type: "customcheckbox",                    
                    showOnForm: true,
                    cssClasses:{
                        inputParentClass:'col-md-8',
                        labelClass:'',
                        inputContainerClass:'check-list-radio',
                        inputGroupClass:'form-group checkbox-formgroup'
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
                    name:"ppmh_id",
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
                disease_duration_data: [],
                disease_id_data: [],
                disease_status_data:[],
                disease_end_date: moment()
            },
           handlers:{               
           }
        };
        
export default formConfig;