import React from "react";
import formConfig from "./NewSampleConfig";
import {NewSampleModal} from './NewSampleModal';
import { connect } from 'react-redux';
import moment from 'moment';

export class NewSampleModalContainer extends React.Component {
    constructor(props) {  
        super(props);
        this.defaultState = {
            formConfig: formConfig,
        }; 
        this.state = this.defaultState;
        this.boundForm = undefined;
        this.gridRefreshDone = true;
        this.handleClose              = this.handleClose.bind(this);
        this.handleBoundFormUpdate    = this.handleBoundFormUpdate.bind(this);
    }

    /**
     * @DateOfCreation        14 june 2018
     * @ShortDescription      This function is responsible to handle the close event of add modal
     * @return                Nothing
     */
    handleClose() {
      const { handlers,data } = this.state.formConfig;
      let state = this.state;
      this.props.newSampleModalHideHandle();
      this.gridRefreshDone = true;
    }
    
    
     /**
    * @DateOfCreation        31 May 2018
    * @ShortDescription      This function is responsible to fx form input state data
    * @return                Redirect
    */
    handleBoundFormUpdate(data){
        this.boundForm = data;
    }

    render() {
        return (
            <div >
                <NewSampleModal
                    newSampleModalShow     = {this.props.newSampleModalShow}
                    handleClose             = {this.handleClose}
                    formConfig              = {this.state.formConfig}
                    handleBoundFormUpdate   = {this.handleBoundFormUpdate}
                    errorMsg                = {this.props.errorMsg}
                    successMsg              = {this.props.successMsg}
                    isInsertDone            = {this.props.isInsertDone}
                    successMsg              = {this.props.successMsg}
                    errorMsg                = {this.props.errorMsg}
                    sampleSubmit            = {this.props.sampleSubmit}

                />
            </div>
        );
    }
}
