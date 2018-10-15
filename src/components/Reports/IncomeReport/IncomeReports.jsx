import React from "react";
import {fontawesome, FontAwesomeIcon, Loading} from '../../../global';
import {faMobileAlt, faUser, faTint, faIdCard } from '@fortawesome/fontawesome-free-solid';
import Select from 'react-select';
import Loadable from 'react-loadable';
import { configConstants } from '../../../_constants';
import { utilityHelper } from '../../../_helpers';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

export const IncomeReports = (props) => {
    return (
        <div className="col-md-12 mb-10">
            <div className="row">
                <div className="col-md-12 col-sm-12">
                    <h4>Income Reports</h4>    
                </div>
                <div className="col-md-3">
                    <div className='form-group'>
                        <Select
                            name = "report_period"
                            className = "custom-select"
                            value = { props.detail.report_period }
                            clearable = { false }
                            placeholder = "Select"
                            options = { utilityHelper.getReportPeriods() }
                            onChange = { (value, name) => props.handleSelectChange(value, 'report_period') }
                        />
                        <label className="control-label">Select Report Period</label>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className='form-group'>
                        <Select
                            name = "year"
                            className = "custom-select"
                            value = { props.detail.year }
                            clearable = { false }
                            placeholder = "Select"
                            options = { utilityHelper.getYears() }
                            onChange = { (value, name) => props.handleSelectChange(value, 'year') }
                        />
                        <label className="control-label">Select Year</label>
                    </div>
                </div>
                {props.monthListVisible && 
                <div className='col-md-3'>
                    <div className='form-group'>
                        <Select
                            name = "month"
                            className = "custom-select"
                            value = { props.detail.month }
                            clearable = { false }
                            placeholder = "Select"
                            options = { utilityHelper.getMonths() }
                            onChange = { (value, name) => props.handleSelectChange(value, 'month') }
                        />
                        <label className="control-label">Select Month</label>
                    </div>
                </div>
                }
            </div>
            <div className="row">
                <div className="col-md-12 margin-top-25">
                    <div className="col-md-9 col-sm-12 patient-info">
                        {props.reportsData && props.reportsData.length > 0 ?
                            <BarChart width={1000} height={300} data={props.reportsData}
                                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis type="number"/>
                            <Tooltip 
                                cursor={true} 
                            />
                            <Legend />
                            <Bar dataKey="income" fill="#096dd9" maxBarSize={50} />
                            </BarChart>
                        :
                            <div className="col-md-9 col-sm-12">
                                <div className="date-column-outer nextDay">
                                    No Data Found !!
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>     
        </div>
    );
}
