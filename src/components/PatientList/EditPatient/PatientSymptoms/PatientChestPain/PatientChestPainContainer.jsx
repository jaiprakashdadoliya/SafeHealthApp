import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../../global';

const PatientChestPain = Loadable({
    loader: () => import('./PatientChestPain' /* webpackChunkName = "PatientChestPain" */).then(object => object.PatientChestPain),
    loading: Loading
});

export class PatientChestPainContainer extends React.Component {
    
	constructor(props){
		super(props);
        this.boundFormChestPain = undefined;
        this.handleBoundFormChestPainUpdate = this.handleBoundFormChestPainUpdate.bind(this);
        this.getChestPainData = this.getChestPainData.bind(this);

	}

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormChestPainUpdate(data){
        this.boundFormChestPain = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getChestPainData() {
       if(this.boundFormChestPain){
            let data = this.boundFormChestPain.getData();
            if (data) {
                return data;
            } 
       }
    }
	
    render() {
        return (
            <div>
                <PatientChestPain 
                    patId                      = {this.props.patId}
                    visitId                    = {this.props.visitId}
                    formConfig                 = {this.props.formData}
                    handleBoundFormChestPainUpdate = {this.handleBoundFormChestPainUpdate}
                    getChestPainData               = {this.getChestPainData}
                />
            </div>
        );
    }
}