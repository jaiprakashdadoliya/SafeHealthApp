import React from "react";
import {fontawesome, FontAwesomeIcon} from '../../../global';
import {faPlus, faTimes } from '@fortawesome/fontawesome-free-solid';
import Dropzone from 'react-dropzone';
import {faCloudUploadAlt } from '@fortawesome/fontawesome-free-solid';
import { configConstants } from '../../../_constants';
import { Alert, ProgressBar} from 'react-bootstrap';
export const DoctorMedia = (props) => {
    return(
        <div className="inner-content specialisation-section">
            <div className="row">
                <h3 className="col-md-10 col-sm-8 col-xs-9" >{props.mediaTitle != undefined ? props.mediaTitle : 'Media'}</h3>
                <div className="col-md-2 col-sm-4 col-xs-3">
                    {/*<a href="javascript:void(0);"  className="text-right add-btn" onClick={props.mediaAddShowHandle}><FontAwesomeIcon icon={faPlus} /> Add</a>*/}
                </div>
            </div>
            { props.error &&
            <Alert bsStyle="danger">
                {props.error}
            </Alert>
            }
            <div className="row remove-bg">
                {props.loader ? <h4 className="Loader text-center text-success">Loading...</h4> : null}
                {props.mediaData && props.mediaData.length > 0 && props.mediaData.map((media, index) => {
                        return (
                            <div className="col-md-3"  key={media.doc_media_file}>
                                <div className="portfolio-image">
                                    <img src={media.doc_type == 'pdf' ? process.env.STATIC_IMAGE_BASE_PATH+'sample-pdf-icon-view.png' : configConstants.MEDIA_BASE_PATH+'1/'+media.doc_media_file} className={media.doc_type == 'pdf' ? "media-thumbnail-pdf": "media-thumbnail"} onClick={props.openDialog.bind(null, media.doc_media_file, media.doc_type)}/>
                                    <a href="javascript:void(0);" id={index} className="btn icon-btn red"   onClick={props.handleDeleteMedia.bind(null, media.doc_media_id)}><FontAwesomeIcon icon={faTimes} /></a>
                                </div>
                            </div>
                        );
                    }
                )}
            <div className="dropzone col-md-3">
                <Dropzone
                onDrop={props.onDrop.bind(this)}
                multiple={false}
                className="drop_box">
                <div className="upload-icon"><FontAwesomeIcon icon={faCloudUploadAlt} /></div>
                <p>Drag&Drop Your File(s)Here To Upload</p>
                <span className="select-upload">Or Select File to Upload</span>
                <small>(file size: 4MB, Type: png,jpg,jpeg,pdf dimensions: maximum width=1920px,maximum height=1200px)</small>
                </Dropzone>
            </div>
            </div>
        </div>
    );
}
