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
                    validations:[
                        {
                            isRequired:true,
                            msg:'This field is required.'
                        }
                    ]
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
                    name: "pat_dob",
                    title: "DOB",
                    value:"",
                    disableDate:'before',
                    type: "date",
                    showOnForm: true,
                    format: configConstants.DATE_FORMAT,
                    validations:[
                        {
                            isRequired:true,
                            msg:'This field is required.'
                        }
                    ]
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
                    ]
                },
                {
                    name: "doc_ref_name",
                    title: "Doctor Refered by",
                    value:"",
                    type: "select",
                    showOnForm: true,
                    clearFix:true,
                    validations:[
                        {
                            isRequired:true,
                            msg:'This field is required.'
                        }
                    ],
                clearFix:true,
                }
            ],
            data: {
                pat_title_data: [{'label':'Mr','value':'1'},{'label':'Ms','value':'2'},{'label':'Mrs','value':'3'}],
                user_gender_data: [{'label':'Male','value':'1'},{'label':'Female','value':'2'},{'label':'other','value':'3'}],
                pat_recruitment_date : moment(),
                doc_ref_name_data:[{'label':'Dr Salil Bhargav','value':'1'},{'label':'Dr Vinay Bhohra','value':'2'}],
            },
           handlers:{
           }
        };
        
export default formConfig;