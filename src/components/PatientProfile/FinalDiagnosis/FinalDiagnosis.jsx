import React from "react";
import {fontawesome, FontAwesomeIcon} from '../../../global';
import {faMobileAlt, faUser, faTint, faIdCard } from '@fortawesome/fontawesome-free-solid';

export const FinalDiagnosis = (props) => {
    
    return (
        <div>
            <div className="col-sm-6 col-md-4">
                <div className="box">
                    <div className="box-header">
                        <h3 className="col-md-6 col-sm-6 col-xs-6"> Final Diagnosis </h3>
                        <div className="col-md-6 col-sm-6 col-xs-6 text-right"><i className="fa fa-2x fa-arrows-alt-v"></i></div>
                    </div>

                    {
                        props.finalDiagnosisData.data.length>0 ? props.finalDiagnosisData.data.map(function(rowData,index){
                            return(<p key={index}>-{rowData}</p>);
                        }): <p className="fx-no-record">No record found.</p>
                    }
                </div>
            </div>
            <div className="clearfix"></div>
        </div>
    );

}
