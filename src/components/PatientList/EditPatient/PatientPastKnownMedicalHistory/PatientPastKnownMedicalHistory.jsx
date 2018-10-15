import React from "react";

import {Button, Modal, Alert, bsStyle} from 'react-bootstrap';
import { configConstants } from '../../../../_constants';
import { PatientAlertMessage } from '../../../../global';
import {FxMultiAddFormContainer} from '../../../../_packages/fx-multi-add-form';
import ReactTable from "react-table";
import "react-table/react-table.css";
export const PatientPastKnownMedicalHistory = (props) => {
  return(
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
    </div>

  );
}
