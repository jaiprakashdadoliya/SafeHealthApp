import moment from 'moment';
import {configConstants} from '../../../_constants';
var formConfig = {
            fields: [ 
                {
                    name    : "clinic_id",
                    title   : "Clinic",
                    value   : "",
                    type    : "select",  
                    showOnForm: true,
                    validations:[
                        {
                            isRequired:true,
                            msg:'This field is required.'
                        }
                    ],
                    cssClasses:{
                        inputParentClass:'col-md-3'
                    } 
                },
                {
                    name    : "booking_date",
                    title   : "Appointment Date",
                    value   : null,
                    type    : "date",  
                    showOnForm: true,
                    format  : configConstants.DATE_FORMAT,
                    validations:[
                        {
                            isRequired:true,
                            msg:'This field is required.'
                        }
                    ],
                    cssClasses:{
                        inputParentClass:'col-md-3'
                    } 
                },                
                {
                    name: "booking_time",
                    title: "Appointment Time",
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
                        inputParentClass:'col-md-3'
                    } 
                },
                {
                    name: "booking_reason",
                    title: "Booking Reason",
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
                        inputParentClass:'col-md-3'
                    } 
                },
            ],
            data: {
                booking_time_data   : [],
                clinic_id_data      : [],
                booking_reason_data : [],
                booking_date        : moment()
            },
           handlers:{
           }
        };
        
export default formConfig;