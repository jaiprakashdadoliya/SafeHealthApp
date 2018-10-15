import moment from 'moment';
import {configConstants} from '../../../_constants/configConstants';
var formConfig = {
            fields: [
                {
                    name: "pat_title",
                    title: "Title",
                    value:"",
                    type: "select",
                    showOnForm: true,
                },
                {
                    name: "user_firstname",
                    title: "First Name",
                    type: "text",
                    value:"",
                    showOnForm: true,
                    clearFix:true,
                    validations:[
                        {
                            isRequired:true,
                            msg:'This field is required.'
                        }
                    ]
                },  
                {
                    name: "user_lastname",
                    title: "Last Name",
                    type: "text",
                    value:"",
                    showOnForm: true,
                    validations:[
                        {
                            isRequired:true,
                            msg:'This field is required.'
                        }
                    ]
                },   
                {
                    name: "user_gender",
                    title: "Gender",
                    value:"",
                    type: "select",
                    showOnForm: true,
                    clearFix:true,
                    validations:[
                        {
                            isRequired:true,
                            msg:'This field is required.'
                        }
                    ]
                },
                 {
                    name: "user_email",
                    title: "Email",
                    value:"",
                    type: "text",                    
                    showOnForm: true,
                    validations:[
                        {
                            isRequired:true,
                            msg:'This field is required.'
                        },
                        {
                            pattern:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            msg:'Please enter valid email address.'
                        }
                    ],
                    clearFix:false
                },      
                {
                    name: "user_mobile",
                    title: "Mobile Number",
                    restrictType: "digitsOnly",
                    value:"",
                    type: "text",
                    showOnForm: true,
                    maxLength:10,
                    clearFix:true,
                    validations:[
                        {
                            isRequired:true,
                            msg:'This field is required.'
                        }
                    ]
                },
                {
                    name: "pat_dob",
                    title: "DOB",
                    value:"",
                    disableDate:'before',
                    type: "date",
                    showOnForm: true,
                    format: configConstants.DATE_FORMAT,
                },    
                {
                    name: "pat_phone_num",
                    title: "Patient phone number",
                    restrictType: "digitsOnly",
                    value:"",
                    type: "text",
                    showOnForm: true,
                    maxLength:10,
                    clearFix:true,
                },
                {
                    name: "user_adhaar_number",
                    title: "Aadhar Number",
                    value:"",
                    type: "text",
                    showOnForm: true,
                    maxLength:12,
                    clearFix:false,
                    validations:[
                        {
                            isRequired:false,
                            msg:'This field is required.'
                        }
                    ],
                    cssClasses:{
                        inputParentClass:'col-md-6',
                        labelClass:'control-label',
                        inputContainerClass:''
                    }
                },  
                {
                    name: "pat_address_line1",
                    title: "Address line 1",
                    value:"",
                    type: "text",
                    showOnForm: true,
                    cssClasses:{
                                inputParentClass:'col-md-6',
                                labelClass:'control-label',
                                inputContainerClass:''
                            }
                },
                {
                    name: "pat_address_line2",
                    title: "Address line 2",
                    value:"",
                    type: "text",
                    showOnForm: true,
                    clearFix: false,
                    cssClasses:{
                                inputParentClass:'col-md-6',
                                labelClass:'control-label',
                                inputContainerClass:''
                            }
                },
                {
                    name: "pat_locality",
                    title: "Locality/Landmark",
                    value:"",
                    type: "text",
                    showOnForm: true,
                    clearFix: false,
                    
                },
                {
                    name: "country_id",
                    title: "Country",
                    value:"",
                    type: "select",
                    showOnForm: true,
                    clearFix: false,
                    cssClasses:{
                                inputParentClass:'col-md-6 hide',
                                labelClass:'',
                                inputContainerClass:''
                            }
                },
                {
                    name: "state_id",
                    title: "State",
                    value:"",
                    type: "select",
                    showOnForm: true,
                    clearFix: false,
                },
                {
                    name: "city_id",
                    title: "City",
                    value:"",
                    type: "select",
                    showOnForm: true,
                    clearFix: false,
                },
                {
                    name: "pat_other_city",
                    title: "Other City",
                    value:"",
                    type: "text",
                    clearFix: false,
                    showOnForm: false
                },
                {
                    name: "pat_pincode",
                    title: "Pincode",
                    restrictType: "digitsOnly",
                    value:"",
                    type: "text",
                    maxLength:6,
                    showOnForm: true,
                    clearFix: false,
                },
                {
                    name: "doc_ref_name",
                    idField: "doc_ref_id",
                    title: "Referral",
                    value:"",
                    type: "autocomplete",
                    showOnForm: true,
                    cssClasses:{
                        inputParentClass:'col-md-6',
                        labelClass:'control-label',
                        inputContainerClass:'col-md-3'
                    }
                },
                {
                    name: "pat_group_name",
                    idField: "pat_group_id",
                    title: "Patient Group",
                    value:"",
                    type: "autocomplete",
                    showOnForm: true,
                    cssClasses:{
                        inputParentClass:'col-md-6',
                        labelClass:'control-label',
                        inputContainerClass:'col-md-3'
                    },
                    clearFix:true
                },
            ],
            data: {
                pat_title_data: [],
                user_gender_data: [],
                country_id_data: [],
                state_id_data: [],
                city_id_data: [],
                pat_recruitment_date : moment(),
                doc_ref_name_data:[],
                pat_group_name_data:[],
            },
           handlers:{
           }
        };
        
export default formConfig;