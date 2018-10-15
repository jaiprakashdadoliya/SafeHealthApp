import React from "react";

import Loadable from 'react-loadable'; 
import { Loading } from './../../../../../global';
import {FxForm} from '../../../../../_packages/fx-form';

export const PatientHouseCondition = (props) => {
  return(
    <div>

    <div className="row">
      <div className="col-md-6">
        <h4>Condition of his/her house</h4>
      </div>
       <FxForm
            config={props.formConfig}
            ref={(form) => {
                    //this.boundForm = form;
                    props.handleBoundFormHosueConditionUpdate(form);
                }}
        />
    </div>

    </div>
  );
}
