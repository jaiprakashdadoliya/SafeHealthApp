import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../../global';
import { patientDomesticFactorActions } from './../patientDomesticFactorActions';

const PatientCooking = Loadable({
    loader: () => import('./PatientCooking' /* webpackChunkName = "PatientCooking" */).then(object => object.PatientCooking),
    loading: Loading
});

export class PatientCookingContainer extends React.Component {

	constructor(props){
		super(props);
        this.boundFormHosueCondition = undefined;
        this.handleBoundFormCookingUpdate = this.handleBoundFormCookingUpdate.bind(this);
        this.getCookingData = this.getCookingData.bind(this);

	}

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormCookingUpdate(data){
        this.boundFormCooking = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getCookingData() {
       if(this.boundFormCooking){
            let data = this.boundFormCooking.getData();
            if (data) {
                return data;
            } 
       }
    }
	
    render() {
        return (
            <div >
                <PatientCooking 
					successMessage                                     = {this.props.successMessage}
                    errorMsg                                           = {this.props.errorMsg}
                    patId                                              = {this.props.patId}
                    visitId                                            = {this.props.visitId}
                    formConfig                                         = {this.props.formData}
                    handleBoundFormCookingUpdate                       = {this.handleBoundFormCookingUpdate}
                    getCookingData                                     = {this.getCookingData}
                />
            </div>
        );
    }
}