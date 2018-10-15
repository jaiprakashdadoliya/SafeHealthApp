import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../../global';

const PatientAbg = Loadable({
    loader: () => import('./PatientAbg' /* webpackChunkName = "PatientAbg" */).then(object => object.PatientAbg),
    loading: Loading
});
export class PatientAbgContainer extends React.Component {
    constructor(props){
        super(props);
        this.boundFormAbg = undefined;
        this.handleBoundFormAbgUpdate = this.handleBoundFormAbgUpdate.bind(this);
        this.getAbgData = this.getAbgData.bind(this);

    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormAbgUpdate(data){
        this.boundFormAbg = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getAbgData() {
       if(this.boundFormAbg){
            let data = this.boundFormAbg.getData();
            if (data) {
                return data;
            } 
       }
    }
    
    render() {
        if(this.props.visitDatafetched){
            return (
                <div >
                    <PatientAbg 
                        patId                                              = {this.props.patId}
                        visitId                                            = {this.props.visitId}
                        formConfig                                         = {this.props.abgFormData}
                        handleBoundFormAbgUpdate                           = {this.handleBoundFormAbgUpdate}
                        getAbgData                                         = {this.getAbgData}
                    />
                </div>
            );
        }else{
            return (<Loading />);
        }
    }
}