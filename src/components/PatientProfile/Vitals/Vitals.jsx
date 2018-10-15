import React from "react";
import {fontawesome, FontAwesomeIcon} from '../../../global';
import {faMobileAlt, faUser, faTint, faIdCard } from '@fortawesome/fontawesome-free-solid';

export const Vitals = (props) => {
    return (
      <div className="col-sm-6 col-md-8">
        <div className="box">
            <div className="box-header">
                <h3 className="col-md-6 col-sm-6 col-xs-6"> Vitals </h3>
                <div className="col-md-6 col-sm-6 col-xs-6 text-right"><i className="fa fa-2x fa-arrows-alt-v"></i></div>
            </div>
            <table className="table remove-border responsive clearfix">
                { props.vitalsData.data.length >0 ? props.vitalsData.data.map(function(tableRow,index){
                    if(index == 0){
                        return (
                            <thead key={index}>
                                <tr>
                                    <th></th>
                                    <th>{tableRow.initial}<br/><span>{tableRow.initialDate!= '' ? 'ON '+ tableRow.initialDate :''}</span></th>
                                    <th>{tableRow.second_last}<br/><span>{tableRow.secondLastDate!= '' ? 'ON '+ tableRow.secondLastDate :''}</span></th>
                                    <th>{tableRow.last}<br/><span>{tableRow.lastDate!= '' ? 'ON '+ tableRow.lastDate :''}</span></th>
                                </tr>
                            </thead>
                        );
                    }
                }):'' }
                <tbody>
                    { props.vitalsData.data.length >0 ? props.vitalsData.data.map(function(tableRow,index){
                        if(index != 0){
                            return (
                                <tr key={index}>
                                    <td><strong>{tableRow.title}</strong></td>
                                    <td>{tableRow.initial}</td>
                                    <td>{tableRow.second_last}</td>
                                    <td>{tableRow.last}</td>
                                </tr>
                            );
                        }
                    }):'' }
                </tbody>            
            </table>
        </div>
    </div>
    );

}
