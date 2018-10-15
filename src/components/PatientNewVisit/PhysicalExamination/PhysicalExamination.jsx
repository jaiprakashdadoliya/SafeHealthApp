import React from "react";
import {fontawesome, FontAwesomeIcon} from '../../../global';
import {faMobileAlt, faUser, faTint, faPlus } from '@fortawesome/fontawesome-free-solid';
import {FxForm} from '../../../_packages/fx-form';

export const PhysicalExamination = (props) => {

    return (
        <div>
            <div className="clearfix"></div>
            <h3 className={!props.titleShow ? 'equal-margin hide' : 'equal-margin'}>Physical Examination</h3>
             <div className="row">
            <FxForm
                config={props.physicalExaminationFormData}
                ref={(form) => {
                    props.handleBoundFormPhysicalExamination(form);
                }}
            />   
        </div>
            
        {/*!props.titleShow ? '' : <hr/>*/}
        </div>
    );
}
