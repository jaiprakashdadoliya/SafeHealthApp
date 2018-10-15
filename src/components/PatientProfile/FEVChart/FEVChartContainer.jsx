import React from "react";
import { FEVChart } from "./FEVChart";

export class FEVChartContainer extends React.Component {
	constructor(props, context) {
    	super(props, context);    	
  	}

    render() {
        return (
            <div >
                <FEVChart 
                	chartData = {this.props.fevdata}
                />
            </div>
        );
    }
}
