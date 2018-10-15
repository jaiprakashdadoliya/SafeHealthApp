import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from '../../../global';
import { utilityHelper } from '../../../_helpers';

const SleepStudy = Loadable({
    loader: () => import('./SleepStudy' /* webpackChunkName = "SleepStudy" */).then(object => object.SleepStudy),
    loading: Loading
});

export class SleepStudyContainer extends React.Component {
	constructor(props){
		super(props);

        this.boundFormSleepStudy               = undefined;
        this.handleBoundFormSleepStudyUpdate   = this.handleBoundFormSleepStudyUpdate.bind(this);
        this.getSleepStudyData                 = this.getSleepStudyData.bind(this);
        this.state  = {};
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormSleepStudyUpdate(data){
        this.boundFormSleepStudy = data;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getSleepStudyData() {
       if(this.handleBoundFormSleepStudyUpdate){
            let data          = this.boundFormSleepStudy.getData();
            if (data) {
                return utilityHelper.mergeMultipleObject([data]);
            } 
       }
    }

    /**
     * @DateOfCreation        9 July 2018
     * @ShortDescription      This function is responsible to set state from api data get
     * @param                 Event Object
     * @return                Nothing
     */
    componentWillMount(){
        const { dispatch, SleepStudyTableFormData } = this.props;
    }

    render() {
        return (
            <div >
                <SleepStudy 
                    sleepStudyFormData              = {this.props.sleepStudyFormData}
                    visitDatafetched                = {this.props.visitDatafetched}
                    handleBoundFormSleepStudyUpdate = {this.handleBoundFormSleepStudyUpdate}
                />
            </div>
        );
    }
}