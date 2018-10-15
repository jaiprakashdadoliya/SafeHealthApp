import React from "react";
import {FxForm} from '../../../../../_packages/fx-form';

export const PatientBSugar = (props) => {
  return(
    <div>
    <div className="row">
      <div className="col-md-12">
        <h4>Blood Sugar</h4>
      </div>
       <FxForm
            config={props.formConfig}
            ref={(form) => {
                    //this.boundForm = form;
                    props.handleBoundFormBSugarUpdate(form);
                }}
        />
    </div>

    </div>
  );
}