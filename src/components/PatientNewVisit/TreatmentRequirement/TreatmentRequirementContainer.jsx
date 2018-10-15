import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from '../../../global';
import { utilityHelper } from '../../../_helpers';

const TreatmentRequirement = Loadable({
    loader: () => import('./TreatmentRequirement' /* webpackChunkName = "TreatmentRequirement" */).then(object => object.TreatmentRequirement),
    loading: Loading
});

export class TreatmentRequirementContainer extends React.Component {
	constructor(props){
        super(props);
        this.boundFormOxigenTreatment       = undefined;
        this.boundFormOtherTreatment        = undefined;
        this.handleBoundFormOxigenTreatment = this.handleBoundFormOxigenTreatment.bind(this);
        this.handleBoundFormOtherTreatment  = this.handleBoundFormOtherTreatment.bind(this);
        this.getTreatmentRequirementData    = this.getTreatmentRequirementData.bind(this);
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormOxigenTreatment(data){
        this.boundFormOxigenTreatment = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormOtherTreatment(data){
        this.boundFormOtherTreatment = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getTreatmentRequirementData() {
       if(this.boundFormOxigenTreatment && this.boundFormOtherTreatment){
            let dataOxygen = this.boundFormOxigenTreatment.getData();
            let dataOther  = this.boundFormOtherTreatment.getData();
            if (dataOxygen && dataOther) {
                return utilityHelper.mergeMultipleObject([dataOxygen, dataOther]);
            } 
       }
    }

    render() {
        if(this.props.visitDatafetched){
            return (
                <div >
                    <TreatmentRequirement 
                        oxigenRequirementsFormData      = {this.props.oxigenRequirementsFormData}
                        otherRequirementsFormData       = {this.props.otherRequirementsFormData}
                        visitDatafetched                = {this.props.visitDatafetched}
                        handleBoundFormOxigenTreatment  = {this.handleBoundFormOxigenTreatment}
                        handleBoundFormOtherTreatment   = {this.handleBoundFormOtherTreatment}
                        getTreatmentRequirementData     = {this.getTreatmentRequirementData}
                    />
                </div>
            );
        }else{
            return(<div></div>);
        }
    }
}
