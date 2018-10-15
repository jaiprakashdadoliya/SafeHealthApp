import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from '../../../../global';
import { PatientVitals } from './PatientVitals';


export class PatientVitalsContainer extends React.Component {
	constructor(props){
        super(props);
        this.boundFormVitals        = undefined;
        this.handleBoundFormVitals  = this.handleBoundFormVitals.bind(this);
        this.getVitalsData          = this.getVitalsData.bind(this);
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormVitals(data){
        this.boundFormVitals = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getVitalsData() {
       if(this.boundFormVitals){
            let data = this.boundFormVitals.getData();
            if (data) {
                return data;
            } 
       }
    }

    render() {
            return (
                <PatientVitals 
                    vitalsFormData          = {this.props.vitalsFormData}
                    visitDatafetched        = {this.props.visitDatafetched}
                    handleBoundFormVitals   = {this.handleBoundFormVitals}
                    getVitalsData           = {this.getVitalsData}
                />
            );
    }
}