import React from "react";
import {Button, Alert, bsStyle} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import ReactAutocomplete from 'react-autocomplete';
import Loadable from 'react-loadable'; 
import { Loading } from '../../global';
import { utilityHelper } from '../../_helpers';
import {FxMultiAddFormContainer} from '../fx-multi-add-form';

import 'react-datepicker/dist/react-datepicker.css';
import ReactTable from "react-table";
import "react-table/react-table.css";

export const FxManager = (props) => {
  return (
   <div>
        <FxMultiAddFormContainer 
              gridData = {props.gridData}
              filterAl = {props.filterAl}
              searchHandler = {props.symptomSearch}
              fxFormViewModel = {props.symptomsFormShow}
              fxFormViewModelHideHandle = {props.patientEditSymptomsHideHandle}
              fxFormConfig = {props.symptomFormConfig}
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
