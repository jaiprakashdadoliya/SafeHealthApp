import React from "react";
import {FxForm} from '../../../../../_packages/fx-form';

export const PatientDyspnoea = (props) => {
  return(
    <div>
    <div className="row">
      <div className="col-md-12">
        <h4>Dyspnoea</h4>
      </div>
       <FxForm
            config={props.formConfig}
            ref={(form) => {
                    //this.boundForm = form;
                    props.handleBoundFormDyspnoeaUpdate(form);
                }}
        />
    </div>

    </div>
  );
}