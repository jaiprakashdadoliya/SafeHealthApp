/**
 * DoctorStepThree
 *
 * @package                SafeHealth
 * @subpackage             DoctorStepThree
 * @category               View Component
 * @DateOfCreation         17 July 2018
 * @ShortDescription       This component is reponsible for step 3 view for booking a doctor appointment
 */
import React from "react";
import ReactDOM from "react-dom";
import { configConstants } from '../../../../_constants';
export const DoctorStepThree = (props) => {
    return(
        <div>
        { props.loader ? 
            <div>
                <img src={configConstants.PROFILE_LOAING} />
            </div>
        :
            <div>
                { props.message &&
                  <div className="row success-step">
                    <div className="col-md-12">
                        <div className="form-group success">
                            <div className="checkmark-sign"><h3>&#x2714;</h3></div>
                            <h3>{props.message}</h3>
                        </div>
                    </div>
                  </div>
                }
                { props.errorMsg &&
                  <div className="row success-step">
                    <div className="col-md-12">
                        <div className="form-group error">
                            <div className="checkmark-sign"><h3>&#x274C;</h3></div>
                            <h3>{props.errorMsg}</h3>
                        </div>
                    </div>
                  </div>
                }

            </div>
        }
        </div>
    );
}

