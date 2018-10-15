import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../../global';

const PatientWheeze = Loadable({
    loader: () => import('./PatientWheeze' /* webpackChunkName = "PatientWheeze" */).then(object => object.PatientWheeze),
    loading: Loading
});

export class PatientWheezeContainer extends React.Component {
    
	constructor(props){
		super(props);
        this.boundFormWheeze = undefined;
        this.handleBoundFormWheezeUpdate = this.handleBoundFormWheezeUpdate.bind(this);
        this.getWheezeData = this.getWheezeData.bind(this);

	}

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormWheezeUpdate(data){
        this.boundFormWheeze = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getWheezeData() {
       if(this.boundFormWheeze){
            let data = this.boundFormWheeze.getData();
            if (data) {
                return data;
            } 
       }
    }
	
    render() {
        return (
            <div>
                <PatientWheeze 
                    patId                      = {this.props.patId}
                    visitId                    = {this.props.visitId}
                    formConfig                 = {this.props.formData}
                    handleBoundFormWheezeUpdate = {this.handleBoundFormWheezeUpdate}
                    getWheezeData               = {this.getWheezeData}
                />
            </div>
        );
    }
}