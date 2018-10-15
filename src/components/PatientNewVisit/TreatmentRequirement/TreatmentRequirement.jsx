import React from "react";
import {fontawesome, FontAwesomeIcon} from '../../../global';
import {faMobileAlt, faUser, faTint, faPlus } from '@fortawesome/fontawesome-free-solid';
import {FxForm} from '../../../_packages/fx-form';

export const TreatmentRequirement = (props) => {
    return (
        <div>
            <hr />
            <div className="clearfix"></div>
            <h3>Oxygen requirements</h3>
            <div className="row">
            <FxForm
                config={props.oxigenRequirementsFormData}
                ref={(form) => {
                    props.handleBoundFormOxigenTreatment(form);
                }}
            />  
            </div>
            <div className="row">
            <FxForm
                config={props.otherRequirementsFormData}
                ref={(form) => {
                    props.handleBoundFormOtherTreatment(form);
                }}
            />  
        </div>
        <hr/>
        </div>
    );
}
