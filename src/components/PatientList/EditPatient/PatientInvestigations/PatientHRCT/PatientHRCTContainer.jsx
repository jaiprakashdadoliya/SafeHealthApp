import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../../global';

const PatientHRCT = Loadable({
    loader: () => import('./PatientHRCT' /* webpackChunkName = "PatientHRCT" */).then(object => object.PatientHRCT),
    loading: Loading
});
export class PatientHRCTContainer extends React.Component {
    constructor(props){
        super(props);
        this.boundFormHRCT = undefined;
        this.handleBoundFormHRCTUpdate = this.handleBoundFormHRCTUpdate.bind(this);
        this.getHRCTData = this.getHRCTData.bind(this);

    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormHRCTUpdate(data){
        this.boundFormHRCT = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getHRCTData() {
       if(this.boundFormHRCT){
            let data = this.boundFormHRCT.getData();
            if (data) {
                return data;
            } 
       }
    }
    
    render() {
        if(this.props.visitDatafetched){
            return (
                <div >
                    <PatientHRCT 
                        patId                                 = {this.props.patId}
                        visitId                               = {this.props.visitId}
                        formConfig                            = {this.props.HRCTFormData}
                        handleBoundFormHRCTUpdate             = {this.handleBoundFormHRCTUpdate}
                        getHRCTData                           = {this.getHRCTData}
                    />
                </div>
            );
        }else{
            return (<Loading />);
        }
    }
}