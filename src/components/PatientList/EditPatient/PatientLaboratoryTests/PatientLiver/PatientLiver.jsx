import React from "react";
import {FxForm} from '../../../../../_packages/fx-form';

export const PatientLiver = (props) => {
  return(
    <div>
    <div className="row">
      <div className="col-md-12">
        <h4>Liver funtion test</h4>
      </div>
       <FxForm
            config={props.formConfig}
            ref={(form) => {
                    //this.boundForm = form;
                    props.handleBoundFormLiverUpdate(form);
                }}
        />
    </div>

    </div>
  );
}