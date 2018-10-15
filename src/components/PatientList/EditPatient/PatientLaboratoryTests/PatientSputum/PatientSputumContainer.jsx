import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../../global';

const PatientSputum = Loadable({
    loader: () => import('./PatientSputum' /* webpackChunkName = "PatientSputum" */).then(object => object.PatientSputum),
    loading: Loading
});
export class PatientSputumContainer extends React.Component {
	constructor(props){
		super(props);
        this.boundFormSputum = undefined;
        this.handleBoundFormSputumUpdate = this.handleBoundFormSputumUpdate.bind(this);
        this.getSputumData = this.getSputumData.bind(this);

	}

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormSputumUpdate(data){
        this.boundFormSputum = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getSputumData() {
       if(this.boundFormSputum){
            let data = this.boundFormSputum.getData();
            if (data) {
                return data;
            } 
       }
    }
	
    render() {
        return (
            <div >
                <PatientSputum 
                    patId                                              = {this.props.patId}
                    visitId                                            = {this.props.visitId}
                    formConfig                                         = {this.props.formData}
                    handleBoundFormSputumUpdate                        = {this.handleBoundFormSputumUpdate}
                    getSputumData                                      = {this.getSputumData}
                />
            </div>
        );
    }
}