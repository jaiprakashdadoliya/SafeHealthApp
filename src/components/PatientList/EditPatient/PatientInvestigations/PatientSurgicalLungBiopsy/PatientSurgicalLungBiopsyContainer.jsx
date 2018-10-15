import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../../global';

const PatientSurgicalLungBiopsy = Loadable({
    loader: () => import('./PatientSurgicalLungBiopsy' /* webpackChunkName = "PatientSurgicalLungBiopsy" */).then(object => object.PatientSurgicalLungBiopsy),
    loading: Loading
});
export class PatientSurgicalLungBiopsyContainer extends React.Component {
    constructor(props){
        super(props);
        this.boundFormSurgicalLungBiopsy = undefined;
        this.handleBoundFormSurgicalLungBiopsyUpdate = this.handleBoundFormSurgicalLungBiopsyUpdate.bind(this);
        this.getSurgicalLungBiopsyData = this.getSurgicalLungBiopsyData.bind(this);

    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormSurgicalLungBiopsyUpdate(data){
        this.boundFormSurgicalLungBiopsy = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getSurgicalLungBiopsyData() {
       if(this.boundFormSurgicalLungBiopsy){
            let data = this.boundFormSurgicalLungBiopsy.getData();
            if (data) {
                return data;
            } 
       }
    }
    
    render() {
        if(this.props.visitDatafetched){
            return (
                <div >
                    <PatientSurgicalLungBiopsy 
                        patId                                              = {this.props.patId}
                        visitId                                            = {this.props.visitId}
                        formConfig                                         = {this.props.SurgicalLungBiopsyFormData}
                        handleBoundFormSurgicalLungBiopsyUpdate             = {this.handleBoundFormSurgicalLungBiopsyUpdate}
                        getSurgicalLungBiopsyData                           = {this.getSurgicalLungBiopsyData}
                    />
                </div>
            );
        }else{
            return (<Loading />);
        }
    }
}