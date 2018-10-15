import React from "react";
import { connect } from 'react-redux';
import Loadable from 'react-loadable'; 
import { Loading } from './../../../global';
import { ChartReports } from "./ChartReports";
import { configConstants } from '../../../_constants';
import { utilityHelper } from '../../../_helpers';
import { chartReportsActions } from './chartReportsActions';

class ChartReportsContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        var date = new Date();
        let currentMonth = date.getMonth()+1;
        let currentYear = date.getFullYear();
        let defautPeriod = '1';
        this.state = {
            detail : {
                'report_period' : defautPeriod,
                'month' : currentMonth,
                'year' : currentYear,
            },
            reportsData : [],
            monthListVisible : true,
        };
    }

    componentDidMount() {
        this.handleSubmit();
    }

    handleSubmit(){
        const { dispatch } = this.props;
        if(this.state.detail.report_period == '1'){
            dispatch(chartReportsActions.getPatientsReportForMonth(this.state.detail.month,this.state.detail.year));
        }else{
            dispatch(chartReportsActions.getPatientsReportForYear(this.state.detail.year));
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.reportsData){
            this.setState({
                reportsData : nextProps.reportsData,
            })
        }

    }

    /**
    * @DateOfCreation        24 May 2018
    * @ShortDescription      This function is responsible to handle changes in Select state
    * @param                 Event Object
    * @return                Nothing
    */
    handleSelectChange(selectedOption, name) {
        const { detail } = this.state;
        if(name == "report_period"){
            const { monthListVisible } = this.state;
            if(selectedOption.value == '1'){
                this.setState({
                    ...monthListVisible,
                    monthListVisible : true,
                });
            }else{
                this.setState({
                    ...monthListVisible,
                    monthListVisible : false,
                });
            }
        }
        this.setState({
            detail:{
                ...detail,
                [name] : selectedOption.value
            },
        }, function(){
            this.handleSubmit();
        });
    }

    render () {

        return (
            <ChartReports 
                reportsData = { this.state.reportsData }
                detail = { this.state.detail }
                handleSubmit = { this.handleSubmit }
                handleSelectChange = { this.handleSelectChange }
                monthListVisible = { this.state.monthListVisible }
            />
        );
    }
}

/**
 * @DateOfCreation        30 Aug 2018
 * @ShortDescription      This function is responsible to map store state to props
 * @return                View
 */
function mapStateToProps(state) {
    const { reportsData }    = state.chartReports;
    return {
        reportsData,
    };
}

const connectedChartReportsContainer = connect(mapStateToProps)(ChartReportsContainer);
export { connectedChartReportsContainer as ChartReportsContainer };
