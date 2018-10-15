import React from "react";
import {Button, Alert, bsStyle} from 'react-bootstrap';
import { utilityHelper } from '../../../../_helpers';
import moment from 'moment';
import Loadable from 'react-loadable'; 
import { Loading } from './../../../../global';
import {FxMultiAddFormContainer} from '../../../../_packages/fx-multi-add-form';
import 'react-datepicker/dist/react-datepicker.css';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {configConstants} from '../../../../_constants';

export const PatientVaccinationHistory = (props) => {
    return (
        <div>
            <FxMultiAddFormContainer 
                  gridData                  = {props.gridData}
                  filterAl                  = {props.filterAl}
                  fxFormViewModel           = {props.vaccinationHistoryFormShow}
                  fxFormViewModelHideHandle = {props.patientEditVaccinationHistoryHideHandle}
                  fxFormConfig              = {props.vaccinationHistoryFormConfig}
                  handleBoundFormUpdate     = {props.handleBoundFormUpdate}
                  handleSubmit              = {props.handleSubmit}
                  fxMultiAddFormExtraConfig = {props.fxMultiAddFormExtraConfig}
                  fxMultiAddFormTitle       = {props.fxMultiAddFormTitle}
                  successMsg                = {props.successMsg}
                  errorMsg                  = {props.errorMsg}
                  submitted                 = {props.submitted}
            />
        </div>
    );
}
