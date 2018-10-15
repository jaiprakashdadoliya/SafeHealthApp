import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from '../../../global';

const ChangesIn = Loadable({
    loader: () => import('./ChangesIn' /* webpackChunkName = "ChangesIn" */).then(object => object.ChangesIn),
    loading: Loading
});

export class ChangesInContainer extends React.Component {
	constructor(props){
		super(props);

	    this.boundFormChangesIn      = undefined;
        this.handleBoundChangeInData = this.handleBoundChangeInData.bind(this);
        this.getChangesInData        = this.getChangesInData.bind(this);
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundChangeInData(data){
        this.boundFormChangesIn = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getChangesInData() {
       if(this.boundFormChangesIn){
            let data = this.boundFormChangesIn.getData();
            if (data) {
                return data;
            } 
       }
    }    

    render() {
        return (
            <div >
                <ChangesIn 
                    changesInFormData       = {this.props.changesInFormData}
                    visitDatafetched        = {this.props.visitDatafetched}
                    getChangesInData        = {this.getChangesInData}
                    handleBoundChangeInData = {this.handleBoundChangeInData}
                    getChangesInData        = {this.getChangesInData}
                />
            </div>
        );
    }
}