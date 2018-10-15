import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../../global';

const PatientUrinalysis = Loadable({
    loader: () => import('./PatientUrinalysis' /* webpackChunkName = "PatientUrinalysis" */).then(object => object.PatientUrinalysis),
    loading: Loading
});
export class PatientUrinalysisContainer extends React.Component {
	constructor(props){
		super(props);
        this.boundFormUrinalysis = undefined;
        this.handleBoundFormUrinalysisUpdate = this.handleBoundFormUrinalysisUpdate.bind(this);
        this.getUrinalysisData = this.getUrinalysisData.bind(this);

	}

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormUrinalysisUpdate(data){
        this.boundFormUrinalysis = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getUrinalysisData() {
       if(this.boundFormUrinalysis){
            let data = this.boundFormUrinalysis.getData();
            if (data) {
                return data;
            } 
       }
    }
	
    render() {
        return (
            <div >
                <PatientUrinalysis 
                    patId                                              = {this.props.patId}
                    visitId                                            = {this.props.visitId}
                    formConfig                                         = {this.props.formData}
                    handleBoundFormUrinalysisUpdate                    = {this.handleBoundFormUrinalysisUpdate}
                    getUrinalysisData                                  = {this.getUrinalysisData}
                />
            </div>
        );
    }
}