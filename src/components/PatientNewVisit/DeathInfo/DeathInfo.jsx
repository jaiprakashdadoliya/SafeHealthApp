import React from "react";
import {fontawesome, FontAwesomeIcon} from '../../../global';
import {faMobileAlt, faUser, faTint, faPlus } from '@fortawesome/fontawesome-free-solid';
import {FxForm} from '../../../_packages/fx-form';

export const DeathInfo = (props) => {
    return (
        <div>
            <div className="clearfix"></div>
            <div className="row">
            <FxForm
                config={props.deathInfoFormData}
                ref={(form) => {
                    props.handleBoundFormDeathInfoUpdate(form);
                }}
            />
        </div>
            <hr/>
        </div>
    );
}
