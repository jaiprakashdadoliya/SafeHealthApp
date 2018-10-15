import React from "react";
import { SpO2Chart } from "./SpO2Chart";

export class SpO2ChartContainer extends React.Component {
	constructor(props, context) {
    	super(props, context);
    }

    render() {
        return (
            <div >
                <SpO2Chart 
                	  chartData = {this.props.spo2ChartData}
                      medicalProfile = {this.props.medicalProfile}
                />
            </div>
        );
    }
}
