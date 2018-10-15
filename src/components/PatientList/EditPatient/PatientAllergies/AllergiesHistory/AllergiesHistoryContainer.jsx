import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../../global';

const AllergiesHistory = Loadable({
    loader: () => import('./AllergiesHistory' /* webpackChunkName = "AllergiesHistory" */).then(object => object.AllergiesHistory),
    loading: Loading
});

export class AllergiesHistoryContainer extends React.Component {
    
	constructor(props){
		super(props);
        this.boundFormAllergies = undefined;
        this.handleBoundFormAllergiesUpdate = this.handleBoundFormAllergiesUpdate.bind(this);
        this.getAllergiesData = this.getAllergiesData.bind(this);

	}

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormAllergiesUpdate(data){
        this.boundFormAllergies = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getAllergiesData() {
       if(this.boundFormAllergies){
            let data = this.boundFormAllergies.getData();
            if (data) {
                return data;
            } 
       }
    }
	
    render() {
        return (
            <div>
                <AllergiesHistory 
                    formConfig                 = {this.props.formData}
                    handleBoundFormAllergiesUpdate = {this.handleBoundFormAllergiesUpdate}
                    getAllergiesData               = {this.getAllergiesData}
                />
            </div>
        );
    }
}