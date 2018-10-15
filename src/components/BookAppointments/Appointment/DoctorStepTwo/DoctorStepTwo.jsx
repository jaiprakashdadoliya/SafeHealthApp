/**
 * DoctorStepTwo
 *
 * @package                SafeHealth
 * @subpackage             DoctorStepTwo
 * @category               View Component
 * @DateOfCreation         17 July 2018
 * @ShortDescription       This component is reponsible for step 2 view for booking a doctor appointment
 */
 import React from "react";
import ReactDOM from "react-dom";

export class DoctorStepTwo extends React.Component {
    /**
     * @DateOfCreation        19 July 2018
     * @ShortDescription      Contructor is responsible to function declaration
     * @param                 props
     * @return                Nothing
     */
    constructor(props, context) {
        super(props, context);
        this.jumpToStep   = this.jumpToStep.bind(this);
    }

    /**
     * @DateOfCreation          19 July 2018
     * @ShortDescription        This function is responsible to Navigate between the steps
                                after checking for validations and trigger saving the appointment.
     * @param                   props
     * @return                  view
     */
    jumpToStep(toStep) {
        if(toStep == 3){
            if(this.props.checkValidation(toStep-1)){
                this.props.handleSave(); 
                this.props.jumpToStep(2); 
            }
        }else{
            this.props.jumpToStep(toStep-1);
        }
    }

    render(){
        return(
            <div>
                
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <h3>Select your payment</h3>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className={this.props.validate.payment_mode.isValid ? 'form-group' : 'form-group has-error'}>
                            <label>
                                <input className="option-input checkbox" name="payment_mode" type="checkbox" defaultChecked={this.props.detail.payment_mode} disabled = {true}/>
                                <span>Cash to Doctor</span>
                            </label>
                            <span className="help-block">{this.props.validate.payment_mode.message}</span>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className={this.props.validate.is_profile_visible.isValid ? 'form-group' : 'form-group has-error'}>
                            <label>
                                <input className="option-input checkbox" name="is_profile_visible" type="checkbox" defaultChecked={this.props.detail.is_profile_visible} onChange={this.props.handleCheckboxChange}/>
                                <span>Allow doctor to see your profile</span>
                            </label>
                            <span className="help-block">{this.props.validate.is_profile_visible.message}</span>
                        </div>
                    </div>
                </div>
                <button className="btn text-btn green pull-left" onClick={this.jumpToStep.bind(null, 1)} >Previous</button>
                <button className="btn text-btn green pull-right" disabled={this.props.submitted ? true : false} onClick={this.jumpToStep.bind(null, 3)} >{this.props.submitted ? 'Processing..' : 'Confirm'}</button>
            </div>
        );
    }
}
