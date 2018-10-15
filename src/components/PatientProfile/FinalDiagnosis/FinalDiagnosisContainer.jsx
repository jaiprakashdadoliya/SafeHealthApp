import React from "react";
import { FinalDiagnosis } from "./FinalDiagnosis";

export class FinalDiagnosisContainer extends React.Component {
	constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <div >
                <FinalDiagnosis 
                	finalDiagnosisData = {this.props.finalDiagnosisData}
                />
            </div>
        );
    }
}
