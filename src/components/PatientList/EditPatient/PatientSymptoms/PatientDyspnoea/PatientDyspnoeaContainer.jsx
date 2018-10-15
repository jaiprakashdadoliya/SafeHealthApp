import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../../global';

const PatientDyspnoea = Loadable({
    loader: () => import('./PatientDyspnoea' /* webpackChunkName = "PatientDyspnoea" */).then(object => object.PatientDyspnoea),
    loading: Loading
});

export class PatientDyspnoeaContainer extends React.Component {
    
	constructor(props){
		super(props);
        this.boundFormDyspnoea = undefined;
        this.handleBoundFormDyspnoeaUpdate = this.handleBoundFormDyspnoeaUpdate.bind(this);
        this.getDyspnoeaData = this.getDyspnoeaData.bind(this);

	}

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormDyspnoeaUpdate(data){
        this.boundFormDyspnoea = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getDyspnoeaData() {
       if(this.boundFormDyspnoea){
            let data = this.boundFormDyspnoea.getData();
            if (data) {
                return data;
            } 
       }
    }
	
    render() {
        return (
            <div>
                <PatientDyspnoea 
                    patId                      = {this.props.patId}
                    visitId                    = {this.props.visitId}
                    formConfig                 = {this.props.formData}
                    handleBoundFormDyspnoeaUpdate = {this.handleBoundFormDyspnoeaUpdate}
                    getDyspnoeaData               = {this.getDyspnoeaData}
                />
            </div>
        );
    }
}