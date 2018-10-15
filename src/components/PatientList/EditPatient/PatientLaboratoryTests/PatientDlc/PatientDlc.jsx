import React from "react";
import {FxForm} from '../../../../../_packages/fx-form';

export const PatientDlc = (props) => {
  return(
    <div>
    <div className="row">
      <div className="col-md-12">
        <h4>DLC</h4>
      </div>
       <FxForm
            config={props.formConfig}
            ref={(form) => {
                    //this.boundForm = form;
                    props.handleBoundFormDlcUpdate(form);
                }}
        />
    </div>

    </div>
  );
}