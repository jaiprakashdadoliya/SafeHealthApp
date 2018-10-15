import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../../global';

const PatientThoracoscopicLung = Loadable({
    loader: () => import('./PatientThoracoscopicLung' /* webpackChunkName = "PatientThoracoscopicLung" */).then(object => object.PatientThoracoscopicLung),
    loading: Loading
});
export class PatientThoracoscopicLungContainer extends React.Component {
    constructor(props){
        super(props);
        this.boundFormThoracoscopicLung = undefined;
        this.handleBoundFormThoracoscopicLungUpdate = this.handleBoundFormThoracoscopicLungUpdate.bind(this);
        this.getThoracoscopicLungData = this.getThoracoscopicLungData.bind(this);

    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormThoracoscopicLungUpdate(data){
        this.boundFormThoracoscopicLung = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getThoracoscopicLungData() {
       if(this.boundFormThoracoscopicLung){
            let data = this.boundFormThoracoscopicLung.getData();
            if (data) {
                return data;
            } 
       }
    }
    
    render() {
        if(this.props.visitDatafetched){
            return (
                <div >
                    <PatientThoracoscopicLung 
                        patId                                              = {this.props.patId}
                        visitId                                            = {this.props.visitId}
                        formConfig                                         = {this.props.thoracoscopicLungFormData}
                        handleBoundFormThoracoscopicLungUpdate             = {this.handleBoundFormThoracoscopicLungUpdate}
                        getThoracoscopicLungData                           = {this.getThoracoscopicLungData}
                    />
                </div>
            );
        }else{
            return (<Loading />);
        }
    }
}