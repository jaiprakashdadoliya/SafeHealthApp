import React from "react";
import {fontawesome, FontAwesomeIcon} from '../../../global';
import {faMobileAlt, faUser, faTint, faPlus } from '@fortawesome/fontawesome-free-solid';

import {FxForm} from '../../../_packages/fx-form';

export const Investigations = (props) => {   
    return (
        <div>                
            <div className="clearfix"></div>
            <h3 className={!props.titleShow ? 'hide' : ''}>Investigations/evaluation</h3>
            <div className="row">
                <FxForm
                    config={props.pulmonaryFunctionFormData}
                    ref={(form) => {
                        props.handleBoundPulmonaryFunctionUpdate(form);
                    }}
                />
            </div>
            <h4>Spirometry, lung volumes and diffusing capacity</h4>
            <div className="row">
                <FxForm
                    config={props.investigationFormData}
                    ref={(form) => {
                        props.handleBoundFormInvestigationUpdate(form);
                    }}
                />
            </div>
        </div>
    );
}
