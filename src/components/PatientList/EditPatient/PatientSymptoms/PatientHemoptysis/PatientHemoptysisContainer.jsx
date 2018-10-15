import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../../global';

const PatientHemoptysis = Loadable({
    loader: () => import('./PatientHemoptysis' /* webpackChunkName = "PatientHemoptysis" */).then(object => object.PatientHemoptysis),
    loading: Loading
});

export class PatientHemoptysisContainer extends React.Component {
    
	constructor(props){
		super(props);
        this.boundFormHemoptysis = undefined;
        this.handleBoundFormHemoptysisUpdate = this.handleBoundFormHemoptysisUpdate.bind(this);
        this.getHemoptysisData = this.getHemoptysisData.bind(this);

	}

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormHemoptysisUpdate(data){
        this.boundFormHemoptysis = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getHemoptysisData() {
       if(this.boundFormHemoptysis){
            let data = this.boundFormHemoptysis.getData();
            if (data) {
                return data;
            } 
       }
    }
	
    render() {
        return (
            <div>
                <PatientHemoptysis 
                    patId                      = {this.props.patId}
                    visitId                    = {this.props.visitId}
                    formConfig                 = {this.props.formData}
                    handleBoundFormHemoptysisUpdate = {this.handleBoundFormHemoptysisUpdate}
                    getHemoptysisData               = {this.getHemoptysisData}
                />
            </div>
        );
    }
}