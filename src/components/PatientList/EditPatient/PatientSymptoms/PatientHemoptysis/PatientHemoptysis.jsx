import React from "react";
import {FxForm} from '../../../../../_packages/fx-form';

export const PatientHemoptysis = (props) => {
  return(
    <div>
    <div className="row">
      <div className="col-md-12">
        <h4>Hemoptysis</h4>
      </div>
       <FxForm
            config={props.formConfig}
            ref={(form) => {
                    //this.boundForm = form;
                    props.handleBoundFormHemoptysisUpdate(form);
                }}
        />
    </div>

    </div>
  );
}