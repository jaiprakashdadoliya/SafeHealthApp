import React from "react";
import { connect } from 'react-redux';
import {Button, Modal, Alert, bsStyle} from 'react-bootstrap';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'; 
import {patientProfileAction, headerActions} from '../../../../_actions';
/**
 * PatientProfileImage
 *
 * @package                SafeHealth
 * @subpackage             PatientProfileImage
 * @category               Component
 * @DateOfCreation         22 May 2018
 * @ShortDescription       This component is reponsible for update basic profile
 */
class PatientProfileImage extends React.Component {

  /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to bind function
   * @return                Nothing
   */
  constructor(props, context) {
    super(props, context);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.croppedImage = this.croppedImage.bind(this);
    this.state = {
      croppedImage: ''
    }
  }

  /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to handle cropped profile image
   * @return                Nothing
   */
  croppedImage(){
    // image in dataUrl
    this.setState({croppedImage :this.refs.cropper.getCroppedCanvas().toDataURL()});
  }

  /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to handle close profile image
   * @return                Nothing
   */
  handleClose() {
    const { dispatch }  = this.props;
    dispatch(patientProfileAction.resetState());
    this.props.basicInfoImageHideHandle();
  }

   /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to handle update profile image
   * @return                Nothing
   */
  handleSave(){
    const { dispatch }  = this.props;
    dispatch(patientProfileAction.updateProfileImage(this.state.croppedImage, this.props.patId));
  }

   /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to handle close profile model
   * @return                Nothing
   */
  componentDidUpdate(){
      const { dispatch }  = this.props;
      if(this.props.isUserNotValid){
          dispatch(headerActions.logout());
      }
  }

   /**
   * @DateOfCreation        22 May 2018
   * @ShortDescription      This function is responsible to handle reset profile image state
   * @return                Nothing
   */
  componentWillReceiveProps(nextProps){
    if(nextProps.successMessage){
      setTimeout(function() { 
          this.handleClose();
        }.bind(this), 2000);
    }
  }

  render() {
        return (
          <div>
            <Modal show={this.props.basicInfoImageShow} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Profile Image</Modal.Title>
              </Modal.Header>
              <Modal.Body>
               <div className="row">
                  <div className="col-md-12 ">
                    {this.props.successMessage &&
                            <Alert bsStyle="success">
                                {this.props.successMessage}
                            </Alert>
                            }
                       {this.props.errorMsg &&
                            <Alert bsStyle="danger">
                                {this.props.errorMsg}
                            </Alert>
                            }
                        {this.props.validationMsg &&
                            <Alert bsStyle="danger">
                                {this.props.validationMsg}
                            </Alert>
                            }
                       <Cropper
                          ref='cropper'
                          src={this.props.profileImageUrl}
                          style={{height: 400, width: '100%'}}
                          aspectRatio={12 / 12}
                          guides={false}
                          minCropBoxWidth={200}
                          minCropBoxHeight={200}
                          maxCropBoxWidth={300}
                          maxCropBoxHeight={300}
                          cropBoxResizable = {false}
                          zoomOnWheel = {false}
                          background = {false}
                          crop={this.croppedImage.bind(this)} />
                  </div>
              </div>
              </Modal.Body>
              { !this.props.validationMsg ?  <Modal.Footer>
                <Button className="btn text-btn red" onClick={this.handleClose}>Close</Button>
                <Button className="btn text-btn green" onClick={this.handleSave}>Save</Button>
              </Modal.Footer> : ''
            }
            </Modal>
          </div>
        );
    }
}

/**
 * @DateOfCreation        11 May 2018
 * @ShortDescription      This function is responsible to map store state to props
 * @return                View
 */
function mapStateToDispatch(state) {
    const {isUserNotValid, successMessage,errorMsg} = state.patientProfile;
    return {
        isUserNotValid,
        successMessage,
        errorMsg
    };
}

const connectedPatientProfileImage = connect(mapStateToDispatch)(PatientProfileImage);
export { connectedPatientProfileImage as PatientProfileImage };
