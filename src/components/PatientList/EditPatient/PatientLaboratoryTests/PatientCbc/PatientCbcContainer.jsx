import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../../global';

const PatientCbc = Loadable({
    loader: () => import('./PatientCbc' /* webpackChunkName = "PatientCbc" */).then(object => object.PatientCbc),
    loading: Loading
});

export class PatientCbcContainer extends React.Component {
    
	constructor(props){
		super(props);
        this.boundFormCbc = undefined;
        this.handleBoundFormCbcUpdate = this.handleBoundFormCbcUpdate.bind(this);
        this.getCbcData = this.getCbcData.bind(this);

	}

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormCbcUpdate(data){
        this.boundFormCbc = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getCbcData() {
       if(this.boundFormCbc){
            let data = this.boundFormCbc.getData();
            if (data) {
                return data;
            } 
       }
    }
	
    render() {
        return (
            <div >
                <PatientCbc 
                    patId                                              = {this.props.patId}
                    visitId                                            = {this.props.visitId}
                    formConfig                                         = {this.props.formData}
                    handleBoundFormCbcUpdate                           = {this.handleBoundFormCbcUpdate}
                    getCbcData                                         = {this.getCbcData}
                />
            </div>
        );
    }
}