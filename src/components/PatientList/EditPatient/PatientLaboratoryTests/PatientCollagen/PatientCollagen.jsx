import React from "react";
import {FxForm} from '../../../../../_packages/fx-form';

export const PatientCollagen = (props) => {
  return(
    <div>
    <div className="row">
      <div className="col-md-12">
        <h4>Collagen vascular disease profile</h4>
      </div>
       <FxForm
            config={props.formConfig}
            ref={(form) => {
                    //this.boundForm = form;
                    props.handleBoundFormCollagenUpdate(form);
                }}
        />
    </div>

    </div>
  );
}