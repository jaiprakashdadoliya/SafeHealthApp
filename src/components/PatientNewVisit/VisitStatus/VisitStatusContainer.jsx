import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from '../../../global';
import { VisitStatusActions } from '../../../_actions';

const VisitStatus = Loadable({
    loader: () => import('./VisitStatus' /* webpackChunkName = "VisitStatus" */).then(object => object.VisitStatus),
    loading: Loading
});

export class VisitStatusContainer extends React.Component {
	constructor(props){
		super(props);
        this.boundFormHosueCondition             = undefined;
        this.handleBoundFormVisitStatusUpdate    = this.handleBoundFormVisitStatusUpdate.bind(this);
        this.getVisitsData                       = this.getVisitsData.bind(this);
	}

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormVisitStatusUpdate(data){
        this.boundFormVisitStatus = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getVisitsData() {
       if(this.boundFormVisitStatus){
            let data = this.boundFormVisitStatus.getData();
            if (data) {
                return data;
            } 
       }
    }

    render() {
        if(this.props.visitDatafetched){
            return (
                <div >
                    <VisitStatus 
                        newVisitFormData                    = {this.props.newVisitFormData}
                        visitDatafetched                    = {this.props.visitDatafetched}
                        handleBoundFormVisitStatusUpdate    = {this.handleBoundFormVisitStatusUpdate}
                        getVisitsData                       = {this.getVisitsData}
                    />
                </div>
            );
        }else{
            return (<div></div>);
        }
    }
}
