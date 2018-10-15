import React from "react";
import {FxForm} from '../../../../../_packages/fx-form';

export const PatientWeightLoss = (props) => {
  return(
    <div>
    <div className="row">
      <div className="col-md-12">
        <h4>Weight Loss</h4>
      </div>
       <FxForm
            config={props.formConfig}
            ref={(form) => {
                    //this.boundForm = form;
                    props.handleBoundFormWeightLossUpdate(form);
                }}
        />
    </div>

    </div>
  );
}