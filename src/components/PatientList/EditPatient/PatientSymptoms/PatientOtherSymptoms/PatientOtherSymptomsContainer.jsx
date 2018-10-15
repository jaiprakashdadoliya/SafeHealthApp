import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../../global';

const PatientOtherSymptoms = Loadable({
    loader: () => import('./PatientOtherSymptoms' /* webpackChunkName = "PatientOtherSymptoms" */).then(object => object.PatientOtherSymptoms),
    loading: Loading
});

export class PatientOtherSymptomsContainer extends React.Component {
    
	constructor(props){
		super(props);
        this.boundFormOtherSymptoms = undefined;
        this.handleBoundFormOtherSymptomsUpdate = this.handleBoundFormOtherSymptomsUpdate.bind(this);
        this.getOtherSymptomsData = this.getOtherSymptomsData.bind(this);

	}

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormOtherSymptomsUpdate(data){
        this.boundFormOtherSymptoms = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getOtherSymptomsData() {
       if(this.boundFormOtherSymptoms){
            let data = this.boundFormOtherSymptoms.getData();
            if (data) {
                return data;
            } 
       }
    }
	
    render() {
        return (
            <div>
                <PatientOtherSymptoms 
                    patId                      = {this.props.patId}
                    visitId                    = {this.props.visitId}
                    formConfig                 = {this.props.formData}
                    handleBoundFormOtherSymptomsUpdate = {this.handleBoundFormOtherSymptomsUpdate}
                    getOtherSymptomsData               = {this.getOtherSymptomsData}
                />
            </div>
        );
    }
}