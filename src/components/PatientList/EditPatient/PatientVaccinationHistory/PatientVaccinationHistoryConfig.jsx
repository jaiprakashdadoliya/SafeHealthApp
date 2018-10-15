import moment from 'moment';
var vaccinationHistoryFormConfig = {
            fields: [                
                {
                    name: "vaccine_name",
                    title: "Name of Vaccine",
                    value:"",
                    type: "text",   
                    showOnForm: true,
                    validations:[
                        {
                            isRequired:true,
                            msg:'This field is required.'
                        }
                    ]
                },
                {
                    name: "vaccine_date",
                    title: "Date of Vaccination",
                    type: "date",
                    value:"",
                    showOnForm: true,
                    format:"DD/MM/YYYY",
                    clearFix:true,
                    validations:[
                        {
                            isRequired:true,
                            msg:'This field is required.'
                        }
                    ]
                },
                {
                    name:"vaccination_id",
                    value:"",
                    type: "hidden",
                    showOnForm: true
                }
            ],
            data: {},
            handlers:{}
        };        
export default vaccinationHistoryFormConfig;