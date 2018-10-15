import React from "react";
import { FVCChart } from "./FVCChart";

export class FVCChartContainer extends React.Component {
	constructor(props, context) {
    	super(props, context);    	
  	}

    render() {
        return (
            <div >
                <FVCChart 
                	chartData = {this.props.fvcdata}
                />
            </div>
        );
    }
}
