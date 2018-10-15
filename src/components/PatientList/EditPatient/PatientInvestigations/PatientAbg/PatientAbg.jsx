import React from "react";
import {FxForm} from '../../../../../_packages/fx-form';

export const PatientAbg = (props) => {
  return(
    <div>
    <div className="add-tb-spaces row">
      <div className="col-md-12">
        <h4>ABG</h4>
      </div>
       <FxForm
            config={props.formConfig}
            ref={(form) => {
                    props.handleBoundFormAbgUpdate(form);
                }}
        />
    </div>

    </div>
  );
}