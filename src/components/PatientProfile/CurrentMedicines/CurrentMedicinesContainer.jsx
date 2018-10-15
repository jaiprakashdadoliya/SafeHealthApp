import React from "react";
import { CurrentMedicines } from "./CurrentMedicines";

export class CurrentMedicinesContainer extends React.Component {
    render() {
        return (
            <CurrentMedicines 
            	filterAll               = { this.props.filterAll }
                filtered                = { this.props.filtered }
                patientMedicationSearch = { this.props.patientMedicationSearch }
                getPatientMedicationList= { this.props.getPatientMedicationList }
                pages                   = { this.props.pages}
                patientMedicationList   = { this.props.patientMedicationList}
            />
        );
    }
}
