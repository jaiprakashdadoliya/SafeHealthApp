import React from "react";
import {FxForm} from '../../../../../_packages/fx-form';

export const PatientUIP = (props) => {
  return(
    <div>
    <div className="row">
      <div className="col-md-12">
        <span></span>
      </div>
       <FxForm
            config={props.formConfig}
            ref={(form) => {
                    props.handleBoundFormUIPUpdate(form);
                }}
        />
    </div>

    </div>
  );
}