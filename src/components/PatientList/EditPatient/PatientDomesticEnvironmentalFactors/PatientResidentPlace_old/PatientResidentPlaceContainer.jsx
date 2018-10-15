import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../../global';
import { patientDomesticFactorActions } from './../patientDomesticFactorActions';

const PatientResidentPlace = Loadable({
    loader: () => import('./PatientResidentPlace' /* webpackChunkName = "PatientResidentPlace" */).then(object => object.PatientResidentPlace),
    loading: Loading
});

export class PatientResidentPlaceContainer extends React.Component {

	constructor(props){
		super(props);
        this.boundFormPlace = undefined;
        this.handleBoundFormpPlaceUpdate = this.handleBoundFormpPlaceUpdate.bind(this);
        this.getPlaceData = this.getPlaceData.bind(this);

	}

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormpPlaceUpdate(data){
        this.boundFormPlace = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getPlaceData() {
       if(this.boundFormPlace){
            let data = this.boundFormPlace.getData();
            if (data) {
                return data;
            } 
       }
    }
    
    render() {
        return (
            <div >
                <PatientResidentPlace 
					successMessage                                     = {this.props.successMessage}
                    errorMsg                                           = {this.props.errorMsg}
                    patId                                              = {this.props.patId}
                    visitId                                            = {this.props.visitId}
                    formConfig                                         = {this.props.formData}
                    handleBoundFormpPlaceUpdate                        = {this.handleBoundFormpPlaceUpdate}
                    getPlaceData                                       = {this.getPlaceData}
                />
            </div>
        );
    }
}
