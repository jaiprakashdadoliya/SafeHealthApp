import React from "react";
import {FxForm} from '../../../../../_packages/fx-form';

export const PatientCbc = (props) => {
  return(
    <div>
    <div className="row">
      <div className="col-md-12">
        <h4>CBC</h4>
      </div>
       <FxForm
            config={props.formConfig}
            ref={(form) => {
                    //this.boundForm = form;
                    props.handleBoundFormCbcUpdate(form);
                }}
        />
    </div>

    </div>
  );
}