import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from '../../../global';
import { utilityHelper } from '../../../_helpers';

const InvestigationReport = Loadable({
    loader: () => import('./InvestigationReport' /* webpackChunkName = "InvestigationReport" */).then(object => object.InvestigationReport),
    loading: Loading
});

export class InvestigationReportContainer extends React.Component {
	constructor(props){
		super(props);

        this.boundFormInvestigationReport               = undefined;
        this.handleBoundFormInvestigationReportUpdate   = this.handleBoundFormInvestigationReportUpdate.bind(this);
        this.getInvestigationReportData                 = this.getInvestigationReportData.bind(this);
        this.state  = {};
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data update
    * @return                Redirect
    */
    handleBoundFormInvestigationReportUpdate(data){
        this.boundFormInvestigationReport = data;
    }

    /**
     * @DateOfCreation        14 june 2018
     * @ShortDescription      This function is responsible to retun state to parent component
     * @param                 Event Object
     * @return                Nothing
     */
    getInvestigationReportTableData() {
       return this.state;
    }

    /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to get fx form input state data
    * @return                Redirect
    */
    getInvestigationReportData() {
       if(this.handleBoundFormInvestigationReportUpdate){
            let data          = this.boundFormInvestigationReport.getData();
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
        const { dispatch } = this.props;
    }

    render() {
        return (
            <div >
                <InvestigationReport 
                    investigationReportFormData              = {this.props.investigationReportFormData}
                    visitDatafetched                         = {this.props.visitDatafetched}
                    handleBoundFormInvestigationReportUpdate = {this.handleBoundFormInvestigationReportUpdate}
                    state                                    = {this.state}
                    user_type                                = {this.props.user_type}
                />
            </div>
        );
    }
}