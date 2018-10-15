import React from "react";
import {Button, Alert, bsStyle} from 'react-bootstrap';
import Select from 'react-select';

export const PatientLaboratoryTemplates = (props) => {
  return (
  <div className="row">
   <div className="col-md-12">
      <div className="col-md-6">
        <label className="control-label">&nbsp;</label>
        <Button onClick={props.showLabReport} 
        className="btn text-btn green">
        Show reports according to the present complaints and daignosis</Button>
      </div>
      </div>
      </div>

);
}
