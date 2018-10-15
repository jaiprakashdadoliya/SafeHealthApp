import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../../global';

const PatientBSugar = Loadable({
    loader: () => import('./PatientBSugar' /* webpackChunkName = "PatientBSugar" */).then(object => object.PatientBSugar),
    loading: Loading
});

export class PatientBSugarContainer extends React.Component {

	constructor(props){
		super(props);
        this.boundFormBSugar = undefined;
        this.handleBoundFormBSugarUpdate = this.handleBoundFormBSugarUpdate.bind(this);
        this.getBSugarData = this.getBSugarData.bind(this);

	}

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormBSugarUpdate(data){
        this.boundFormBSugar = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getBSugarData() {
       if(this.boundFormBSugar){
            let data = this.boundFormBSugar.getData();
            if (data) {
                return data;
            } 
       }
    }
	
    render() {
        return (
            <div >
                <PatientBSugar 
                    patId                                              = {this.props.patId}
                    visitId                                            = {this.props.visitId}
                    formConfig                                         = {this.props.formData}
                    handleBoundFormBSugarUpdate                           = {this.handleBoundFormBSugarUpdate}
                    getBSugarData                                         = {this.getBSugarData}
                />
            </div>
        );
    }
}