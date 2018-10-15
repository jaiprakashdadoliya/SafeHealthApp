import React from "react";
import { AssociatedDisorder } from "./AssociatedDisorder";

export class AssociatedDisorderContainer extends React.Component {
	constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <div >
                <AssociatedDisorder
                associatedDisorderData = {this.props.associatedDisorderData} 

                />
            </div>
        );
    }
}
