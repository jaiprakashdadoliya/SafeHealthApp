import React from "react";
import { RespiratoryRateChart } from "./RespiratoryRateChart";

export class RespiratoryRateChartContainer extends React.Component {
	constructor(props, context) {
    	super(props, context);
    }

  	render() {
        return (
            <div >
                <RespiratoryRateChart 
                	chartData = {this.props.respiratoryRateChartData}
                />
            </div>
        );
    }
}
