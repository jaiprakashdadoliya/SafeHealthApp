import React from "react";
import {fontawesome, FontAwesomeIcon} from '../../../global';
import {faMobileAlt, faUser, faTint, faPlus } from '@fortawesome/fontawesome-free-solid';
import {FxForm} from '../../../_packages/fx-form';

export const VisitStatus = (props) => {
  return (
      <div>
          <div className="row">
              <FxForm
                  config={props.newVisitFormData}
                  ref={(form) => {
                      props.handleBoundFormVisitStatusUpdate(form);
                  }}
              />
          </div>
          <hr/>
      </div>
  );
}
