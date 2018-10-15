import React from "react";
import {Button, Alert, bsStyle} from 'react-bootstrap';
import Loadable from 'react-loadable'; 
import { Loading, PatientAlertMessage } from './../../../../global';
import { configConstants } from './../../../../_constants';
import {PatientHouseConditionContainer} from './PatientHouseCondition';
import {PatientCookingContainer} from './PatientCooking';
import {PatientResidentialLocationContainer} from './PatientResidentialLocation';
import {PatientResidentPlaceContainer} from './PatientResidentPlace';

//const PatientCookingContainer = Loadable({
    //loader: () => import('./PatientCooking' /* webpackChunkName = "PatientCooking" */).then(object => object.PatientCookingContainer),
   // loading: Loading
//});

//const PatientHouseConditionContainer = Loadable({
 //   loader: () => import('./PatientHouseCondition'  /*webpackChunkName = "PatientHouseCondition"*/ ).then(object => object.PatientHouseConditionContainer),
//    loading: Loading
//});

//const PatientResidentialLocationContainer = Loadable({
//    loader: () => import('./PatientResidentialLocation'  webpackChunkName = "PatientResidentialLocation" ).then(object => object.PatientResidentialLocationContainer),
//    loading: Loading
//});

//const PatientResidentPlaceContainer = Loadable({
 //   loader: () => import('./PatientResidentPlace' /* webpackChunkName = "PatientResidentialLocation" */).then(object => object.PatientResidentPlaceContainer),
 //   loading: Loading
//});

export const PatientDomesticEnvironmentalFactors = (props) => {
//export class PatientDomesticEnvironmentalFactors extends React.Component {
    //render(){
  return(
    <div>
        <div className="row" id="domesticFactorTitle">
            <div className="col-md-6 col-sm-12">
                <h3>Domestic Environmental Factors</h3>
            </div>
            <div className="col-md-6 col-sm-12 text-right">
                <Button className="btn text-btn green" disabled={props.submitted ? true : false} onClick={props.submitDomesticFactorStatus}>{props.submitted ? configConstants.BUTTON_PLEASE_WAIT : configConstants.SAVE_BUTTON}</Button>
            </div>
        </div>
        <PatientAlertMessage 
            errorMsg = {props.errorMsg}
            isUpdateDone = {props.isUpdateDone}
            successMessage = {props.successMessage}
        />
        <form role="form" onSubmit={(e) => {e.preventDefault();}}>
            <PatientHouseConditionContainer 
                formData            = {props.patientDomesticFactorData.form_1}
                patId               = {props.patId}
                visitId             = {props.visitId}
                ref                 = {props.PatientHouseConditionContainerRef} 
            />
            <PatientCookingContainer 
                formData            = {props.patientDomesticFactorData.form_2}
                patId               = {props.patId}
                visitId             = {props.visitId}
                ref                 = {props.PatientCookingContainerRef} 
            />
            <PatientResidentialLocationContainer
                formData            = {props.patientDomesticFactorData.form_3}
                patId               = {props.patId}
                visitId             = {props.visitId}
                ref                 = {props.PatientResidentialLocationContainerRef} 
            />
        </form>
        <div className="row">
            <div className="col-md-12 text-right">
                <Button className="btn text-btn green" disabled={props.submitted ? true : false} onClick={props.submitDomesticFactorStatus}>{props.submitted ? configConstants.BUTTON_PLEASE_WAIT : configConstants.SAVE_BUTTON}</Button>
            </div>
        </div>
        <hr />
        <PatientResidentPlaceContainer
            formData            = {props.patientDomesticFactorData.form_4}
            patId               = {props.patId}
            visitId             = {props.visitId}
            ref                 = {props.PatientResidentPlaceContainerRef} 
        />
        <PatientAlertMessage 
            errorMsg = {props.errorMsg}
            isUpdateDone = {props.isUpdateDone}
            successMessage = {props.successMessage}
        />
    </div>
  );
//}
}
