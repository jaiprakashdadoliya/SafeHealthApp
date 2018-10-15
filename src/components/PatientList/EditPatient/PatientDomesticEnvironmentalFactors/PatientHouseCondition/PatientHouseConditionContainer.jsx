import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../../global';
import { patientDomesticFactorActions } from './../patientDomesticFactorActions';

const PatientHouseCondition = Loadable({
    loader: () => import('./PatientHouseCondition' /* webpackChunkName = "PatientHouseCondition" */).then(object => object.PatientHouseCondition),
    loading: Loading
});

export class PatientHouseConditionContainer extends React.Component {

	constructor(props){
		super(props);
        this.boundFormHosueCondition = undefined;
        this.handleBoundFormHosueConditionUpdate = this.handleBoundFormHosueConditionUpdate.bind(this);
        this.getHosueConditionData = this.getHosueConditionData.bind(this);

	}

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getHosueConditionData() {
       if(this.boundFormHosueCondition){
            let data = this.boundFormHosueCondition.getData();
            if (data) {
                return data;
            }
       }
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
	handleBoundFormHosueConditionUpdate(data){
        this.boundFormHosueCondition = data;
    }

    render() {
        return (
            <div >
                <PatientHouseCondition 
					successMessage   			                       = {this.props.successMessage}
					errorMsg   					                       = {this.props.errorMsg}
                    patId                                              = {this.props.patId}
                    visitId                                            = {this.props.visitId}
                    formConfig                                         = {this.props.formData}
                    handleBoundFormHosueConditionUpdate                = {this.handleBoundFormHosueConditionUpdate}
                    getHosueConditionData                              = {this.getHosueConditionData}
                />
            </div>
        );
    }
}
