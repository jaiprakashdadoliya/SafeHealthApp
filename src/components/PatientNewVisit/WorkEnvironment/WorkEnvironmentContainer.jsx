import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from '../../../global';

const WorkEnvironment = Loadable({
    loader: () => import('./WorkEnvironment' /* webpackChunkName = "WorkEnvironment" */).then(object => object.WorkEnvironment),
    loading: Loading
});

export class WorkEnvironmentContainer extends React.Component {
	constructor(props){
		super(props);
        this.boundFormWorkEnvironment               = undefined;
        this.handleBoundFormWorkEnvironmentUpdate   = this.handleBoundFormWorkEnvironmentUpdate.bind(this);
        this.getWorkEnvironmentData                 = this.getWorkEnvironmentData.bind(this);
    }
    
    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormWorkEnvironmentUpdate(data){
        this.boundFormWorkEnvironment = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getWorkEnvironmentData() {
       if(this.boundFormWorkEnvironment){
            let data = this.boundFormWorkEnvironment.getData();
            if (data) {
                return data;
            } 
       }
    }
	
    render() {
        if(this.props.visitDatafetched){
            return (
                <div >
                    <WorkEnvironment 
                        workEnvironmentFormData                 = {this.props.workEnvironmentFormData}
                        visitDatafetched                        = {this.props.visitDatafetched}
                        handleBoundFormWorkEnvironmentUpdate    = {this.handleBoundFormWorkEnvironmentUpdate}
                        getWorkEnvironmentData                  = {this.getWorkEnvironmentData}
                    />
                </div>
            );
        }else{
            return (<div></div>);
        }
    }
}