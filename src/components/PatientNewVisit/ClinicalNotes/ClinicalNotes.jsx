import React from "react";
import {fontawesome, FontAwesomeIcon} from '../../../global';
import {Button, Alert, bsStyle,Modal} from 'react-bootstrap';
import {configConstants} from '../../../_constants';
import {faMobileAlt, faUser, faTint, faPlus } from '@fortawesome/fontawesome-free-solid';
import {FxForm} from '../../../_packages/fx-form';

export const ClinicalNotes = (props) => {
    return (
        <div>
            <div className="clearfix"></div>
            <h3>Clinical Notes</h3>
            <div className="row">
                <div className="col-md-12">
                    {props.errorMsg && !props.isInsertDone &&
                        <Alert bsStyle="danger">
                            {props.errorMsg}
                        </Alert>
                    }

                    {(props.isUpdateDone) &&
                        props.successMessage &&
                            <Alert bsStyle="success">
                                {props.successMessage}
                            </Alert>
                    }
                </div>
                    <div className="col-md-6">
                        {props.user_type == configConstants.USER_TYPE_DOCTOR &&
                            <div className="row">
                                <FxForm
                                    config={props.formConfig}
                                    ref={(form) => {
                                        props.handleBoundFormUpdate(form);
                                    }}
                                /> 
                                <div className="col-md-12 text-right">
                                    <Button className="btn text-btn green" onClick={props.submitClinicalNotesData}>Save</Button>
                                </div>  
                            </div>
                        }

                        {props.user_type == configConstants.USER_TYPE_PATIENT &&
                            <div className="row">
                                <ul>
                                { props.isClinicalDataFetched && props.clinicalNotesList != undefined ?  props.clinicalNotesList.clinical_notes.map((item,index)=>{ 
                                        return(
                                            <li key={index}><h5>{item.text}</h5></li>
                                        )
                                    }) : <div><h5> Clinical note not found.</h5></div>
                                }
                                </ul> 
                            </div>
                        }
                    </div>
            </div>
        </div>
    );
}
