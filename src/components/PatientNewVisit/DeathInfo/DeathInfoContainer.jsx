import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from '../../../global';

const DeathInfo = Loadable({
    loader: () => import('./DeathInfo' /* webpackChunkName = "DeathInfo" */).then(object => object.DeathInfo),
    loading: Loading
});

export class DeathInfoContainer extends React.Component {
	constructor(props){
		super(props);

        this.boundFormDeathInfoCondition    = undefined;
        this.handleBoundFormDeathInfoUpdate = this.handleBoundFormDeathInfoUpdate.bind(this);
        this.getDeathInfoData               = this.getDeathInfoData.bind(this);
	}

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormDeathInfoUpdate(data){
        this.boundFormDeathInfoCondition = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getDeathInfoData() {
       if(this.boundFormDeathInfoCondition){
            let data = this.boundFormDeathInfoCondition.getData();
            if (data) {
                return data;
            } 
       }
    }

    render() {
        if(this.props.visitDatafetched){
            return (
                <div >
                    <DeathInfo 
                        deathInfoFormData               = {this.props.deathInfoFormData}
                        visitDatafetched                = {this.props.visitDatafetched}
                        getDeathInfoData                = {this.getDeathInfoData}
                        handleBoundFormDeathInfoUpdate  = {this.handleBoundFormDeathInfoUpdate}
                    />
                </div>
            );
        }else{
            return (<div></div>);
        }
    }
}