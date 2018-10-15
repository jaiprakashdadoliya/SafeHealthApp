import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../../global';

const PatientRenal = Loadable({
    loader: () => import('./PatientRenal' /* webpackChunkName = "PatientRenal" */).then(object => object.PatientRenal),
    loading: Loading
});
export class PatientRenalContainer extends React.Component {
	constructor(props){
		super(props);
        this.boundFormRenal = undefined;
        this.handleBoundFormRenalUpdate = this.handleBoundFormRenalUpdate.bind(this);
        this.getRenalData = this.getRenalData.bind(this);

	}

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormRenalUpdate(data){
        this.boundFormRenal = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getRenalData() {
       if(this.boundFormRenal){
            let data = this.boundFormRenal.getData();
            if (data) {
                return data;
            } 
       }
    }
	
    render() {
        return (
            <div >
                <PatientRenal 
                    patId                                              = {this.props.patId}
                    visitId                                            = {this.props.visitId}
                    formConfig                                         = {this.props.formData}
                    handleBoundFormRenalUpdate                           = {this.handleBoundFormRenalUpdate}
                    getRenalData                                         = {this.getRenalData}
                />
            </div>
        );
    }
}