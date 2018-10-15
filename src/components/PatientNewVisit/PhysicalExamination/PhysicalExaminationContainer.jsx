import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from '../../../global';

const PhysicalExamination = Loadable({
    loader: () => import('./PhysicalExamination' /* webpackChunkName = "PhysicalExamination" */).then(object => object.PhysicalExamination),
    loading: Loading
});

export class PhysicalExaminationContainer extends React.Component {
	constructor(props){
        super(props);
        this.boundFormPhysicalExamination       = undefined;        
        this.handleBoundFormPhysicalExamination = this.handleBoundFormPhysicalExamination.bind(this);
        this.getPhysicalExaminationData         = this.getPhysicalExaminationData.bind(this);
        this.handleSetData                      = this.handleSetData.bind(this);
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormPhysicalExamination(data){
        this.boundFormPhysicalExamination = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input data on changea
    * @return                Redirect
    */
    handleSetData(data){
        this.boundFormPhysicalExamination.setFieldData(data);
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getPhysicalExaminationData() {
       if(this.boundFormPhysicalExamination){
            let data = this.boundFormPhysicalExamination.getData();
            if (data) {
                return data;
            } 
       }
    }

    render() {
        if(this.props.visitDatafetched){
            return (
                <div >
                    <PhysicalExamination 
                        visitDatafetched                    = {this.props.visitDatafetched}
                        physicalExaminationFormData         = {this.props.physicalExaminationFormData }
                        handleBoundFormPhysicalExamination  = {this.handleBoundFormPhysicalExamination}
                        getPhysicalExaminationData          = {this.getPhysicalExaminationData}
                        titleShow                           = {this.props.titleShow}
                    />
                </div>
            );
        }else{
            return (<div></div>);
        }
    }
}