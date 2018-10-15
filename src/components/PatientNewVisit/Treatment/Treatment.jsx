import React from "react";
import {fontawesome, FontAwesomeIcon} from '../../../global';
import {faMobileAlt, faUser, faTint, faPlus } from '@fortawesome/fontawesome-free-solid';

import Datetime from "react-datetime";
import moment from "moment";
import "react-datetime/css/react-datetime.css";

export const Treatment = (props) => {
    return (
        <div>     
            <div className="clearfix"></div>
            <h3 className="equal-margin">Treatment prescribed for ILD</h3>
            <div className="divTable">
                <div className="divTableHeading">
                    <div className="divTableRow">
                        <div className="divTableHead">Name of medicine patient is taking <strong>PRESENTLY</strong></div>
                        <div className="divTableHead">Start Date</div>
                        <div className="divTableHead">End Date</div>
                        <div className="divTableHead">Name of medicine patient is taking <strong>PRESENTLY</strong></div>
                        <div className="divTableHead">Start Date</div>
                        <div className="divTableHead">End Date</div>
                    </div>
                </div>
                <div className="divTableBody">
                    {
                        props.visitTreatmentFectors.length > 0 ?  props.visitTreatmentFectors.map(function(treatmentFectorDetails, index) {
                            return (
                                <div className="divTableRow" key={index}>
                                    {
                                        treatmentFectorDetails.map(function(fectorDetails, indexFector) {
                                            let tratmentStartDate = 'treatment_start_date_'+fectorDetails.medicine_id
                                            let tratmentEndDate   = 'treatment_end_date_'+fectorDetails.medicine_id
                                            return(
                                                <React.Fragment key={indexFector+fectorDetails.medicine_id}>
                                                    <div className="divTableCell" key={fectorDetails.medicine_name}>{fectorDetails.medicine_name}</div>
                                                    <div className="divTableCell" key={'treatment_start_date_'+fectorDetails.medicine_id}>
                                                        <Datetime
                                                            name        = {tratmentStartDate}
                                                            value       = {props.state[tratmentStartDate ]}
                                                            selected    = {moment(tratmentStartDate)}
                                                            onChange    = {(selected, name) => props.handleChangeDate(selected, tratmentStartDate)}
                                                            dateFormat  = "DD/MM/YYYY"
                                                            timeFormat  = {false}
                                                            closeOnSelect = {true}
                                                            inputProps  = {{readOnly:true}}
                                                            className   = "col-md-10"
                                                        />
                                                    </div>
                                                    <div className="divTableCell" key={'treatment_end_date_'+fectorDetails.medicine_id}>
                                                    <Datetime
                                                            name        = {tratmentEndDate}
                                                            value       = {props.state[tratmentEndDate ]}
                                                            selected    = {moment(tratmentEndDate)}
                                                            onChange    = {(selected, name) => props.handleChangeDate(selected, tratmentEndDate)}
                                                            dateFormat  = "DD/MM/YYYY"
                                                            timeFormat  = {false}
                                                            closeOnSelect = {true}
                                                            inputProps  = {{readOnly:true}}
                                                            className   = "col-md-10"
                                                        />
                                                    </div>
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                </div>
                            )
                        }) : ''
                    }
                  </div>
                </div>
        </div>
    );
   
}
