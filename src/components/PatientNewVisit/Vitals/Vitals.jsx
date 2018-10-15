import React from "react";
import {fontawesome, FontAwesomeIcon} from '../../../global';
import {faMobileAlt, faUser, faTint, faPlus } from '@fortawesome/fontawesome-free-solid';
import {FxForm} from '../../../_packages/fx-form';

export const Vitals = (props) => {
    return (
        <div>
            <div className="clearfix"></div>
            <h3 className={!props.titleShow ? 'equal-margin hide' : 'equal-margin'} >Vitals</h3>
            <div className="row">
            <FxForm
                config={props.vitalsFormData}
                ref={(form) => {
                    props.handleBoundFormVitals(form);
                }}
            /> 
        </div>
        </div>
    );
}
