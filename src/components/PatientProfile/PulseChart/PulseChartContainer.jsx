import React from "react";
import { PulseChart } from "./PulseChart";

export class PulseChartContainer extends React.Component {

	  constructor(props, context) {
    	super(props, context);
    }

    render() {
        return (
            <div >
                <PulseChart 
                	  chartData = {this.props.pulseChartData}
                      medicalProfile = {this.props.medicalProfile}
                />
            </div>
        );
    }
}
