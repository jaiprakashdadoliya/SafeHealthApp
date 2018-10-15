import React from "react";
import {FxForm} from '../../../../../_packages/fx-form';

export const PatientResidentPlace = (props) => {
  return(
    <div>
    <div className="row">
      <div className="col-md-12">
        <h4>Place of residence</h4>
      </div>
       <FxForm
            config={props.formConfig}
            ref={(form) => {
                    //this.boundForm = form;
                    props.handleBoundFormpPlaceUpdate(form);
                }}
        />
    </div>

    </div>
  );
}