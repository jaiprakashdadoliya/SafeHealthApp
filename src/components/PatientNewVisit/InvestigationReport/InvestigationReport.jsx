import React from "react";
import {fontawesome, FontAwesomeIcon} from '../../../global';
import {faMobileAlt, faUser, faTint, faPlus } from '@fortawesome/fontawesome-free-solid';
import {FxForm} from '../../../_packages/fx-form';

export const InvestigationReport = (props) => {
    return (
        <div>   
            
            <div className="investigation-report-form">
                <div className="row sleep-study-form-container">
                    <FxForm
                        config={props.investigationReportFormData}
                        ref={(form) => {
                            props.handleBoundFormInvestigationReportUpdate(form);
                        }}
                        user_type = {props.user_type}
                    />
                </div>
            </div>
        </div>
    );
}
