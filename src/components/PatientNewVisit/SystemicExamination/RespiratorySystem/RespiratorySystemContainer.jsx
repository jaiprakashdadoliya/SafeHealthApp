import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../global';

const RespiratorySystem = Loadable({
    loader: () => import('./RespiratorySystem' /* webpackChunkName = "RespiratorySystem" */).then(object => object.RespiratorySystem),
    loading: Loading
});

export class RespiratorySystemContainer extends React.Component {
    
	constructor(props){
		super(props);
        this.boundFormURT = undefined;
        this.handleBoundFormURTUpdate = this.handleBoundFormURTUpdate.bind(this);
        this.getRespiratorySystemData = this.getRespiratorySystemData.bind(this);

	}

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormURTUpdate(data){
        this.boundFormURT = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getRespiratorySystemData() {
       if(this.boundFormURT){
            let data = this.boundFormURT.getData();
            if (data) {
                return data;
            } 
       }
    }
	
    render() {
       return (
            <div>
                <RespiratorySystem 
                    patId                      = {this.props.patId}
                    visitId                    = {this.props.visitId}
                    formConfig                 = {this.props.formData}
                    handleBoundFormURTUpdate   = {this.handleBoundFormURTUpdate}
                    getRespiratorySystemData   = {this.getRespiratorySystemData}
                />
            </div>
        );
    }
}