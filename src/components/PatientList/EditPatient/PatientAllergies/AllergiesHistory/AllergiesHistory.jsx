import React from "react";
import {FxForm} from '../../../../../_packages/fx-form';

export const AllergiesHistory = (props) => {
  return(
    <div>
    <div className="row">
      <div className="col-md-12 form-group">
        <h4>Resperiorty system</h4>
      </div>

       <FxForm
            config={props.formConfig}
            ref={(form) => {
                    //this.boundForm = form;
                    props.handleBoundFormAllergiesUpdate(form);
                }}
        />
    </div>

    </div>
  );
}