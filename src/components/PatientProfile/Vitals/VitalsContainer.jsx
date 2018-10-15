import React from "react";
import { Vitals } from "./Vitals";

export class VitalsContainer extends React.Component {
	constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div >
                <Vitals 
                	vitalsData = {this.props.vitalsData}
                />
            </div>
        );
    }
}
