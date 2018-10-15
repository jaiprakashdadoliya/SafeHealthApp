import React from "react";
import {FxForm} from '../../../../../_packages/fx-form';

export const PatientResidentialLocation = (props) => {
  return(
    <div>
    <div className="row">
      <div className="col-md-12">
        <h4>Previous residential locations (Please list all locations lived for at least 6 months)</h4>
      </div>
       <FxForm
            config={props.formConfig}
            ref={(form) => {
                    //this.boundForm = form;
                    props.handleBoundFormResidentialLocationUpdate(form);
                }}
        />
    </div>

    </div>
  );
}