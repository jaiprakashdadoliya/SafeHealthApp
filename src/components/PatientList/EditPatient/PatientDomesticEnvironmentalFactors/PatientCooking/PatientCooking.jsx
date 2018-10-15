import React from "react";
import {FxForm} from '../../../../../_packages/fx-form';

export const PatientCooking = (props) => {
  return(
    <div>
    <div className="row">
      <div className="col-md-6">
        <h4>Does the current or past home have/had following</h4>
      </div>
       <FxForm
            config={props.formConfig}
            ref={(form) => {
                    //this.boundForm = form;
                    props.handleBoundFormCookingUpdate(form);
                }}
        />
    </div>

    </div>
  );
}