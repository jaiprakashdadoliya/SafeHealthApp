import React from "react";
import {FxForm} from '../../../../../_packages/fx-form';

export const PatientExpectoration = (props) => {
  return(
    <div>
    <div className="row">
      <div className="col-md-12">
        <h4>Expectoration</h4>
      </div>
       <FxForm
            config={props.formConfig}
            ref={(form) => {
                    //this.boundForm = form;
                    props.handleBoundFormExpectorationUpdate(form);
                }}
        />
    </div>

    </div>
  );
}