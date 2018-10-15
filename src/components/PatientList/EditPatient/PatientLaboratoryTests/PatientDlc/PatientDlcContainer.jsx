import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../../global';

const PatientDlc = Loadable({
    loader: () => import('./PatientDlc' /* webpackChunkName = "PatientDlc" */).then(object => object.PatientDlc),
    loading: Loading
});

export class PatientDlcContainer extends React.Component {

	constructor(props){
		super(props);
        this.boundFormDlc = undefined;
        this.handleBoundFormDlcUpdate = this.handleBoundFormDlcUpdate.bind(this);
        this.getDlcData = this.getDlcData.bind(this);

	}

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormDlcUpdate(data){
        this.boundFormDlc = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getDlcData() {
       if(this.boundFormDlc){
            let data = this.boundFormDlc.getData();
            if (data) {
                return data;
            } 
       }
    }
	
    render() {
        return (
            <div >
                <PatientDlc 
                    patId                                              = {this.props.patId}
                    visitId                                            = {this.props.visitId}
                    formConfig                                         = {this.props.formData}
                    handleBoundFormDlcUpdate                           = {this.handleBoundFormDlcUpdate}
                    getDlcData                                         = {this.getDlcData}
                />
            </div>
        );
    }
}