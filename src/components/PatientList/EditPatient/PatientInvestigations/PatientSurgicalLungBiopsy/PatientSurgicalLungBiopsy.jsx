import React from "react";
import {FxForm} from '../../../../../_packages/fx-form';

export const PatientSurgicalLungBiopsy = (props) => {
  return(
    <div>
    <div className="row">
      <div className="col-md-12">
        <span></span>
      </div>
      <div className="row">
       <FxForm
            config={props.formConfig}
            ref={(form) => {
                    props.handleBoundFormSurgicalLungBiopsyUpdate(form);
                }}
        />
    </div>
    </div>

    </div>
  );
}