import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../../global';

const PatientFever = Loadable({
    loader: () => import('./PatientFever' /* webpackChunkName = "PatientFever" */).then(object => object.PatientFever),
    loading: Loading
});

export class PatientFeverContainer extends React.Component {
    
	constructor(props){
		super(props);
        this.boundFormFever = undefined;
        this.handleBoundFormFeverUpdate = this.handleBoundFormFeverUpdate.bind(this);
        this.getFeverData = this.getFeverData.bind(this);

	}

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormFeverUpdate(data){
        this.boundFormFever = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getFeverData() {
       if(this.boundFormFever){
            let data = this.boundFormFever.getData();
            if (data) {
                return data;
            } 
       }
    }
	
    render() {
        return (
            <div>
                <PatientFever 
                    patId                      = {this.props.patId}
                    visitId                    = {this.props.visitId}
                    formConfig                 = {this.props.formData}
                    handleBoundFormFeverUpdate = {this.handleBoundFormFeverUpdate}
                    getFeverData               = {this.getFeverData}
                />
            </div>
        );
    }
}