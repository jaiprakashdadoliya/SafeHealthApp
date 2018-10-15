/**
 * DoctorMediaAddContainer
 *
 * @package                SafeHealth
 * @subpackage             DoctorMediaAddContainer
 * @category               Container Component
 * @DateOfCreation         11 May 2018
 * @ShortDescription       This component is reponsible for logic in add media
 */

import React from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {DoctorMediaAdd} from "./DoctorMediaAdd";
import {DoctorMedia} from "./DoctorMedia";
import {doctorMediaActions, headerActions} from '../../../_actions';
class DoctorMediaAddContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.state = {
            files: []
        };
    }

    /**
     * @DateOfCreation        11 May 2018
     * @ShortDescription      This function is responsible to close popup
     * @return                Nothing
     */
    handleClose() {
        this.setState({
            files:[]
        });
        const { dispatch }  = this.props;
        dispatch(doctorMediaActions.resetState());
        this.props.mediaAddHideHandle();
    }
    /**
     * @DateOfCreation        29 May 2018
     * @ShortDescription      This function is responsible to redirect unauthorise users
     * @return                Redirect
     */
    componentDidUpdate(){
        const { dispatch }  = this.props;
        if(this.props.isUserNotValid){
            dispatch(headerActions.logout());
        }
    }
    /**
     * @DateOfCreation        11 May 2018
     * @ShortDescription      This function is responsible to send media to state
     * @return                Nothing
     */
    onChange(value){
        this.setState(value);
    };

    /**
     * @DateOfCreation        11 May 2018
     * @ShortDescription      This function is responsible to media request
     * @return                Nothing
     */
    handleSubmit() {
        const { dispatch} = this.props;
        dispatch(doctorMediaActions.addMedia(this.state, this.props.mediaData));
        this.props.mediaAddHideHandle();
        this.setState({
            src:null
        });
    }

    /**
     * @DateOfCreation        11 May 2018
     * @ShortDescription      This function is responsible to add media request
     * @return                Nothing
     */
    onDrop(files) {
        this.setState({
            files
        }, function () {
            const { dispatch } = this.props;
            files.map((file, index) => {
                var overlay_id = "overplay_"+index;
                dispatch(doctorMediaActions.addMedia(file, this.props.mediaData, overlay_id));
            })
        });
    }

    /**
     * @DateOfCreation        11 May 2018
     * @ShortDescription      This function is responsible to render add media form
     * @return                View
     */
    render() {
        return(
            <div >
                <DoctorMediaAdd
                    mediaAddShow        = {this.props.mediaAddShow}
                    mediaAddHideHandle  = {this.mediaAddHideHandle}
                    handleClose         = {this.handleClose}
                    onChange            = {this.onChange}
                    dropValues          = {this.state}
                    allowedFileTypes    = {this.allowedFileTypes}
                    maxFileSize         = {this.maxFileSize}
                    handleSubmit        = {this.handleSubmit}
                    progressValue       = {this.props.progressValue}
                    error               = {this.props.error}
                    mediaData           = {this.props.mediaData}
                    previewMedia        = {this.state.files}
                    onDrop              = {this.onDrop}
                    progressIndex       = {this.props.progressIndex}
                    progress            = {this.props.progress}
                    isAdded             = {this.props.isAdded}
                />
            </div>
        );
    }
}

/**
 * @DateOfCreation        11 May 2018
 * @ShortDescription      This function is responsible to map store state to props
 * @return                View
 */
function mapStateToProps(state) {
    const { mediaData, error, progressValue, progressIndex, progress,isAdded, isUserNotValid} = state.doctorMedia;
    return {
        mediaData,
        progressValue,
        error,
        progressIndex,
        progress,
        isAdded,
        isUserNotValid
    };
}

const connectedDoctorMediaAddContainer = connect(mapStateToProps)(DoctorMediaAddContainer);
export { connectedDoctorMediaAddContainer as DoctorMediaAddContainer };
