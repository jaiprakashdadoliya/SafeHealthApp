import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../../global';

const PatientEchocardiogram = Loadable({
    loader: () => import('./PatientEchocardiogram' /* webpackChunkName = "PatientEchocardiogram" */).then(object => object.PatientEchocardiogram),
    loading: Loading
});
export class PatientEchocardiogramContainer extends React.Component {
	constructor(props){
		super(props);
        this.boundFormEchocardiogram = undefined;
        this.handleBoundFormEchocardiogramUpdate = this.handleBoundFormEchocardiogramUpdate.bind(this);
        this.getEchocardiogramData = this.getEchocardiogramData.bind(this);

	}

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormEchocardiogramUpdate(data){
        this.boundFormEchocardiogram = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getEchocardiogramData() {
       if(this.boundFormEchocardiogram){
            let data = this.boundFormEchocardiogram.getData();
            if (data) {
                return data;
            } 
       }
    }
	
    render() {
        return (
            <div >
                <PatientEchocardiogram 
                    patId                                              = {this.props.patId}
                    visitId                                            = {this.props.visitId}
                    formConfig                                         = {this.props.formData}
                    handleBoundFormEchocardiogramUpdate                = {this.handleBoundFormEchocardiogramUpdate}
                    getEchocardiogramData                              = {this.getEchocardiogramData}
                />
            </div>
        );
    }
}