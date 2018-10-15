import React from "react";
import {fontawesome, FontAwesomeIcon} from '../../../global';
import {faMobileAlt, faUser, faTint, faPlus } from '@fortawesome/fontawesome-free-solid';
import {FxForm} from '../../../_packages/fx-form';

export const WorkEnvironment = (props) => {

    return (
        <div>
            <div className="clearfix"></div>
            <h3>Occupational status</h3>
            <FxForm
                config={props.workEnvironmentFormData}
                ref={(form) => {
                    props.handleBoundFormWorkEnvironmentUpdate(form);
                }}
            />
            <hr/>
        </div>
    );
}
