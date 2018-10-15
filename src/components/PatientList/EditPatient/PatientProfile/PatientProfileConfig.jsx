import moment from 'moment';
import {configConstants} from '../../../../_constants/configConstants';
var patientProfileFormConfig = {
            fields: [
            	{
                    name: "pat_code",
                    title: "Registration Number",
                    value:"",
                    type: "text",
                    showOnForm: true,
                    readOnly: true,
                    validations:[
                        {
                            isRequired:true,
                            msg:'This field is required.'
                        }
                    ],
                    cssClasses:{
                        inputParentClass:'col-md-3',
                        labelClass:'control-label',
                        inputContainerClass:''
                    }
                },
                {
                    name: "pat_title",
                    title: "Title",
                    value:"",
                    type: "select",
                    showOnForm: true,
                    cssClasses:{
                        inputParentClass:'col-md-3',
                        labelClass:'control-label',
                        inputContainerClass:''
                    }
                },
                {
                    name: "user_firstname",
                    title: "First Name",
                    type: "text",
                    value:"",
                    showOnForm: true,
                    validations:[
                        {
                            isRequired:true,
                            msg:'This field is required.'
                        }
                    ],
                    cssClasses:{
                        inputParentClass:'col-md-3',
                        labelClass:'control-label',
                        inputContainerClass:''
                    }
                },  
                {
                    name: "user_lastname",
                    title: "Last Name",
                    type: "text",
                    value:"",
                    showOnForm: true,
                    clearFix:true,
                    validations:[
                        {
                            isRequired:true,
                            msg:'This field is required.'
                        }
                    ],
                    cssClasses:{
                        inputParentClass:'col-md-3',
                        labelClass:'control-label',
                        inputContainerClass:''
                    }
                },   
                {
                    name: "user_gender",
                    title: "Gender",
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
                        inputParentClass:'col-md-3',
                        labelClass:'control-label',
                        inputContainerClass:''
                    }
                },   
                {
                    name: "pat_blood_group",
                    title: "Blood Group",
                    value:"",
                    type: "select",
                    showOnForm: true,
                    cssClasses:{
                        inputParentClass:'col-md-3',
                        labelClass:'control-label',
                        inputContainerClass:''
                    }
                },
                {
                    name: "pat_dob",
                    title: "DOB",
                    value:"",
                    disableDate:'before',
                    type: "date",
                    showOnForm: true,
                    readOnly: true,
                    format: configConstants.DATE_FORMAT,
                    cssClasses:{
                        inputParentClass:'col-md-3',
                        labelClass:'control-label',
                        inputContainerClass:''
                    }
                },                               
                {
                    name: "user_adhaar_number",
                    title: "Aadhar Number",
                    value:"",
                    type: "text",
                    showOnForm: true,
                    readOnly: true,
                    maxLength:12,
                    clearFix:true,
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
                    }
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
                    cssClasses:{
                        inputParentClass:'col-md-3',
                        labelClass:'control-label',
                        inputContainerClass:''
                    }
                },
                {
                    name: "user_mobile",
                    title: "Mobile Number",
                    restrictType: "digitsOnly",
                    value:"",
                    type: "text",
                    showOnForm: true,
                    maxLength:10,
                    validations:[
                        {
                            isRequired:true,
                            msg:'This field is required.'
                        }
                    ],
                    cssClasses:{
                        inputParentClass:'col-md-3',
                        labelClass:'control-label',
                        inputContainerClass:''
                    }
                },
                {
                    name: "pat_phone_num",
                    title: "Phone number",
                    restrictType: "digitsOnly",
                    value:"",
                    type: "text",
                    showOnForm: true,
                    maxLength:10,
                    cssClasses:{
                        inputParentClass:'col-md-3',
                        labelClass:'control-label',
                        inputContainerClass:''
                    }
                },
                {
                    name: "pat_emergency_contact_number",
                    title: "Emergency contact number",
                    restrictType: "digitsOnly",
                    value:"",
                    type: "text",
                    showOnForm: true,
                    maxLength:10,
                    cssClasses:{
                        inputParentClass:'col-md-3',
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
                                inputParentClass:'col-md-3',
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
                    cssClasses:{
                        inputParentClass:'col-md-3',
                        labelClass:'control-label',
                        inputContainerClass:''
                    }
                },
                {
                    name: "pat_locality",
                    title: "Locality",
                    value:"",
                    type: "text",
                    showOnForm: true,
                    cssClasses:{
                        inputParentClass:'col-md-3',
                        labelClass:'control-label',
                        inputContainerClass:''
                    }                    
                },
                {
                    name: "country_id",
                    title: "Country",
                    value:"",
                    type: "select",
                    showOnForm: true,
                    cssClasses:{
                        inputParentClass:'col-md-3 hide',
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
                    cssClasses:{
                        inputParentClass:'col-md-3',
                        labelClass:'control-label',
                        inputContainerClass:''
                    }
                },
                {
                    name: "city_id",
                    title: "City",
                    value:"",
                    type: "select",                    
                    // clearFix:true,
                    showOnForm: true,
                    cssClasses:{
                        inputParentClass:'col-md-3',
                        labelClass:'control-label',
                        inputContainerClass:''
                    }
                },
                {
                    name: "pat_other_city",
                    title: "Other City",
                    value:"",
                    type: "text",
                    showOnForm: false,
                    cssClasses:{
                        inputParentClass:'col-md-3',
                        labelClass:'control-label',
                        inputContainerClass:''
                    }
                },
                {
                    name: "pat_pincode",
                    title: "Pin code",
                    restrictType: "digitsOnly",
                    value:"",
                    type: "text",
                    maxLength:6,
                    showOnForm: true,
                    cssClasses:{
                        inputParentClass:'col-md-3',
                        labelClass:'control-label',
                        inputContainerClass:''
                    }
                },
                {
                    name: "pat_religion",
                    title: "Religion",
                    value:"",
                    type: "select",                    
                    showOnForm: true,
                    clearFix: false,
                    cssClasses:{
                        inputParentClass:'col-md-3',
                        labelClass:'control-label',
                        inputContainerClass:''
                    }
                },

                {
                    name: "doc_ref_name",
                    idField: "doc_ref_id",
                    title: "Referred  By",
                    value:"",
                    type: "autocomplete",
                    showOnForm: true,
                    cssClasses:{
                        inputParentClass:'col-md-3',
                        labelClass:'control-label',
                        inputContainerClass:''
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
                        inputParentClass:'col-md-3',
                        labelClass:'control-label',
                        inputContainerClass:''
                    },
                    
                },
                {
                    name: "pat_occupation",
                    title: "Occupation",
                    value:"",
                    type: "text",
                    showOnForm: true,
                    cssClasses:{
                        inputParentClass:'col-md-3',
                        labelClass:'control-label',
                        inputContainerClass:''
                    },
                    // clearFix:true
                },
                {
                    name: "pat_education",
                    title: "Education",
                    value:"",
                    type: "text",
                    showOnForm: true,
                    cssClasses:{
                        inputParentClass:'col-md-3',
                        labelClass:'control-label',
                        inputContainerClass:''
                    }
                },
                {
                    name: "pat_marital_status",
                    title: "Marital Status",
                    value:"",
                    type: "customcheckbox",
                    placeholder:"",
                    showOnForm: true,
                    cssClasses:{
                        inputParentClass:'col-md-3',
                        labelClass:'control-label',
                        inputContainerClass:''
                    },
                    clearFix: true
                },
                {
                    name: "pat_number_of_children",
                    title: "Children",
                    value:"",
                    type: "text",
                    placeholder:"Children",
                    showOnForm: false,
                    cssClasses:{
                        inputParentClass:'col-md-3',
                        labelClass:'control-label',
                        inputContainerClass:''
                    }
                },
                {
                    name: "pat_id",
                    title: "",
                    value:"",
                    type: "hidden",
                    showOnForm: true,
                },
                {
                    name: "user_id",
                    title: "",
                    value:"",
                    type: "hidden",
                    showOnForm: true,
                },
                {
                    name: "user_country_code",
                    title: "",
                    value:"",
                    type: "hidden",
                    showOnForm: true,
                },
            ],
            data: {
                pat_title_data: [
                	{ value: '1', label: 'Mr' },
                	{ value: '2', label: 'Ms' },
                	{ value: '3', label: 'Mrs' },
                	{ value: '4', label: 'Dr' },
                	{ value: '5', label: 'Master' }
                ],
                user_gender_data: [
                	{ value: '1', label: 'Male' },
                	{ value: '2', label: 'Female' },
                	{ value: '3', label: 'Transgender' }
                ],
                pat_blood_group_data: [
                	{ value: '1', label: 'A-' },
                	{ value: '2', label: 'A+' },
                	{ value: '3', label: 'B-' },
                	{ value: '4', label: 'B+' },
                	{ value: '5', label: 'O-' },
                	{ value: '6', label: 'O+' },
                	{ value: '7', label: 'AB-' },
                	{ value: '8', label: 'AB+' }
                ],
                pat_marital_status_data:[
			    	{ value: '1', label: 'Yes' },
                	{ value: '2', label: 'No' }
			    ],
			    pat_religion_data:[
			    	{ value: '1', label: 'Hindu' },
                	{ value: '2', label: 'Muslim' },
                	{ value: '3', label: 'Christian' },
                    { value: '4', label: 'other' }
			    ],
                country_id_data: [],
                state_id_data: [],
                city_id_data: [],
                doc_ref_name_data:[],
                pat_group_name_data:[],
                doc_ref_name_data:[],
                pat_group_name_data:[],
                pat_dob: moment()
            },
           handlers:{
           }
        };
        
export default patientProfileFormConfig;