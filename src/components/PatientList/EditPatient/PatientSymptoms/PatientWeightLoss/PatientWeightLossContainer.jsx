import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../../global';

const PatientWeightLoss = Loadable({
    loader: () => import('./PatientWeightLoss' /* webpackChunkName = "PatientWeightLoss" */).then(object => object.PatientWeightLoss),
    loading: Loading
});

export class PatientWeightLossContainer extends React.Component {
    
	constructor(props){
		super(props);
        this.boundFormWeightLoss = undefined;
        this.handleBoundFormWeightLossUpdate = this.handleBoundFormWeightLossUpdate.bind(this);
        this.getWeightLossData = this.getWeightLossData.bind(this);

	}

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormWeightLossUpdate(data){
        this.boundFormWeightLoss = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getWeightLossData() {
       if(this.boundFormWeightLoss){
            let data = this.boundFormWeightLoss.getData();
            if (data) {
                return data;
            } 
       }
    }
	
    render() {
        return (
            <div>
                <PatientWeightLoss 
                    patId                      = {this.props.patId}
                    visitId                    = {this.props.visitId}
                    formConfig                 = {this.props.formData}
                    handleBoundFormWeightLossUpdate = {this.handleBoundFormWeightLossUpdate}
                    getWeightLossData               = {this.getWeightLossData}
                />
            </div>
        );
    }
}