import React from "react";
import {FxForm} from '../../../../../_packages/fx-form';

export const PatientThoracoscopicLung = (props) => {
  return(
    <div>
    <div className="row">
      <div className="col-md-12">
        <span>Open /surgical /thoracoscopic lung biopsy: (If performed)</span>
      </div>
       <FxForm
            config={props.formConfig}
            ref={(form) => {
                    props.handleBoundFormThoracoscopicLungUpdate(form);
                }}
        />
    </div>

    </div>
  );
}