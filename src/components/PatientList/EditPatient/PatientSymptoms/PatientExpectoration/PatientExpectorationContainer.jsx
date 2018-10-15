import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../../global';

const PatientExpectoration = Loadable({
    loader: () => import('./PatientExpectoration' /* webpackChunkName = "PatientExpectoration" */).then(object => object.PatientExpectoration),
    loading: Loading
});

export class PatientExpectorationContainer extends React.Component {
    
	constructor(props){
		super(props);
        this.boundFormExpectoration = undefined;
        this.handleBoundFormExpectorationUpdate = this.handleBoundFormExpectorationUpdate.bind(this);
        this.getExpectorationData = this.getExpectorationData.bind(this);

	}

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormExpectorationUpdate(data){
        this.boundFormExpectoration = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getExpectorationData() {
       if(this.boundFormExpectoration){
            let data = this.boundFormExpectoration.getData();
            if (data) {
                return data;
            } 
       }
    }
	
    render() {
        return (
            <div>
                <PatientExpectoration 
                    patId                      = {this.props.patId}
                    visitId                    = {this.props.visitId}
                    formConfig                 = {this.props.formData}
                    handleBoundFormExpectorationUpdate = {this.handleBoundFormExpectorationUpdate}
                    getExpectorationData               = {this.getExpectorationData}
                />
            </div>
        );
    }
}