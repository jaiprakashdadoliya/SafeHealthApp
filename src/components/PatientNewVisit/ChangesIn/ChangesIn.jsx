import React from "react";
import {fontawesome, FontAwesomeIcon} from '../../../global';
import {faMobileAlt, faUser, faTint, faPlus } from '@fortawesome/fontawesome-free-solid';
import {FxForm} from '../../../_packages/fx-form';

export const ChangesIn = (props) => {

    return (
        <div>
            <div className="clearfix"></div>
            <h3 className="equal-margin">Changes in</h3>
            <div className="row">
            <FxForm
                config={props.changesInFormData}
                ref={(form) => {
                    props.handleBoundChangeInData(form);
                }}
            />   
        </div>
              <hr/>
        </div>
    );
}
