import React from 'react';
import Select from 'react-select';
import { utilityHelper } from '../../../_helpers';
import {fontawesome, FontAwesomeIcon} from '../../../global';
import {faPlus } from '@fortawesome/fontawesome-free-solid';
import {faPencilAlt } from '@fortawesome/fontawesome-free-solid';
import {DoctorEditTimingContainer} from './DoctorEditTimingContainer';
import {DoctorAddTimingContainer} from './DoctorAddTimingContainer';

export const DoctorTiming = (props) => {
    return(
        <div className="inner-content specialisation-section">
            <DoctorEditTimingContainer
                timingEditModelShow         = {props.timingEditModelShow}
                timingEditHideHandle        = {props.timingEditHideHandle}
                timingDetail                = {props.timingDetail}
            />
            <DoctorAddTimingContainer
                timingAddModelShow          = {props.timingAddModelShow}
                timingAddHideHandle         = {props.timingAddHideHandle}
                payload                     = {props.payload}
            />
            <div className="row">
                <h3 className="col-md-10 col-sm-8 col-xs-9">Doctor Timing</h3>
                <div className = "col-md-2 col-sm-4 col-xs-3">
                    <a
                        href = "javascript:void(0);"
                        onClick = {props.timingAddShowHandle}
                        className = "text-right add-btn">
                        <FontAwesomeIcon icon={faPlus} /> Add
                    </a>
                </div>
            </div>
            <div className="table-responsive">
                <table className="clearfix table timing-table">
                    <thead>
                        <tr>
                            <th>Monday</th>
                            <th>Tuesday</th>
                            <th>Wednesday</th>
                            <th>Thusday</th>
                            <th>Friday</th>
                            <th>Saturday</th>
                            <th>Sunday</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { utilityHelper.getShiftArray(props.timingData).length > 0 ? utilityHelper.getShiftArray(props.timingData).map(
                            (weekRow, index) => { 
                                return(
                                <tr key={index}>
                                    { weekRow.length > 0 ? weekRow.map(
                                        (time, index2) => {
                                            return(
                                                <td className="inner-edit-button" key={index2}>
                                                    <span>{utilityHelper.changeTimingFormat(time.start_time)} - {utilityHelper.changeTimingFormat(time.end_time)}{time.start_time !='' && <a href="javascript:void(0);" onClick={props.timingEditShowHandle.bind(null, time)}> <FontAwesomeIcon icon={faPencilAlt}/> </a>}</span><br />
                                                    <span className="clinic-name">{time.clinic_name}</span>
                                                </td>
                                            )
                                        }) : <td>-</td>
                                    }
                                </tr>
                                )
                            }) : <tr><td colSpan="7" className="rt-noData">No Records Found</td></tr>
                                
                        }
                    </tbody>
              </table>
            </div>
       </div>
    );
}
