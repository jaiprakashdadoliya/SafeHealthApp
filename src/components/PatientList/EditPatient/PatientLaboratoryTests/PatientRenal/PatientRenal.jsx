import React from "react";
import {FxForm} from '../../../../../_packages/fx-form';

export const PatientRenal = (props) => {
  return(
    <div>
    <div className="row">
      <div className="col-md-12">
        <h4>Renal function test</h4>
      </div>
       <FxForm
            config={props.formConfig}
            ref={(form) => {
                    //this.boundForm = form;
                    props.handleBoundFormRenalUpdate(form);
                }}
        />
    </div>

    </div>
  );
}