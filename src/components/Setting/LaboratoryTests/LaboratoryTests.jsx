import React from "react";
import {Button, Alert, bsStyle} from 'react-bootstrap';
import Loadable from 'react-loadable'; 
import { Loading } from '../../../global';
import {FxMultiAddFormContainer} from '../../../_packages/fx-multi-add-form';

import 'react-datepicker/dist/react-datepicker.css';
import ReactTable from "react-table";
import "react-table/react-table.css";

export const LaboratoryTests = (props) => {
  return (
   <div className="col-md-12 mb-10">
        <FxMultiAddFormContainer 
              gridData = {props.gridData}
              filterAll = {props.filterAll}
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
        />
    </div>

);
}