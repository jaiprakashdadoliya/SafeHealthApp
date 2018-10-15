import React from "react";
import {FxForm} from '../../../../../_packages/fx-form';

export const PatientChestXray = (props) => {
  return(
    <div>
    <div className="row">
      <div className="col-md-12">
      <div className="form-group">
        <span>Appendix B (Per OFFICIAL DOCUMENT –ATS-ERS-JRS-ALAT (Raghu et al AJRCCM, March 15 2011)</span>
      </div>
      </div>
      <div className="row">
       <FxForm
            config={props.formConfig}
            ref={(form) => {
                    props.handleBoundFormPatientChestXrayUpdate(form);
                }}
        />
    </div>
    </div>
    </div>
  );
}