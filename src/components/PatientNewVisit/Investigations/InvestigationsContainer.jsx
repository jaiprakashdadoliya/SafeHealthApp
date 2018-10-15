import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from '../../../global';
import { utilityHelper } from '../../../_helpers';

const Investigations = Loadable({
    loader: () => import('./Investigations' /* webpackChunkName = "Investigations" */).then(object => object.Investigations),
    loading: Loading
});

export class InvestigationsContainer extends React.Component {
	constructor(props){
		super(props);

        this.boundFormInvestigation               = undefined;
        this.boundFormPulmonaryFunction           = undefined;
        this.handleBoundFormInvestigationUpdate   = this.handleBoundFormInvestigationUpdate.bind(this);
        this.handleBoundPulmonaryFunctionUpdate   = this.handleBoundPulmonaryFunctionUpdate.bind(this);
        this.getInvestigationData                 = this.getInvestigationData.bind(this);
	}

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormInvestigationUpdate(data){
        this.boundFormInvestigation = data;
    }

    /**
    * @DateOfCreation        26 July 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundPulmonaryFunctionUpdate(data){
        this.boundFormPulmonaryFunction = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input data on changea
    * @return                Redirect
    */
    handleSetData(data){
        this.boundFormInvestigation.setFieldData(data);
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getInvestigationData() {
       if(this.boundFormInvestigation){
            let data    = this.boundFormInvestigation.getData();
            let dataPF  = this.boundFormPulmonaryFunction.getData();
            if (data && dataPF) {
                return utilityHelper.mergeMultipleObject([data, dataPF]);

            } 
       }
    }

    render() {
        if(this.props.visitDatafetched){
            return (
                <div >
                    <Investigations 
                        investigationFormData               = {this.props.investigationFormData}
                        pulmonaryFunctionFormData           = {this.props.pulmonaryFunctionFormData}
                        handleBoundFormInvestigationUpdate  = {this.handleBoundFormInvestigationUpdate}
                        handleBoundPulmonaryFunctionUpdate  = {this.handleBoundPulmonaryFunctionUpdate}
                        getInvestigationData                = {this.getInvestigationData}
                        titleShow                           = {this.props.titleShow}
                    />
                </div>
            );
        }else{
            return('<div></div>');
        }
    }
}