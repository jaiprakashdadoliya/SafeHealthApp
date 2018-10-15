import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../../global';
import { patientDomesticFactorActions } from './../patientDomesticFactorActions';

const PatientResidentialLocation = Loadable({
    loader: () => import('./PatientResidentialLocation' /* webpackChunkName = "PatientResidentialLocation" */).then(object => object.PatientResidentialLocation),
    loading: Loading
});

export class PatientResidentialLocationContainer extends React.Component {
    
	constructor(props){
		super(props);

        this.boundFormResidentialLocation = undefined;
        this.handleBoundFormResidentialLocationUpdate = this.handleBoundFormResidentialLocationUpdate.bind(this);
        this.getResidentialLocationData = this.getResidentialLocationData.bind(this);

	}

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getResidentialLocationData() {
       if(this.boundFormResidentialLocation){
            let data = this.boundFormResidentialLocation.getData();
            if (data) {
                return data;
            } 
       }
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormResidentialLocationUpdate(data){
        this.boundFormResidentialLocation = data;
    }
	
    render() {
        return (
            <div >
                <PatientResidentialLocation 
					successMessage                                     = {this.props.successMessage}
                    errorMsg                                           = {this.props.errorMsg}
                    patId                                              = {this.props.patId}
                    visitId                                            = {this.props.visitId}
                    formConfig                                         = {this.props.formData}
                    handleBoundFormResidentialLocationUpdate           = {this.handleBoundFormResidentialLocationUpdate}
                    getResidentialLocationData                         = {this.getResidentialLocationData}
                />
            </div>
        );
    }
}