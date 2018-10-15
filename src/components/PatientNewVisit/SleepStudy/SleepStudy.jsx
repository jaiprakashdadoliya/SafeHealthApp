import React from "react";
import {fontawesome, FontAwesomeIcon} from '../../../global';
import {faMobileAlt, faUser, faTint, faPlus } from '@fortawesome/fontawesome-free-solid';
import {FxForm} from '../../../_packages/fx-form';

export const SleepStudy = (props) => {
  
    return (
        <div className="col-md-12">
            <h4>Sleep Study</h4>   
            <div className="row sleep-study-form-container">
                <FxForm
                    config={props.sleepStudyFormData}
                    ref={(form) => {
                        props.handleBoundFormSleepStudyUpdate(form);
                    }}
                />
            </div>
        </div>
    );
}
