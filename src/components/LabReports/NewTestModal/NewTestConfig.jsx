import moment from 'moment';
import {configConstants} from '../../../_constants/configConstants';
var formConfig = {
            fields: [
                {
                    name: "test_name",
                    title: "Test Name",
                    value:"",
                    type: "text",
                    showOnForm: true,
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
            },
           handlers:{
           }
        };
        
export default formConfig;