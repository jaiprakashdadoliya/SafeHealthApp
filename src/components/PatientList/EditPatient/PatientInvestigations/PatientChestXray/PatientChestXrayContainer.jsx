import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../../global';

const PatientChestXray = Loadable({
    loader: () => import('./PatientChestXray' /* webpackChunkName = "PatientChestXray" */).then(object => object.PatientChestXray),
    loading: Loading
});
export class PatientChestXrayContainer extends React.Component {
    constructor(props){
        super(props);
        this.boundFormPatientChestXray = undefined;
        this.handleBoundFormPatientChestXrayUpdate = this.handleBoundFormPatientChestXrayUpdate.bind(this);
        this.getPatientChestXrayData = this.getPatientChestXrayData.bind(this);

    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */

    handleBoundFormPatientChestXrayUpdate(data){
        this.boundFormPatientChestXray = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getPatientChestXrayData() {
       if(this.boundFormPatientChestXray){
            let data = this.boundFormPatientChestXray.getData();
            if (data) {
                return data;
            } 
       }
    }
    
    render() {
        if(this.props.visitDatafetched){
            return (
                <div >
                    <PatientChestXray 
                        patId                                              = {this.props.patId}
                        visitId                                            = {this.props.visitId}
                        formConfig                                         = {this.props.ChestXrayFormData}
                        handleBoundFormPatientChestXrayUpdate              = {this.handleBoundFormPatientChestXrayUpdate}
                        getPatientChestXrayData                            = {this.getPatientChestXrayData}
                    />
                </div>
            );
        }else{
            return (<Loading />);
        }
    }
}