import React from "react";
import {FxForm} from '../../../../_packages/fx-form';

export const RespiratorySystem = (props) => {
  return(
    <div>
    <div className="row">
       <FxForm
            config={props.formConfig}
            ref={(form) => {
                    //this.boundForm = form;
                    props.handleBoundFormURTUpdate(form);
                }}
        />
    </div>

    </div>
  );
}