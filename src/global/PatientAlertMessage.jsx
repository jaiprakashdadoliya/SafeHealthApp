import React from "react";
import {Alert, bsStyle} from 'react-bootstrap';
export const PatientAlertMessage = (props) => {
    return(
        <div className="row">
            <div className="col-md-12">
                {!props.isUpdateDone && 
                    props.errorMsg &&
                        <Alert bsStyle="danger">
                            {props.errorMsg}
                        </Alert>
                }

                {props.isUpdateDone &&
                    props.successMessage &&
                        <Alert bsStyle="success">
                            {props.successMessage}
                        </Alert>
                }
            </div>
        </div>
    );
}