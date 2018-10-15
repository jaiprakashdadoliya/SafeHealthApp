import React from "react";
import DatePicker from 'react-datepicker';
import moment from "moment";
import {configConstants} from "../_constants";
import {utilityHelper} from "../_helpers";
import 'react-datepicker/dist/react-datepicker.css';
export const DatePickerData = (props) => {
	let value = props.selectedValue;
	if(value == "" || value == null){
        value = null;
    }else if(typeof value == 'string' && value != '' && value!= undefined) {
        value = value && moment(value);
    }
    
    // disable specific date like weekend days, future date,or past days
    var valid = props.disableDate != undefined && props.disableDate !='' ? utilityHelper.dateShowValidation(props.disableDate) :'';
    return (
        <div>
	        <DatePicker
				selected={value}
				dateFormat={configConstants.DATE_FORMAT}
				onChange={(selected, name) => props.onChange(selected,props.name)}
				name={props.name}
				peekNextMonth
				showMonthDropdown
				showYearDropdown
				dropdownMode="select"
				readOnly
				placeholderText={ typeof props.placeholder !== undefined && props.placeholder !='' ? props.placeholder : 'Date'}
				className={ typeof props.className !== undefined && props.className !='' ? props.className : ''}
				{...valid}
			/>
        </div>
    );
}