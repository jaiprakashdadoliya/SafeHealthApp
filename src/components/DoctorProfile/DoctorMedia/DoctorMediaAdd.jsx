import React from "react";
import ReactDOM from "react-dom";

import {Button, Modal, Alert, ProgressBar} from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import {fontawesome, FontAwesomeIcon} from '../../../global';
import {faCloudUploadAlt } from '@fortawesome/fontawesome-free-solid';

export const DoctorMediaAdd = (props) => {
    var percentage = (props.progressValue);
    return(
        <div>
            <Modal show={props.mediaAddShow} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Media</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-12 ">
                            {props.error &&
                            <Alert bsStyle="danger">
                                {props.error}
                            </Alert>
                            }
                            <div className="dropzone">
                            <Dropzone
                                onDrop={props.onDrop.bind(this)}
                                className="drop_box"
                            >
                                <div className="upload-icon"><FontAwesomeIcon icon={faCloudUploadAlt} /></div>
                                <p>Drag&Drop Your File(s)Here To Upload</p>
                                <span className="select-upload">Or Select File to Upload</span>
                            </Dropzone>
                            </div>
                        </div>
                    </div>
                    <div className="row text-center text-lg-left thumb-img">
                        {props.previewMedia && props.previewMedia.map((media, index) => {
                            var overlay_id = "overplay_"+index;
                                return (
                                    <div className="col-lg-3 col-md-4 col-xs-6 " key={media.preview}>
                                        <div className="single-img">
                                        <a href="#" className="d-block mb-4 h-100">
                                            <img src={media.preview} className="img-responsive img-fluid img-thumbnail" />
                                            <div className="overlay" id={overlay_id}>
                                                <ProgressBar bsStyle="success" now={percentage} />
                                            </div>
                                        </a>
                                        </div>
                                    </div>
                                );
                            }
                        )}
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}
