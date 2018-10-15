import React from "react";
import { BmiChart } from "./BmiChart";

export class BmiChartContainer extends React.Component {
	constructor(props, context) {
    	super(props, context);    	
  	}

    render() {
        return (
            <div >
                <BmiChart 
                	chartData = {this.props.bmiChartData}
                />
            </div>
        );
    }
}
