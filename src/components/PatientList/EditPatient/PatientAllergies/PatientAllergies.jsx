import React from "react";
import {Button, Alert, bsStyle} from 'react-bootstrap';
import Loadable from 'react-loadable'; 
import { Loading, PatientAlertMessage } from './../../../../global';
import { configConstants } from './../../../../_constants';
import {FxMultiAddFormContainer} from '../../../../_packages/fx-multi-add-form';
import 'react-datepicker/dist/react-datepicker.css';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {AllergiesHistoryContainer} from './AllergiesHistory';

export const PatientAllergies = (props) => {
  return (
   <div>
        <FxMultiAddFormContainer 
              gridData = {props.gridData}
              filterAl = {props.filterAl}
              searchHandler = {props.tableSearch}
              fxFormViewModel = {props.FormShow}
              fxFormViewModelHideHandle = {props.editHideHandle}
              fxFormConfig = {props.formConfig}
              handleBoundFormUpdate         = {props.handleBoundFormUpdate}
              handleSubmit = {props.handleSubmit}
              fxMultiAddFormExtraConfig = {props.fxMultiAddFormExtraConfig}
              fxMultiAddFormTitle = {props.fxMultiAddFormTitle}
              successMsg = {props.successMsg}
              errorMsg  = {props.errorMsg}
              submitted  = {props.submitted}
        />
        <br/>
        <PatientAlertMessage 
            errorMsg = {props.errorMsg}
            isUpdateDone = {props.isUpdatedDone}
            successMessage = {props.successMsg}
        />
      {props.historyData.form_1 != undefined &&  
        <div className="col-md-12"> 
          <form role="form" onSubmit={(e) => {e.preventDefault();}}>
                <AllergiesHistoryContainer 
                    formData            = {props.historyData.form_1}
                    ref                 = {props.AllergiesHistoryContainerRef} 
                />
          </form>
            <div className="row">
              <div className="col-md-12 text-right">
                  <button className="btn table-btn green" disabled={props.submitted ? true : false} onClick={props.submitAllergiesHistory}>{props.submitted ? configConstants.BUTTON_PLEASE_WAIT : configConstants.SAVE_BUTTON}</button>

              </div>
            </div>
        </div> 
      }
    
    </div>

);
}