import React from "react";
import { configConstants } from '../../../_constants';
import {Button, Modal} from 'react-bootstrap';

export const DoctorMediaDialog = (props) => {
    return(
        <div>
            <Modal show={props.mediaDialogShow} onHide={props.handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-12 ">
                            <img src={configConstants.MEDIA_BASE_PATH+'0/'+props.mediaImage} className="img-responsive"/>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

