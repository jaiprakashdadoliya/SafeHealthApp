import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../../global';

const PatientLiver = Loadable({
    loader: () => import('./PatientLiver' /* webpackChunkName = "PatientLiver" */).then(object => object.PatientLiver),
    loading: Loading
});
export class PatientLiverContainer extends React.Component {
	constructor(props){
		super(props);
        this.boundFormLiver = undefined;
        this.handleBoundFormLiverUpdate = this.handleBoundFormLiverUpdate.bind(this);
        this.getLiverData = this.getLiverData.bind(this);

	}

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormLiverUpdate(data){
        this.boundFormLiver = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getLiverData() {
       if(this.boundFormLiver){
            let data = this.boundFormLiver.getData();
            if (data) {
                return data;
            } 
       }
    }
	
    render() {
        return (
            <div >
                <PatientLiver 
                    patId                                              = {this.props.patId}
                    visitId                                            = {this.props.visitId}
                    formConfig                                         = {this.props.formData}
                    handleBoundFormLiverUpdate                           = {this.handleBoundFormLiverUpdate}
                    getLiverData                                         = {this.getLiverData}
                />
            </div>
        );
    }
}