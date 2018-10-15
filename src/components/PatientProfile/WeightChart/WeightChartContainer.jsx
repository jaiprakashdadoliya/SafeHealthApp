import React from "react";
import { WeightChart } from "./WeightChart";

export class WeightChartContainer extends React.Component {

	  constructor(props, context) {
        super(props, context);
  	}

    render() {
        return (
            <div >
                <WeightChart 
                	  chartData = {this.props.weightChartData}
                      medicalProfile = {this.props.medicalProfile}
                />
            </div>
        );
    }
}
