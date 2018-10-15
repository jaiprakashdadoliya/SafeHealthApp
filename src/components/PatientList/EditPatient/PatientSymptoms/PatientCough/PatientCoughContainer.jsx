import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../../global';

const PatientCough = Loadable({
    loader: () => import('./PatientCough' /* webpackChunkName = "PatientCough" */).then(object => object.PatientCough),
    loading: Loading
});

export class PatientCoughContainer extends React.Component {
    
	constructor(props){
		super(props);
        this.boundFormCough = undefined;
        this.handleBoundFormCoughUpdate = this.handleBoundFormCoughUpdate.bind(this);
        this.getCoughData = this.getCoughData.bind(this);

	}

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormCoughUpdate(data){
        this.boundFormCough = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getCoughData() {
       if(this.boundFormCough){
            let data = this.boundFormCough.getData();
            if (data) {
                return data;
            } 
       }
    }
	
    render() {
        return (
            <div>
                <PatientCough 
                    patId                      = {this.props.patId}
                    visitId                    = {this.props.visitId}
                    formConfig                 = {this.props.formData}
                    handleBoundFormCoughUpdate = {this.handleBoundFormCoughUpdate}
                    getCoughData               = {this.getCoughData}
                />
            </div>
        );
    }
}