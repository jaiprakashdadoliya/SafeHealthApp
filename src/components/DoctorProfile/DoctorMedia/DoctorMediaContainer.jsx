/**
 * DoctorMediaContainer
 *
 * @package                SafeHealth
 * @subpackage             DoctorMediaContainer
 * @category               Container Component
 * @DateOfCreation         11 May 2018
 * @ShortDescription       This component is reponsible for logic in  media
 */

import React from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {DoctorMediaAdd} from "./DoctorMediaAdd";
import {DoctorMedia} from "./DoctorMedia";
import {doctorMediaActions, headerActions} from '../../../_actions';
import {configConstants, doctorMediaConstants} from "../../../_constants/";
import {DoctorMediaAddContainer} from "./DoctorMediaAddContainer";
import {DoctorMediaDialog} from "./DoctorMediaDialog";
import { confirmAlert } from 'react-confirm-alert'; // Import

class DoctorMediaContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.mediaAddShowHandle = this.mediaAddShowHandle.bind(this);
        this.mediaAddHideHandle = this.mediaAddHideHandle.bind(this);
        this.handleDeleteMedia = this.handleDeleteMedia.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onDrop     = this.onDrop.bind(this);
        this.state = {
            mediaAddShow: false,
            mediaDialogShow: false,
            mediaImage: ''
        };
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
     * @ShortDescription      This function is responsible to get all media data
     * @return                Nothing
     */
    componentWillMount() {
        const { dispatch, patId } = this.props;
        dispatch(doctorMediaActions.getMedia({'patient_id': patId}));
    }

    /**
     * @DateOfCreation        11 May 2018
     * @ShortDescription      This function is responsible to show modal
     * @return                Nothing
     */
    mediaAddShowHandle() {
        this.setState({ mediaAddShow: true });
    }

    /**
     * @DateOfCreation        11 May 2018
     * @ShortDescription      This function is responsible to hide modal
     * @return                Nothing
     */
    mediaAddHideHandle() {
        this.setState({ mediaAddShow: false });
    }

    /**
     * @DateOfCreation        11 May 2018
     * @ShortDescription      This function is responsible to delete media
     * @return                Nothing
     */
    handleDeleteMedia(doc_media_id) {
        confirmAlert({
            title: doctorMediaConstants.DR_MEDIA_ALERT_TITLE,
            message: doctorMediaConstants.DR_MEDIA_ALERT_MESSAGE,
            buttons: [
                {
                    label: configConstants.CONFIRM_ALERT_YES,
                    onClick: () => {
                        const { dispatch } = this.props;
                        dispatch(doctorMediaActions.deleteMedia(doc_media_id, this.props.mediaData));
                    }
                },
                {
                    label: configConstants.CONFIRM_ALERT_NO,
                    onClick: () => {return false;}
                }
            ]
        })
    }
    /**
     * @DateOfCreation        11 May 2018
     * @ShortDescription      This function is responsible to open media in modal
     * @return                Nothing
     */
    openDialog(media, type) {

        if(type == 'pdf'){
            window.open(configConstants.MEDIA_BASE_PATH+'0/'+media, '_blank');
        } else {
            this.setState({ mediaDialogShow: true });
            this.setState ({ mediaImage:media });            
        }
    }

    /**
     * @DateOfCreation        11 May 2018
     * @ShortDescription      This function is responsible to close modal
     * @return                Nothing
     */
    handleClose() {
        this.setState({ mediaDialogShow: false });
        this.setState({mediaImage:''});
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
            const { dispatch, patId } = this.props;
            files.map((file, index) => {
                var overlay_id = "overplay_"+index;
                dispatch(doctorMediaActions.addMedia(file, this.props.mediaData, overlay_id, patId));
            })
        });
    }

    /**
     * @DateOfCreation        11 May 2018
     * @ShortDescription      This function is responsible to reset state
     * @return                Nothing
     */
    componentWillReceiveProps(nextProps){
        if(nextProps.error){
            setTimeout(function() {
                const { dispatch }  = nextProps;
                dispatch(doctorMediaActions.resetState());
            },2000);
        }
    }

    /**
     * @DateOfCreation        11 May 2018
     * @ShortDescription      This function is responsible to render add media form
     * @return                View
     */
    render() {
        return(
            <div >
                <DoctorMedia
                    mediaData   = {this.props.mediaData}
                    staging     = {this.state.staging}
                    loader      = {this.props.loader}
                    openDialog  = {this.openDialog}
                    onDrop      = {this.onDrop}
                    error       = { this.props.error}
                    mediaTitle  = {this.props.mediaTitle}
                    patId       = {this.props.patId}
                    handleDeleteMedia   = {this.handleDeleteMedia}
                    mediaAddShowHandle  = {this.mediaAddShowHandle}
                />
                <DoctorMediaAddContainer
                    mediaAddShowHandle  = {this.mediaAddShowHandle}
                    mediaAddShow        = {this.state.mediaAddShow}
                    mediaAddHideHandle  = {this.mediaAddHideHandle}
                    loader              = {this.props.loader}
                    patId               = {this.props.patId}
                />
                <DoctorMediaDialog
                    mediaDialogShow = {this.state.mediaDialogShow}
                    mediaImage      = {this.state.mediaImage}
                    handleClose     = {this.handleClose}
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
    const { mediaData, isDelete, doc_media_id, loader, error,isUserNotValid} = state.doctorMedia;
    return {
        mediaData,
        isDelete,
        doc_media_id,
        loader,
        error,
        isUserNotValid
    };

}

const connectedDoctorMediaContainer = connect(mapStateToProps)(DoctorMediaContainer);
export { connectedDoctorMediaContainer as DoctorMediaContainer };
