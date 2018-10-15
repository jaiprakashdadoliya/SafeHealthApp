import React from "react";
import { BpChart } from "./BpChart";

export class BpChartContainer extends React.Component {
	  constructor(props, context) {
    	  super(props, context);
    }

    render() {
        return (
            <div >
                <BpChart 
                	chartData = {this.props.sysChartData}
                    medicalProfile = {this.props.medicalProfile}
                />
            </div>
        );
    }
}
