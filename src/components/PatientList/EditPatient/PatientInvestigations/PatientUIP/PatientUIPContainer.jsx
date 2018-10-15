import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../../global';

const PatientUIP = Loadable({
    loader: () => import('./PatientUIP' /* webpackChunkName = "PatientUIP" */).then(object => object.PatientUIP),
    loading: Loading
});
export class PatientUIPContainer extends React.Component {
    constructor(props){
        super(props);
        this.boundFormUIP = undefined;
        this.handleBoundFormUIPUpdate = this.handleBoundFormUIPUpdate.bind(this);
        this.getUIPData = this.getUIPData.bind(this);

    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormUIPUpdate(data){
        this.boundFormUIP = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getUIPData() {
       if(this.boundFormUIP){
            let data = this.boundFormUIP.getData();
            if (data) {
                return data;
            } 
       }
    }
    
    render() {
        if(this.props.visitDatafetched){
            return (
                <div >
                    <PatientUIP 
                        patId                                 = {this.props.patId}
                        visitId                               = {this.props.visitId}
                        formConfig                            = {this.props.UIPFormData}
                        handleBoundFormUIPUpdate             = {this.handleBoundFormUIPUpdate}
                        getUIPData                           = {this.getUIPData}
                    />
                </div>
            );
        }else{
            return (<Loading />);
        }
    }
}