import React from "react";
import moment from 'moment';
import {DoctorMediaContainer} from '../../../DoctorProfile/DoctorMedia';

export const PreviousPrescription = (props) => {
    return (
        <DoctorMediaContainer 
            patId = {props.patId}
            mediaTitle = 'Previous Prescription'
        />
    );
}
