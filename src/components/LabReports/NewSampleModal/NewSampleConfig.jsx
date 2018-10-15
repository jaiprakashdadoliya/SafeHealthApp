import moment from 'moment';
import {configConstants} from '../../../_constants/configConstants';
var formConfig = {
            fields: [
                {
                    name: "sample_date",
                    title: "Date of sample",
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
                    ],
                    clearFix:true,
                },    
            ],
            data: {
            },
           handlers:{
           }
        };
        
export default formConfig;