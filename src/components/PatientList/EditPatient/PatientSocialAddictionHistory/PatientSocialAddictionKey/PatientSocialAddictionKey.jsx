import React from "react";
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
export const PatientSocialAddictionKey = (props) => {
  return(
    <div>

                      
    <div className="row">
         <div className="form-group checkbox-listing">
          <div>
            <div className="col-md-7">
              Ever taken substance of abuse such as cannabis, opium or smoked, ganja, charas etc?
            </div>
            <div className="col-md-4">
              <CheckboxGroup
                checkboxDepth={2} // This is needed to optimize the checkbox group
                name={props.formData[0].id}
                value={props.state[props.formData[0].id]} 
                onChange={(value, name) => props.handleCheckboxChange(value, props.formData[0].id)} >
         
                {
                    props.formData[0].optionValue.map(checkOptions => {
                        return (
                            <label key={'sd'+checkOptions.id}><Checkbox className="option-input checkbox" value={checkOptions.id} /><span>{checkOptions.value}</span></label>
                        )
                    }) 
                }
              </CheckboxGroup>
            </div>
          </div>

          <div>
            <div className="col-md-7">
              Ever taken nonveg?
            </div>
            <div className="col-md-4">
              <CheckboxGroup
                checkboxDepth={2} // This is needed to optimize the checkbox group
                name={props.formData[2].id}
                value={props.state[props.formData[2].id]} 
                onChange={(value, name) => props.handleCheckboxChange(value, props.formData[2].id)} >
         
                {
                    props.formData[2].optionValue.map(checkOptions => {
                        return (
                            <label key={'sd--'+checkOptions.id}><Checkbox className="option-input checkbox" value={checkOptions.id} /><span>{checkOptions.value}</span></label>
                        )
                    }) 
                }
              </CheckboxGroup>
            </div>
          </div>

        </div>
        <div className="col-md-12">
        <div className="form-group">
          <div className="check-list-text">Inhaled tobacco use</div>
          <div className="check-list-radio">
            <CheckboxGroup
                          checkboxDepth={2} // This is needed to optimize the checkbox group
                          name={props.formData[1].id}
                          value={props.state[props.formData[1].id]} 
                          onChange={(value, name) => props.handleCheckboxChange(value, props.formData[1].id)} >
                   
                          {
                              props.formData[1].optionValue.map(checkOptions => {
                                  return (
                                      <label key={'sd'+checkOptions.id}><Checkbox className="option-input checkbox" value={checkOptions.id} /><span>{checkOptions.value}</span></label>
                                  )
                              }) 
                          }
                         

                  </CheckboxGroup>
          </div>
        </div>
        </div>
    </div>

    </div>
  );
}
