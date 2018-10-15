import React from "react";
import { faMobileAlt, faUser, faTint } from '@fortawesome/fontawesome-free-solid';
import {fontawesome, FontAwesomeIcon} from '../global';
import { configConstants } from '../_constants';

export const PatientInfoHeader = (props) => {
	return(
        <div className="patient-info">
            <div className="patient-profile-img">
                 <img src={(props.pat_profile_img) ? props.pat_profile_img : configConstants.DEFAULT_IMAGE_PATH} />
            </div>
            <div className="patient-details-wrap">
                <div className="patient-name-code">
                    {props.user_firstname} {props.user_lastname}
                    <span>Registration Number: {props.pat_code}</span></div>
                    <div className="patient-other-details">
                        <span>
                            {props.visit_date != '' ? ' Visit Date: '+ props.visit_date+' | ' : ''}
                            <FontAwesomeIcon icon={faMobileAlt} />{' '+props.country_code_sign+props.country_code} {props.mobile} 
                            {props.blood_group !== '' ? ' | ' : ''}
                            {props.blood_group !== '' ? <FontAwesomeIcon icon={faTint} /> :''} {props.blood_group}
                            <div className="red-color allergies-box">
                            	{props.allergy_type_value != '' ? 'Allergies: ' : ''}{props.allergy_type_value}
                            </div>
                        </span>
                </div>
            </div>
        </div>   
    );
}