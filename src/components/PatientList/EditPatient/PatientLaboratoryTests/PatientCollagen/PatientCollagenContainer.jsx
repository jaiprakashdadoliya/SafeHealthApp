import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../../global';

const PatientCollagen = Loadable({
    loader: () => import('./PatientCollagen' /* webpackChunkName = "PatientCollagen" */).then(object => object.PatientCollagen),
    loading: Loading
});

export class PatientCollagenContainer extends React.Component {

	constructor(props){
		super(props);
        this.boundFormCollagen = undefined;
        this.handleBoundFormCollagenUpdate = this.handleBoundFormCollagenUpdate.bind(this);
        this.getCollagenData = this.getCollagenData.bind(this);

	}

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormCollagenUpdate(data){
        this.boundFormCollagen = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getCollagenData() {
       if(this.boundFormCollagen){
            let data = this.boundFormCollagen.getData();
            if (data) {
                return data;
            } 
       }
    }
	
    render() {
        return (
            <div >
                <PatientCollagen 
                    patId                                              = {this.props.patId}
                    visitId                                            = {this.props.visitId}
                    formConfig                                         = {this.props.formData}
                    handleBoundFormCollagenUpdate                      = {this.handleBoundFormCollagenUpdate}
                    getCollagenData                                    = {this.getCollagenData}
                />
            </div>
        );
    }
}