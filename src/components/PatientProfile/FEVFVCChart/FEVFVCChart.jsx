import React from "react";
import {fontawesome, FontAwesomeIcon} from '../../../global';
import {faMobileAlt, faUser, faTint, faIdCard } from '@fortawesome/fontawesome-free-solid';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from "recharts";

export const FEVFVCChart = (props) => {
    return (
        <div className="col-sm-6 col-md-4">
            <div className="chart-container box">
                <div className="box-header"><h3>FEV1-FVC</h3></div>
                {
                    props.chartData.data.length > 0 ? 
                        <ResponsiveContainer debounce={200} width="100%" height={220}>
                            <LineChart width={600} height={300} data={props.chartData.data} margin={{top: 10, right: 20, left: -15, bottom: -8}}>
                                <XAxis dataKey="Date"/>
                                <YAxis />
                                <CartesianGrid stroke="#f5f5f5"/>
                                <Legend />
                                <Tooltip/>
                                <Line type="monotone" dataKey="Pre Value" stroke="#8884d8" activeDot={{r: 8}} strokeWidth={4} />
                                <Line type="monotone" dataKey="Post Value" stroke="#82ca9d" activeDot={{r: 8}} strokeWidth={4} />
                            </LineChart>
                        </ResponsiveContainer>
                    : <p className="fx-no-record">No record found.</p>
                }
            </div>
        </div>
    );

}
