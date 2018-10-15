import React from "react";
import {FxForm} from '../../../../../_packages/fx-form';

export const PatientHRCT = (props) => {
  return(
    <div>
    <div className="row">
      <div className="col-md-12">
        <h4>HRCT</h4>
      </div>
       <FxForm
            config={props.formConfig}
            ref={(form) => {
                    props.handleBoundFormHRCTUpdate(form);
                }}
        />
    </div>

    </div>
  );
}