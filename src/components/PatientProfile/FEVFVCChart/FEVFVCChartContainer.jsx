import React from "react";
import { FEVFVCChart } from "./FEVFVCChart";

export class FEVFVCChartContainer extends React.Component {
	constructor(props, context) {
    	super(props, context);    	
  	}

    render() {
        return (
            <div >
                <FEVFVCChart 
                	chartData = {this.props.chartData}
                />
            </div>
        );
    }
}
