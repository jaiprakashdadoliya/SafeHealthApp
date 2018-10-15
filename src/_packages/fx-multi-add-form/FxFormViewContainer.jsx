import React from "react";
import { connect } from 'react-redux';
import Loadable from 'react-loadable'; 
import {FxFormView} from './FxFormView';

export class FxFormViewContainer extends React.Component {
    constructor(props, context){
        super(props, context);                
    }
    
    render() {
        return (
            <div>
                <FxFormView 
                    propsObj   = {this.props.propsObj}
                    fxMultiAddFormExtraConfig = {this.props.fxMultiAddFormExtraConfig}
                    fxFormViewModel = {this.props.fxFormViewModel}
                    fxFormViewModelHideHandle = {this.props.fxFormViewModelHideHandle}
                    fxFormConfig = {this.props.fxFormConfig}
                    handleBoundFormUpdate = {this.props.handleBoundFormUpdate}
                    handleSubmit = {this.props.handleSubmit}
                    fxMultiAddFormTitle = {this.props.fxMultiAddFormTitle}
                    successMsg = {this.props.successMsg}
                    errorMsg   = {this.props.errorMsg}
                    submitted   = {this.props.submitted}
                />
            </div>
        );
    }
}