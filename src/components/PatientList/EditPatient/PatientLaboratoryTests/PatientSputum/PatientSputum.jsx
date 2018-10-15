import React from "react";
import {FxForm} from '../../../../../_packages/fx-form';

export const PatientSputum = (props) => {
  return(
    <div>
    <div className="row">
      <div className="col-md-12">
        <h4>Sputum</h4>
      </div>
       <FxForm
            config={props.formConfig}
            ref={(form) => {
                    //this.boundForm = form;
                    props.handleBoundFormSputumUpdate(form);
                }}
        />
    </div>

    </div>
  );
}